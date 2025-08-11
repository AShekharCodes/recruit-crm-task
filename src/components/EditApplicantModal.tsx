import React, { useState, useEffect } from "react";
import { useStore } from "../store/store";
import { Applicant } from "../types/applicant";
import "../styles/EditApplicantModal.css";

const EditApplicantModal = () => {
  const { editingApplicant, setEditingApplicant, updateApplicant } = useStore();
  const [formData, setFormData] = useState<Applicant | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingApplicant) {
      setFormData(editingApplicant);
    }
  }, [editingApplicant]);

  if (!editingApplicant) {
    return null;
  }

  const handleClose = () => {
    setEditingApplicant(null);
    setErrors({});
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (formData) {
      if (name === "skills" || name === "languageSkills") {
        setFormData({ ...formData, [name]: value.split(",") });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && formData) {
      await updateApplicant(formData);
    }
  };

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
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Applicant</h2>
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {renderInput("Name", "name")}
          {renderInput("Email", "email", "email")}
          {renderInput("Phone", "phone", "tel")}
          {renderInput("Current Organization", "currentOrganization")}
          {renderInput("Total Experience", "totalExperience")}
          {renderInput("Relevant Experience", "relevantExperience")}
          {renderInput("Current Salary", "currentSalary")}
          {renderInput("Salary Expectation", "salaryExpectation")}
          <div className="form-group">
            <label htmlFor="summary">Summary</label>
            <textarea
              id="summary"
              name="summary"
              value={formData?.summary || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData?.status || ""}
              onChange={handleChange}
            >
              <option value="New">New</option>
              <option value="In Review">In Review</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditApplicantModal;
