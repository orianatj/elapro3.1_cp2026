# ELAPRO3.1 – CP2026 Student Database Project

This repository contains the React + TypeScript codebase for our CP2026 group project.

## Tech Stack
- React
- TypeScript
- Vite
- Node.js

## How to Run

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`

## Project Structure
models/            → fetches data from the API (Model)
views/          → Pages connecting the ViewModel and View
viewModels/             → ViewModels managing state and logic (Hooks)
components/        → Pure UI components (View)

Model (access data via API) → ViewModel (hook) → Views (Typed objects for compoment props) → View (Pure UI components)
