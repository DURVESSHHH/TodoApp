# React Todo App — Assignment

A complete React.js application demonstrating core concepts for the assignment.

## 🚀 How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# Opens at http://localhost:3000
```

## 📁 Project Structure

```
src/
├── index.js                  # Entry point — ReactDOM.createRoot
├── index.css                 # Full stylesheet (dark + light theme)
├── App.jsx                   # Root — ThemeContext.Provider
├── TodoApp.jsx               # useReducer + TodoContext.Provider
├── hooks/
│   └── useLocalInput.js      # Custom hook — reusable input state
└── components/
    ├── AddTaskForm.jsx        # useContext, useCallback, useRef
    ├── TaskItem.jsx           # useContext, conditional rendering
    ├── FilterBar.jsx          # useContext, filter/sort dispatch
    └── StatsBar.jsx           # Props-based display component
```

## ⚛️ React Concepts Demonstrated

| Concept | Where |
|---|---|
| `useState` | Priority/category selectors, theme toggle |
| `useReducer` | Entire todo state machine in `TodoApp.jsx` |
| `useContext` | `TodoContext` consumed in all child components |
| `useMemo` | Filtered + sorted task list |
| `useCallback` | Stable `handleAdd` reference in `AddTaskForm` |
| `useRef` | Input auto-focus after adding a task |
| `createContext` | `TodoContext` and `ThemeContext` |
| Custom Hook | `useLocalInput` — reusable controlled input |
| Immutability | All reducer cases use spread operator |
| List rendering | `filteredTodos.map()` with `key={todo.id}` |
| Conditional rendering | Empty state, done count, priority badges |

## ✅ Features

- Add tasks with priority (High/Medium/Low) and category
- Mark tasks as complete / incomplete  
- Delete individual tasks
- Filter by: All / Active / Done
- Sort by: Newest / Priority
- Clear all completed tasks
- Live stats: total, active, done, progress %
- Dark / Light theme toggle
- Enter key to submit
- Responsive design (mobile-friendly)
