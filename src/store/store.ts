import { create } from "zustand";
import { Applicant } from "../types/applicant";

interface Store {
  applicants: Applicant[];
  editingApplicant: Applicant | null;
  setApplicants: (applicants: Applicant[]) => void;
  setEditingApplicant: (applicant: Applicant | null) => void;
}

export const useStore = create<Store>((set) => ({
  applicants: [],
  editingApplicant: null,
  setApplicants: (applicants) => set({ applicants }),
  setEditingApplicant: (editingApplicant) => set({ editingApplicant }),
}));
