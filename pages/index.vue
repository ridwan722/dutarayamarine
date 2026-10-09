<script setup>
definePageMeta({
  layout: "blank",
});

// Data Produk Utama
const products = [
  {
    icon: "mdi-package-variant-closed",
    title: "Marine Consumables & Ship Supplies",
    desc: "Marine paint & coating, welding consumables, gaskets, seals, lubricants, chemicals, filters, PPE & safety equipment, ropes, valves, and deck & engine room consumables.",
    tags: ["Paint & Coating", "Safety/PPE", "Valves & Fittings"]
  },
  {
    icon: "mdi-engine",
    title: "Engine & Machinery Spare Parts",
    desc: "Main & auxiliary engine spare parts, overhaul kits, pistons, bearings, cylinder heads, fuel pumps, turbochargers, pumps, radiators, and heat exchangers.",
    tags: ["MAN B&W", "Wärtsilä", "Caterpillar", "Yanmar"]
  },
  {
    icon: "mdi-lightning-bolt",
    title: "Automation & Electrical Components",
    desc: "PLC & HMI, VFD/inverter, control panels, sensors, transmitters, relays, contactors, circuit breakers, and marine alarm & monitoring systems.",
    tags: ["PLC & HMI", "Sensors", "VFD Drive"]
  },
  {
    icon: "mdi-snowflake",
    title: "Compressor & Refrigeration Equipment",
    desc: "Marine & industrial compressors, overhaul kits, valves, pistons, bearings, gaskets, and filter driers for refrigeration & climate control systems.",
    tags: ["Bitzer", "Carrier", "Daikin", "Copeland"]
  }
];

// Data Layanan Teknis
const services = [
  {
    icon: "mdi-cog-sync",
    title: "Mechanical Services & Engine Overhaul",
    desc: "Main & auxiliary engine overhauls (top & major), pump overhauls, hydraulic repairs, turbocharger maintenance, shaft alignment, and radiator/heat exchanger retubing."
  },
  {
    icon: "mdi-air-conditioner",
    title: "HVAC & Refrigeration Services",
    desc: "Marine climate control, accommodation A/C servicing, AHU/FCU maintenance, chiller overhaul, compressor repair, leak testing, and refrigerant re-charging."
  },
  {
    icon: "mdi-tune-vertical",
    title: "Automation & Control Services",
    desc: "PLC & HMI troubleshooting, control panel rewiring, sensor calibration, VFD maintenance, alarm system service, and 24/7 rapid onboard repair."
  },
  {
    icon: "mdi-hammer-wrench",
    title: "Carpentry, Marine Interior & Deck Services",
    desc: "Crew cabin renovation, joinery works, marine-grade flooring/insulation, crane & winch inspection, hydraulic servicing, and deck machinery maintenance."
  }
];

// Data Core Values
const values = [
  {
    title: "Safety First (QHSE)",
    desc: "Strictly enforcing zero-accident policies and environmental responsibility across all workshop activities and shipboard assignments.",
    icon: "mdi-shield-check-outline"
  },
  {
    title: "Technical Precision & Quality",
    desc: "Delivering high-grade, certified components and technical execution that strictly adhere to international marine industry standards.",
    icon: "mdi-check-decagram-outline"
  },
  {
    title: "Timely Delivery & Operational Efficiency",
    desc: "Controlled logistics delivery directly to anchorage, berth, or shipyard slipway with 24/7 rapid response capability.",
    icon: "mdi-clock-fast"
  }
];

// Alur Proses Kerja
const workflowSteps = [
  { num: "01", title: "Inquiry & Assessment", desc: "Quick technical evaluation of required spare parts, specifications, or repair scope." },
  { num: "02", title: "Precision Sourcing & Quotation", desc: "Prompt competitive proposals detailing certified components and lead times." },
  { num: "03", title: "On-Site Execution / Delivery", desc: "Direct logistics delivery to anchorage, berth, or shipyard with certified execution." },
  { num: "04", title: "Commissioning & Handover", desc: "Joint inspection and sign-off with the Chief Engineer or superintendent." }
];
</script>

