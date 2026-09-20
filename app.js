/* ============================================================
   NAMMA CIRCUIT — ECE UNIVERSE
   DAY 1 APPLICATION
============================================================ */

"use strict";

/* ============================================================
   STORAGE
============================================================ */

const STORAGE_KEYS = {
    XP: "ncu_xp",
    COMPLETED: "ncu_completed",
    LEVEL: "ncu_level"
};

function getXP() {
    return Number(localStorage.getItem(STORAGE_KEYS.XP) || 0);
}

function setXP(value) {
    localStorage.setItem(
        STORAGE_KEYS.XP,
        String(value)
    );

    updateHeaderXP();
}

function getCompleted() {
    try {
        return JSON.parse(
            localStorage.getItem(
                STORAGE_KEYS.COMPLETED
            ) || "[]"
        );
    } catch {
        return [];
    }
}

function saveCompleted(items) {

    localStorage.setItem(
        STORAGE_KEYS.COMPLETED,
        JSON.stringify(items)
    );

}

function addXP(amount) {

    const current = getXP();

    setXP(current + amount);

}

function completeTopic(id) {

    const completed = getCompleted();

    if (!completed.includes(id)) {

        completed.push(id);

        saveCompleted(completed);

        addXP(25);

    }

}

/* ============================================================
   ECE UNIVERSE DATA
============================================================ */

const domains = [

    {
        id: "ece-zero",
        number: "01",
        icon: "🌱",
        title: "ECE Zero",
        short: "Start from absolute zero.",
        description:
            "Electricity, charge, electrons, voltage, current, resistance, power and circuits.",
        level: "BEGINNER",
        color: "#b6ff63"
    },

    {
        id: "circuit-theory",
        number: "02",
        icon: "🔌",
        title: "Circuit Theory",
        short: "Understand how circuits behave.",
        description:
            "Ohm's Law, KCL, KVL, series, parallel and network analysis.",
        level: "BEGINNER → INTERMEDIATE",
        color: "#45e9d3"
    },

    {
        id: "components",
        number: "03",
        icon: "🧩",
        title: "Component City",
        short: "Meet the building blocks.",
        description:
            "Resistors, capacitors, inductors, diodes, LEDs, transistors and more.",
        level: "BEGINNER → INTERMEDIATE",
        color: "#ffc661"
    },

    {
        id: "analog",
        number: "04",
        icon: "〽️",
        title: "Analog World",
        short: "Understand real-world signals.",
        description:
            "Diodes, amplifiers, op-amps, filters, transistors and oscillators.",
        level: "INTERMEDIATE",
        color: "#ff7aae"
    },

    {
        id: "digital",
        number: "05",
        icon: "01",
        title: "Digital World",
        short: "Enter the world of 0s and 1s.",
        description:
            "Boolean logic, gates, K-maps, flip-flops, counters and memories.",
        level: "INTERMEDIATE",
        color: "#9b8cff"
    },

    {
        id: "signals",
        number: "06",
        icon: "📡",
        title: "Signal City",
        short: "Learn how information travels.",
        description:
            "Signals, Fourier, sampling, modulation, antennas and communication.",
        level: "INTERMEDIATE → ADVANCED",
        color: "#45e9d3"
    },

    {
        id: "embedded",
        number: "07",
        icon: "🤖",
        title: "Embedded World",
        short: "Make electronics intelligent.",
        description:
            "Microcontrollers, ARM, ESP32, sensors, protocols, RTOS and IoT.",
        level: "ADVANCED",
        color: "#b6ff63"
    },

    {
        id: "vlsi",
        number: "08",
        icon: "💻",
        title: "VLSI World",
        short: "Build electronics at chip level.",
        description:
            "CMOS, RTL, Verilog, FPGA, ASIC, timing, synthesis and SoC.",
        level: "ADVANCED",
        color: "#9b8cff"
    },

    {
        id: "power",
        number: "09",
        icon: "⚡",
        title: "Power World",
        short: "Control and convert electrical power.",
        description:
            "Power devices, converters, inverters, SMPS, EVs and motor drives.",
        level: "ADVANCED",
        color: "#ff806d"
    }

];

/* ============================================================
   ROADMAP
============================================================ */

const roadmap = [

    {
        stage: "ECE ZERO",
        description:
            "Electricity → charge → electron → voltage → current → resistance",
        level: "01",
        color: "#b6ff63"
    },

    {
        stage: "BASIC CIRCUITS",
        description:
            "Sources → loads → symbols → wires → open/closed circuits",
        level: "02",
        color: "#b6ff63"
    },

    {
        stage: "CIRCUIT THEORY",
        description:
            "Ohm's Law → KCL → KVL → series → parallel → networks",
        level: "03",
        color: "#45e9d3"
    },

    {
        stage: "COMPONENTS",
        description:
            "R → C → L → diode → LED → transistor → MOSFET",
        level: "04",
        color: "#ffc661"
    },

    {
        stage: "ANALOG",
        description:
            "Amplifiers → op-amps → filters → oscillators",
        level: "05",
        color: "#ff7aae"
    },

    {
        stage: "DIGITAL",
        description:
            "Logic → Boolean → K-map → sequential logic → memory",
        level: "06",
        color: "#9b8cff"
    },

    {
        stage: "SIGNALS & COMMUNICATION",
        description:
            "Signals → Fourier → sampling → modulation → wireless",
        level: "07",
        color: "#45e9d3"
    },

    {
        stage: "EMBEDDED",
        description:
            "MCU → ARM → ESP32 → sensors → protocols → RTOS → IoT",
        level: "08",
        color: "#b6ff63"
    },

    {
        stage: "VLSI",
        description:
            "CMOS → RTL → Verilog → FPGA → ASIC → SoC",
        level: "09",
        color: "#9b8cff"
    },

    {
        stage: "POWER ELECTRONICS",
        description:
            "Converters → inverters → SMPS → EV → motor drives",
        level: "10",
        color: "#ff806d"
    }

];

/* ============================================================
   BEGINNER TOPICS
============================================================ */

