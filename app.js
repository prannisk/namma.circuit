/* ============================================================
   NAMMA CIRCUIT — ECE UNIVERSE
   "Short Circuit illa, Smart Circuit"
   app.js — Complete Interactive Learning Engine
============================================================ */
"use strict";

/* ============================================================
   STORAGE & DATA LAYER (Supabase-ready abstraction)
============================================================ */
const STORAGE = {
    xp:        "ncu_xp_v3",
    mastered:  "ncu_mastered_v3",
    quizAttempts: "ncu_quiz_attempts_v3",
    badges:    "ncu_badges_v3",
    recentQ:   "ncu_recent_q_v3"
};

const DB = {
    getXP()           { return Number(localStorage.getItem(STORAGE.xp) || 0); },
    setXP(v)          { localStorage.setItem(STORAGE.xp, String(v)); updateXPDisplay(); },
    addXP(n)          { DB.setXP(DB.getXP() + n); },
    getMastered()     { try { return JSON.parse(localStorage.getItem(STORAGE.mastered) || "[]"); } catch { return []; } },
    setMastered(arr)  { localStorage.setItem(STORAGE.mastered, JSON.stringify(arr)); },
    master(id)        { const m = DB.getMastered(); if (!m.includes(id)) { m.push(id); DB.setMastered(m); return true; } return false; },
    isMastered(id)    { return DB.getMastered().includes(id); },
    getAttempts()     { try { return JSON.parse(localStorage.getItem(STORAGE.quizAttempts) || "{}"); } catch { return {}; } },
    recordAttempt(id, pass) {
        const a = DB.getAttempts();
        if (!a[id]) a[id] = { attempts: 0, passes: 0 };
        a[id].attempts++;
        if (pass) a[id].passes++;
        localStorage.setItem(STORAGE.quizAttempts, JSON.stringify(a));
    },
    getBadges()       { try { return JSON.parse(localStorage.getItem(STORAGE.badges) || "[]"); } catch { return []; } },
    awardBadge(id)    { const b = DB.getBadges(); if (!b.includes(id)) { b.push(id); localStorage.setItem(STORAGE.badges, JSON.stringify(b)); return true; } return false; },
    getRecentQ()      { try { return JSON.parse(localStorage.getItem(STORAGE.recentQ) || "[]"); } catch { return []; } },
    markQUsed(qid)    { const r = DB.getRecentQ(); r.unshift(qid); localStorage.setItem(STORAGE.recentQ, JSON.stringify(r.slice(0, 30))); },
    reset()           { [STORAGE.xp, STORAGE.mastered, STORAGE.quizAttempts, STORAGE.badges, STORAGE.recentQ].forEach(k => localStorage.removeItem(k)); }
};

/* ============================================================
   LEVEL SYSTEM
============================================================ */
const LEVELS = [
    { min: 0,    name: "Circuit Starter",    icon: "🌱" },
    { min: 100,  name: "Electron Explorer",  icon: "⚡" },
    { min: 250,  name: "Circuit Builder",    icon: "🔧" },
    { min: 500,  name: "Signal Engineer",    icon: "📡" },
    { min: 800,  name: "System Architect",   icon: "🏗️" },
    { min: 1200, name: "Embedded Engineer",  icon: "🤖" },
    { min: 1700, name: "VLSI Designer",      icon: "💎" },
    { min: 2500, name: "ECE Master",         icon: "🏆" }
];

function getLevel(xp = DB.getXP()) {
    let lv = LEVELS[0];
    for (const l of LEVELS) { if (xp >= l.min) lv = l; }
    return lv;
}

function getNextLevel(xp = DB.getXP()) {
    return LEVELS.find(l => l.min > xp) || null;
}

function xpToNextLevel(xp = DB.getXP()) {
    const next = getNextLevel(xp);
    if (!next) return { needed: 0, pct: 100 };
    const cur = getLevel(xp);
    const range = next.min - cur.min;
    const progress = xp - cur.min;
    return { needed: next.min - xp, pct: Math.round((progress / range) * 100) };
}

/* ============================================================
   MASCOTS
============================================================ */
const mascots = {
    volto: {
        name: "Volto", concept: "Voltage", role: "The Pressure King", emoji: "⚡",
        color: "#b7ff63", badge: "badge-mint",
        line: "I'm the push that makes current flow. No push — no flow!",
        formula: "V = I × R",
        topics: ["Voltage", "EMF", "Potential Difference", "Power"]
    },
    curro: {
        name: "Curro", concept: "Current", role: "The Flow Master", emoji: "🌊",
        color: "#46e7d1", badge: "badge-cyan",
        line: "I'm the actual movement of charges through your circuit.",
        formula: "I = V / R",
        topics: ["Current", "Charge", "Drift", "KCL"]
    },
    resi: {
        name: "Resi", concept: "Resistance", role: "The Guardian", emoji: "🧱",
        color: "#ffd166", badge: "badge-amber",
        line: "I don't stop current. I control it. Big difference!",
        formula: "R = V / I",
        topics: ["Resistance", "Ohm's Law", "Resistor", "Power"]
    },
    capa: {
        name: "Capa", concept: "Capacitance", role: "The Memory Keeper", emoji: "🔵",
        color: "#ff75a8", badge: "badge-pink",
        line: "I store energy in an electric field between my plates.",
        formula: "Q = C × V",
        topics: ["Capacitor", "RC Circuits", "Filters", "Energy Storage"]
    },
    indu: {
        name: "Indu", concept: "Inductance", role: "The Magnetic Field Wizard", emoji: "🌀",
        color: "#9b8cff", badge: "badge-violet",
        line: "I resist changes in current using magnetic fields.",
        formula: "V = L × dI/dt",
        topics: ["Inductor", "RL Circuits", "Magnetic Field", "SMPS"]
    },
    dio: {
        name: "Dio", concept: "Diode", role: "The One-Way Guard", emoji: "🛡️",
        color: "#60a5fa", badge: "badge-blue",
        line: "Current goes ONE WAY through me. Try the other and I block you.",
        formula: "If: Vd > Vth → conducts",
        topics: ["Diode", "Rectifier", "PN Junction", "Zener"]
    },
    transi: {
        name: "Transi", concept: "Transistor", role: "The Switch/Amplifier", emoji: "🤖",
        color: "#fb923c", badge: "badge-amber",
        line: "A tiny signal in my base controls a large current. I am the revolution.",
        formula: "Ic = β × Ib",
        topics: ["BJT", "MOSFET", "Amplifier", "Switching"]
    },
    shorty: {
        name: "Shorty", concept: "Short Circuit", role: "The Chaos Agent", emoji: "💥",
        color: "#f87171", badge: "badge-red",
        line: "HAHA! Zero resistance! Current goes WILD! And things break!",
        formula: "R = 0 → I = ∞ (DANGER!)",
        topics: ["Common Mistakes", "Debugging", "Safety", "Protection"]
    }
};

/* ============================================================
   ECE WORLDS
============================================================ */
const domains = [
    { id: "ece-zero",       number: "01", title: "ECE Zero",            icon: "🌱", color: "#7fffb2", level: "Absolute Beginner", description: "Start from nothing. We teach every concept from the atom up. No assumptions.", wc: "rgba(127,255,178,.06)" },
    { id: "circuit-city",   number: "02", title: "Circuit City",        icon: "🔌", color: "#36d9d9", level: "Beginner", description: "Ohm's Law, KCL, KVL, Series, Parallel, Thevenin — the complete circuit toolkit.", wc: "rgba(54,217,217,.05)" },
    { id: "component-city", number: "03", title: "Component City",      icon: "🧩", color: "#ffc14d", level: "Beginner", description: "Every component — resistor to transistor — with symbols, working, and real simulations.", wc: "rgba(255,193,77,.05)" },
    { id: "semiconductor",  number: "04", title: "Semiconductor World", icon: "💎", color: "#a78bfa", level: "Intermediate", description: "PN junction, BJT, MOSFET — how silicon controls the universe.", wc: "rgba(167,139,250,.05)" },
    { id: "analog-world",   number: "05", title: "Analog World",        icon: "📈", color: "#f472b6", level: "Intermediate", description: "Amplifiers, oscillators, op-amps, filters — continuous signals mastered.", wc: "rgba(244,114,182,.05)" },
    { id: "digital-world",  number: "06", title: "Digital World",       icon: "🔢", color: "#60a5fa", level: "Intermediate", description: "Binary, Boolean algebra, logic gates, flip-flops, counters, memory.", wc: "rgba(96,165,250,.05)" },
    { id: "signal-city",    number: "07", title: "Signal City",         icon: "〽️", color: "#34d399", level: "Intermediate", description: "Fourier, Laplace, Z-transform, convolution, systems — signals decoded.", wc: "rgba(52,211,153,.05)" },
    { id: "comm-world",     number: "08", title: "Communication World", icon: "📡", color: "#fb923c", level: "Advanced", description: "AM, FM, modulation, Shannon capacity, digital communication systems.", wc: "rgba(251,146,60,.05)" },
    { id: "em-world",       number: "09", title: "EM World",            icon: "🌐", color: "#e879f9", level: "Advanced", description: "Maxwell, fields, waves, transmission lines, antennas.", wc: "rgba(232,121,249,.05)" },
    { id: "micro-world",    number: "10", title: "Microprocessor World",icon: "🖥️", color: "#67e8f9", level: "Advanced", description: "8085, 8086, architecture, instruction sets, interfacing.", wc: "rgba(103,232,249,.05)" },
    { id: "embedded-world", number: "11", title: "Embedded World",      icon: "🤖", color: "#a3e635", level: "Advanced", description: "MCUs, GPIO, UART, SPI, I2C, RTOS, real-time programming.", wc: "rgba(163,230,53,.05)" },
    { id: "control-world",  number: "12", title: "Control World",       icon: "🎛️", color: "#fbbf24", level: "Advanced", description: "Open loop, closed loop, PID, Bode, Nyquist, stability.", wc: "rgba(251,191,36,.05)" },
    { id: "dsp-world",      number: "13", title: "DSP World",           icon: "🎵", color: "#c084fc", level: "Advanced", description: "DFT, FFT, FIR, IIR — digital signal processing in full.", wc: "rgba(192,132,252,.05)" },
    { id: "vlsi-world",     number: "14", title: "VLSI World",          icon: "🔬", color: "#38bdf8", level: "Advanced", description: "CMOS, fabrication, Verilog, FPGA, ASIC, timing, SoC.", wc: "rgba(56,189,248,.05)" },
    { id: "power-world",    number: "15", title: "Power World",         icon: "⚡", color: "#facc15", level: "Advanced", description: "Buck, Boost, rectifiers, inverters, SMPS, motor drives, EVs.", wc: "rgba(250,204,21,.05)" },
    { id: "mixed-signal",   number: "16", title: "Mixed Signal World",  icon: "🔀", color: "#f87171", level: "Expert", description: "ADC, DAC, PLL, PMIC — bridging analog and digital.", wc: "rgba(248,113,113,.05)" }
];

/* ============================================================
   PREREQUISITES MAP
============================================================ */
const prereqs = {
    "charge":       [],
    "voltage":      ["charge"],
    "current":      ["charge"],
    "resistance":   ["voltage", "current"],
    "ohms-law":     ["voltage", "current", "resistance"],
    "power-energy": ["ohms-law"],
    "series":       ["ohms-law"],
    "parallel":     ["ohms-law"],
    "kcl":          ["current", "parallel"],
    "kvl":          ["voltage", "series"],
    "voltage-divider": ["series"],
    "current-divider": ["parallel"],
    "ac-basics":    ["voltage", "current"]
};

function isUnlocked(id) {
    const pList = prereqs[id];
    if (!pList || pList.length === 0) return true;
    const mastered = DB.getMastered();
    return pList.every(p => mastered.includes(p));
}

