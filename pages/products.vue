<script setup lang="ts">
import { seoKeywords } from "~/seo.config";

definePageMeta({ layout: "website" });

usePageSeo({
  title: "Marine Equipment & Ship Spare Parts | Duta Raya Marine",
  description:
    "Source genuine, OEM, and aftermarket ship spare parts, marine equipment, consumables, hydraulic components, and HVAC products in Batam, Indonesia.",
  path: "/products",
  keywords: seoKeywords.products,
});

const products = [
  {
    icon: "mdi-package-variant-closed",
    title: "Consumables & Ship Supplies",
    desc: "Mooring and lashing consumables, rope and cordage, wire rope, shackles, turnbuckles, lifting accessories, welding and grinding supplies, paint and coating tools, cleaning supplies, grease, lubricants, fasteners, tarpaulins, and deck tools.",
    tags: ["Rope & Lashing", "Welding", "Paint & Coating", "Deck Tools"],
  },
  {
    icon: "mdi-engine",
    title: "Engine & Machinery Spare Parts",
    desc: "Main and auxiliary engine and generator parts, overhaul kits, pistons, liners, bearings, cylinder heads, valves, fuel pumps, injectors, turbochargers, pumps, radiators, heat exchangers, filters, sensors, and instruments.",
    tags: ["Genuine", "OEM", "Aftermarket"],
  },
  {
    icon: "mdi-lightning-bolt",
    title: "Hydraulic, Gearbox & Cooling Parts",
    desc: "Spare parts for hydraulic systems and gearboxes, plus fresh and sea water pumps, oil pumps, oil coolers, thermostats, gaskets, seals, and other cooling system components.",
    tags: ["Hydraulics", "Gearboxes", "Pumps & Coolers"],
  },
  {
    icon: "mdi-snowflake",
    title: "HVAC & Refrigeration Products",
    desc: "Marine and industrial compressors, overhaul kits, valves, pistons, bearings, motors, refrigerants and oils, filter driers, expansion valves, condensers, evaporators, AHUs, FCUs, controls, filters, copper pipes, and insulation.",
    tags: ["Compressors", "Refrigeration", "HVAC"],
  },
];

const engineBrands = ["MAN B&W", "Wärtsilä", "Yanmar", "Mitsubishi", "Caterpillar", "Cummins", "Daihatsu", "MaK", "Niigata", "Hyundai HiMSEN", "Doosan", "Volvo Penta", "MTU", "Deutz", "Perkins", "Scania", "Isuzu", "Kubota", "John Deere"];
const hydraulicBrands = ["Rexroth", "Parker", "Eaton", "Danfoss"];
const compressorBrands = ["Bitzer", "Carrier", "Copeland", "Danfoss", "Carlyle", "Frascold", "Dorin", "Sabroe", "Mycom", "Howden", "GEA", "York", "Trane", "Daikin", "RefComp", "Bock", "Atlas Copco", "Ingersoll Rand", "Sullair", "Kaeser", "Sperre", "Sauer", "Hamworthy"];
</script>

<template>
  <div class="site-container">
    <header class="site-page-heading">
      <p class="site-kicker">Produk</p>
      <h1 class="site-title">Marine equipment &amp;<br /><span>ship spare parts.</span></h1>
      <p class="site-lead">
        We supply genuine, OEM, and aftermarket parts, consumables, and
        refrigeration equipment for vessel and project requirements.
      </p>
    </header>

    <section class="site-card-grid" aria-label="Kategori produk">
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
        <p class="site-kicker">Cakupan merek</p>
        <h2 class="site-section-title">Supported equipment brands</h2>
        <p class="site-lead">Brand support varies by equipment and availability. Share the model and part number so we can check your requirement.</p>
      </header>
      <div class="brand-group">
        <h3>Engine brands</h3>
        <div class="site-tags"><span v-for="brand in engineBrands" :key="brand">{{ brand }}</span></div>
      </div>
      <div class="brand-group">
        <h3>Hydraulic brands</h3>
        <div class="site-tags"><span v-for="brand in hydraulicBrands" :key="brand">{{ brand }}</span></div>
      </div>
      <div class="brand-group">
        <h3>Compressor brands</h3>
        <div class="site-tags"><span v-for="brand in compressorBrands" :key="brand">{{ brand }}</span></div>
      </div>
    </section>

    <section class="site-cta">
      <div>
        <h2>Looking for a specific part or supply?</h2>
        <p>Send us the equipment details, part number, or vessel requirement.</p>
      </div>
      <NuxtLink to="/contact">Request a quotation <v-icon icon="mdi-arrow-right" size="18" /></NuxtLink>
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
