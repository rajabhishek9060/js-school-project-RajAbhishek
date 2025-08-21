# js-school-project-RajAbhishek

# 🕒 Timeline App

## Task 1: HTML. The Foundations of Web Design

This is the initial static setup for the Timeline App. It includes the basic HTML structure needed to build a timeline-based application.

### Features in this stage:
An index.html containing:
- A `<header>` with logo and theme toggle.
- A `<nav>` or container for filters/placeholders (empty for now).
- A `<section id="timeline">` where event markers will live.
- An empty `<div id="modal">` for future pop‑ups. 
Semantic tags for main content (`<main>`, `<article>`, `<figure>`, etc.). 
A basic README.md with project title and stage-1 description.

## 📚 Task 2: CSS and Preprocessors

Styling HTML into a responsive, polished layout.  
A `styles.css` (or SCSS) implementing:

- Responsive layout using Flexbox or CSS Grid for the timeline.
- Header styling, typography, and colour scheme.
- Placeholder styles for event markers (e.g. dots, labels).
- Modal base styles (hidden by default).
- Ensure your design adapts at breakpoints:
  - **Mobile** (<768px)
  - **Tablet** (768–1023px)
  - **Desktop** (≥1024px)

## 📦 Task 3: JavaScript Fundamentals. Dynamic Web Development

Adding interactivity to the timeline app with JavaScript.
### Features in this stage:
- Bring interactivity with vanilla JS. 
- A data/events.json file with at least 8 sample events (year, title, description, imageURL, category). 
- A script.js that: 
  - Fetches and parses events.json. 
  - Renders event markers into #timeline. 
  - Attaches click handlers to open #modal with event details. 
  - Implements “close” functionality for the modal. 
- Update index.html to load script.js at the end of `<body>`. 

## 🧩 Task 4: Typescript. Fundamentals
Adding TypeScript to the project for type safety and better development experience.
### Features in this stage:
- Introduce static typing and modular code. 
- Initialize TypeScript (create `tsconfig.json` with strict mode). 
- Convert `script.js` → `src/index.ts`: 
  - Define interfaces/types for your event data. 
  - Use ES modules: separate `fetcher.ts`, `renderer.ts`, `modal.ts`, etc. 
- Add build scripts (tsc or via bundler) to compile TS → JS into a dist/ folder. 
- Verify the app still works in the browser using the compiled JS. 

## 📦 Task 5: React. Building Dynamic User Interfaces
Adding React to the project for building dynamic user interfaces.
### Features in this stage:
- Rebuild the UI as a React application. 
- Bootstrap with Vite (React + TypeScript template). 
- Create components: 
  - `<Header>` (logo + theme switch). 
  - `<Timeline>` that maps over event data and renders `<EventMarker>`. 
  - `<EventMarker>` for each year/title dot. 
  - `<EventModal>` for detailed view (use React Portal if desired). 
  - Optional `<FilterPanel>` for future filters/bookmarks. 
- Implement state with hooks (useState, useEffect) to load data and control modal visibility. 
- Maintain styling: import your CSS or migrate to CSS Modules / styled-components. 

## 📦 Task 6: Web Accessibility – Designing for Everyone
Adding accessibility features to ensure the app is usable by everyone, including those with disabilities.
### Features in this stage:
- Ensure your app is accessible for users with disabilities. 
- Add proper ARIA roles and attributes to elements: 
  - Make sure that modal is accessible (either use role="dialog" on the modal or use `<dialog>` tag that has good browser support now). 
  - aria-current or similar on the active timeline marker. 
  - ... 
- Manage focus: 
  - Trap focus inside the modal when open. 
  - Return focus to the triggering marker on close. 
- Ensure keyboard navigation: 
  - Timeline markers reachable via Tab/Arrow keys. 
  - Modal closable via Esc. 
- Verify colour contrast meets WCAG AA (contrast ratio ≥4.5:1 for text). 
- Ensure other WCAG requirements are met. 
- Document your accessibility changes in ACCESSIBILITY.md. 
