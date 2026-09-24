<script setup lang="ts">
import _ from "lodash";
import { useRoute } from "vue-router";
import { usePenawaranStore } from "~/stores/penawaranStore";
import type { ConfirmationDialog } from "#components";

import "@vueup/vue-quill/dist/vue-quill.snow.css";
import dialogBuatInvoice from "~/components/Admin/Penawaran/dialog-buat-invoice.vue";
import dialogBuatPengeluaran from "~/components/Admin/Penawaran/dialog-buat-pengeluaran.vue";
import { ref } from "vue";

const activeTab = ref(0);

definePageMeta({ layout: "admin" });

const route = useRoute();
const penawaranstore = usePenawaranStore();

onMounted(async () => {
  useloadingStore().setLoading(true);

  await penawaranstore.tarikDetailPenawaranAct(String(route.params.id));

  useloadingStore().setLoading(false);
});

const detailpenawaran = computed(() => penawaranstore.getDetailPenawaran);

const data = reactive({
  dialogAdd: false,
  dialogRevisi: false,
  itemsPerPageKategori: 10,
  page: 1,
  itemsPerPage: 10,
  pageKategori: 1,
  dialogPenawaran: false,
  dialogAddPengeluaran: false,

  new_pemberkasan: {
    id_dokumen: "",
    nama_dokumen: "",
    file_dokumen: "",
    no_dokumen: "",
    id_kategori_item: "",
    nama_kategori_item: "",
    periode_mulai: "",
    periode_selesai: "",
    status_dokumen: "Asli",
  },

  headers_items: [
    { title: "Nama", key: "nama_kategori_item" },
    { title: "Jumlah", key: "jumlahUnit" },
    { title: "Periode Penawaran", value: "periode_penawaran", sortable: true },
    { title: "Nominal", key: "nominal" },
    { title: "Subtotal", key: "subtotal" },
    { title: "Aksi", key: "actions", sortable: false },
  ],
});

async function opendialogaddinv() {
  data.dialogAdd = true;
}

async function opendialogaddpengeluaran() {
  data.dialogAddPengeluaran = true;
}
</script>