const beginnerTopics = [

    {
        id: "what-is-ece",
        tag: "START HERE",
        title: "What is ECE?",
        description:
            "Understand what Electronics and Communication Engineering actually covers."
    },

    {
        id: "electricity",
        tag: "ECE ZERO",
        title: "What is Electricity?",
        description:
            "Start with the basic idea of electric charge and electrical energy."
    },

    {
        id: "electron",
        tag: "ECE ZERO",
        title: "What is an Electron?",
        description:
            "Understand the tiny particle behind electrical current."
    },

    {
        id: "voltage",
        tag: "FUNDAMENTALS",
        title: "Voltage",
        description:
            "The electrical potential difference that pushes charge."
    },

    {
        id: "current",
        tag: "FUNDAMENTALS",
        title: "Current",
        description:
            "How electric charge flows through a circuit."
    },

    {
        id: "resistance",
        tag: "FUNDAMENTALS",
        title: "Resistance",
        description:
            "Why materials oppose the movement of electrical charge."
    },

    {
        id: "power",
        tag: "FUNDAMENTALS",
        title: "Electrical Power",
        description:
            "Understand how voltage and current create electrical power."
    },

    {
        id: "ac-dc",
        tag: "FUNDAMENTALS",
        title: "AC vs DC",
        description:
            "Why wall power and batteries behave differently."
    },

    {
        id: "ground",
        tag: "FUNDAMENTALS",
        title: "Ground",
        description:
            "What engineers mean when they say GND."
    }

];

/* ============================================================
   EVERYDAY ENGINEERING
============================================================ */

const everydayEngineering = [

    {
        icon: "📱",
        title: "Smartphone",
        description:
            "Processors, sensors, RF communication, batteries, displays and power management."
    },

    {
        icon: "🔋",
        title: "Phone Charger",
        description:
            "AC-DC conversion, switching circuits, transformers and regulation."
    },

    {
        icon: "💡",
        title: "LED Bulb",
        description:
            "Diodes, current limiting, rectification and power electronics."
    },

    {
        icon: "🚗",
        title: "Modern Car",
        description:
            "ECUs, sensors, CAN bus, motor control, radar and embedded systems."
    },

    {
        icon: "❄️",
        title: "Air Conditioner",
        description:
            "Sensors, compressors, motor drives, control systems and power electronics."
    },

    {
        icon: "📺",
        title: "TV Remote",
        description:
            "Infrared LEDs, photodiodes and digital communication."
    },

    {
        icon: "📍",
        title: "GPS",
        description:
            "RF signals, satellites, antennas, timing and signal processing."
    },

    {
        icon: "🎧",
        title: "Wireless Earbuds",
        description:
            "Bluetooth, RF, ADC/DAC, amplifiers, microphones and battery management."
    },

    {
        icon: "🚇",
        title: "Metro System",
        description:
            "Power electronics, motors, signalling, sensors and communication."
    },

    {
        icon: "🤖",
        title: "Robot",
        description:
            "Microcontrollers, sensors, actuators, motor drivers and control algorithms."
    },

    {
        icon: "📶",
        title: "Wi-Fi",
        description:
            "RF communication, modulation, antennas, protocols and signal processing."
    },

    {
        icon: "🏠",
        title: "Smart Home",
        description:
            "Sensors, embedded systems, wireless communication and IoT."
    }

];

/* ============================================================
   CHARACTERS
============================================================ */

const characters = [

    {
        name: "Volto",
        concept: "Voltage",
        icon: "⚡",
        description:
            "The push that makes charge move."
    },

    {
        name: "Curro",
        concept: "Current",
        icon: "🌊",
        description:
            "The flow of electric charge."
    },

    {
        name: "Resi",
        concept: "Resistance",
        icon: "🧱",
        description:
            "The one who slows the current down."
    },

    {
        name: "Shorty",
        concept: "Short Circuit",
        icon: "💥",
        description:
            "The troublemaker who finds the path of least resistance."
    }

];

/* ============================================================
   LESSON CONTENT
============================================================ */

const lessons = {

    "what-is-ece": {

        title: "What is ECE?",

        subtitle:
            "Electronics and Communication Engineering explained from zero.",

        sections: [

            {
                title: "The simple idea",

                text:
                    "ECE is the branch of engineering that deals with electronics, electrical signals, communication systems, embedded systems, digital systems, semiconductor devices and many technologies that make modern devices work."
            },

            {
                title: "What will you learn?",

                text:
                    "You will start from electricity and basic circuits, then move into components, analog electronics, digital electronics, signals, communication, embedded systems, VLSI and power electronics."
            },

            {
                title: "Think of ECE as a universe",

                text:
                    "A smartphone, car, robot, satellite, EV, medical device and IoT product may look completely different. But underneath, they use many of the same ECE building blocks."
            }

        ]

    },

    "electricity": {

        title: "What is Electricity?",

        subtitle:
            "Your first step into the ECE Universe.",

        sections: [

            {
                title: "Simple explanation",

                text:
                    "Electricity is associated with the presence and movement of electric charge."
            },

            {
                title: "Engineering view",

                text:
                    "Engineers work with electrical quantities such as voltage, current, resistance, power and energy to design systems that control and use electrical energy."
            },

            {
                title: "Real life",

                text:
                    "When you charge your phone, electrical energy is transferred from the charger into the battery."
            }

        ]

    },

    "electron": {

        title: "What is an Electron?",

        subtitle:
            "The tiny particle behind electrical behaviour.",

        sections: [

            {
                title: "Simple explanation",

                text:
                    "An electron is a subatomic particle carrying negative electric charge."
            },

            {
                title: "Why ECE cares",

                text:
                    "The behaviour of electrons in materials is fundamental to electrical conduction and semiconductor electronics."
            }

        ]

    },

    "voltage": {

        title: "Voltage",

        subtitle:
            "The electrical potential difference.",

        formula:
            "V = W / Q",

        sections: [

            {
                title: "Simple explanation",

                text:
                    "Voltage can be thought of as the electrical push or potential difference between two points."
            },

            {
                title: "NCU analogy",

                text:
                    "Imagine water stored at a higher level. The difference in height provides the potential for water to flow. Voltage is not literally water pressure, but the analogy helps build intuition."
            },

            {
                title: "Real life",

                text:
                    "A common USB supply is around 5 V, while household electrical systems operate at much higher voltages."
            }

        ]

    },

    "current": {

        title: "Current",

        subtitle:
            "The flow of electric charge.",

        formula:
            "I = Q / t",

        sections: [

            {
                title: "Simple explanation",

                text:
                    "Electric current describes the rate at which electric charge flows through a point."
            },

            {
                title: "Unit",

                text:
                    "The SI unit of current is ampere, written as A."
            },

            {
                title: "NCU analogy",

                text:
                    "If voltage is the push, current is the amount of charge flowing."
            }

        ]

    },

    "resistance": {

        title: "Resistance",

        subtitle:
            "The opposition to current flow.",

        formula:
            "R = V / I",

        sections: [

            {
                title: "Simple explanation",

                text:
                    "Resistance describes how strongly a component or material opposes current."
            },

            {
                title: "Unit",

                text:
                    "The SI unit of resistance is ohm, represented by Ω."
            },

            {
                title: "Real life",

                text:
                    "Resistors are used to control current, divide voltage and protect components."
            }

        ]

    },

    "power": {

        title: "Electrical Power",

        subtitle:
            "How quickly electrical energy is transferred.",

        formula:
            "P = V × I",

        sections: [

            {
                title: "Simple explanation",

                text:
                    "Electrical power describes the rate at which electrical energy is transferred or converted."
            },

            {
                title: "Real life",

                text:
                    "A 60 W lamp transfers energy at a rate of 60 joules per second under its rated operating conditions."
            }

        ]

    },

    "ac-dc": {

        title: "AC vs DC",

        subtitle:
            "Two fundamental forms of electrical supply.",

        sections: [

            {
                title: "DC",

                text:
                    "Direct current has a current direction that remains constant in the idealised basic model. Batteries provide DC."
            },

            {
                title: "AC",

                text:
                    "Alternating current periodically changes direction. Household mains systems use AC."
            },

            {
                title: "Why convert them?",

                text:
                    "Electronic devices often need regulated DC internally, so power supplies convert electrical energy between different forms."
            }

        ]

    },

    "ground": {

        title: "Ground",

        subtitle:
            "One of the most misunderstood words in electronics.",

        sections: [

            {
                title: "Simple explanation",

                text:
                    "In a circuit, ground commonly provides a reference point for measuring voltages."
            },

            {
                title: "Important",

                text:
                    "Circuit ground and protective earth are related concepts but are not automatically the same thing in every system."
            }

        ]

    }

};

