// ═══════════════════════════════════════════════════════════
//  TodoApp.jsx — State Machine & Context Provider
//  Concepts: useReducer, createContext, Context.Provider,
//            useMemo, immutable state updates
// ═══════════════════════════════════════════════════════════

import React, { useReducer, createContext, useMemo } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskItem from './components/TaskItem';
import FilterBar from './components/FilterBar';
import StatsBar from './components/StatsBar';

// ── CONTEXT ──────────────────────────────────────────────
// Export so any child can import and consume it
export const TodoContext = createContext();

// ── INITIAL STATE ────────────────────────────────────────
const initialState = {
  todos: [
    { id: 1, text: 'Understand React component lifecycle', done: true,  priority: 'high',   category: 'Study',    created: Date.now() - 9000000 },
    { id: 2, text: 'Build a Todo app with Hooks',          done: false, priority: 'high',   category: 'Project',  created: Date.now() - 3000000 },
    { id: 3, text: 'Learn Context API and useReducer',     done: false, priority: 'medium', category: 'Study',    created: Date.now() - 1000000 },
    { id: 4, text: 'Practice writing custom hooks',        done: false, priority: 'low',    category: 'Practice', created: Date.now() - 500000  },
  ],
  filter: 'all',    // 'all' | 'active' | 'done'
  sort: 'newest',   // 'newest' | 'priority'
};

// ── REDUCER ──────────────────────────────────────────────
// Pure function: (currentState, action) => newState
// NEVER mutates state — always returns a new object
function todoReducer(state, action) {
  switch (action.type) {

    case 'ADD':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.text,
            done: false,
            priority: action.priority,
            category: action.category,
            created: Date.now(),
          },
        ],
      };

    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.id ? { ...t, done: !t.done } : t
        ),
      };

    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.id),
      };

    case 'SET_FILTER':
      return { ...state, filter: action.filter };

    case 'SET_SORT':
      return { ...state, sort: action.sort };

    case 'CLEAR_DONE':
      return { ...state, todos: state.todos.filter(t => !t.done) };

    default:
      return state;
  }
}

// ── COMPONENT ────────────────────────────────────────────
export default function TodoApp() {
  // useReducer: perfect for complex state with many action types
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // useMemo: only recomputes filtered/sorted list when dependencies change
  // Without useMemo, this would run on EVERY render
  const filteredTodos = useMemo(() => {
    let list = state.todos;

    // Apply filter
    if (state.filter === 'active') list = list.filter(t => !t.done);
    if (state.filter === 'done')   list = list.filter(t =>  t.done);

    // Apply sort
    if (state.sort === 'priority') {
      const order = { high: 0, medium: 1, low: 2 };
      list = [...list].sort((a, b) => order[a.priority] - order[b.priority]);
    } else {
      list = [...list].sort((a, b) => b.created - a.created);
    }

    return list;
  }, [state.todos, state.filter, state.sort]);

  const doneCount = state.todos.filter(t => t.done).length;

  return (
    // Provide { state, dispatch } to all descendants — no prop drilling!
    <TodoContext.Provider value={{ state, dispatch }}>
      <div className="todo-app">

        {/* Context bar — shows that Context API is active */}
        <div className="ctx-bar">
          <span className="ctx-icon">⬡</span>
          <span>
            <strong>TodoContext</strong> active — state & dispatch available to all
            child components without prop drilling
          </span>
        </div>

        {/* Add new task */}
        <AddTaskForm />

        {/* Stats summary */}
        <StatsBar todos={state.todos} />

        {/* Filter & sort controls */}
        <FilterBar />

        {/* Task list */}
        <ul className="task-list">
          {filteredTodos.length === 0 ? (
            <li className="empty-state">
              <span className="empty-icon">📭</span>
              <p>No tasks here. Add one above!</p>
            </li>
          ) : (
            filteredTodos.map(todo => (
              // key prop: stable unique ID, never use array index
              <TaskItem key={todo.id} todo={todo} />
            ))
          )}
        </ul>

        {/* Clear completed */}
        {doneCount > 0 && (
          <div className="clear-row">
            <button
              className="btn-clear"
              onClick={() => dispatch({ type: 'CLEAR_DONE' })}
            >
              Clear {doneCount} completed task{doneCount > 1 ? 's' : ''}
            </button>
          </div>
        )}

      </div>
    </TodoContext.Provider>
  );
}
