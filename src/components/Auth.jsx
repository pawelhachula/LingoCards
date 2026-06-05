import React, { useState } from "react";
import * as Icons from "lucide-react";
import { signInWithGoogle, isFirebaseConfigured } from "../firebase";

export default function Auth({ onLogin }) {
  const [tab, setTab] = useState("login"); // 'login' | 'register'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🧙‍♂️");
  
  // Google Sign-In Mock states
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleName, setCustomGoogleName] = useState("");
  const [customGoogleEmail, setCustomGoogleEmail] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const avatarsList = ["🧙‍♂️", "👩‍🚀", "🦉", "🦊", "🕵️‍♂️", "🐼", "🤖", "🦄", "🦁", "🐨"];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username.trim() || !password.trim()) {
      setError("Nazwa użytkownika i hasło są wymagane.");
      return;
    }

    const usersStr = localStorage.getItem("lingocards_users");
    const users = usersStr ? JSON.parse(usersStr) : [];

    const foundUser = users.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase()
    );

    if (!foundUser || foundUser.password !== password) {
      setError("Niepoprawna nazwa użytkownika lub hasło.");
      return;
    }

    setSuccess("Zalogowano pomyślnie!");
    setTimeout(() => {
      onLogin(foundUser);
    }, 800);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username.trim() || !password.trim()) {
      setError("Wszystkie pola są wymagane.");
      return;
    }

    if (username.length < 3) {
      setError("Nazwa użytkownika musi mieć co najmniej 3 znaki.");
      return;
    }

    if (password.length < 4) {
      setError("Hasło musi mieć co najmniej 4 znaki.");
      return;
    }

    const usersStr = localStorage.getItem("lingocards_users");
    const users = usersStr ? JSON.parse(usersStr) : [];

    const userExists = users.some(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase()
    );

    if (userExists) {
      setError("Użytkownik o takiej nazwie już istnieje.");
      return;
    }

    const newUser = {
      username: username.trim(),
      password: password,
      avatar: selectedAvatar,
      registeredAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("lingocards_users", JSON.stringify(updatedUsers));

    setSuccess("Konto zostało utworzone! Możesz się teraz zalogować.");
    
    setUsername("");
    setPassword("");
    
    setTimeout(() => {
      setTab("login");
      setError("");
      setSuccess("");
    }, 1500);
  };

  const handleGoogleClick = async () => {
    setError("");
    setSuccess("");
    
    if (isFirebaseConfigured) {
      setIsLoading(true);
      try {
        const googleUser = await signInWithGoogle();
        setSuccess(`Zalogowano jako ${googleUser.username}!`);
        setTimeout(() => {
          onLogin(googleUser);
        }, 800);
      } catch (err) {
        setError("Błąd logowania Google: " + err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Open our simulated Google Account Chooser
      setShowGoogleModal(true);
    }
  };

  const handleSelectMockGoogle = (name, email, avatar) => {
    setShowGoogleModal(false);
    setSuccess(`Zalogowano pomyślnie przez Google!`);
    
    const googleUser = {
      username: name,
      email: email,
      avatar: avatar,
      isGoogle: true,
      registeredAt: new Date().toISOString()
    };

    // Save mock user to local registry so it counts as registered
    const usersStr = localStorage.getItem("lingocards_users");
    const users = usersStr ? JSON.parse(usersStr) : [];
    if (!users.some(u => u.username.toLowerCase() === name.toLowerCase())) {
      users.push({ ...googleUser, password: "google-auth-bypass" });
      localStorage.setItem("lingocards_users", JSON.stringify(users));
    }

    setTimeout(() => {
      onLogin(googleUser);
    }, 800);
  };

  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    if (!customGoogleName.trim() || !customGoogleEmail.trim()) return;
    handleSelectMockGoogle(customGoogleName.trim(), customGoogleEmail.trim(), "🦉");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-8 relative overflow-hidden border-indigo-500/10">
        
        {/* Decorative elements */}
        <div className="absolute -left-20 -top-20 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/20 mb-3">
            <Icons.BookOpen className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">LingoCards PRO</h2>
          <p className="text-slate-400 text-xs mt-1">Rozpocznij naukę angielskiego z fiszkami</p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-black/40 p-1.5 rounded-xl border border-white/5 gap-2 mb-6">
          <button
            onClick={() => {
              setTab("login");
              setError("");
              setSuccess("");
            }}
            className={`flex-1 btn text-xs font-bold py-2.5 rounded-lg transition-all ${
              tab === "login"
                ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/25"
                : "bg-transparent text-slate-500 hover:text-white border-transparent"
            }`}
          >
            Logowanie
          </button>
          <button
            onClick={() => {
              setTab("register");
              setError("");
              setSuccess("");
            }}
            className={`flex-1 btn text-xs font-bold py-2.5 rounded-lg transition-all ${
              tab === "register"
                ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/25"
                : "bg-transparent text-slate-500 hover:text-white border-transparent"
            }`}
          >
            Rejestracja
          </button>
        </div>

        {error && (
          <div className="mb-5 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs p-3.5 rounded-xl flex items-center gap-2">
            <Icons.AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs p-3.5 rounded-xl flex items-center gap-2">
            <Icons.CheckCircle2 size={16} />
            <span>{success}</span>
          </div>
        )}

        {tab === "login" ? (
          /* LOGIN FORM */
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                Nazwa użytkownika
              </label>
              <div className="relative">
                <Icons.User size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="np. pawel123"
                  className="w-full bg-black/40 border border-white/8 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500/60 font-semibold placeholder-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                Hasło
              </label>
              <div className="relative">
                <Icons.Lock size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/8 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500/60 font-semibold placeholder-slate-700"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full py-3.5 mt-2">
              Zaloguj się
              <Icons.LogIn size={18} />
            </button>
          </form>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                Nazwa użytkownika
              </label>
              <div className="relative">
                <Icons.User size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="np. pawel123"
                  className="w-full bg-black/40 border border-white/8 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500/60 font-semibold placeholder-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                Hasło
              </label>
              <div className="relative">
                <Icons.Lock size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 4 znaki"
                  className="w-full bg-black/40 border border-white/8 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500/60 font-semibold placeholder-slate-700"
                />
              </div>
            </div>

            {/* Avatar selector */}
            <div>
              <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                Wybierz swój awatar ({selectedAvatar})
              </label>
              <div className="grid grid-cols-5 gap-2 bg-black/20 p-2.5 rounded-xl border border-white/5">
                {avatarsList.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setSelectedAvatar(av)}
                    className={`text-2xl p-2 rounded-lg transition-all hover:scale-110 ${
                      selectedAvatar === av ? "bg-indigo-500/20 border border-indigo-500/30" : "bg-transparent"
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full py-3.5 mt-2 bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-indigo-500/10">
              Stwórz konto
              <Icons.UserPlus size={18} />
            </button>
          </form>
        )}

        {/* Separator */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/5" />
          <span className="text-[9px] text-slate-500 font-bold uppercase mx-3 tracking-widest">lub</span>
          <div className="flex-grow border-t border-white/5" />
        </div>

        {/* Google Authentication Button */}
        <button
          onClick={handleGoogleClick}
          disabled={isLoading}
          className="w-full btn btn-secondary py-3 flex items-center justify-center gap-3 border border-white/10 hover:border-white/20 transition-all font-bold text-white bg-black/20"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.553 0-6.433-2.88-6.433-6.433s2.88-6.433 6.433-6.433c1.628 0 3.106.608 4.225 1.6l3.185-3.185C19.107 2.022 15.924 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.898 0 10.747-4.254 11.218-9.857h-11.218z"
            />
          </svg>
          {isLoading ? "Łączenie..." : "Zaloguj przez Google"}
        </button>
      </div>

      {/* SIMULATED GOOGLE OAUTH POPUP MODAL */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="glass-card w-full max-w-sm p-6 border-indigo-500/20 shadow-2xl relative">
            <button
              onClick={() => setShowGoogleModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
            >
              <Icons.X size={20} />
            </button>

            {/* Google Logo / Banner */}
            <div className="flex flex-col items-center mb-6">
              <svg className="w-10 h-10 mb-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <h3 className="text-base font-bold text-white">Logowanie przez Google</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Wybierz konto, aby przejść do LingoCards</p>
            </div>

            {/* Quick account chooser */}
            <div className="flex flex-col gap-2.5 mb-5">
              <button
                onClick={() => handleSelectMockGoogle("Krzysztof Kowalski", "krzysztof.kowalski@gmail.com", "👩‍🚀")}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-left text-xs transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-lg">👩‍🚀</div>
                <div>
                  <div className="font-bold text-white">Krzysztof Kowalski</div>
                  <div className="text-[10px] text-slate-500">krzysztof.kowalski@gmail.com</div>
                </div>
              </button>
              
              <button
                onClick={() => handleSelectMockGoogle("Anna Nowak", "anna.nowak@gmail.com", "🦊")}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-left text-xs transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-lg">🦊</div>
                <div>
                  <div className="font-bold text-white">Anna Nowak</div>
                  <div className="text-[10px] text-slate-500">anna.nowak@gmail.com</div>
                </div>
              </button>
            </div>

            {/* Custom Google account selector */}
            <form onSubmit={handleCustomGoogleSubmit} className="border-t border-white/5 pt-4 flex flex-col gap-3">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Użyj innego konta</span>
              <input
                type="text"
                required
                value={customGoogleName}
                onChange={(e) => setCustomGoogleName(e.target.value)}
                placeholder="Imię i nazwisko"
                className="w-full bg-black/40 border border-white/8 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500/60 font-semibold placeholder-slate-700"
              />
              <input
                type="email"
                required
                value={customGoogleEmail}
                onChange={(e) => setCustomGoogleEmail(e.target.value)}
                placeholder="Adres e-mail Google"
                className="w-full bg-black/40 border border-white/8 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500/60 font-semibold placeholder-slate-700"
              />
              <button type="submit" className="btn btn-primary text-xs py-2 bg-gradient-to-r from-indigo-500 to-cyan-500">
                Zaloguj jako nowy profil Google
              </button>
            </form>

            {/* Developer credentials warning explanation banner */}
            <div className="mt-4 bg-indigo-500/5 p-3 rounded-lg border border-indigo-500/10 text-[9px] text-indigo-300 leading-relaxed font-semibold">
              <strong className="text-white block mb-0.5">💡 Informacja dla dewelopera:</strong>
              To okno to symulacja OAuth. Aby wdrożyć rzeczywiste logowanie Google, skonfiguruj plik <span className="font-mono text-white">src/firebase.js</span> swoimi danymi z konsoli Firebase.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