/* ============================================================
   UTILITIES
============================================================ */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}

function getLevel(xp) {

    return Math.floor(xp / 100) + 1;

}

function updateHeaderXP() {

    const xp = getXP();

    const element =
        document.getElementById("headerXp");

    if (element) {

        element.textContent =
            `${xp} XP`;

    }

}

/* ============================================================
   COMPONENTS
============================================================ */

function domainCard(domain) {

    return `
        <a
            class="domain-card"
            href="#/learn/${domain.id}"
            style="--domain-color:${domain.color}"
        >

            <div class="domain-number">
                ${domain.number}
            </div>

            <div class="domain-icon">
                ${domain.icon}
            </div>

            <h3>${domain.title}</h3>

            <p>
                ${domain.description}
            </p>

            <div class="domain-meta">

                <span>
                    ${domain.level}
                </span>

                <span>
                    Explore →
                </span>

            </div>

        </a>
    `;

}

function roadmapItem(item) {

    return `
        <div
            class="roadmap-item"
            style="--road-color:${item.color}"
        >

            <div class="roadmap-dot"></div>

            <div class="roadmap-content">

                <strong>
                    ${item.stage}
                </strong>

                <p>
                    ${item.description}
                </p>

            </div>

            <div class="roadmap-level">
                LEVEL ${item.level}
            </div>

        </div>
    `;

}

function topicCard(topic) {

    return `
        <a
            class="topic-card"
            href="#/topic/${topic.id}"
        >

            <span class="topic-tag">
                ${topic.tag}
            </span>

            <h3>
                ${topic.title}
            </h3>

            <p>
                ${topic.description}
            </p>

        </a>
    `;

}

/* ============================================================
   HOME
============================================================ */

function renderHome() {

    return `

        <div class="page">

            <section class="hero">

                <div class="hero-content">

                    <span class="eyebrow">
                        NAMMA CIRCUIT UNIVERSE · DAY 1
                    </span>

                    <h1 class="hero-title">
                        Learn ECE.
                        <span class="accent">
                            Build the universe.
                        </span>
                    </h1>

                    <p class="hero-description">
                        From your first understanding of electricity
                        to embedded systems, VLSI, communication and
                        advanced electronics — learn everything inside
                        one interactive ECE Universe.
                    </p>

                    <div class="hero-actions">

                        <a
                            href="#/learn"
                            class="button button-primary"
                        >
                            Start ECE from Zero →
                        </a>

                        <a
                            href="#/universe"
                            class="button button-secondary"
                        >
                            Explore Universe
                        </a>

                    </div>

                    <div class="hero-stats">

                        <div class="stat">
                            <strong>10+</strong>
                            <span>Learning stages</span>
                        </div>

                        <div class="stat">
                            <strong>1000+</strong>
                            <span>Future concepts</span>
                        </div>

                        <div class="stat">
                            <strong>∞</strong>
                            <span>Things to discover</span>
                        </div>

                    </div>

                </div>

                <div class="universe-visual">

                    <div class="orbit">

                        <div class="core">
                            ECE<br>
                            UNIVERSE
                        </div>

                        <div class="orbit-node node-1">
                            ECE ZERO
                        </div>

                        <div class="orbit-node node-2">
                            DIGITAL
                        </div>

                        <div class="orbit-node node-3">
                            EMBEDDED
                        </div>

                        <div class="orbit-node node-4">
                            ANALOG
                        </div>

                        <div class="orbit-node node-5">
                            VLSI
                        </div>

                        <div class="orbit-node node-6">
                            POWER
                        </div>

                    </div>

                </div>

            </section>

        </div>

        <section class="section">

            <div class="page">

                <div class="section-header">

                    <div>
                        <span class="eyebrow">
                            THE UNIVERSE
                        </span>

                        <h2>
                            Every major ECE world.
                        </h2>
                    </div>

                    <p>
                        ECE isn't one subject. It's a connected universe
                        of electronics, signals, computing, communication,
                        embedded systems and hardware.
                    </p>

                </div>

                <div class="domain-grid">

                    ${domains
                        .map(domainCard)
                        .join("")}

                </div>

            </div>

        </section>

        <section class="section">

            <div class="page">

                <div class="section-header">

                    <div>
                        <span class="eyebrow">
                            LEARNING ROADMAP
                        </span>

                        <h2>
                            Zero → Advanced.
                        </h2>
                    </div>

                    <p>
                        Follow the path in order or jump into any
                        world when you're ready.
                    </p>

                </div>

                <div class="roadmap">

                    ${roadmap
                        .map(roadmapItem)
                        .join("")}

                </div>

            </div>

        </section>

        <section class="section">

            <div class="page">

                <div class="path-panel">

                    <span class="eyebrow">
                        YOUR JOURNEY
                    </span>

                    <h2>
                        Start with ECE Zero.
                    </h2>

                    <p class="lead">
                        Don't worry if you don't remember your school
                        physics or electronics. NCU starts from the
                        smallest building blocks.
                    </p>

                    <div class="path-progress">
                        <span></span>
                    </div>

                    <div class="hero-actions">

                        <a
                            href="#/learn"
                            class="button button-primary"
                        >
                            Begin Learning
                        </a>

                        <a
                            href="#/progress"
                            class="button"
                        >
                            View Progress
                        </a>

                    </div>

                </div>

            </div>

        </section>

        <section class="section">

            <div class="page">

                <div class="section-header">

                    <div>

                        <span class="eyebrow">
                            ENGINEERING IN EVERYDAY LIFE
                        </span>

                        <h2>
                            ECE is everywhere.
                        </h2>

                    </div>

                    <p>
                        Learn a concept and then discover where it
                        actually appears in the world around you.
                    </p>

                </div>

                <div class="everyday-grid">

                    ${everydayEngineering
                        .slice(0, 8)
                        .map(item => `

                            <a
                                href="#/everyday"
                                class="everyday-card"
                            >

                                <div class="emoji">
                                    ${item.icon}
                                </div>

                                <h3>
                                    ${item.title}
                                </h3>

                                <p>
                                    ${item.description}
                                </p>

                            </a>

                        `)
                        .join("")}

                </div>

                <div class="hero-actions">

                    <a
                        href="#/everyday"
                        class="button"
                    >
                        Explore Everyday Engineering →
                    </a>

                </div>

            </div>

        </section>

    `;

}

