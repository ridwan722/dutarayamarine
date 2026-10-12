<template>
  <div class="whatsapp-widget">
    <Transition name="panel">
      <section
        v-if="isOpen"
        class="inquiry-panel"
        aria-labelledby="whatsapp-title"
      >
        <div class="panel-header">
          <div>
            <!-- <p class="eyebrow">DUTA RAYA MARINE</p> -->
            <h2 id="whatsapp-title">Kirim inquiry</h2>
            <p class="header-copy">Isi detail berikut, lalu lanjutkan melalui WhatsApp.</p>
          </div>
          <button
            class="close-button"
            type="button"
            aria-label="Tutup form WhatsApp"
            @click="isOpen = false"
          >
            <v-icon icon="mdi-close" />
          </button>
        </div>

        <form class="inquiry-form" @submit.prevent="sendToWhatsapp">
          <v-text-field hide-details variant="outlined" density="compact" v-model.trim="form.pic" label="Name *required"></v-text-field>
          <v-text-field hide-details variant="outlined" density="compact" v-model.trim="form.nama_perusahaan" label="Company Name *required"></v-text-field>
          <v-text-field hide-details variant="outlined" density="compact" v-model.trim="form.alamat" label="Address"></v-text-field>
          <v-text-field hide-details variant="outlined" density="compact" v-model.trim="form.vessel" label="Vessel"></v-text-field>
          <v-textarea hide-details rows="2" variant="outlined" density="compact" v-model.trim="form.inquiry" label="Inquiry"></v-textarea>

          <p v-if="submitError" class="submit-error" role="alert">{{ submitError }}</p>
          <button class="send-button" type="submit" :disabled="isSaving || !requiredFieldsFilled">
            <v-icon :icon="isSaving ? 'mdi-loading' : 'mdi-whatsapp'" size="20" />
            {{ isSaving ? 'Menyimpan data...' : 'WhatsApp' }}
          </button>
        </form>
      </section>
    </Transition>

    <button
      class="whatsapp-toggle"
      type="button"
      :aria-expanded="isOpen"
      :aria-label="isOpen ? 'Tutup form WhatsApp' : 'Buka form WhatsApp'"
      @click="isOpen = !isOpen"
    >
      <v-icon :icon="isOpen ? 'mdi-close' : 'mdi-whatsapp'" size="21" />
      <span>{{ isOpen ? 'Close' : 'WhatsApp' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { leadsM } from "~/types/leadsM";

const whatsappNumber = "6282199988670";
const isOpen = ref(false);
const isSaving = ref(false);
const submitError = ref("");
const leadsStore = useleadsStore();
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
    "Halo Duta Raya Marine, Saya ingin menanyakan informasi seputar Layanan yang tersedia di Duta Raya Marine. Apakah saya bisa dibantu dengan informasi dari situs resmi www.dutarayamarine.com?",
    "",
    `Name: ${form.pic}`,
    `Address: ${form.alamat}`,
    `Company Name: ${form.nama_perusahaan}`,
    `Vessel: ${form.vessel || "-"}`,
    `Inquiry: ${form.inquiry || "-"}`,
  ].join("\n");

  submitError.value = "";
  isSaving.value = true;

  // Buka tab saat masih dalam aksi submit agar browser tidak memblokir popup
  // setelah proses simpan Firestore selesai.
  const whatsappWindow = window.open("about:blank", "_blank");
  if (!whatsappWindow) {
    submitError.value = "Browser memblokir tab baru. Izinkan popup lalu coba lagi.";
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
      submitError.value = "Data belum berhasil disimpan. Periksa koneksi lalu coba lagi.";
      return;
    }

    whatsappWindow.location.href =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  } catch {
    whatsappWindow.close();
    submitError.value = "Data belum berhasil disimpan. Periksa koneksi lalu coba lagi.";
  } finally {
    isSaving.value = false;
  }
}
</script>

<style scoped>
.whatsapp-widget {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 500;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.whatsapp-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 44px;
  padding: 0 15px;
  border: 0;
  border-radius: 999px;
  background: #16a34a;
  color: #fff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.2);
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  transition: background 160ms ease, transform 160ms ease;
}

.whatsapp-toggle:hover {
  background: #15803d;
  transform: translateY(-2px);
}

.inquiry-panel {
  width: min(340px, calc(100vw - 32px));
  max-height: min(72vh, 600px);
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.22);
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding: 15px 16px 13px;
  background: #0f172a;
  color: #fff;
}

.eyebrow {
  margin: 0 0 6px;
  color: #fca5a5;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.panel-header h2 {
  margin: 0;
  font-size: 17px;
  font-weight: 750;
}

.header-copy {
  margin: 4px 0 0;
  color: #cbd5e1;
  font-size: 11px;
  line-height: 1.5;
}

.close-button {
  display: grid;
  width: 29px;
  height: 29px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  background: transparent;
  color: #fff;
  cursor: pointer;
}

.inquiry-form {
  display: grid;
  gap: 9px;
  padding: 10px 16px 15px;
}

.inquiry-form :deep(.v-input) {
  margin: 0;
  font-size: 12px;
}

.inquiry-form :deep(.v-field__input) {
  min-height: 36px;
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 12px;
}

.inquiry-form :deep(.v-textarea .v-field__input) {
  min-height: 52px;
}

.inquiry-form :deep(.v-label) {
  font-size: 12px;
}
.submit-error {
  margin: 0;
  color: #b91c1c;
  font-size: 11px;
  line-height: 1.45;
}

.send-button {
  display: flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 7px;
  background: #16a34a;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
}

.send-button:hover {
  background: #15803d;
}

.send-button:disabled {
  cursor: wait;
  opacity: 0.7;
}

.panel-enter-active,
.panel-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 480px) {
  .whatsapp-widget {
    right: 12px;
    bottom: 12px;
  }

  .inquiry-panel {
    max-height: 70vh;
  }

  .panel-header,
  .inquiry-form {
    padding-right: 13px;
    padding-left: 13px;
  }
}
</style>
