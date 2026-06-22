// ═══════════════════════════════════════════════════════════
//  useLocalInput.js — Custom Hook
//  Concept: Custom Hooks — reusable stateful logic
//
//  Rules of Custom Hooks:
//  ✅ Name MUST start with "use"
//  ✅ Can call other hooks inside
//  ✅ Encapsulates logic, not UI
// ═══════════════════════════════════════════════════════════

import { useState } from 'react';

/**
 * useLocalInput — manages a single controlled input field
 *
 * @param {string} initial - initial value (default: "")
 * @returns {[string, Function, Object]} [value, reset, bindProps]
 *
 * Usage:
 *   const [text, resetText, bindText] = useLocalInput('');
 *   <input {...bindText} />          // spreads value + onChange
 *   resetText();                     // clears the field
 */
function useLocalInput(initial = '') {
  const [value, setValue] = useState(initial);

  // Reset to empty string (call after form submit)
  const reset = () => setValue('');

  // Spread onto <input> — provides value and onChange handler
  const bind = {
    value,
    onChange: (e) => setValue(e.target.value),
  };

  return [value, reset, bind];
}

export default useLocalInput;
