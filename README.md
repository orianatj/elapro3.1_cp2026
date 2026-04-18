# ELAPRO3.1 – CP2026 Student Database Project

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

  `features/`      # Feature-specific modules (e.g. studentDashboard/)
  
  `common/`        # Reusable components shared across features (e.g. navigation, tables, forms)
  
  `hooks/`         # Custom hooks used across multiple components
  
  `services/`      # API calls and data fetching logic
  
  `utils/`         # General utility functions (e.g. date formatting)
  
  `types/`         # Shared TypeScript type definitions
  
  `pages/`         # Route-level components composing features and common components

## Branch Naming Convention 

When naming a branch use the following convention:
  
  - `feature/` for new functionality 
  - `bugfix/` for fixing bugs within the code
  - `docs/` for updating documentation 
  - `release/` for preparing release functionality 

Add the Jira ticket code associated with work undertaken on the branch:

  `feature/AD-274-feature-name`
