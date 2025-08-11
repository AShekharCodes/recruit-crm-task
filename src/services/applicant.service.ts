import { Applicant } from "../types/applicant";

// Define a key for localStorage
const LOCAL_STORAGE_KEY = "applicantsData";

// The initial data to seed localStorage if it's empty
const initialApplicants: Applicant[] = [
  {
    id: 231,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    currentOrganization: "Tech Solutions Inc.",
    skills: ["React", "Node.js", "TypeScript", "GraphQL"],
    availableFrom: "2023-08-01",
    currentSalary: "$95,000",
    noticePeriod: "1 Month",
    fullAddress: "123 Tech Street, Silicon Valley, CA 94001",
    resume: "john_doe_resume.pdf",
    totalExperience: "8 Years",
    summary:
      "A highly motivated Senior Software Engineer with a passion for building scalable web applications and leading technical teams.",
    currentEmploymentStatus: "Full-time",
    dateOfBirth: "1990-05-15",
    relevantExperience: "6 Years",
    salaryExpectation: "$110,000",
    status: "In Review",
    salaryType: "Annual",
    languageSkills: ["English (Native)", "Spanish (Conversational)"],
    lastModified: "2023-07-14T16:04:00Z",
  },
  {
    id: 232,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+44 123 456 789",
    currentOrganization: "Innovate Ltd.",
    skills: ["Vue.js", "Python", "Django", "AWS"],
    availableFrom: "2023-09-15",
    currentSalary: "£70,000",
    noticePeriod: "2 Months",
    fullAddress: "456 Innovation Ave, London, UK SW1A 0AA",
    resume: "jane_smith_cv.pdf",
    totalExperience: "6 Years",
    summary:
      "Creative and detail-oriented Frontend Developer with extensive experience in cloud infrastructure and backend development.",
    currentEmploymentStatus: "Full-time",
    dateOfBirth: "1992-11-20",
    relevantExperience: "5 Years",
    salaryExpectation: "£80,000",
    status: "Shortlisted",
    salaryType: "Annual",
    languageSkills: ["English (Native)", "French (Basic)"],
    lastModified: "2023-07-12T11:30:00Z",
  },
  {
    id: 233,
    name: "Mike Brown",
    email: "mike.brown@example.com",
    phone: "+91 987 654 3210",
    currentOrganization: "Data Corp",
    skills: ["Python", "Machine Learning", "TensorFlow", "Pandas"],
    availableFrom: "2023-07-20",
    currentSalary: "₹1,800,000",
    noticePeriod: "45 Days",
    fullAddress: "789 Data Park, Bangalore, India 560001",
    resume: "mike_brown_bio.pdf",
    totalExperience: "7 Years",
    summary:
      "Data Scientist with a proven track record of developing models that drive business decisions and improve user experience.",
    currentEmploymentStatus: "Full-time",
    dateOfBirth: "1991-02-10",
    relevantExperience: "7 Years",
    salaryExpectation: "₹2,200,000",
    status: "Interview Scheduled",
    salaryType: "Annual",
    languageSkills: ["English (Fluent)", "Hindi (Native)"],
    lastModified: "2023-07-10T09:00:00Z",
  },
  {
    id: 234,
    name: "Emily White",
    email: "emily.white@example.com",
    phone: "+1 345 678 9012",
    currentOrganization: "Creative Minds Agency",
    skills: ["UI/UX Design", "Figma", "Adobe XD", "User Research"],
    availableFrom: "Immediate",
    currentSalary: "$80,000",
    noticePeriod: "N/A",
    fullAddress: "101 Creative Blvd, New York, NY 10001",
    resume: "emily_white_portfolio.pdf",
    totalExperience: "5 Years",
    summary:
      "A user-centric UI/UX designer focused on creating intuitive and beautiful digital experiences. Freelance and looking for a full-time role.",
    currentEmploymentStatus: "Freelance",
    dateOfBirth: "1994-08-25",
    relevantExperience: "5 Years",
    salaryExpectation: "$90,000",
    status: "New",
    salaryType: "Annual",
    languageSkills: ["English (Native)"],
    lastModified: "2023-07-15T14:20:00Z",
  },
  {
    id: 235,
    name: "Carlos Garcia",
    email: "carlos.garcia@example.com",
    phone: "+34 612 345 678",
    currentOrganization: "Global Connect",
    skills: ["Project Management", "Agile", "Scrum", "JIRA"],
    availableFrom: "2023-08-15",
    currentSalary: "€65,000",
    noticePeriod: "30 Days",
    fullAddress: "222 Global Plaza, Madrid, Spain 28001",
    resume: "carlos_garcia_cv.pdf",
    totalExperience: "10 Years",
    summary:
      "Experienced Project Manager with a history of successfully delivering complex projects on time and within budget.",
    currentEmploymentStatus: "Full-time",
    dateOfBirth: "1988-12-01",
    relevantExperience: "10 Years",
    salaryExpectation: "€75,000",
    status: "Rejected",
    salaryType: "Annual",
    languageSkills: [
      "Spanish (Native)",
      "English (Fluent)",
      "Portuguese (Conversational)",
    ],
    lastModified: "2023-07-11T18:45:00Z",
  },
];

// Function to initialize and get data from localStorage
const getStoredApplicants = (): Applicant[] => {
  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      // If no data, initialize localStorage with the default set
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(initialApplicants)
      );
      return initialApplicants;
    }
  } catch (error) {
    console.error("Could not access localStorage:", error);
    // Fallback to initial data if localStorage is unavailable
    return initialApplicants;
  }
};

// Simulates fetching all applicants with a delay
export async function getApplicants(): Promise<Applicant[]> {
  const applicants = getStoredApplicants();
  return new Promise((resolve) => setTimeout(() => resolve(applicants), 500));
}

// Simulates updating an applicant and persisting to localStorage
export async function updateApplicant(updated: Applicant): Promise<Applicant> {
  return new Promise((resolve, reject) => {
    const applicants = getStoredApplicants();
    const index = applicants.findIndex((a) => a.id === updated.id);

    if (index !== -1) {
      const applicantToUpdate = {
        ...updated,
        lastModified: new Date().toISOString(), // Update the timestamp
      };
      applicants[index] = applicantToUpdate;

      // Save the entire updated list back to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(applicants));

      setTimeout(() => resolve(applicantToUpdate), 300);
    } else {
      reject(new Error("Applicant not found"));
    }
  });
}
