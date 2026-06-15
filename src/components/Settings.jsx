import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";

export default function Settings({ stats, onUpdateStats, theme, onThemeChange, onResetData, DEFAULT_THEMES = [], PREMIUM_THEMES = [], currentUser }) {
  const isPro = !!stats.isPro;
  const [dailyGoal, setDailyGoal] = useState(stats.dailyTarget || 10);
  const [speechSpeed, setSpeechSpeed] = useState(localStorage.getItem("lingocards_speech_speed") || "1.0");
  const [autoplayAudio, setAutoplayAudio] = useState(localStorage.getItem("lingocards_autoplay") === "true");
  const [muteInterface, setMuteInterface] = useState(localStorage.getItem("lingocards_mute") === "true");
  const [audioStyle, setAudioStyle] = useState(isPro ? (stats.audioStyle || "synth") : (stats.audioStyle === "off" ? "off" : "synth"));
  const [confettiStyle, setConfettiStyle] = useState(isPro ? (stats.confettiStyle || "standard") : (stats.confettiStyle === "off" ? "off" : "standard"));
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryStreak, setRecoveryStreak] = useState(stats.streak || 0);
  const [recoveryXp, setRecoveryXp] = useState(stats.xp || 0);
  const [recoveryLevel, setRecoveryLevel] = useState(stats.level || 1);
  const [resetConfirmText, setResetConfirmText] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  useEffect(() => {
    setAudioStyle(isPro ? (stats.audioStyle || "synth") : (stats.audioStyle === "off" ? "off" : "synth"));
    setConfettiStyle(isPro ? (stats.confettiStyle || "standard") : (stats.confettiStyle === "off" ? "off" : "standard"));
  }, [isPro, stats.audioStyle, stats.confettiStyle]);

  const handleSpeedChange = (e) => {
    const newVal = e.target.value;
    setSpeechSpeed(newVal);
    localStorage.setItem("lingocards_speech_speed", newVal);
  };

  const handleToggleAutoplay = () => {
    const newVal = !autoplayAudio;
    setAutoplayAudio(newVal);
    localStorage.setItem("lingocards_autoplay", newVal.toString());
  };

  const handleToggleMute = () => {
    const newVal = !muteInterface;
    setMuteInterface(newVal);
    localStorage.setItem("lingocards_mute", newVal.toString());
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSuccessMsg("");

    // Save settings to stats
    const updatedStats = { 
      ...stats, 
      dailyTarget: parseInt(dailyGoal),
      audioStyle,
      confettiStyle,
      theme: selectedTheme
    };
    onUpdateStats(updatedStats);

    // Save speech speed, autoplay, and mute to localStorage
    localStorage.setItem("lingocards_speech_speed", speechSpeed);
    localStorage.setItem("lingocards_autoplay", autoplayAudio.toString());
    localStorage.setItem("lingocards_mute", muteInterface.toString());

    setSuccessMsg("Ustawienia zostały pomyślnie zapisane!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleResetDataConfirm = () => {
    if (resetConfirmText.toLowerCase() === "reset") {
      onResetData();
      setShowConfirmReset(false);
      setResetConfirmText("");
      setSuccessMsg("Wszystkie dane zostały zresetowane!");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full animate-slide-in flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/15">
          <Icons.Settings size={22} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Ustawienia aplikacji</h2>
          <p className="text-slate-400 text-xs">Dostosuj cele nauki, dźwięki i opcje profilu</p>
        </div>
      </div>

      <div className="glass-card p-6">
        <form onSubmit={handleSaveSettings} className="flex flex-col gap-6">
          {/* Daily Goal Settings */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/5">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Icons.Target size={16} className="text-amber-500" />
                Cel dzienny nauki
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Liczba słówek do opanowania każdego dnia</p>
            </div>
            <select
              value={dailyGoal}
              onChange={(e) => setDailyGoal(e.target.value)}
              className="bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl px-3 py-2 text-xs font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-active)] w-32"
            >
              <option value="3">3 słówka</option>
              <option value="5">5 słówek</option>
              <option value="10">10 słówek</option>
              <option value="15">15 słówek</option>
              <option value="20">20 słówek</option>
              <option value="30">30 słówek</option>
            </select>
          </div>

          {/* Speech speed */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border-light)]">
            <div>
              <h4 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Icons.Volume2 size={16} className="text-cyan-500" />
                Prędkość lektora (TTS)
              </h4>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">Tempo wymowy lektora w języku angielskim</p>
            </div>
            <select
              value={speechSpeed}
              onChange={handleSpeedChange}
              style={{ backgroundColor: 'var(--bg-input)' }}
              className="border border-[var(--border-light)] rounded-xl px-3 py-2 text-xs font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-active)] w-32"
            >
              <option value="0.8">Zwolnione (0.8x)</option>
              <option value="1.0">Standardowe (1.0x)</option>
              <option value="1.2">Szybkie (1.2x)</option>
              <option value="1.5">Bardzo szybkie (1.5x)</option>
            </select>
          </div>

          {/* Autoplay Audio Toggle */}
          <div className="flex items-center justify-between gap-4 pb-5 border-b border-[var(--border-light)]">
            <div>
              <h4 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Icons.PlayCircle size={16} className="text-indigo-400" />
                Autoodtwarzanie audio
              </h4>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">Odtwarzaj lektora automatycznie po odwróceniu karty</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoplayAudio}
                onChange={handleToggleAutoplay}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-[var(--border-light)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 peer-checked:after:bg-white"></div>
            </label>
          </div>

          {/* Mute interface sounds */}
          <div className="flex items-center justify-between gap-4 pb-5 border-b border-[var(--border-light)]">
            <div>
              <h4 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Icons.VolumeX size={16} className="text-rose-500" />
                Wycisz dźwięki interfejsu
              </h4>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">Wycisz sygnały dźwiękowe poprawnej/błędnej odpowiedzi</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={muteInterface}
                onChange={handleToggleMute}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-[var(--border-light)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 peer-checked:after:bg-white"></div>
            </label>
          </div>

          {/* Audio Synth Style Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border-light)]">
            <div>
              <h4 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Icons.Sparkles size={16} className="text-indigo-400" />
                Styl dźwięków sukcesu (Synth)
              </h4>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">Styl retro arpeggio generowany w locie syntezatorem</p>
            </div>
            <select
              value={audioStyle}
              onChange={(e) => setAudioStyle(e.target.value)}
              style={{ backgroundColor: 'var(--bg-input)' }}
              className="border border-[var(--border-light)] rounded-xl px-3 py-2 text-xs font-semibold text-[var(--text-primary)] focus:outline-none focus:border-indigo-500/60 w-36"
            >
              {!isPro ? (
                <>
                  <option value="synth">Retro Synth 🎹</option>
                  <option value="off">Wyciszone 🔇</option>
                </>
              ) : (
                <>
                  <option value="synth">Retro Synth 🎹</option>
                  <option value="short">Krótkie Synth 🎵</option>
                  <option value="bell">Dzwonki 🔔</option>
                  <option value="off">Wyciszone 🔇</option>
                </>
              )}
            </select>
          </div>

          {/* Confetti Style Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border-light)]">
            <div>
              <h4 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Icons.Layers size={16} className="text-cyan-400" />
                Styl efektów wizualnych (Konfetti)
              </h4>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">Styl cząsteczek przy ukończeniu talii lub osiągnięciu</p>
            </div>
            <select
              value={confettiStyle}
              onChange={(e) => setConfettiStyle(e.target.value)}
              style={{ backgroundColor: 'var(--bg-input)' }}
              className="border border-[var(--border-light)] rounded-xl px-3 py-2 text-xs font-semibold text-[var(--text-primary)] focus:outline-none focus:border-indigo-500/60 w-36"
            >
              {!isPro ? (
                <>
                  <option value="standard">Standard 🎉</option>
                  <option value="off">Wyłączone ❌</option>
                </>
              ) : (
                <>
                  <option value="standard">Standard 🎉</option>
                  <option value="stars">Gwiazdki ⭐</option>
                  <option value="hearts">Serduszka ❤️</option>
                  <option value="off">Wyłączone ❌</option>
                </>
              )}
            </select>
          </div>

          {/* Quick Theme Picker */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border-light)]">
            <div>
              <h4 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Icons.Palette size={16} className="text-pink-400" />
                Motyw graficzny
              </h4>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">Wybierz kolorystykę aplikacji</p>
            </div>
            <select
              value={selectedTheme}
              onChange={(e) => {
                const nt = e.target.value;
                setSelectedTheme(nt);
                onThemeChange(nt);
              }}
              style={{ backgroundColor: 'var(--bg-input)' }}
              className="border border-[var(--border-light)] rounded-xl px-3 py-2 text-xs font-semibold text-[var(--text-primary)] focus:outline-none focus:border-pink-500/60 w-52"
            >
              <optgroup label="Motywy podstawowe" className="bg-[var(--bg-main)] text-slate-400">
                {DEFAULT_THEMES.map(t => (
                  <option key={t.id} value={t.id} className="bg-[var(--bg-main)] text-[var(--text-primary)]">{t.label}</option>
                ))}
              </optgroup>
              <optgroup label="Motywy premium" className="bg-[var(--bg-main)] text-indigo-400">
                {PREMIUM_THEMES.map(t => {
                  const isUnlocked = !!stats.isPro && (stats.level || 1) >= t.levelRequired;
                  return (
                    <option 
                      key={t.id} 
                      value={t.id} 
                      disabled={!isUnlocked} 
                      className={`bg-[var(--bg-main)] ${isUnlocked ? "text-[var(--text-primary)]" : "text-slate-600 font-normal"}`}
                    >
                      {isUnlocked ? `✨ ${t.label}` : (!stats.isPro ? `🔒 ${t.label} (Premium PRO)` : `🔒 ${t.label} (Poziom ${t.levelRequired})`)}
                    </option>
                  );
                })}
              </optgroup>
            </select>
          </div>

          {successMsg && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs p-3.5 rounded-xl flex items-center gap-2">
              <Icons.CheckCircle size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          <button type="submit" className="btn btn-primary py-3 flex items-center justify-center gap-2 font-bold hover:scale-105 transition-transform self-end">
            <Icons.Save size={16} />
            Zapisz ustawienia
          </button>
        </form>

      {/* Narzędzie odzyskiwania danych */}
      <div className="glass-card p-5 mt-6 border-amber-500/30 bg-amber-500/5">
        <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => setShowRecovery(!showRecovery)}>
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500">
            <Icons.DatabaseBackup size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-[var(--text-primary)] text-sm">Narzędzie odzyskiwania danych (Awaryjne)</h3>
            <p className="text-xs text-amber-500/70 font-semibold mt-0.5">Automatyczne odzyskiwanie z kopii lokalnej</p>
          </div>
          <Icons.ChevronDown size={16} className={`text-amber-500 transition-transform ${showRecovery ? "rotate-180" : ""}`} />
        </div>
        {showRecovery && (
          <div className="flex flex-col gap-4 mt-4 border-t border-amber-500/20 pt-4">
            
            {/* Skaner lokalnych kopii */}
            <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
              <h4 className="text-xs font-bold text-amber-500 mb-2 flex items-center gap-2">
                <Icons.Search size={14} /> Znalezione lokalne kopie zapasowe:
              </h4>
              <div className="flex flex-col gap-2">
                {(() => {
                  const isAdmin = currentUser?.role === "admin";
                  const userKeyPart = currentUser?.username?.toLowerCase() || currentUser?.uid?.toLowerCase() || "guest";
                  const found = [];
                  for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith("lingocards_stats_")) {
                      if (!isAdmin && key !== `lingocards_stats_${userKeyPart}`) continue;
                      try {
                        const data = JSON.parse(localStorage.getItem(key));
                        if (data && (data.streak > 0 || data.xp > 0 || Object.keys(data.learnedCards || {}).length > 0)) {
                          found.push({ key, data });
                        }
                      } catch (e) {}
                    }
                  }
                  if (found.length === 0) {
                    return <p className="text-xs text-amber-500/70">Nie znaleziono żadnych pełnych kopii (jeśli używałeś innej przeglądarki lub wyczyszczono dane, skaner nic nie znajdzie).</p>;
                  }
                  return found.map(b => (
                    <div key={b.key} style={{ backgroundColor: 'var(--bg-input)' }} className="flex items-center justify-between p-2 rounded-lg border border-amber-500/20">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-amber-400 font-bold">{b.key.replace("lingocards_stats_", "")}</span>
                        <span className="text-xs text-[var(--text-primary)] font-medium">Streak: {b.data.streak} dni | XP: {b.data.xp || 0}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => { 
                          onUpdateStats(b.data); 
                          alert("Przywrócono pełną kopię zapasową! Twoje statystyki, XP oraz kalendarz zostały zaktualizowane."); 
                        }}
                        className="btn bg-amber-600 hover:bg-amber-700 text-white text-[10px] py-1.5 px-3 shadow-md border-0"
                      >
                        Przywróć to
                      </button>
                    </div>
                  ));
                })()}
              </div>
            </div>

            <div className="mt-2">
              <h4 className="text-xs font-bold text-amber-500 mb-2">Lub wpisz ręcznie (odbuduje też kalendarz):</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Streak</label>
                  <input type="number" value={recoveryStreak} onChange={e => setRecoveryStreak(parseInt(e.target.value)||0)} style={{ backgroundColor: 'var(--bg-input)' }} className="border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-amber-500/80 font-semibold" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">XP</label>
                  <input type="number" value={recoveryXp} onChange={e => setRecoveryXp(parseInt(e.target.value)||0)} style={{ backgroundColor: 'var(--bg-input)' }} className="border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-amber-500/80 font-semibold" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Poziom</label>
                  <input type="number" value={recoveryLevel} onChange={e => setRecoveryLevel(parseInt(e.target.value)||1)} style={{ backgroundColor: 'var(--bg-input)' }} className="border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-amber-500/80 font-semibold" />
                </div>
              </div>
              <button type="button" onClick={() => { 
                const dates = [];
                const today = new Date();
                for(let i = 0; i < recoveryStreak; i++) {
                  const d = new Date(today);
                  d.setDate(today.getDate() - i);
                  dates.push(d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2, '0') + "-" + String(d.getDate()).padStart(2, '0'));
                }
                onUpdateStats({...stats, streak: recoveryStreak, bestStreak: Math.max(stats.bestStreak || 0, recoveryStreak), xp: recoveryXp, level: recoveryLevel, studyDates: [...new Set([...(stats.studyDates || []), ...dates])]}); 
                alert("Statystyki ręczne przywrócone i kalendarz przebudowany! Możesz opuścić ustawienia."); 
              }} className="btn bg-amber-600 hover:bg-amber-700 text-white text-xs py-2 px-4 mt-3 w-full font-bold shadow-md border-0">Odbuduj statystyki</button>
            </div>
          </div>
        )}
      </div>
      </div>

      {/* Danger Zone: Reset Data */}
      <div className="glass-card p-6 border-rose-500/10">
        <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2 mb-1.5">
          <Icons.ShieldAlert size={18} />
          Strefa zagrożenia
        </h4>
        <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
          Zresetowanie danych usunie wszystkie statystyki nauki, zdobyte osiągnięcia oraz własne talie dla tego użytkownika. Te operacje są nieodwracalne.
        </p>

        {!showConfirmReset ? (
          <button
            type="button"
            onClick={() => setShowConfirmReset(true)}
            className="btn py-2.5 text-xs font-bold text-rose-400 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 transition-colors"
          >
            Resetuj postępy i dane
          </button>
        ) : (
          <div className="bg-rose-500/5 border border-rose-500/10 p-4 rounded-xl flex flex-col gap-3">
            <span className="text-[10px] text-rose-300 font-bold uppercase tracking-wider">
              Aby potwierdzić, wpisz słowo <strong className="text-white">reset</strong> poniżej:
            </span>
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="text"
                value={resetConfirmText}
                onChange={(e) => setResetConfirmText(e.target.value)}
                placeholder="wpisz 'reset'"
                className="bg-black/40 border border-white/8 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500/60 font-semibold placeholder-slate-700"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleResetDataConfirm}
                  disabled={resetConfirmText.toLowerCase() !== "reset"}
                  className="btn bg-rose-600 hover:bg-rose-700 text-white text-xs py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tak, zresetuj
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowConfirmReset(false);
                    setResetConfirmText("");
                  }}
                  className="btn btn-secondary text-xs py-2 px-4"
                >
                  Anuluj
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
