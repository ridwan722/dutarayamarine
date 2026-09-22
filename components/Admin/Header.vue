<script setup>
import { computed } from "vue";
import { useDisplay } from "vuetify";
import { useUserStore } from "@/stores/userStore";
import { getAuth, signOut } from "firebase/auth";
import { navigateTo } from "#app";

const { mdAndUp } = useDisplay();
const useuser = useUserStore();

/* =========================
   USER
========================= */
const displayname = computed(() => useuser.getDisplayName || "Admin");
const role = computed(() => useuser.getRole || "Administrator");

/* =========================
   LOGOUT
========================= */
const logout = async () => {
  const auth = getAuth();

  try {
    await signOut(auth);
    useuser.setUser(null);
    await navigateTo("/");
  } catch (error) {
    console.error("Logout gagal:", error);
  }
};
</script>

<template>
  <!-- SIDE NAVIGATION DRAWER (Corporate Minimalist Rail) -->
  <v-navigation-drawer
    v-if="mdAndUp"
    permanent
    rail
    width="72"
    rail-width="72"
    class="desktop-side-menu"
  >
    <!-- BRAND / MINI LOGO HEADER -->
    <div class="side-brand-header">
      <div class="mini-logo-box">
        <img
          src="/public/Logo-DRM.png"
          alt="DRM Logo"
          class="mini-logo-img"
        />
      </div>
    </div>

    <v-divider class="mx-3 my-2 border-opacity-25" />

    <!-- NAVIGATION ITEMS -->
    <v-list nav density="compact" class="side-nav-list px-2">
      <!-- Dashboard -->
      <v-list-item
        to="/admin/"
        class="side-nav-item"
        active-class="side-nav-item--active"
        exact
      >
        <div class="nav-icon-wrapper">
          <v-icon size="20">mdi-view-dashboard-outline</v-icon>
        </div>
        <span class="nav-title-flyout">Dashboard</span>
      </v-list-item>

      <!-- Quotation -->
      <v-list-item
        to="/admin/penawaran"
        class="side-nav-item"
        active-class="side-nav-item--active"
      >
        <div class="nav-icon-wrapper">
          <v-icon size="20">mdi-file-edit-outline</v-icon>
        </div>
        <span class="nav-title-flyout">Quotation</span>
      </v-list-item>

      <!-- Invoice -->
      <v-list-item
        to="/admin/invoice"
        class="side-nav-item"
        active-class="side-nav-item--active"
        exact
      >
        <div class="nav-icon-wrapper">
          <v-icon size="20">mdi-receipt-text-outline</v-icon>
        </div>
        <span class="nav-title-flyout">Invoice</span>
      </v-list-item>

      <!-- Invoice Success -->
      <v-list-item
        to="/admin/invoice/selesai"
        class="side-nav-item"
        active-class="side-nav-item--active"
      >
        <div class="nav-icon-wrapper">
          <v-icon size="20">mdi-check-decagram-outline</v-icon>
        </div>
        <span class="nav-title-flyout">Invoice Success</span>
      </v-list-item>

      <!-- Berita Acara -->
      <v-list-item
        to="/admin/berita-acara"
        class="side-nav-item"
        active-class="side-nav-item--active"
      >
        <div class="nav-icon-wrapper">
          <v-icon size="20">mdi-file-certificate-outline</v-icon>
        </div>
        <span class="nav-title-flyout">Berita Acara</span>
      </v-list-item>

      <!-- Master User -->
      <!-- <v-list-item
        to="/admin/master/users"
        class="side-nav-item"
        active-class="side-nav-item--active"
      >
        <div class="nav-icon-wrapper">
          <v-icon size="20">mdi-account-group-outline</v-icon>
        </div>
        <span class="nav-title-flyout">User Management</span>
      </v-list-item> -->

      <!-- Master Client -->
      <v-list-item
        to="/admin/master/client"
        class="side-nav-item"
        active-class="side-nav-item--active"
      >
        <div class="nav-icon-wrapper">
          <v-icon size="20">mdi-domain</v-icon>
        </div>
        <span class="nav-title-flyout">Master Client</span>
      </v-list-item>

      <!-- Master Barang / Service -->
      <v-list-item
        to="/admin/master/barang"
        class="side-nav-item"
        active-class="side-nav-item--active"
      >
        <div class="nav-icon-wrapper">
          <v-icon size="20">mdi-package-variant-closed</v-icon>
        </div>
        <span class="nav-title-flyout">Master Barang / Service</span>
      </v-list-item>

      <!-- Master T&C -->
      <v-list-item
        to="/admin/master/termcondition"
        class="side-nav-item"
        active-class="side-nav-item--active"
      >
        <div class="nav-icon-wrapper">
          <v-icon size="20">mdi-information-variant-circle-outline</v-icon>
        </div>
        <span class="nav-title-flyout">Master T&C</span>
      </v-list-item>

      <!-- Kas -->
      <v-list-item
        to="/admin/petty-cash"
        class="side-nav-item"
        active-class="side-nav-item--active"
      >
        <div class="nav-icon-wrapper">
          <v-icon size="20">mdi-cash-multiple</v-icon>
        </div>
        <span class="nav-title-flyout">Kas</span>
      </v-list-item>

      <!-- Report Order -->
      <v-list-item
        to="/admin/report-order"
        class="side-nav-item"
        active-class="side-nav-item--active"
      >
        <div class="nav-icon-wrapper">
          <v-icon size="20">mdi-chart-box-outline</v-icon>
        </div>
        <span class="nav-title-flyout">Report Order</span>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- APP BAR / TOP HEADER -->
  <v-app-bar flat color="white" height="68" class="app-bar-border">
    <template #prepend>
      <div class="header-left">
        <div class="logo-box" v-if="!mdAndUp">
          <img
            src="/public/Logo-DRM.png"
            alt="PT. DUTA RAYA MARINE"
            class="logo-img"
          />
        </div>

        <div class="company-info">
          <span class="company-name desktop-company">
            PT. DUTA RAYA MARINE
          </span>

          <span class="company-name mobile-company">
            PT. DUTA RAYA MARINE
          </span>

          <span class="company-subtitle"> Enterprise Management System </span>
        </div>

        <v-chip
          size="x-small"
          color="primary"
          variant="outlined"
          class="version-chip"
        >
          v1.1
        </v-chip>

        <v-btn
          variant="outlined"
          color="primary"
          size="small"
          prepend-icon="mdi-home-outline"
          to="/admin"
          class="text-capitalize font-weight-bold ml-2"
        >
          Home
        </v-btn>
      </div>
    </template>

    <v-spacer />

    <template #append>
      <div class="header-right">
        <v-btn
          icon
          variant="text"
          size="small"
          color="slate-600"
          class="notification-btn"
        >
          <v-badge dot color="error" offset-x="-2" offset-y="-2">
            <v-icon size="20"> mdi-bell-outline </v-icon>
          </v-badge>
        </v-btn>

        <v-divider vertical inset class="header-divider" />

        <v-menu
          rounded="xl"
          transition="slide-y-transition"
          :offset="[12, 0]"
          elevation="16"
        >
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              class="user-profile-btn"
              height="48"
            >
              <v-avatar size="36" class="avatar-shadow">
                <div class="avatar-placeholder text-uppercase font-weight-bold">
                  {{ displayname[0] }}
                </div>
              </v-avatar>

              <div class="user-info">
                <p class="user-name">
                  {{ displayname }}
                </p>

                <p class="user-role">
                  {{ role }}
                </p>
              </div>

              <v-icon size="18" class="profile-chevron">
                mdi-chevron-down
              </v-icon>
            </v-btn>
          </template>

          <v-card
            min-width="260"
            class="profile-card border-thin overflow-hidden rounded-xl"
          >
            <div class="pa-4 profile-card-header d-flex align-center">
              <v-avatar size="44" class="mr-3 avatar-shadow">
                <div class="avatar-placeholder text-h6 font-weight-bold">
                  {{ displayname[0] }}
                </div>
              </v-avatar>

              <div class="overflow-hidden">
                <div
                  class="text-subtitle-2 font-weight-bold text-slate-900 text-truncate"
                >
                  {{ displayname }}
                </div>

                <v-chip
                  size="x-small"
                  color="primary"
                  variant="tonal"
                  class="mt-1 font-weight-semibold"
                >
                  {{ role }}
                </v-chip>
              </div>
            </div>

            <v-divider />

            <div class="pa-2">
              <v-list density="compact" nav class="bg-transparent pa-0">
                <v-list-item
                  prepend-icon="mdi-shield-account-outline"
                  title="User Management"
                  value="settings"
                  rounded="lg"
                  to="/admin/master/users"
                  class="menu-item py-2"
                />
              </v-list>
            </div>

            <v-divider />

            <div class="pa-2 bg-slate-50">
              <v-btn
                block
                variant="flat"
                color="error-lighten-5"
                class="logout-btn justify-start"
                rounded="lg"
                @click="logout"
              >
                <template #prepend>
                  <v-icon color="error"> mdi-logout-variant </v-icon>
                </template>

                <span class="text-error font-weight-semibold"> Keluar </span>
              </v-btn>
            </div>
          </v-card>
        </v-menu>
      </div>
    </template>
  </v-app-bar>
