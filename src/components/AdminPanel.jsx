import React, { useState, useEffect, useMemo } from "react";
import * as Icons from "lucide-react";
import { auth, db, isFirebaseConfigured } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function AdminPanel({ loadAllUsers, updateUserField, sendSystemNotification, currentUser, systemConfig, updateSystemConfig }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  
  // Message Modal state
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageTitle, setMessageTitle] = useState("Wiadomość od administratora");
  const [messageText, setMessageText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  
  // Password Reset state
  const [resettingUid, setResettingUid] = useState(null);
  
  // Feedback toast state
  const [toast, setToast] = useState(null);

  // Time tracker for live status update
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 15000); // refresh time every 15s to keep it accurate
    return () => clearInterval(timer);
  }, []);

  // Fetch users on mount
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const allUsers = await loadAllUsers();
      setUsers(allUsers);
    } catch (e) {
      showToast("Nie udało się pobrać listy użytkowników: " + e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [loadAllUsers]);

  // Utility to show feedback toasts
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Helper to determine active status in last 3 days
  const getIsActiveRecently = (lastActiveDateStr) => {
    if (!lastActiveDateStr) return false;
    try {
      const parts = lastActiveDateStr.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const date = new Date(year, month, day);
        const diffTime = Math.abs(new Date() - date);
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays <= 3;
      }
    } catch (e) {
      // fallback
    }
    return false;
  };

  // Helper to determine if a user is online right now (active in last 3 minutes)
  const getIsUserOnline = (user) => {
    if (!user) return false;
    if (user.lastActiveAt) {
      const diffMs = now - user.lastActiveAt;
      return diffMs <= 180000; // 3 minuty
    }
    return false;
  };

  // Computations for KPI dashboard stats
  const kpis = useMemo(() => {
    const total = users.length;
    const active = users.filter(u => getIsActiveRecently(u.lastActiveDate)).length;
    const online = users.filter(u => getIsUserOnline(u)).length;
    const blocked = users.filter(u => u.status === "blocked").length;
    const pro = users.filter(u => u.isPro).length;
    return { total, active, online, blocked, pro };
  }, [users, now]);

  // Filter & Sort logic
  const filteredUsers = useMemo(() => {
    let result = [...users];

    // Search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        u => 
          (u.username && u.username.toLowerCase().includes(q)) || 
          (u.email && u.email.toLowerCase().includes(q))
      );
    }

    // Role filter
    if (roleFilter !== "all") {
      result = result.filter(u => u.role === roleFilter);
    }

    // Plan filter
    if (planFilter !== "all") {
      const targetPro = planFilter === "pro";
      result = result.filter(u => !!u.isPro === targetPro);
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter(u => (u.status || "active") === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return (b.createdAt || 0) - (a.createdAt || 0);
      }
      if (sortBy === "oldest") {
        return (a.createdAt || 0) - (b.createdAt || 0);
      }
      if (sortBy === "level") {
        return (b.level || 0) - (a.level || 0);
      }
      if (sortBy === "xp") {
        return (b.xp || 0) - (a.xp || 0);
      }
      return 0;
    });

    return result;
  }, [users, searchQuery, roleFilter, planFilter, statusFilter, sortBy]);

  // Handlers
  const handleToggleBlock = async (user) => {
    const isSelf = user.uid === currentUser?.uid || user.email === currentUser?.email;
    if (isSelf) {
      showToast("Nie możesz zablokować własnego konta administratora!", "error");
      return;
    }

    const currentStatus = user.status || "active";
    const newStatus = currentStatus === "blocked" ? "active" : "blocked";
    
    try {
      await updateUserField(user.uid, { status: newStatus });
      setUsers(prev => prev.map(u => u.uid === user.uid ? { ...u, status: newStatus } : u));
      showToast(
        newStatus === "blocked" 
          ? `Konto użytkownika ${user.username || "User"} zostało zablokowane.` 
          : `Konto użytkownika ${user.username || "User"} zostało odblokowane.`,
        "success"
      );
    } catch (e) {
      showToast("Błąd aktualizacji statusu: " + e.message, "error");
    }
  };

  const handleTogglePro = async (user) => {
    const newPro = !user.isPro;
    try {
      // 1. Update root user meta record
      await updateUserField(user.uid, { isPro: newPro });
      
      // 2. Update subcollection document users/{uid}/data/stats
      if (isFirebaseConfigured && db) {
        const { doc, setDoc } = await import("firebase/firestore");
        await setDoc(doc(db, "users", user.uid, "data", "stats"), { isPro: newPro }, { merge: true });
      }

      setUsers(prev => prev.map(u => u.uid === user.uid ? { ...u, isPro: newPro } : u));
      showToast(
        newPro 
          ? `Użytkownik ${user.username || "User"} otrzymał status Premium PRO.` 
          : `Cofnięto status Premium PRO użytkownikowi ${user.username || "User"}.`,
        "success"
      );
    } catch (e) {
      showToast("Błąd aktualizacji planu: " + e.message, "error");
    }
  };

  const handleToggleRole = async (user) => {
    const isSelf = user.uid === currentUser?.uid || user.email === currentUser?.email;
    if (isSelf) {
      showToast("Nie możesz zmienić własnej roli administratora!", "error");
      return;
    }

    const currentRole = user.role || "user";
    const newRole = currentRole === "admin" ? "user" : "admin";

    try {
      await updateUserField(user.uid, { role: newRole });
      setUsers(prev => prev.map(u => u.uid === user.uid ? { ...u, role: newRole } : u));
      showToast(`Rola użytkownika ${user.username || "User"} została zmieniona na ${newRole === "admin" ? "Administrator" : "Użytkownik"}.`, "success");
    } catch (e) {
      showToast("Błąd aktualizacji roli: " + e.message, "error");
    }
  };

  const handleSendResetPassword = async (user) => {
    if (!user.email) {
      showToast("Użytkownik nie posiada przypisanego adresu e-mail!", "error");
      return;
    }

    setResettingUid(user.uid);
    try {
      if (isFirebaseConfigured && auth) {
        await sendPasswordResetEmail(auth, user.email);
        showToast(`Wiadomość z resetem hasła została wysłana na adres: ${user.email}`, "success");
      } else {
        showToast("Firebase Auth jest niedostępny w trybie offline.", "error");
      }
    } catch (e) {
      showToast("Błąd wysyłania e-maila: " + e.message, "error");
    } finally {
      setResettingUid(null);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedUser) return;
    if (messageText.trim() === "") {
      showToast("Wiadomość nie może być pusta!", "error");
      return;
    }

    setSendingMessage(true);
    try {
      await sendSystemNotification(selectedUser.uid, {
        title: messageTitle.trim() !== "" ? messageTitle.trim() : "Wiadomość od administratora",
        message: messageText.trim()
      });
      showToast(`Powiadomienie zostało wysłane do ${selectedUser.username || "Użytkownika"}.`, "success");
      
      // Close modal & reset fields
      setSelectedUser(null);
      setMessageTitle("Wiadomość od administratora");
      setMessageText("");
    } catch (e) {
      showToast("Błąd wysyłania wiadomości: " + e.message, "error");
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-slide-in">
      
      {/* Toast Feedback message */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[200] p-4 rounded-xl shadow-2xl flex items-center gap-3 border animate-scale-up ${
          toast.type === "error" 
            ? "bg-rose-950/90 border-rose-500/30 text-rose-200" 
            : "bg-emerald-950/90 border-emerald-500/30 text-emerald-200"
        }`}>
          {toast.type === "error" ? (
            <Icons.AlertCircle className="w-5 h-5 text-rose-400" />
          ) : (
            <Icons.CheckCircle2 className="w-5 h-5 text-emerald-400" />
          )}
          <span className="text-sm font-bold">{toast.message}</span>
        </div>
      )}

      {/* Header Dashboard section */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block">Strefa Administratora</span>
          <h2 className="text-3xl font-extrabold mt-1 text-white">Panel Administracyjny</h2>
        </div>
        <div className="flex items-center gap-3.5">
          <label className="flex items-center gap-3 cursor-pointer select-none bg-white/5 border border-white/10 rounded-xl px-4 py-2 hover:bg-white/[0.07] transition-all">
            <span className="text-xs font-bold text-slate-300">Pokazuj boty w rankingu</span>
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={systemConfig?.showMocks !== false}
                onChange={(e) => updateSystemConfig({ ...systemConfig, showMocks: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-black/40 rounded-full peer peer-checked:bg-indigo-500/20 border border-white/10 transition-colors duration-200 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-slate-400 after:rounded-full after:h-3.5 after:w-3.5 after:transition-transform after:duration-200 peer-checked:after:translate-x-4 peer-checked:after:bg-indigo-400"></div>
            </div>
          </label>
          <button 
            onClick={fetchUsers} 
            disabled={loading}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all disabled:opacity-50"
            title="Odśwież dane"
          >
            <Icons.RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Total Users */}
        <div className="glass-card p-6 flex items-center justify-between relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500 pointer-events-none" />
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Wszyscy użytkownicy</span>
            <span className="text-3xl font-black text-white mt-1.5">{loading ? "..." : kpis.total}</span>
          </div>
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
            <Icons.Users size={24} />
          </div>
        </div>

        {/* Active Users (Online Now) */}
        <div className="glass-card p-6 flex items-center justify-between relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500 pointer-events-none" />
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Online teraz</span>
            <span className="text-3xl font-black text-white mt-1.5">{loading ? "..." : kpis.online}</span>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 relative">
            <Icons.Zap size={24} className={kpis.online > 0 ? "animate-pulse text-emerald-400" : "text-slate-500"} />
            {kpis.online > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            )}
          </div>
        </div>

        {/* PRO Users */}
        <div className="glass-card p-6 flex items-center justify-between relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500 pointer-events-none" />
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Premium PRO</span>
            <span className="text-3xl font-black text-white mt-1.5">{loading ? "..." : kpis.pro}</span>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
            <Icons.Award size={24} />
          </div>
        </div>

        {/* Blocked Users */}
        <div className="glass-card p-6 flex items-center justify-between relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all duration-500 pointer-events-none" />
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Zablokowani</span>
            <span className="text-3xl font-black text-white mt-1.5">{loading ? "..." : kpis.blocked}</span>
          </div>
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
            <Icons.Ban size={24} />
          </div>
        </div>
      </div>

      {/* Filters Area */}
      <div className="glass-card p-4 md:p-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Icons.Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Szukaj po nazwie użytkownika lub e-mail..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/50 transition-colors text-sm"
            />
          </div>

          {/* Quick Clear filters */}
          {(searchQuery || roleFilter !== "all" || planFilter !== "all" || statusFilter !== "all" || sortBy !== "newest") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setRoleFilter("all");
                setPlanFilter("all");
                setStatusFilter("all");
                setSortBy("newest");
              }}
              className="text-xs text-rose-400 hover:text-rose-300 font-bold transition-colors flex items-center gap-1.5 self-end md:self-center bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20"
            >
              <Icons.X size={14} /> Wyczyszcz filtry
            </button>
          )}
        </div>

        {/* Select Dropdowns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-white/5">
          {/* Role Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Rola</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-rose-500/50 transition-colors"
            >
              <option value="all" className="bg-[var(--bg-main)]">Wszyscy</option>
              <option value="user" className="bg-[var(--bg-main)]">Użytkownicy (User)</option>
              <option value="admin" className="bg-[var(--bg-main)]">Administratorzy (Admin)</option>
            </select>
          </div>

          {/* Plan Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Plan (Premium)</label>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-rose-500/50 transition-colors"
            >
              <option value="all" className="bg-[var(--bg-main)]">Wszyscy</option>
              <option value="free" className="bg-[var(--bg-main)]">Darmowy (FREE)</option>
              <option value="pro" className="bg-[var(--bg-main)]">Premium (PRO)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-rose-500/50 transition-colors"
            >
              <option value="all" className="bg-[var(--bg-main)]">Wszyscy</option>
              <option value="active" className="bg-[var(--bg-main)]">Aktywni</option>
              <option value="blocked" className="bg-[var(--bg-main)]">Zablokowani</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Sortowanie</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-rose-500/50 transition-colors"
            >
              <option value="newest" className="bg-[var(--bg-main)]">Najnowsi</option>
              <option value="oldest" className="bg-[var(--bg-main)]">Najstarsi</option>
              <option value="level" className="bg-[var(--bg-main)]">Poziom (od najwyższego)</option>
              <option value="xp" className="bg-[var(--bg-main)]">XP (od najwyższego)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table / List */}
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Icons.RefreshCw size={40} className="text-rose-400 animate-spin" />
            <span className="text-slate-400 text-sm font-bold">Wczytywanie użytkowników...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
            <Icons.Users size={48} className="text-slate-600" />
            <div>
              <h4 className="text-slate-300 font-bold">Nie znaleziono użytkowników</h4>
              <p className="text-slate-500 text-xs mt-1">Zmień filtry wyszukiwania, aby zobaczyć wyniki.</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                  <th className="py-4 px-6">Użytkownik</th>
                  <th className="py-4 px-4 hidden md:table-cell">Dołączył</th>
                  <th className="py-4 px-4 hidden lg:table-cell">Ostatnia aktywność</th>
                  <th className="py-4 px-4 text-center">Poziom / XP</th>
                  <th className="py-4 px-4 text-center">Plan</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-4 text-center">Rola</th>
                  <th className="py-4 px-6 text-right">Działania</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user) => {
                  const registrationDate = user.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString("pl-PL") 
                    : "brak danych";
                  
                  const isUserOnline = getIsUserOnline(user);
                  
                  const isSelf = user.uid === currentUser?.uid || user.email === currentUser?.email;

                  return (
                    <tr key={user.uid} className="hover:bg-white/[0.01] transition-colors group">
                      
                      {/* Avatar & Username/Email */}
                      <td className="py-4 px-6 flex items-center gap-3">
                        <div className="relative">
                          {user.avatar && user.avatar.startsWith("http") || (user.avatar && user.avatar.length > 5) ? (
                            <img src={user.avatar} alt={user.username} className="w-9 h-9 rounded-full object-cover border border-white/10" />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-sm border border-white/10">
                              {user.avatar || "👑"}
                            </div>
                          )}
                          <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[var(--bg-main)] ${
                            isUserOnline ? "bg-emerald-500 shadow-[0_0_10px_#10b981]" : "bg-rose-500"
                          }`} title={isUserOnline ? "Online (aktywny teraz)" : "Offline (nieobecny)"} />
                        </div>
                        <div className="flex flex-col max-w-[150px] md:max-w-xs overflow-hidden">
                          <span className="text-white text-sm font-bold truncate flex items-center gap-1.5">
                            {user.username || "Bezimienny"} 
                            {isSelf && (
                              <span className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 font-extrabold text-[8px] uppercase tracking-wider">Ty</span>
                            )}
                          </span>
                          <span className="text-slate-500 text-xs truncate">{user.email || "brak e-mail"}</span>
                        </div>
                      </td>

                      {/* Registration Date */}
                      <td className="py-4 px-4 hidden md:table-cell">
                        <span className="text-slate-400 text-xs font-medium">{registrationDate}</span>
                      </td>

                      {/* Last Active Date */}
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <span className={`text-xs font-medium ${isUserOnline ? "text-emerald-400 font-extrabold" : "text-slate-500"}`}>
                          {isUserOnline ? "Online teraz" : (user.lastActiveDate || "brak aktywności")}
                        </span>
                      </td>

                      {/* Level / XP */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center justify-center gap-0.5">
                          <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-black rounded">
                            Lvl {user.level || 1}
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold">{user.xp || 0} XP</span>
                        </div>
                      </td>

                      {/* PRO/FREE Plan */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleTogglePro(user)}
                          className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider transition-all border ${
                            user.isPro
                              ? "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
                              : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                          }`}
                          title="Kliknij, aby zmienić plan"
                        >
                          {user.isPro ? "PRO" : "FREE"}
                        </button>
                      </td>

                      {/* Active/Blocked Status */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleToggleBlock(user)}
                          disabled={isSelf}
                          className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider transition-all border ${
                            user.status === "blocked"
                              ? "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20 disabled:opacity-50"
                              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50"
                          }`}
                          title={isSelf ? "" : "Kliknij, aby zablokować/odblokować"}
                        >
                          {user.status === "blocked" ? "BLOCKED" : "ACTIVE"}
                        </button>
                      </td>

                      {/* Role */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleToggleRole(user)}
                          disabled={isSelf}
                          className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider transition-all border ${
                            user.role === "admin"
                              ? "bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20 disabled:opacity-50"
                              : "bg-slate-500/10 border-white/5 text-slate-400 hover:bg-slate-500/20 disabled:opacity-50"
                          }`}
                          title={isSelf ? "" : "Kliknij, aby zmienić rolę"}
                        >
                          {user.role === "admin" ? "ADMIN" : "USER"}
                        </button>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          {/* Send Notification Bell Button */}
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-indigo-500/20 hover:text-indigo-400 border border-white/10 hover:border-indigo-500/20 text-slate-400 transition-all"
                            title="Wyślij powiadomienie w aplikacji"
                          >
                            <Icons.MessageSquare size={14} />
                          </button>

                          {/* Send Password Reset Email */}
                          <button
                            onClick={() => handleSendResetPassword(user)}
                            disabled={resettingUid === user.uid}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-amber-500/20 hover:text-amber-400 border border-white/10 hover:border-amber-500/20 text-slate-400 transition-all disabled:opacity-50"
                            title="Wyślij e-mail z resetem hasła"
                          >
                            {resettingUid === user.uid ? (
                              <Icons.RefreshCw size={14} className="animate-spin" />
                            ) : (
                              <Icons.Key size={14} />
                            )}
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Message Modal overlay */}
      {selectedUser && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="glass-card w-full max-w-lg p-6 md:p-8 border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.15)] flex flex-col gap-6 animate-scale-up relative">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Icons.MessageSquare size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">Wyślij powiadomienie</h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Wyślij wiadomość do użytkownika <span className="text-indigo-400 font-bold">{selectedUser.username || "User"}</span>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedUser(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all"
              >
                <Icons.X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <div className="flex flex-col gap-4">
              {/* Title input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tytuł wiadomości</label>
                <input
                  type="text"
                  placeholder="Wiadomość od administratora"
                  value={messageTitle}
                  onChange={(e) => setMessageTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-rose-500/50 transition-colors text-sm"
                />
              </div>

              {/* Message Content Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Treść powiadomienia</label>
                <textarea
                  rows={4}
                  placeholder="Wpisz treść wiadomości, którą użytkownik zobaczy po kliknięciu w dzwonek powiadomień..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-rose-500/50 transition-colors text-sm resize-none"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedUser(null)}
                className="btn btn-secondary text-xs px-4 py-2.5"
              >
                Anuluj
              </button>
              <button
                onClick={handleSendMessage}
                disabled={sendingMessage || messageText.trim() === ""}
                className="btn btn-primary text-xs px-5 py-2.5 hover:scale-105 transition-transform"
              >
                {sendingMessage ? (
                  <>
                    <Icons.RefreshCw size={14} className="animate-spin" /> Wysyłanie...
                  </>
                ) : (
                  <>
                    <Icons.Check size={14} /> Wyślij wiadomość
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