/* ============================================================
   COMPLETE ECE ZERO LESSONS — FIRST VERTICAL SLICE
============================================================ */
const lessons = {

    "charge": {
        eyebrow: "ECE ZERO · 01 · Absolute Beginner",
        title: "What is Electric Charge?",
        subtitle: "Every ECE story starts with a tiny particle called the electron.",
        mascot: "volto",
        xp: 30,
        hook: "Your phone has billions of tiny particles moving RIGHT NOW. What are they?",
        visual: "atom",
        simple: "Everything you see is made of atoms. Atoms have electrons (negative) and protons (positive). When electrons move, we call that electricity. Charge is just how much of this electrical 'stuff' something has. A positive charge means it lost electrons. A negative charge means it gained electrons.",
        mascotText: "I'm Volto! And let me tell you — charge is where I get my power. When charges separate, they create a potential difference... that's where I come in! Remember: SAME charges REPEL, OPPOSITE charges ATTRACT.",
        engineer: "Electric charge (Q) is a fundamental property of matter. Electrons carry charge of -1.6 × 10⁻¹⁹ Coulombs each. The SI unit of charge is the Coulomb (C). Q = n × e, where n = number of electrons and e = 1.6 × 10⁻¹⁹ C. Like charges repel, unlike charges attract (Coulomb's Law).",
        formula: "Q = n × e",
        formulaVars: [["Q", "Charge", "Coulombs (C)"], ["n", "Number of electrons", "dimensionless"], ["e", "Elementary charge", "1.6×10⁻¹⁹ C"]],
        real: "Static electricity when you rub a balloon. Lightning — massive charge separation. Your phone's touchscreen detects tiny charges from your finger. Every electronic device moves charges through circuits.",
        quizPool: [
            { q: "What is the unit of electric charge?", opts: ["Volt", "Ampere", "Coulomb", "Ohm"], ans: 2, exp: "Charge is measured in Coulombs (C), named after Charles-Augustin de Coulomb." },
            { q: "What charge does an electron carry?", opts: ["Positive", "Negative", "Neutral", "Variable"], ans: 1, exp: "Electrons carry negative charge of -1.6 × 10⁻¹⁹ Coulombs each." },
            { q: "What happens when like charges meet?", opts: ["They attract", "They repel", "They neutralize", "Nothing"], ans: 1, exp: "Like charges (both + or both -) repel each other. Opposite charges attract." },
            { q: "If an object gains electrons, it becomes:", opts: ["Positively charged", "Negatively charged", "Neutral", "Magnetic"], ans: 1, exp: "Gaining electrons adds negative charge, making the object negatively charged." },
            { q: "How many electrons make 1 Coulomb of charge?", opts: ["6.24 × 10¹⁸", "1.6 × 10⁻¹⁹", "6.24 × 10⁻¹⁹", "1 million"], ans: 0, exp: "1 Coulomb = 6.24 × 10¹⁸ electrons (since each electron = 1.6×10⁻¹⁹ C)." },
            { q: "Lightning occurs because:", opts: ["The sky is cold", "Large charge separation between clouds and ground", "Rain creates current", "Wind creates voltage"], ans: 1, exp: "Lightning is a massive discharge due to charge separation between clouds and the ground." }
        ],
        next: "voltage"
    },

    "voltage": {
        eyebrow: "ECE ZERO · 02 · Absolute Beginner",
        title: "Voltage — The Electric Push",
        subtitle: "Without voltage, electrons just sit still. Voltage is what makes them move.",
        mascot: "volto",
        xp: 30,
        hook: "Why does current only flow when you connect a battery? What does the battery actually do?",
        visual: "battery",
        simple: "Think of voltage like water pressure in a pipe. Higher pressure = more water flows. Voltage is the electrical 'pressure' that pushes electrons through a circuit. No voltage = no electron movement = no electricity. A 9V battery creates 9 volts of pressure difference between its terminals.",
        mascotText: "That's ME! Volto! I am voltage — also called potential difference or EMF. I am measured between TWO points. Without me, Curro (Current) has no reason to flow. The bigger I am, the harder electrons are pushed through Resi (Resistance).",
        engineer: "Voltage (V) is the work done per unit charge in moving charge between two points. V = W/Q (Volts = Joules/Coulombs). It is a relative quantity — always measured between two points. EMF (Electromotive Force) is the voltage produced by a source. Potential difference is the voltage between any two circuit points.",
        formula: "V = W / Q",
        formulaVars: [["V", "Voltage", "Volts (V)"], ["W", "Work / Energy", "Joules (J)"], ["Q", "Charge", "Coulombs (C)"]],
        real: "AA battery: 1.5V. Phone battery: ~3.7V. Car battery: 12V. Wall outlet (India): 230V AC. Power transmission lines: 11,000V to 400,000V.",
        quizPool: [
            { q: "What is voltage?", opts: ["Flow of electrons", "Work done per unit charge", "Number of electrons", "Resistance to flow"], ans: 1, exp: "Voltage is work done per unit charge: V = W/Q, measured in Volts." },
            { q: "A 9V battery means:", opts: ["9 Amperes flow", "9 Watts of power", "9 Joules per Coulomb of potential difference", "9 Ohms of resistance"], ans: 2, exp: "9V means 9 Joules of energy is given to each Coulomb of charge." },
            { q: "Voltage is always measured:", opts: ["At a single point", "Between two points", "Relative to current", "In Amperes"], ans: 1, exp: "Voltage is a relative quantity — always measured between two points (potential difference)." },
            { q: "What happens if voltage across a circuit is zero?", opts: ["Maximum current flows", "No current flows", "Current doubles", "Resistance increases"], ans: 1, exp: "No voltage means no push, so no current will flow (assuming no other EMF)." },
            { q: "Which device converts chemical energy to electrical voltage?", opts: ["Resistor", "Capacitor", "Battery", "Inductor"], ans: 2, exp: "A battery (electrochemical cell) converts chemical energy into electrical potential difference (EMF)." },
            { q: "Indian household voltage is:", opts: ["110V AC", "230V AC", "12V DC", "5V DC"], ans: 1, exp: "India uses 230V AC at 50Hz for residential supply." }
        ],
        next: "current"
    },

    "current": {
        eyebrow: "ECE ZERO · 03 · Absolute Beginner",
        title: "Current — The Flow of Charge",
        subtitle: "Voltage creates the push. Current is the actual movement that results.",
        mascot: "curro",
        xp: 30,
        hook: "When you switch on a bulb, what actually flows through the wire?",
        visual: "current-flow",
        simple: "Current is the actual flow of electric charges (electrons) through a conductor. Think of it like water flowing in a pipe. Voltage is the pressure, current is the flow rate. More voltage (pressure) → more current (flow). The wire is the pipe.",
        mascotText: "I'm Curro! I'm always moving — I NEVER sit still when Volto is around. I'm measured in Amperes (A). 1 Ampere means 1 Coulomb of charge passes a point every second. Big circuits with lots of current get HOT — that's Resi absorbing my energy as heat!",
        engineer: "Electric current (I) is the rate of flow of electric charge. I = Q/t (Amperes = Coulombs/second). Conventional current flows from + to − (positive terminal to negative terminal). Actual electron flow is − to + (opposite). For most circuit analysis, use conventional current direction.",
        formula: "I = Q / t",
        formulaVars: [["I", "Current", "Amperes (A)"], ["Q", "Charge", "Coulombs (C)"], ["t", "Time", "Seconds (s)"]],
        real: "LED: ~20mA. Phone charging: ~1-3A. Air conditioner: ~10-15A. Electric car charging: 32-400A. Lightning bolt: ~30,000A (for microseconds).",
        quizPool: [
            { q: "Current is defined as:", opts: ["Voltage divided by resistance", "Rate of charge flow", "Energy per unit charge", "Force on a charge"], ans: 1, exp: "I = Q/t — current is the rate of flow of electric charge." },
            { q: "1 Ampere equals:", opts: ["1 Volt per Ohm only", "1 Coulomb per second", "1 Watt per Volt", "1 Joule per Coulomb"], ans: 1, exp: "1 Ampere = 1 Coulomb of charge flowing past a point per second." },
            { q: "In which direction does conventional current flow?", opts: ["From − to +", "From + to −", "In both directions simultaneously", "Perpendicular to the wire"], ans: 1, exp: "Conventional current flows from + (positive) to − (negative) terminal, opposite to actual electron flow." },
            { q: "A circuit carries 2A for 3 seconds. What charge flows?", opts: ["1.5 C", "6 C", "0.67 C", "5 C"], ans: 1, exp: "Q = I × t = 2A × 3s = 6 Coulombs." },
            { q: "If a wire carries 500mA, that is:", opts: ["500 A", "0.5 A", "5000 A", "0.05 A"], ans: 1, exp: "500 mA = 500 × 10⁻³ A = 0.5 Amperes. 'milli' means ×10⁻³." },
            { q: "What actually moves in a wire when current flows?", opts: ["Protons", "Neutrons", "Electrons", "Photons"], ans: 2, exp: "Electrons (negative charges) physically move through the conductor, opposite to conventional current direction." }
        ],
        next: "resistance"
    },

    "resistance": {
        eyebrow: "ECE ZERO · 04 · Absolute Beginner",
        title: "Resistance — The Opposition",
        subtitle: "Not everything lets electricity flow easily. Resistance is that opposition.",
        mascot: "resi",
        xp: 30,
        hook: "Why does a thin wire heat up when current flows, but a thick copper wire doesn't?",
        visual: "resistor",
        simple: "Resistance is how much a material opposes the flow of current. Imagine current trying to push through a narrow pipe — it's harder. Materials with HIGH resistance (insulators) barely let current through. Materials with LOW resistance (conductors) let it flow freely. Resistors are components designed to provide a specific resistance.",
        mascotText: "I'm Resi! People think I'm the enemy of current — but I'm actually the CONTROLLER. Without me, circuits would be dangerous! I protect LEDs, limit current to safe levels, create voltage dividers, and control gain in amplifiers. My unit is Ohm (Ω). My value depends on material, length, cross-section, and temperature.",
        engineer: "Resistance (R) is the property of a conductor that opposes current flow. Measured in Ohms (Ω). R = V/I (from Ohm's Law). Also: R = ρL/A, where ρ = resistivity, L = length, A = cross-sectional area. Temperature affects resistance — for metals, R increases with temperature (positive temperature coefficient).",
        formula: "R = ρL / A",
        formulaVars: [["R", "Resistance", "Ohms (Ω)"], ["ρ", "Resistivity", "Ω·m"], ["L", "Length", "meters (m)"], ["A", "Cross-sectional area", "m²"]],
        real: "Resistor in an LED circuit prevents burn-out. Heating element in a kettle (high resistance heats up). Copper wire (low resistance, minimal loss). Body resistance ~1000Ω to 100kΩ (important for electrical safety!).",
        quizPool: [
            { q: "What is the unit of resistance?", opts: ["Volt", "Ampere", "Ohm", "Siemens"], ans: 2, exp: "Resistance is measured in Ohms (Ω), named after Georg Simon Ohm." },
            { q: "Resistance increases when wire length:", opts: ["Decreases", "Increases", "Stays the same", "Doubles the area"], ans: 1, exp: "R = ρL/A — longer wire → higher resistance, since electrons collide more." },
            { q: "A thicker wire has:", opts: ["More resistance", "Less resistance", "Same resistance", "Zero resistance"], ans: 1, exp: "Larger cross-sectional area (A) → smaller resistance. More space = easier flow." },
            { q: "Which material has the lowest resistance?", opts: ["Rubber", "Glass", "Silver/Copper", "Silicon"], ans: 2, exp: "Silver has the lowest resistivity, followed by copper (used in wires for this reason)." },
            { q: "For metals, resistance changes with temperature:", opts: ["Decreases with temperature", "Increases with temperature", "Not affected", "Becomes zero"], ans: 1, exp: "Metals have positive temperature coefficient — resistance increases with temperature (more atomic vibration)." },
            { q: "An insulator has:", opts: ["Very low resistance", "Very high resistance", "Zero resistance", "Negative resistance"], ans: 1, exp: "Insulators (rubber, glass, plastic) have very high resistance — they strongly oppose current flow." }
        ],
        next: "ohms-law"
    },

    "ohms-law": {
        eyebrow: "ECE ZERO · 05 · Absolute Beginner",
        title: "Ohm's Law — The Core Relationship",
        subtitle: "V = I × R. The most important equation in all of electronics.",
        mascot: "resi",
        xp: 40,
        hook: "You have a 9V battery and a 100Ω resistor. How much current flows? Can you calculate it?",
        visual: "ohms-law",
        simple: "Ohm's Law says: Voltage = Current × Resistance. Think about it: more voltage (pressure) → more current. More resistance → less current. This simple relationship governs almost everything in basic circuits. Double the voltage = double the current. Double the resistance = half the current.",
        mascotText: "Volto, Curro and I have a perfect relationship described by Ohm's Law! V = I × R. If Volto pushes harder (↑V), Curro flows more (↑I). If I resist more (↑R), Curro flows less (↓I). You can rearrange this equation in THREE ways: V=IR, I=V/R, R=V/I. Master all three forms!",
        engineer: "Ohm's Law: V = I × R. Valid for ohmic (linear) materials at constant temperature. Non-ohmic devices (diodes, transistors) don't follow this law directly. Forms: V = IR (find voltage), I = V/R (find current), R = V/I (find resistance). Power: P = VI = I²R = V²/R.",
        formula: "V = I × R",
        formulaVars: [["V", "Voltage", "Volts (V)"], ["I", "Current", "Amperes (A)"], ["R", "Resistance", "Ohms (Ω)"]],
        real: "Calculate LED resistor: R = (Vs - Vf)/I. Find current draw of a heater. Design voltage dividers. Check if a fuse rating is appropriate. Verify circuit safety before powering.",
        quizPool: [
            { q: "Ohm's Law states:", opts: ["V = I + R", "V = I × R", "V = I / R", "I = V × R"], ans: 1, exp: "Ohm's Law: V = I × R. Voltage equals Current multiplied by Resistance." },
            { q: "A 12V battery connects to a 4Ω resistor. Current = ?", opts: ["48 A", "3 A", "0.33 A", "8 A"], ans: 1, exp: "I = V/R = 12/4 = 3 Amperes." },
            { q: "A 5Ω resistor carries 2A. Voltage across it = ?", opts: ["2.5 V", "7 V", "10 V", "3 V"], ans: 2, exp: "V = I × R = 2 × 5 = 10 Volts." },
            { q: "A 24V source drives 6A. Resistance = ?", opts: ["144 Ω", "18 Ω", "4 Ω", "0.25 Ω"], ans: 2, exp: "R = V/I = 24/6 = 4 Ohms." },
            { q: "If resistance doubles (same V), current:", opts: ["Doubles", "Halves", "Stays same", "Quadruples"], ans: 1, exp: "I = V/R. If R doubles and V stays same, I = V/(2R) = half the original current." },
            { q: "Ohm's Law holds for:", opts: ["All devices always", "Diodes and transistors", "Ohmic/linear materials at constant temperature", "Only at high voltages"], ans: 2, exp: "Ohm's Law applies to ohmic materials (metals, resistors) at constant temperature. Diodes and transistors are non-ohmic." }
        ],
        next: "power-energy"
    },

    "power-energy": {
        eyebrow: "ECE ZERO · 06 · Absolute Beginner",
        title: "Power & Energy",
        subtitle: "How much work is electricity doing? How much does it cost?",
        mascot: "volto",
        xp: 35,
        hook: "Why does your electricity bill go up when you use a 1000W AC but not a 5W LED?",
        visual: "power",
        simple: "Power is how fast energy is used. A 100W bulb uses 100 Joules every second. Energy is the total work done. Run a 100W bulb for 1 hour = 100 Watt-hours = 0.1 kWh of energy. Your electricity bill is charged per kWh (Unit). Higher power = higher bill = more heat in components.",
        mascotText: "Power is where I (Volto) and Curro work TOGETHER. P = V × I. I provide the push, Curro does the flowing, and together we do work — lighting bulbs, driving motors, charging batteries. The formula P = I²R is why resistors heat up — Resi is converting electrical energy into heat!",
        engineer: "Electrical Power P = VI = I²R = V²/R (all three forms from Ohm's Law substitution). Energy E = P × t (Watt-seconds or Joules). Commercial unit: kWh (kilowatt-hour) = 3.6 MJ. Maximum Power Transfer theorem: power to load is maximum when R_load = R_source (Thevenin resistance).",
        formula: "P = V × I = I²R = V²/R",
        formulaVars: [["P", "Power", "Watts (W)"], ["V", "Voltage", "Volts (V)"], ["I", "Current", "Amperes (A)"], ["R", "Resistance", "Ohms (Ω)"]],
        real: "1kW AC for 8 hours = 8 kWh = 8 Units on bill. Smartphone charger: ~10W. Laptop: ~65W. Electric car motor: ~100kW. India power tariff: ~₹5-8 per Unit (kWh).",
        quizPool: [
            { q: "Power formula is:", opts: ["P = V + I", "P = V × I", "P = V / I", "P = I / V"], ans: 1, exp: "P = V × I. Power = Voltage × Current, measured in Watts (W)." },
            { q: "A 6V circuit carries 3A. Power = ?", opts: ["2 W", "9 W", "18 W", "0.5 W"], ans: 2, exp: "P = V × I = 6 × 3 = 18 Watts." },
            { q: "A 10Ω resistor carries 2A. Power dissipated = ?", opts: ["5 W", "20 W", "40 W", "2 W"], ans: 2, exp: "P = I²R = 2² × 10 = 4 × 10 = 40 Watts." },
            { q: "1 kWh equals:", opts: ["1000 Joules", "3.6 MJ", "1 Watt-hour", "100 Joules"], ans: 1, exp: "1 kWh = 1000W × 3600s = 3,600,000 J = 3.6 MJ." },
            { q: "Which uses more power: 1kΩ resistor at 10V or 100Ω at 10V?", opts: ["1kΩ", "100Ω", "Equal", "Depends on time"], ans: 1, exp: "P = V²/R. Same V: larger R → smaller P. 100Ω: P=100/100=1W vs 1kΩ: P=100/1000=0.1W." },
            { q: "Your electricity bill charges you per:", opts: ["Watt", "Ampere", "kWh (Unit)", "Joule directly"], ans: 2, exp: "Electricity is billed per kWh (kilowatt-hour), often called 'Unit' in India." }
        ],
        next: "series"
    },

    "series": {
        eyebrow: "ECE ZERO · 07 · Beginner",
        title: "Series Circuits",
        subtitle: "When components share the same current path — that's series.",
        mascot: "curro",
        xp: 35,
        hook: "Why did old Christmas lights go completely dark when ONE bulb burned out?",
        visual: "series-circuit",
        simple: "In a series circuit, components are connected end-to-end in a single loop. Current has only ONE path. ALL the current flows through every component. Like a single water pipe with multiple valves — all in a row. The total resistance adds up. If one component breaks (open circuit), ALL current stops — that's why old series lights all go dark when one bulb fails.",
        mascotText: "In series, I (Curro) have no choice — I go through EVERY component, one by one! My value is the same everywhere. But Volto (voltage) gets divided between the components. Each resistor 'uses up' some voltage. Total resistance = sum of all resistors. This is KVL in action!",
        engineer: "Series circuit: same current through all elements. Total resistance: Rtotal = R1 + R2 + R3 + ... Voltage divides: V1 = I×R1, V2 = I×R2 (proportional to resistance). Sum of voltages = source voltage (KVL). Equivalent resistance always larger than any single resistor in the series combination.",
        formula: "R_total = R₁ + R₂ + R₃ ...",
        formulaVars: [["R_total", "Total Resistance", "Ohms (Ω)"], ["R₁,R₂...", "Individual Resistors", "Ohms (Ω)"]],
        real: "Old Christmas tree lights (series — one goes out, all go out). Fuses are in series — if too much current flows, fuse breaks the entire circuit. Series resistors to limit current to LEDs.",
        quizPool: [
            { q: "In a series circuit, current is:", opts: ["Different at each component", "Same through all components", "Zero", "Divided equally"], ans: 1, exp: "In series, there's one path — same current flows through every component." },
            { q: "Three 10Ω resistors in series. Total R = ?", opts: ["3.33 Ω", "10 Ω", "30 Ω", "100 Ω"], ans: 2, exp: "Series: Rtotal = R1+R2+R3 = 10+10+10 = 30 Ω." },
            { q: "In a series circuit, voltage across each resistor is:", opts: ["Equal always", "Zero", "Proportional to resistance", "Inversely proportional"], ans: 2, exp: "V = IR — larger resistor gets more voltage since same I flows through all." },
            { q: "One bulb in a series circuit fails (open). Other bulbs:", opts: ["Stay on brighter", "Stay on normally", "Go off", "Flash"], ans: 2, exp: "Open circuit breaks the only path for current — all components stop working." },
            { q: "12V source, 3Ω and 1Ω in series. Voltage across 3Ω = ?", opts: ["3 V", "9 V", "12 V", "4 V"], ans: 1, exp: "Rtotal=4Ω, I=12/4=3A, V(3Ω)=3×3=9V. Voltage divides proportionally to resistance." },
            { q: "Series resistors result in Rtotal that is:", opts: ["Always smaller than smallest", "Always larger than largest", "Equal to average", "Same as largest"], ans: 1, exp: "Series R adds up — total is always greater than any individual resistor." }
        ],
        next: "parallel"
    },

    "parallel": {
        eyebrow: "ECE ZERO · 08 · Beginner",
        title: "Parallel Circuits",
        subtitle: "Multiple paths for current — the way your home electrical wiring works.",
        mascot: "curro",
        xp: 35,
        hook: "Why can you turn off one light in your house without affecting the others?",
        visual: "parallel-circuit",
        simple: "In a parallel circuit, components are connected side by side, sharing the same two nodes. Current splits and takes multiple paths. Each component gets the FULL source voltage. Like multiple water pipes side by side — each carries its own flow. One path can break without affecting the others. Your home wiring is parallel — each appliance gets 230V and has its own switch.",
        mascotText: "In parallel, I (Curro) split up! Each branch gets the full Voltage (Volto stays constant across parallel branches). But total current = sum of all branch currents. And total resistance? It DECREASES when you add parallel paths — more paths = easier flow overall. The formula is 1/Rtotal = 1/R1 + 1/R2...",
        engineer: "Parallel circuit: same voltage across all branches. Branch current: In = V/Rn. Total current: Itotal = I1+I2+...+In (KCL). Equivalent resistance: 1/Rtotal = 1/R1 + 1/R2 +... For two resistors: Rtotal = (R1×R2)/(R1+R2). Rtotal always LESS THAN the smallest individual resistor.",
        formula: "1/R_total = 1/R₁ + 1/R₂ + 1/R₃ ...",
        formulaVars: [["R_total", "Total Resistance", "Ohms (Ω)"], ["R₁,R₂...", "Individual Resistors", "Ohms (Ω)"]],
        real: "Home wiring — parallel so each device gets full voltage independently. Car electrical systems. Battery banks in parallel (to increase capacity/current). Hospital equipment — each device on its own parallel branch with its own protection.",
        quizPool: [
            { q: "In a parallel circuit, voltage across each branch is:", opts: ["Divided equally", "Same (equal to source)", "Zero", "Proportional to resistance"], ans: 1, exp: "All parallel branches connect to the same two nodes, so they share the same voltage." },
            { q: "Two 10Ω resistors in parallel. Total R = ?", opts: ["20 Ω", "10 Ω", "5 Ω", "100 Ω"], ans: 2, exp: "Rtotal = (R1×R2)/(R1+R2) = (10×10)/(10+10) = 100/20 = 5 Ω." },
            { q: "One branch of a parallel circuit opens. Other branches:", opts: ["Stop working", "Work normally", "Work at half voltage", "Blow up"], ans: 1, exp: "Other branches still have their own paths — they continue to receive full voltage and operate normally." },
            { q: "Adding more parallel resistors:", opts: ["Increases total R", "Decreases total R", "No effect on R", "Makes R equal average"], ans: 1, exp: "More parallel paths = more conductance = less total resistance." },
            { q: "12V source, 4Ω and 6Ω in parallel. Total current = ?", opts: ["1.2 A", "5 A", "3 A", "2 A"], ans: 1, exp: "I1=12/4=3A, I2=12/6=2A, Itotal=3+2=5A." },
            { q: "Parallel Rtotal is always:", opts: ["Greater than all resistors", "Less than smallest resistor", "Equal to largest", "Equal to average"], ans: 1, exp: "Parallel combination always produces resistance less than the smallest individual resistor." }
        ],
        next: "kcl"
    },

    "kcl": {
        eyebrow: "ECE ZERO · 09 · Beginner",
        title: "KCL — Kirchhoff's Current Law",
        subtitle: "Current is conserved at every node. What goes in must come out.",
        mascot: "curro",
        xp: 40,
        hook: "At a road junction, the cars that enter must equal the cars that leave. Does electricity work the same way?",
        visual: "kcl",
        simple: "KCL says: At any junction (node) in a circuit, the total current entering equals the total current leaving. Charge cannot be created or destroyed — it must be conserved. It's like traffic: 10 cars enter a roundabout per minute, 10 cars must leave per minute. Current works exactly the same way at circuit nodes.",
        mascotText: "I (Curro) follow traffic laws! At every node, what flows in = what flows out. This is KCL and it's based on conservation of charge. Mathematically: ΣI_in = ΣI_out, or ΣI = 0 at any node. Use this to find unknown currents in complex circuits. It's the basis of nodal analysis!",
        engineer: "KCL: The algebraic sum of currents at any node = 0. ΣI = 0 (currents entering positive, leaving negative, or vice versa — just be consistent). Based on conservation of charge. Enables nodal analysis for complex circuits. Works for any circuit topology at any frequency (with care at high frequencies regarding displacement current).",
        formula: "ΣI_entering = ΣI_leaving",
        formulaVars: [["ΣI", "Sum of all currents", "Amperes (A)"]],
        real: "PCB junction analysis. Power distribution networks. Fault detection — if current in ≠ current out, there's a leakage. Multi-branch circuits in power systems.",
        quizPool: [
            { q: "KCL states that at a node:", opts: ["Voltages sum to zero", "Sum of currents = zero", "Resistance adds up", "Power is constant"], ans: 1, exp: "KCL: The algebraic sum of all currents at a node equals zero (conservation of charge)." },
            { q: "3A and 5A enter a node. Current leaving = ?", opts: ["2 A", "8 A", "15 A", "1.67 A"], ans: 1, exp: "KCL: I_out = I_in1 + I_in2 = 3+5 = 8A." },
            { q: "KCL is based on:", opts: ["Conservation of energy", "Conservation of charge", "Ohm's Law", "Newton's Law"], ans: 1, exp: "KCL is based on conservation of charge — charge cannot accumulate at a node (in steady state)." },
            { q: "Two branches leave a node carrying 2A and 3A. Current entering = ?", opts: ["1 A", "5 A", "6 A", "1.5 A"], ans: 1, exp: "By KCL, current entering = current leaving = 2+3 = 5A." },
            { q: "KCL is used for:", opts: ["Mesh analysis", "Nodal analysis", "Finding equivalent resistance", "Thevenin theorem"], ans: 1, exp: "KCL is the basis of nodal analysis — writing equations at each node." },
            { q: "In a series circuit, KCL tells us current in each element is:", opts: ["Different", "Same", "Zero", "Proportional to voltage"], ans: 1, exp: "Series = single path = one node. KCL confirms same current everywhere in series." }
        ],
        next: "kvl"
    },

    "kvl": {
        eyebrow: "ECE ZERO · 10 · Beginner",
        title: "KVL — Kirchhoff's Voltage Law",
        subtitle: "The sum of voltages around any closed loop is always zero.",
        mascot: "volto",
        xp: 40,
        hook: "If a battery provides 9V, and you have three resistors — do their voltages add up to exactly 9V?",
        visual: "kvl",
        simple: "KVL says: If you go around any closed loop in a circuit, the voltages you gain and lose must add up to zero. Think of it like elevation: if you walk in a circle back to where you started, your net elevation change is zero. A battery 'gives' voltage, resistors 'use' voltage. The giving and using must be equal — that's KVL.",
        mascotText: "KVL is MY law! I (Volto) get supplied by the source, then distributed to every component in the loop. What the source gives, the loads take. ΣV = 0 around any loop. Voltage rises (sources) = Voltage drops (loads). This is conservation of energy applied to voltage. It's the basis of mesh analysis!",
        engineer: "KVL: The algebraic sum of voltages around any closed loop = 0. Convention: voltage rises (sources) are positive, voltage drops (resistors) are negative (or vice versa — be consistent). ΣV = 0. Based on conservation of energy. Enables mesh analysis (write KVL equations for each independent loop).",
        formula: "ΣV_loop = 0  →  V_source = V₁ + V₂ + V₃",
        formulaVars: [["ΣV", "Sum of voltages in loop", "Volts (V)"], ["V_source", "Source EMF", "Volts (V)"]],
        real: "Verify battery connections in series-parallel banks. Analyze multi-loop circuits. Audio amplifier circuit analysis. Power supply design verification.",
        quizPool: [
            { q: "KVL states that in a closed loop:", opts: ["All currents sum to zero", "All voltages sum to zero", "Resistance is conserved", "Power is zero"], ans: 1, exp: "KVL: Algebraic sum of all voltages in a closed loop = 0 (conservation of energy)." },
            { q: "A 12V source, R1 drops 7V, R2 drops ?V (series)", opts: ["19 V", "5 V", "7 V", "12 V"], ans: 1, exp: "KVL: V_source = V1+V2 → 12 = 7+V2 → V2 = 5V." },
            { q: "KVL is based on:", opts: ["Conservation of charge", "Conservation of mass", "Conservation of energy", "Ohm's Law"], ans: 2, exp: "KVL is based on conservation of energy — energy supplied by sources = energy consumed by loads." },
            { q: "KVL is used in:", opts: ["Nodal analysis", "Mesh analysis", "Finding node voltages", "Only DC circuits"], ans: 1, exp: "KVL equations written for each mesh/loop form the basis of mesh analysis." },
            { q: "Going around a loop, you encounter a 9V battery (rise) and one resistor. Voltage across resistor =?", opts: ["0 V", "18 V", "9 V", "4.5 V"], ans: 2, exp: "KVL: 9V (rise) - V_R (drop) = 0 → V_R = 9V." },
            { q: "Two batteries 6V and 4V in opposition (series). Net EMF =?", opts: ["10 V", "24 V", "2 V", "5 V"], ans: 2, exp: "KVL around the loop: 6-4 = 2V net EMF (one rises, one drops in same loop)." }
        ],
        next: "voltage-divider"
    },

    "voltage-divider": {
        eyebrow: "ECE ZERO · 11 · Beginner",
        title: "Voltage Divider",
        subtitle: "Get any voltage you want from a higher supply — using just two resistors.",
        mascot: "resi",
        xp: 35,
        hook: "Your microcontroller runs on 3.3V but your sensor outputs 5V. How do you scale it down safely?",
        visual: "voltage-divider",
        simple: "A voltage divider uses two resistors in series to split a voltage. The output is taken from the midpoint. The ratio of R2 to total resistance determines Vout. This is the most commonly used circuit in all of electronics! Sensors, microcontrollers, reference voltages — voltage dividers are everywhere.",
        mascotText: "Two of me (Resi) working together to share Volto's (Voltage) push! The formula Vout = Vin × R2/(R1+R2) is CRITICAL. If R1=R2, Vout = Vin/2. If R2 is larger, Vout is larger. Remember: this only works well when the load resistance is much larger than R2 (loading effect!).",
        engineer: "Voltage divider: Vout = Vin × R2/(R1+R2). Derivation from Ohm's Law and KVL: I = Vin/(R1+R2), Vout = I×R2. Loading effect: connecting a load Rload in parallel with R2 changes Vout. Accurate only when Rload >> R2. Used for: sensor interfaces, reference voltages, ADC input scaling, biasing.",
        formula: "Vout = Vin × R2 / (R1 + R2)",
        formulaVars: [["Vout", "Output Voltage", "Volts (V)"], ["Vin", "Input Voltage", "Volts (V)"], ["R1", "Top Resistor", "Ohms (Ω)"], ["R2", "Bottom Resistor", "Ohms (Ω)"]],
        real: "5V to 3.3V level shifter for microcontrollers. Potentiometer (variable voltage divider). Sensor conditioning circuits. Biasing transistor base voltage. Volume control in audio systems.",
        quizPool: [
            { q: "Voltage divider formula:", opts: ["Vout = Vin × R1/(R1+R2)", "Vout = Vin × R2/(R1+R2)", "Vout = Vin / R2", "Vout = Vin × R1×R2"], ans: 1, exp: "Vout = Vin × R2/(R1+R2). The output is across R2 (bottom resistor)." },
            { q: "R1=R2, Vin=10V. Vout = ?", opts: ["10 V", "2.5 V", "5 V", "20 V"], ans: 2, exp: "R1=R2 → Vout = 10 × R/(R+R) = 10 × 0.5 = 5V." },
            { q: "Voltage divider works accurately when the load resistance is:", opts: ["Much smaller than R2", "Equal to R2", "Much larger than R2", "Zero"], ans: 2, exp: "Loading effect: accurate only when Rload >> R2, otherwise Vout drops significantly." },
            { q: "R1=3kΩ, R2=1kΩ, Vin=12V. Vout = ?", opts: ["9 V", "3 V", "4 V", "1 V"], ans: 1, exp: "Vout = 12 × 1000/(3000+1000) = 12 × 0.25 = 3V." },
            { q: "A potentiometer is a:", opts: ["Fixed voltage divider", "Variable voltage divider", "Current divider", "Power amplifier"], ans: 1, exp: "A potentiometer is a variable voltage divider — the wiper adjusts R2/R1 ratio continuously." },
            { q: "Increasing R2 in a voltage divider (fixed R1, fixed Vin):", opts: ["Decreases Vout", "Increases Vout", "No effect", "Increases current"], ans: 1, exp: "Larger R2 → larger fraction R2/(R1+R2) → higher Vout." }
        ],
        next: "ac-basics"
    },

    "ac-basics": {
        eyebrow: "ECE ZERO · 12 · Beginner",
        title: "AC & DC — Two Kinds of Electricity",
        subtitle: "Your USB runs on DC. Your wall outlet runs on AC. Here's the difference.",
        mascot: "volto",
        xp: 35,
        hook: "Why does your phone charger need to convert AC from the wall to DC for the battery?",
        visual: "ac-dc",
        simple: "DC (Direct Current) flows in one constant direction — like from a battery. Voltage stays constant. AC (Alternating Current) reverses direction periodically — like the sine wave from your wall outlet. AC voltage goes +230V → 0 → -230V → 0 → repeat, 50 times per second in India. Most electronic circuits need DC, so chargers convert AC → DC.",
        mascotText: "I (Volto) come in two flavors! DC Volto is steady and reliable — batteries, USB, solar panels. AC Volto is dynamic and sinusoidal — power grid, generators. AC is used for transmission because voltage can be stepped up/down with transformers (reduces transmission losses). Electronics need DC, so we rectify AC using diodes!",
        engineer: "AC: v(t) = Vm sin(2πft). Vm = peak voltage, f = frequency. RMS voltage Vrms = Vm/√2 ≈ 0.707 × Vm. India: 230V RMS, 50Hz. Peak: 230√2 ≈ 325V. DC: constant voltage. AC advantages: easy transformation (transformers), long-distance transmission, efficient generation. DC advantages: required by electronics, batteries, solar.",
        formula: "v(t) = Vm × sin(2πft)  |  Vrms = Vm / √2",
        formulaVars: [["Vm", "Peak Voltage", "Volts"], ["f", "Frequency", "Hertz (Hz)"], ["Vrms", "RMS Voltage", "Volts (V)"]],
        real: "India grid: 230V AC 50Hz. USB: 5V DC. Phone battery: 3.7V DC. Laptop adapter: 230V AC → 19V DC. Generator: produces AC. Battery: DC. Solar panel: DC (needs inverter for AC grid).",
        quizPool: [
            { q: "What does AC stand for?", opts: ["Absolute Current", "Alternating Current", "Amplified Current", "Active Circuit"], ans: 1, exp: "AC = Alternating Current — the direction of current flow reverses periodically." },
            { q: "India's mains supply is:", opts: ["110V DC, 60Hz", "230V AC, 50Hz", "230V DC, 50Hz", "415V AC, 60Hz"], ans: 1, exp: "India: 230V RMS AC at 50Hz (three-phase: 415V line-to-line)." },
            { q: "Peak voltage if Vrms = 230V:", opts: ["230 V", "163 V", "325 V", "460 V"], ans: 2, exp: "Vpeak = Vrms × √2 = 230 × 1.414 ≈ 325V." },
            { q: "Why is AC used for power transmission?", opts: ["AC is safer", "AC can be transformed to high voltage easily", "AC is cheaper to generate", "AC needs no wires"], ans: 1, exp: "Transformers can step up AC voltage for efficient transmission (less current → less I²R loss)." },
            { q: "RMS voltage of AC equals DC voltage in terms of:", opts: ["Peak value", "Average value", "Heating effect (power)", "Frequency"], ans: 2, exp: "Vrms is the equivalent DC voltage that produces the same heating (power dissipation) in a resistor." },
            { q: "Frequency of AC is measured in:", opts: ["Volts", "Amperes", "Ohms", "Hertz"], ans: 3, exp: "Frequency (cycles per second) is measured in Hertz (Hz). India: 50Hz." }
        ],
        next: null
    }
};

