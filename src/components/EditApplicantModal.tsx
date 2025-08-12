import React, { useState, useEffect } from "react";
import { useStore } from "../store/store";
import { Applicant } from "../types/applicant";
import "../styles/EditApplicantModal.css";
import ConfirmationModal from "./ConfirmationModal";

const EditApplicantModal = () => {
  const { editingApplicant, setEditingApplicant, updateApplicant } = useStore();

  // State for form data
  const [formData, setFormData] = useState<Applicant | null>(null);
  // State for validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  // State to track if form has been changed
  const [isDirty, setIsDirty] = useState(false);
  // State for showing the cancel confirmation modal
  const [isCancelConfirmVisible, setIsCancelConfirmVisible] = useState(false);

  // Populate form when the modal is opened
  useEffect(() => {
    if (editingApplicant) {
      setFormData(editingApplicant);
      setIsDirty(false); // Reset dirty state on new applicant
    }
  }, [editingApplicant]);

  // Function to handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (formData) {
      // Convert comma-separated strings to arrays for skill fields
      if (name === "skills" || name === "languageSkills") {
        setFormData({
          ...formData,
          [name]: value.split(",").map((s) => s.trim()),
        });
      } else {
        setFormData({ ...formData, [name]: value });
      }
      setIsDirty(true); // Mark form as dirty on any change
    }
  };

  // Function to handle closing the modal
  const tryClose = () => {
    // If form has been changed, show confirmation modal
    if (isDirty) {
      setIsCancelConfirmVisible(true);
    } else {
      // Otherwise, close immediately
      closeAndReset();
    }
  };

  // Actually closes the modal and resets state
  const closeAndReset = () => {
    setEditingApplicant(null);
    setErrors({});
    setIsDirty(false);
    setIsCancelConfirmVisible(false);
  };

  // Handles the final confirmation to close (discard changes)
  const handleConfirmClose = () => {
    closeAndReset();
  };

  // Validates the form data
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData) return false;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.totalExperience.trim())
      newErrors.totalExperience = "Total experience is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && formData) {
      await updateApplicant(formData);
      // The updateApplicant in the store now handles closing the modal
    }
  };

  // If no applicant is being edited, don't render the modal
  if (!editingApplicant) {
    return null;
  }

  // Helper to render form fields
  const renderInput = (label: string, name: keyof Applicant, type = "text") => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={(formData?.[name] as string) || ""}
        onChange={handleChange}
        className={errors[name] ? "input-error" : ""}
      />
      {errors[name] && <span className="error-message">{errors[name]}</span>}
    </div>
  );

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Edit Applicant Details</h2>
            <button className="close-button" onClick={tryClose}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-grid">
              {renderInput("Full Name", "name")}
              {renderInput("Email Address", "email", "email")}
              {renderInput("Phone Number", "phone", "tel")}
              {renderInput("Date of Birth", "dateOfBirth", "date")}
              {renderInput("Full Address", "fullAddress")}
              {renderInput("Current Organization", "currentOrganization")}
              {renderInput("Total Experience (years)", "totalExperience")}
              {renderInput("Relevant Experience (years)", "relevantExperience")}
              <div className="form-group">
                <label htmlFor="skills">Skills (comma-separated)</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData?.skills?.join(", ") || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="languageSkills">
                  Language Skills (comma-separated)
                </label>
                <input
                  type="text"
                  id="languageSkills"
                  name="languageSkills"
                  value={formData?.languageSkills?.join(", ") || ""}
                  onChange={handleChange}
                />
              </div>
              {renderInput(
                "Current Employment Status",
                "currentEmploymentStatus"
              )}
              {renderInput("Available From", "availableFrom", "date")}
              {renderInput("Notice Period", "noticePeriod")}
              {renderInput("Current Salary", "currentSalary")}
              {renderInput("Salary Expectation", "salaryExpectation")}
              <div className="form-group">
                <label htmlFor="salaryType">Salary Type</label>
                <select
                  id="salaryType"
                  name="salaryType"
                  value={formData?.salaryType || ""}
                  onChange={handleChange}
                >
                  <option value="Annual">Annual</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Hourly">Hourly</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="status">Application Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData?.status || ""}
                  onChange={handleChange}
                >
                  <option value="New">New</option>
                  <option value="In Review">In Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview Scheduled">
                    Interview Scheduled
                  </option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="form-group form-group-full">
                <label htmlFor="summary">Summary</label>
                <textarea
                  id="summary"
                  name="summary"
                  value={formData?.summary || ""}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-cancel-edit"
                onClick={tryClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-submit-edit"
                disabled={!isDirty}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      {isCancelConfirmVisible && (
        <ConfirmationModal
          onConfirm={handleConfirmClose}
          onCancel={() => setIsCancelConfirmVisible(false)}
        />
      )}
    </>
  );
};

export default EditApplicantModal;
