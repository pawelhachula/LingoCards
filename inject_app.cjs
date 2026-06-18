const fs = require('fs');

(async () => {
  try {
    let content = fs.readFileSync('./src/App.jsx', 'utf-8');
    
    // Add state variable
    const stateHookStr = `  const [unlockedThemeToast, setUnlockedThemeToast] = useState("");`;
    const adminStateHookStr = `  const [adminNotificationToast, setAdminNotificationToast] = useState(null);\n  const [adminNotificationUser, setAdminNotificationUser] = useState("");`;
    
    if (!content.includes('adminNotificationToast')) {
        content = content.replace(stateHookStr, `${stateHookStr}\n${adminStateHookStr}`);
    }

    // Add useEffect
    const useEffectAnchor = `  // Periodically update lastActiveAt timestamp in Firestore (every 60 seconds)`;
    const adminEffectStr = `  // Listen for admin notifications
  useEffect(() => {
    if (currentUser?.role === "admin" && isFirebaseConfigured && db) {
      let unsubscribeSnapshot;
      let initialLoad = true;
      
      import("firebase/firestore").then(({ collection, query, where, onSnapshot }) => {
        const q = query(collection(db, "admin_notifications"), where("isRead", "==", false));
        unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added" && !initialLoad) {
              const data = change.doc.data();
              setAdminNotificationUser(data.email || data.username);
              setAdminNotificationToast(true);
              setTimeout(() => setAdminNotificationToast(false), 8000);
            }
          });
          initialLoad = false;
        });
      }).catch(e => console.error("Error loading firestore for admin listener:", e));
      
      return () => {
        if (unsubscribeSnapshot) unsubscribeSnapshot();
      };
    }
  }, [currentUser]);\n\n`;

    if (!content.includes('Listen for admin notifications')) {
        content = content.replace(useEffectAnchor, adminEffectStr + useEffectAnchor);
    }

    // Add JSX toast
    const toastAnchor = `{/* Toast notification for unlocked theme */}`;
    const adminToastStr = `      {/* Toast notification for new user registration (Admin) */}
      {adminNotificationToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-black text-xs px-6 py-4.5 rounded-2xl border border-blue-400/30 shadow-[0_0_25px_rgba(59,130,246,0.4)] flex items-center gap-3 animate-bounce cursor-pointer" onClick={() => setView("admin")}>
          <Icons.UserPlus size={18} className="text-yellow-300 animate-pulse" />
          <div className="flex flex-col">
            <span className="font-bold text-[10px] text-blue-100 uppercase tracking-widest leading-none">Nowy użytkownik! 🎉</span>
            <span className="text-sm font-extrabold mt-1 text-white">{adminNotificationUser}</span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); setAdminNotificationToast(false); }} className="text-blue-200 hover:text-white ml-2 transition-colors">
            <Icons.X size={14} />
          </button>
        </div>
      )}\n\n      `;

    if (!content.includes('Toast notification for new user registration')) {
        content = content.replace(toastAnchor, adminToastStr + toastAnchor);
    }

    fs.writeFileSync('./src/App.jsx', content, 'utf-8');
    console.log('App.jsx zaktualizowany pomyślnie.');
  } catch (e) {
    console.error(e);
  }
})();
