// ═══════════════════════════════════════════════════════════
//  StatsBar.jsx — Task Statistics Display
//  Concepts: Props, derived state, conditional rendering
//  Note: This is a "pure" display component — receives data
//        via props and renders it. No context needed here.
// ═══════════════════════════════════════════════════════════

import React from 'react';

export default function StatsBar({ todos }) {
  // Derived values — computed from props, not stored in state
  const total     = todos.length;
  const done      = todos.filter(t => t.done).length;
  const active    = total - done;
  const progress  = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="stats-bar">
      <div className="stat-card">
        <span className="stat-num">{total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-card stat-active">
        <span className="stat-num">{active}</span>
        <span className="stat-label">Active</span>
      </div>
      <div className="stat-card stat-done">
        <span className="stat-num">{done}</span>
        <span className="stat-label">Done</span>
      </div>
      <div className="stat-card stat-progress">
        <span className="stat-num">{progress}%</span>
        <span className="stat-label">Progress</span>
        {/* Progress bar */}
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