</template>

<style scoped>
/* =========================================================
   CORPORATE MINIMALIST SIDE NAVIGATION DRAWER
========================================================= */

.desktop-side-menu {
  border-right: 1px solid #e2e8f0 !important;
  background-color: #0f172a !important; /* Corporate Slate Dark Theme */
  overflow: visible !important;
}

:deep(.v-navigation-drawer__content) {
  overflow: visible !important;
  display: flex;
  flex-direction: column;
}

/* BRAND LOGO HEADER */
.side-brand-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 68px;
  flex-shrink: 0;
}

.mini-logo-box {
  width: 48px;
  height: 48px;
  background: rgb(255, 255, 255);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  transition: all 0.2s ease;
}

.mini-logo-box:hover {
  background: rgba(255, 255, 255, 0.15);
}

.mini-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* NAVIGATION LIST & ITEMS */
.side-nav-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: visible !important;
}

.side-nav-item {
  position: relative !important;
  border-radius: 10px !important;
  color: #94a3b8 !important;
  height: 44px !important;
  min-height: 44px !important;
  padding: 0 !important;
  margin-bottom: 0 !important;
  overflow: visible !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

/* Reset Inner Elements Vuetify agar Rata Tengah Presisi */
.side-nav-item :deep(.v-list-item__content) {
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: visible !important;
}

.side-nav-item :deep(.v-list-item__overlay) {
  border-radius: 10px !important;
}

/* Wrapper Ikon Center */
.nav-icon-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon-wrapper .v-icon {
  color: #94a3b8;
  transition: color 0.2s ease, transform 0.2s ease;
}

/* TOOLTIP / FLYOUT TEXT HOVER */
.nav-title-flyout {
  position: absolute;
  left: 56px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #0f172a;
  color: #f8fafc;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.2px;
  white-space: nowrap;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3),
              0 4px 6px -4px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.12);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
}