<template>
  <div class="landing-page">
    <div class="grid-pattern"></div>

    <!-- Header / Navbar -->
    <header class="navbar">
      <div class="nav-container">
        <div class="brand-logo">
          <img src="/public/logo-header.png" alt="DUTA RAYA MARINE" class="logo-img" />
        </div>
        <nav class="nav-menu">
          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a href="#services">Services</a>
          <a href="#values">Core Values</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="content-wrapper">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-header-badge">
          <div class="red-line"></div>
          <span class="badge-text">BATAM & JAKARTA, INDONESIA</span>
        </div>
        
        <h1 class="hero-title">
          DUTA RAYA <br />
          <span class="title-red">MARINE</span>
        </h1>
        <p class="hero-subtitle">
          High-grade equipment supply, vessel provisioning, and multidisciplinary technical engineering services for global marine operations.
        </p>

        <!-- Banner Image Box -->
        <div class="hero-banner">
          <div class="banner-overlay"></div>
          <img src="/public/Logo-DRM.png" alt="Duta Raya Marine Logo" class="banner-img" />
          <div class="banner-footer">
            <span class="domain-text">www.dutarayamarine.com</span>
          </div>
        </div>

        <div class="hero-actions">
          <v-btn
            color="#dc2626"
            class="btn-primary text-white"
            rounded="lg"
            size="large"
            elevation="1"
            href="#about"
          >
            Explore Overview
            <v-icon end icon="mdi-arrow-down" />
          </v-btn>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="section-container">
        <div class="about-card">
          <div class="about-header">
            <div>
              <div class="red-line mb-2"></div>
              <h2 class="section-title-dark">ABOUT <span class="title-red">US</span></h2>
            </div>
            <div class="about-logo">
              <img src="/public/Logo-DRM.png" alt="DRM Logo" class="mini-logo" />
            </div>
          </div>

          <div class="about-content-box">
            <div class="red-bar"></div>
            <p class="about-text">
              <strong>PT. Duta Raya Marine</strong> is an integrated marine and offshore solution provider based in Batam, Indonesia. We specialize in high-grade equipment supply, vessel provisioning, and multidisciplinary technical engineering services. We are dedicated to supporting shipowners, shipyards, offshore platforms, and oil & gas operators by delivering dependable products, critical spare parts, and responsive 24/7 technical assistance.
            </p>
          </div>
        </div>
      </section>

      <!-- Products Section -->
      <section id="products" class="section-container">
        <div class="section-header">
          <div class="red-line"></div>
          <div>
            <h2 class="section-title-dark">OUR <span class="title-red">PRODUCTS</span></h2>
            <p class="section-subtitle mb-0">High-grade supplies, machinery spare parts, electrical, and refrigeration systems.</p>
          </div>
        </div>

        <div class="cards-grid">
          <div v-for="(prod, idx) in products" :key="idx" class="service-card">
            <div class="service-icon">
              <v-icon size="28" color="#dc2626">{{ prod.icon }}</v-icon>
            </div>
            <h3 class="card-title">{{ prod.title }}</h3>
            <p class="card-desc mb-4">{{ prod.desc }}</p>
            <div class="tags-wrapper">
              <span v-for="(tag, tIdx) in prod.tags" :key="tIdx" class="mini-tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section id="services" class="section-container">
        <div class="section-header">
          <div class="red-line"></div>
          <div>
            <h2 class="section-title-dark">ENGINEERING <span class="title-red">SERVICES</span></h2>
            <p class="section-subtitle mb-0">Multidisciplinary technical assistance and on-site marine maintenance.</p>
          </div>
        </div>

        <div class="cards-grid">
          <div v-for="(item, index) in services" :key="index" class="service-card">
            <div class="service-icon">
              <v-icon size="28" color="#dc2626">{{ item.icon }}</v-icon>
            </div>
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-desc">{{ item.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Execution Workflow Section -->
      <section class="section-container">
        <div class="white-card">
          <div class="section-header">
            <div class="red-line"></div>
            <h2 class="section-title-dark">EXECUTION <span class="title-red">PROCESS</span></h2>
          </div>
          <div class="workflow-grid">
            <div v-for="(step, sIdx) in workflowSteps" :key="sIdx" class="workflow-item">
              <div class="step-num">{{ step.num }}</div>
              <h4 class="feature-title mt-2">{{ step.title }}</h4>
              <p class="feature-desc">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Core Values Section -->
      <section id="values" class="section-container">
        <div class="white-card">
          <div class="section-header">
            <div class="red-line"></div>
            <h2 class="section-title-dark">CORE <span class="title-red">VALUES</span></h2>
          </div>
          <p class="section-subtitle">
            Driven by safety, quality, and timely delivery, we forge enduring partnerships built on integrity, technical precision, and operational efficiency.
          </p>
          <div class="features-grid">
            <div v-for="(val, idx) in values" :key="idx" class="feature-item">
              <div class="feature-icon">
                <v-icon size="24" color="#dc2626">{{ val.icon }}</v-icon>
              </div>
              <div>
                <h4 class="feature-title">{{ val.title }}</h4>
                <p class="feature-desc">{{ val.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="section-container">
        <div class="contact-card">
          <div class="section-header">
            <div class="red-line"></div>
            <h2 class="section-title-dark">CONTACT <span class="title-red">US</span></h2>
          </div>
          <p class="section-subtitle">
            Contact our team for procurement requests, engineering consultations, or round-the-clock emergency port support.
          </p>

          <div class="contact-grid">
            <!-- Office Locations -->
            <div class="contact-box">
              <div class="box-title">
                <v-icon color="#dc2626" class="mr-2">mdi-map-marker</v-icon>
                <span>Operational Offices</span>
              </div>
              <div class="address-item">
                <strong>Batam:</strong> Ruko Dream Land Blok H3 No. 05, Dreamland Square, Marina City Tanjung Riau, Kec. Sekupang, Kota Batam, Kepulauan Riau 29425
              </div>
              <div class="address-item">
                <strong>Jakarta:</strong> Jln. Raya Pasar Minggu No. 15A, Jakarta Selatan
              </div>
            </div>

            <!-- Communication Channels -->
            <div class="contact-box">
              <div class="box-title">
                <v-icon color="#dc2626" class="mr-2">mdi-phone-in-talk</v-icon>
                <span>Direct Contact</span>
              </div>
              <div class="info-row">
                <v-icon size="20" color="#64748b" class="mr-2">mdi-whatsapp</v-icon>
                <span>+62 821-9998-8670</span>
              </div>
              <div class="info-row">
                <v-icon size="20" color="#64748b" class="mr-2">mdi-email-outline</v-icon>
                <span>sales@dutarayamarine.co</span>
              </div>
              <div class="info-row">
                <v-icon size="20" color="#64748b" class="mr-2">mdi-web</v-icon>
                <span>www.dutarayamarine.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer-bar">
      <span>PT. Duta Raya Marine &copy; 2026. All rights reserved.</span>
    </footer>
  </div>
  <whatsapp></whatsapp>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}

.landing-page {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: #f8fafc;
  color: #1e293b;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, rgba(15, 23, 42, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
  z-index: 0;
}

/* Navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid #e2e8f0;
}

.nav-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-img {
  height: 50px;
  width: auto;
  object-fit: contain;
}

.nav-menu {
  display: flex;
  gap: 28px;
}

.nav-menu a {
  color: #475569;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: color 0.2s;
}

.nav-menu a:hover {
  color: #dc2626;
}

/* Content Layout */
.content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

/* Hero Section */
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 20px;
}

