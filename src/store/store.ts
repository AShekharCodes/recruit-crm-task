import { create } from "zustand";
import { Applicant } from "../types/applicant";
import { updateApplicant } from "../services/applicant.service";

interface Store {
  applicants: Applicant[];
  editingApplicant: Applicant | null;
  setApplicants: (applicants: Applicant[]) => void;
  setEditingApplicant: (applicant: Applicant | null) => void;
  updateApplicant: (applicant: Applicant) => Promise<void>;
}

export const useStore = create<Store>((set, get) => ({
  applicants: [],
  editingApplicant: null,
  setApplicants: (applicants) => set({ applicants }),
  setEditingApplicant: (editingApplicant) => set({ editingApplicant }),
  updateApplicant: async (applicant) => {
    try {
      const updatedApplicant = await updateApplicant(applicant);
      const applicants = get().applicants.map((a) =>
        a.id === updatedApplicant.id ? updatedApplicant : a
      );
      set({ applicants, editingApplicant: null });
    } catch (error) {
      console.error("Failed to update applicant:", error);
    }
  },
}));
