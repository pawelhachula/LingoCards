const fs = require('fs');

const files = [
  'src/components/Creator.jsx',
  'src/components/StatsView.jsx',
  'src/components/Dashboard.jsx',
  'src/components/Flashcards.jsx',
  'src/components/PremiumModal.jsx',
  'src/App.jsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let code = fs.readFileSync(file, 'utf8');

  // Replace bg-black/XX and bg-black/X with bg-[var(--bg-input)]
  code = code.replace(/bg-black\/(5|10|20|25|30|35|40|45)/g, 'bg-[var(--bg-input)]');
  
  // Replace border-white/XX with border-[var(--border-light)]
  code = code.replace(/border-white\/(5|8|10)/g, 'border-[var(--border-light)]');

  // Replace text-slate-XXX with text-[var(--text-secondary)]
  code = code.replace(/text-slate-(400|500)/g, 'text-[var(--text-secondary)]');
  code = code.replace(/text-slate-(300|200|100)/g, 'text-[var(--text-primary)]');
  
  // Tab active states in Creator.jsx (indigo)
  code = code.replace(/bg-indigo-500\/10 text-indigo-300 border border-indigo-500\/25/g, 'bg-[var(--primary-glow)] text-[var(--text-primary)] border border-[var(--border-active)]');
  code = code.replace(/text-indigo-400/g, 'text-[var(--primary)]');
  
  // Input focuses in Creator
  code = code.replace(/focus:border-indigo-500\/60/g, 'focus:border-[var(--primary)]');
  code = code.replace(/focus:border-indigo-500/g, 'focus:border-[var(--primary)]');

  fs.writeFileSync(file, code);
  console.log('Updated ' + file);
});
