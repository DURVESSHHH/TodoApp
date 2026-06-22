// ═══════════════════════════════════════════════════════════
//  AddTaskForm.jsx — Add New Task
//  Concepts: useContext, useCallback, useRef, Custom Hook
// ═══════════════════════════════════════════════════════════

import React, { useState, useContext, useCallback, useRef } from 'react';
import { TodoContext } from '../TodoApp';
import useLocalInput from '../hooks/useLocalInput';

export default function AddTaskForm() {
  // 3️⃣ CONSUME context — no need for props!
  const { dispatch } = useContext(TodoContext);

  // Custom hook handles text input state + reset + bind
  const [text, resetText, bindText] = useLocalInput('');

  // Local state for selects (simple enough for useState)
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('Study');

  // useRef: access the DOM input directly without causing re-renders
  const inputRef = useRef(null);

  // useCallback: keeps handleAdd reference stable across renders
  // Only recreated when its dependencies change
  const handleAdd = useCallback(() => {
    if (!text.trim()) return; // guard: no empty tasks

    // Dispatch ADD action to the reducer
    dispatch({
      type: 'ADD',
      text: text.trim(),
      priority,
      category,
    });

    resetText();                    // clear the input via custom hook
    inputRef.current?.focus();      // refocus input using useRef
  }, [text, priority, category, dispatch]);

  // Allow Enter key to submit
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="add-form">
      <div className="add-form-row">
        {/* Controlled input — {...bindText} spreads value + onChange */}
        <input
          ref={inputRef}
          className="task-input"
          placeholder="What do you need to do?"
          {...bindText}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="add-form-row add-form-controls">
        {/* Priority selector */}
        <select
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">🔴 High Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="low">🟢 Low Priority</option>
        </select>

        {/* Category selector */}
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Study</option>
          <option>Project</option>
          <option>Practice</option>
          <option>Other</option>
        </select>

        {/* Submit button — disabled if input is empty */}
        <button
          className="btn-add"
          onClick={handleAdd}
          disabled={!text.trim()}
        >
          + Add Task
        </button>
      </div>
    </div>
  );
}