/* ============================================================
   QUIZ DATA — Extra pools for Arena
============================================================ */
const quizData = {
    beginner: [
        { q: "What is the SI unit of electric charge?", opts: ["Volt", "Ampere", "Coulomb", "Ohm"], ans: 2, exp: "Coulomb (C) is the SI unit of charge. Named after Charles-Augustin de Coulomb." },
        { q: "Ohm's Law: if V=12V, R=4Ω, then I=?", opts: ["48A", "3A", "0.33A", "8A"], ans: 1, exp: "I = V/R = 12/4 = 3A" },
        { q: "Current is measured in:", opts: ["Volts", "Ohms", "Amperes", "Watts"], ans: 2, exp: "Current is measured in Amperes (A)." },
        { q: "Resistors in series: R1=5Ω, R2=10Ω. Total?", opts: ["2Ω","15Ω","50Ω","7.5Ω"], ans: 1, exp: "Series: Rtotal = 5+10 = 15Ω" },
        { q: "In parallel, voltage across all branches is:", opts: ["Divided", "Same", "Zero", "Doubled"], ans: 1, exp: "All parallel branches share the same voltage." },
        { q: "Power formula: P = ?", opts: ["V+I", "V×I", "V/I", "V-I"], ans: 1, exp: "P = V × I = I²R = V²/R" },
        { q: "KCL states: at a node, sum of currents =", opts: ["Voltage", "Zero", "Resistance", "Power"], ans: 1, exp: "KCL: sum of currents entering/leaving a node = 0" },
        { q: "KVL: sum of voltages in a closed loop =", opts: ["Source voltage", "Zero", "Total current", "Resistance"], ans: 1, exp: "KVL: algebraic sum of all voltages = 0" },
        { q: "1kΩ = how many Ohms?", opts: ["100","10000","1000","100000"], ans: 2, exp: "1kΩ = 1000Ω (kilo = ×1000)" },
        { q: "Which law says like charges repel?", opts: ["Ohm's Law", "Coulomb's Law", "KCL", "Faraday's Law"], ans: 1, exp: "Coulomb's Law describes the force between charges." }
    ],
    intermediate: [
        { q: "Thevenin voltage is the: ", opts: ["Short-circuit current", "Open-circuit voltage", "Norton current × Rth", "Source EMF only"], ans: 1, exp: "Vth = open-circuit voltage at the output terminals." },
        { q: "Norton equivalent: Inorton = ?", opts: ["Vth × Rth", "Vth / Rth", "Rth / Vth", "1/Vth"], ans: 1, exp: "Norton current = Vth/Rth." },
        { q: "Superposition: applies to:", opts: ["Non-linear circuits only", "Linear circuits", "Power only", "Resistors only"], ans: 1, exp: "Superposition applies to linear circuits with multiple sources." },
        { q: "Impedance of a capacitor at DC (f=0) is:", opts: ["Zero", "Infinite", "R value", "1 Ohm"], ans: 1, exp: "Xc = 1/(2πfC). At DC, f=0 → Xc = ∞. Capacitor blocks DC." },
        { q: "Impedance of an inductor at DC (f=0) is:", opts: ["Infinite", "Zero", "1 Ohm", "Depends on current"], ans: 1, exp: "Xl = 2πfL. At DC, f=0 → Xl = 0. Inductor is a short for DC." },
        { q: "Power factor = ?", opts: ["P/Q", "P/S", "Q/S", "S/P"], ans: 1, exp: "Power factor = Real Power (P) / Apparent Power (S) = cos(φ)." },
        { q: "RC time constant τ = ?", opts: ["R+C", "R/C", "R×C", "R-C"], ans: 2, exp: "τ = RC. At t=τ, capacitor charges to 63.2% of final voltage." },
        { q: "Resonance occurs when:", opts: ["R=0", "Xl=Xc", "V=I", "C=L"], ans: 1, exp: "Resonance: Xl = Xc → frequency ω₀ = 1/√(LC)" },
        { q: "Maximum power transfer: Rload = ?", opts: ["2×Rth", "Rth/2", "Rth", "Infinity"], ans: 2, exp: "Max power to load when Rload = Rth (Thevenin resistance of source)." },
        { q: "Which theorem reduces a complex circuit to Vs and Rs?", opts: ["Norton", "Superposition", "Thevenin", "KVL"], ans: 2, exp: "Thevenin theorem reduces any linear circuit to a voltage source Vth in series with Rth." }
    ],
    advanced: [
        { q: "Transfer function H(s) = Y(s)/X(s) is defined in which domain?", opts: ["Time", "Frequency", "Laplace", "Z"], ans: 2, exp: "Transfer functions use the Laplace domain (s-domain)." },
        { q: "Unity gain bandwidth of ideal op-amp:", opts: ["0 Hz", "Limited", "Infinity", "1 MHz"], ans: 2, exp: "Ideal op-amp: infinite gain-bandwidth product." },
        { q: "Nyquist sampling rate for 10kHz signal:", opts: ["5 kHz", "10 kHz", "20 kHz", "100 kHz"], ans: 2, exp: "Nyquist: fs ≥ 2×fmax = 2×10kHz = 20kHz minimum." },
        { q: "MOSFET threshold voltage (Vth): device conducts when Vgs:", opts: ["< Vth", "> Vth", "= 0", "= Vds"], ans: 1, exp: "For NMOS: conduction when Vgs > Vth (channel forms)." },
        { q: "CMOS inverter: when input HIGH, output is:", opts: ["HIGH", "LOW", "Floating", "Same"], ans: 1, exp: "CMOS inverter: NMOS on (pulls to GND) when input HIGH → output LOW." },
        { q: "Shannon capacity: C = B×log₂(1+SNR). B doubled, same SNR: C changes by:", opts: ["×1", "×2", "×4", "log₂(2)"], ans: 1, exp: "C is linear in B — doubling bandwidth doubles capacity (log₂(1+SNR) is the multiplier per Hz)." },
        { q: "Bode plot: -20dB/decade slope means:", opts: ["First-order high-pass", "First-order low-pass", "Second-order", "Underdamped system"], ans: 1, exp: "-20dB/decade (or -6dB/octave) is characteristic of a first-order low-pass filter rolloff." },
        { q: "Z-transform is used for:", opts: ["Continuous signals", "Discrete-time signals", "Only IIR filters", "Analog circuits"], ans: 1, exp: "Z-transform is the discrete-time equivalent of the Laplace transform." },
        { q: "In a BJT, current gain β = ?", opts: ["Ic/Ib", "Ib/Ic", "Ic/Ie", "Ie/Ib"], ans: 0, exp: "β (hFE) = Ic/Ib. Typical values 20–500." },
        { q: "PLL stands for:", opts: ["Phase Locked Loop", "Power Level Logic", "Programmable Logic Layer", "Phase Linear Loop"], ans: 0, exp: "PLL: Phase Locked Loop — synchronizes output oscillator phase to input reference." }
    ],
    rapid: [
        { q: "V=IR is:", opts: ["KVL","KCL","Ohm's Law","Power law"], ans: 2, exp: "Ohm's Law" },
        { q: "Unit of capacitance:", opts: ["Henry","Farad","Ohm","Weber"], ans: 1, exp: "Farad (F)" },
        { q: "Unit of inductance:", opts: ["Farad","Ohm","Henry","Tesla"], ans: 2, exp: "Henry (H)" },
        { q: "LED stands for:", opts: ["Low Energy Device","Light Emitting Diode","Linear Electronic Device","Logic Enable Driver"], ans: 1, exp: "Light Emitting Diode" },
        { q: "Op-amp ideal input impedance:", opts: ["Zero","Finite","Infinite","1MΩ"], ans: 2, exp: "Ideal op-amp: infinite input impedance." },
        { q: "NAND is NOT of:", opts: ["OR","AND","NOR","XOR"], ans: 1, exp: "NAND = NOT AND" },
        { q: "ADC converts:", opts: ["Digital to Analog","Analog to Digital","AC to DC","Amplifies signals"], ans: 1, exp: "ADC = Analog to Digital Converter" },
        { q: "UART is a:", opts: ["Memory type","Communication protocol","Power regulator","Oscillator type"], ans: 1, exp: "UART = Universal Asynchronous Receiver Transmitter (serial comm protocol)" },
        { q: "Binary 1010 = decimal:", opts: ["8","10","12","14"], ans: 1, exp: "1010₂ = 8+2 = 10₁₀" },
        { q: "PWM controls:", opts: ["Frequency only","Average voltage/power","Peak voltage","Current directly"], ans: 1, exp: "PWM varies duty cycle to control average voltage/power." }
    ]
};

/* ============================================================
   EVERYDAY ENGINEERING
============================================================ */
const everyday = [
    { id: "smartphone", icon: "📱", title: "Smartphone", description: "7 billion humans carry a supercomputer. Let's look inside.",
      intro: "Your smartphone contains almost every branch of ECE — from analog RF to digital processors to power management.",
      tags: ["RF", "Digital", "Analog", "Power", "Embedded", "VLSI"],
      blocks: [
        ["Processor (SoC)", "A System-on-Chip with billions of MOSFET transistors. Manufactured using 3-7nm CMOS process. Contains CPU, GPU, DSP, modem."],
        ["Battery & PMIC", "Li-ion battery (3.7V). Power Management IC regulates voltages for each component. Wireless charging uses resonant inductive coupling."],
        ["RF & Antenna", "Multiple antennas (5G, Wi-Fi, Bluetooth, GPS). Antenna design, impedance matching, RF amplifiers, mixers, filters."],
        ["Camera System", "CMOS image sensor, ISP (Image Signal Processor), lens optics, OIS (Optical Image Stabilization) uses gyroscopes."],
        ["Display", "OLED/LCD — pixel matrix controlled by timing controllers. Touch layer uses mutual capacitance sensing."],
        ["Audio", "MEMS microphones, DAC for audio output, amplifiers. Noise cancellation uses DSP algorithms."]
      ]
    },
    { id: "charger", icon: "🔌", title: "Phone Charger", description: "Inside that small white brick is serious power electronics.",
      intro: "A phone charger converts 230V AC to 5-20V DC — safely and efficiently — using switching power supply techniques.",
      tags: ["Power Electronics", "AC-DC", "SMPS", "Rectifier"],
      blocks: [
        ["Rectifier", "Bridge rectifier converts 230V AC to pulsating DC (~325V peak). Four diodes in bridge configuration."],
        ["Capacitor Filter", "Large electrolytic capacitor smooths the pulsating DC to near-constant ~310V DC."],
        ["PWM Controller", "IC switches a MOSFET at ~100kHz. Much higher frequency than 50Hz mains means smaller transformer."],
        ["High-frequency Transformer", "Small ferrite-core transformer. Steps down 310V to ~5-9V AC at 100kHz."],
        ["Output Rectifier & Filter", "Schottky diodes rectify. LC filter smooths to clean DC output."],
        ["Feedback & Regulation", "Optocoupler provides isolated feedback. PWM duty cycle adjusts to maintain constant output voltage."]
      ]
    },
    { id: "earbuds", icon: "🎧", title: "True Wireless Earbuds", description: "No wires, instant sync, 8hr battery — here's how it works.",
      intro: "True wireless earbuds pack Bluetooth 5.x, DSP, audio DAC, microphones, and battery management into a space smaller than your thumb.",
      tags: ["Bluetooth", "DSP", "Audio", "Wireless", "Embedded"],
      blocks: [
        ["Bluetooth SoC", "A tiny IC implements Bluetooth 5.x protocol, audio codec, and DSP — all on one chip."],
        ["Audio DAC", "Digital audio data from Bluetooth is converted to analog by a high-resolution DAC (Digital-to-Analog Converter)."],
        ["Audio Amplifier", "Tiny Class-D amplifier drives the speaker driver. Class-D uses PWM for high efficiency (>90%)."],
        ["MEMS Microphones", "Tiny microphones capture voice. ANC (Active Noise Cancellation) uses feed-forward/feed-back microphone arrays."],
        ["DSP for ANC", "Real-time DSP generates anti-noise — exactly inverted noise signal — canceling environmental sound."],
        ["Battery Management", "120-500mAh Li-ion per earbud. BMS IC handles charge/discharge, cell balancing, protection."]
      ]
    },
    { id: "ev", icon: "🚗", title: "Electric Vehicle", description: "A 400V battery pack, 200kW motor, and no combustion engine. Pure ECE.",
      intro: "An EV is a masterclass in power electronics, embedded systems, battery management, and motor control all working together.",
      tags: ["Power Electronics", "Embedded", "Control", "Battery", "Motor Drive"],
      blocks: [
        ["Battery Pack", "400-800V lithium-ion pack. Thousands of cells in series/parallel. BMS monitors each cell's voltage, temperature, SOC."],
        ["Power Electronics Inverter", "3-phase inverter converts DC battery to 3-phase AC for the motor. Uses IGBTs or SiC MOSFETs switching at ~10kHz."],
        ["Traction Motor", "Permanent Magnet Synchronous Motor (PMSM) or Induction Motor. Field-Oriented Control (FOC) provides precise torque control."],
        ["On-Board Charger (OBC)", "AC grid (AC) → DC battery. Typically 7-22kW. Uses PFC (Power Factor Correction) to draw clean sinusoidal current."],
        ["DC-DC Converter", "Converts 400V battery to 12V for low-voltage systems (lights, infotainment, ECUs)."],
        ["Vehicle Control Unit (VCU)", "Master ECU coordinates all subsystems — motor controller, BMS, thermal management, ADAS."]
      ]
    },
    { id: "wifi-router", icon: "📶", title: "Wi-Fi Router", description: "Sending data wirelessly at 1+ Gbps through your walls.",
      intro: "A Wi-Fi router implements complex RF engineering, signal processing, and networking in a box you probably never think about.",
      tags: ["RF", "Communication", "Antenna", "Signal Processing", "Embedded"],
      blocks: [
        ["Radio (RF Front End)", "Multiple RF chains for MIMO (Multiple Input Multiple Output). PA (Power Amplifier), LNA (Low Noise Amplifier), filters."],
        ["Antenna Array", "2, 4, or 8 antennas. Beamforming uses phase control to direct signals toward connected devices."],
        ["Wi-Fi SoC", "Implements IEEE 802.11ax (Wi-Fi 6/6E). OFDM modulation, 1024-QAM encoding, MU-MIMO."],
        ["DSP/Baseband Processing", "Encodes/decodes digital data to/from RF signals. Handles error correction, channel equalization."],
        ["Ethernet PHY", "Physical layer interface between router CPU and network. Handles 100Mbps/1Gbps wired connections."],
        ["Power Supply", "SMPS converts mains AC to 12V DC. Linear regulators provide clean 3.3V and 1.8V for digital logic."]
      ]
    },
    { id: "gps", icon: "🛰️", title: "GPS Navigation", description: "Four satellites, atomic clocks, and your position within 3 meters.",
      intro: "GPS is a triumph of RF engineering, signal processing, and coordinate geometry — all happening in your phone.",
      tags: ["Communication", "RF", "Signal Processing", "Antenna"],
      blocks: [
        ["GPS Satellite Signals", "Satellites broadcast at 1575.42 MHz (L1 band). Each satellite uses a unique CDMA code (PRN code)."],
        ["GPS Receiver Antenna", "Small patch antenna optimized for 1.57GHz. RHCP (Right-Hand Circular Polarization) to match satellite signal."],
        ["RF Front End", "LNA amplifies the very weak satellite signal (~-130dBm). Mixer downconverts to IF for processing."],
        ["Correlator", "Digital correlator finds the PRN code timing by correlating received signal with local copy."],
        ["Navigation Processor", "Calculates pseudoranges from 4+ satellites. Solves geometry equations to find 3D position + time."],
        ["GNSS Fusion", "Modern chips combine GPS (US), GLONASS (Russia), Galileo (EU), NavIC (India) for better accuracy."]
      ]
    }
];

/* ============================================================
   NCU STORIES
============================================================ */
const stories = [
    {
        id: "volto-meets-curro",
        episode: "Episode 01",
        title: "The Push and the Flow",
        subtitle: "Volto creates potential. Curro starts moving. Resi tries to slow everything down.",
        cover_color: "linear-gradient(135deg, #0a2a1a 0%, #1a4a2a 100%)",
        mascots: ["volto", "curro", "resi"],
        tags: ["Voltage", "Current", "Resistance", "Ohm's Law"],
        panels: [
            { mascot: "volto", text: "I am VOLTO — and I have enormous potential! I've been separated from the negative terminal, and all I want is to push electrons through this circuit.", insight: "Voltage = potential difference between two points. The source (battery) creates this difference." },
            { mascot: "curro", text: "And I'm CURRO! The moment Volto has potential, I start FLOWING. I am the current — billions of electrons marching from negative to positive (conventional current goes the other way, but I'm talking about the actual electrons!).", insight: "Current = rate of charge flow. I = Q/t (Amperes)" },
            { mascot: "resi", text: "Not so fast, Curro! I am RESI, and you must pass through me. I don't STOP you — I CONTROL you. The more you push (Volto), the more you flow (Curro). But I determine HOW much.", insight: "Resistance = opposition to flow. Ohm's Law: V = I × R connects all three." },
            { mascot: "volto", text: "RESI! Ohm's Law means if you're 100Ω and I provide 5V, then Curro flows at exactly 50mA. No more, no less. It's perfect harmony!", insight: "I = V/R = 5/100 = 0.05A = 50mA. This is Ohm's Law in action!" },
            { mascot: "shorty", text: "HAHAHA! What if I just connect directly from one terminal to the other with ZERO resistance? Then Curro flows INFINITELY... until something EXPLODES! Don't try this at home!", insight: "Short circuit: R→0, I→∞. Causes blown fuses, overheating, fire. Always use appropriate resistance!" }
        ]
    },
    {
        id: "capa-stores",
        episode: "Episode 02",
        title: "Capa's Memory",
        subtitle: "The story of how capacitors store energy and why RC circuits delay everything.",
        cover_color: "linear-gradient(135deg, #1a0a2a 0%, #3a1a4a 100%)",
        mascots: ["capa", "curro", "volto"],
        tags: ["Capacitor", "RC Circuit", "Time Constant", "Energy Storage"],
        panels: [
            { mascot: "capa", text: "I am CAPA! I have two plates very close together but not touching. When Volto applies voltage, Curro charges me up — electrons pile up on one plate, creating a negative plate and leaving the other plate positive.", insight: "Capacitor = two conducting plates separated by a dielectric. Stores charge Q = C × V." },
            { mascot: "curro", text: "But here's the interesting part — Capa resists me! At first when she's empty, I rush in fast. But as she fills up, the voltage across her INCREASES, and I slow down... until she's fully charged and I stop completely!", insight: "RC charging: I(t) = (V/R) × e^(-t/RC). Current decays exponentially." },
            { mascot: "capa", text: "That slowing-down time is my TIME CONSTANT — τ = R × C. After one time constant, I've stored 63.2% of the final charge. After 5 time constants, I'm essentially full.", insight: "τ = RC seconds. At t=τ: V_cap = 0.632 × Vs. At t=5τ: fully charged (99.3%)." },
            { mascot: "volto", text: "Capa is everywhere! In your phone's power supply (smoothing voltage), in audio crossover filters, in camera flash circuits (stores energy then releases it instantly for the bright flash!).", insight: "Capacitors: energy storage, filters (LPF/HPF), coupling, decoupling, timing circuits, flash photography." }
        ]
    },
    {
        id: "dio-the-guardian",
        episode: "Episode 03",
        title: "Dio the One-Way Guardian",
        subtitle: "Why current only flows one direction through a diode — and why that's incredibly useful.",
        cover_color: "linear-gradient(135deg, #0a1a2a 0%, #1a2a4a 100%)",
        mascots: ["dio", "curro", "shorty"],
        tags: ["Diode", "PN Junction", "Rectifier", "Forward Bias"],
        panels: [
            { mascot: "dio", text: "I am DIO — the guardian of direction! I am a PN junction — P-type semiconductor on one side, N-type on the other. Electrons can flow easily from N to P (conventional current P to N), but NEVER the other way.", insight: "Forward bias: Vanode > Vcathode → diode conducts. Reverse bias: blocks current. Vf ≈ 0.6-0.7V for silicon." },
            { mascot: "curro", text: "Dio lets me through when the voltage is in the right direction — forward biased. But reverse the polarity and Dio becomes a wall. Only a very tiny leakage current (nano-amps) sneaks through.", insight: "Forward voltage drop ~0.7V (Si), ~0.3V (Ge), ~2-3V (LED). Reverse: only leakage until breakdown." },
            { mascot: "dio", text: "My biggest job? Converting AC to DC! I'm in every charger, power supply, and rectifier. Bridge rectifier uses four of us to make both halves of AC push current in the same direction.", insight: "Bridge rectifier: 4 diodes convert full AC waveform to pulsating DC. Efficiency ~81% for resistive load." },
            { mascot: "shorty", text: "And if you reverse bias me past my breakdown voltage? ZENER effect! Some diodes are DESIGNED for this — Zener diodes use controlled breakdown for voltage regulation!", insight: "Zener diode: conducts in reverse at a precise breakdown voltage (Vz). Used as voltage references and regulators." }
        ]
    }
];

