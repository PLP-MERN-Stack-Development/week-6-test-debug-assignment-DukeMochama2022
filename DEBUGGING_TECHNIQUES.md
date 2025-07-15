# Debugging Techniques Implemented

## 1. Console Logging

- **Frontend:**
  - Used `console.log()` in React components and event handlers (e.g., in `handleSubmit` of `RegisterForm`) to verify function calls and inspect form data before API calls.
- **Backend:**
  - Used `console.log()` in Express route handlers and middleware (e.g., in `requestLogger`) to trace incoming requests, payloads, and server-side logic flow.

---

## 2. Error Boundaries and Error Handling

- **Frontend:**
  - Caught errors in async functions (e.g., `try/catch` in form submissions) and displayed user-friendly error messages in the UI.
- **Backend:**
  - Used Express error-handling middleware to catch and log errors, and to send appropriate HTTP error responses.

---

## 3. API Response Inspection

- Used browser DevTools (Network tab) to inspect API requests and responses, verifying correct HTTP methods, endpoints, and payloads.
- Checked for 404/500 errors and traced them back to missing or misconfigured routes.

---

## 4. Test-Driven Debugging

- Wrote and ran unit, integration, and E2E tests to catch regressions and edge cases.
- Used failing tests as a starting point to identify and fix bugs in both frontend and backend code.

---

## 5. Mocking and Isolation

- **Frontend:**
  - Used MSW (Mock Service Worker) to mock API responses, allowing for isolated debugging of UI logic without relying on backend availability.
- **Backend:**
  - Used `mongodb-memory-server` to run tests against an in-memory database, ensuring a clean state and making it easier to debug database-related issues.

---

## 6. Linting and Static Analysis

- Used ESLint to catch syntax errors, unused variables, and potential bugs before running the code.
- Fixed ESLint errors and warnings as part of the debugging process.

---

## 7. Step-by-Step Troubleshooting

- When encountering persistent errors (e.g., the `allowedHosts` dev server error), followed a systematic approach:
  - Checked and edited configuration files.
  - Cleared caches and reinstalled dependencies.
  - Restarted development servers and terminals.
  - Searched for and removed invalid config options.

---

## 8. Browser DevTools

- Used the Console tab to check for JavaScript errors and stack traces.
- Used the Elements tab to inspect rendered DOM and verify component output.
- Used the Network tab to monitor API calls and debug CORS or proxy issues.

---

## 9. Code Comments and Documentation

- Added comments in code to clarify logic and mark areas under investigation.
- Documented debugging steps and solutions for recurring issues (e.g., in `TESTING_STRATEGY.md` or project README).

---

## 10. Hot Reload and Manual Refresh

- Leveraged React’s hot reload to see changes instantly.
- Performed hard refreshes (Ctrl+Shift+R) to clear browser cache and ensure the latest code is loaded.

---

**These techniques, combined with a strong test suite, helped quickly identify, isolate, and resolve bugs throughout the development process.**