/* ============================================================
   UNIVERSE PAGE
============================================================ */

function renderUniverse() {

    return `

        <div class="page">

            <section class="detail-header">

                <span class="eyebrow">
                    🌌 NAMMA CIRCUIT UNIVERSE
                </span>

                <h1>
                    One universe.
                    <br>
                    Every ECE world.
                </h1>

                <p>
                    Explore electronics from absolute beginner concepts
                    to advanced engineering domains.
                </p>

            </section>

            <section class="section-small">

                <div class="domain-grid">

                    ${domains
                        .map(domainCard)
                        .join("")}

                </div>

            </section>

            <section class="section">

                <div class="section-header">

                    <div>

                        <span class="eyebrow">
                            THE COMPLETE PATH
                        </span>

                        <h2>
                            Your ECE roadmap.
                        </h2>

                    </div>

                </div>

                <div class="roadmap">

                    ${roadmap
                        .map(roadmapItem)
                        .join("")}

                </div>

            </section>

        </div>

    `;

}

/* ============================================================
   LEARN PAGE
============================================================ */

function renderLearn() {

    const completed =
        getCompleted();

    const completedCount =
        completed.length;

    return `

        <div class="page">

            <section class="detail-header">

                <span class="eyebrow">
                    📚 ECE LEARNING SYSTEM
                </span>

                <h1>
                    Start from zero.
                </h1>

                <p>
                    No prerequisites. No assumptions.
                    Build your electronics knowledge one concept at a time.
                </p>

            </section>

            <section class="section-small">

                <div class="path-panel">

                    <span class="eyebrow">
                        YOUR PROGRESS
                    </span>

                    <h3>
                        ${completedCount}
                        concepts completed
                    </h3>

                    <p class="muted">
                        Complete lessons to earn XP.
                    </p>

                </div>

            </section>

            <section class="section">

                <div class="section-header">

                    <div>

                        <span class="eyebrow">
                            ECE ZERO
                        </span>

                        <h2>
                            Your first concepts.
                        </h2>

                    </div>

                </div>

                <div class="topic-grid">

                    ${beginnerTopics
                        .map(topicCard)
                        .join("")}

                </div>

            </section>

            <section class="section">

                <div class="section-header">

                    <div>

                        <span class="eyebrow">
                            LEARNING WORLDS
                        </span>

                        <h2>
                            Where do you want to go next?
                        </h2>

                    </div>

                </div>

                <div class="domain-grid">

                    ${domains
                        .map(domainCard)
                        .join("")}

                </div>

            </section>

        </div>

    `;

}

/* ============================================================
   DOMAIN PAGE
============================================================ */

function renderDomain(id) {

    const domain =
        domains.find(
            item => item.id === id
        );

    if (!domain) {

        return renderNotFound();

    }

    const domainTopics = {

        "ece-zero": [
            "Electricity",
            "Electron",
            "Charge",
            "Voltage",
            "Current",
            "Resistance",
            "Power",
            "Energy",
            "AC vs DC",
            "Ground",
            "Conductors",
            "Insulators"
        ],

        "circuit-theory": [
            "Ohm's Law",
            "KCL",
            "KVL",
            "Series Circuits",
            "Parallel Circuits",
            "Voltage Divider",
            "Current Divider",
            "Mesh Analysis",
            "Nodal Analysis",
            "Thevenin",
            "Norton",
            "Superposition"
        ],

        "components": [
            "Resistor",
            "Capacitor",
            "Inductor",
            "Potentiometer",
            "Transformer",
            "PN Junction Diode",
            "Zener Diode",
            "LED",
            "Photodiode",
            "BJT",
            "MOSFET",
            "IGBT"
        ],

        "analog": [
            "Diode Circuits",
            "Rectifiers",
            "Clippers",
            "Clampers",
            "BJT Biasing",
            "BJT Amplifiers",
            "MOSFET Amplifiers",
            "Op-Amp",
            "Filters",
            "Oscillators",
            "Feedback"
        ],

        "digital": [
            "Number Systems",
            "Boolean Algebra",
            "Logic Gates",
            "Universal Gates",
            "K-Maps",
            "Adders",
            "Subtractors",
            "MUX",
            "DEMUX",
            "Flip-Flops",
            "Counters",
            "Registers"
        ],

        "signals": [
            "Signals",
            "Continuous vs Discrete",
            "Amplitude",
            "Frequency",
            "Phase",
            "Fourier Series",
            "Fourier Transform",
            "Sampling",
            "Nyquist",
            "AM",
            "FM",
            "Digital Modulation"
        ],

        "embedded": [
            "Microcontrollers",
            "Microprocessors",
            "GPIO",
            "ADC",
            "DAC",
            "PWM",
            "Timers",
            "Interrupts",
            "UART",
            "SPI",
            "I2C",
            "CAN",
            "ARM",
            "ESP32",
            "RTOS",
            "IoT"
        ],

        "vlsi": [
            "Semiconductors",
            "MOSFET Basics",
            "CMOS",
            "CMOS Inverter",
            "RTL",
            "Verilog",
            "SystemVerilog",
            "FPGA",
            "ASIC",
            "Synthesis",
            "Timing",
            "SoC"
        ],

        "power": [
            "Power Diodes",
            "SCR",
            "TRIAC",
            "MOSFET",
            "IGBT",
            "Rectifiers",
            "Buck Converter",
            "Boost Converter",
            "Inverter",
            "SMPS",
            "Motor Drives",
            "EV Power Electronics"
        ]

    };

    const topics =
        domainTopics[id] || [];

    return `

        <div class="page">

            <section class="detail-header">

                <span class="eyebrow">
                    ${domain.number} · ${domain.level}
                </span>

                <h1>
                    ${domain.icon}
                    ${domain.title}
                </h1>

                <p>
                    ${domain.description}
                </p>

            </section>

            <section class="section-small">

                <div class="topic-grid">

                    ${topics
                        .map(topic => `

                            <div class="topic-card">

                                <span class="topic-tag">
                                    ${domain.title}
                                </span>

                                <h3>
                                    ${topic}
                                </h3>

                                <p>
                                    This concept will be expanded
                                    with explanation, formulas,
                                    examples, labs and quizzes.
                                </p>

                            </div>

                        `)
                        .join("")}

                </div>

            </section>

        </div>

    `;

}