/* ============================================================
   FORMULA DATABASE
============================================================ */
const formulaDb = [
    { id: "ohm", category: "circuits", label: "Ohm's Law", eq: "V = I × R",
      meaning: "Voltage equals current times resistance", use: "Find any one quantity given the other two",
      vars: [["V","Voltage","V"],["I","Current","A"],["R","Resistance","Ω"]],
      calc: { inputs:["V","I","R"], fn(v){ if(v.V&&v.R) return{I:+(v.V/v.R).toFixed(4)+"A"}; if(v.I&&v.R) return{V:+(v.I*v.R).toFixed(4)+"V"}; if(v.V&&v.I) return{R:+(v.V/v.I).toFixed(4)+"Ω"}; return{}; } }
    },
    { id: "power", category: "circuits", label: "Electrical Power", eq: "P = V × I = I²R = V²/R",
      meaning: "Rate of energy transfer in a circuit", use: "Calculate heat dissipation, battery life, component ratings",
      vars: [["P","Power","W"],["V","Voltage","V"],["I","Current","A"],["R","Resistance","Ω"]],
      calc: { inputs:["V","I"], fn(v){ if(v.V&&v.I) return{P:+(v.V*v.I).toFixed(4)+"W"}; return{}; } }
    },
    { id: "charge", category: "circuits", label: "Electric Charge", eq: "Q = I × t",
      meaning: "Total charge equals current multiplied by time", use: "Battery capacity, capacitor charge, electrolysis",
      vars: [["Q","Charge","C"],["I","Current","A"],["t","Time","s"]],
      calc: { inputs:["I","t"], fn(v){ if(v.I&&v.t) return{Q:+(v.I*v.t).toFixed(4)+"C"}; return{}; } }
    },
    { id: "series-r", category: "circuits", label: "Series Resistance", eq: "R_total = R₁ + R₂ + R₃",
      meaning: "Total resistance of series combination", use: "Current limiting, voltage dividers",
      vars: [["R_total","Total R","Ω"],["R1,R2","Individual","Ω"]], calc: null
    },
    { id: "parallel-r", category: "circuits", label: "Parallel Resistance (2 resistors)", eq: "R_eq = (R₁ × R₂) / (R₁ + R₂)",
      meaning: "Equivalent resistance of two parallel resistors", use: "Load calculations, fan-out",
      vars: [["Req","Equivalent R","Ω"],["R1","Resistor 1","Ω"],["R2","Resistor 2","Ω"]],
      calc: { inputs:["R1","R2"], fn(v){ if(v.R1&&v.R2) return{Req:+((v.R1*v.R2)/(v.R1+v.R2)).toFixed(4)+"Ω"}; return{}; } }
    },
    { id: "vdivider", category: "circuits", label: "Voltage Divider", eq: "Vout = Vin × R2 / (R1 + R2)",
      meaning: "Output voltage of a resistive divider", use: "Level shifting, biasing, sensor interfaces",
      vars: [["Vout","Output V","V"],["Vin","Input V","V"],["R1","Top R","Ω"],["R2","Bottom R","Ω"]],
      calc: { inputs:["Vin","R1","R2"], fn(v){ if(v.Vin&&v.R1&&v.R2) return{Vout:+(v.Vin*v.R2/(v.R1+v.R2)).toFixed(4)+"V"}; return{}; } }
    },
    { id: "rc-tau", category: "components", label: "RC Time Constant", eq: "τ = R × C",
      meaning: "Time for capacitor to charge to 63.2% of final voltage", use: "Filter design, timing circuits",
      vars: [["τ","Time constant","s"],["R","Resistance","Ω"],["C","Capacitance","F"]],
      calc: { inputs:["R","C"], fn(v){ if(v.R&&v.C) return{τ:+(v.R*v.C).toFixed(6)+"s"}; return{}; } }
    },
    { id: "capacitor-e", category: "components", label: "Capacitor Energy", eq: "E = ½ × C × V²",
      meaning: "Energy stored in a capacitor's electric field", use: "Flash photography, UPS systems",
      vars: [["E","Energy","J"],["C","Capacitance","F"],["V","Voltage","V"]],
      calc: { inputs:["C","V"], fn(v){ if(v.C&&v.V) return{E:+(0.5*v.C*v.V*v.V).toFixed(6)+"J"}; return{}; } }
    },
    { id: "inductor-e", category: "components", label: "Inductor Energy", eq: "E = ½ × L × I²",
      meaning: "Energy stored in an inductor's magnetic field", use: "Switched-mode power supplies, motor drives",
      vars: [["E","Energy","J"],["L","Inductance","H"],["I","Current","A"]],
      calc: { inputs:["L","I"], fn(v){ if(v.L&&v.I) return{E:+(0.5*v.L*v.I*v.I).toFixed(6)+"J"}; return{}; } }
    },
    { id: "freq-period", category: "signals", label: "Frequency & Period", eq: "f = 1 / T",
      meaning: "Frequency is cycles per second; period is time per cycle", use: "Clock signals, AC analysis, oscillators",
      vars: [["f","Frequency","Hz"],["T","Period","s"]],
      calc: { inputs:["T"], fn(v){ if(v.T) return{f:+(1/v.T).toFixed(6)+"Hz"}; return{}; } }
    },
    { id: "xc", category: "components", label: "Capacitive Reactance", eq: "Xc = 1 / (2π × f × C)",
      meaning: "Opposition of capacitor to AC current", use: "Filter design, impedance matching",
      vars: [["Xc","Reactance","Ω"],["f","Frequency","Hz"],["C","Capacitance","F"]],
      calc: { inputs:["f","C"], fn(v){ if(v.f&&v.C) return{Xc:+(1/(2*Math.PI*v.f*v.C)).toFixed(4)+"Ω"}; return{}; } }
    },
    { id: "xl", category: "components", label: "Inductive Reactance", eq: "Xl = 2π × f × L",
      meaning: "Opposition of inductor to AC current", use: "Filter design, transformer analysis",
      vars: [["Xl","Reactance","Ω"],["f","Frequency","Hz"],["L","Inductance","H"]],
      calc: { inputs:["f","L"], fn(v){ if(v.f&&v.L) return{Xl:+(2*Math.PI*v.f*v.L).toFixed(4)+"Ω"}; return{}; } }
    }
];

/* ============================================================
   INTERVIEW QUESTIONS
============================================================ */
const interviewQs = {
    basic: [
        { q: "What is Ohm's Law?", a: "V = I × R — Voltage equals current times resistance.", detail: "Applies to linear/ohmic materials. Three forms: V=IR (find V), I=V/R (find I), R=V/I (find R). Common mistakes: applying to non-linear devices like diodes." },
        { q: "Difference between EMF and terminal voltage?", a: "EMF is open-circuit voltage of source. Terminal voltage = EMF - (I × r_internal).", detail: "Due to internal resistance of the source, terminal voltage drops under load. That's why a battery 'weakens' as current increases." },
        { q: "State KCL and KVL.", a: "KCL: sum of currents at a node = 0. KVL: sum of voltages in a loop = 0.", detail: "KCL based on charge conservation. KVL based on energy conservation. Together they allow analysis of any linear circuit." },
        { q: "What is the difference between AC and DC?", a: "DC: unidirectional, constant voltage. AC: voltage alternates sinusoidally.", detail: "AC used for power transmission (transformer-compatible). DC used for electronics, batteries. India: 230V 50Hz AC. USB: 5V DC." },
        { q: "What is short circuit? Why is it dangerous?", a: "Short circuit: near-zero resistance path. I → ∞, causing overheating/fire.", detail: "P = I²R. Very high I with very low R still generates enormous power (I is the dominant term). Fuses and circuit breakers protect against this." }
    ],
    analog: [
        { q: "What is the difference between BJT and MOSFET?", a: "BJT: current-controlled, uses Ib to control Ic. MOSFET: voltage-controlled, Vgs controls Id.", detail: "MOSFET: higher input impedance, lower drive current needed, dominant in digital ICs. BJT: better linearity for analog, lower Vce(sat) for some applications." },
        { q: "What is gain-bandwidth product (GBW)?", a: "GBW = Gain × Bandwidth = constant for a given op-amp.", detail: "For a 741 op-amp, GBW ≈ 1MHz. If you set gain=100, max BW ≈ 10kHz. Higher gain → narrower bandwidth. Trade-off." },
        { q: "Why do we use negative feedback in amplifiers?", a: "Reduces gain but improves linearity, bandwidth, stability, and reduces distortion.", detail: "Negative feedback: output signal fed back to input in opposition. Makes gain depend on passive components (stable) rather than transistor parameters (variable)." },
        { q: "What is Q-point and why does it matter?", a: "Q-point (quiescent point) is DC operating point of transistor. Must be in active region.", detail: "Too high: transistor saturates, clips signal. Too low: transistor cuts off, clips other half. Proper biasing keeps Q-point stable and centered for maximum swing." },
        { q: "Explain the Barkhausen criterion for oscillators.", a: "Loop gain = 1 and total phase shift = 0° (or 360°) for sustained oscillation.", detail: "If loop gain > 1: oscillation grows (clips). If < 1: dies out. Exactly 1: sustained oscillation. In practice, AGC (Automatic Gain Control) stabilizes amplitude." }
    ],
    digital: [
        { q: "Explain CMOS logic family.", a: "CMOS uses complementary NMOS+PMOS pairs. Zero static power, noise immunity, scalable.", detail: "CMOS inverter: PMOS on when input LOW (output HIGH), NMOS on when input HIGH (output LOW). Dynamic power P = C × V² × f." },
        { q: "What is propagation delay?", a: "Time from input change to output reaching 50% of its final value.", detail: "tpHL (high to low) and tpLH (low to high) may differ. Determines maximum clock frequency: fmax = 1/tcritical_path." },
        { q: "Explain setup time and hold time.", a: "Setup: data must be stable X ns BEFORE clock edge. Hold: data must remain stable Y ns AFTER clock edge.", detail: "Violating setup: metastability risk. Violating hold: incorrect data captured. Critical for synchronous design." },
        { q: "What is the difference between synchronous and asynchronous reset?", a: "Sync reset: only recognized at clock edge. Async reset: takes effect immediately.", detail: "Sync reset: cleaner timing, no glitches. Async reset: works even without clock, used for power-on reset. Both valid, chosen based on design requirements." },
        { q: "Explain Boolean De Morgan's theorem.", a: "NOT(A AND B) = (NOT A) OR (NOT B). NOT(A OR B) = (NOT A) AND (NOT B).", detail: "Useful for converting AND gates to OR gates and vice versa using only inverters. Fundamental for NAND/NOR based logic design." }
    ],
    embedded: [
        { q: "What is the difference between polling and interrupts?", a: "Polling: CPU continuously checks status. Interrupt: peripheral signals CPU only when needed.", detail: "Polling: simple but wastes CPU cycles. Interrupts: efficient, CPU does other work, responds to events. Interrupts have latency but better for real-time systems." },
        { q: "Explain SPI vs I2C differences.", a: "SPI: 4-wire, full duplex, faster. I2C: 2-wire, slower, multi-master capable, uses addresses.", detail: "SPI: MOSI, MISO, SCK, CS. Up to 50MHz. Good for ADCs, DACs, displays. I2C: SDA, SCL. Up to 3.4MHz fast-mode+. Good for sensors, EEPROMs, multiple devices on same bus." },
        { q: "What is a watchdog timer?", a: "Hardware timer that resets MCU if not 'kicked' (refreshed) within a timeout period.", detail: "Prevents software hangs. If firmware is stuck in a loop, WDT resets the system. Must be periodically refreshed in normal operation (kicked). Critical for reliability." },
        { q: "What is DMA?", a: "Direct Memory Access: hardware that transfers data between peripherals and memory without CPU.", detail: "Without DMA: CPU must read each byte from peripheral, store to memory — very inefficient. With DMA: peripheral → memory transfer happens in background while CPU does other work." },
        { q: "Explain RTOS vs bare-metal firmware.", a: "Bare-metal: one loop, no OS. RTOS: multiple tasks with scheduler, priorities, timing guarantees.", detail: "Bare-metal: simple, predictable, good for simple devices. RTOS: FreeRTOS, Zephyr — preemptive multitasking, semaphores, queues, timers. Use RTOS when concurrency complexity justifies overhead." }
    ],
    vlsi: [
        { q: "What is the difference between ASIC and FPGA?", a: "FPGA: reconfigurable, slower, lower NRE cost. ASIC: fixed silicon, fast, power-efficient, high NRE.", detail: "FPGA for prototyping, low volume, reconfigurability. ASIC for high-volume, low power, high performance (SoC, processors, phone chips)." },
        { q: "Explain the concept of timing closure.", a: "Ensuring all paths meet setup/hold timing constraints after place-and-route.", detail: "Timing analysis uses STA (Static Timing Analysis). Critical paths are longest delays. Solutions: pipelining, retiming, logic optimization, placement/routing optimization." },
        { q: "What is clock skew and jitter?", a: "Skew: spatial difference in clock arrival time. Jitter: temporal variation in clock edges.", detail: "Skew: caused by unequal routing. Eats into setup time. Use clock trees. Jitter: caused by noise, affects ADC sampling, serial link BER." },
        { q: "Explain Verilog always block.", a: "always block defines sequential or combinational logic. Synthesizable if used correctly.", detail: "always @(posedge clk): sequential (flip-flop). always @(*): combinational. Use non-blocking (<=) for sequential, blocking (=) for combinational." },
        { q: "What is hold time violation and how to fix it?", a: "Hold violation: data changes too soon after clock edge, before latch is settled.", detail: "Fix: add buffers/delay on data path (never on clock path). Unlike setup violations, hold cannot be fixed by slowing clock — need to increase data path delay." }
    ],
    communication: [
        { q: "What is Shannon's channel capacity theorem?", a: "C = B × log₂(1 + SNR) bits/sec. Maximum error-free transmission rate.", detail: "Theoretical limit, not achievable in practice but approaches possible with advanced coding (LDPC, Turbo). SNR and bandwidth are the two knobs available." },
        { q: "Explain OFDM and why it's used.", a: "Orthogonal Frequency Division Multiplexing: data split across many narrowband subcarriers.", detail: "Robust to multipath fading (each subcarrier is narrow → flat fading). Used in 4G/5G (LTE), Wi-Fi (802.11a/g/n/ac/ax), ADSL, DAB." },
        { q: "What is the difference between AM and FM?", a: "AM: varies amplitude. FM: varies frequency. FM has better noise immunity.", detail: "AM bandwidth = 2×message BW. FM bandwidth per Carson's rule ≈ 2(Δf + fm). FM more complex but better SNR, used for music broadcasting." },
        { q: "Explain MIMO.", a: "Multiple Input Multiple Output: multiple antennas at TX and RX for higher capacity.", detail: "Spatial multiplexing: N streams on N antennas = N× capacity. Beamforming: focus energy toward receiver. Used in 4G/5G/Wi-Fi for very high data rates." }
    ]
};

/* ============================================================
   PROJECTS
============================================================ */
const projects = [
    { id: "night-lamp", title: "Automatic Night Lamp", icon: "💡", difficulty: "beginner", time: "1-2 hrs", description: "LDR-based circuit that turns an LED ON at night and OFF in daylight. Classic beginner project.", tags: ["LDR","Resistor","LED","BC547"], components: ["LDR","LED","BC547 NPN","10kΩ pot","9V battery"], prereqs: ["resistance","series","ohms-law"] },
    { id: "voltage-divider-circuit", title: "Voltage Divider Circuit", icon: "⚡", difficulty: "beginner", time: "30 min", description: "Build a voltage divider, measure Vout with multimeter, verify Vout = Vin × R2/(R1+R2).", tags: ["Voltage","Resistor","KVL"], components: ["2 resistors","9V battery","Multimeter"], prereqs: ["voltage-divider","series"] },
    { id: "led-project", title: "LED Current Limiting", icon: "🔴", difficulty: "beginner", time: "30 min", description: "Calculate and build the correct current-limiting resistor for an LED. Measure actual current.", tags: ["LED","Resistor","Ohm's Law"], components: ["Red LED","220Ω resistor","9V battery"], prereqs: ["ohms-law","series"] },
    { id: "rc-timer", title: "RC Timing Circuit", icon: "⏱️", difficulty: "beginner", time: "1-2 hrs", description: "Charge a capacitor through a resistor. Measure voltage vs time. Plot and verify τ = RC.", tags: ["Capacitor","RC","Time Constant"], components: ["10kΩ","100μF cap","9V battery","Voltmeter"], prereqs: ["series","ohms-law"] },
    { id: "digital-thermo", title: "Digital Thermometer", icon: "🌡️", difficulty: "intermediate", time: "4-6 hrs", description: "LM35 temperature sensor → Arduino ADC → Serial monitor display. Real engineering workflow.", tags: ["ADC","Arduino","Sensor","Embedded"], components: ["LM35","Arduino Uno","USB cable"], prereqs: ["ohms-law","ac-basics"] },
    { id: "pwm-motor", title: "PWM Motor Speed Control", icon: "⚙️", difficulty: "intermediate", time: "3-4 hrs", description: "Control DC motor speed using PWM from microcontroller. H-bridge driver, duty cycle adjustment.", tags: ["PWM","Motor","Embedded","H-Bridge"], components: ["L293D","DC motor","Arduino","Potentiometer"], prereqs: ["ohms-law","parallel"] },
    { id: "esp32-iot", title: "ESP32 IoT Dashboard", icon: "🌐", difficulty: "advanced", time: "8-12 hrs", description: "Read sensor data on ESP32, send via MQTT to cloud dashboard. Full IoT pipeline.", tags: ["ESP32","MQTT","IoT","Wi-Fi","Embedded"], components: ["ESP32","DHT22","OLED","Wi-Fi router"], prereqs: ["ac-basics"] },
    { id: "smps-design", title: "Buck Converter Design", icon: "🔋", difficulty: "advanced", time: "1-2 days", description: "Design a 12V→5V buck converter. Calculate L, C values. Simulate then build.", tags: ["SMPS","Buck","Power Electronics","MOSFET"], components: ["MOSFET","Inductor","Diode","Capacitor","PWM IC"], prereqs: ["ohms-law","ac-basics"] }
];

/* ============================================================
   ROADMAP
============================================================ */
const roadmap = [
    ["01", "ECE Zero",            "Atoms to circuits. Charge, voltage, current, resistance, Ohm's Law.",   "#7fffb2"],
    ["02", "Circuit Theory",      "KCL, KVL, Thevenin, Norton, AC analysis, resonance, power factor.",     "#36d9d9"],
    ["03", "Electronic Components","Resistors to transistors. Every component explained with simulation.",   "#ffc14d"],
    ["04", "Semiconductor Physics","PN junction, BJT, MOSFET — silicon explained from atom to switch.",    "#a78bfa"],
    ["05", "Analog Electronics",   "Amplifiers, oscillators, op-amps, filters.",                            "#f472b6"],
    ["06", "Digital Electronics",  "Binary, Boolean algebra, gates, flip-flops, counters, memory.",        "#60a5fa"],
    ["07", "Signals & Systems",    "Fourier, Laplace, Z-transform, convolution, system analysis.",          "#34d399"],
    ["08", "Communication",        "AM/FM, modulation, sampling, PCM, digital modulation, Shannon.",       "#fb923c"],
    ["09", "Electromagnetics",     "Maxwell's equations, waves, transmission lines, antennas.",             "#e879f9"],
    ["10", "Microprocessors",      "8085/8086 architecture, instruction sets, memory interfacing.",         "#67e8f9"],
    ["11", "Embedded Systems",     "MCUs, GPIO, UART, SPI, I2C, CAN, RTOS, firmware.",                    "#a3e635"],
    ["12", "Control Systems",      "Open/closed loop, PID, Bode, Nyquist, stability criteria.",            "#fbbf24"],
    ["13", "DSP",                  "DFT, FFT, FIR, IIR, digital filters, audio/image processing.",        "#c084fc"],
    ["14", "VLSI",                 "CMOS, fabrication, Verilog, FPGA, ASIC, timing, SoC design.",         "#38bdf8"],
    ["15", "Power Electronics",    "Buck/Boost, rectifiers, inverters, SMPS, motor drives, EV.",           "#facc15"],
    ["16", "Mixed Signal",         "ADC, DAC, PLL, PMIC, sensor interfaces, clock systems.",              "#f87171"]
];

/* ============================================================
   DOMAIN TOPICS MAP
============================================================ */
const domainTopics = {
    "circuit-city":   ["Ohm's Law", "Series & Parallel", "KCL", "KVL", "Voltage Divider", "Current Divider", "Nodal Analysis", "Mesh Analysis", "Superposition", "Thevenin", "Norton", "Max Power Transfer", "AC Analysis", "Phasors", "Impedance", "Power Factor", "Resonance"],
    "component-city": ["Resistor", "Capacitor", "Inductor", "Transformer", "PN Diode", "Zener Diode", "LED", "Schottky Diode", "BJT NPN/PNP", "JFET", "MOSFET NMOS/PMOS", "SCR", "TRIAC", "Op-Amp", "Crystal", "Relay"],
    "semiconductor":  ["Intrinsic Semiconductor", "P-type & N-type", "PN Junction", "Depletion Region", "Forward/Reverse Bias", "Diode Characteristics", "BJT Construction", "BJT Biasing", "BJT Characteristics", "MOSFET Structure", "Threshold Voltage", "MOSFET Regions"],
    "analog-world":   ["Diode Rectifiers", "Clippers & Clampers", "Zener Regulation", "BJT Biasing & Q-point", "CE/CB/CC Amplifiers", "Frequency Response", "Feedback", "Oscillators", "Op-amp Fundamentals", "Inverting Amplifier", "Non-inverting Amplifier", "Active Filters"],
    "digital-world":  ["Number Systems", "Boolean Algebra", "Logic Gates", "Combinational Circuits", "Sequential Circuits", "Flip-Flops", "Counters", "Registers", "Memory Types", "Timing Parameters"],
    "signal-city":    ["Continuous vs Discrete Signals", "Fourier Series", "Fourier Transform", "Laplace Transform", "Z-Transform", "Convolution", "System Properties", "Transfer Functions", "Sampling Theorem"],
    "comm-world":     ["Modulation Basics", "AM", "FM", "PM", "Sampling & Quantization", "PCM", "Digital Modulation", "ASK/FSK/PSK", "QAM", "Shannon Capacity", "Noise & SNR"],
    "em-world":       ["Electric Fields", "Magnetic Fields", "Maxwell's Equations", "EM Waves", "Transmission Lines", "VSWR", "Antennas", "Dipole & Monopole", "Array Antennas", "Antenna Parameters"],
    "micro-world":    ["CPU Architecture", "8085 Architecture", "8086 Architecture", "Instruction Set", "Addressing Modes", "Memory Interfacing", "I/O Interfacing", "Interrupts", "Assembly Language"],
    "embedded-world": ["GPIO", "Timers & Counters", "ADC & DAC", "PWM", "UART", "SPI", "I2C", "CAN", "ARM Architecture", "STM32/ESP32", "RTOS Basics", "Interrupts", "DMA"],
    "control-world":  ["Open/Closed Loop", "Transfer Functions", "Block Diagrams", "Time Response", "Stability", "Routh-Hurwitz", "Root Locus", "Bode Plot", "Nyquist", "PID Controller"],
    "dsp-world":      ["Discrete Signals", "DTFT", "DFT & FFT", "Z-Transform", "FIR Filter Design", "IIR Filter Design", "Digital Filter Implementation"],
    "vlsi-world":     ["CMOS Inverter", "CMOS Logic Gates", "Timing Constraints", "Verilog HDL", "FPGA Architecture", "ASIC Design Flow", "STA", "Floorplanning", "Layout Design Rules"],
    "power-world":    ["Power Devices", "Rectifier Circuits", "DC-DC Converters", "Buck Converter", "Boost Converter", "Inverters", "SMPS Design", "Motor Drives", "EV Power Systems"],
    "mixed-signal":   ["ADC Architecture", "DAC Architecture", "Sample & Hold", "PLL Design", "Clock Distribution", "Power Management ICs", "Mixed-Signal PCB Design"]
};

