# React + TypeScript + Vite

## About this Project
  I queried some generative AI and asked it to provide me with checklist to achieve an MVP. This is what it gave me. Eventual goal is to have completed all of these items.

 1. Core Features
  [x] Home Page
    [x] App title and brief description
    [x] “Start Quiz” button
  [x] Question Interface
    [x] Display one question at a time
    [x] Multiple choice answers (radio buttons or buttons)
    [x] “Next” button (disabled until an answer is selected)
    [x] Question counter (e.g. “Question 3 of 10”)
  [x] Score Tracking
    [x] Track correct/incorrect answers
    [x] Calculate final score
    [x] Store results in state
  [x] Results Page
    [x] Final score summary
    [x] Percentage or letter grade
    [x] Option to restart quiz

 2. Data Handling
  [x] Use local JSON or external API for question/answer data
  [x] Shuffle questions and/or answers
  [x] Support multiple question types (optional):
    [x] Multiple choice
    [x] True/False
    [ ] Fill-in-the-blank (stretch goal)

 3. UI/UX
  [x] Mobile-first responsive layout
  [x] Progress indicator (e.g., progress bar)
  [x] Visual feedback on answer selection (e.g., highlight rrect/wrong)
  [x] Loading state (if fetching data)
  [x] Transition animations between questions (optional)

 4. State Management
  [x] Use useState and useEffect for managing:
    [x] Current question index
    [x] Selected answer
    [x] Score
    [x] Quiz completion status

 5. Bonus Features (Optional but Impressive)
  [x] Categories/Difficulty selection
  [ ] Timer for each question
  [ ] Leaderboard (localStorage or backend)
  [ ] User authentication (e.g., with Firebase)
  [ ] Dark mode toggle
  [ ] Accessibility (keyboard nav, ARIA labels)

 6. Tech Stack Highlights
  [x] React components for each screen (Home, Quiz, Result)
  [x] CSS Modules, Tailwind, or styled-components for styling
  [x] JavaScript logic for scoring and transitions
  [x] Optional: TypeScript for type safety
