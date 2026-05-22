#  Capstone 2026 Group B Project: ELA Pro 3.1 Frontend Rebuild with React and TypeScript. 

This repository contains the React codebase for our CP2026 group project.

## Tech Stack
- React
- TypeScript
- Vite
- Node.js

## How to Run

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`

## Project Structure (Key Directories)

The codebase follows a feature-based structure, where components and related files are grouped by functionality rather than by type. This improves maintainability and keeps related logic co-located.

`src/`

  `features/`      # Feature-specific components, styles, tests, hooks (e.g. studentDashboard/)
  
  `common/`        # Reusable components shared across features (e.g. navigation, tables, forms)
  
  `hooks/`         # Custom hooks used across multiple components
  
  `services/`      # API calls and data fetching logic
  
  `utils/`         # General utility functions (e.g. date formatting)
  
  `types/`         # Shared TypeScript type definitions
  
  `pages/`         # Route-level components composing features and common components

## Pull Request (PR) Workflow

- Create a Jira ticket for the feature or task being implemented
- Create a feature branch using the Jira ticket number in the branch name (see branch naming convention below)
- Implement and test changes locally
- Push commits to GitHub
- Open a Pull Request (PR)
- Add a meaningful PR title and description summarising the work completed
- Add your co-dashboard team member as a reviewer (this will notify them of the PR)
- Move the associated Jira task to `In Review` and leave a comment referencing the PR  
  Example: `Please review PR #60`
- Attach testing evidence to the Jira ticket (e.g. screenshots, console output, or test results)
- Reviewer checks:
  - the implementation and files changed in the PR
  - testing evidence attached to the Jira ticket
- In the `Files changed` tab of the PR, the reviewer selects `Submit review`
  - Select `Request changes` and leave a comment if changes are required
  - Otherwise select `Approve` and leave a comment before submitting the review
- If changes are requested, the reviewee addresses the feedback and notifies the reviewer once complete
- After approval, merge the PR into `main` and delete the feature branch
- The reviewee leaves a brief Jira comment summarising the completed review and referencing the PR number
  Example: `Reviewed and merged via PR #60`

## Branch Naming Convention 

Add the Jira ticket code associated with work undertaken on the branch:

  `feature/AD-274-feature-name`

When naming a branch use the following convention:
  
  - `feature/` for new functionality
  - `chore` non-functional maintenance tasks such as renaming files/folders, restructuring directories, or project cleanup
  - `bugfix/` for fixing bugs within the code
  - `docs/` for updating documentation 