/* ============================================================
   SVG COMPONENT BUILDERS
============================================================ */
function svgResistance(glowLevel = 0) {
    const glow = glowLevel > 0 ? `drop-shadow(0 0 ${glowLevel}px #7fffb2)` : "";
    return `
    <svg viewBox="0 0 200 140" style="max-width:200px;filter:${glow}" class="circuit-svg">
      <line x1="10" y1="70" x2="50" y2="70" class="cw"/>
      <rect x="50" y="52" width="100" height="36" rx="5" fill="none" class="cr" stroke-width="2.5"/>
      <text x="100" y="73" fill="#ffc14d" font-size="11" font-family="monospace" text-anchor="middle">R</text>
      <line x1="150" y1="70" x2="190" y2="70" class="cw"/>
      <circle cx="10" cy="70" r="4" fill="#7fffb2"/>
      <circle cx="190" cy="70" r="4" fill="#7fffb2"/>
      <path d="M10 70 Q10 40 100 40 Q190 40 190 70" stroke="#7fffb2" stroke-width="1" fill="none" opacity=".15" stroke-dasharray="4 4"/>
    </svg>`;
}

function svgBattery() {
    return `
    <svg viewBox="0 0 200 140" style="max-width:200px" class="circuit-svg">
      <line x1="10" y1="70" x2="65" y2="70" class="cw"/>
      <line x1="65" y1="50" x2="65" y2="90" class="cw" stroke-width="4"/>
      <line x1="80" y1="58" x2="80" y2="82" class="cw" stroke-width="2"/>
      <line x1="95" y1="50" x2="95" y2="90" class="cw" stroke-width="4"/>
      <line x1="110" y1="58" x2="110" y2="82" class="cw" stroke-width="2"/>
      <line x1="110" y1="70" x2="190" y2="70" class="cw"/>
      <text x="50" y="102" fill="#7fffb2" font-size="10" font-family="monospace">+</text>
      <text x="118" y="102" fill="#36d9d9" font-size="10" font-family="monospace">−</text>
      <circle cx="10" cy="70" r="4" fill="#7fffb2"/>
      <circle cx="190" cy="70" r="4" fill="#36d9d9"/>
    </svg>`;
}

function svgAtom() {
    return `
    <svg viewBox="0 0 200 200" style="max-width:200px" class="circuit-svg">
      <!-- Nucleus -->
      <circle cx="100" cy="100" r="14" fill="#ffc14d" opacity=".9"/>
      <text x="100" y="105" fill="#1a0e00" font-size="10" font-family="monospace" text-anchor="middle">+p</text>
      <!-- Orbits -->
      <ellipse cx="100" cy="100" rx="70" ry="28" fill="none" stroke="#7fffb2" stroke-width="1" opacity=".5"/>
      <ellipse cx="100" cy="100" rx="50" ry="70" fill="none" stroke="#36d9d9" stroke-width="1" opacity=".5" transform="rotate(60,100,100)"/>
      <ellipse cx="100" cy="100" rx="50" ry="70" fill="none" stroke="#a78bfa" stroke-width="1" opacity=".5" transform="rotate(-60,100,100)"/>
      <!-- Electrons -->
      <circle cx="170" cy="100" r="5" fill="#7fffb2">
        <animateMotion dur="2s" repeatCount="indefinite" path="M70,0 A70,28,0,1,1,70,-0.1"/>
      </circle>
      <circle cx="100" cy="30" r="5" fill="#36d9d9">
        <animateMotion dur="3s" repeatCount="indefinite" path="M0,-70 A50,70,0,1,1,0,-69.9" transform="rotate(60,100,100)"/>
      </circle>
      <circle cx="60" cy="140" r="5" fill="#a78bfa">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M0,70 A50,70,0,1,0,0,69.9" transform="rotate(-60,100,100)"/>
      </circle>
    </svg>`;
}

function svgKCL() {
    return `
    <svg viewBox="0 0 220 160" style="max-width:220px" class="circuit-svg">
      <!-- Node -->
      <circle cx="110" cy="80" r="8" fill="#7fffb2"/>
      <!-- Incoming arrows -->
      <line x1="20" y1="80" x2="102" y2="80" class="cw"/>
      <polygon points="102,75 112,80 102,85" fill="#7fffb2"/>
      <line x1="110" y1="20" x2="110" y2="72" class="cw"/>
      <polygon points="105,72 110,82 115,72" fill="#7fffb2"/>
      <!-- Outgoing -->
      <line x1="118" y1="80" x2="200" y2="80" stroke="#36d9d9" stroke-width="2.5" stroke-linecap="round"/>
      <polygon points="195,75 205,80 195,85" fill="#36d9d9"/>
      <line x1="110" y1="88" x2="110" y2="145" stroke="#36d9d9" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Labels -->
      <text x="55" y="72" fill="#7fffb2" font-size="10" font-family="monospace">I1=3A →</text>
      <text x="115" y="50" fill="#7fffb2" font-size="10" font-family="monospace">I2=2A</text>
      <text x="145" y="72" fill="#36d9d9" font-size="10" font-family="monospace">I3=?</text>
      <text x="115" y="115" fill="#36d9d9" font-size="10" font-family="monospace">↓ I4</text>
    </svg>`;
}

function svgKVL() {
    return `
    <svg viewBox="0 0 240 180" style="max-width:240px" class="circuit-svg">
      <!-- Loop -->
      <rect x="30" y="30" width="180" height="120" rx="8" fill="none" stroke="#7fffb2" stroke-width="1" stroke-dasharray="5 3" opacity=".3"/>
      <!-- Battery -->
      <line x1="30" y1="90" x2="30" y2="30"/>
      <text x="8" y="65" fill="#7fffb2" font-size="9" font-family="monospace">9V</text>
      <line x1="20" y1="45" x2="40" y2="45" stroke="#7fffb2" stroke-width="3"/>
      <line x1="24" y1="55" x2="36" y2="55" stroke="#7fffb2" stroke-width="1.5"/>
      <!-- R1 -->
      <rect x="80" y="18" width="60" height="24" rx="4" fill="none" class="cr" stroke-width="2"/>
      <text x="110" y="34" fill="#ffc14d" font-size="9" font-family="monospace" text-anchor="middle">R1: 4V</text>
      <!-- R2 -->
      <rect x="140" y="80" width="60" height="24" rx="4" fill="none" class="cr" stroke-width="2"/>
      <text x="170" y="96" fill="#ffc14d" font-size="9" font-family="monospace" text-anchor="middle">R2: 5V</text>
      <!-- Arrow -->
      <text x="95" y="112" fill="#7fffb2" font-size="9" font-family="monospace">9V = 4V + 5V ✓</text>
    </svg>`;
}

function svgOhmsLaw() {
    return `
    <svg viewBox="0 0 200 160" style="max-width:200px" class="circuit-svg">
      <!-- Triangle -->
      <polygon points="100,20 30,140 170,140" fill="none" stroke="#7fffb2" stroke-width="1.5" opacity=".4"/>
      <!-- V -->
      <text x="100" y="58" fill="#7fffb2" font-size="24" font-family="monospace" font-weight="bold" text-anchor="middle">V</text>
      <!-- Divider -->
      <line x1="30" y1="100" x2="170" y2="100" stroke="#7fffb2" stroke-width="1.5" opacity=".4"/>
      <!-- I -->
      <text x="65" y="132" fill="#36d9d9" font-size="20" font-family="monospace" font-weight="bold" text-anchor="middle">I</text>
      <!-- × -->
      <text x="100" y="128" fill="#4e6278" font-size="12" font-family="monospace" text-anchor="middle">×</text>
      <!-- R -->
      <text x="140" y="132" fill="#ffc14d" font-size="20" font-family="monospace" font-weight="bold" text-anchor="middle">R</text>
    </svg>`;
}

function svgSeriesCircuit() {
    return `
    <svg viewBox="0 0 240 120" style="max-width:240px" class="circuit-svg">
      <!-- Wire loop -->
      <polyline points="10,60 40,60 40,20 200,20 200,60 170,60" fill="none" class="cw"/>
      <polyline points="10,60 10,100 200,100 200,60" fill="none" class="cw"/>
      <!-- Battery -->
      <line x1="0" y1="50" x2="0" y2="30" stroke="#7fffb2" stroke-width="4" stroke-linecap="round"/>
      <line x1="6" y1="55" x2="6" y2="25" stroke="#7fffb2" stroke-width="2"/>
      <!-- R1 -->
      <rect x="70" y="10" width="40" height="20" rx="3" fill="none" class="cr" stroke-width="2"/>
      <text x="90" y="24" fill="#ffc14d" font-size="8" font-family="monospace" text-anchor="middle">R1</text>
      <!-- R2 -->
      <rect x="120" y="10" width="40" height="20" rx="3" fill="none" class="cr" stroke-width="2"/>
      <text x="140" y="24" fill="#ffc14d" font-size="8" font-family="monospace" text-anchor="middle">R2</text>
      <!-- Current flow indicator -->
      <line x1="40" y1="100" x2="120" y2="100" class="ccc"/>
      <text x="80" y="114" fill="#36d9d9" font-size="8" font-family="monospace" text-anchor="middle">Same I everywhere</text>
    </svg>`;
}

function svgParallelCircuit() {
    return `
    <svg viewBox="0 0 200 160" style="max-width:200px" class="circuit-svg">
      <!-- Bus lines -->
      <line x1="20" y1="30" x2="20" y2="130" class="cw"/>
      <line x1="180" y1="30" x2="180" y2="130" class="cw"/>
      <line x1="20" y1="30" x2="180" y2="30" class="cw"/>
      <line x1="20" y1="130" x2="180" y2="130" class="cw"/>
      <!-- R1 -->
      <rect x="70" y="45" width="60" height="22" rx="3" fill="none" class="cr" stroke-width="2"/>
      <text x="100" y="60" fill="#ffc14d" font-size="9" font-family="monospace" text-anchor="middle">R1</text>
      <line x1="20" y1="56" x2="70" y2="56" class="cw"/>
      <line x1="130" y1="56" x2="180" y2="56" class="cw"/>
      <!-- R2 -->
      <rect x="70" y="93" width="60" height="22" rx="3" fill="none" class="cr" stroke-width="2"/>
      <text x="100" y="108" fill="#ffc14d" font-size="9" font-family="monospace" text-anchor="middle">R2</text>
      <line x1="20" y1="104" x2="70" y2="104" class="cw"/>
      <line x1="130" y1="104" x2="180" y2="104" class="cw"/>
      <!-- Labels -->
      <text x="5" y="20" fill="#7fffb2" font-size="8" font-family="monospace">+V</text>
      <text x="5" y="145" fill="#36d9d9" font-size="8" font-family="monospace">GND</text>
    </svg>`;
}

function svgCurrentFlow() {
    return `
    <svg viewBox="0 0 220 80" style="max-width:220px" class="circuit-svg">
      <rect x="10" y="30" width="200" height="20" rx="5" fill="#0e1d30" stroke="#7fffb2" stroke-width="1.5"/>
      <text x="110" y="24" fill="#8fa0b5" font-size="9" font-family="monospace" text-anchor="middle">Conductor (wire)</text>
      <!-- Electrons -->
      <circle cx="30" cy="40" r="5" fill="#7fffb2" opacity=".9">
        <animate attributeName="cx" values="30;190;30" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="90" cy="40" r="5" fill="#7fffb2" opacity=".7">
        <animate attributeName="cx" values="90;190;30;90" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="150" cy="40" r="5" fill="#7fffb2" opacity=".5">
        <animate attributeName="cx" values="150;190;30;150" dur="2s" repeatCount="indefinite"/>
      </circle>
      <text x="10" y="72" fill="#36d9d9" font-size="9" font-family="monospace">→ Conventional current</text>
      <text x="10" y="72" fill="#7fffb2" font-size="9" font-family="monospace" transform="translate(0,-60)">← Electrons actually move</text>
    </svg>`;
}

function svgACDC() {
    return `
    <svg viewBox="0 0 240 130" style="max-width:240px" class="circuit-svg">
      <!-- DC line -->
      <text x="10" y="30" fill="#7fffb2" font-size="9" font-family="monospace">DC</text>
      <line x1="30" y1="25" x2="230" y2="25" stroke="#7fffb2" stroke-width="2.5" stroke-linecap="round"/>
      <!-- AC sine wave -->
      <text x="10" y="80" fill="#36d9d9" font-size="9" font-family="monospace">AC</text>
      <path d="M30,80 C55,40 80,120 110,80 C140,40 165,120 190,80 C210,55 220,95 230,80" fill="none" stroke="#36d9d9" stroke-width="2.5" stroke-linecap="round"/>
      <!-- 0V reference -->
      <line x1="30" y1="80" x2="230" y2="80" stroke="#4e6278" stroke-width="1" stroke-dasharray="3 3"/>
      <text x="115" y="118" fill="#4e6278" font-size="8" font-family="monospace" text-anchor="middle">Zero crossing</text>
    </svg>`;
}

function svgPower() {
    return `
    <svg viewBox="0 0 200 140" style="max-width:200px" class="circuit-svg">
      <!-- Resistor generating heat -->
      <rect x="60" y="55" width="80" height="30" rx="5" fill="none" class="cr" stroke-width="2.5"/>
      <text x="100" y="74" fill="#ffc14d" font-size="9" font-family="monospace" text-anchor="middle">P = I²R</text>
      <!-- Heat waves -->
      <path d="M80,52 Q85,42 90,52 Q95,42 100,52 Q105,42 110,52" fill="none" stroke="#f87171" stroke-width="1.5" opacity=".8"/>
      <!-- Current arrows -->
      <line x1="10" y1="70" x2="58" y2="70" class="cw"/>
      <polygon points="54,65 64,70 54,75" fill="#7fffb2"/>
      <line x1="142" y1="70" x2="190" y2="70" class="cw"/>
      <text x="22" y="90" fill="#36d9d9" font-size="9" font-family="monospace">I →</text>
      <text x="150" y="90" fill="#36d9d9" font-size="9" font-family="monospace">→ I</text>
      <!-- V label -->
      <text x="82" y="118" fill="#7fffb2" font-size="10" font-family="monospace">V across R</text>
    </svg>`;
}

function svgVoltageDivider(vout = "Vout") {
    return `
    <svg viewBox="0 0 160 220" style="max-width:130px" class="circuit-svg">
      <line x1="80" y1="10" x2="80" y2="40" class="cw"/>
      <text x="86" y="30" fill="#7fffb2" font-size="9" font-family="monospace">Vin</text>
      <rect x="60" y="40" width="40" height="50" rx="4" fill="none" class="cr" stroke-width="2.5"/>
      <text x="80" y="70" fill="#ffc14d" font-size="9" font-family="monospace" text-anchor="middle">R1</text>
      <line x1="80" y1="90" x2="80" y2="110" class="cw"/>
      <line x1="55" y1="110" x2="105" y2="110" class="cw"/>
      <text x="108" y="114" fill="#36d9d9" font-size="9" font-family="monospace" id="vdOutSVGLabel">${vout}</text>
      <rect x="60" y="110" width="40" height="50" rx="4" fill="none" class="cr" stroke-width="2.5"/>
      <text x="80" y="140" fill="#ffc14d" font-size="9" font-family="monospace" text-anchor="middle">R2</text>
      <line x1="80" y1="160" x2="80" y2="200" class="cw"/>
      <line x1="62" y1="196" x2="98" y2="196" class="cw"/>
      <line x1="68" y1="203" x2="92" y2="203" class="cw"/>
      <line x1="74" y1="210" x2="86" y2="210" class="cw"/>
      <text x="65" y="222" fill="#8fa0b5" font-size="8" font-family="monospace">GND</text>
    </svg>`;
}

function visualFor(type) {
    const map = {
        "atom":             svgAtom(),
        "battery":          svgBattery(),
        "current-flow":     svgCurrentFlow(),
        "resistor":         svgResistance(),
        "ohms-law":         svgOhmsLaw(),
        "power":            svgPower(),
        "series-circuit":   svgSeriesCircuit(),
        "parallel-circuit": svgParallelCircuit(),
        "kcl":              svgKCL(),
        "kvl":              svgKVL(),
        "voltage-divider":  svgVoltageDivider(),
        "ac-dc":            svgACDC()
    };
    return map[type] || svgResistance();
}

/* ============================================================
   XP & LEVEL DISPLAY
============================================================ */
function updateXPDisplay() {
    const xp  = DB.getXP();
    const lv  = getLevel(xp);
    const el  = document.getElementById("xpDisplay");
    const lvl = document.getElementById("levelDisplay");
    if (el)  el.textContent  = `${xp} XP`;
    if (lvl) lvl.textContent = `${lv.icon} Lv.${LEVELS.indexOf(lv)+1}`;
}

function showXPPop(amount) {
    const container = document.getElementById("xpPopContainer");
    if (!container) return;
    const el = document.createElement("div");
    el.className = "xp-pop";
    el.textContent = `+${amount} XP ⚡`;
    container.appendChild(el);
    setTimeout(() => el.remove(), 950);
}

function showConfetti() {
    const container = document.createElement("div");
    container.className = "confetti-container";
    document.body.appendChild(container);
    const colors = ["#7fffb2","#36d9d9","#ffc14d","#a78bfa","#f472b6"];
    for (let i = 0; i < 60; i++) {
        const p = document.createElement("div");
        p.className = "confetti-piece";
        p.style.cssText = `left:${Math.random()*100}%;background:${colors[i%5]};animation-duration:${1+Math.random()*2}s;animation-delay:${Math.random()*0.5}s;border-radius:${Math.random()>0.5?"50%":"2px"};`;
        container.appendChild(p);
    }
    setTimeout(() => container.remove(), 3000);
}

function showMascotFloat(mascotKey, text) {
    const m = mascots[mascotKey];
    if (!m) return;
    const container = document.getElementById("mascotFloat");
    if (!container) return;
    container.innerHTML = `
        <div class="mascot-float-bubble">
            <div class="mascot-float-avatar" style="border-color:${m.color}33">${m.emoji}</div>
            <div class="mascot-float-text">
                <div class="mascot-float-name" style="color:${m.color}">${m.name.toUpperCase()}</div>
                ${text}
            </div>
        </div>`;
    setTimeout(() => { container.innerHTML = ""; }, 4000);
}

/* ============================================================
   LOADING SCREEN
============================================================ */
function initLoader() {
    document.body.classList.add("loading");
    const lines = ["loaderLine1","loaderLine2","loaderLine3","loaderLine4"];
    const delays = [300, 800, 1300, 1800];
    lines.forEach((id, i) => {
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.classList.add("active");
        }, delays[i]);
    });
    setTimeout(() => {
        const loader = document.getElementById("ncuLoader");
        if (loader) loader.classList.add("hidden");
        document.body.classList.remove("loading");
    }, 2600);
}

/* ============================================================
   RENDER HOME
============================================================ */
function renderHome() {
    const mastered = DB.getMastered();
    const completed = mastered.length;
    const xp = DB.getXP();

    return `
    <div class="page">

        <!-- HERO -->
        <section class="hero">
            <div class="hero-content">
                <div class="eyebrow"><span class="eyebrow-dot"></span> 🌌 NCU — THE INTERACTIVE ECE UNIVERSE</div>
                <h1>Learn ECE<br>like you're<br><span class="accent">exploring a world.</span></h1>
                <p class="lead hero-lead">
                    Not lectures. Not slides. Not boring text.
                    Circuits that respond. Simulations you control.
                    Stories that stick. Quizzes that test real understanding.
                </p>
                <p class="hero-tagline">Short Circuit illa, Smart Circuit ⚡</p>

                <div class="hero-steps">
                    ${["LEARN","SEE","UNDERSTAND","INTERACT","SIMULATE","QUIZ","PASS","MASTER"].map((s,i) => `
                        <span class="hero-step">
                            ${i > 0 ? '<span class="hero-step-arrow">→</span>' : ""}
                            ${s}
                        </span>
                    `).join("")}
                </div>

                <div class="hero-actions btn-group mt-32">
                    <a href="#/learn" class="btn btn-primary btn-lg">⚡ Start ECE from Zero</a>
                    <a href="#/universe" class="btn btn-lg">🌌 Explore Universe</a>
                </div>

                <div class="hero-stats">
                    <div class="hero-stat">
                        <strong>${Object.keys(lessons).length}+</strong>
                        <span>CONCEPTS</span>
                    </div>
                    <div class="hero-stat">
                        <strong>16</strong>
                        <span>ECE WORLDS</span>
                    </div>
                    <div class="hero-stat">
                        <strong>${completed}</strong>
                        <span>MASTERED</span>
                    </div>
                    <div class="hero-stat">
                        <strong>${xp}</strong>
                        <span>YOUR XP</span>
                    </div>
                </div>
            </div>

            <!-- Universe Art -->
            <div class="universe-art" aria-hidden="true">
                <div class="u-ring u-ring-1"></div>
                <div class="u-ring u-ring-2"></div>
                <div class="u-ring u-ring-3"></div>

                <!-- World orbs positioned on ring -->
                <a href="#/learn" class="world-orb orb-top" title="ECE Zero" style="--c:#7fffb2">🌱</a>
                <a href="#/learn/circuit-city" class="world-orb orb-tr" title="Circuit City">🔌</a>
                <a href="#/learn/component-city" class="world-orb orb-right" title="Component City">🧩</a>
                <a href="#/learn/analog-world" class="world-orb orb-br" title="Analog World">📈</a>
                <a href="#/learn/digital-world" class="world-orb orb-bottom" title="Digital World">🔢</a>
                <a href="#/learn/embedded-world" class="world-orb orb-bl" title="Embedded World">🤖</a>
                <a href="#/learn/vlsi-world" class="world-orb orb-left" title="VLSI World">🔬</a>
                <a href="#/learn/power-world" class="world-orb orb-tl" title="Power World">⚡</a>

                <!-- NCU Core -->
                <a href="#/universe" class="u-core" aria-label="NCU Universe">
                    <div class="u-core-inner">
                        NCU<br>CORE
                    </div>
                </a>
            </div>
        </section>

        <!-- Mascot strip -->
        <section class="section-xs">
            <div class="eyebrow mt-12"><span class="eyebrow-dot"></span> 👾 MEET YOUR CIRCUIT CREW</div>
            <div class="mascot-strip mt-20">
                ${Object.values(mascots).map(m => `
                    <a class="mascot-chip" href="#/characters">
                        <div class="mascot-svg-wrap" style="background:${m.color}18;border-color:${m.color}30">
                            <span>${m.emoji}</span>
                        </div>
                        <div>
                            <strong style="color:${m.color}">${m.name}</strong>
                            <span>${m.concept}</span>
                        </div>
                    </a>
                `).join("")}
            </div>
        </section>

        <!-- Learning Path Preview -->
        <section class="section">
            <div class="sh">
                <div>
                    <div class="eyebrow"><span class="eyebrow-dot"></span> 🌱 ECE ZERO — START HERE</div>
                    <h2 style="margin-top:10px">From atom to circuit.</h2>
                </div>
                <p>Complete the first path to unlock the full ECE Universe. Each concept builds on the last.</p>
            </div>

            <div class="learning-path">
                ${Object.entries(lessons).slice(0,6).map(([id, l]) => {
                    const m = DB.isMastered(id);
                    const unlocked = isUnlocked(id);
                    return `
                    <div class="path-node">
                        <div class="path-dot ${m ? "mastered" : unlocked ? "current" : ""}"></div>
                        <a class="path-label ${m ? "mastered" : unlocked ? "current" : ""}" href="${unlocked ? "#/topic/"+id : "javascript:void(0)"}">
                            ${m ? "✓ " : unlocked ? "▶ " : "🔒 "}${l.title}
                            ${m ? `<span class="badge badge-mint" style="margin-left:8px">MASTERED</span>` : unlocked ? `<span class="badge badge-cyan" style="margin-left:8px">START</span>` : `<span class="badge badge-dim" style="margin-left:8px">LOCKED</span>`}
                        </a>
                    </div>`;
                }).join("")}
            </div>

            <div class="btn-group mt-32">
                <a href="#/learn" class="btn btn-primary">📚 Go to ECE Zero →</a>
                <a href="#/roadmap" class="btn">🗺️ View Full Roadmap</a>
            </div>
        </section>

        <!-- Roadmap -->
        <section class="section">
            <div class="sh">
                <div>
                    <div class="eyebrow"><span class="eyebrow-dot"></span> ROADMAP</div>
                    <h2 style="margin-top:10px">Zero → Advanced.</h2>
                </div>
                <p>Learn in order or jump into any world.<br>The universe keeps expanding.</p>
            </div>
            <div class="roadmap">
                ${roadmap.slice(0,6).map(([num,title,text,color],i) => `
                    <div class="road-item${mastered.length > i ? " completed" : ""}" style="--road-col:${color}">
                        <div class="road-num">${num}</div>
                        <div class="road-info">
                            <h4>${title}</h4>
                            <p>${text}</p>
                        </div>
                        <div class="road-status">${mastered.length > i ? "✓ STARTED" : "→"}</div>
                    </div>
                `).join("")}
            </div>
            <div class="btn-group mt-24">
                <a href="#/roadmap" class="btn btn-primary">View Full Roadmap →</a>
            </div>
        </section>

        <!-- Everyday Engineering preview -->
        <section class="section">
            <div class="sh">
                <div>
                    <div class="eyebrow"><span class="eyebrow-dot"></span> ENGINEERING IN EVERYDAY LIFE</div>
                    <h2 style="margin-top:10px">Look around.<br>ECE is everywhere.</h2>
                </div>
                <p>Pick something you use every day.<br>We'll break it down into ECE concepts.</p>
            </div>
            <div class="everyday-grid">
                ${everyday.slice(0,3).map(item => `
                    <a class="everyday-card" href="#/everyday/${item.id}">
                        <div class="everyday-img">
                            <div class="everyday-emoji">${item.icon}</div>
                        </div>
                        <div class="everyday-info">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <div class="ece-tags">${item.tags.slice(0,3).map(t=>`<span class="badge badge-mint">${t}</span>`).join("")}</div>
                        </div>
                    </a>
                `).join("")}
            </div>
            <div class="btn-group mt-32">
                <a href="#/everyday" class="btn btn-primary">Explore Everyday Engineering →</a>
            </div>
        </section>

    </div>`;
}