/* ============================================================
   TOPIC DETAIL
============================================================ */

function renderTopic(id) {

    const lesson =
        lessons[id];

    if (!lesson) {

        return `

            <div class="page">

                <div class="empty-state">

                    <span class="eyebrow">
                        ECE UNIVERSE
                    </span>

                    <h2>
                        Topic coming soon.
                    </h2>

                    <p>
                        This concept is already part of the
                        roadmap and will be expanded during
                        the upcoming content build.
                    </p>

                    <a
                        href="#/learn"
                        class="button button-primary"
                    >
                        Back to Learning
                    </a>

                </div>

            </div>

        `;

    }

    return `

        <div class="page">

            <section class="detail-header">

                <span class="eyebrow">
                    ECE ZERO · LESSON
                </span>

                <h1>
                    ${lesson.title}
                </h1>

                <p>
                    ${lesson.subtitle}
                </p>

            </section>

            <div class="detail-layout">

                <article class="lesson-content">

                    ${lesson.sections
                        .map(section => `

                            <section class="lesson-block">

                                <h3>
                                    ${section.title}
                                </h3>

                                <p>
                                    ${section.text}
                                </p>

                            </section>

                        `)
                        .join("")}

                    ${
                        lesson.formula
                            ? `
                                <section class="lesson-block">

                                    <h3>
                                        Engineering Formula
                                    </h3>

                                    <div class="formula">
                                        ${lesson.formula}
                                    </div>

                                </section>
                            `
                            : ""
                    }

                    <section class="lesson-block">

                        <h3>
                            Quick Check
                        </h3>

                        <p>
                            After understanding this concept,
                            try explaining it in your own words.
                        </p>

                        <div class="hero-actions">

                            <button
                                class="button button-primary"
                                data-complete-topic="${id}"
                            >
                                ✓ Mark as Learned
                            </button>

                        </div>

                    </section>

                </article>

                <aside class="sidebar">

                    <span class="eyebrow">
                        ECE PATH
                    </span>

                    <a href="#/learn">
                        ← Back to ECE Zero
                    </a>

                    <a href="#/universe">
                        Explore Universe
                    </a>

                    <a href="#/everyday">
                        Find it in real life
                    </a>

                    <a href="#/lab">
                        Try NCU Lab
                    </a>

                </aside>

            </div>

        </div>

    `;

}

/* ============================================================
   EVERYDAY PAGE
============================================================ */

function renderEveryday() {

    return `

        <div class="page">

            <section class="detail-header">

                <span class="eyebrow">
                    🌍 ENGINEERING IN EVERYDAY LIFE
                </span>

                <h1>
                    Look around.
                    <br>
                    ECE is everywhere.
                </h1>

                <p>
                    The fastest way to understand engineering
                    is to connect theory with things you already use.
                </p>

            </section>

            <section class="section-small">

                <div class="everyday-grid">

                    ${everydayEngineering
                        .map(item => `

                            <article class="everyday-card">

                                <div class="emoji">
                                    ${item.icon}
                                </div>

                                <h3>
                                    ${item.title}
                                </h3>

                                <p>
                                    ${item.description}
                                </p>

                            </article>

                        `)
                        .join("")}

                </div>

            </section>

            <section class="section">

                <div class="path-panel">

                    <span class="eyebrow">
                        NCU PHILOSOPHY
                    </span>

                    <h2>
                        Learn it → See it → Build it.
                    </h2>

                    <p class="lead">
                        Every concept in the future NCU learning system
                        will connect to at least one real engineering
                        application.
                    </p>

                </div>

            </section>

        </div>

    `;

}

/* ============================================================
   CHARACTERS
============================================================ */

function renderCharacters() {

    return `

        <div class="page">

            <section class="detail-header">

                <span class="eyebrow">
                    👾 CIRCUIT CREW
                </span>

                <h1>
                    Meet the NCU Universe.
                </h1>

                <p>
                    Complex engineering concepts become easier
                    when they have a personality.
                </p>

            </section>

            <section class="section-small">

                <div class="character-grid">

                    ${characters
                        .map(character => `

                            <article class="character-card">

                                <div
                                    class="character-avatar"
                                >
                                    ${character.icon}
                                </div>

                                <h3>
                                    ${character.name}
                                </h3>

                                <p>
                                    ${character.concept}
                                </p>

                                <p>
                                    ${character.description}
                                </p>

                            </article>

                        `)
                        .join("")}

                </div>

            </section>

        </div>

    `;

}

/* ============================================================
   LAB
============================================================ */

