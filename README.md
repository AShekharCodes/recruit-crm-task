# Candidate Details Page

## Project Overview

This project is a single-page web application developed as part of the Senior UI Developer assignment for a recruitment agency web-app. The application implements a candidate details page based on a provided Figma wireframe, utilizing **React**, **TypeScript**, **Vanilla CSS/SCSS**, and **Zustand** for state management. The goal was to create a responsive, performant, and visually appealing interface with an "Edit Details" functionality, adhering to industry best practices and avoiding CSS frameworks to showcase Vanilla CSS skills.

The application is hosted at [applicard.netlify.app](https://applicard.netlify.app).

## Features

- **Responsive UI**: The interface adapts seamlessly across various devices and screen sizes, from mobile to desktop, with a flexible layout using media queries. Everything works including the navbar drawer and sidebar and both have different views for different platforms.
- **Candidate Details Display**: Displays comprehensive candidate information, including personal details, experience, skills, and application status, fetched from a mocked API and stored in localStorage.
- **Edit Details Functionality**: Allows editing of candidate details via a modal form, with validation, state management via Zustand, and persistence to localStorage.
- **Navigation and Tabs**: Implements a sidebar with navigation items and main/side tabs for organizing content, with only the visible "All Details" tab fully developed as per requirements.
- **Component Reusability**: Uses reusable components like `Navbar`, `EditApplicantModal`, `ConfirmationModal`, and `ToggleSwitch` for consistency and modularity.
- **Vanilla CSS/SCSS Styling**: Custom styles without CSS frameworks, leveraging SCSS for better organization and maintainability.
- **Mocked API**: Simulates API calls using `applicant.service.ts` to fetch and update candidate data, stored in localStorage for persistence.

## Tech Stack

- **React**: Frontend framework for building the UI.
- **TypeScript**: Ensures type safety and better code maintainability.
- **SCSS/Vanilla CSS**: Used for styling, with SCSS for modular and reusable styles.
- **Zustand**: Lightweight state management for handling applicant data and edit modal state.
- **Boxicons**: Icon library for UI elements, as specified in the wireframe.
- **LocalStorage**: Used to persist mock data across sessions.
- **Netlify**: Hosting platform for deployment.

## Project Structure

```
src/
|__pages/
|  ├── Dashboard.tsx
|
├── components/
│   ├── ConfirmationModal.tsx
│   ├── EditApplicantModal.tsx
│   ├── Navbar.tsx
│   └── ToggleSwitch.tsx
├── services/
│   └── applicant.service.ts
├── store/
│   └── store.ts
├── styles/
│   ├── ConfirmationModal.css
│   ├── Dashboard.css
│   ├── EditApplicantModal.css
│   └── Navbar.css
├── types/
│   └── applicant.ts

```

## Setup and Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   Ensure Node.js is installed, then run:

   ```bash
   npm install
   ```

3. **Run the Application**:
   Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

4. **Build for Production**:
   Create a production build:
   ```bash
   npm run build
   ```

## Usage

- **View Candidate Details**: On loading, the application fetches mock candidate data and displays the first candidate’s details in the "All Details" tab.
- **Navigate Candidates**: Use the "Previous" and "Next" buttons to cycle through candidates, with a loading state for smooth transitions.
- **Edit Candidate Details**: Click the pencil icon to open the `EditApplicantModal`. Update fields, validate inputs, and save changes, which persist to localStorage.
- **Responsive Navigation**: On desktop, toggle the sidebar using the menu icon. On mobile, use the drawer toggle for navigation.
- **Tabs**: Switch between main tabs (e.g., "All Details") and side tabs (e.g., "All"). Only the visible content is fully implemented, as per the assignment.

## Approach

- **UI Development**:
  - Followed the Figma wireframe closely, using Boxicons for icons and vanilla CSS for styling.
  - Implemented a responsive layout with flexbox and media queries to ensure compatibility across devices.
- **State Management**:
  - Utilized Zustand for managing applicant data and modal state, ensuring scalability and separation of concerns.
  - Persisted data in localStorage to simulate a backend, with `applicant.service.ts` handling mock API calls.
- **Edit Functionality**:
  - Designed a comprehensive edit form in `EditApplicantModal` with validation for required fields (name, email, phone, experience).
  - Handled form changes with a "dirty" state to prompt confirmation on unsaved changes.
  - Integrated `ConfirmationModal` for discarding unsaved changes, enhancing UX.
- **Code Quality**:
  - Followed TypeScript best practices for type safety.
  - Added comments in crucial areas for clarity.
  - Modularized components for reusability and maintainability.
  - Conducted manual testing to verify functionality, responsiveness, and edge cases (e.g., invalid email, empty fields).
  - AI tools were used to arrange the CSS files after project completion ensuring neatly arranged CSS files.
- **Deployment**:
  - Deployed to Netlify for easy access and testing, ensuring the application is publicly available.

## Challenges and Solutions

- **Challenge**: Avoiding CSS frameworks while maintaining a polished UI.
  - **Solution**: Leveraged Vanilla CSS with a focus on custom styles, using variables and mixins to streamline development and ensure consistency.
- **Challenge**: Implementing responsive design without a framework.
  - **Solution**: Used flexbox, grid, and media queries to create a fluid layout, with careful testing across device sizes to match the wireframe’s intent.
- **Challenge**: Simulating a backend without a real API.
  - **Solution**: Created a mock service (`applicant.service.ts`) with localStorage to persist data, mimicking API behavior with async delays.
- **Challenge**: Managing state for the edit modal without overcomplicating the codebase.
  - **Solution**: Used Zustand for lightweight, centralized state management, ensuring the modal and main dashboard stayed in sync.
- **Challenge**: Handling unsaved changes in the edit modal.
  - **Solution**: Implemented a "dirty" state and `ConfirmationModal` to prompt users before discarding changes, improving UX and preventing data loss.

## Future Improvements

- **Additional Tabs**: Implement content for other main and side tabs (e.g., "Related Emails", "Notes & Calls") to provide a fully functional dashboard.
- **Enhanced Testing**: Add unit tests using Jest and React Testing Library to ensure robustness.
- **Accessibility**: Improve ARIA attributes and keyboard navigation for better accessibility compliance.
- **Real API Integration**: Replace the mock service with a real backend API for production use.
- **Performance Optimization**: Optimize image loading and add lazy loading for job cards to improve performance.

## Submission

- The project is hosted at [applicard.netlify.app](https://applicard.netlify.app).
- The Git repository has been shared with `shreyask@recruitcrm.io` and `akshay@recruitcrm.io` as collaborators.
- All code, styles, and this README are included in the repository, organized as per the project structure above.

## Notes

- Only the "All Details" main tab and "All" side tab content are fully developed, as per the assignment’s focus on visible wireframe elements.
- Buttons like "Assign to Job" and "View Files" are styled and placed but not functional, as functionality was not required unless explicitly stated.
- The application avoids CSS frameworks to highlight Vanilla CSS proficiency, as requested.
- For clarifications or issues, please contact me via email or the provided repository.

Thank you for reviewing my submission!