/* ============================================================
   RENDER UNIVERSE
============================================================ */
function renderUniverse() {
    return `
    <div class="page">
        <section class="domain-hero">
            <div class="eyebrow"><span class="eyebrow-dot"></span> 🌌 ECE UNIVERSE</div>
            <h1 style="margin-top:14px">Choose your world.</h1>
            <p class="lead mt-20">ECE is a connected system. Learn one world and you'll start recognising its concepts everywhere else.</p>
        </section>
        <section class="section-sm">
            <div class="worlds-grid">
                ${domains.map(d => `
                    <a class="world-card card-glow-mint" href="#/learn/${d.id}" style="--wc:${d.wc}">
                        <svg class="world-card-traces" viewBox="0 0 120 80" fill="none">
                            <path d="M0 40 H30 L40 20 H80 L90 40 H120" stroke="${d.color}" stroke-width="0.8" opacity=".4"/>
                            <circle cx="30" cy="40" r="2" fill="${d.color}" opacity=".5"/>
                            <circle cx="80" cy="20" r="2" fill="${d.color}" opacity=".5"/>
                        </svg>
                        <div class="world-number">${d.number}</div>
                        <div class="world-icon-wrap">${d.icon}</div>
                        <h3>${d.title}</h3>
                        <p>${d.description}</p>
                        <div class="world-meta">
                            <span class="world-level" style="color:${d.color}">${d.level}</span>
                            <span class="world-arrow">ENTER →</span>
                        </div>
                    </a>
                `).join("")}
            </div>
            <div class="btn-group mt-40">
                <a href="#/roadmap" class="btn btn-primary">View Full Roadmap →</a>
                <a href="#/learn" class="btn">Start ECE Zero</a>
            </div>
        </section>
    </div>`;
}

/* ============================================================
   RENDER LEARN
============================================================ */
function renderLearn() {
    const ids = Object.keys(lessons);
    const mastered = DB.getMastered();
    const done = mastered.filter(id => ids.includes(id)).length;
    const pct = ids.length ? Math.round((done / ids.length) * 100) : 0;

    return `
    <div class="page">
        <section class="learn-hero">
            <div class="eyebrow"><span class="eyebrow-dot"></span> 📚 ECE ZERO</div>
            <h1 style="margin-top:14px">Start from nothing.</h1>
            <p class="lead mt-20">No assumptions. No "you should already know this." We build the foundation one idea at a time.</p>
            <div class="progress-track mt-28">
                <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
                <span class="progress-label">${pct}% mastered · ${done}/${ids.length}</span>
            </div>
        </section>
        <section class="section-sm">
            <div class="topic-grid">
                ${ids.map((id, index) => {
                    const l = lessons[id];
                    const isMastered = DB.isMastered(id);
                    const unlocked = isUnlocked(id);
                    return `
                        <a class="topic-card${isMastered ? " done" : unlocked ? "" : " locked"}"
                           href="${unlocked ? "#/topic/"+id : "javascript:void(0)"}"
                           title="${!unlocked ? "Complete prerequisites first: "+prereqs[id].join(", ") : ""}">
                            <div class="topic-num">
                                ${isMastered ? '<span class="topic-check">✓</span>' : unlocked ? "" : "🔒"}
                                ${String(index+1).padStart(2,"0")} · ${l.eyebrow.split("·")[0].trim()}
                            </div>
                            <h3>${l.title}</h3>
                            <p>${l.subtitle}</p>
                            <span class="topic-enter">${isMastered ? "REVIEW →" : unlocked ? "ENTER LESSON →" : "LOCKED"}</span>
                        </a>`;
                }).join("")}
            </div>
        </section>
    </div>`;
}

/* ============================================================
   RENDER DOMAIN
============================================================ */
function renderDomain(id) {
    if (id === "ece-zero") return renderLearn();
    const d = domains.find(x => x.id === id);
    if (!d) return renderNotFound();
    const topics = domainTopics[id] || [];
    return `
    <div class="page">
        <section class="domain-hero">
            <div class="eyebrow"><span class="eyebrow-dot"></span> ${d.number} · ${d.level}</div>
            <h1 style="margin-top:14px">${d.icon} ${d.title}</h1>
            <p class="lead mt-20">${d.description}</p>
        </section>
        <section class="section-sm">
            <div class="topic-grid">
                ${topics.map((t,i) => `
                    <div class="topic-card" tabindex="0">
                        <div class="topic-num">${String(i+1).padStart(2,"0")}</div>
                        <h3>${t}</h3>
                        <p>Part of the ${d.title} learning path.</p>
                        <span class="topic-enter" style="color:${d.color}">COMING SOON →</span>
                    </div>
                `).join("")}
            </div>
        </section>
    </div>`;
}

/* ============================================================
   RENDER TOPIC (Full Learning Engine)
============================================================ */
function renderTopic(id) {
    const lesson = lessons[id];
    if (!lesson) return renderNotFound();
    if (!isUnlocked(id)) return renderLocked(id);

    const mascot = mascots[lesson.mascot];
    const isMastered = DB.isMastered(id);
    const lessonIds = Object.keys(lessons);
    const idx = lessonIds.indexOf(id);
    const attempts = DB.getAttempts()[id] || { attempts: 0, passes: 0 };

    return `
    <div class="page">

        <section class="lesson-hero">
            <div class="eyebrow"><span class="eyebrow-dot"></span> ${lesson.eyebrow}</div>
            <h1 style="margin-top:14px">${lesson.title}</h1>
            <p class="lead mt-20">${lesson.subtitle}</p>
            ${isMastered ? `<div class="concept-status-bar status-mastered mt-16">✓ CONCEPT MASTERED · +${lesson.xp} XP EARNED</div>` : `<div class="concept-status-bar status-unlocked mt-16">▶ UNLOCKED — QUIZ TO MASTER</div>`}
        </section>

        <div class="lesson-layout">
            <main class="lesson-main">

                <!-- HOOK -->
                <section class="lcard hook-card">
                    <div>
                        <div class="eyebrow"><span class="eyebrow-dot"></span> ⚡ THE HOOK</div>
                        <div class="hook-q">${lesson.hook}</div>
                    </div>
                    <div class="hook-visual">${visualFor(lesson.visual)}</div>
                </section>

                <!-- EXPLANATION TOGGLE -->
                <section class="lcard explain-section">
                    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:20px">
                        <div class="eyebrow"><span class="eyebrow-dot"></span> 🧠 EXPLANATION</div>
                        <div class="explain-mode-wrap">
                            <button class="explain-mode-btn active" data-mode="simple" id="modeSimple">SIMPLE</button>
                            <button class="explain-mode-btn" data-mode="engineer" id="modeEngineer">ENGINEER</button>
                        </div>
                    </div>
                    <div class="mode-panel active" id="panelSimple">
                        <p style="font-size:15px;line-height:1.85">${lesson.simple}</p>
                    </div>
                    <div class="mode-panel" id="panelEngineer">
                        <p style="font-size:14px;line-height:1.8;color:var(--muted)">${lesson.engineer}</p>
                    </div>
                </section>

                <!-- MASCOT DIALOGUE -->
                <section class="lcard">
                    <div class="eyebrow"><span class="eyebrow-dot"></span> 👾 ${mascot.name.toUpperCase()} EXPLAINS</div>
                    <div class="mascot-dialogue mt-20">
                        <div class="dialogue-avatar" style="border-color:${mascot.color}44;background:linear-gradient(145deg,${mascot.color}15,transparent)">${mascot.emoji}</div>
                        <div class="dialogue-bubble">
                            <span class="dialogue-name" style="color:${mascot.color}">${mascot.name} · ${mascot.concept}</span>
                            <p>"${lesson.mascotText}"</p>
                        </div>
                    </div>
                </section>

                ${lesson.formula ? `
                <!-- FORMULA -->
                <section class="lcard">
                    <div class="eyebrow"><span class="eyebrow-dot"></span> 📐 FORMULA</div>
                    <div class="formula-panel mt-16">
                        <div class="formula-display">${lesson.formula}</div>
                        ${lesson.formulaVars ? `
                        <div class="formula-meta">
                            ${lesson.formulaVars.map(([sym,name,unit]) => `
                                <div class="formula-var">
                                    <span>${sym}</span>
                                    <small>${name} (${unit})</small>
                                </div>
                            `).join("")}
                        </div>` : ""}
                    </div>
                </section>` : ""}

                <!-- INTERACTIVE EXPERIMENT -->
                <section class="lcard experiment-card" id="expSection">
                    <div class="eyebrow"><span class="eyebrow-dot"></span> 🧪 INTERACTIVE EXPERIMENT</div>
                    <h2>Don't just read it. Change it.</h2>
                    <div class="experiment-grid">
                        <div class="exp-controls">
                            <div class="ctrl-row">
                                <label><span>Voltage (V)</span><strong id="voltageVal">5 V</strong></label>
                                <input id="expVoltage" type="range" min="1" max="24" value="5" aria-label="Voltage slider">
                            </div>
                            <div class="ctrl-row">
                                <label><span>Resistance (Ω)</span><strong id="resistanceVal">100 Ω</strong></label>
                                <input id="expResistance" type="range" min="10" max="1000" value="100" aria-label="Resistance slider">
                            </div>
                            <div class="val-display">
                                <span class="val-label">Current I = V / R</span>
                                <strong id="expCurrent">50.0 mA</strong>
                            </div>
                            <div class="val-display">
                                <span class="val-label">Power P = V × I</span>
                                <strong id="expPower">0.250 W</strong>
                            </div>
                        </div>
                        <div class="circuit-screen" id="expScreen">${svgResistance()}</div>
                    </div>
                </section>

                <!-- REAL WORLD -->
                <section class="lcard">
                    <div class="eyebrow"><span class="eyebrow-dot"></span> 🌍 REAL WORLD</div>
                    <h2>Where will you find it?</h2>
                    <p class="mt-12">${lesson.real}</p>
                </section>

                <!-- MASTERY QUIZ -->
                <section class="lcard" id="masterySection">
                    <div class="eyebrow"><span class="eyebrow-dot"></span> 🎯 MASTERY QUIZ</div>
                    <h2>${isMastered ? "Concept Mastered! ✓" : "Pass to earn XP & unlock next."}</h2>
                    <p class="muted mt-8">Pass threshold: 70% · Attempts: ${attempts.attempts} · Passes: ${attempts.passes}</p>
                    ${isMastered ? `
                    <div class="quiz-pass-banner mt-20">
                        <div style="font-size:48px">🏆</div>
                        <div class="pass-xp-badge">+${lesson.xp} XP EARNED</div>
                        <p class="muted mt-8">You've mastered this concept! Review or move to the next.</p>
                    </div>` : `
                    <div id="lessonQuizArea" class="mt-20">
                        <button class="btn btn-primary" id="startMasteryQuiz">🎯 Start Mastery Quiz (${Math.min(4,lesson.quizPool.length)} Questions)</button>
                    </div>`}
                </section>

                <!-- NAVIGATION -->
                <section class="lcard complete-card">
                    <div class="eyebrow"><span class="eyebrow-dot"></span> 🚀 CONTINUE</div>
                    <div class="btn-group mt-16">
                        ${lesson.next
                            ? `<a class="btn${isUnlocked(lesson.next) || isMastered ? " btn-primary" : ""}" href="${isUnlocked(lesson.next) || isMastered ? "#/topic/"+lesson.next : "javascript:void(0)"}">
                                ${isUnlocked(lesson.next) || isMastered ? `Next: ${lessons[lesson.next]?.title} →` : "🔒 Pass quiz to unlock next"}
                               </a>`
                            : `<a class="btn btn-primary" href="#/learn">← Back to ECE Zero</a>`}
                        <a class="btn" href="#/learn">← All Concepts</a>
                    </div>
                </section>

            </main>
        </div>
    </div>`;
}

/* ============================================================
   RENDER LOCKED
============================================================ */
function renderLocked(id) {
    const lesson = lessons[id];
    const pList = prereqs[id] || [];
    return `
    <div class="page">
        <div class="not-found">
            <div style="font-size:64px">🔒</div>
            <div class="eyebrow mt-20"><span class="eyebrow-dot"></span> LOCKED CONCEPT</div>
            <h2>${lesson?.title || "Concept Locked"}</h2>
            <p>Complete the prerequisites to unlock this concept:</p>
            <div class="ece-tags mt-16" style="justify-content:center">
                ${pList.map(p => `<a href="#/topic/${p}" class="badge badge-cyan">${lessons[p]?.title || p}</a>`).join("")}
            </div>
            <a href="#/learn" class="btn btn-primary mt-24">← Back to ECE Zero</a>
        </div>
    </div>`;
}

/* ============================================================
   MASTERY QUIZ ENGINE (XP only on PASS)
============================================================ */
let lessonQuizState = { id: null, questions: [], current: 0, score: 0, answered: false, finished: false };

function buildLessonQuiz(id) {
    const lesson = lessons[id];
    if (!lesson) return;
    const pool = [...lesson.quizPool];
    const recentUsed = DB.getRecentQ();
    // Shuffle, prefer non-recently-used questions
    pool.sort((a, b) => {
        const ai = recentUsed.indexOf(pool.indexOf(a).toString());
        const bi = recentUsed.indexOf(pool.indexOf(b).toString());
        return ai - bi;
    });
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    lessonQuizState = {
        id,
        questions: pool.slice(0, Math.min(4, pool.length)),
        current: 0, score: 0, answered: false, finished: false
    };
    renderLessonQuizQuestion();
}

function renderLessonQuizQuestion() {
    const area = document.getElementById("lessonQuizArea");
    if (!area) return;
    const { questions, current, score } = lessonQuizState;
    const q = questions[current];
    if (!q) return;
    const letters = ["A","B","C","D"];
    area.innerHTML = `
        <div class="arena-header" style="margin-bottom:16px">
            <div class="arena-stat"><div class="val">${current+1}/${questions.length}</div><div class="lbl">Question</div></div>
            <div class="arena-stat"><div class="val" id="lqScore" style="color:var(--mint)">${score}</div><div class="lbl">Correct</div></div>
            <div class="arena-stat"><div class="val" style="color:var(--amber)">70%</div><div class="lbl">Pass mark</div></div>
        </div>
        <div class="arena-question">
            <div class="q-number">QUESTION ${current+1} OF ${questions.length}</div>
            <h2 style="font-size:18px">${q.q}</h2>
            <div class="arena-opts" id="lqOpts">
                ${q.opts.map((o,i) => `
                    <button class="arena-opt" data-idx="${i}" data-correct="${i===q.ans}">
                        <span class="opt-letter">${letters[i]}</span>${o}
                    </button>`).join("")}
            </div>
            <div class="arena-explanation" id="lqExp"><strong>Explanation:</strong> ${q.exp}</div>
            <div class="arena-next" id="lqNext" style="display:none">
                <button class="btn btn-primary" id="lqNextBtn">${current+1<questions.length ? "Next Question →" : "See Results →"}</button>
            </div>
        </div>`;
    attachLessonQuizOpts();
}

function attachLessonQuizOpts() {
    document.querySelectorAll(".arena-opt").forEach(btn => {
        btn.addEventListener("click", () => {
            if (lessonQuizState.answered) return;
            lessonQuizState.answered = true;
            const isCorrect = btn.dataset.correct === "true";
            document.querySelectorAll(".arena-opt").forEach(b => {
                b.disabled = true;
                if (b.dataset.correct === "true") b.classList.add("correct");
            });
            if (!isCorrect) btn.classList.add("wrong");
            else {
                lessonQuizState.score++;
                const sc = document.getElementById("lqScore");
                if (sc) sc.textContent = lessonQuizState.score;
            }
            const exp = document.getElementById("lqExp");
            if (exp) exp.classList.add("show");
            const next = document.getElementById("lqNext");
            if (next) next.style.display = "flex";
        });
    });
    const nextBtn = document.getElementById("lqNextBtn");
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            lessonQuizState.answered = false;
            lessonQuizState.current++;
            if (lessonQuizState.current >= lessonQuizState.questions.length) {
                showLessonQuizResult();
            } else {
                renderLessonQuizQuestion();
            }
        });
    }
}

function showLessonQuizResult() {
    const area = document.getElementById("lessonQuizArea");
    if (!area) return;
    const { id, score, questions } = lessonQuizState;
    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    const pass = pct >= 70;
    const lesson = lessons[id];

    DB.recordAttempt(id, pass);

    if (pass && !DB.isMastered(id)) {
        DB.master(id);
        DB.addXP(lesson.xp);
        showXPPop(lesson.xp);
        showConfetti();
        showMascotFloat(lesson.mascot, `🎉 You mastered "${lesson.title}"! +${lesson.xp} XP!`);
    }

    if (pass) {
        area.innerHTML = `
            <div class="quiz-pass-banner">
                <div style="font-size:52px">🏆</div>
                <h2 style="margin:12px 0">You PASSED! ${pct}%</h2>
                <div class="pass-xp-badge">+${lesson.xp} XP EARNED</div>
                <p class="muted mt-12">${score}/${total} correct. Concept mastered!</p>
                ${lesson.next && (isUnlocked(lesson.next) || DB.isMastered(id)) ? `
                    <div class="btn-group mt-20" style="justify-content:center">
                        <a href="#/topic/${lesson.next}" class="btn btn-primary">Next Concept →</a>
                    </div>` : ""}
            </div>`;
    } else {
        area.innerHTML = `
            <div class="quiz-fail-banner">
                <div style="font-size:52px">💥</div>
                <h2 style="margin:12px 0">Not quite. ${pct}%</h2>
                <p class="muted">${score}/${total} correct. You need 70% to pass.</p>
                <div class="quiz-fail-banner mt-12" style="padding:12px;margin:0">
                    <p style="font-size:13px">Review the lesson, then retry with new questions.</p>
                </div>
                <div class="btn-group mt-20" style="justify-content:center">
                    <button class="btn btn-primary" id="retryMasteryQuiz">🔄 Retry with New Questions</button>
                </div>
            </div>`;
        setTimeout(() => {
            document.getElementById("retryMasteryQuiz")?.addEventListener("click", () => buildLessonQuiz(id));
        }, 100);
    }
}

/* ============================================================
   RENDER EVERYDAY LIST / DETAIL
============================================================ */
function renderEveryday() {
    return `
    <div class="page">
        <section class="domain-hero">
            <div class="eyebrow"><span class="eyebrow-dot"></span> 🌍 ENGINEERING IN EVERYDAY LIFE</div>
            <h1 style="margin-top:14px">Look around.<br>ECE is everywhere.</h1>
            <p class="lead mt-20">Pick something you use every day. We'll break it down into the engineering concepts hiding underneath.</p>
        </section>
        <section class="section-sm">
            <div class="everyday-grid">
                ${everyday.map(item => `
                    <a class="everyday-card" href="#/everyday/${item.id}">
                        <div class="everyday-img">
                            <div class="everyday-emoji">${item.icon}</div>
                        </div>
                        <div class="everyday-info">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <div class="ece-tags">${item.tags.map(t=>`<span class="badge badge-mint">${t}</span>`).join("")}</div>
                        </div>
                    </a>
                `).join("")}
            </div>
        </section>
    </div>`;
}

