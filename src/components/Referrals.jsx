import React, { useState } from "react";
import * as Icons from "lucide-react";

export default function Referrals({ stats, onUpdateStats, onNavigate }) {
  const [copied, setCopied] = useState(false);
  const [simName, setSimName] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  const referralCode = `${(stats.username || "USER").toUpperCase()}${stats.streak > 0 ? stats.streak : "7"}PRO`;
  const referralLink = `https://lingocards.pro/ref?code=${referralCode}`;

  const referrals = stats.referrals || [];
  const refCount = referrals.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    showToast("Link polecający skopiowany do schowka! 📋");
    setTimeout(() => setCopied(false), 2500);
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleSimulate = (e) => {
    e.preventDefault();
    const name = simName.trim();
    if (!name) return;

    if (referrals.includes(name)) {
      showToast("Ten znajomy został już polecony!");
      return;
    }

    const updatedReferrals = [...referrals, name];
    
    // Create new stats
    const updatedStats = {
      ...stats,
      referrals: updatedReferrals
    };

    onUpdateStats(updatedStats);
    setSimName("");
    
    // Check milestones for popups
    if (updatedReferrals.length === 1) {
      showToast("Gratulacje! Odblokowałeś nowy motyw Cyberpunk Neon! 🌌");
    } else if (updatedReferrals.length === 3) {
      showToast("Gratulacje! Odblokowałeś ekskluzywne awatary: 👽 🛸 👾! 🚀");
    } else if (updatedReferrals.length === 5) {
      showToast("Niesamowite! Zostałeś Ambasadorem Językowym LingoCards! 👑");
    } else {
      showToast(`Polecono użytkownika ${name}! 🎉`);
    }
  };

  // Milestones Config
  const milestones = [
    {
      count: 1,
      title: "Motyw Cyberpunk Neon",
      desc: "Niesamowita, fioletowo-neonowa paleta barw z unikalnymi rozświetleniami.",
      reward: "Motyw graficzny",
      unlocked: refCount >= 1,
      icon: "Palette"
    },
    {
      count: 3,
      title: "Paczka Kosmicznych Awatarów",
      desc: "Zestaw 3 unikalnych awatarów do profilu: 👽, 🛸 oraz 👾.",
      reward: "3 nowe awatary",
      unlocked: refCount >= 3,
      icon: "Smile"
    },
    {
      count: 5,
      title: "Ambasador Językowy",
      desc: "Złota poświata profilowa, prestiżowa ranga oraz status VIP w aplikacji.",
      reward: "Złota Ramka + Ranga",
      unlocked: refCount >= 5,
      icon: "ShieldAlert"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 animate-slide-in">
      {/* Toast popup alerts */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-[200] bg-indigo-600 border border-indigo-400 text-white font-bold text-xs uppercase px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2 animate-slide-in">
          <Icons.Sparkles size={16} className="text-yellow-300 animate-spin" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button 
            onClick={() => onNavigate("dashboard")}
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 font-bold"
          >
            <Icons.ChevronLeft size={16} /> Powrót do pulpitu
          </button>
          <h2 className="text-3xl font-black mt-2 text-white tracking-tight">
            Program Poleceń <span className="text-indigo-400 font-extrabold">LingoCards</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">Ucz się ze znajomymi i odblokowuj unikalne nagrody premium!</p>
        </div>
        
        <div className="flex gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-4 py-2.5 rounded-2xl font-bold text-xs">
          <Icons.Users size={16} />
          <span>Poleceni znajomi: {refCount}</span>
        </div>
      </div>

      {/* Main Grid: Referral link and Simulation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Referral Link Copy Card */}
        <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          <div>
            <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-wider block">Krok 1: Wyślij link</span>
            <h3 className="text-lg font-bold text-white mt-1">Twój unikalny link poleceń</h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Skopiuj poniższy link i wyślij go znajomym. Gdy zarejestrują się w aplikacji, oboje otrzymacie punkty prestiżu!
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <div className="bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-xs font-mono text-[var(--text-primary)] break-all select-all flex justify-between items-center">
              <span>{referralLink}</span>
            </div>
            
            <button 
              onClick={handleCopy}
              className={`btn ${copied ? 'bg-emerald-600 border-emerald-500 hover:bg-emerald-500' : 'btn-primary'} py-3 flex items-center justify-center gap-2 font-bold w-full`}
            >
              {copied ? (
                <>
                  <Icons.Check size={16} />
                  Skopiowano!
                </>
              ) : (
                <>
                  <Icons.Copy size={16} />
                  Skopiuj Link Polecający
                </>
              )}
            </button>
          </div>
        </div>

        {/* Simulate Friend Joined Card */}
        <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-36 h-36 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          <div>
            <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-wider block">Krok 2: Symulacja lokalna</span>
            <h3 className="text-lg font-bold text-white mt-1">Dodaj znajomego (Lokalnie)</h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Ponieważ testujesz aplikację lokalnie na swoim komputerze, możesz w prosty sposób zasymulować dołączenie znajomego, wpisując jego imię poniżej.
            </p>
          </div>

          <form onSubmit={handleSimulate} className="mt-6 flex flex-col sm:flex-row gap-2.5">
            <input 
              type="text"
              placeholder="Imię lub pseudonim znajomego..."
              value={simName}
              onChange={(e) => setSimName(e.target.value)}
              className="flex-grow bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-active)] font-medium"
            />
            <button 
              type="submit" 
              className="btn btn-secondary py-3 px-5 text-xs font-bold flex items-center justify-center gap-1.5 border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10"
            >
              <Icons.UserPlus size={14} />
              Zarejestruj
            </button>
          </form>
        </div>

      </div>

      {/* Rewards Milestones Section */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-1.5">Droga do nagród</h3>
        <p className="text-slate-400 text-xs mb-6">Polecaj znajomych i odblokowuj stopniowo kolejne elementy w aplikacji.</p>

        {/* Milestones timeline */}
        <div className="flex flex-col gap-6">
          {milestones.map((m, index) => {
            const IconComponent = Icons[m.icon] || Icons.Award;
            return (
              <div 
                key={m.count}
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 ${
                  m.unlocked 
                    ? "bg-indigo-500/5 border-indigo-500/20 text-white" 
                    : "bg-black/10 border-white/3 text-slate-500 opacity-60"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border font-black text-sm ${
                    m.unlocked 
                      ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-400" 
                      : "bg-slate-800/20 border-white/5 text-slate-600"
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm">{m.title}</h4>
                      {m.unlocked ? (
                        <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full uppercase">
                          Odblokowano
                        </span>
                      ) : (
                        <span className="text-[9px] bg-white/5 border border-white/10 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase">
                          Wymaga {m.count} {m.count === 1 ? 'polecenia' : 'poleceń'}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-xs mt-1 leading-normal max-w-lg">{m.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    Nagroda: <strong className={m.unlocked ? "text-indigo-300" : "text-slate-400"}>{m.reward}</strong>
                  </span>
                  <div className={`p-2 rounded-lg border ${
                    m.unlocked ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" : "bg-black/25 border-transparent text-slate-600"
                  }`}>
                    <IconComponent size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invited friends list */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-1.5">Twoi poleceni znajomi</h3>
        <p className="text-slate-400 text-xs mb-4">Poniżej znajduje się lista osób, które dołączyły dzięki Tobie.</p>

        {refCount === 0 ? (
          <div className="bg-black/20 p-8 rounded-2xl border border-white/5 text-center text-slate-500 text-xs font-semibold">
            Brak poleconych osób. Wyślij link znajomym lub użyj formularza symulacji powyżej! 🚀
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {referrals.map((friend, idx) => (
              <div 
                key={idx} 
                className="bg-black/30 border border-white/5 rounded-xl px-4 py-3 flex items-center gap-2.5 hover:border-indigo-500/20 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-[10px] font-black text-indigo-400">
                  {idx + 1}
                </div>
                <span className="text-xs text-white font-bold truncate" title={friend}>
                  {friend}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
