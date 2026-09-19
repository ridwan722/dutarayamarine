import { useFirestore } from "vuefire";
import { collection, doc, runTransaction } from "firebase/firestore";
import type { invoiceM } from "~/types/invoice";
import moment from "moment";
import { getAuth } from "firebase/auth";
import _ from "lodash";
import type { pengeluaranM } from "~/types/penawaranModel";


export const createInvoicePenawaran = async (data: invoiceM) => {
  const db = useFirestore();
  const auth = getAuth();
  const now = moment().unix();
  const email = auth.currentUser?.email ?? "system";

  return await runTransaction(db, async (transaction) => {
    const nomorInvRef = doc(db, "penomoran", "nomor");
    const getnomor = await transaction.get(nomorInvRef);

    if (!getnomor.exists()) {
      throw new Error("Dokumen penomoran/nomor tidak ditemukan");
    }

    const datanomor = getnomor.data();
    const newnumber = datanomor!.no_inv + 1;
    const stringnewnumber = _.toString(newnumber).padStart(5, "0");
    const no_inv = `${stringnewnumber}`;
    const id_invoice = `${stringnewnumber}`;
    const setdata: invoiceM = {
      ...data,
      no_inv,
      id_invoice,
      createdAt: now,
      createdBy: email,
    };

    //Ref dokumen utama laporan

    const invoiceRef = doc(db, "invoice", id_invoice);
    const penawaraninvoiceRef = doc(db, "penawaran", data.id_penawaran!, "invoice", id_invoice);
    // Simpan dokumen utama laporan
    transaction.set(invoiceRef, setdata, { merge: true });
    transaction.set(penawaraninvoiceRef, setdata, { merge: true });
    transaction.update(nomorInvRef, { no_inv: newnumber });

    return { ...setdata, id: id_invoice };
  });
};


export const createPengeluaran = async (data: pengeluaranM, id_penawaran: string) => {
  if (!id_penawaran) throw new Error("ID penawaran tidak ditemukan");

  const db = useFirestore();
  const setdata: pengeluaranM = {
    ...data,
    id_pengeluaran: data.id_pengeluaran || doc(collection(db, "penawaran")).id,
  };

  const penawaranRef = doc(db, "penawaran", id_penawaran);
  await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(penawaranRef);
    if (!snapshot.exists()) throw new Error("Penawaran tidak ditemukan");

    const pengeluaran: pengeluaranM[] = snapshot.data().pengeluaran ?? [];
    if (!pengeluaran.some((item) => item.id_pengeluaran === setdata.id_pengeluaran)) {
      pengeluaran.push(setdata);
    }

    const total_pengeluaran = pengeluaran.reduce(
      (total, item) => total + Number(item.nominal || 0),
      0,
    );

    transaction.update(penawaranRef, { pengeluaran, grandtotal_pengeluaran: total_pengeluaran });
  });
  sessionStorage.removeItem("penawaran");

  return setdata;
};

export const createInvoice = async (data: invoiceM) => {
  const db = useFirestore();
  const auth = getAuth();
  const now = moment().unix();
  const email = auth.currentUser?.email ?? "system";

  return await runTransaction(db, async (transaction) => {
    const nomorInvRef = doc(db, "penomoran", "nomor");
    const getnomor = await transaction.get(nomorInvRef);

    if (!getnomor.exists()) {
      throw new Error("Dokumen penomoran/nomor tidak ditemukan");
    }

    const datanomor = getnomor.data();
    const newnumber = datanomor!.no_inv + 1;
    const stringnewnumber = _.toString(newnumber).padStart(5, "0");
    const no_inv = `${stringnewnumber}`;
    const id_invoice = `${stringnewnumber}`;
    const setdata: invoiceM = {
      ...data,
      no_inv,
      id_invoice,
      createdAt: now,
      createdBy: email,
      id_penawaran: "-",
      no_penawaran: "-",
    };

    //Ref dokumen utama laporan

    const invoiceRef = doc(db, "invoice", id_invoice);
    // Simpan dokumen utama laporan
    transaction.set(invoiceRef, setdata, { merge: true });
    transaction.update(nomorInvRef, { no_inv: newnumber });

    return { ...setdata, id: id_invoice };
  });
};
