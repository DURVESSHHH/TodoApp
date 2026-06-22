// ═══════════════════════════════════════════════════════════
//  TaskItem.jsx — Single Task Component
//  Concepts: useContext, conditional rendering, event handling
// ═══════════════════════════════════════════════════════════

import React, { useContext } from 'react';
import { TodoContext } from '../TodoApp';

// Priority → display config map
const PRIORITY_CONFIG = {
  high:   { label: 'High',   className: 'prio-high'   },
  medium: { label: 'Medium', className: 'prio-medium' },
  low:    { label: 'Low',    className: 'prio-low'    },
};

export default function TaskItem({ todo }) {
  // Consume dispatch from context — no prop drilling needed
  const { dispatch } = useContext(TodoContext);

  const prio = PRIORITY_CONFIG[todo.priority] || PRIORITY_CONFIG.medium;

  return (
    <li className={`task-item ${todo.done ? 'task-done' : ''}`}>

      {/* Toggle complete button */}
      <button
        className={`check-btn ${todo.done ? 'checked' : ''}`}
        onClick={() => dispatch({ type: 'TOGGLE', id: todo.id })}
        title={todo.done ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.done ? '✓' : ''}
      </button>

      {/* Task text — strikethrough when done */}
      <span className={`task-text ${todo.done ? 'strikethrough' : ''}`}>
        {todo.text}
      </span>

      {/* Metadata badges */}
      <div className="task-meta">
        <span className={`priority-badge ${prio.className}`}>
          {prio.label}
        </span>
        <span className="category-tag">{todo.category}</span>

        {/* Delete button */}
        <button
          className="delete-btn"
          onClick={() => dispatch({ type: 'DELETE', id: todo.id })}
          title="Delete task"
        >
          ✕
        </button>
      </div>

    </li>
  );
}