.hero-header-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.red-line {
  width: 32px;
  height: 4px;
  background-color: #dc2626;
  border-radius: 2px;
}

.badge-text {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #475569;
}

.hero-title {
  font-size: 38px;
  font-weight: 900;
  line-height: 1.15;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.title-red {
  color: #dc2626;
}

.hero-subtitle {
  font-size: 15.5px;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 28px;
  max-width: 700px;
}

.hero-banner {
  width: 100%;
  height: 280px;
  background: #0f172a;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  border: 1px solid #cbd5e1;
}

.banner-img {
  max-height: 120px;
  object-fit: contain;
  opacity: 0.9;
}

.banner-footer {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #0f172a;
  padding: 8px 20px;
  border-top-left-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.domain-text {
  color: #ffffff;
  font-size: 12px;
  letter-spacing: 0.5px;
}

.hero-actions {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.btn-primary {
  text-transform: none !important;
  font-weight: 600 !important;
}

/* Section Common */
.section-container {
  scroll-margin-top: 80px;
}

.section-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
}

.section-title-dark {
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.1;
}

.section-subtitle {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.6;
}

/* About Card */
.about-card {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.about-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.mini-logo {
  height: 36px;
  width: auto;
}

.about-content-box {
  background: #0f172a;
  color: #ffffff;
  padding: 24px;
  border-radius: 10px;
  display: flex;
  gap: 16px;
}

.about-content-box .red-bar {
  width: 6px;
  background-color: #dc2626;
  flex-shrink: 0;
  border-radius: 4px;
}

.about-text {
  font-size: 14.5px;
  line-height: 1.7;
  color: #e2e8f0;
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.service-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
}

.service-card:hover {
  border-color: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.service-icon {
  width: 48px;
  height: 48px;
  background: #fef2f2;
  border-radius: 8px;
  display: grid;
  place-items: center;
  margin-bottom: 16px;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 13.5px;
  color: #64748b;
  line-height: 1.5;
}

.tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
}

.mini-tag {
  font-size: 11px;
  font-weight: 600;
  background: #f1f5f9;
  color: #475569;
  padding: 3px 8px;
  border-radius: 4px;
}

/* White Card & Features */
.white-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.feature-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 16px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #f1f5f9;
}

.feature-icon {
  flex-shrink: 0;
}

.feature-title {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}

.feature-desc {
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
}

/* Workflow */
.workflow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.workflow-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 18px;
}

.step-num {
  font-size: 20px;
  font-weight: 900;
  color: #dc2626;
}

/* Contact Card */
.contact-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 16px;
}

.contact-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
}

.box-title {
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 12px;
}

.address-item {
  font-size: 13px;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 10px;
}

.info-row {
  display: flex;
  align-items: center;
  font-size: 13.5px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 10px;
}

/* Footer */
.footer-bar {
  width: 100%;
  padding: 20px;
  background: #0f172a;
  color: #94a3b8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  margin-top: auto;
}

@media (max-width: 768px) {
  .nav-menu { display: none; }
  .hero-title { font-size: 30px; }
  .about-content-box { flex-direction: column; }
}
</style>
