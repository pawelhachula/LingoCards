const fs = require('fs');

(async () => {
  try {
    let content = fs.readFileSync('./src/components/AdminPanel.jsx', 'utf-8');

    // 1. Dodanie importów Firestore
    if (!content.includes('collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, writeBatch')) {
      content = content.replace(
        `import { auth, db, isFirebaseConfigured } from "../firebase";`,
        `import { auth, db, isFirebaseConfigured } from "../firebase";\nimport { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, writeBatch } from "firebase/firestore";`
      );
    }

    // 2. Dodanie stanów
    const newStates = `  // Tabs state
  const [activeTab, setActiveTab] = useState("users");
  
  // Notifications state
  const [adminNotifications, setAdminNotifications] = useState([]);
  
  useEffect(() => {
    if (!isFirebaseConfigured || !db) return;
    const q = query(collection(db, "admin_notifications"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = [];
      snapshot.forEach((docSnap) => {
        notifs.push({ id: docSnap.id, ...docSnap.data() });
      });
      setAdminNotifications(notifs);
    });
    return () => unsubscribe();
  }, []);

  const markNotificationAsRead = async (id) => {
    try {
      const notifRef = doc(db, "admin_notifications", id);
      await updateDoc(notifRef, { isRead: true });
    } catch (e) {
      showToast("Błąd oznaczania jako przeczytane", "error");
    }
  };

  const deleteNotification = async (id) => {
    try {
      const notifRef = doc(db, "admin_notifications", id);
      await deleteDoc(notifRef);
    } catch (e) {
      showToast("Błąd usuwania powiadomienia", "error");
    }
  };
  
  const markAllAsRead = async () => {
    try {
      const batch = writeBatch(db);
      adminNotifications.filter(n => !n.isRead).forEach(n => {
        batch.update(doc(db, "admin_notifications", n.id), { isRead: true });
      });
      await batch.commit();
      showToast("Wszystkie oznaczono jako przeczytane", "success");
    } catch (e) {
      showToast("Błąd", "error");
    }
  };
  
  const deleteAllNotifications = async () => {
    try {
      const batch = writeBatch(db);
      adminNotifications.forEach(n => {
        batch.delete(doc(db, "admin_notifications", n.id));
      });
      await batch.commit();
      showToast("Lista powiadomień została wyczyszczona", "success");
    } catch (e) {
      showToast("Błąd usuwania", "error");
    }
  };
  `;

    if (!content.includes('const [activeTab, setActiveTab] = useState("users");')) {
      content = content.replace(
        `const [toast, setToast] = useState(null);`,
        `const [toast, setToast] = useState(null);\n\n${newStates}`
      );
    }

    // 3. Dodanie Tabs Navigation na górze panelu (linia: return <div className="p-8">... )
    const tabsJSX = `        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setActiveTab("users")}
            className={\`px-6 py-3 rounded-xl font-extrabold text-sm transition-all \${activeTab === "users" ? "bg-[var(--primary)] text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]" : "bg-[var(--bg-input)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"}\`}
          >
            Zarządzanie Użytkownikami
          </button>
          <button 
            onClick={() => setActiveTab("notifications")}
            className={\`px-6 py-3 rounded-xl font-extrabold text-sm transition-all relative \${activeTab === "notifications" ? "bg-[var(--primary)] text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]" : "bg-[var(--bg-input)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"}\`}
          >
            Powiadomienia o Rejestracji
            {adminNotifications.filter(n => !n.isRead).length > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-black shadow-lg animate-pulse">
                {adminNotifications.filter(n => !n.isRead).length}
              </span>
            )}
          </button>
        </div>
`;

    // Wrap the existing main content in `{activeTab === "users" && ( ... )}`
    // Then add `{activeTab === "notifications" && ( ... )}` below it.
    
    // Zastąpmy nagłówek (Filters Header) dodając nad nim zakładki, a potem cały blok otoczymy w `activeTab === 'users'`.
    // Z uwagi na złożoność kodu JSX, wstrzykniemy nawigację pod głównym H1 i owiniemy całą resztę (aż do okien modalnych).

    // Let's find: `<h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 uppercase tracking-widest drop-shadow-sm mb-2">`
    // And close the div correctly. Actually it's easier to replace specific large chunks.
    
    // Szukamy początku sekcji statystyk/filtrów: `        {/* Top Summary Cards */}`
    const topSummaryAnchor = `        {/* Top Summary Cards */}`;
    if (!content.includes('Zarządzanie Użytkownikami') && content.includes(topSummaryAnchor)) {
      content = content.replace(topSummaryAnchor, `${tabsJSX}\n\n        {activeTab === "users" && (\n        <>\n${topSummaryAnchor}`);
      
      // Teraz szukamy końca głównej zawartości, np przed `{/* Message Modal */}`
      const modalAnchor = `        {/* Message Modal */}`;
      
      const notificationsTabJSX = `        </>\n        )}\n\n        {activeTab === "notifications" && (
          <div className="glass-card p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-white uppercase">Nowo Zarejestrowani</h2>
              <div className="flex gap-3">
                <button onClick={markAllAsRead} className="px-4 py-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg text-xs font-bold transition-colors">
                  Oznacz wszystkie jako przeczytane
                </button>
                <button onClick={deleteAllNotifications} className="px-4 py-2 bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 rounded-lg text-xs font-bold transition-colors flex items-center gap-2">
                  <Icons.Trash2 size={14} /> Wyczyść historię
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              {adminNotifications.length === 0 ? (
                <div className="text-center py-12 text-[var(--text-secondary)] font-bold">Brak powiadomień</div>
              ) : (
                adminNotifications.map(notif => (
                  <div key={notif.id} className={\`p-4 rounded-xl border flex items-center justify-between transition-colors \${notif.isRead ? 'bg-[var(--bg-input)]/50 border-[var(--border-light)]/50' : 'bg-indigo-500/10 border-indigo-500/30'}\`}>
                    <div className="flex items-center gap-4">
                      <div className={\`p-3 rounded-full \${notif.isRead ? 'bg-slate-500/20 text-slate-400' : 'bg-indigo-500/20 text-indigo-400'}\`}>
                        <Icons.UserPlus size={20} />
                      </div>
                      <div>
                        <p className={\`font-extrabold \${notif.isRead ? 'text-[var(--text-secondary)]' : 'text-white'}\`}>Nowy uczeń zarejestrowany!</p>
                        <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium">Email: <span className="text-white">{notif.email}</span> • Nazwa: <span className="text-white">{notif.username}</span></p>
                        <p className="text-[10px] text-slate-500 mt-1">{notif.createdAt?.toDate ? notif.createdAt.toDate().toLocaleString('pl-PL') : 'Przed chwilą'}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!notif.isRead && (
                        <button onClick={() => markNotificationAsRead(notif.id)} className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40 transition-colors" title="Oznacz jako przeczytane">
                          <Icons.Check size={16} />
                        </button>
                      )}
                      <button onClick={() => deleteNotification(notif.id)} className="p-2 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/40 transition-colors" title="Usuń trwale">
                        <Icons.Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}\n\n`;

      content = content.replace(modalAnchor, `${notificationsTabJSX}\n${modalAnchor}`);
    }

    fs.writeFileSync('./src/components/AdminPanel.jsx', content, 'utf-8');
    console.log('AdminPanel.jsx zaktualizowany pomyślnie.');
  } catch (e) {
    console.error(e);
  }
})();
