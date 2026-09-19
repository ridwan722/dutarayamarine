<template>
  <div
    v-if="modelValue"
    class="modal-overlay"
    @click.self="!saving && emit('update:modelValue', false)"
  >
    <div class="modal-card">
      <!-- Header -->
      <div class="modal-header">
        <div class="title-group">
          <svg
            class="icon-doc"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
            />
          </svg>
          <span class="modal-title">Tambah Pengeluaran</span>
        </div>
        <button
          class="btn-close"
          :disabled="saving"
          @click="emit('update:modelValue', false)"
        >
          &times;
        </button>
      </div>

      <!-- Content Body -->
      <div class="modal-body">
        <!-- Customer Info Section -->
        <a-date-picker-new
          v-model="form.tanggal_pengeluaran"
          label="Tanggal Pengeluaran"
          :disabled="saving"
          class="mb-2"
        ></a-date-picker-new>
        <a-text-field-new
            v-model="form.dikeluarkan_oleh"
            label="Dikeluarkan Oleh"
            :disabled="saving"
            placeholder="nama"
            class="my-2"
          />
        <a-textarea-new
          v-model="form.keterangan"
          label="Keterangan"
          :disabled="saving"
        />
        <div class="form-grid">
          <a-text-field-new v-model="form.qty" label="Qty" :disabled="saving" />
          <a-select-new
            v-model="form.satuan"
            label="Satuan"
            :disabled="saving"
            :items="['Unit', 'Pcs', 'Kg']"
          />
          <a-text-field-new
            v-model="form.nominal"
            label="Nominal"
            :disabled="saving"
          />
        </div>

        <!-- Items Table Section -->
        <div class="section-title mt-3">Informasi Vendor</div>
        <div class="form-grid">
          <a-text-field-new
            v-model="form.nama_vendor"
            label="Nama Vendor"
            :disabled="saving"
          />
          <a-text-field-new
            v-model="form.no_telp_vendor"
            label="No. Telepon Vendor"
            :disabled="saving"
          />
          <a-text-field-new
            v-model="form.lokasi_vendor"
            label="Lokasi Vendor"
            :disabled="saving"
          />
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="modal-footer">
        <button
          class="btn btn-secondary"
          :disabled="saving"
          @click="emit('update:modelValue', false)"
        >
          Batal
        </button>
        <button class="btn btn-primary" :disabled="saving" @click="save">
          <span v-if="saving">Memproses...</span>
          <span v-else>Simpan Pengeluaran</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import type { penawaranM, pengeluaranM } from "~/types/penawaranModel";

const props = defineProps<{
  modelValue: boolean;
  penawaran: penawaranM;
  idPenawaran: string;
}>();
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  saved: [];
}>();

const notificationStore = useNotificationStore();
const saving = ref(false);

const emptyForm = (): pengeluaranM => ({
  id_pengeluaran: "",
  keterangan: "",
  nominal: 0,
  satuan: "Pcs",
  dikeluarkan_oleh: "",
  qty: 1,
  nama_vendor: "",
  no_telp_vendor: "",
  lokasi_vendor: "",
  tanggal_pengeluaran: moment().format("YYYY-MM-DD"),
});
const form = ref<pengeluaranM>(emptyForm());

watch(
  () => props.modelValue,
  (open) => {
    if (open) form.value = emptyForm();
  },
);

async function save() {
  if (saving.value) return;
  if (!props.idPenawaran) {
    notificationStore.showError("ID penawaran tidak ditemukan");
    return;
  }
  if (!form.value.keterangan.trim() || !form.value.tanggal_pengeluaran || !form.value.dikeluarkan_oleh ) {
    notificationStore.showError(
      "Keterangan / tanggal / dikeluarkan oleh, wajib diisi",
    );
    return;
  }
  if (
    !Number.isFinite(form.value.nominal) ||
    form.value.nominal <= 0 ||
    !Number.isFinite(form.value.qty) ||
    form.value.qty <= 0
  ) {
    notificationStore.showError("Nominal dan qty harus lebih dari 0");
    return;
  }

  saving.value = true;
  try {
    await createPengeluaran(
      {
        ...form.value,
        keterangan: form.value.keterangan.trim(),
      },
      props.idPenawaran,
    );
    notificationStore.showSuccess("Pengeluaran berhasil ditambahkan");
    emit("update:modelValue", false);
    emit("saved");
  } catch (error) {
    notificationStore.showError("Gagal menyimpan pengeluaran");
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
/* Reset & Base Fonts */
* {
  box-sizing: border-box;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
}

/* Modal Structure */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-card {
  background: #ffffff;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* Header */
.modal-header {
  padding: 10px 16px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-doc {
  width: 18px;
  height: 18px;
  fill: #1976d2;
}

.modal-title {
  font-size: 14px;
  font-weight: 700;
  color: #212529;
}

.btn-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #6c757d;
  line-height: 1;
}

.btn-close:hover {
  color: #000;
}

/* Body */
.modal-body {
  padding: 12px 16px;
  overflow-y: auto;
}

.section-title {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #6c757d;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
}

.mt-3 {
  margin-top: 12px;
}

/* Grid Layout */
.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group.span-2 {
  grid-column: span 2;
}

.form-group label {
  font-size: 11px;
  font-weight: 600;
  color: #495057;
}

.input-field {
  width: 100%;
  padding: 5px 8px;
  font-size: 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  outline: none;
  background: #fff;
  transition: border-color 0.15s ease-in-out;
}

.input-field:focus {
  border-color: #1976d2;
}

.input-field.disabled {
  background: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
}

.textarea {
  resize: vertical;
}

/* Compact Table */
.table-container {
  border: 1px solid #dee2e6;
  border-radius: 4px;
  overflow: hidden;
}

.compact-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.compact-table th {
  background: #f1f3f5;
  color: #343a40;
  font-weight: 600;
  padding: 6px 8px;
  border-bottom: 1px solid #dee2e6;
}

.compact-table td {
  padding: 4px;
  border-bottom: 1px solid #e9ecef;
}

.table-input {
  width: 100%;
  padding: 4px 6px;
  font-size: 12px;
  border: 1px solid #ced4da;
  border-radius: 3px;
  outline: none;
}

.table-input:focus {
  border-color: #1976d2;
}

/* Text Align Helpers */
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.font-bold {
  font-weight: 700;
}
.font-medium {
  font-weight: 500;
}
.text-muted {
  color: #6c757d;
}
.text-subtotal {
  padding-right: 8px;
  font-size: 12px;
}

/* Summary Area */
.summary-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.summary-box {
  width: 260px;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 12px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.summary-row.align-center {
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.divider {
  height: 1px;
  background: #dee2e6;
  margin: 6px 0;
}

.total-row {
  margin-bottom: 0;
  font-size: 13px;
}

.grand-total-val {
  font-weight: 700;
  color: #1976d2;
}

/* Footer & Buttons */
.modal-footer {
  padding: 8px 16px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn {
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid transparent;
}

.btn-secondary {
  background: #fff;
  border-color: #ced4da;
  color: #495057;
}

.btn-secondary:hover {
  background: #f8f9fa;
}

.btn-primary {
  background: #1976d2;
  color: #fff;
}

.btn-primary:hover {
  background: #1565c0;
}

.btn-primary:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
</style>