function renderLab() {

    return `

        <div class="page">

            <section class="detail-header">

                <span class="eyebrow">
                    🧪 NCU LAB
                </span>

                <h1>
                    Learn by experimenting.
                </h1>

                <p>
                    Day 1 keeps the Lab foundation simple.
                    More interactive circuit simulations will be
                    added during the next stages.
                </p>

            </section>

            <section class="section-small">

                <div class="calculator-grid">

                    <div class="calculator">

                        <span class="eyebrow">
                            OHM'S LAW
                        </span>

                        <h3>
                            Calculate Voltage
                        </h3>

                        <div class="calculator-fields">

                            <div class="field">

                                <label>
                                    Current (A)
                                </label>

                                <input
                                    type="number"
                                    id="ohmCurrent"
                                    value="2"
                                >

                            </div>

                            <div class="field">

                                <label>
                                    Resistance (Ω)
                                </label>

                                <input
                                    type="number"
                                    id="ohmResistance"
                                    value="10"
                                >

                            </div>

                        </div>

                        <button
                            class="button button-primary"
                            id="calculateOhm"
                            style="margin-top:15px"
                        >
                            Calculate
                        </button>

                        <div
                            class="result"
                            id="ohmResult"
                        >
                            V = 20 V
                        </div>

                    </div>

                    <div class="calculator">

                        <span class="eyebrow">
                            POWER
                        </span>

                        <h3>
                            Calculate Power
                        </h3>

                        <div class="calculator-fields">

                            <div class="field">

                                <label>
                                    Voltage (V)
                                </label>

                                <input
                                    type="number"
                                    id="powerVoltage"
                                    value="5"
                                >

                            </div>

                            <div class="field">

                                <label>
                                    Current (A)
                                </label>

                                <input
                                    type="number"
                                    id="powerCurrent"
                                    value="2"
                                >

                            </div>

                        </div>

                        <button
                            class="button button-primary"
                            id="calculatePower"
                            style="margin-top:15px"
                        >
                            Calculate
                        </button>

                        <div
                            class="result"
                            id="powerResult"
                        >
                            P = 10 W
                        </div>

                    </div>

                </div>

            </section>

        </div>

    `;

}

/* ============================================================
   QUIZ
============================================================ */

const quizQuestions = [

    {
        question:
            "What is the SI unit of electric current?",

        options: [
            "Volt",
            "Ampere",
            "Ohm",
            "Watt"
        ],

        answer: 1

    },

    {
        question:
            "Which equation represents Ohm's Law?",

        options: [
            "P = VI",
            "V = IR",
            "Q = It",
            "E = mc²"
        ],

        answer: 1

    },

    {
        question:
            "Which component is primarily used to oppose current?",

        options: [
            "Resistor",
            "Capacitor",
            "LED",
            "Transformer"
        ],

        answer: 0

    }

];

function renderQuiz() {

    return `

        <div class="page">

            <section class="detail-header">

                <span class="eyebrow">
                    🧠 QUIZ ARENA
                </span>

                <h1>
                    Test your fundamentals.
                </h1>

                <p>
                    Day 1 starter quiz. The full Quiz Arena will
                    eventually contain beginner, intermediate,
                    advanced and interview modes.
                </p>

            </section>

            <section class="section-small">

                <div class="lesson-content">

                    ${quizQuestions
                        .map((question, index) => `

                            <article
                                class="lesson-block"
                                data-question="${index}"
                            >

                                <span class="eyebrow">
                                    QUESTION ${index + 1}
                                </span>

                                <h3 style="margin-top:10px">
                                    ${question.question}
                                </h3>

                                <div class="quiz-options">

                                    ${question.options
                                        .map(
                                            (option, optionIndex) => `

                                            <button
                                                class="quiz-option"
                                                data-answer="${optionIndex}"
                                                data-correct="${question.answer}"
                                            >
                                                ${option}
                                            </button>

                                        `
                                        )
                                        .join("")}

                                </div>

                            </article>

                        `)
                        .join("")}

                </div>

            </section>

        </div>

    `;

}

/* ============================================================
   PROGRESS
============================================================ */

function renderProgress() {

    const xp = getXP();

    const level =
        getLevel(xp);

    const completed =
        getCompleted();

    const nextLevelXP =
        level * 100;

    const progress =
        Math.min(
            100,
            (xp % 100)
        );

    return `

        <div class="page">

            <section class="detail-header">

                <span class="eyebrow">
                    📊 YOUR ECE JOURNEY
                </span>

                <h1>
                    Keep building.
                </h1>

                <p>
                    Your progress is currently stored locally.
                    Supabase will replace this foundation later.
                </p>

            </section>

            <section class="section-small">

                <div class="progress-dashboard">

                    <div class="level-card">

                        <span class="eyebrow">
                            CURRENT LEVEL
                        </span>

                        <div class="level-number">
                            ${level}
                        </div>

                        <div class="xp-big">
                            ${xp} XP
                        </div>

                        <div class="path-progress">

                            <span
                                style="width:${progress}%"
                            ></span>

                        </div>

                        <p class="muted">
                            ${nextLevelXP - xp}
                            XP until the next level.
                        </p>

                    </div>

                    <div>

                        <span class="eyebrow">
                            BADGES
                        </span>

                        <div
                            class="badges"
                            style="margin-top:15px"
                        >

                            <div class="badge">

                                <div class="badge-icon">
                                    🌱
                                </div>

                                <strong>
                                    First Step
                                </strong>

                                <small>
                                    Start learning
                                </small>

                            </div>

                            <div class="badge">

                                <div class="badge-icon">
                                    ⚡
                                </div>

                                <strong>
                                    Circuit Mind
                                </strong>

                                <small>
                                    5 concepts
                                </small>

                            </div>

                            <div class="badge">

                                <div class="badge-icon">
                                    🔥
                                </div>

                                <strong>
                                    Rising Engineer
                                </strong>

                                <small>
                                    10 concepts
                                </small>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <section class="section">

                <div class="section-header">

                    <div>

                        <span class="eyebrow">
                            COMPLETED
                        </span>

                        <h2>
                            ${completed.length}
                            concepts
                        </h2>

                    </div>

                </div>

                ${
                    completed.length
                        ? `
                            <div class="topic-grid">

                                ${completed
                                    .map(id => `

                                        <div class="topic-card">

                                            <span class="topic-tag">
                                                COMPLETED
                                            </span>

                                            <h3>
                                                ${id}
                                            </h3>

                                            <p>
                                                +25 XP earned
                                            </p>

                                        </div>

                                    `)
                                    .join("")}

                            </div>
                        `
                        : `
                            <div class="empty-state">

                                <h2>
                                    Your journey starts here.
                                </h2>

                                <p>
                                    Complete your first lesson
                                    to earn XP.
                                </p>

                                <a
                                    href="#/learn"
                                    class="button button-primary"
                                >
                                    Start Learning
                                </a>

                            </div>
                        `
                }

            </section>

        </div>

    `;

}