function renderEverydayDetail(id) {
    const item = everyday.find(x => x.id === id);
    if (!item) return renderNotFound();
    return `
    <div class="page">
        <section class="device-hero">
            <div class="eyebrow"><span class="eyebrow-dot"></span> 🌍 ENGINEERING IN EVERYDAY LIFE</div>
            <h1 style="margin-top:14px">${item.icon} ${item.title}</h1>
            <p class="lead mt-20">${item.intro}</p>
            <div class="ece-tags mt-20">${item.tags.map(t=>`<span class="badge badge-mint">${t}</span>`).join("")}</div>
        </section>
        <section class="section-sm">
            <div class="device-visual">
                <div style="text-align:center;position:relative;z-index:2">
                    <div style="font-size:140px;filter:drop-shadow(0 24px 40px rgba(0,0,0,.55))">${item.icon}</div>
                    <div class="device-ece-label"><span class="badge badge-mint">ECE INSIDE</span></div>
                </div>
            </div>
        </section>
        <section class="section-sm">
            <div class="sh">
                <div>
                    <div class="eyebrow"><span class="eyebrow-dot"></span> BREAK IT DOWN</div>
                    <h2 style="margin-top:10px">What's actually happening?</h2>
                </div>
                <p>The same ECE concepts appear as building blocks inside real systems.</p>
            </div>
            <div class="breakdown-grid">
                ${item.blocks.map(([title,text],i) => `
                    <article class="breakdown-block">
                        <div class="step-num">0${i+1}</div>
                        <h3>${title}</h3>
                        <p>${text}</p>
                    </article>
                `).join("")}
            </div>
        </section>
        <section class="section-sm">
            <div class="lcard">
                <div class="eyebrow"><span class="eyebrow-dot"></span> 🔗 CONNECT THE DOTS</div>
                <h2>This is why ECE matters.</h2>
                <p class="muted mt-12">A real product combines circuits, components, signals, embedded systems, software, communication and power electronics.</p>
                <div class="ece-tags mt-20">${item.tags.map(t=>`<span class="badge badge-mint">${t}</span>`).join("")}</div>
                <div class="btn-group mt-24">
                    <a href="#/everyday" class="btn">← All Devices</a>
                    <a href="#/universe" class="btn btn-primary">Explore ECE Worlds →</a>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============================================================
   RENDER CHARACTERS
============================================================ */
function renderCharacters() {
    return `
    <div class="page">
        <section class="characters-hero domain-hero">
            <div class="eyebrow"><span class="eyebrow-dot"></span> 👾 CIRCUIT CREW</div>
            <h1 style="margin-top:14px">Meet the engineers inside your head.</h1>
            <p class="lead mt-20">Each character represents a concept. They teach through stories, guide through lessons, and react to your answers.</p>
        </section>
        <section class="section-sm">
            <div class="characters-grid">
                ${Object.values(mascots).map(m => `
                    <div class="char-card">
                        <div class="char-avatar" style="border-color:${m.color}44;box-shadow:0 0 24px ${m.color}15">${m.emoji}</div>
                        <strong style="color:${m.color}">${m.name}</strong>
                        <span class="char-concept" style="color:${m.color}88">${m.role}</span>
                        <p class="char-line">"${m.line}"</p>
                        ${m.formula ? `<div class="char-role mt-4"><span class="badge ${m.badge}" style="font-family:var(--mono);font-size:11px">${m.formula}</span></div>` : ""}
                        <div class="char-role">${m.topics.slice(0,3).map(t=>`<span class="badge badge-dim">${t}</span>`).join("")}</div>
                    </div>
                `).join("")}
            </div>
        </section>
    </div>`;
}

/* ============================================================
   RENDER LAB
============================================================ */
function renderLab() {
    return `
    <div class="page">
        <section class="lab-hero domain-hero">
            <div class="eyebrow"><span class="eyebrow-dot"></span> 🧪 NCU LAB</div>
            <h1 style="margin-top:14px">Stop reading.<br>Start experimenting.</h1>
            <p class="lead mt-20">Interactive simulations that let you change values and see results instantly. Real engineering intuition comes from doing, not reading.</p>
        </section>
        <section class="section-sm">
            <div class="lab-grid">

                <!-- Ohm's Law Lab -->
                <div class="lab-card">
                    <div class="badge badge-mint">OHM'S LAW LAB</div>
                    <h3>V = I × R</h3>
                    <p class="muted mt-8">Change voltage and resistance. Watch current respond instantly.</p>
                    <div class="experiment-grid mt-20">
                        <div class="exp-controls">
                            <div class="ctrl-row">
                                <label><span>Voltage</span><strong id="labV">5 V</strong></label>
                                <input id="labVoltage" type="range" min="1" max="24" value="5" aria-label="Lab voltage">
                            </div>
                            <div class="ctrl-row">
                                <label><span>Resistance</span><strong id="labR">100 Ω</strong></label>
                                <input id="labResistance" type="range" min="10" max="1000" value="100" aria-label="Lab resistance">
                            </div>
                            <div class="val-display"><span class="val-label">Current I = V/R</span><strong id="labI">50.0 mA</strong></div>
                            <div class="val-display"><span class="val-label">Power P = V×I</span><strong id="labP">0.250 W</strong></div>
                        </div>
                        <div class="circuit-screen">${svgResistance()}</div>
                    </div>
                </div>

                <!-- RC Charging Lab -->
                <div class="lab-card">
                    <div class="badge badge-cyan">RC CHARGING LAB</div>
                    <h3>τ = R × C</h3>
                    <p class="muted mt-8">Simulate capacitor charge/discharge. See the exponential curve live.</p>
                    <div class="experiment-grid mt-20">
                        <div class="exp-controls">
                            <div class="ctrl-row">
                                <label><span>Resistance (kΩ)</span><strong id="rcR">10 kΩ</strong></label>
                                <input id="rcResistance" type="range" min="1" max="100" value="10" aria-label="RC resistance">
                            </div>
                            <div class="ctrl-row">
                                <label><span>Capacitance (μF)</span><strong id="rcC">100 μF</strong></label>
                                <input id="rcCapacitance" type="range" min="10" max="1000" value="100" aria-label="RC capacitance">
                            </div>
                            <div class="val-display"><span class="val-label">τ = RC</span><strong id="rcTau">1.00 s</strong></div>
                            <div class="val-display"><span class="val-label">63.2% at:</span><strong id="rcTime">1.00 s</strong></div>
                            <button class="btn btn-cyan mt-12" id="rcStart" style="width:100%">▶ Simulate Charge</button>
                        </div>
                        <div class="circuit-screen" id="rcCanvas">
                            <canvas id="rcChart" width="240" height="160" style="max-width:100%"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Voltage Divider Lab -->
                <div class="lab-card">
                    <div class="badge badge-amber">VOLTAGE DIVIDER LAB</div>
                    <h3>Vout = Vin × R2/(R1+R2)</h3>
                    <p class="muted mt-8">See how resistor ratio determines output voltage.</p>
                    <div class="experiment-grid mt-20">
                        <div class="exp-controls">
                            <div class="ctrl-row"><label><span>Vin</span><strong id="vdVin">12 V</strong></label><input id="vdVoltage" type="range" min="1" max="30" value="12" aria-label="Input voltage"></div>
                            <div class="ctrl-row"><label><span>R1 (kΩ)</span><strong id="vdR1">10 kΩ</strong></label><input id="vdR1slider" type="range" min="1" max="100" value="10" aria-label="R1"></div>
                            <div class="ctrl-row"><label><span>R2 (kΩ)</span><strong id="vdR2">10 kΩ</strong></label><input id="vdR2slider" type="range" min="1" max="100" value="10" aria-label="R2"></div>
                            <div class="val-display"><span class="val-label">Vout = Vin×R2/(R1+R2)</span><strong id="vdVout">6.00 V</strong></div>
                        </div>
                        <div class="circuit-screen" id="vdScreen" style="display:flex;align-items:center;justify-content:center">
                            ${svgVoltageDivider("6V")}
                        </div>
                    </div>
                </div>

                <!-- LED Lab -->
                <div class="lab-card">
                    <div class="badge badge-pink">LED CIRCUIT LAB</div>
                    <h3>LED Current Limiting</h3>
                    <p class="muted mt-8">Calculate the correct series resistor to drive an LED safely.</p>
                    <div class="experiment-grid mt-20">
                        <div class="exp-controls">
                            <div class="ctrl-row"><label><span>Supply Voltage</span><strong id="ledVs">5 V</strong></label><input id="ledVsupply" type="range" min="3" max="24" value="5" aria-label="LED supply voltage"></div>
                            <div class="ctrl-row"><label><span>LED Forward Voltage (Vf)</span><strong id="ledVf">2.0 V</strong></label><input id="ledVforward" type="range" min="15" max="35" value="20" step="1" aria-label="LED forward voltage"></div>
                            <div class="ctrl-row"><label><span>Desired Current (mA)</span><strong id="ledImA">20 mA</strong></label><input id="ledCurrent" type="range" min="5" max="50" value="20" aria-label="LED desired current"></div>
                            <div class="val-display"><span class="val-label">R = (Vs - Vf) / I</span><strong id="ledR">150 Ω</strong></div>
                        </div>
                        <div class="circuit-screen" id="ledScreen" style="display:flex;align-items:center;justify-content:center">
                            <svg viewBox="0 0 160 200" style="max-width:120px">
                                <line x1="80" y1="10" x2="80" y2="40" class="cw"/>
                                <rect x="62" y="40" width="36" height="40" rx="4" fill="none" class="cr" stroke-width="2"/>
                                <text x="80" y="64" fill="#ffc14d" font-size="9" font-family="monospace" text-anchor="middle" id="ledResVal">150Ω</text>
                                <line x1="80" y1="80" x2="80" y2="110" class="cw"/>
                                <polygon points="62,110 98,110 80,140" fill="none" stroke="#f472b6" stroke-width="2.5" stroke-linejoin="round"/>
                                <line x1="62" y1="140" x2="98" y2="140" stroke="#f472b6" stroke-width="2.5"/>
                                <line x1="80" y1="140" x2="80" y2="180" class="cw"/>
                                <text x="100" y="125" fill="#f472b6" font-size="9" font-family="monospace">LED</text>
                                <line x1="58" y1="175" x2="102" y2="175" class="cw"/>
                                <line x1="65" y1="183" x2="95" y2="183" class="cw"/>
                                <line x1="72" y1="191" x2="88" y2="191" class="cw"/>
                                <circle cx="80" cy="125" r="22" fill="none" stroke="#f472b6" stroke-width="1" opacity="0.3" id="ledGlow"/>
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </div>`;
}

/* ============================================================
   QUIZ ARENA
============================================================ */
let quizState = { mode: "beginner", current: 0, score: 0, total: 0, questions: [], answered: false, finished: false };

function renderQuiz() {
    return `
    <div class="page">
        <section class="quiz-hero domain-hero">
            <div class="eyebrow"><span class="eyebrow-dot"></span> 🎯 QUIZ ARENA</div>
            <h1 style="margin-top:14px">Let's see what<br>you actually know.</h1>
            <p class="lead mt-20">Don't worry about getting everything right. Mistakes are part of engineering. Keep going.</p>
        </section>
        <section class="section-sm">
            <div class="quiz-modes" id="quizModes">
                ${[
                    {id:"beginner",icon:"🌱",label:"ECE Beginner",desc:"Fundamentals"},
                    {id:"intermediate",icon:"⚡",label:"Intermediate",desc:"Core concepts"},
                    {id:"advanced",icon:"🔬",label:"Advanced",desc:"Deep theory"},
                    {id:"rapid",icon:"⚡",label:"Rapid Fire",desc:"Quick rounds"}
                ].map(m => `
                    <div class="quiz-mode-card${quizState.mode===m.id?" active":""}" data-mode="${m.id}" role="button" tabindex="0" aria-pressed="${quizState.mode===m.id}">
                        <div class="quiz-mode-icon">${m.icon}</div>
                        <h4>${m.label}</h4>
                        <p>${m.desc}</p>
                    </div>`).join("")}
            </div>
            <div id="quizArena">${renderQuizStart()}</div>
        </section>
    </div>`;
}

function renderQuizStart() {
    return `
    <div style="text-align:center;padding:50px 20px">
        <div style="font-size:64px;margin-bottom:20px">🎯</div>
        <h2>Ready to test your knowledge?</h2>
        <p class="muted mt-12">Select a mode above and press Start. Pass rate shown in results.</p>
        <button class="btn btn-primary btn-lg mt-24" id="quizStartBtn">🚀 Start Quiz</button>
    </div>`;
}

function buildQuizSession(mode) {
    let pool = [...(quizData[mode] || quizData.beginner)];
    for (let i = pool.length-1; i > 0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        [pool[i],pool[j]] = [pool[j],pool[i]];
    }
    return pool.slice(0, Math.min(8, pool.length));
}

function renderArenaQuestion(q, idx, total) {
    const letters = ["A","B","C","D"];
    return `
    <div class="arena-header">
        <div class="arena-stat"><div class="val">${idx+1} / ${total}</div><div class="lbl">Question</div></div>
        <div class="arena-stat"><div class="val" id="arenaScore">${quizState.score}</div><div class="lbl">Score</div></div>
        <div class="arena-stat"><div class="val" style="color:var(--mint)">${DB.getXP()}</div><div class="lbl">Total XP</div></div>
    </div>
    <div class="arena-question">
        <div class="q-number">QUESTION ${idx+1} OF ${total}</div>
        <h2>${q.q}</h2>
        <div class="arena-opts" id="arenaOpts">
            ${q.opts.map((o,i) => `
                <button class="arena-opt" data-idx="${i}" data-correct="${i===q.ans}">
                    <span class="opt-letter">${letters[i]}</span>${o}
                </button>`).join("")}
        </div>
        <div class="arena-explanation" id="arenaExp"><strong>Explanation:</strong> ${q.exp}</div>
        <div class="arena-next" id="arenaNext" style="display:none">
            <button class="btn btn-primary" id="nextQBtn">${idx+1<total?"Next Question →":"See Results →"}</button>
        </div>
    </div>`;
}

function renderArenaResult(score, total) {
    const pct = Math.round((score/total)*100);
    const pass = pct >= 70;
    let grade, emoji;
    if (pct >= 90) { grade = "Outstanding Engineer! 🏆"; emoji = "🌟"; }
    else if (pct >= 70) { grade = "Strong Performance! ⚡"; emoji = "✅"; }
    else if (pct >= 50) { grade = "Keep Building! 🔧"; emoji = "📈"; }
    else { grade = "Review the Concepts! 📚"; emoji = "💡"; }
    return `
    <div class="arena-result">
        <div class="mascot-reaction">${emoji}</div>
        <div class="result-score">${score}/${total}</div>
        <div class="result-grade">${grade}</div>
        <p class="muted mt-16">You answered ${score} of ${total} correctly (${pct}%).</p>
        ${pass ? `<p class="mint mt-8">Great work! Keep learning.</p>` : `<p style="color:var(--amber)" class="mt-8">Review the lesson topics, then try again!</p>`}
        <div class="btn-group mt-28" style="justify-content:center">
            <button class="btn btn-primary" id="quizRetryBtn">Try Again ↩</button>
            <a href="#/learn" class="btn">Back to Learning</a>
        </div>
    </div>`;
}

/* ============================================================
   PROJECTS
============================================================ */
function renderProjects() {
    const filters = [{id:"all",label:"All Projects"},{id:"beginner",label:"Beginner"},{id:"intermediate",label:"Intermediate"},{id:"advanced",label:"Advanced"}];
    return `
    <div class="page">
        <section class="projects-hero domain-hero">
            <div class="eyebrow"><span class="eyebrow-dot"></span> 🚀 PROJECT UNIVERSE</div>
            <h1 style="margin-top:14px">Build real things.</h1>
            <p class="lead mt-20">Engineering only makes sense when you build something. Every project teaches multiple concepts.</p>
        </section>
        <section class="section-sm">
            <div class="project-filters">
                ${filters.map(f=>`<button class="filter-btn${f.id==="all"?" active":""}" data-filter="${f.id}">${f.label}</button>`).join("")}
            </div>
            <div class="projects-grid" id="projectsGrid">
                ${projects.map(p => projectCard(p)).join("")}
            </div>
        </section>
    </div>`;
}

function projectCard(p) {
    const diffColors = {beginner:"var(--mint)",intermediate:"var(--amber)",advanced:"var(--red)"};
    const diffDots = {beginner:1,intermediate:2,advanced:3};
    const dots = Array.from({length:3}).map((_,i)=>`<span class="diff-dot${i<diffDots[p.difficulty]?" on-"+p.difficulty:""}"></span>`).join("");
    return `
    <div class="project-card" data-difficulty="${p.difficulty}">
        <div class="project-header">
            <div>
                <div class="project-icon">${p.icon}</div>
                <div class="diff-bar" style="margin-top:6px" aria-label="Difficulty: ${p.difficulty}">${dots}</div>
            </div>
            <span class="badge badge-dim">${p.time}</span>
        </div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-skills">${p.tags.map(t=>`<span class="badge badge-dim">${t}</span>`).join("")}</div>
        <div class="project-meta">
            <span style="color:${diffColors[p.difficulty]}">● ${p.difficulty.toUpperCase()}</span>
            <span>${p.components.length} components</span>
        </div>
    </div>`;
}

/* ============================================================
   FORMULA ENGINE
============================================================ */
function renderFormulas() {
    const cats = [{id:"all",label:"All Formulas"},{id:"circuits",label:"Circuits"},{id:"components",label:"Components"},{id:"signals",label:"Signals"}];
    return `
    <div class="page">
        <section class="formulas-hero domain-hero">
            <div class="eyebrow"><span class="eyebrow-dot"></span> 📐 FORMULA ENGINE</div>
            <h1 style="margin-top:14px">The math<br>behind the magic.</h1>
            <p class="lead mt-20">Every formula with meaning, units, and a live calculator. Understanding why a formula exists matters more than memorising it.</p>
        </section>
        <section class="section-sm">
            <div class="formula-categories">
                ${cats.map(c=>`<button class="filter-btn${c.id==="all"?" active":""}" data-fcat="${c.id}">${c.label}</button>`).join("")}
            </div>
            <div class="formulas-grid" id="formulasGrid">
                ${formulaDb.map(f => formulaCard(f)).join("")}
            </div>
        </section>
    </div>`;
}

function formulaCard(f) {
    return `
    <div class="formula-card" data-category="${f.category}">
        <span class="badge badge-mint">${f.category.toUpperCase()}</span>
        <h3 class="mt-12">${f.label}</h3>
        <div class="formula-eq">${f.eq}</div>
        <p>${f.meaning}</p>
        <div class="formula-vars mt-12" style="display:flex;flex-wrap:wrap;gap:8px">
            ${f.vars.map(([sym,name,unit])=>`<div class="formula-var"><span>${sym}</span><small>${name} (${unit})</small></div>`).join("")}
        </div>
        <p class="muted mt-12" style="font-size:12px">${f.use}</p>
        ${f.calc ? `
        <div class="formula-calc mt-16" id="calc-${f.id}">
            <div style="font-family:var(--mono);font-size:9px;color:var(--dim);margin-bottom:10px;letter-spacing:.1em">CALCULATOR</div>
            <div class="calc-inputs">
                ${f.calc.inputs.map(inp=>`
                    <div class="calc-input-wrap">
                        <label>${inp}</label>
                        <input type="number" class="formula-input" data-formula="${f.id}" data-var="${inp}" placeholder="${inp}" value="" min="0" step="any">
                    </div>`).join("")}
            </div>
            <div class="calc-result" id="calc-result-${f.id}">Enter values above →</div>
        </div>` : ""}
    </div>`;
}

/* ============================================================
   STORIES
============================================================ */
function renderStories() {
    return `
    <div class="page">
        <section class="stories-hero domain-hero">
            <div class="eyebrow"><span class="eyebrow-dot"></span> 📖 NCU STORIES</div>
            <h1 style="margin-top:14px">Learn it like<br>a story.</h1>
            <p class="lead mt-20">The Circuit Crew explains engineering concepts through stories. Because stories stick better than equations.</p>
        </section>
        <section class="section-sm">
            <div class="stories-grid">
                ${stories.map(s => `
                    <a href="#/stories/${s.id}" class="story-card" style="text-decoration:none;color:var(--text)">
                        <div class="story-cover" style="background:${s.cover_color}">
                            <div class="story-mascots">${s.mascots.map(m=>mascots[m].emoji).join("")}</div>
                        </div>
                        <div class="story-info">
                            <div class="story-episode">${s.episode}</div>
                            <h3>${s.title}</h3>
                            <p>${s.subtitle}</p>
                            <div class="story-tags">${s.tags.map(t=>`<span class="badge badge-mint">${t}</span>`).join("")}</div>
                        </div>
                    </a>`).join("")}
            </div>
        </section>
    </div>`;
}

function renderStoryDetail(id) {
    const story = stories.find(s => s.id === id);
    if (!story) return renderNotFound();
    return `
    <div class="page">
        <div class="story-reader">
            <div class="eyebrow mt-40"><span class="eyebrow-dot"></span> ${story.episode}</div>
            <h1 style="margin-top:14px">${story.title}</h1>
            <p class="lead mt-16">${story.subtitle}</p>
            <div class="ece-tags mt-16">${story.tags.map(t=>`<span class="badge badge-mint">${t}</span>`).join("")}</div>
            <div style="margin-top:44px">
                ${story.panels.map((panel,i) => {
                    const m = mascots[panel.mascot];
                    return `
                    <div class="story-panel fade-up" style="animation-delay:${i*.1}s">
                        <div class="story-mascot-row">
                            <div class="story-mascot-avatar" style="border-color:${m.color}44;background:${m.color}10">${m.emoji}</div>
                            <div>
                                <div class="story-mascot-name" style="color:${m.color}">${m.name}</div>
                                <div class="story-mascot-role">${m.role}</div>
                            </div>
                        </div>
                        <p class="story-text">${panel.text}</p>
                        ${panel.insight ? `<div class="story-insight">💡 ${panel.insight}</div>` : ""}
                    </div>`;
                }).join("")}
            </div>
            <div class="btn-group mt-40">
                <a href="#/stories" class="btn">← All Stories</a>
                <a href="#/learn" class="btn btn-primary">Continue Learning →</a>
            </div>
        </div>
    </div>`;
}

/* ============================================================
   INTERVIEW HUB
============================================================ */
let interviewState = { cat: "basic" };

function renderInterview() {
    const cats = [
        {id:"basic",label:"Basic ECE",icon:"⚡"},
        {id:"analog",label:"Analog",icon:"〽️"},
        {id:"digital",label:"Digital",icon:"💡"},
        {id:"embedded",label:"Embedded",icon:"🤖"},
        {id:"vlsi",label:"VLSI",icon:"💻"},
        {id:"communication",label:"Communication",icon:"📡"}
    ];
    const questions = interviewQs[interviewState.cat] || [];
    return `
    <div class="page">
        <section class="interview-hero domain-hero">
            <div class="eyebrow"><span class="eyebrow-dot"></span> 💼 ECE INTERVIEW HUB</div>
            <h1 style="margin-top:14px">Prepare for<br>the real world.</h1>
            <p class="lead mt-20">Common ECE interview questions with detailed answers. Click any question to expand.</p>
        </section>
        <section class="section-sm">
            <div class="interview-grid">
                <aside class="interview-sidebar">
                    <div style="font-family:var(--mono);font-size:9px;letter-spacing:.15em;color:var(--dim);margin-bottom:12px;text-transform:uppercase">Categories</div>
                    ${cats.map(c=>`<button class="interview-cat${interviewState.cat===c.id?" active":""}" data-cat="${c.id}">${c.icon} ${c.label}</button>`).join("")}
                </aside>
                <div class="interview-questions" id="iqList">
                    ${questions.map((q,i)=>`
                        <div class="iq-card" data-iq="${i}">
                            <div class="iq-q"><h4>${q.q}</h4><span class="iq-toggle">+</span></div>
                            <div class="iq-answer">
                                <strong>${q.a}</strong>
                                <span>${q.detail}</span>
                            </div>
                        </div>`).join("")}
                </div>
            </div>
        </section>
    </div>`;
}

/* ============================================================
   PROGRESS
============================================================ */
function renderProgress() {
    const xp = DB.getXP();
    const lv = getLevel(xp);
    const lvIdx = LEVELS.indexOf(lv);
    const next = getNextLevel(xp);
    const { needed, pct } = xpToNextLevel(xp);
    const mastered = DB.getMastered();
    const attempts = DB.getAttempts();
    const totalAttempts = Object.values(attempts).reduce((s,a)=>s+a.attempts,0);
    const totalPasses = Object.values(attempts).reduce((s,a)=>s+a.passes,0);
    const badges = DB.getBadges();

    return `
    <div class="page">
        <section class="progress-hero domain-hero">
            <div class="eyebrow"><span class="eyebrow-dot"></span> 📊 YOUR ECE JOURNEY</div>
            <h1 style="margin-top:14px">Keep building.</h1>
            <p class="lead mt-20">Your progress is stored locally. Every concept you pass earns XP. Supabase accounts coming.</p>
        </section>
        <section class="section-sm">

            <!-- Level Card -->
            <div class="level-card">
                <div class="eyebrow"><span class="eyebrow-dot"></span> CURRENT LEVEL</div>
                <div style="font-family:var(--display);font-size:72px;font-weight:800;color:var(--mint);text-shadow:0 0 40px rgba(127,255,178,.25);line-height:1;margin-top:8px">
                    ${lv.icon} ${lv.name}
                </div>
                <p class="muted mt-8">${xp} XP total${next ? ` · ${needed} XP to ${next.name}` : " · MAX LEVEL"}</p>
                <div class="progress-track mt-16">
                    <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
                    <span class="progress-label">${pct}%</span>
                </div>
            </div>

            <!-- Stats -->
            <div class="stats-grid">
                <div class="stat-block"><div class="big">${mastered.length}</div><h4>Concepts Mastered</h4></div>
                <div class="stat-block"><div class="big">${xp}</div><h4>Total XP Earned</h4></div>
                <div class="stat-block"><div class="big">${totalAttempts}</div><h4>Quiz Attempts</h4></div>
                <div class="stat-block"><div class="big">${totalPasses}</div><h4>Quiz Passes</h4></div>
            </div>

            <!-- Level Names -->
            <div class="sh"><div><div class="eyebrow"><span class="eyebrow-dot"></span> ALL LEVELS</div></div></div>
            <div class="level-names">
                ${LEVELS.map((l,i) => `
                    <div class="level-item${lv===l?" current-level":""}">
                        <div class="level-num">${i+1}</div>
                        <div>
                            <div class="level-info-name">${l.icon} ${l.name}</div>
                            <div class="level-info-xp">${l.min}+ XP</div>
                        </div>
                    </div>`).join("")}
            </div>

            <!-- Mastered Concepts -->
            ${mastered.length ? `
            <div class="sh mt-32"><div><div class="eyebrow"><span class="eyebrow-dot"></span> MASTERED CONCEPTS</div></div></div>
            <div class="topic-grid">
                ${mastered.map(id => `
                    <a class="topic-card done" href="#/topic/${id}">
                        <div class="topic-num"><span class="topic-check">✓</span> MASTERED</div>
                        <h3>${lessons[id]?.title || id}</h3>
                        <p>+${lessons[id]?.xp || 25} XP earned</p>
                        <span class="topic-enter">REVIEW →</span>
                    </a>`).join("")}
            </div>` : `
            <div class="empty-state">
                <div style="font-size:56px">🌌</div>
                <h3>Your first concept is waiting.</h3>
                <p>Pass the mastery quiz for any concept to start building your ECE XP.</p>
                <a href="#/learn" class="btn btn-primary mt-20">Start Learning</a>
            </div>`}

            <div class="btn-group mt-28">
                <button class="btn btn-outline" id="resetProgress" style="color:var(--red);border-color:rgba(248,113,113,.3)">Reset All Progress</button>
            </div>
        </section>
    </div>`;
}

/* ============================================================
   ROADMAP
============================================================ */
function renderRoadmap() {
    const mastered = DB.getMastered();
    return `
    <div class="page">
        <section class="domain-hero">
            <div class="eyebrow"><span class="eyebrow-dot"></span> 🗺️ ECE ROADMAP</div>
            <h1 style="margin-top:14px">From Zero to Advanced.</h1>
            <p class="lead mt-20">The complete ECE learning journey — in order. Learn each stage before the next.</p>
        </section>
        <section class="section-sm">
            <div class="roadmap">
                ${roadmap.map(([num,title,text,color],i) => `
                    <div class="road-item${mastered.length>i?" completed":""}" style="--road-col:${color}">
                        <div class="road-num">${num}</div>
                        <div class="road-info"><h4>${title}</h4><p>${text}</p></div>
                        <div class="road-status">${mastered.length>i?"✓ STARTED":"→"}</div>
                    </div>`).join("")}
            </div>
        </section>
    </div>`;
}

/* ============================================================
   NOT FOUND
============================================================ */
function renderNotFound() {
    return `
    <div class="page">
        <div class="not-found">
            <div style="font-size:64px">💥</div>
            <div class="eyebrow" style="margin-top:20px"><span class="eyebrow-dot"></span> SIGNAL LOST</div>
            <h2>This circuit isn't connected yet.</h2>
            <p>This part of the ECE Universe is being built. Check back soon.</p>
            <a href="#/" class="btn btn-primary mt-24">Return to Home</a>
        </div>
    </div>`;
}

/* ============================================================
   ROUTER
============================================================ */
function route() {
    const hash = location.hash.replace(/^#/, "").replace(/\/+$/, "");
    return hash || "/";
}

function render() {
    const cur   = route();
    const parts = cur.split("/").filter(Boolean);
    let html;

    if      (cur === "/")                               html = renderHome();
    else if (cur === "/universe")                       html = renderUniverse();
    else if (cur === "/learn")                          html = renderLearn();
    else if (parts[0] === "learn" && parts[1])          html = renderDomain(parts[1]);
    else if (parts[0] === "topic" && parts[1])          html = renderTopic(parts[1]);
    else if (cur === "/everyday")                       html = renderEveryday();
    else if (parts[0] === "everyday" && parts[1])       html = renderEverydayDetail(parts[1]);
    else if (cur === "/characters")                     html = renderCharacters();
    else if (cur === "/lab")                            html = renderLab();
    else if (cur === "/quiz")                           html = renderQuiz();
    else if (cur === "/projects")                       html = renderProjects();
    else if (cur === "/formulas")                       html = renderFormulas();
    else if (cur === "/stories")                        html = renderStories();
    else if (parts[0] === "stories" && parts[1])        html = renderStoryDetail(parts[1]);
    else if (cur === "/interview")                      html = renderInterview();
    else if (cur === "/progress")                       html = renderProgress();
    else if (cur === "/roadmap")                        html = renderRoadmap();
    else                                                html = renderNotFound();

    document.getElementById("app").innerHTML = html;
    updateNavActive();
    updateXPDisplay();
    attachEvents();
    window.scrollTo({top: 0, behavior: "instant"});

    const header = document.getElementById("siteHeader");
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
}

/* ============================================================
   NAV ACTIVE STATE
============================================================ */
function updateNavActive() {
    const cur = route();
    document.querySelectorAll(".nav a, .mobile-nav a").forEach(link => {
        const href = link.getAttribute("href").replace("#", "");
        const isActive = cur === href || (href !== "/" && cur.startsWith(href));
        link.classList.toggle("active", isActive);
    });
}

/* ============================================================
   LAB CALCULATORS
============================================================ */
function calcLab(vId, rId, iId, pId, vDId, rDId) {
    const v = Number(document.getElementById(vId)?.value || 5);
    const r = Number(document.getElementById(rId)?.value || 100);
    const i = v/r, p = v*i;
    const vd = document.getElementById(vDId); if(vd) vd.textContent = `${v} V`;
    const rd = document.getElementById(rDId); if(rd) rd.textContent = `${r} Ω`;
    const id = document.getElementById(iId);  if(id) id.textContent = `${(i*1000).toFixed(1)} mA`;
    const pd = document.getElementById(pId);  if(pd) pd.textContent = `${p.toFixed(3)} W`;
}

function calcVoltageDivider() {
    const vin = Number(document.getElementById("vdVoltage")?.value || 12);
    const r1  = Number(document.getElementById("vdR1slider")?.value || 10);
    const r2  = Number(document.getElementById("vdR2slider")?.value || 10);
    const vout = vin * r2 / (r1 + r2);
    const els = {vdVin:`${vin} V`,vdR1:`${r1} kΩ`,vdR2:`${r2} kΩ`,vdVout:`${vout.toFixed(2)} V`};
    Object.entries(els).forEach(([id,v]) => { const el=document.getElementById(id); if(el) el.textContent=v; });
    const lbl = document.getElementById("vdOutSVGLabel");
    if (lbl) lbl.textContent = `${vout.toFixed(1)}V`;
}

function calcLEDResistor() {
    const vs  = Number(document.getElementById("ledVsupply")?.value || 5);
    const vfR = Number(document.getElementById("ledVforward")?.value || 20);
    const vf  = vfR / 10;
    const iMA = Number(document.getElementById("ledCurrent")?.value || 20);
    const r   = (vs - vf) / (iMA / 1000);
    const els = {ledVs:`${vs} V`,ledVf:`${vf.toFixed(1)} V`,ledImA:`${iMA} mA`,ledR:`${r > 0 ? Math.round(r)+" Ω":"Invalid"}`};
    Object.entries(els).forEach(([id,v]) => { const el=document.getElementById(id); if(el) el.textContent=v; });
    const rv = document.getElementById("ledResVal"); if(rv) rv.textContent = r>0?`${Math.round(r)}Ω`:"ERR";
    const glow = document.getElementById("ledGlow");
    if (glow) {
        const brightness = Math.min(1, Math.max(0, r > 0 ? iMA/50 : 0));
        glow.style.opacity = String(brightness * 0.7);
        glow.style.stroke = `rgba(244,114,182,${brightness})`;
    }
}

function calcRC() {
    const r   = Number(document.getElementById("rcResistance")?.value || 10) * 1000;
    const cUF = Number(document.getElementById("rcCapacitance")?.value || 100);
    const c   = cUF * 1e-6;
    const tau = r * c;
    const els = {rcR:`${r/1000} kΩ`,rcC:`${cUF} μF`,rcTau:`${tau.toFixed(2)} s`,rcTime:`${tau.toFixed(2)} s`};
    Object.entries(els).forEach(([id,v]) => { const el=document.getElementById(id); if(el) el.textContent=v; });
}

function drawRCChart() {
    const canvas = document.getElementById("rcChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const r   = Number(document.getElementById("rcResistance")?.value || 10) * 1000;
    const cUF = Number(document.getElementById("rcCapacitance")?.value || 100);
    const tau = r * cUF * 1e-6;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle="#030a10"; ctx.fillRect(0,0,w,h);
    ctx.strokeStyle="rgba(127,255,178,.06)"; ctx.lineWidth=1;
    for(let x=0;x<=w;x+=w/5){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
    for(let y=0;y<=h;y+=h/4){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
    ctx.setLineDash([4,4]); ctx.strokeStyle="rgba(255,193,77,.4)";
    ctx.beginPath(); ctx.moveTo(0,h*(1-.632)); ctx.lineTo(w,h*(1-.632)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle="#ffc14d"; ctx.font="9px monospace"; ctx.fillText("63.2%",4,h*(1-.632)-4);
    const tMax = tau*5, pts=200;
    ctx.beginPath(); ctx.strokeStyle="#7fffb2"; ctx.lineWidth=2.5; ctx.shadowColor="#7fffb2"; ctx.shadowBlur=6;
    for(let i=0;i<=pts;i++){
        const t=(i/pts)*tMax, v=1-Math.exp(-t/tau), px=(i/pts)*w, py=h-v*(h-10)-5;
        i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
    }
    ctx.stroke(); ctx.shadowBlur=0;
    const tauX = (tau/tMax)*w;
    ctx.strokeStyle="rgba(255,193,77,.6)"; ctx.lineWidth=1.5; ctx.setLineDash([3,3]);
    ctx.beginPath(); ctx.moveTo(tauX,0); ctx.lineTo(tauX,h); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle="#ffc14d"; ctx.fillText("τ",tauX+3,h-4);
    ctx.fillStyle="#8fa0b5"; ctx.font="8px monospace";
    ctx.fillText("V/Vs",2,12); ctx.fillText("Time →",w-46,h-4);
}

function updateLessonExperiment() {
    const v = Number(document.getElementById("expVoltage")?.value || 5);
    const r = Number(document.getElementById("expResistance")?.value || 100);
    const i = v/r, p = v*i;
    const vEl = document.getElementById("voltageVal");   if(vEl)  vEl.textContent  = `${v} V`;
    const rEl = document.getElementById("resistanceVal"); if(rEl)  rEl.textContent  = `${r} Ω`;
    const iEl = document.getElementById("expCurrent");   if(iEl)  iEl.textContent  = `${(i*1000).toFixed(1)} mA`;
    const pEl = document.getElementById("expPower");     if(pEl)  pEl.textContent  = `${p.toFixed(3)} W`;
    const scr = document.getElementById("expScreen");
    if (scr) {
        const glow = Math.min(12, v/24*12);
        scr.innerHTML = svgResistance(glow);
    }
}

function updateFormulaCalc(formulaId) {
    const f = formulaDb.find(x => x.id === formulaId);
    if (!f || !f.calc) return;
    const vals = {};
    document.querySelectorAll(`.formula-input[data-formula="${formulaId}"]`).forEach(inp => {
        const v = parseFloat(inp.value);
        if (!isNaN(v) && v !== 0) vals[inp.dataset.var] = v;
    });
    const resultEl = document.getElementById(`calc-result-${formulaId}`);
    if (!resultEl) return;
    if (Object.keys(vals).length < f.calc.inputs.length - 1) {
        resultEl.textContent = "Enter values above →"; return;
    }
    try {
        const results = f.calc.fn(vals);
        resultEl.textContent = Object.entries(results).map(([k,v])=>`${k} = ${v}`).join(" | ");
    } catch { resultEl.textContent = "Check your values."; }
}

/* ============================================================
   SEARCH ENGINE
============================================================ */
function buildSearchIndex() {
    const index = [];
    Object.entries(lessons).forEach(([id,l]) => index.push({type:"ECE Concept",title:l.title,description:l.subtitle,url:`#/topic/${id}`}));
    domains.forEach(d => index.push({type:"ECE World",title:d.title,description:d.description,url:`#/learn/${d.id}`}));
    everyday.forEach(item => index.push({type:"Everyday Engineering",title:item.title,description:item.description||item.intro,url:`#/everyday/${item.id}`}));
    Object.values(mascots).forEach(m => index.push({type:"NCU Mascot",title:`${m.name} — ${m.concept}`,description:m.line,url:"#/characters"}));
    projects.forEach(p => index.push({type:"Project",title:p.title,description:p.description,url:"#/projects"}));
    formulaDb.forEach(f => index.push({type:"Formula",title:`${f.label}: ${f.eq}`,description:f.meaning,url:"#/formulas"}));
    stories.forEach(s => index.push({type:"NCU Story",title:s.title,description:s.subtitle,url:`#/stories/${s.id}`}));
    Object.values(interviewQs).flat().forEach(q => index.push({type:"Interview Q",title:q.q,description:q.a.substring(0,80)+"…",url:"#/interview"}));
    return index;
}

