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
            <p class="eyebrow">DUTA RAYA MARINE</p>
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
          <label>
            Nama perusahaan <span>*</span>
            <input v-model.trim="form.nama_perusahaan" required autocomplete="organization" placeholder="Nama perusahaan" />
          </label>
          <label>
            Alamat <span>*</span>
            <textarea v-model.trim="form.alamat" required rows="2" autocomplete="street-address" placeholder="Alamat perusahaan" />
          </label>
          <div class="form-row">
            <label>
              PIC <span>*</span>
              <input v-model.trim="form.pic" required autocomplete="name" placeholder="Nama PIC" />
            </label>
          </div>
          <label>
            Nama kapal
            <input v-model.trim="form.vessel" placeholder="Nama kapal (jika ada)" />
          </label>
          <label>
            Kebutuhan / pesan
            <textarea v-model.trim="form.inquiry" rows="3" placeholder="Ceritakan produk atau layanan yang dibutuhkan" />
          </label>

          <p class="required-note"><span>*</span> Wajib diisi</p>
          <p v-if="submitError" class="submit-error" role="alert">{{ submitError }}</p>
          <button class="send-button" type="submit" :disabled="isSaving">
            <v-icon :icon="isSaving ? 'mdi-loading' : 'mdi-whatsapp'" size="20" />
            {{ isSaving ? 'Menyimpan data...' : 'Lanjutkan ke WhatsApp' }}
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
      <v-icon :icon="isOpen ? 'mdi-close' : 'mdi-whatsapp'" size="25" />
      <span>{{ isOpen ? 'Tutup' : 'Hubungi kami' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
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

async function sendToWhatsapp() {
  const message = [
    "Halo Duta Raya Marine, saya ingin menyampaikan inquiry.",
    "",
    `Nama perusahaan: ${form.nama_perusahaan}`,
    `Alamat: ${form.alamat}`,
    `PIC: ${form.pic}`,
    `Kapal: ${form.vessel || "-"}`,
    `Kebutuhan: ${form.inquiry || "-"}`,
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
  right: 24px;
  bottom: 24px;
  z-index: 500;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
}

.whatsapp-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 52px;
  padding: 0 20px;
  border: 0;
  border-radius: 999px;
  background: #16a34a;
  color: #fff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.2);
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  transition: background 160ms ease, transform 160ms ease;
}

.whatsapp-toggle:hover {
  background: #15803d;
  transform: translateY(-2px);
}

.inquiry-panel {
  width: min(390px, calc(100vw - 32px));
  max-height: min(78vh, 720px);
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.22);
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 22px 22px 17px;
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
  font-size: 20px;
  font-weight: 750;
}

.header-copy {
  margin: 6px 0 0;
  color: #cbd5e1;
  font-size: 12px;
  line-height: 1.5;
}

.close-button {
  display: grid;
  width: 34px;
  height: 34px;
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
  gap: 13px;
  padding: 19px 22px 22px;
}

.inquiry-form label {
  display: grid;
  gap: 6px;
  color: #334155;
  font-size: 12px;
  font-weight: 700;
}

.inquiry-form label span,
.required-note span {
  color: #dc2626;
}

.inquiry-form input,
.inquiry-form textarea {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 10px 11px;
  background: #fff;
  color: #0f172a;
  font: inherit;
  font-size: 13px;
  font-weight: 400;
  outline: none;
}

.inquiry-form textarea {
  resize: vertical;
}

.inquiry-form input:focus,
.inquiry-form textarea:focus {
  border-color: #16a34a;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.12);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 11px;
}

.required-note {
  margin: -3px 0 0;
  color: #64748b;
  font-size: 11px;
}

.submit-error {
  margin: 0;
  color: #b91c1c;
  font-size: 12px;
  line-height: 1.45;
}

.send-button {
  display: flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 9px;
  background: #16a34a;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
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
    right: 16px;
    bottom: 16px;
  }

  .inquiry-panel {
    max-height: 76vh;
  }

  .panel-header,
  .inquiry-form {
    padding-right: 17px;
    padding-left: 17px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