/* ============================================================
   PROJECTS
============================================================ */

function renderProjects() {

    const projects = [

        {
            level: "BEGINNER",
            title: "Automatic Night Lamp",
            description:
                "Use an LDR and transistor or microcontroller to switch a light automatically."
        },

        {
            level: "BEGINNER",
            title: "Digital Thermometer",
            description:
                "Read temperature using a sensor and display the measured value."
        },

        {
            level: "INTERMEDIATE",
            title: "Smart Parking",
            description:
                "Combine ultrasonic sensing, embedded logic and a user interface."
        },

        {
            level: "INTERMEDIATE",
            title: "Weather Station",
            description:
                "Measure environmental parameters and publish the data."
        },

        {
            level: "ADVANCED",
            title: "ESP32 IoT System",
            description:
                "Connect sensors, cloud services and an embedded controller."
        },

        {
            level: "ADVANCED",
            title: "Smart Traffic System",
            description:
                "Combine sensing, embedded control and computer vision."
        }

    ];

    return `

        <div class="page">

            <section class="detail-header">

                <span class="eyebrow">
                    🛠️ PROJECT UNIVERSE
                </span>

                <h1>
                    Learn by building.
                </h1>

                <p>
                    Projects will eventually map directly to the
                    concepts you learn inside the ECE Universe.
                </p>

            </section>

            <section class="section-small">

                <div class="card-grid">

                    ${projects
                        .map(project => `

                            <article class="card">

                                <span class="eyebrow">
                                    ${project.level}
                                </span>

                                <h3 style="margin-top:12px">
                                    ${project.title}
                                </h3>

                                <p>
                                    ${project.description}
                                </p>

                            </article>

                        `)
                        .join("")}

                </div>

            </section>

        </div>

    `;

}

/* ============================================================
   STORIES
============================================================ */

function renderStories() {

    return `

        <div class="page">

            <section class="detail-header">

                <span class="eyebrow">
                    🎬 NCU STORIES
                </span>

                <h1>
                    Engineering with characters.
                </h1>

                <p>
                    Volto, Curro, Resi and Shorty will turn difficult
                    electronics concepts into memorable stories.
                </p>

            </section>

            <section class="section-small">

                <div class="card-grid">

                    <article class="card">

                        <span class="eyebrow">
                            EP 01
                        </span>

                        <h3 style="margin-top:12px">
                            Meet Volto
                        </h3>

                        <p>
                            The first journey into voltage.
                        </p>

                    </article>

                    <article class="card">

                        <span class="eyebrow">
                            EP 02
                        </span>

                        <h3 style="margin-top:12px">
                            Curro Arrives
                        </h3>

                        <p>
                            Current enters the NCU Universe.
                        </p>

                    </article>

                    <article class="card">

                        <span class="eyebrow">
                            EP 03
                        </span>

                        <h3 style="margin-top:12px">
                            Resi Says Stop
                        </h3>

                        <p>
                            Resistance joins the crew.
                        </p>

                    </article>

                </div>

            </section>

        </div>

    `;

}

/* ============================================================
   NOT FOUND
============================================================ */

function renderNotFound() {

    return `

        <div class="page">

            <div class="empty-state">

                <span class="eyebrow">
                    SIGNAL LOST
                </span>

                <h2>
                    Page not found.
                </h2>

                <p>
                    Looks like this circuit isn't connected yet.
                </p>

                <a
                    href="#/"
                    class="button button-primary"
                >
                    Return Home
                </a>

            </div>

        </div>

    `;

}

/* ============================================================
   ROUTER
============================================================ */

function getRoute() {

    const hash =
        window.location.hash
            .replace(/^#/, "")
            .replace(/\/+$/, "");

    return hash || "/";

}

function renderRoute() {

    const route =
        getRoute();

    const parts =
        route
            .split("/")
            .filter(Boolean);

    let html = "";

    if (route === "/") {

        html = renderHome();

    }

    else if (route === "/universe") {

        html = renderUniverse();

    }

    else if (route === "/learn") {

        html = renderLearn();

    }

    else if (
        parts[0] === "learn" &&
        parts[1]
    ) {

        html =
            renderDomain(
                parts[1]
            );

    }

    else if (
        parts[0] === "topic" &&
        parts[1]
    ) {

        html =
            renderTopic(
                parts[1]
            );

    }

    else if (route === "/everyday") {

        html =
            renderEveryday();

    }

    else if (route === "/characters") {

        html =
            renderCharacters();

    }

    else if (route === "/lab") {

        html =
            renderLab();

    }

    else if (route === "/quiz") {

        html =
            renderQuiz();

    }

    else if (route === "/progress") {

        html =
            renderProgress();

    }

    else if (route === "/projects") {

        html =
            renderProjects();

    }

    else if (route === "/stories") {

        html =
            renderStories();

    }

    else {

        html =
            renderNotFound();

    }

    document
        .getElementById("app")
        .innerHTML = html;

    updateActiveNavigation();

    updateHeaderXP();

    attachPageEvents();

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}

/* ============================================================
   NAVIGATION
============================================================ */

function updateActiveNavigation() {

    const route =
        getRoute();

    document
        .querySelectorAll(
            ".desktop-nav a"
        )
        .forEach(link => {

            const target =
                link
                    .getAttribute("href")
                    .replace(/^#/, "");

            link.classList.toggle(
                "active",
                target === route
            );

        });

}

/* ============================================================
   PAGE EVENTS
============================================================ */

function attachPageEvents() {

    document
        .querySelectorAll(
            "[data-complete-topic]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.completeTopic;

                    completeTopic(id);

                    button.textContent =
                        "✓ Completed · +25 XP";

                    button.disabled = true;

                    button.style.opacity =
                        "0.7";

                }
            );

        });

    document
        .querySelectorAll(
            ".quiz-option"
        )
        .forEach(option => {

            option.addEventListener(
                "click",
                () => {

                    const correct =
                        Number(
                            option.dataset.correct
                        );

                    const answer =
                        Number(
                            option.dataset.answer
                        );

                    const parent =
                        option.closest(
                            "[data-question]"
                        );

                    parent
                        .querySelectorAll(
                            ".quiz-option"
                        )
                        .forEach(item => {

                            item.disabled = true;

                        });

                    if (
                        answer === correct
                    ) {

                        option.classList.add(
                            "correct"
                        );

                        addXP(10);

                    } else {

                        option.classList.add(
                            "wrong"
                        );

                        parent
                            .querySelector(
                                `[data-answer="${correct}"]`
                            )
                            ?.classList.add(
                                "correct"
                            );

                    }

                }
            );

        });

    const calculateOhm =
        document.getElementById(
            "calculateOhm"
        );

    if (calculateOhm) {

        calculateOhm.addEventListener(
            "click",
            () => {

                const current =
                    Number(
                        document.getElementById(
                            "ohmCurrent"
                        ).value
                    );

                const resistance =
                    Number(
                        document.getElementById(
                            "ohmResistance"
                        ).value
                    );

                const voltage =
                    current *
                    resistance;

                document.getElementById(
                    "ohmResult"
                ).textContent =
                    `V = ${voltage} V`;

            }
        );

    }

    const calculatePower =
        document.getElementById(
            "calculatePower"
        );

    if (calculatePower) {

        calculatePower.addEventListener(
            "click",
            () => {

                const voltage =
                    Number(
                        document.getElementById(
                            "powerVoltage"
                        ).value
                    );

                const current =
                    Number(
                        document.getElementById(
                            "powerCurrent"
                        ).value
                    );

                const power =
                    voltage *
                    current;

                document.getElementById(
                    "powerResult"
                ).textContent =
                    `P = ${power} W`;

            }
        );

    }

}

