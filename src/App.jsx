// ═══════════════════════════════════════════════════════════
//  App.jsx — Root Component
//  Concepts: createContext, Context.Provider, useState
// ═══════════════════════════════════════════════════════════

import React, { createContext, useState } from 'react';
import TodoApp from './TodoApp';

// 1️⃣ CREATE the context — available to the whole app
export const ThemeContext = createContext();

export default function App() {
  // Theme state lives here — highest component that needs it
  const [theme, setTheme] = useState('dark');

  return (
    // 2️⃣ PROVIDE context value to all descendants
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`app theme-${theme}`}>

        {/* ── Header ─────────────────────────────── */}
        <header className="app-header">
          <div className="header-left">
            <span className="react-logo">⚛</span>
            <div>
              <h1 className="app-title">React Todo App</h1>
              <p className="app-sub">Assignment — Hooks · Context · useReducer</p>
            </div>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
          </button>
        </header>

        {/* ── Main Content ───────────────────────── */}
        <main className="app-main">
          <TodoApp />
        </main>

        {/* ── Footer ─────────────────────────────── */}
        <footer className="app-footer">
          <p>Built with React 18 · useState · useReducer · useContext · useMemo · useCallback · useRef · Custom Hooks</p>
        </footer>

      </div>
    </ThemeContext.Provider>
  );
}
