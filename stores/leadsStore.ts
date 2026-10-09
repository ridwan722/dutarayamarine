import { defineStore } from "pinia";
import type { leadsM } from "~/types/leadsM";

const COLLECTION = "leads";

export const useleadsStore = defineStore("leadsStore", {
  state: () => ({
    dataLeads: [] as leadsM[],
  }),

  getters: {
    getDataLeads(state) {
      return state.dataLeads;
    },
  },

  actions: {
    async tarikDataLeadsAct() {
      const datatarik = await queryambilid(COLLECTION);
      this.dataLeads = datatarik as unknown as leadsM[];
    },

    async addLeadsAct(data: leadsM) {
      const notificationStore = useNotificationStore();
      try {
        useloadingStore().setLoading(true);
        const createdLead = await tambahdatabase(COLLECTION, data);
        this.dataLeads.push({ ...data, id: createdLead.id });
        notificationStore.showSuccess("Leads berhasil ditambahkan");
        return true;
      } catch (error) {
        notificationStore.showError("Gagal menyimpan Leads");
        return false;
      } finally {
        useloadingStore().setLoading(false);
      }
    },

    async updateLeadsAct(data: leadsM) {
      const notificationStore = useNotificationStore();
      try {
        useloadingStore().setLoading(true);
        await updatedatabase(COLLECTION, data.id!, data);
        // sessionStorage.removeItem(COLLECTION);
        await this.tarikDataLeadsAct();
        notificationStore.showSuccess("Perubahan berhasil disimpan");
      } catch (error) {
        notificationStore.showError("Gagal memperbarui Leads");
      } finally {
        useloadingStore().setLoading(false);
      }
    },

    async deleteLeadsAct(id: string) {
      const notificationStore = useNotificationStore();
      try {
        useloadingStore().setLoading(true);
        await hapusdatabase(COLLECTION, id);
        // sessionStorage.removeItem(COLLECTION);
        await this.tarikDataLeadsAct();
        notificationStore.showSuccess("Leads berhasil dihapus");
      } catch (error) {
        notificationStore.showError("Gagal menghapus Leads");
      } finally {
        useloadingStore().setLoading(false);
      }
    },
  },
});