/* Hover States */
.side-nav-item:hover {
  background-color: rgba(255, 255, 255, 0.06) !important;
  color: #ffffff !important;
}

.side-nav-item:hover .nav-icon-wrapper .v-icon {
  color: #ffffff;
  transform: scale(1.08);
}

.side-nav-item:hover .nav-title-flyout {
  opacity: 1;
  visibility: visible;
  left: 62px;
}

/* Active State (Red DRM Accent) */
.side-nav-item--active {
  background-color: rgba(220, 38, 38, 0.12) !important;
}

.side-nav-item--active::before {
  content: "";
  position: absolute;
  left: -8px;
  top: 15%;
  height: 70%;
  width: 3px;
  background-color: #ef4444;
  border-radius: 0 4px 4px 0;
}

.side-nav-item--active .nav-icon-wrapper .v-icon {
  color: #ef4444 !important;
}

/* =========================================================
   APP BAR & UTILITIES
========================================================= */

.app-bar-border {
  border-bottom: 1px solid #e2e8f0 !important;
  background: rgba(255, 255, 255, 0.96) !important;
  backdrop-filter: blur(8px);
  padding: 0 8px !important;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.logo-box {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.company-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
  line-height: 1.2;
}

.company-name {
  font-size: 13.5px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: 0.3px;
  white-space: nowrap;
}

.company-subtitle {
  margin-top: 1px;
  font-size: 11px;
  color: #64748b;
  white-space: nowrap;
}

.version-chip {
  flex-shrink: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.notification-btn {
  border-radius: 10px !important;
}

.header-divider {
  height: 24px;
  margin: 0 6px;
  opacity: 0.2;
}

.user-profile-btn {
  text-transform: none !important;
  border-radius: 12px !important;
  padding: 4px 8px !important;
  min-width: auto !important;
  transition: background-color 0.2s ease;
}

.user-profile-btn:hover {
  background-color: #f8fafc !important;
}

.user-info {
  text-align: left;
  margin-left: 10px;
  min-width: 0;
}

.user-name {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-role {
  margin: 1px 0 0;
  font-size: 11px;
  color: #64748b;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-chevron {
  margin-left: 6px;
  color: #94a3b8;
}

.avatar-placeholder {
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-shadow {
  box-shadow: 0 2px 6px rgba(220, 38, 38, 0.2);
}

.profile-card {
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.08) !important;
}

.profile-card-header {
  background: #f8fafc;
}

.menu-item {
  color: #475569 !important;
  font-size: 0.875rem !important;
  transition: all 0.15s ease;
}

.menu-item:hover {
  background-color: #f1f5f9 !important;
  color: #0f172a !important;
}

.logout-btn {
  text-transform: none !important;
  letter-spacing: 0;
  background-color: #fef2f2 !important;
  transition: background-color 0.2s ease;
}

.logout-btn:hover {
  background-color: #fee2e2 !important;
}

.text-slate-900 {
  color: #0f172a;
}

.bg-slate-50 {
  background-color: #f8fafc;
}

.mobile-company {
  display: none;
}

@media (max-width: 800px) {
  .header-left {
    gap: 8px;
  }

  .company-name {
    font-size: 12.5px;
  }

  .version-chip {
    display: none;
  }

  .user-name,
  .user-role {
    max-width: 100px;
  }
}

@media (max-width: 600px) {
  .desktop-company {
    display: none;
  }

  .mobile-company {
    display: inline;
  }

  .version-chip,
  .notification-btn,
  .header-divider,
  .user-info,
  .profile-chevron {
    display: none;
  }

  .user-profile-btn {
    padding: 4px !important;
    min-width: 42px !important;
    width: 42px !important;
  }
}
</style>