const searchIndex = buildSearchIndex();

function openSearch() {
    document.getElementById("searchOverlay")?.classList.add("open");
    document.body.classList.add("lock");
    setTimeout(() => document.getElementById("searchInput")?.focus(), 60);
}

function closeSearch() {
    document.getElementById("searchOverlay")?.classList.remove("open");
    document.body.classList.remove("lock");
}

function runSearch(query) {
    const resultsEl = document.getElementById("searchResults");
    if (!resultsEl) return;
    const val = query.trim().toLowerCase();
    if (!val) { resultsEl.innerHTML = `<div class="search-empty">Search the ECE Universe.</div>`; return; }
    const matches = searchIndex.filter(item =>
        item.title.toLowerCase().includes(val) || item.description.toLowerCase().includes(val) || item.type.toLowerCase().includes(val)
    ).slice(0,14);
    if (!matches.length) {
        resultsEl.innerHTML = `<div class="search-empty">No results for "<strong>${query}</strong>"<br><br>Try: voltage, MOSFET, ESP32, ADC, diode...</div>`;
        return;
    }
    resultsEl.innerHTML = matches.map(item => `
        <a href="${item.url}" class="search-result" role="option">
            <small>${item.type}</small>
            <strong>${item.title}</strong>
            <p>${item.description}</p>
        </a>`).join("");
    resultsEl.querySelectorAll("a").forEach(link => link.addEventListener("click", closeSearch));
}

/* ============================================================
   ATTACH EVENTS
============================================================ */
function attachEvents() {

    /* Lesson experiment sliders */
    const expV = document.getElementById("expVoltage");
    const expR = document.getElementById("expResistance");
    if (expV && expR) {
        expV.addEventListener("input", updateLessonExperiment);
        expR.addEventListener("input", updateLessonExperiment);
        updateLessonExperiment();
    }

    /* Simple/Engineer mode toggle */
    document.getElementById("modeSimple")?.addEventListener("click", () => {
        document.getElementById("panelSimple")?.classList.add("active");
        document.getElementById("panelEngineer")?.classList.remove("active");
        document.getElementById("modeSimple")?.classList.add("active");
        document.getElementById("modeEngineer")?.classList.remove("active");
    });
    document.getElementById("modeEngineer")?.addEventListener("click", () => {
        document.getElementById("panelEngineer")?.classList.add("active");
        document.getElementById("panelSimple")?.classList.remove("active");
        document.getElementById("modeEngineer")?.classList.add("active");
        document.getElementById("modeSimple")?.classList.remove("active");
    });

    /* Start Mastery Quiz */
    document.getElementById("startMasteryQuiz")?.addEventListener("click", () => {
        const id = route().split("/").pop();
        buildLessonQuiz(id);
    });

    /* Lab — Ohm's Law */
    const labV = document.getElementById("labVoltage");
    const labR = document.getElementById("labResistance");
    if (labV && labR) {
        const upd = () => calcLab("labVoltage","labResistance","labI","labP","labV","labR");
        labV.addEventListener("input", upd); labR.addEventListener("input", upd); upd();
    }

    /* Lab — RC */
    const rcREl = document.getElementById("rcResistance");
    const rcCEl = document.getElementById("rcCapacitance");
    if (rcREl && rcCEl) {
        const upd = () => { calcRC(); drawRCChart(); };
        rcREl.addEventListener("input", upd); rcCEl.addEventListener("input", upd);
        calcRC(); drawRCChart();
        document.getElementById("rcStart")?.addEventListener("click", drawRCChart);
    }

    /* Lab — VD */
    ["vdVoltage","vdR1slider","vdR2slider"].forEach(id => {
        document.getElementById(id)?.addEventListener("input", calcVoltageDivider);
    });
    if (document.getElementById("vdVoltage")) calcVoltageDivider();

    /* Lab — LED */
    ["ledVsupply","ledVforward","ledCurrent"].forEach(id => {
        document.getElementById(id)?.addEventListener("input", calcLEDResistor);
    });
    if (document.getElementById("ledVsupply")) calcLEDResistor();

    /* Quiz mode cards */
    document.querySelectorAll("[data-mode]").forEach(card => {
        card.addEventListener("click", () => {
            quizState.mode = card.dataset.mode;
            document.querySelectorAll("[data-mode]").forEach(c => c.classList.remove("active"));
            card.classList.add("active");
        });
    });

    /* Quiz start */
    document.getElementById("quizStartBtn")?.addEventListener("click", () => {
        quizState.questions = buildQuizSession(quizState.mode);
        quizState.current = 0; quizState.score = 0;
        quizState.total = quizState.questions.length; quizState.finished = false;
        renderQuizQuestion();
    });

    /* Project filters */
    document.querySelectorAll("[data-filter]").forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;
            document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            document.querySelectorAll(".project-card").forEach(card => {
                card.style.display = filter==="all" || card.dataset.difficulty===filter ? "" : "none";
            });
        });
    });

    /* Formula filters */
    document.querySelectorAll("[data-fcat]").forEach(btn => {
        btn.addEventListener("click", () => {
            const cat = btn.dataset.fcat;
            document.querySelectorAll("[data-fcat]").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            document.querySelectorAll(".formula-card").forEach(card => {
                card.style.display = cat==="all" || card.dataset.category===cat ? "" : "none";
            });
        });
    });

    /* Formula calculators */
    document.querySelectorAll(".formula-input").forEach(inp => {
        inp.addEventListener("input", () => updateFormulaCalc(inp.dataset.formula));
    });

    /* Interview categories */
    document.querySelectorAll("[data-cat]").forEach(btn => {
        btn.addEventListener("click", () => {
            interviewState.cat = btn.dataset.cat;
            const iqList = document.getElementById("iqList");
            if (iqList) {
                iqList.innerHTML = (interviewQs[interviewState.cat]||[]).map((q,i)=>`
                    <div class="iq-card" data-iq="${i}">
                        <div class="iq-q"><h4>${q.q}</h4><span class="iq-toggle">+</span></div>
                        <div class="iq-answer"><strong>${q.a}</strong><span>${q.detail}</span></div>
                    </div>`).join("");
                attachIQEvents();
            }
            document.querySelectorAll("[data-cat]").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    attachIQEvents();

    /* Progress reset */
    document.getElementById("resetProgress")?.addEventListener("click", () => {
        if (confirm("Reset ALL progress? This cannot be undone.")) {
            DB.reset(); render();
        }
    });
}

/* ============================================================
   INTERVIEW EVENTS
============================================================ */
function attachIQEvents() {
    document.querySelectorAll(".iq-card").forEach(card => {
        card.addEventListener("click", () => card.classList.toggle("open"));
    });
}

/* ============================================================
   ARENA QUIZ RENDER
============================================================ */
function renderQuizQuestion() {
    const arena = document.getElementById("quizArena");
    if (!arena) return;
    const q = quizState.questions[quizState.current];
    if (!q) return;
    arena.innerHTML = renderArenaQuestion(q, quizState.current, quizState.total);
    const scoreEl = document.getElementById("arenaScore");
    if (scoreEl) scoreEl.textContent = quizState.score;

    document.querySelectorAll(".arena-opt").forEach(btn => {
        btn.addEventListener("click", () => {
            if (document.querySelector(".arena-opt.correct") || document.querySelector(".arena-opt.wrong")) return;
            const isCorrect = btn.dataset.correct === "true";
            document.querySelectorAll(".arena-opt").forEach(b => {
                b.disabled = true;
                if (b.dataset.correct === "true") b.classList.add("correct");
            });
            if (!isCorrect) btn.classList.add("wrong");
            else {
                quizState.score++;
                const sc2 = document.getElementById("arenaScore"); if(sc2) sc2.textContent = quizState.score;
            }
            document.getElementById("arenaExp")?.classList.add("show");
            const nd = document.getElementById("arenaNext"); if(nd) nd.style.display="flex";
        });
    });

    document.getElementById("nextQBtn")?.addEventListener("click", () => {
        quizState.current++;
        if (quizState.current >= quizState.total) {
            quizState.finished = true;
            const arena2 = document.getElementById("quizArena");
            if (arena2) {
                arena2.innerHTML = renderArenaResult(quizState.score, quizState.total);
                document.getElementById("quizRetryBtn")?.addEventListener("click", () => {
                    quizState.questions = buildQuizSession(quizState.mode);
                    quizState.current = 0; quizState.score = 0; quizState.finished = false;
                    renderQuizQuestion();
                });
            }
        } else {
            renderQuizQuestion();
        }
    });
}

/* ============================================================
   GLOBAL INIT
============================================================ */
document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    const yearEl = document.getElementById("footerYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const header = document.getElementById("siteHeader");
    window.addEventListener("scroll", () => {
        header?.classList.toggle("scrolled", window.scrollY > 10);
    }, { passive: true });

    document.getElementById("searchOpen")?.addEventListener("click", openSearch);
    document.getElementById("searchClose")?.addEventListener("click", closeSearch);
    document.getElementById("searchInput")?.addEventListener("input", e => runSearch(e.target.value));
    document.getElementById("searchOverlay")?.addEventListener("click", e => { if(e.target.id==="searchOverlay") closeSearch(); });

    const menuBtn  = document.getElementById("mobileMenuBtn");
    const mobileNav= document.getElementById("mobileNav");
    menuBtn?.addEventListener("click", () => {
        const isOpen = mobileNav?.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
    });
    mobileNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuBtn?.setAttribute("aria-expanded","false");
    }));

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeSearch();
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
    });

    window.addEventListener("hashchange", render);
    render();

});