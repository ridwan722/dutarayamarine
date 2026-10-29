<template>
  <div class="whatsapp-widget">
    <!-- Panel Form Inquiry -->
    <Transition name="panel">
      <section
        v-if="isOpen"
        class="inquiry-panel"
        aria-labelledby="whatsapp-title"
      >
        <div class="panel-header">
          <div>
            <span class="eyebrow">DUTA RAYA MARINE</span>
            <h2 id="whatsapp-title">{{ translate("Send an Inquiry", "Kirim Inquiry") }}</h2>
            <p class="header-copy">{{ translate("Complete the details and we’ll be ready to help.", "Lengkapi detail, kami siap membantu Anda.") }}</p>
          </div>
          <button
            class="close-button"
            type="button"
            :aria-label="translate('Close WhatsApp form', 'Tutup form WhatsApp')"
            @click="isOpen = false"
          >
            <v-icon icon="mdi-close" />
          </button>
        </div>

        <form class="inquiry-form" @submit.prevent="sendToWhatsapp">
          <div class="field-grid">
            <v-text-field hide-details variant="outlined" density="compact" v-model.trim="form.pic" :label="translate('Your name *', 'Nama Anda *')" autocomplete="name"></v-text-field>
            <v-text-field hide-details variant="outlined" density="compact" v-model.trim="form.nama_perusahaan" :label="translate('Company *', 'Perusahaan *')" autocomplete="organization"></v-text-field>
            <v-text-field hide-details variant="outlined" density="compact" v-model.trim="form.alamat" :label="translate('Address', 'Alamat')" autocomplete="street-address"></v-text-field>
            <v-text-field hide-details variant="outlined" density="compact" v-model.trim="form.vessel" :label="translate('Vessel', 'Kapal')"></v-text-field>
          </div>
          <v-textarea hide-details rows="2" variant="outlined" density="compact" v-model.trim="form.inquiry" :label="translate('How can we help?', 'Apa yang dapat kami bantu?')"></v-textarea>
          
          <p class="required-note">{{ translate("Fields marked with an asterisk (*) are required", "Tanda Bintang (*) kolom wajib diisi") }}</p>
          <p v-if="submitError" class="submit-error" role="alert">{{ submitError }}</p>
          
          <button class="send-button" type="submit" :disabled="isSaving || !requiredFieldsFilled">
            <v-icon :icon="isSaving ? 'mdi-loading' : 'mdi-whatsapp'" size="20" />
            {{ isSaving ? translate('Saving data...', 'Menyimpan data...') : translate('Continue to WhatsApp', 'Lanjutkan ke WhatsApp') }}
          </button>
        </form>
      </section>
    </Transition>

    <!-- Floating Toggle Button dengan Animasi Getar Telepon -->
    <div class="toggle-container" :class="{ 'is-open': isOpen }">
      <button
        class="whatsapp-toggle"
        type="button"
        :class="{ 'is-active': isOpen }"
        :aria-expanded="isOpen"
        :aria-label="isOpen ? translate('Close WhatsApp form', 'Tutup form WhatsApp') : translate('Open WhatsApp form', 'Buka form WhatsApp')"
        @click="isOpen = !isOpen"
      >
        <div class="icon-bubble">
          <v-icon
            :icon="isOpen ? 'mdi-close' : 'mdi-headset'"
            size="24"
            :class="['widget-icon', { 'ring-shake': !isOpen }]"
          />
          <span v-if="!isOpen" class="pulse-ring"></span>
        </div>
        <span class="widget-label">{{ isOpen ? translate('Close', 'Tutup') : 'WhatsApp' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { leadsM } from "~/types/leadsM";

const whatsappNumber = "6282384503953";
const isOpen = ref(false);
const isSaving = ref(false);
const submitError = ref("");
const leadsStore = useleadsStore();
const { translate } = useSiteLocale();

const form = reactive({
  nama_perusahaan: "",
  alamat: "",
  pic: "",
  vessel: "",
  inquiry: "",
});

const requiredFieldsFilled = computed(() =>
  form.pic.trim().length > 0 && form.nama_perusahaan.trim().length > 0,
);

async function sendToWhatsapp() {
  if (!requiredFieldsFilled.value || isSaving.value) return;

  const message = [
    translate(
      "Hello Duta Raya Marine, I would like to ask about the services available at Duta Raya Marine. Could you assist me with information from the official website www.dutarayamarine.com?",
      "Halo Duta Raya Marine, saya ingin menanyakan informasi seputar layanan yang tersedia di Duta Raya Marine. Apakah saya bisa dibantu dengan informasi dari situs resmi www.dutarayamarine.com?",
    ),
    "",
    `Name: ${form.pic}`,
    `Address: ${form.alamat}`,
    `Company Name: ${form.nama_perusahaan}`,
    `Vessel: ${form.vessel || "-"}`,
    `Inquiry: ${form.inquiry || "-"}`,
  ].join("\n");

  submitError.value = "";
  isSaving.value = true;

  const whatsappWindow = window.open("about:blank", "_blank");
  if (!whatsappWindow) {
    submitError.value = translate(
      "The browser blocked the new tab. Allow pop-ups and try again.",
      "Browser memblokir tab baru. Izinkan popup lalu coba lagi.",
    );
    isSaving.value = false;
    return;
  }
  whatsappWindow.opener = null;

  const lead: leadsM = {
    id_leads: crypto.randomUUID(),
    nama_perusahaan: form.nama_perusahaan,
    alamat: form.alamat,
    pic: form.pic,
    vessel: form.vessel,
    inquiry: form.inquiry,
    createdAt: Math.floor(Date.now() / 1000),
  };

  try {
    const saved = await leadsStore.addLeadsAct(lead);
    if (!saved) {
      whatsappWindow.close();
      submitError.value = translate(
        "The data could not be saved. Check your connection and try again.",
        "Data belum berhasil disimpan. Periksa koneksi lalu coba lagi.",
      );
      return;
    }

    whatsappWindow.location.href =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  } catch {
    whatsappWindow.close();
    submitError.value = translate(
      "The data could not be saved. Check your connection and try again.",
      "Data belum berhasil disimpan. Periksa koneksi lalu coba lagi.",
    );
  } finally {
    isSaving.value = false;
  }
}
</script>

<style scoped>
.whatsapp-widget {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 500;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  font-family: inherit;
}

/* Floating Container Animation */
.toggle-container {
  display: flex;
  align-items: center;
  animation: float-widget 3.5s ease-in-out infinite;
}

.toggle-container.is-open {
  animation: none;
}

@keyframes float-widget {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
}

.whatsapp-toggle {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 18px 6px 6px;
  border: 0;
  border-radius: 50px;
  background: #0f172a;
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.25);
  cursor: pointer;
  transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms ease;
  outline: none;
}

.whatsapp-toggle:hover {
  background: #1e293b;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.35);
}

.whatsapp-toggle.is-active {
  background: #dc2626;
}

.icon-bubble {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #dc2626;
  color: #ffffff;
  transition: background-color 200ms ease;
}

.whatsapp-toggle.is-active .icon-bubble {
  background: rgba(255, 255, 255, 0.2);
}

/* Animasi Getar Telepon (Ring/Shake) per 1-1.5 detik */
.ring-shake {
  animation: ring-shake 1.2s ease-in-out infinite;
  transform-origin: center center;
}

@keyframes ring-shake {
  0% {
    transform: rotate(0deg) scale(1);
  }
  10% {
    transform: rotate(-18deg) scale(1.1);
  }
  20% {
    transform: rotate(18deg) scale(1.1);
  }
  30% {
    transform: rotate(-15deg) scale(1.1);
  }
  40% {
    transform: rotate(15deg) scale(1.1);
  }
  50% {
    transform: rotate(-8deg) scale(1.05);
  }
  60% {
    transform: rotate(8deg) scale(1.05);
  }
  70% {
    transform: rotate(0deg) scale(1);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}

.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #0fd816;
  animation: pulse-ring 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.35);
    opacity: 0;
  }
  100% {
    transform: scale(1.35);
    opacity: 0;
  }
}

