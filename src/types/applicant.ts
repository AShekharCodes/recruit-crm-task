export interface Applicant {
  id: number;
  name: string;
  email: string;
  phone: string;
  // Details Column 1
  currentOrganization: string;
  skills: string[];
  availableFrom: string;
  currentSalary: string;
  noticePeriod: string;
  fullAddress: string;
  resume: string; // URL or filename
  totalExperience: string;
  // Details Column 2
  summary: string;
  currentEmploymentStatus: string;
  dateOfBirth: string;
  relevantExperience: string;
  salaryExpectation: string;
  status: string;
  salaryType: "Annual" | "Monthly" | "Hourly";
  languageSkills: string[];
}
