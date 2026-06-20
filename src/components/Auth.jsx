import React, { useState } from "react";
import * as Icons from "lucide-react";
import { auth, signInWithGoogle, signInWithEmail, registerWithEmail, isFirebaseConfigured } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useFirestore } from "../hooks/useFirestore";

export default function Auth({ onLogin }) {
  const [tab, setTab] = useState("login"); // 'login' | 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("👑");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordReg, setShowPasswordReg] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);

  const { sendSystemNotification } = useFirestore();

  const avatarsList = ["👑", "🦄", "🐉", "🐙", "🦊", "🦁", "🐼", "🦉", "🚀", "🛸", "👾", "🦖", "🦥", "🦩", "🍕", "🐱", "🐯", "👻", "👽", "🐨"];

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setError("");
    setSuccess("");
  };

  // ─── Logowanie emailem ─────────────────────────────────────────────────────
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !password.trim()) {
      setError("Email i hasło są wymagane.");
      return;
    }

    setIsLoading(true);
    try {
      if (isFirebaseConfigured) {
        const user = await signInWithEmail(email.trim(), password);
        // Sprawdź czy użytkownik ma zapisany awatar w localStorage
        const savedAvatar = localStorage.getItem(`lingocards_avatar_${user.uid}`);
        if (savedAvatar) user.avatar = savedAvatar;
        setSuccess("Zalogowano pomyślnie!");
        setTimeout(() => onLogin(user), 700);
      } else {
        setError("Firebase nie jest skonfigurowany.");
      }
    } catch (err) {
      const msg = err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found"
        ? "Niepoprawny email lub hasło."
        : err.code === "auth/too-many-requests"
        ? "Za dużo prób. Spróbuj za chwilę."
        : "Błąd logowania: " + err.message;
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Rejestracja emailem ───────────────────────────────────────────────────
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username.trim()) {
      setError("Nazwa użytkownika jest wymagana.");
      return;
    }
    if (!email.trim() || !password.trim()) {
      setError("Email i hasło są wymagane.");
      return;
    }
    if (password.length < 6) {
      setError("Hasło musi mieć min. 6 znaków.");
      return;
    }

    setIsLoading(true);
    try {
      if (isFirebaseConfigured) {
        let user;
        try {
          user = await registerWithEmail(email.trim(), password, username.trim(), selectedAvatar);
        } catch (regErr) {
          if (regErr.code === "auth/email-already-in-use") {
            try {
              user = await signInWithEmail(email.trim(), password);
            } catch (loginErr) {
              throw regErr; // Jeśli hasło nie pasuje, rzuć oryginalny błąd
            }
          } else {
            throw regErr;
          }
        }
        
        user.avatar = selectedAvatar;
        user.username = username.trim();

        await sendSystemNotification(user.uid, {
          title: "Witaj w LingoCards! 👋",
          message: "Cieszymy się, że jesteś z nami! Odkrywaj talie słownictwa, zdobywaj XP, awansuj na kolejne poziomy i odblokowuj nowe, unikalne motywy. Rozpocznij swoją naukę już teraz!",
          type: "info"
        });
        
        setSuccess("Konto utworzone!");
        setTimeout(() => onLogin(user), 700);
      } else {
        setError("Firebase nie jest skonfigurowany.");
      }
    } catch (err) {
      const msg = err.code === "auth/email-already-in-use"
        ? "Ten email jest już zarejestrowany. Przejdź do logowania lub zresetuj hasło."
        : err.code === "auth/weak-password"
        ? "Hasło jest zbyt słabe (min. 6 znaków)."
        : "Błąd rejestracji: " + err.message;
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Logowanie Google ──────────────────────────────────────────────────────
  const handleGoogleClick = async () => {
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      if (isFirebaseConfigured) {
        const user = await signInWithGoogle();
        const savedAvatar = localStorage.getItem(`lingocards_avatar_${user.uid}`);
        if (savedAvatar) user.avatar = savedAvatar;
        setSuccess("Zalogowano przez Google!");
        setTimeout(() => onLogin(user), 700);
      } else {
        setError("Firebase nie jest skonfigurowany.");
      }
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user" && err.code !== "auth/cancelled-popup-request") {
        setError("Błąd logowania Google: " + err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Reset hasła ───────────────────────────────────────────────────────────
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email.trim()) {
      setError("Wpisz adres email.");
      return;
    }
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSuccess("Link do zresetowania hasła został wysłany na podany adres e-mail.");
    } catch (err) {
      setError("Nie udało się wysłać linku. Sprawdź adres e-mail.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-8 relative overflow-hidden border-[var(--border-light)]">

        {/* Decorative glow */}
        <div className="absolute -left-20 -top-20 w-48 h-48 bg-[var(--bg-grad-1)] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-[var(--bg-grad-2)] rounded-full blur-3xl pointer-events-none" />

        {/* Brand */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center mx-auto shadow-lg shadow-[var(--primary-glow)] mb-3">
            <Icons.BookOpen className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">LingoCards</h2>
          <p className="text-[var(--text-secondary)] text-xs mt-1">Naucz się angielskiego z fiszkami</p>
        </div>

        {/* Tabs */}
        {!forgotMode && (
          <div className="flex bg-[var(--bg-input)] p-1.5 rounded-xl border border-[var(--border-light)] gap-2 mb-6">
            {["login", "register"].map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); resetForm(); }}
                className={`flex-1 btn text-xs font-bold py-2.5 rounded-lg transition-all ${
                  tab === t
                    ? "bg-[var(--primary-glow)] text-[var(--primary)] border border-[var(--border-active)]"
                    : "bg-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] border-transparent"
                }`}
              >
                {t === "login" ? "Logowanie" : "Rejestracja"}
              </button>
            ))}
          </div>
        )}

        {/* Error / Success */}
        {error && (
          <div className="mb-5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3.5 rounded-xl flex items-center gap-2">
            <Icons.AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs p-3.5 rounded-xl flex items-center gap-2">
            <Icons.CheckCircle2 size={16} />
            <span>{success}</span>
          </div>
        )}

        {forgotMode ? (
          /* ── ODZYSKIWANIE HASŁA ────────────────────────────────────────── */
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
            <div className="text-[var(--text-secondary)] text-xs leading-relaxed mb-1">
              Wpisz swój adres e-mail, a wyślemy Ci link do zresetowania hasła.
            </div>
            <div>
              <label className="text-[10px] text-[var(--text-muted)] font-extrabold uppercase tracking-wider block mb-2">
                Adres email
              </label>
              <div className="relative">
                <Icons.Mail size={16} className="absolute left-3.5 top-3.5 text-[var(--text-muted)]" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="twoj@email.com"
                  autoComplete="email"
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl pl-11 pr-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-active)] font-semibold placeholder-[var(--text-muted)]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full py-3.5 mt-2 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? "Wysyłanie..." : "Wyślij link resetujący"}
              {!isLoading && <Icons.Send size={16} />}
            </button>

            <button
              type="button"
              onClick={() => { setForgotMode(false); setError(""); setSuccess(""); }}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] font-bold text-center mt-2 transition-colors"
            >
              Wróć do logowania
            </button>
          </form>
        ) : tab === "login" ? (
          /* ── LOGOWANIE ─────────────────────────────────────────────────── */
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] text-[var(--text-muted)] font-extrabold uppercase tracking-wider block mb-2">
                Adres email
              </label>
              <div className="relative">
                <Icons.Mail size={16} className="absolute left-3.5 top-3.5 text-[var(--text-muted)]" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="twoj@email.com"
                  autoComplete="email"
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl pl-11 pr-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-active)] font-semibold placeholder-[var(--text-muted)]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] text-[var(--text-muted)] font-extrabold uppercase tracking-wider block">
                  Hasło
                </label>
                <button
                  type="button"
                  onClick={() => { setForgotMode(true); setError(""); setSuccess(""); }}
                  className="text-[10px] text-[var(--primary)] hover:opacity-80 font-bold transition-colors"
                  tabIndex={-1}
                >
                  Zapomniałeś hasła?
                </button>
              </div>
              <div className="relative">
                <Icons.Lock size={16} className="absolute left-3.5 top-3.5 text-[var(--text-muted)]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl pl-11 pr-11 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-active)] font-semibold placeholder-[var(--text-muted)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3.5 top-3.5 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <Icons.EyeOff size={16} /> : <Icons.Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full py-3.5 mt-2 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? "Logowanie..." : "Zaloguj się"}
              {!isLoading && <Icons.LogIn size={18} />}
            </button>
          </form>
        ) : (
          /* ── REJESTRACJA ───────────────────────────────────────────────── */
          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] text-[var(--text-muted)] font-extrabold uppercase tracking-wider block mb-2">
                Nazwa użytkownika
              </label>
              <div className="relative">
                <Icons.User size={16} className="absolute left-3.5 top-3.5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="np. pawel123"
                  autoComplete="username"
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl pl-11 pr-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-active)] font-semibold placeholder-[var(--text-muted)]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-[var(--text-muted)] font-extrabold uppercase tracking-wider block mb-2">
                Adres email
              </label>
              <div className="relative">
                <Icons.Mail size={16} className="absolute left-3.5 top-3.5 text-[var(--text-muted)]" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="twoj@email.com"
                  autoComplete="email"
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl pl-11 pr-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-active)] font-semibold placeholder-[var(--text-muted)]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-[var(--text-muted)] font-extrabold uppercase tracking-wider block mb-2">
                Hasło <span className="text-[var(--text-muted)] normal-case font-normal opacity-70">(min. 6 znaków)</span>
              </label>
              <div className="relative">
                <Icons.Lock size={16} className="absolute left-3.5 top-3.5 text-[var(--text-muted)]" />
                <input
                  type={showPasswordReg ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 6 znaków"
                  autoComplete="new-password"
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl pl-11 pr-11 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-active)] font-semibold placeholder-[var(--text-muted)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordReg(p => !p)}
                  className="absolute right-3.5 top-3.5 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                  tabIndex={-1}
                >
                  {showPasswordReg ? <Icons.EyeOff size={16} /> : <Icons.Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Avatar */}
            <div>
              <label className="text-[10px] text-[var(--text-muted)] font-extrabold uppercase tracking-wider block mb-2">
                Wybierz awatar ({selectedAvatar})
              </label>
              <div className="grid grid-cols-5 gap-2 bg-[var(--bg-input)] p-2.5 rounded-xl border border-[var(--border-light)]">
                {avatarsList.map(av => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setSelectedAvatar(av)}
                    className={`text-2xl p-2 rounded-lg transition-all hover:scale-110 ${
                      selectedAvatar === av ? "bg-[var(--primary-glow)] border border-[var(--border-active)]" : "bg-transparent"
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full py-3.5 mt-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] disabled:opacity-50"
            >
              {isLoading ? "Tworzenie konta..." : "Stwórz konto"}
              {!isLoading && <Icons.UserPlus size={18} />}
            </button>
          </form>
        )}

        {/* Separator */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-[var(--border-light)]" />
          <span className="text-[9px] text-[var(--text-muted)] font-bold uppercase mx-3 tracking-widest">lub</span>
          <div className="flex-grow border-t border-[var(--border-light)]" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleClick}
          disabled={isLoading}
          className="w-full btn btn-secondary py-3 flex items-center justify-center gap-3 border border-[var(--border-light)] hover:border-[var(--text-muted)] transition-all font-bold text-[var(--text-primary)] bg-[var(--bg-input)] disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          {isLoading ? "Łączenie..." : "Kontynuuj przez Google"}
        </button>

        <p className="text-center text-[10px] text-[var(--text-muted)] mt-5">
          Dane są bezpiecznie przechowywane przez Firebase (Google)
        </p>
      </div>
    </div>
  );
}
