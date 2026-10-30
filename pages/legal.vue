<script setup lang="ts">
import { computed } from "vue";
import { seoKeywords } from "~/seo.config";

definePageMeta({ layout: "website" });
const { translate } = useSiteLocale();

usePageSeo({
  title: computed(() => translate("Legal Notice & Website Terms | Duta Raya Marine", "Pemberitahuan Hukum & Ketentuan Situs | Duta Raya Marine")),
  description: computed(() => translate("Read the legal notice and terms governing the use of the PT Duta Raya Marine website, content, inquiries, and third-party links.", "Baca pemberitahuan hukum dan ketentuan yang mengatur penggunaan situs, konten, inquiry, serta tautan pihak ketiga PT Duta Raya Marine.")),
  path: "/legal",
  keywords: seoKeywords.legal,
});

const updatedValue = computed(() => translate("30 October 2026", "30 Oktober 2026"));

const sections = computed(() => [
  {
    id: "scope",
    title: translate("Acceptance and scope", "Penerimaan dan ruang lingkup"),
    paragraphs: [
      translate(
        "These terms apply when you access or use the public website operated by PT Duta Raya Marine. By continuing to use the website, you acknowledge these terms. If you do not agree, please discontinue use of the website.",
        "Ketentuan ini berlaku ketika Anda mengakses atau menggunakan situs publik yang dioperasikan oleh PT Duta Raya Marine. Dengan terus menggunakan situs, Anda mengakui ketentuan ini. Jika tidak setuju, mohon hentikan penggunaan situs.",
      ),
      translate(
        "Additional written terms may apply to quotations, purchase orders, projects, products, and technical services. Those specific written terms take precedence if they conflict with this page.",
        "Ketentuan tertulis tambahan dapat berlaku untuk penawaran, purchase order, proyek, produk, dan layanan teknis. Ketentuan tertulis khusus tersebut berlaku lebih dahulu apabila bertentangan dengan halaman ini.",
      ),
    ],
  },
  {
    id: "website-purpose",
    title: translate("Website purpose", "Tujuan situs"),
    paragraphs: [
      translate(
        "This website provides general information about our company, marine and offshore products, technical capabilities, projects, and contact channels. Website content is informational and does not by itself constitute a binding offer, warranty, technical recommendation, or contract.",
        "Situs ini menyediakan informasi umum mengenai perusahaan, produk kelautan dan lepas pantai, kemampuan teknis, proyek, serta saluran kontak kami. Konten situs bersifat informatif dan dengan sendirinya bukan merupakan penawaran yang mengikat, jaminan, rekomendasi teknis, atau kontrak.",
      ),
    ],
  },
  {
    id: "accuracy-availability",
    title: translate("Accuracy and availability", "Akurasi dan ketersediaan"),
    paragraphs: [
      translate(
        "We work to keep website information useful and current, but specifications, images, availability, lead times, service coverage, and other details may change. Confirm critical requirements directly with our team before making purchasing or operational decisions.",
        "Kami berupaya menjaga informasi situs tetap bermanfaat dan terkini, tetapi spesifikasi, gambar, ketersediaan, waktu pengadaan, cakupan layanan, dan detail lainnya dapat berubah. Konfirmasikan kebutuhan penting langsung dengan tim kami sebelum mengambil keputusan pembelian atau operasional.",
      ),
      translate(
        "We may update, suspend, or withdraw any part of the website without prior notice where reasonably necessary.",
        "Kami dapat memperbarui, menangguhkan, atau menarik bagian mana pun dari situs tanpa pemberitahuan sebelumnya apabila secara wajar diperlukan.",
      ),
    ],
  },
  {
    id: "inquiries-orders",
    title: translate("Inquiries, quotations, and orders", "Inquiry, penawaran, dan pesanan"),
    paragraphs: [
      translate(
        "Sending an inquiry through this website, email, or WhatsApp does not create an order or obligate either party. A transaction becomes binding only through the applicable written quotation, order confirmation, agreement, or other document accepted by authorized representatives.",
        "Pengiriman inquiry melalui situs, email, atau WhatsApp tidak membentuk pesanan maupun mewajibkan salah satu pihak. Transaksi menjadi mengikat hanya melalui penawaran tertulis, konfirmasi pesanan, perjanjian, atau dokumen lain yang berlaku dan diterima oleh perwakilan yang berwenang.",
      ),
      translate(
        "Product suitability, class requirements, vessel specifications, delivery terms, taxes, and warranties must be confirmed in the relevant commercial documents.",
        "Kesesuaian produk, persyaratan klasifikasi, spesifikasi kapal, ketentuan pengiriman, pajak, dan jaminan harus dikonfirmasi dalam dokumen komersial terkait.",
      ),
    ],
  },
  {
    id: "intellectual-property",
    title: translate("Intellectual property", "Kekayaan intelektual"),
    paragraphs: [
      translate(
        "Unless stated otherwise, the website design, company materials, text, graphics, photographs, and other original content are owned by or licensed to PT Duta Raya Marine and are protected by applicable intellectual property laws.",
        "Kecuali dinyatakan lain, desain situs, materi perusahaan, teks, grafis, foto, dan konten orisinal lainnya dimiliki oleh atau dilisensikan kepada PT Duta Raya Marine serta dilindungi oleh hukum kekayaan intelektual yang berlaku.",
      ),
    ],
    bullets: [
      translate("You may view and print reasonable extracts for legitimate personal or business evaluation.", "Anda dapat melihat dan mencetak kutipan secara wajar untuk evaluasi pribadi atau bisnis yang sah."),
      translate("You may not republish, sell, modify, or commercially exploit website content without prior written permission.", "Anda tidak boleh menerbitkan ulang, menjual, mengubah, atau mengeksploitasi konten situs secara komersial tanpa izin tertulis sebelumnya."),
      translate("Third-party names, brands, and trademarks remain the property of their respective owners.", "Nama, merek, dan merek dagang pihak ketiga tetap menjadi milik pemiliknya masing-masing."),
    ],
  },
  {
    id: "acceptable-use",
    title: translate("Acceptable use", "Penggunaan yang diperbolehkan"),
    paragraphs: [
      translate("You must not use this website in a way that is unlawful, harmful, fraudulent, or disruptive. In particular, you must not:", "Anda tidak boleh menggunakan situs ini dengan cara yang melanggar hukum, merugikan, menipu, atau mengganggu. Secara khusus, Anda tidak boleh:"),
    ],
    bullets: [
      translate("Attempt unauthorized access to the website, its systems, or connected data.", "Mencoba memperoleh akses tanpa izin ke situs, sistem, atau data yang terhubung."),
      translate("Introduce malicious code, interfere with availability, or bypass security controls.", "Memasukkan kode berbahaya, mengganggu ketersediaan, atau melewati kontrol keamanan."),
      translate("Submit false, misleading, infringing, or unlawful material.", "Mengirimkan materi palsu, menyesatkan, melanggar hak, atau melawan hukum."),
      translate("Use automated extraction in a manner that places an unreasonable load on the website.", "Menggunakan ekstraksi otomatis dengan cara yang memberikan beban tidak wajar pada situs."),
    ],
  },
  {
    id: "third-party-services",
    title: translate("Third-party links and services", "Tautan dan layanan pihak ketiga"),
    paragraphs: [
      translate(
        "The website may link to services operated by third parties, including WhatsApp. We do not control those services, and their own terms and privacy practices apply once you leave our website or use their platform.",
        "Situs dapat menautkan ke layanan yang dioperasikan pihak ketiga, termasuk WhatsApp. Kami tidak mengendalikan layanan tersebut, dan ketentuan serta praktik privasi mereka sendiri berlaku setelah Anda meninggalkan situs kami atau menggunakan platform mereka.",
      ),
    ],
  },
  {
    id: "liability",
    title: translate("Limitation of liability", "Batasan tanggung jawab"),
    paragraphs: [
      translate(
        "To the extent permitted by applicable law, PT Duta Raya Marine is not liable for indirect, incidental, or consequential loss arising solely from reliance on general website content, temporary unavailability, or a third-party service. Nothing in these terms excludes liability that cannot legally be excluded.",
        "Sejauh diizinkan oleh hukum yang berlaku, PT Duta Raya Marine tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang timbul semata-mata karena mengandalkan konten umum situs, ketidaktersediaan sementara, atau layanan pihak ketiga. Tidak ada bagian dalam ketentuan ini yang mengecualikan tanggung jawab yang secara hukum tidak dapat dikecualikan.",
      ),
    ],
  },
  {
    id: "privacy",
    title: translate("Privacy", "Privasi"),
    paragraphs: [
      translate(
        "Our Privacy Policy explains what personal data the website processes, why it is used, the service providers involved, and how you may exercise your rights.",
        "Kebijakan Privasi kami menjelaskan data pribadi yang diproses situs, alasan penggunaannya, penyedia layanan yang terlibat, serta cara Anda dapat menggunakan hak Anda.",
      ),
    ],
    links: [
      { label: translate("Read the Privacy Policy", "Baca Kebijakan Privasi"), href: "/privacy-policy" },
    ],
  },
  {
    id: "governing-law",
    title: translate("Changes and governing law", "Perubahan dan hukum yang berlaku"),
    paragraphs: [
      translate(
        "We may revise these terms to reflect website, business, or legal changes. The date above shows the latest revision. These terms are governed by the laws of the Republic of Indonesia, subject to any mandatory rights or jurisdiction that applicable law provides.",
        "Kami dapat merevisi ketentuan ini untuk mencerminkan perubahan situs, bisnis, atau hukum. Tanggal di atas menunjukkan revisi terbaru. Ketentuan ini diatur oleh hukum Republik Indonesia, dengan tetap memperhatikan hak atau yurisdiksi wajib yang diberikan oleh hukum yang berlaku.",
      ),
    ],
  },
]);
</script>

<template>
  <PolicyDocument
    :kicker="translate('Legal', 'Legal')"
    :title="translate('Legal notice & website terms', 'Pemberitahuan hukum & ketentuan situs')"
    :lead="translate('The rules and important information that apply when you access this website or contact PT Duta Raya Marine through its digital channels.', 'Aturan dan informasi penting yang berlaku ketika Anda mengakses situs ini atau menghubungi PT Duta Raya Marine melalui saluran digitalnya.')"
    :updated-label="translate('Last updated:', 'Terakhir diperbarui:')"
    :updated-value="updatedValue"
    :navigation-label="translate('On this page', 'Dalam halaman ini')"
    :sections="sections"
    :contact-title="translate('Questions about these terms?', 'Pertanyaan tentang ketentuan ini?')"
    :contact-body="translate('Contact our team if you need clarification about this legal notice or the permitted use of website materials.', 'Hubungi tim kami jika Anda memerlukan penjelasan mengenai pemberitahuan hukum ini atau penggunaan materi situs yang diperbolehkan.')"
    contact-label="sales@dutarayamarine.com"
  />
</template>