<template>
  <ConfirmationDialog ref="confirmationDialog" />

  <!-- DIALOG BUAT INVOICE -->
  <dialog-buat-invoice
    v-model="data.dialogAdd"
    :penawaran="detailpenawaran"
    @saved="navigateTo('/admin/invoice')"
  />

  <dialog-buat-pengeluaran
    v-model="data.dialogAddPengeluaran"
    :id-penawaran="String(route.params.id)"
    :penawaran="detailpenawaran"
  />

  <div v-if="detailpenawaran" class="quotation-page">
    <!-- STICKY HEADER WRAPPER -->
    <header class="top-sticky-container">
      <div class="sticky-inner-content">
        <!-- TOP NAVIGATION -->
        <div class="page-topbar">
          <v-btn
            variant="text"
            color="grey-darken-3"
            prepend-icon="mdi-arrow-left"
            @click="$router.go(-1)"
            class="back-button"
          >
            Kembali
          </v-btn>
        </div>

        <div class="page-heading">
          <div>
            <h1 class="page-title">Detail Quotation</h1>
          </div>
        </div>
      </div>
    </header>

    <div class="grid-wrapper">
      <div class="quotation-grid">
        <aside class="quotation-sidebar">
          <section class="info-card">
            <div class="info-card-header">
              <div class="header-icon">
                <v-icon size="19"> mdi-file-document-outline </v-icon>
              </div>

              <div>
                <div class="info-card-title">Informasi Quotation</div>
                <div class="info-card-description">
                  Detail dokumen penawaran
                </div>
              </div>
            </div>

            <div class="quotation-number-box">
              <div class="field-label">NO. PENAWARAN</div>
              <div class="quotation-number">
                {{ detailpenawaran.no_penawaran }}
              </div>
              <div class="mt-2 d-flex align-center ga-2">
                <span class="text-caption text-medium-emphasis">Status:</span>
                <v-chip
                  size="x-small"
                  variant="outlined"
                  color="grey"
                  class="font-weight-medium text-capitalize"
                >
                  {{ detailpenawaran.status }}
                </v-chip>
              </div>
            </div>

            <div class="info-section">
              <!-- PERIHAL -->
              <div class="info-field">
                <div class="field-label">PERIHAL</div>
                <div class="field-value">
                  {{ detailpenawaran.perihal || "-" }}
                </div>
              </div>

              <div class="info-field">
                <div class="field-label">CLIENT / PERUSAHAAN</div>
                <div class="field-value strong">
                  {{ detailpenawaran.nama_perusahaan || "-" }}
                </div>
              </div>

              <div class="info-field">
                <div class="field-label">PIC</div>
                <div class="contact-row">
                  <div class="contact-icon">
                    <v-icon size="16"> mdi-account-outline </v-icon>
                  </div>
                  <span>{{ detailpenawaran.pic || "-" }}</span>

                  <div class="contact-icon">
                    <v-icon size="16"> mdi-phone-outline </v-icon>
                  </div>
                  <span>{{ detailpenawaran.no_telp || "-" }}</span>
                </div>
              </div>
            </div>

            <div class="info-card-footer text-center">
              <v-btn
                block
                color="orange"
                variant="flat"
                size="small"
                prepend-icon="mdi-file-document-plus-outline"
                class="invoice-button"
                @click="opendialogaddinv"
              >
                Buat Invoice
              </v-btn>
              <!-- :disabled="detailpenawaran.status == 'INVOICE'" -->

              <div
                v-if="detailpenawaran.status == 'INVOICE'"
                class="d-flex align-center justify-center mt-2"
              >
                <v-icon size="15" color="red">mdi-information-outline</v-icon>
                <span class="text-red text-caption ml-1"
                  >Invoice telah dibuat</span
                >
              </div>

              <v-btn
                block
                color="primary"
                variant="flat"
                size="small"
                prepend-icon="mdi-export"
                class="invoice-button mb-3 mt-3"
                @click="opendialogaddpengeluaran"
              >
                Buat Catatan Pengeluaran
              </v-btn>

              <v-btn
                :to="`/admin/penawaran/${encodeURIComponent(String(route.params.id))}/pengeluaran`"
                block
                color="primary"
                variant="outlined"
                size="small"
                class="mb-3"
                append-icon="mdi-open-in-new"
              >
                Lihat Catatan Pengeluaran
              </v-btn>
            </div>
          </section>
        </aside>

        <main class="quotation-preview">
          <div class="preview-header">
            <div class="preview-title-wrapper">
              <div class="preview-icon">
                <v-icon size="18"> mdi-file-eye-outline </v-icon>
              </div>

              <div>
                <div class="preview-title">Preview Dokumen</div>
                <div class="preview-subtitle">Tampilan surat penawaran</div>
              </div>
            </div>

            <div class="preview-status">
              <span class="status-dot"></span>
              Dokumen
            </div>
          </div>

          <!-- TAB SELECTION -->
          <div class="preview-tabs-wrapper">
            <v-tabs
              v-model="activeTab"
              color="primary"
              density="compact"
              align-tabs="start"
              class="preview-tabs"
            >
              <v-tab :value="0" class="tab-item">
                <v-icon start size="18">mdi-file-document-outline</v-icon>
                Asli
              </v-tab>
              <!-- <v-tab :value="1" class="tab-item">
                <v-icon start size="18"
                  >mdi-file-document-multiple-outline</v-icon
                >
                PT Lain
              </v-tab> -->
            </v-tabs>
          </div>

          <canvas-penawaran :detailpenawaran="detailpenawaran" />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quotation-page {
  width: 100%;
  min-height: 100vh;
  background: #f5f7fa;
  box-sizing: border-box;
}

.top-sticky-container {
  position: sticky;
  top: 60px;
  z-index: 100;
  background: #f5f7fa;
  width: 100%;
  padding: 16px 28px 14px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
  box-sizing: border-box;
}

.sticky-inner-content {
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
}

.page-topbar {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.back-button {
  margin-left: -8px !important;
  font-size: 14px;
  font-weight: 600;
  text-transform: none !important;
}

.page-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.page-title {
  margin: 0;
  font-size: 24px;
  line-height: 1.2;
  font-weight: 800;
  color: #172033;
  letter-spacing: -0.4px;
}

.grid-wrapper {
  padding: 24px 28px 50px;
}

.quotation-grid {
  display: grid;
  grid-template-columns: minmax(280px, 340px) minmax(0, 1fr);
  gap: 24px;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  align-items: start;
}

.quotation-sidebar {
  width: 100%;
  min-width: 0;
  position: sticky;

  top: calc(145px + 24px);
  max-height: calc(100vh - (105px + 48px));
  overflow-y: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;

  will-change: transform;
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.quotation-sidebar::-webkit-scrollbar {
  display: none;
}

.info-card {
  width: 100%;
  background: #ffffff;
  border: 1px solid #e6eaf0;
  border-radius: 14px;
  overflow: hidden;

  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.03),
    0 8px 24px rgba(15, 23, 42, 0.04);
}

.info-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 17px 18px;
  border-bottom: 1px solid #edf0f4;
  background: #ffffff;
}

.header-icon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #eff6ff;
  color: #2563eb;
}

.info-card-title {
  font-size: 14px;
  font-weight: 750;
  color: #1e293b;
}

