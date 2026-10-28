<script setup lang="ts">
import { computed } from "vue";
import { seoKeywords } from "~/seo.config";

definePageMeta({ layout: "website" });
const { translate } = useSiteLocale();

usePageSeo({
  title: computed(() => translate("Marine Equipment & Ship Spare Parts | Duta Raya Marine", "Peralatan Kelautan & Suku Cadang Kapal | Duta Raya Marine")),
  description: computed(() => translate("Source genuine, OEM, and aftermarket ship spare parts, marine equipment, consumables, hydraulic components, and HVAC products in Batam, Indonesia.", "Dapatkan suku cadang kapal genuine, OEM, dan aftermarket, peralatan kelautan, bahan habis pakai, komponen hidraulik, serta produk HVAC di Batam, Indonesia.")),
  path: "/products",
  keywords: seoKeywords.products,
});

const products = computed(() => [
  {
    icon: "mdi-package-variant-closed",
    title: translate("Consumables & Ship Supplies", "Bahan Habis Pakai & Perlengkapan Kapal"),
    desc: translate("Mooring and lashing consumables, rope and cordage, wire rope, shackles, turnbuckles, lifting accessories, welding and grinding supplies, paint and coating tools, cleaning supplies, grease, lubricants, fasteners, tarpaulins, and deck tools.", "Bahan habis pakai untuk tambat dan lashing, tali dan cordage, wire rope, shackle, turnbuckle, aksesori pengangkatan, perlengkapan las dan gerinda, alat cat dan coating, perlengkapan pembersih, grease, pelumas, fastener, terpal, dan alat dek."),
    tags: [translate("Rope & Lashing", "Tali & Lashing"), translate("Welding", "Pengelasan"), translate("Paint & Coating", "Cat & Coating"), translate("Deck Tools", "Alat Dek")],
  },
  {
    icon: "mdi-engine",
    title: translate("Engine & Machinery Spare Parts", "Suku Cadang Mesin & Permesinan"),
    desc: translate("Main and auxiliary engine and generator parts, overhaul kits, pistons, liners, bearings, cylinder heads, valves, fuel pumps, injectors, turbochargers, pumps, radiators, heat exchangers, filters, sensors, and instruments.", "Suku cadang mesin utama dan bantu serta generator, overhaul kit, piston, liner, bearing, cylinder head, valve, fuel pump, injector, turbocharger, pompa, radiator, heat exchanger, filter, sensor, dan instrumen."),
    tags: ["Genuine", "OEM", "Aftermarket"],
  },
  {
    icon: "mdi-lightning-bolt",
    title: translate("Hydraulic, Gearbox & Cooling Parts", "Suku Cadang Hidraulik, Gearbox & Pendingin"),
    desc: translate("Spare parts for hydraulic systems and gearboxes, plus fresh and sea water pumps, oil pumps, oil coolers, thermostats, gaskets, seals, and other cooling system components.", "Suku cadang untuk sistem hidraulik dan gearbox, serta pompa air tawar dan air laut, pompa oli, oil cooler, thermostat, gasket, seal, dan komponen sistem pendingin lainnya."),
    tags: [translate("Hydraulics", "Hidraulik"), "Gearboxes", translate("Pumps & Coolers", "Pompa & Pendingin")],
  },
  {
    icon: "mdi-snowflake",
    title: translate("HVAC & Refrigeration Products", "Produk HVAC & Refrigerasi"),
    desc: translate("Marine and industrial compressors, overhaul kits, valves, pistons, bearings, motors, refrigerants and oils, filter driers, expansion valves, condensers, evaporators, AHUs, FCUs, controls, filters, copper pipes, and insulation.", "Kompresor kelautan dan industri, overhaul kit, valve, piston, bearing, motor, refrigeran dan oli, filter drier, expansion valve, condenser, evaporator, AHU, FCU, kontrol, filter, pipa tembaga, dan insulasi."),
    tags: [translate("Compressors", "Kompresor"), translate("Refrigeration", "Refrigerasi"), "HVAC"],
  },
]);

