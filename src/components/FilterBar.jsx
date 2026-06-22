// ═══════════════════════════════════════════════════════════
//  FilterBar.jsx — Filter & Sort Controls
//  Concepts: useContext, event handling, conditional className
// ═══════════════════════════════════════════════════════════

import React, { useContext } from 'react';
import { TodoContext } from '../TodoApp';

const FILTERS = ['all', 'active', 'done'];

export default function FilterBar() {
  // Read state AND dispatch from context
  const { state, dispatch } = useContext(TodoContext);

  return (
    <div className="filter-bar">
      {/* Filter buttons */}
      <div className="filter-group">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-btn ${state.filter === f ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_FILTER', filter: f })}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Sort toggle */}
      <button
        className="sort-btn"
        onClick={() =>
          dispatch({
            type: 'SET_SORT',
            sort: state.sort === 'newest' ? 'priority' : 'newest',
          })
        }
      >
        {state.sort === 'newest' ? '↓ Newest' : '↑ Priority'}
      </button>
    </div>
  );
}
