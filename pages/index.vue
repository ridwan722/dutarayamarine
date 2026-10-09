<script setup>
definePageMeta({
  layout: "blank",
});

const pinDialog = ref(false);
const pin = ref("");
const pinError = ref("");
const isSubmitting = ref(false);

function openPinDialog() {
  pin.value = "";
  pinError.value = "";
  pinDialog.value = true;
}

async function verifyPin() {
  if (!/^\d{6}$/.test(pin.value)) {
    pinError.value = "PIN must be 6 digits.";
    return;
  }

  isSubmitting.value = true;
  pinError.value = "";

  try {
    await $fetch("/api/admin-access", {
      method: "POST",
      body: { pin: pin.value },
    });
    pinDialog.value = false;
    await navigateTo("/admin");
  } catch {
    pin.value = "";
    pinError.value = "Invalid PIN. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
}

const services = [
  {
    icon: "mdi-cog-box",
    title: "High-Grade Equipment Supply",
    desc: "Supply of high-quality equipment and critical spare parts to ensure maximum operational reliability for your fleet."
  },
  {
    icon: "mdi-ferry",
    title: "Vessel Provisioning",
    desc: "Comprehensive and timely provisioning services to support smooth vessel operations and marine logistics."
  },
  {
    icon: "mdi-wrench-clock",
    title: "Multidisciplinary Technical Engineering",
    desc: "Responsive technical assistance and integrated engineering solutions for shipowners, shipyards, and offshore platforms."
  }
];

const values = [
  { title: "Safety First", desc: "Prioritizing workplace safety in every aspect of our product and service delivery.", icon: "mdi-shield-check" },
  { title: "Quality & Precision", desc: "Ensuring high standards of quality and technical accuracy across all marine components.", icon: "mdi-check-decagram" },
  { title: "Timely Delivery", desc: "Fast logistics and time efficiency to maintain uninterrupted offshore operations.", icon: "mdi-clock-fast" }
];
</script>

<template>
  <div class="landing-page">
    <div class="grid-pattern"></div>

    <!-- Header / Navbar -->
    <header class="navbar">
      <div class="nav-container">
        <div class="brand-logo">
          <img src="/public/Logo-DRM.png" alt="DUTA RAYA MARINE" class="logo-img" />
        </div>
        <nav class="nav-menu">
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#values">Core Values</a>
          <a href="#contact">Contact</a>
        </nav>
        <v-btn
          color="navy"
          variant="outlined"
          class="btn-admin"
          rounded="lg"
          size="small"
          @click="openPinDialog"
        >
          <v-icon start icon="mdi-shield-lock-outline" />
          Admin Access
        </v-btn>
      </div>
    </header>

    <!-- Main Content -->
    <main class="content-wrapper">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-header-badge">
          <div class="red-line"></div>
          <span class="badge-text">BATAM, INDONESIA</span>
        </div>
        
        <h1 class="hero-title">
          INTEGRATED MARINE & <br />
          <span class="title-red">OFFSHORE SOLUTIONS</span>
        </h1>
        <p class="hero-subtitle">
          Your trusted partner for marine equipment supply, vessel provisioning, and technical engineering services.
        </p>

        <!-- Banner Image Box -->
        <div class="hero-banner">
          <div class="banner-overlay"></div>
          <img src="/public/Logo-DRM.png" alt="Marine Ship" class="banner-img" />
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
            Explore Profile
            <v-icon end icon="mdi-arrow-down" />
          </v-btn>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="section-container">
        <div class="about-card">
          <div class="about-header">
            <h2 class="section-title-dark">ABOUT <br /><span class="title-red">US</span></h2>
            <div class="about-logo">
              <img src="/public/Logo-DRM.png" alt="DRM Logo" class="mini-logo" />
            </div>
          </div>

          <div class="about-content-box">
            <div class="red-bar"></div>
            <p class="about-text">
              <strong>Duta Raya Marine</strong> is an integrated marine and offshore solution provider based in Batam, Indonesia, specializing in high-grade equipment supply, vessel provisioning, and multidisciplinary technical engineering services[cite: 2]. We are dedicated to supporting shipowners, shipyards, offshore platforms, and oil & gas operators by delivering dependable products, critical spare parts, and responsive technical assistance[cite: 2].
            </p>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section id="services" class="section-container">
        <div class="section-header">
          <div class="red-line"></div>
          <h2 class="section-title-dark">OUR <span class="title-red">SERVICES</span></h2>
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

      <!-- Core Values Section -->
      <section id="values" class="section-container">
        <div class="white-card">
          <div class="section-header">
            <div class="red-line"></div>
            <h2 class="section-title-dark">CORE <span class="title-red">VALUES</span></h2>
          </div>
          <p class="section-subtitle">
            Driven by our core values of safety, quality, and timely delivery, we forge enduring partnerships built on integrity, technical precision, and operational efficiency[cite: 2].
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
          <div class="contact-info">
            <div class="contact-item">
              <v-icon color="#dc2626" class="mr-2">mdi-web</v-icon>
              <span>www.dutarayamarine.com</span>
            </div>
            <div class="contact-item">
              <v-icon color="#dc2626" class="mr-2">mdi-map-marker</v-icon>
              <span>Batam, Indonesia</span>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Admin PIN Dialog -->
    <v-dialog v-model="pinDialog" max-width="390" persistent>
      <v-card class="pin-dialog pa-2">
        <v-card-text class="pa-6 text-center">
          <div class="pin-icon mb-4">
            <v-icon size="26" color="#0f172a">mdi-shield-key-outline</v-icon>
          </div>
          <div class="text-h6 font-weight-bold text-slate mb-2">DRM Admin Access</div>
          <p class="pin-description mb-5">Enter your 6-digit PIN to access the admin panel.</p>
          <v-text-field
            v-model="pin"
            :error-messages="pinError"
            :disabled="isSubmitting"
            autofocus
            hide-details="auto"
            inputmode="numeric"
            maxlength="6"
            placeholder="••••••"
            type="password"
            variant="outlined"
            class="pin-input"
            @update:model-value="pin = pin.replace(/\D/g, '').slice(0, 6)"
            @keyup.enter="verifyPin"
          />
        </v-card-text>
        <v-card-actions class="px-6 pb-6 pt-0">
          <v-btn variant="text" :disabled="isSubmitting" @click="pinDialog = false">Cancel</v-btn>
          <v-spacer />
          <v-btn color="#dc2626" class="text-white" :loading="isSubmitting" variant="flat" @click="verifyPin">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <footer class="footer-bar">
      <span>Duta Raya Marine &copy; 2026. All rights reserved.</span>
      <span class="version-tag">v1.0.0</span>
    </footer>
  </div>
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
  height: 38px;
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

.btn-admin {
  border-color: #0f172a !important;
  color: #0f172a !important;
  text-transform: none !important;
  font-weight: 600;
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
  align-items: center;
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

.contact-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
}

.contact-info {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  background: #f8fafc;
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

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

.version-tag {
  background: #dc2626;
  color: #ffffff;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 700;
}

/* PIN Dialog */
.pin-dialog { border-radius: 16px !important; }
.pin-icon { width: 50px; height: 50px; margin: auto; display: grid; place-items: center; border-radius: 12px; background: #f1f5f9; }
.text-slate { color: #0f172a; }
.pin-description { color: #64748b; font-size: 13px; line-height: 1.5; }
.pin-input :deep(input) { letter-spacing: 8px; font-size: 20px; font-weight: 700; text-align: center; }

@media (max-width: 768px) {
  .nav-menu { display: none; }
  .hero-title { font-size: 30px; }
  .about-content-box { flex-direction: column; }
}
</style>