const engineBrands = ["MAN B&W", "Wärtsilä", "Yanmar", "Mitsubishi", "Caterpillar", "Cummins", "Daihatsu", "MaK", "Niigata", "Hyundai HiMSEN", "Doosan", "Volvo Penta", "MTU", "Deutz", "Perkins", "Scania", "Isuzu", "Kubota", "John Deere"];
const hydraulicBrands = ["Rexroth", "Parker", "Eaton", "Danfoss"];
const compressorBrands = ["Bitzer", "Carrier", "Copeland", "Danfoss", "Carlyle", "Frascold", "Dorin", "Sabroe", "Mycom", "Howden", "GEA", "York", "Trane", "Daikin", "RefComp", "Bock", "Atlas Copco", "Ingersoll Rand", "Sullair", "Kaeser", "Sperre", "Sauer", "Hamworthy"];
</script>

<template>
  <div class="site-container">
    <header class="site-page-heading">
      <p class="site-kicker">{{ translate("Products", "Produk") }}</p>
      <h1 class="site-title">{{ translate("Marine equipment &", "Peralatan kelautan &") }}<br /><span>{{ translate("ship spare parts.", "suku cadang kapal.") }}</span></h1>
      <p class="site-lead">
        {{ translate("We supply genuine, OEM, and aftermarket parts, consumables, and refrigeration equipment for vessel and project requirements.", "Kami memasok suku cadang genuine, OEM, dan aftermarket, bahan habis pakai, serta peralatan refrigerasi untuk kebutuhan kapal dan proyek.") }}
      </p>
    </header>

    <section class="site-card-grid" :aria-label="translate('Product categories', 'Kategori produk')">
      <article v-for="product in products" :key="product.title" class="site-card product-card">
        <div class="site-card-icon"><v-icon :icon="product.icon" size="25" /></div>
        <h3>{{ product.title }}</h3>
        <p>{{ product.desc }}</p>
        <div class="site-tags">
          <span v-for="tag in product.tags" :key="tag">{{ tag }}</span>
        </div>
      </article>
    </section>

    <section class="supported-brands">
      <header class="site-page-heading">
        <p class="site-kicker">{{ translate("Brand coverage", "Cakupan merek") }}</p>
        <h2 class="site-section-title">{{ translate("Supported equipment brands", "Merek peralatan yang didukung") }}</h2>
        <p class="site-lead">{{ translate("Brand support varies by equipment and availability. Share the model and part number so we can check your requirement.", "Dukungan merek bergantung pada peralatan dan ketersediaan. Sampaikan model dan nomor suku cadang agar kami dapat memeriksa kebutuhan Anda.") }}</p>
      </header>
      <div class="brand-group">
        <h3>{{ translate("Engine brands", "Merek mesin") }}</h3>
        <div class="site-tags"><span v-for="brand in engineBrands" :key="brand">{{ brand }}</span></div>
      </div>
      <div class="brand-group">
        <h3>{{ translate("Hydraulic brands", "Merek hidraulik") }}</h3>
        <div class="site-tags"><span v-for="brand in hydraulicBrands" :key="brand">{{ brand }}</span></div>
      </div>
      <div class="brand-group">
        <h3>{{ translate("Compressor brands", "Merek kompresor") }}</h3>
        <div class="site-tags"><span v-for="brand in compressorBrands" :key="brand">{{ brand }}</span></div>
      </div>
    </section>

    <section class="site-cta">
      <div>
        <h2>{{ translate("Looking for a specific part or supply?", "Mencari suku cadang atau perlengkapan tertentu?") }}</h2>
        <p>{{ translate("Send us the equipment details, part number, or vessel requirement.", "Kirimkan detail peralatan, nomor suku cadang, atau kebutuhan kapal kepada kami.") }}</p>
      </div>
      <NuxtLink to="/contact">{{ translate("Request a quotation", "Minta penawaran") }} <v-icon icon="mdi-arrow-right" size="18" /></NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.product-card {
  min-height: 270px;
}

.site-cta {
  margin-top: 40px;
}

.supported-brands {
  margin-top: 64px;
}

.supported-brands .site-page-heading {
  margin-bottom: 24px;
}

.brand-group + .brand-group {
  margin-top: 24px;
}

.brand-group h3 {
  margin: 0 0 10px;
  color: #0f172a;
  font-size: 14px;
}
</style>
