export interface Applicant {
  id: number;
  name: string;
  email: string;
  phone: string;
  currentOrganization: string;
  skills: string[];
  availableFrom: string;
  currentSalary: string;
  noticePeriod: string;
  fullAddress: string;
  resume: string;
  totalExperience: string;
  summary: string;
  currentEmploymentStatus: string;
  dateOfBirth: string;
  relevantExperience: string;
  salaryExpectation: string;
  status: string;
  salaryType: "Annual" | "Monthly" | "Hourly";
  languageSkills: string[];
  lastModified: string;
}
