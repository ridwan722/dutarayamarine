<script setup lang="ts">
import { computed } from "vue";
import { seoKeywords } from "~/seo.config";

definePageMeta({ layout: "website" });
const { translate } = useSiteLocale();

usePageSeo({
  title: computed(() => translate("Privacy Policy | Duta Raya Marine", "Kebijakan Privasi | Duta Raya Marine")),
  description: computed(() => translate("Learn how PT Duta Raya Marine collects, uses, stores, and protects personal data submitted through its website and WhatsApp inquiry form.", "Pelajari cara PT Duta Raya Marine mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi yang dikirim melalui situs dan form inquiry WhatsApp.")),
  path: "/privacy-policy",
  keywords: seoKeywords.privacy,
});

const updatedValue = computed(() => translate("30 October 2026", "30 Oktober 2026"));

const sections = computed(() => [
  {
    id: "scope-controller",
    title: translate("Scope and data controller", "Ruang lingkup dan pengendali data"),
    paragraphs: [
      translate(
        "This Privacy Policy applies to personal data processed through the public PT Duta Raya Marine website, including the inquiry form that continues to WhatsApp. PT Duta Raya Marine determines the purposes of this processing and acts as the personal data controller for the information described here.",
        "Kebijakan Privasi ini berlaku untuk data pribadi yang diproses melalui situs publik PT Duta Raya Marine, termasuk form inquiry yang dilanjutkan ke WhatsApp. PT Duta Raya Marine menentukan tujuan pemrosesan tersebut dan bertindak sebagai pengendali data pribadi atas informasi yang dijelaskan di sini.",
      ),
    ],
  },
  {
    id: "data-collected",
    title: translate("Data we collect", "Data yang kami kumpulkan"),
    paragraphs: [
      translate(
        "The information processed depends on how you use the website. You may browse most pages without completing the inquiry form.",
        "Informasi yang diproses bergantung pada cara Anda menggunakan situs. Anda dapat melihat sebagian besar halaman tanpa mengisi form inquiry.",
      ),
    ],
    bullets: [
      translate("Inquiry information: PIC or contact name, company name, address, vessel name, inquiry details, and submission time.", "Informasi inquiry: nama PIC atau kontak, nama perusahaan, alamat, nama kapal, detail inquiry, dan waktu pengiriman."),
      translate("Communications: information you provide in follow-up email, telephone, WhatsApp, quotation, or service communications.", "Komunikasi: informasi yang Anda berikan dalam tindak lanjut melalui email, telepon, WhatsApp, penawaran, atau komunikasi layanan."),
      translate("Preference information: the language selected on the website, stored in a first-party cookie named site-language.", "Informasi preferensi: bahasa yang dipilih pada situs, disimpan dalam cookie pihak pertama bernama site-language."),
      translate("Technical information: ordinary server or service-provider data such as IP address, browser or device information, request time, and security logs may be processed when the website is accessed.", "Informasi teknis: data server atau penyedia layanan yang lazim seperti alamat IP, informasi browser atau perangkat, waktu permintaan, serta log keamanan dapat diproses saat situs diakses."),
    ],
  },
  {
    id: "data-minimisation",
    title: translate("Please limit sensitive information", "Mohon batasi informasi sensitif"),
    paragraphs: [
      translate(
        "The website is not designed to request sensitive personal data. Please do not submit identity numbers, financial account details, health information, passwords, classified vessel information, or other sensitive or confidential material unless our authorized team specifically requests it through an appropriate channel.",
        "Situs tidak dirancang untuk meminta data pribadi yang bersifat sensitif. Jangan mengirimkan nomor identitas, detail rekening keuangan, informasi kesehatan, kata sandi, informasi kapal yang bersifat rahasia, atau materi sensitif maupun rahasia lainnya kecuali diminta secara khusus oleh tim berwenang kami melalui saluran yang sesuai.",
      ),
    ],
  },
  {
    id: "purposes",
    title: translate("How we use personal data", "Cara kami menggunakan data pribadi"),
    paragraphs: [
      translate("We process personal data only for relevant business and website purposes, including to:", "Kami memproses data pribadi hanya untuk tujuan bisnis dan situs yang relevan, termasuk untuk:"),
    ],
    bullets: [
      translate("Receive, record, route, and respond to product, service, vessel, or project inquiries.", "Menerima, mencatat, meneruskan, dan menanggapi inquiry produk, layanan, kapal, atau proyek."),
      translate("Prepare quotations, coordinate procurement or technical support, and manage customer communications.", "Menyiapkan penawaran, mengoordinasikan pengadaan atau dukungan teknis, dan mengelola komunikasi pelanggan."),
      translate("Open WhatsApp with the inquiry details you entered so you can continue the conversation.", "Membuka WhatsApp dengan detail inquiry yang Anda masukkan agar percakapan dapat dilanjutkan."),
      translate("Remember your selected website language.", "Mengingat bahasa situs yang Anda pilih."),
      translate("Maintain website security, prevent misuse, troubleshoot problems, and improve reliability.", "Menjaga keamanan situs, mencegah penyalahgunaan, menangani masalah, dan meningkatkan keandalan."),
      translate("Meet applicable legal, regulatory, accounting, and dispute-resolution obligations.", "Memenuhi kewajiban hukum, regulasi, akuntansi, dan penyelesaian sengketa yang berlaku."),
    ],
  },
  {
    id: "processing-basis",
    title: translate("Basis for processing", "Dasar pemrosesan"),
    paragraphs: [
      translate(
        "Depending on the circumstances and applicable law, processing may be based on your consent, steps requested by you before entering into a transaction, performance of an agreement, compliance with a legal obligation, or another lawful and proportionate business interest. You may withdraw consent where consent is the applicable basis, without affecting processing already carried out lawfully.",
        "Bergantung pada keadaan dan hukum yang berlaku, pemrosesan dapat didasarkan pada persetujuan Anda, langkah yang Anda minta sebelum melakukan transaksi, pelaksanaan perjanjian, pemenuhan kewajiban hukum, atau kepentingan bisnis lain yang sah dan proporsional. Anda dapat menarik persetujuan apabila persetujuan merupakan dasar yang berlaku, tanpa memengaruhi pemrosesan yang sebelumnya telah dilakukan secara sah.",
      ),
    ],
  },
  {
    id: "firebase-whatsapp",
    title: translate("Firebase and WhatsApp inquiry flow", "Alur inquiry Firebase dan WhatsApp"),
    paragraphs: [
      translate(
        "When you submit the website inquiry form, the entered details are first saved to our Firebase database as a lead record. The website then opens WhatsApp with a message containing those details. You choose whether to send that WhatsApp message. Once WhatsApp opens, its own terms and privacy practices also apply.",
        "Ketika Anda mengirim form inquiry situs, detail yang dimasukkan terlebih dahulu disimpan ke database Firebase kami sebagai catatan lead. Situs kemudian membuka WhatsApp dengan pesan yang berisi detail tersebut. Anda memilih apakah akan mengirim pesan WhatsApp itu. Setelah WhatsApp terbuka, ketentuan dan praktik privasi WhatsApp juga berlaku.",
      ),
      translate(
        "Google/Firebase and Meta/WhatsApp may process information on infrastructure located outside Indonesia. Where cross-border processing occurs, we seek to use providers and safeguards appropriate to the data and applicable law.",
        "Google/Firebase dan Meta/WhatsApp dapat memproses informasi pada infrastruktur yang berada di luar Indonesia. Apabila terjadi pemrosesan lintas batas, kami berupaya menggunakan penyedia dan perlindungan yang sesuai dengan data serta hukum yang berlaku.",
      ),
    ],
    links: [
      { label: translate("Firebase privacy and security", "Privasi dan keamanan Firebase"), href: "https://firebase.google.com/support/privacy", external: true },
      { label: translate("WhatsApp privacy policies", "Kebijakan privasi WhatsApp"), href: "https://www.whatsapp.com/legal/privacy-policies", external: true },
    ],
  },
  {
    id: "sharing",
    title: translate("When data may be shared", "Kapan data dapat dibagikan"),
    paragraphs: [
      translate("We do not sell personal data. We may disclose relevant data only as reasonably necessary to:", "Kami tidak menjual data pribadi. Kami hanya dapat mengungkapkan data yang relevan sejauh diperlukan secara wajar kepada:"),
    ],
    bullets: [
      translate("Authorized employees, offices, and contractors who need it to handle an inquiry or provide requested products and services.", "Karyawan, kantor, dan kontraktor berwenang yang memerlukannya untuk menangani inquiry atau menyediakan produk dan layanan yang diminta."),
      translate("Technology and communications providers, including Google/Firebase and, when you continue there, WhatsApp.", "Penyedia teknologi dan komunikasi, termasuk Google/Firebase dan, ketika Anda melanjutkan ke sana, WhatsApp."),
      translate("Professional advisers, auditors, insurers, or logistics and project partners where relevant and subject to appropriate duties.", "Penasihat profesional, auditor, perusahaan asuransi, atau mitra logistik dan proyek apabila relevan dan tunduk pada kewajiban yang sesuai."),
      translate("Courts, regulators, law-enforcement bodies, or other parties when required by law or necessary to establish, exercise, or defend legal rights.", "Pengadilan, regulator, aparat penegak hukum, atau pihak lain apabila diwajibkan oleh hukum atau diperlukan untuk menetapkan, menjalankan, atau mempertahankan hak hukum."),
      translate("A successor or transaction party in a legitimate reorganization, merger, acquisition, or transfer, subject to applicable protections.", "Penerus atau pihak transaksi dalam reorganisasi, merger, akuisisi, atau pengalihan yang sah, dengan tunduk pada perlindungan yang berlaku."),
    ],
  },
  {
    id: "cookies",
    title: translate("Cookies and preferences", "Cookie dan preferensi"),
    paragraphs: [
      translate(
        "The website uses a first-party site-language cookie to remember whether you selected English or Indonesian. It is configured to last for up to one year unless you delete it earlier. Your browser can block or delete cookies, but the website may then return to its default language.",
        "Situs menggunakan cookie pihak pertama site-language untuk mengingat apakah Anda memilih bahasa Inggris atau Indonesia. Cookie tersebut dikonfigurasi untuk bertahan hingga satu tahun kecuali Anda menghapusnya lebih awal. Browser Anda dapat memblokir atau menghapus cookie, tetapi situs kemudian dapat kembali ke bahasa bawaan.",
      ),
    ],
  },
  {
    id: "retention-security",
    title: translate("Retention and security", "Retensi dan keamanan"),
    paragraphs: [
      translate(
        "We retain personal data only for as long as reasonably needed for the purposes described above, including follow-up, business records, warranty or project history, legal compliance, and dispute handling. When data is no longer needed, we take reasonable steps to delete, anonymize, or securely dispose of it, subject to backup cycles and legal requirements.",
        "Kami menyimpan data pribadi hanya selama secara wajar diperlukan untuk tujuan di atas, termasuk tindak lanjut, catatan bisnis, riwayat jaminan atau proyek, kepatuhan hukum, dan penanganan sengketa. Ketika data tidak lagi diperlukan, kami mengambil langkah wajar untuk menghapus, menganonimkan, atau memusnahkannya secara aman, dengan memperhatikan siklus cadangan dan kewajiban hukum.",
      ),
      translate(
        "We use reasonable organizational and technical safeguards intended to protect data against unauthorized access, loss, misuse, alteration, or disclosure. No internet transmission or storage system can be guaranteed completely secure.",
        "Kami menggunakan perlindungan organisasi dan teknis yang wajar untuk melindungi data dari akses tanpa izin, kehilangan, penyalahgunaan, perubahan, atau pengungkapan. Tidak ada transmisi internet atau sistem penyimpanan yang dapat dijamin sepenuhnya aman.",
      ),
    ],
  },
  {
    id: "your-rights",
    title: translate("Your personal data rights", "Hak Anda atas data pribadi"),
    paragraphs: [
      translate(
        "Subject to applicable law and relevant exceptions, you may request information about processing, access or a copy of your data, correction of inaccurate data, deletion or termination of processing, withdrawal of consent, or another right provided by Indonesian personal data protection law. We may need to verify your identity and clarify the request before acting on it.",
        "Dengan tunduk pada hukum yang berlaku dan pengecualian yang relevan, Anda dapat meminta informasi mengenai pemrosesan, akses atau salinan data, perbaikan data yang tidak akurat, penghapusan atau penghentian pemrosesan, penarikan persetujuan, atau hak lain yang diberikan oleh hukum pelindungan data pribadi Indonesia. Kami mungkin perlu memverifikasi identitas Anda dan memperjelas permintaan sebelum menindaklanjutinya.",
      ),
      translate(
        "Indonesia's Law No. 27 of 2022 on Personal Data Protection provides the primary statutory framework referenced by this policy.",
        "Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi merupakan kerangka hukum utama yang dirujuk oleh kebijakan ini.",
      ),
    ],
    links: [
      { label: translate("Official PDP Law reference", "Rujukan resmi UU PDP"), href: "https://jdih.komdigi.go.id/produk_hukum/view/id/832/t/undangundang%20nomor%2027%20tahun%202022", external: true },
    ],
  },
  {
    id: "children",
    title: translate("Children's privacy", "Privasi anak"),
    paragraphs: [
      translate(
        "This business website and its inquiry form are not directed to children. A parent or guardian who believes a child has submitted personal data should contact us so we can review and take appropriate action.",
        "Situs bisnis dan form inquiry ini tidak ditujukan untuk anak. Orang tua atau wali yang meyakini seorang anak telah mengirimkan data pribadi dapat menghubungi kami agar kami dapat meninjau dan mengambil tindakan yang sesuai.",
      ),
    ],
  },
  {
    id: "policy-changes",
    title: translate("Changes to this policy", "Perubahan kebijakan ini"),
    paragraphs: [
      translate(
        "We may update this policy when the website, our processing activities, service providers, or applicable requirements change. The latest revision date appears at the top of the page. Material changes may also be communicated through another reasonable channel where appropriate.",
        "Kami dapat memperbarui kebijakan ini ketika situs, kegiatan pemrosesan, penyedia layanan, atau persyaratan yang berlaku berubah. Tanggal revisi terbaru tercantum di bagian atas halaman. Perubahan material juga dapat disampaikan melalui saluran lain yang wajar apabila sesuai.",
      ),
    ],
  },
]);
</script>

<template>
  <PolicyDocument
    :kicker="translate('Privacy', 'Privasi')"
    :title="translate('Privacy Policy', 'Kebijakan Privasi')"
    :lead="translate('How PT Duta Raya Marine handles personal data when you visit our website, submit an inquiry, or continue a conversation through WhatsApp.', 'Cara PT Duta Raya Marine menangani data pribadi ketika Anda mengunjungi situs, mengirim inquiry, atau melanjutkan percakapan melalui WhatsApp.')"
    :updated-label="translate('Last updated:', 'Terakhir diperbarui:')"
    :updated-value="updatedValue"
    :navigation-label="translate('On this page', 'Dalam halaman ini')"
    :sections="sections"
    :contact-title="translate('Privacy requests and questions', 'Permintaan dan pertanyaan privasi')"
    :contact-body="translate('Email us to request access, correction, deletion, or clarification regarding personal data processed through this website.', 'Kirim email kepada kami untuk meminta akses, perbaikan, penghapusan, atau penjelasan mengenai data pribadi yang diproses melalui situs ini.')"
    contact-label="sales@dutarayamarine.com"
  />
</template>