/* ============================================================
   SEARCH INDEX
============================================================ */

function buildSearchIndex() {

    const index = [];

    domains.forEach(domain => {

        index.push({

            type: "Learning World",

            title: domain.title,

            description:
                domain.description,

            url:
                `#/learn/${domain.id}`

        });

    });

    beginnerTopics.forEach(topic => {

        index.push({

            type: "Concept",

            title: topic.title,

            description:
                topic.description,

            url:
                `#/topic/${topic.id}`

        });

    });

    everydayEngineering.forEach(item => {

        index.push({

            type:
                "Everyday Engineering",

            title: item.title,

            description:
                item.description,

            url:
                "#/everyday"

        });

    });

    characters.forEach(character => {

        index.push({

            type: "NCU Character",

            title:
                `${character.name} — ${character.concept}`,

            description:
                character.description,

            url:
                "#/characters"

        });

    });

    roadmap.forEach(item => {

        index.push({

            type: "ECE Roadmap",

            title: item.stage,

            description:
                item.description,

            url:
                "#/universe"

        });

    });

    return index;

}

const searchIndex =
    buildSearchIndex();

/* ============================================================
   SEARCH
============================================================ */

function openSearch() {

    const modal =
        document.getElementById(
            "searchModal"
        );

    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

    setTimeout(
        () => {

            document
                .getElementById(
                    "searchInput"
                )
                .focus();

        },
        50
    );

}

function closeSearch() {

    const modal =
        document.getElementById(
            "searchModal"
        );

    modal.classList.remove(
        "open"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}

function performSearch(query) {

    const results =
        document.getElementById(
            "searchResults"
        );

    const clean =
        query
            .trim()
            .toLowerCase();

    if (!clean) {

        results.innerHTML = `

            <div class="search-empty">
                Start typing to explore the
                ECE Universe.
            </div>

        `;

        return;

    }

    const matches =
        searchIndex
            .filter(item => {

                return (

                    item.title
                        .toLowerCase()
                        .includes(clean)

                    ||

                    item.description
                        .toLowerCase()
                        .includes(clean)

                    ||

                    item.type
                        .toLowerCase()
                        .includes(clean)

                );

            })
            .slice(0, 12);

    if (!matches.length) {

        results.innerHTML = `

            <div class="search-empty">

                No results found for
                <strong>
                    "${escapeHTML(query)}"
                </strong>.

                <br><br>

                Try:
                voltage,
                current,
                embedded,
                VLSI,
                ESP32,
                resistor...

            </div>

        `;

        return;

    }

    results.innerHTML =
        matches
            .map(item => `

                <a
                    class="search-result"
                    href="${item.url}"
                    data-search-link
                >

                    <span class="search-result-type">
                        ${item.type}
                    </span>

                    <strong>
                        ${item.title}
                    </strong>

                    <p>
                        ${item.description}
                    </p>

                </a>

            `)
            .join("");

    document
        .querySelectorAll(
            "[data-search-link]"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                closeSearch
            );

        });

}

/* ============================================================
   GLOBAL EVENTS
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document
            .getElementById(
                "footerYear"
            )
            .textContent =
            new Date()
                .getFullYear();

        document
            .getElementById(
                "searchButton"
            )
            .addEventListener(
                "click",
                openSearch
            );

        document
            .getElementById(
                "closeSearch"
            )
            .addEventListener(
                "click",
                closeSearch
            );

        document
            .getElementById(
                "searchInput"
            )
            .addEventListener(
                "input",
                event => {

                    performSearch(
                        event.target.value
                    );

                }
            );

        document
            .getElementById(
                "searchModal"
            )
            .addEventListener(
                "click",
                event => {

                    if (
                        event.target.id ===
                        "searchModal"
                    ) {

                        closeSearch();

                    }

                }
            );

        document
            .getElementById(
                "menuButton"
            )
            .addEventListener(
                "click",
                () => {

                    document
                        .getElementById(
                            "mobileNav"
                        )
                        .classList.toggle(
                            "open"
                        );

                }
            );

        document
            .querySelectorAll(
                "#mobileNav a"
            )
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        document
                            .getElementById(
                                "mobileNav"
                            )
                            .classList.remove(
                                "open"
                            );

                    }
                );

            });

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeSearch();

                }

                if (
                    (event.ctrlKey ||
                        event.metaKey) &&
                    event.key.toLowerCase() ===
                        "k"
                ) {

                    event.preventDefault();

                    openSearch();

                }

            }
        );

        window.addEventListener(
            "hashchange",
            renderRoute
        );

        renderRoute();

    }
);