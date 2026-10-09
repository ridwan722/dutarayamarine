<script setup lang="ts">
definePageMeta({ layout: "website" });

const products = [
  {
    icon: "mdi-package-variant-closed",
    title: "Marine Consumables & Ship Supplies",
    desc: "Marine paint and coating, welding consumables, gaskets, seals, lubricants, chemicals, filters, PPE and safety equipment, ropes, valves, and deck and engine room consumables.",
    tags: ["Paint & Coating", "Safety / PPE", "Valves & Fittings"],
  },
  {
    icon: "mdi-engine",
    title: "Engine & Machinery Spare Parts",
    desc: "Main and auxiliary engine spare parts, overhaul kits, pistons, bearings, cylinder heads, fuel pumps, turbochargers, pumps, radiators, and heat exchangers.",
    tags: ["MAN B&W", "Wärtsilä", "Caterpillar", "Yanmar"],
  },
  {
    icon: "mdi-lightning-bolt",
    title: "Automation & Electrical Components",
    desc: "PLC and HMI, VFD and inverter, control panels, sensors, transmitters, relays, contactors, circuit breakers, and marine alarm and monitoring systems.",
    tags: ["PLC & HMI", "Sensors", "VFD Drive"],
  },
  {
    icon: "mdi-snowflake",
    title: "Compressor & Refrigeration Equipment",
    desc: "Marine and industrial compressors, overhaul kits, valves, pistons, bearings, gaskets, and filter driers for refrigeration and climate control systems.",
    tags: ["Bitzer", "Carrier", "Daikin", "Copeland"],
  },
];
</script>

<template>
  <div class="site-container">
    <header class="site-page-heading">
      <p class="site-kicker">Produk</p>
      <h1 class="site-title">Equipment for<br /><span>reliable operations.</span></h1>
      <p class="site-lead">
        We source marine supplies, machinery parts, and technical equipment to
        match your vessel and project requirements.
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
</style>