.widget-label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: #ffffff;
  white-space: nowrap;
}

/* Panel Form Inquiry */
.inquiry-panel {
  width: min(360px, calc(100vw - 28px));
  max-height: min(78vh, 620px);
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-top: 4px solid #dc2626;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.22);
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  background: #0f172a;
  color: #ffffff;
}

.eyebrow {
  display: block;
  margin-bottom: 4px;
  color: #dc2626;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.2px;
}

.panel-header h2 {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
}

.header-copy {
  margin: 4px 0 0;
  color: #94a3b8;
  font-size: 11px;
  line-height: 1.4;
}

.close-button {
  display: grid;
  width: 28px;
  height: 28px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  transition: background 150ms ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.inquiry-form {
  display: grid;
  gap: 10px;
  padding: 14px 16px 16px;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.inquiry-form :deep(.v-input) {
  margin: 0;
  font-size: 12px;
}

.inquiry-form :deep(.v-field__input) {
  min-height: 38px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 12px;
}

.inquiry-form :deep(.v-textarea .v-field__input) {
  min-height: 52px;
}

.inquiry-form :deep(.v-label) {
  font-size: 12px;
}

.required-note {
  margin: -2px 0 0;
  color: #dc2626;
  font-size: 10px;
  font-weight: 600;
}

.submit-error {
  margin: 0;
  color: #b91c1c;
  font-size: 11px;
  line-height: 1.4;
}

.send-button {
  display: flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 8px;
  background: #25d366;
  color: #ffffff;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  transition: background 160ms ease;
}

.send-button:hover {
  background: #1eb956;
}

.send-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Transisi Panel Form */
.panel-enter-active,
.panel-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

@media (max-width: 480px) {
  .whatsapp-widget {
    right: 16px;
    bottom: 16px;
  }

  .widget-label {
    font-size: 12px;
  }

  .inquiry-panel {
    max-height: 72vh;
  }
}
</style>