.info-card-description {
  margin-top: 2px;
  font-size: 11px;
  color: #94a3b8;
}

.quotation-number-box {
  margin: 9px;
  padding: 15px 16px;
  border-radius: 11px;
  background: #f8fafc;
  border: 1px solid #edf1f5;
}

.field-label {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  color: #94a3b8;
}

.quotation-number {
  margin-top: 6px;
  font-size: 16px;
  line-height: 1.3;
  font-weight: 800;
  color: #1e3a8a;
  word-break: break-word;
}

.info-section {
  padding: 0 18px 8px;
}

.info-field {
  padding: 9px 0;
  border-bottom: 1px solid #f1f3f6;
}

.info-field:last-child {
  border-bottom: none;
}

.field-value {
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.5;
  color: #334155;
  word-break: break-word;
}

.field-value.strong {
  color: #1e293b;
  font-weight: 700;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 7px;
  font-size: 13px;
  color: #475569;
}

.contact-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: #f8fafc;
  color: #64748b;
}

.info-card-footer {
  padding: 15px 16px;
  border-top: 1px solid #edf0f4;
  background: #fafbfc;
}

.invoice-button {
  font-weight: 650 !important;
  text-transform: none !important;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.15);
}

.quotation-preview {
  min-width: 0;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e6eaf0;
  border-radius: 14px;
  overflow: hidden;

  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.03),
    0 8px 24px rgba(15, 23, 42, 0.04);
}

.preview-header {
  min-height: 62px;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e9edf2;
  background: #ffffff;
}

.preview-title-wrapper {
  display: flex;
  align-items: center;
  gap: 11px;
}

.preview-icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #f8fafc;
  color: #475569;
}

.preview-title {
  font-size: 13px;
  font-weight: 750;
  color: #1e293b;
}

.preview-subtitle {
  margin-top: 2px;
  font-size: 10px;
  color: #94a3b8;
}

.preview-status {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 9px;
  border-radius: 7px;
  background: #f8fafc;
  font-size: 10px;
  font-weight: 600;
  color: #64748b;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
}

.paper-container {
  width: 100%;
  padding: 15px;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  box-sizing: border-box;
  overflow-x: auto;
}

.paper-container :deep(.offer-card) {
  margin-left: auto !important;
  margin-right: auto !important;
}

@media (max-width: 1200px) {
  .top-sticky-container {
    padding-left: 20px;
    padding-right: 20px;
  }

  .grid-wrapper {
    padding: 20px 20px 40px;
  }

  .quotation-grid {
    grid-template-columns: minmax(260px, 310px) minmax(0, 1fr);
    gap: 18px;
  }

  .paper-container {
    padding: 0px;
  }
}

@media (max-width: 960px) {
  .top-sticky-container {
    padding-left: 16px;
    padding-right: 16px;
  }

  .grid-wrapper {
    padding: 18px 16px 35px;
  }

  .quotation-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .quotation-sidebar {
    position: static;
    max-height: none;
    overflow-y: visible;
  }

  .info-card {
    width: 100%;
  }

  .quotation-preview {
    width: 100%;
  }

  .paper-container {
    padding: 20px;
  }
}

@media (max-width: 600px) {
  .top-sticky-container {
    padding: 12px 14px 10px;
  }

  .grid-wrapper {
    padding: 14px 10px 30px;
  }

  .back-button {
    font-size: 13px;
  }

  .page-title {
    font-size: 20px;
  }

  .info-card {
    border-radius: 12px;
  }

  .info-card-header {
    padding: 14px;
  }

  .header-icon {
    width: 34px;
    height: 34px;
  }

  .quotation-number-box {
    margin: 12px;
    padding: 13px;
  }

  .quotation-number {
    font-size: 14px;
  }

  .info-section {
    padding: 0 14px 6px;
  }

  .info-field {
    padding: 12px 0;
  }

  .info-card-footer {
    padding: 12px;
  }

  .preview-header {
    min-height: 55px;
    padding: 10px 13px;
  }

  .preview-icon {
    width: 31px;
    height: 31px;
  }

  .preview-title {
    font-size: 12px;
  }

  .preview-subtitle {
    font-size: 9px;
  }

  .preview-status {
    display: none;
  }

  .paper-container {
    padding: 10px;
  }
}

.preview-tabs-wrapper {
  background-color: #ffffff;
  border-bottom: 1px solid #e9edf2;
  padding: 0 16px;
}

.preview-tabs {
  height: 44px;
}

.tab-item {
  font-size: 13px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  letter-spacing: normal !important;
}

@media (max-width: 600px) {
  .preview-tabs-wrapper {
    padding: 0 8px;
  }

  .tab-item {
    font-size: 12px !important;
  }
}
</style>
