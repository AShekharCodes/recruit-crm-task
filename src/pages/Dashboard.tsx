import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { getApplicants } from "../services/applicant.service";
import "../styles/Dashboard.css";
import { Applicant } from "../types/applicant";

const ToggleSwitch = ({
  isOn,
  onToggle,
}: {
  isOn: boolean;
  onToggle: (value: boolean) => void;
}) => {
  return (
    <label className="toggle-switch-label">
      <input
        type="checkbox"
        checked={isOn}
        onChange={(e) => onToggle(e.target.checked)}
        className="toggle-switch-input"
      />
      <span className={`toggle-switch-background ${isOn ? "on" : ""}`}>
        <span className="toggle-switch-knob" />
      </span>
    </label>
  );
};

const Dashboard = () => {
  const { applicants, setApplicants } = useStore();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState("All Details");
  const [activeSideTab, setActiveSideTab] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getApplicants();
      setApplicants(data);
      setIsLoading(false);
    };
    fetchData();
  }, [setApplicants]);

  const candidate: Applicant | undefined = applicants[currentIndex];

  const handleNext = () => {
    if (currentIndex < applicants.length - 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsLoading(false);
      }, 500);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setIsLoading(false);
      }, 500);
    }
  };

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);
  const dismissSidebar = (e: React.MouseEvent) => {
    if (isSidebarExpanded && !(e.target as Element).closest(".sidebar")) {
      setIsSidebarExpanded(false);
    }
  };

  const sidebarItems = [
    { icon: "bx-buildings", label: "Dashboard" },
    { icon: "bx-user", label: "Candidates" },
    { icon: "bx-briefcase", label: "Jobs" },
    { icon: "bx-bar-chart", label: "Reports" },
    { icon: "bx-cog", label: "Settings" },
    { icon: "bx-user-circle", label: "Profile" },
    { icon: "bx-message", label: "Messages" },
    { icon: "bx-bell", label: "Notifications" },
    { icon: "bx-line-chart", label: "Analytics" },
    { icon: "bx-group", label: "Teams" },
    { icon: "bx-help-circle", label: "Help" },
    { icon: "bx-log-out", label: "Logout" },
  ];

  const renderDetail = (label: string, value: React.ReactNode) => (
    <div className="detail-item">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  );

  return (
    <div className="dashboard" onClick={dismissSidebar}>
      <aside className={`sidebar ${isSidebarExpanded ? "expanded" : ""}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <i className="bx bx-menu"></i>
        </button>
        <div className="sidebar-items">
          {sidebarItems.map((item, index) => (
            <div key={index} className="sidebar-item">
              <i className={`bx ${item.icon}`}></i>
              {isSidebarExpanded && <span>{item.label}</span>}
            </div>
          ))}
        </div>
      </aside>
      <div className="main-container">
        <nav className="navbar">
          <div className="searchbar">
            <i className="bx bx-search"></i>
            <input type="text" placeholder="Search Pipedrive" />
          </div>
          <img src="/assets/images/logo.png" alt="Logo" />
          <div className="user-section">
            <div className="action-icons">
              <i className="bx bx-plus"></i>
              <div className="vertical-divider"></div>
              <i className="bx bx-envelope"></i>
              <i className="bx bx-phone"></i>
              <i className="bx bx-calendar"></i>
            </div>
            <div className="avatar">
              <img src="/assets/images/avatar.png" alt="User Avatar" />
            </div>
            <div className="avatar-detail">
              <span className="name">Phyllis Yang</span>
              <span className="role">Silicon Links Inc</span>
            </div>
          </div>
        </nav>
        <div className="content-sections">
          <section className="main-section">
            <header className="section-header">
              <span>
                {"Candidates >"}{" "}
                {candidate ? `${candidate.name} - ID ${candidate.id}` : "..."}
              </span>
              <div className="header-actions">
                <span className="candidate-counter">
                  {applicants.length > 0
                    ? `${currentIndex + 1}/${applicants.length}`
                    : "0/0"}
                </span>
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0 || isLoading}
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= applicants.length - 1 || isLoading}
                >
                  Next
                </button>
              </div>
            </header>

            {candidate && (
              <>
                <header className="profile-header">
                  <div className="profile-info">
                    <img
                      src="/assets/images/candidate_avatar.png"
                      className="avatar-large"
                      alt="Candidate Avatar"
                    />
                    <div className="profile-section">
                      <div className="profile-name-social">
                        <h2>{candidate.name}</h2>
                        <div className="social-icons-container">
                          <i className="bx bxl-facebook"></i>
                          <i className="bx bxl-linkedin"></i>
                          <i className="bx bxl-twitter"></i>
                          <i className="bx bxl-instagram"></i>
                          <i className="bx bxl-github"></i>
                        </div>
                      </div>
                      <div className="profile-role-location">
                        <span>{candidate.totalExperience} of Experience</span>
                        <span>{"|"}</span>
                        <span>
                          {candidate.fullAddress
                            .split(",")
                            .slice(-2)
                            .join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="profile-actions">
                    <span className="contact-linked">Contact Linked</span>
                    <div className="action-icons">
                      <i className="bx bx-star"></i>
                      <i className="bx bx-heart"></i>
                      <i className="bx bx-bell"></i>
                      <i className="bx bx-pencil"></i>
                    </div>
                  </div>
                </header>
                <header className="contact-header">
                  <div className="contact-info">
                    <p>
                      <i className="bx bx-envelope"></i>
                      <a href={`mailto:${candidate.email}`}>
                        {candidate.email}
                      </a>
                    </p>
                    <p>
                      <i className="bx bx-phone"></i>
                      <a href={`tel:${candidate.phone}`}>{candidate.phone}</a>
                    </p>
                  </div>
                  <div className="contact-meta">
                    <span>
                      <i className="bx bx-user"></i>
                      Phyllis Yang
                    </span>
                    <span>
                      <i className="bx bx-time"></i>
                      July 14, 2023, 4:04 PM
                    </span>
                  </div>
                </header>
                <div className="candidate-details-wrapper">
                  {isLoading && (
                    <div className="loader-overlay">
                      <div className="loader"></div>
                    </div>
                  )}
                  <div className="candidate-details">
                    <div className="details-column">
                      {renderDetail(
                        "Current Organization",
                        candidate.currentOrganization
                      )}
                      {renderDetail("Skills", candidate.skills.join(", "))}
                      {renderDetail("Available From", candidate.availableFrom)}
                      {renderDetail("Current Salary", candidate.currentSalary)}
                      {renderDetail("Notice Period", candidate.noticePeriod)}
                      {renderDetail("Full Address", candidate.fullAddress)}
                      {renderDetail(
                        "Resume",
                        <a href="#">{candidate.resume}</a>
                      )}
                      {renderDetail(
                        "Total Experience",
                        candidate.totalExperience
                      )}
                    </div>
                    <div className="details-column">
                      {renderDetail(
                        "Summary",
                        <p className="summary-text">{candidate.summary}</p>
                      )}
                      {renderDetail(
                        "Current Employment Status",
                        candidate.currentEmploymentStatus
                      )}
                      {renderDetail("Date of Birth", candidate.dateOfBirth)}
                      {renderDetail(
                        "Relevant Experience",
                        candidate.relevantExperience
                      )}
                      {renderDetail(
                        "Salary Expectation",
                        candidate.salaryExpectation
                      )}
                      {renderDetail(
                        "Status",
                        <span
                          className={`status-badge status-${candidate.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {candidate.status}
                        </span>
                      )}
                      {renderDetail("Salary Type", candidate.salaryType)}
                      {renderDetail(
                        "Language Skills",
                        candidate.languageSkills.join(", ")
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="tab-bar">
              {[
                "All Details",
                "Assigned Jobs",
                "Related Emails",
                "Candidate Questions",
                "Hotlists",
                "Related Deals",
                "Contact(s) Pitched",
              ].map((tab) => (
                <button
                  key={tab}
                  className={activeMainTab === tab ? "active" : ""}
                  onClick={() => setActiveMainTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            {activeMainTab === "All Details" && (
              <div className="tab-content">
                This section shows all details. More content could go here.
              </div>
            )}
            {activeMainTab === "Assigned Jobs" && (
              <div className="tab-content">
                <header className="assigned-jobs-header">
                  <p>Assigned Job to {candidate?.name}</p>
                  <div className="header-buttons">
                    <button className="btn btn-primary">Assign to Job</button>
                    <button className="btn btn-secondary">
                      View all Assigned Jobs
                    </button>
                  </div>
                </header>
                <div className="job-cards-container">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div className="job-card" key={index}>
                      <div className="job-card-content">
                        <div className="job-card-image-container">
                          <img
                            src="/assets/images/candidate_avatar.png"
                            alt=""
                            className="job-card-image"
                          />
                          <div className="job-card-title-container">
                            <span className="job-card-title">
                              Senior Product Manager
                            </span>
                            <span className="job-card-subtitle">
                              Recruit CRM
                            </span>
                          </div>
                        </div>
                        <div className="job-card-meta-container">
                          <span className="job-card-meta">
                            <i className="bx bx-user job-card-meta-icon"></i>
                            <span className="job-card-meta-text">John Doe</span>
                          </span>
                          <span className="job-card-meta-time">
                            <i className="bx bx-time job-card-meta-time-icon"></i>
                            July 14, 2023, 4:04 PM
                          </span>
                        </div>
                        <span className="job-card-status">Assigned</span>
                        <button className="job-card-view-files">
                          View Files
                        </button>
                        <ToggleSwitch
                          isOn={isToggleOn}
                          onToggle={setIsToggleOn}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeMainTab === "Related Emails" && (
              <div className="tab-content">
                <p>No related emails found.</p>
              </div>
            )}
            {activeMainTab === "Candidate Questions" && (
              <div className="tab-content">
                <p>No candidate questions found.</p>
              </div>
            )}
            {activeMainTab === "Hotlists" && (
              <div className="tab-content">
                <p>No hotlists found.</p>
              </div>
            )}
            {activeMainTab === "Related Deals" && (
              <div className="tab-content">
                <p>No related deals found.</p>
              </div>
            )}
            {activeMainTab === "Contact(s) Pitched" && (
              <div className="tab-content">
                <p>No contacts pitched found.</p>
              </div>
            )}
          </section>
          <section className="side-section">
            <header className="section-header">
              <i className="bx bxs-note"></i>
              <i className="bx bxs-phone-call"></i>
              <i className="bx bxs-envelope"></i>
              <i className="bx bxs-calendar"></i>
            </header>
            <div className="tab-bar">
              {["All", "Notes & Calls", "Tasks", "Meeting", "Files"].map(
                (tab) => (
                  <button
                    key={tab}
                    className={activeSideTab === tab ? "active" : ""}
                    onClick={() => setActiveSideTab(tab)}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
            {activeSideTab === "All" && (
              <div className="tab-content side-tab-all">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div className="todo-card" key={index}>
                    <div className="todo-card-header-container">
                      <div className="todo-card-header-content">
                        <div className="todo-card-header-inner">
                          <i className="bx bxs-note"></i>
                          <span>Note</span>
                        </div>
                        <span className="todo-card-header-status">To Do</span>
                      </div>
                      <span className="todo-priority high">High Priority</span>
                    </div>
                    <p>Scheduled for Tomorrow, 10:00 AM</p>
                    <p className="todo-card-associations">1 Associations(s)</p>
                    <div className="todo-card-footer">
                      <span className="todo-card-footer-user">
                        <i className="bx bx-user todo-card-footer-user-icon"></i>
                        John Doe
                      </span>
                      <span className="todo-card-footer-time">
                        <i className="bx bx-time"></i>
                        July 14, 2023, 4:04 PM
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeSideTab === "Notes & Calls" && (
              <div className="tab-content side-tab-notes-calls">
                <p>No notes or calls found.</p>
              </div>
            )}
            {activeSideTab === "Tasks" && (
              <div className="tab-content side-tab-tasks">
                <p>No tasks found.</p>
              </div>
            )}
            {activeSideTab === "Meeting" && (
              <div className="tab-content side-tab-meeting">
                <p>No meetings found.</p>
              </div>
            )}
            {activeSideTab === "Files" && (
              <div className="tab-content side-tab-files">
                <p>No files found.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
