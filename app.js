/* ============================================================
   NAMMA CIRCUIT — ECE UNIVERSE
   DAY 1 APPLICATION
============================================================ */

"use strict";

/* ============================================================
   STORAGE
============================================================ */


const mascots = {

    volto: {

        name: "Volto",

        concept: "Voltage",

        emoji: "⚡",

        color: "#b7ff63",

        line:
            "I'm the push that creates potential difference!"

    },

    curro: {

        name: "Curro",

        concept: "Current",

        emoji: "🌊",

        color: "#46e7d1",

        line:
            "I'm the flow of electric charge!"

    },

    resi: {

        name: "Resi",

        concept: "Resistance",

        emoji: "🧱",

        color: "#ffd166",

        line:
            "I make current work harder to pass."

    },

    capa: {

        name: "Capa",

        concept: "Capacitor",

        emoji: "🔋",

        color: "#ff75a8",

        line:
            "I store electrical energy in an electric field."

    },

    indu: {

        name: "Indu",

        concept: "Inductor",

        emoji: "🌀",

        color: "#9b8cff",

        line:
            "I don't like sudden changes in current."

    },

    dio: {

        name: "Dio",

        concept: "Diode",

        emoji: "➡️",

        color: "#65a8ff",

        line:
            "I strongly prefer current flowing in one direction."

    },

    shorty: {

        name: "Shorty",

        concept: "Short Circuit",

        emoji: "💥",

        color: "#ff776c",

        line:
            "Hehe... I always look for the easiest path!"

    }

};

/* ============================================================
   ECE DOMAINS
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


const lessons = {

    "what-is-ece": {

        title: "What is ECE?",

        eyebrow: "ECE ZERO · START HERE",

        subtitle:
            "Before learning circuits, understand the universe you're entering.",

        hook:
            "How can the same engineering field create a phone, a satellite, a robot and an EV?",

        mascot: "volto",

        mascotText:
            "ECE isn't just about circuits da. It's the connection between electronics, signals, computing, communication and the physical world.",

        formula: null,

        visual: "universe",

        simple:
            "Electronics and Communication Engineering is the engineering of electronic systems, signals, communication, embedded intelligence and the hardware that makes modern technology work.",

        engineer:
            "ECE combines semiconductor devices, analog and digital circuits, signal processing, communication systems, embedded systems, computer architecture, VLSI and power electronics.",

        real:
            "Your phone, Wi-Fi router, car, smartwatch, camera, charger, metro system and even many medical devices contain multiple ECE concepts.",

        next: "electricity"

    },

    electricity: {

        title: "Electricity",

        eyebrow: "ECE ZERO · FOUNDATION",

        subtitle:
            "Your first real step into electronics.",

        hook:
            "What actually happens when you switch ON a device?",

        mascot: "curro",

        mascotText:
            "Electricity isn't some magical blue thing da. At the engineering level, we're dealing with electric charge and how it behaves.",

        formula: null,

        visual: "battery",

        simple:
            "Electricity is associated with electric charge and its movement or effects. Electrical systems use these effects to transfer and control energy.",

        engineer:
            "Electrical engineering works with quantities such as charge, current, voltage, power and energy to describe and design electrical systems.",

        real:
            "When your phone is charging, electrical energy is transferred through an electrical system into chemical energy stored in the battery.",

        next: "electron"

    },

    electron: {

        title: "Electron",

        eyebrow: "ECE ZERO · ATOMIC LEVEL",

        subtitle:
            "Meet one of the tiny players behind electrical behaviour.",

        hook:
            "If current is flowing... what is actually moving?",

        mascot: "curro",

        mascotText:
            "In many conductive materials, my flow is associated with the movement of electrons. That's why I care about them!",

        formula: null,

        visual: "electron",

        simple:
            "An electron is a subatomic particle with negative electric charge.",

        engineer:
            "The behaviour and movement of electrons in materials is fundamental to electrical conduction and semiconductor devices.",

        real:
            "Copper wires conduct electrical current efficiently because their material structure allows charge carriers to move relatively easily.",

        next: "charge"

    },

    charge: {

        title: "Electric Charge",

        eyebrow: "ECE ZERO · FUNDAMENTALS",

        subtitle:
            "The property behind electrical interaction.",

        hook:
            "Why can two objects attract or repel electrically?",

        mascot: "volto",

        mascotText:
            "Charge is one of the basic quantities of electricity. Think of it as the property that gives particles electrical behaviour.",

        formula: "Q = I × t",

        visual: "charge",

        simple:
            "Electric charge is a physical property associated with particles and is measured in coulombs.",

        engineer:
            "Current is the rate of flow of charge. This gives us the relationship Q = It.",

        real:
            "Whenever current flows through a wire, charge is being transferred through the circuit.",

        next: "voltage"

    },

    voltage: {

        title: "Voltage",

        eyebrow: "ECE ZERO · CORE CONCEPT",

        subtitle:
            "Potential difference — the idea behind the electrical push.",

        hook:
            "Why does a battery make current possible?",

        mascot: "volto",

        mascotText:
            "That's literally my job! I create the potential difference that allows charge to move when a conducting path exists.",

        formula: "V = W / Q",

        visual: "voltage",

        simple:
            "Voltage is the potential difference between two points.",

        engineer:
            "Voltage represents the difference in electric potential energy per unit charge between two points.",

        real:
            "A USB supply commonly provides around 5 V. Different electronic circuits require different voltage levels.",

        next: "current"

    },

    current: {

        title: "Current",

        eyebrow: "ECE ZERO · CORE CONCEPT",

        subtitle:
            "The rate at which electric charge flows.",

        hook:
            "Voltage is the push. But what actually flows?",

        mascot: "curro",

        mascotText:
            "Me! I'm Current. More precisely, I'm the rate at which electric charge passes through a point.",

        formula: "I = Q / t",

        visual: "current",

        simple:
            "Current tells us how much electric charge flows per unit time.",

        engineer:
            "The SI unit of current is the ampere. One ampere corresponds to one coulomb of charge passing a point per second.",

        real:
            "Your phone charger may supply a few amps depending on its voltage, charging mode and design.",

        next: "resistance"

    },

    resistance: {

        title: "Resistance",

        eyebrow: "ECE ZERO · CORE CONCEPT",

        subtitle:
            "Why doesn't current simply flow without limits?",

        hook:
            "What happens if we make it harder for charge to move?",

        mascot: "resi",

        mascotText:
            "That's where I enter! Resistance represents opposition to current flow.",

        formula: "V = I × R",

        visual: "resistance",

        simple:
            "Resistance is the opposition a material or component presents to current.",

        engineer:
            "For an ideal resistor, voltage, current and resistance are related by Ohm's Law: V = IR.",

        real:
            "Resistors are used to limit current, divide voltage, set operating points and protect components.",

        next: "power"

    },

    power: {

        title: "Electrical Power",

        eyebrow: "ECE ZERO · ENERGY IN ACTION",

        subtitle:
            "How quickly electrical energy is transferred.",

        hook:
            "Why does a 100 W appliance consume more power than a 5 W LED?",

        mascot: "volto",

        mascotText:
            "Power tells you how quickly electrical energy is being transferred or converted.",

        formula: "P = V × I",

        visual: "power",

        simple:
            "Electrical power is the rate at which electrical energy is transferred or converted.",

        engineer:
            "For a DC circuit under the appropriate conditions, power can be calculated as P = VI. For resistors, P = I²R = V²/R.",

        real:
            "Phone chargers, bulbs, motors, heaters and computers all have power ratings.",

        next: "ac-dc"

    },

    "ac-dc": {

        title: "AC vs DC",

        eyebrow: "ECE ZERO · POWER BASICS",

        subtitle:
            "Two fundamental ways electrical current behaves.",

        hook:
            "Why does a battery give DC while the wall socket gives AC?",

        mascot: "capa",

        mascotText:
            "DC tends to maintain one direction. AC periodically changes direction. Both are extremely important in engineering.",

        formula: null,

        visual: "acdc",

        simple:
            "Direct current has a fixed direction in the basic ideal model. Alternating current periodically changes direction.",

        engineer:
            "Power systems commonly use AC for distribution, while batteries and most electronic circuits internally use DC.",

        real:
            "A phone charger takes AC from the mains and converts it into regulated DC suitable for the phone.",

        next: "ground"

    },

    ground: {

        title: "Ground",

        eyebrow: "ECE ZERO · CIRCUIT REFERENCE",

        subtitle:
            "One of the most misunderstood words in electronics.",

        hook:
            "Is ground always literally connected to Earth?",

        mascot: "resi",

        mascotText:
            "Not necessarily! In circuit analysis, ground is often a reference point. Protective earth is a different concept.",

        formula: null,

        visual: "ground",

        simple:
            "Circuit ground is commonly used as a reference node for measuring voltages.",

        engineer:
            "A schematic's ground node establishes a common reference potential. Circuit ground and protective earth may be connected in some systems but are not universally identical.",

        real:
            "Microcontrollers, sensors and power supplies often share a circuit ground so their signals have a common reference.",

        next: null

    }

};

/* ============================================================
   DOMAIN TOPICS

const domainTopics = {

    circuits: [
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

    components: [
        "Resistor",
        "Capacitor",
        "Inductor",
        "Potentiometer",
        "Transformer",
        "PN Junction",
        "Zener Diode",
        "LED",
        "Photodiode",
        "BJT",
        "MOSFET",
        "IGBT"
    ],

    analog: [
        "Diode Circuits",
        "Rectifiers",
        "Clippers",
        "Clampers",
        "BJT Biasing",
        "BJT Amplifier",
        "MOSFET Amplifier",
        "Op-Amp",
        "Filters",
        "Oscillators",
        "Feedback"
    ],

    digital: [
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

    signals: [
        "Continuous Signals",
        "Discrete Signals",
        "Amplitude",
        "Frequency",
        "Phase",
        "Fourier Series",
        "Fourier Transform",
        "Sampling",
        "Nyquist",
        "AM",
        "FM",
        "PSK"
    ],

    embedded: [
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

    vlsi: [
        "Semiconductor Basics",
        "MOSFET",
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

    power: [
        "Power Diode",
        "SCR",
        "TRIAC",
        "MOSFET",
        "IGBT",
        "Rectifier",
        "Buck Converter",
        "Boost Converter",
        "Inverter",
        "SMPS",
        "Motor Drive",
        "EV Power Electronics"
    ]

};

/* ============================================================
   EVERYDAY ENGINEERING

const everyday = [

    {
        id: "smartphone",
        icon: "📱",
        title: "Smartphone",
        description:
            "A pocket-sized combination of VLSI, sensors, RF, digital systems, power electronics and communication.",
        tags: [
            "VLSI",
            "Sensors",
            "RF",
            "Digital",
            "Power"
        ],
        intro:
            "Your phone looks like one device. Inside, it is an entire ECE ecosystem.",
        blocks: [
            [
                "SOC",
                "The system-on-chip integrates processing, memory interfaces, graphics and many other functions."
            ],
            [
                "DISPLAY",
                "Digital data is converted into signals that control the display."
            ],
            [
                "CAMERA",
                "Image sensors convert incoming light into electrical signals that are processed digitally."
            ],
            [
                "RF",
                "Antennas and RF circuits allow communication over cellular, Wi-Fi and Bluetooth links."
            ],
            [
                "POWER",
                "Battery management and power regulation create the voltage rails needed by different circuits."
            ],
            [
                "SENSORS",
                "Accelerometers, gyroscopes, proximity sensors and other sensors interact with the physical world."
            ]
        ]
    },

    {
        id: "charger",
        icon: "🔌",
        title: "Phone Charger",
        description:
            "AC-DC conversion, switching, regulation, protection and power management.",
        tags: [
            "Power",
            "AC-DC",
            "SMPS",
            "Control"
        ],
        intro:
            "That tiny box between the wall and your phone is a miniature power-electronics system.",
        blocks: [
            [
                "INPUT",
                "Mains AC enters the power supply."
            ],
            [
                "RECTIFIER",
                "A rectifier converts the AC waveform into a suitable DC form."
            ],
            [
                "SWITCHING",
                "High-frequency switching allows efficient energy conversion."
            ],
            [
                "TRANSFORMER",
                "Isolation and voltage conversion can be achieved using high-frequency magnetic components."
            ],
            [
                "REGULATION",
                "Feedback keeps the output within the required range."
            ],
            [
                "PROTECTION",
                "Protection circuits help handle abnormal operating conditions."
            ]
        ]
    },

    {
        id: "car",
        icon: "🚗",
        title: "Modern Car",
        description:
            "An enormous embedded system containing sensors, ECUs, networks and power electronics.",
        tags: [
            "Embedded",
            "CAN",
            "Sensors",
            "Control"
        ],
        intro:
            "A modern car is no longer just mechanical. It is packed with computers.",
        blocks: [
            [
                "ECUs",
                "Electronic Control Units process sensor data and control vehicle functions."
            ],
            [
                "CAN BUS",
                "Vehicle controllers exchange information over communication networks."
            ],
            [
                "SENSORS",
                "Speed, temperature, pressure, position and many other quantities are measured."
            ],
            [
                "MOTOR CONTROL",
                "Electronic control systems manage motors, actuators and other mechanisms."
            ],
            [
                "ADAS",
                "Advanced systems combine sensors, computing and communication to support driving functions."
            ],
            [
                "POWER",
                "In EVs, power electronics control the flow of energy between battery and motor."
            ]
        ]
    },

    {
        id: "ac",
        icon: "❄️",
        title: "Air Conditioner",
        description:
            "Sensors, control systems, motors and power electronics work together.",
        tags: [
            "Sensors",
            "Control",
            "Motors",
            "Power"
        ],
        intro:
            "The AC automatically maintains your desired temperature using feedback and control.",
        blocks: [
            [
                "TEMPERATURE",
                "Sensors measure environmental conditions."
            ],
            [
                "CONTROLLER",
                "A control system decides what action should happen."
            ],
            [
                "COMPRESSOR",
                "The compressor is driven by an electric motor."
            ],
            [
                "INVERTER",
                "Modern inverter systems can control motor speed efficiently."
            ],
            [
                "FEEDBACK",
                "Measured temperature is compared against the target."
            ],
            [
                "PROTECTION",
                "Electronic systems monitor abnormal conditions."
            ]
        ]
    },

    {
        id: "remote",
        icon: "📺",
        title: "TV Remote",
        description:
            "A simple button press becomes an encoded infrared signal.",
        tags: [
            "Digital",
            "IR",
            "Communication",
            "Sensor"
        ],
        intro:
            "Your remote isn't shouting the command. It is transmitting coded light.",
        blocks: [
            [
                "BUTTON",
                "Pressing a button selects a command."
            ],
            [
                "ENCODER",
                "The command is represented as digital data."
            ],
            [
                "IR LED",
                "The transmitter converts the electrical signal into infrared light."
            ],
            [
                "AIR",
                "The infrared signal travels to the television."
            ],
            [
                "RECEIVER",
                "A photodetector receives the modulated signal."
            ],
            [
                "DECODER",
                "The TV interprets the command and performs the requested action."
            ]
        ]
    },

    {
        id: "gps",
        icon: "📍",
        title: "GPS",
        description:
            "Satellites, RF signals, timing and signal processing combine to estimate position.",
        tags: [
            "RF",
            "Signals",
            "Timing",
            "Communication"
        ],
        intro:
            "Your phone doesn't have a tiny satellite inside it. It listens to signals from satellites.",
        blocks: [
            [
                "SATELLITES",
                "Satellites broadcast precisely timed signals."
            ],
            [
                "ANTENNA",
                "The receiver captures weak radio-frequency signals."
            ],
            [
                "TIMING",
                "Accurate timing information is critical."
            ],
            [
                "PROCESSING",
                "The receiver processes the received signals."
            ],
            [
                "POSITION",
                "Measurements from multiple satellites help estimate location."
            ],
            [
                "MAP",
                "The position is combined with mapping software to display your location."
            ]
        ]
    },

    {
        id: "earbuds",
        icon: "🎧",
        title: "Wireless Earbuds",
        description:
            "Bluetooth, microphones, DACs, amplifiers, batteries and sensors.",
        tags: [
            "Bluetooth",
            "Audio",
            "ADC/DAC",
            "Battery"
        ],
        intro:
            "Those tiny earbuds contain an entire chain of signal processing.",
        blocks: [
            [
                "BLUETOOTH",
                "Digital audio data is received wirelessly."
            ],
            [
                "DECODING",
                "The received data is converted into usable audio information."
            ],
            [
                "DAC",
                "Digital samples are converted into an analog signal."
            ],
            [
                "AMPLIFIER",
                "The signal is amplified to drive the speaker."
            ],
            [
                "SPEAKER",
                "Electrical energy is converted into mechanical movement and sound."
            ],
            [
                "BATTERY",
                "Power management controls energy delivery and charging."
            ]
        ]
    },

    {
        id: "robot",
        icon: "🤖",
        title: "Robot",
        description:
            "Sensors become inputs, algorithms become decisions and motors become action.",
        tags: [
            "Embedded",
            "Sensors",
            "Motors",
            "Control"
        ],
        intro:
            "A robot is basically an ECE feedback loop with a body.",
        blocks: [
            [
                "SENSORS",
                "The robot measures its environment."
            ],
            [
                "MCU",
                "A microcontroller processes sensor information."
            ],
            [
                "DECISION",
                "Software decides what action should happen."
            ],
            [
                "DRIVER",
                "Motor-driver electronics provide the required power."
            ],
            [
                "ACTUATOR",
                "Motors convert electrical energy into movement."
            ],
            [
                "FEEDBACK",
                "Sensors measure the result and the cycle repeats."
            ]
        ]
    },

    {
        id: "wifi",
        icon: "📶",
        title: "Wi-Fi",
        description:
            "Radio-frequency electronics and digital communication make wireless networking possible.",
        tags: [
            "RF",
            "Modulation",
            "Antenna",
            "Digital"
        ],
        intro:
            "When you watch a video over Wi-Fi, bits are being carried through electromagnetic waves.",
        blocks: [
            [
                "DATA",
                "Digital information is represented as bits."
            ],
            [
                "MODULATION",
                "Information is mapped onto a radio-frequency signal."
            ],
            [
                "RF",
                "The signal is processed and transmitted at radio frequencies."
            ],
            [
                "ANTENNA",
                "Electrical signals are converted to electromagnetic waves."
            ],
            [
                "RECEIVER",
                "The receiving antenna captures the signal."
            ],
            [
                "DEMODULATION",
                "The receiver recovers the original information."
            ]
        ]
    }

];

/* ============================================================
   SVG VISUALS

function svgBattery() {

    return `
        <svg
            class="circuit-svg"
            viewBox="0 0 340 230"
        >

            <path
                class="circuit-wire"
                d="M50 115 H95 M245 115 H290"
            />

            <line
                x1="105"
                y1="75"
                x2="105"
                y2="155"
                stroke="#b7ff63"
                stroke-width="8"
            />

            <line
                x1="125"
                y1="88"
                x2="125"
                y2="142"
                stroke="#b7ff63"
                stroke-width="5"
            />

            <circle
                class="circuit-node"
                cx="50"
                cy="115"
                r="7"
            />

            <circle
                class="circuit-node"
                cx="290"
                cy="115"
                r="7"
            />

            <path
                class="circuit-current"
                d="M50 115 H95"
            />

            <text
                x="95"
                y="190"
                fill="#a3afbd"
                font-size="13"
                font-family="monospace"
            >
                ENERGY SOURCE
            </text>

        </svg>
    `;

}

function svgElectron() {

    return `
        <svg
            class="circuit-svg"
            viewBox="0 0 340 230"
        >

            <circle
                cx="170"
                cy="115"
                r="70"
                fill="none"
                stroke="#26384b"
                stroke-width="2"
            />

            <circle
                cx="170"
                cy="115"
                r="30"
                fill="#9b8cff"
                opacity=".25"
            />

            <circle
                cx="170"
                cy="115"
                r="10"
                fill="#b7ff63"
            />

            <circle
                cx="170"
                cy="45"
                r="9"
                fill="#46e7d1"
            />

            <circle
                cx="170"
                cy="185"
                r="9"
                fill="#46e7d1"
            />

            <circle
                cx="100"
                cy="115"
                r="9"
                fill="#ff75a8"
            />

            <circle
                cx="240"
                cy="115"
                r="9"
                fill="#ff75a8"
            />

            <text
                x="132"
                y="119"
                fill="#fff"
                font-size="12"
                font-family="monospace"
            >
                ATOM
            </text>

        </svg>
    `;

}

function svgCharge() {

    return `
        <svg
            class="circuit-svg"
            viewBox="0 0 340 230"
        >

            <circle
                cx="110"
                cy="115"
                r="52"
                fill="rgba(183,255,99,.08)"
                stroke="#b7ff63"
                stroke-width="2"
            />

            <text
                x="94"
                y="124"
                fill="#b7ff63"
                font-size="35"
                font-family="sans-serif"
            >
                +
            </text>

            <circle
                cx="230"
                cy="115"
                r="52"
                fill="rgba(255,119,108,.08)"
                stroke="#ff776c"
                stroke-width="2"
            />

            <text
                x="214"
                y="124"
                fill="#ff776c"
                font-size="35"
                font-family="sans-serif"
            >
                −
            </text>

            <path
                class="circuit-current"
                d="M155 115 H185"
            />

        </svg>
    `;

}

function svgVoltage() {

    return `
        <svg
            class="circuit-svg"
            viewBox="0 0 340 230"
        >

            <rect
                x="55"
                y="75"
                width="230"
                height="80"
                rx="18"
                fill="#101c29"
                stroke="#29394b"
            />

            <line
                x1="75"
                y1="115"
                x2="130"
                y2="115"
                stroke="#46e7d1"
                stroke-width="5"
            />

            <line
                x1="210"
                y1="115"
                x2="265"
                y2="115"
                stroke="#ff75a8"
                stroke-width="5"
            />

            <text
                x="105"
                y="108"
                fill="#46e7d1"
                font-size="20"
                font-family="monospace"
            >
                +
            </text>

            <text
                x="225"
                y="108"
                fill="#ff75a8"
                font-size="20"
                font-family="monospace"
            >
                −
            </text>

            <text
                x="142"
                y="123"
                fill="#b7ff63"
                font-size="18"
                font-family="monospace"
            >
                VOLT
            </text>

        </svg>
    `;

}

function svgCurrent() {

    return `
        <svg
            class="circuit-svg"
            viewBox="0 0 340 230"
        >

            <path
                d="M45 115 H295"
                stroke="#26384b"
                stroke-width="12"
                stroke-linecap="round"
            />

            <path
                class="circuit-current"
                d="M45 115 H295"
            />

            <path
                d="M270 95 L300 115 L270 135"
                fill="none"
                stroke="#b7ff63"
                stroke-width="5"
            />

            <text
                x="122"
                y="75"
                fill="#46e7d1"
                font-size="16"
                font-family="monospace"
            >
                CHARGE FLOW
            </text>

        </svg>
    `;

}

function svgResistance() {

    return `
        <svg
            class="circuit-svg"
            viewBox="0 0 340 230"
        >

            <path
                class="circuit-wire"
                d="M30 115 H90"
            />

            <polyline
                class="circuit-resistor"
                points="
                    90,115
                    105,90
                    120,140
                    135,90
                    150,140
                    165,90
                    180,140
                    195,115
                "
            />

            <path
                class="circuit-wire"
                d="M195 115 H310"
            />

            <text
                x="122"
                y="175"
                fill="#ffd166"
                font-size="16"
                font-family="monospace"
            >
                RESISTANCE
            </text>

        </svg>
    `;

}

function svgPower() {

    return `
        <svg
            class="circuit-svg"
            viewBox="0 0 340 230"
        >

            <circle
                cx="170"
                cy="110"
                r="55"
                fill="rgba(183,255,99,.08)"
                stroke="#b7ff63"
                stroke-width="2"
            />

            <text
                x="145"
                y="118"
                fill="#b7ff63"
                font-size="28"
                font-family="monospace"
            >
                P
            </text>

            <path
                class="circuit-current"
                d="M80 110 H120"
            />

            <path
                class="circuit-current"
                d="M220 110 H260"
            />

            <text
                x="135"
                y="195"
                fill="#a3afbd"
                font-size="13"
                font-family="monospace"
            >
                ENERGY / TIME
            </text>

        </svg>
    `;

}

function svgACDC() {

    return `
        <svg
            class="circuit-svg"
            viewBox="0 0 340 230"
        >

            <path
                d="M25 75
                   C55 35,85 115,115 75
                   S175 35,205 75
                   S265 115,295 75"
                fill="none"
                stroke="#46e7d1"
                stroke-width="4"
            />

            <line
                x1="25"
                y1="150"
                x2="295"
                y2="150"
                stroke="#b7ff63"
                stroke-width="4"
            />

            <text
                x="30"
                y="55"
                fill="#46e7d1"
                font-size="12"
                font-family="monospace"
            >
                AC
            </text>

            <text
                x="30"
                y="180"
                fill="#b7ff63"
                font-size="12"
                font-family="monospace"
            >
                DC
            </text>

        </svg>
    `;

}

function svgGround() {

    return `
        <svg
            class="circuit-svg"
            viewBox="0 0 340 230"
        >

            <line
                x1="170"
                y1="45"
                x2="170"
                y2="145"
                stroke="#46e7d1"
                stroke-width="5"
            />

            <line
                x1="120"
                y1="145"
                x2="220"
                y2="145"
                stroke="#b7ff63"
                stroke-width="5"
            />

            <line
                x1="135"
                y1="158"
                x2="205"
                y2="158"
                stroke="#b7ff63"
                stroke-width="5"
            />

            <line
                x1="150"
                y1="171"
                x2="190"
                y2="171"
                stroke="#b7ff63"
                stroke-width="5"
            />

            <text
                x="140"
                y="205"
                fill="#a3afbd"
                font-size="13"
                font-family="monospace"
            >
                GROUND
            </text>

        </svg>
    `;

}

function visualFor(type) {

    const visuals = {

        battery: svgBattery,

        electron: svgElectron,

        charge: svgCharge,

        voltage: svgVoltage,

        current: svgCurrent,

        resistance: svgResistance,

        power: svgPower,

        acdc: svgACDC,

        ground: svgGround,

        universe: () => `
            <div style="
                font-size:90px;
                filter:drop-shadow(0 20px 30px rgba(183,255,99,.15))
            ">
                🌌
            </div>
        `

    };

    return visuals[type]
        ? visuals[type]()
        : "";

}

/* ============================================================
   HOME

function renderHome() {

    return `

        <div class="page">

            <section class="hero">

                <div>

                    <span class="eyebrow">
                        NAMMA CIRCUIT · ECE UNIVERSE
                    </span>

                    <h1>
                        Electronics is not a subject.
                        <span>
                            It's a universe.
                        </span>
                    </h1>

                    <p class="hero-copy">
                        Start with your first electron.
                        Meet the circuit crew.
                        Experiment with concepts.
                        Then discover where ECE is hiding
                        inside the world around you.
                    </p>

                    <div class="hero-actions">

                        <a
                            href="#/learn"
                            class="btn btn-primary"
                        >
                            🚀 Start from Zero
                        </a>

                        <a
                            href="#/everyday"
                            class="btn"
                        >
                            🌍 See ECE in Real Life
                        </a>

                    </div>

                    <div class="hero-stats">

                        <div class="hero-stat">
                            <strong>10</strong>
                            <span>ECE stages</span>
                        </div>

                        <div class="hero-stat">
                            <strong>7</strong>
                            <span>NCU mascots</span>
                        </div>

                        <div class="hero-stat">
                            <strong>∞</strong>
                            <span>things to discover</span>
                        </div>

                    </div>

                </div>

                <div class="universe-art">

                    <div class="universe-ring"></div>

                    <div class="universe-core">
                        ECE<br>
                        UNIVERSE
                    </div>

                    <div class="orbit-mascot m1">
                        ⚡
                    </div>

                    <div class="orbit-mascot m2">
                        🌊
                    </div>

                    <div class="orbit-mascot m3">
                        🤖
                    </div>

                    <div class="orbit-mascot m4">
                        🧱
                    </div>

                    <div class="orbit-mascot m5">
                        💻
                    </div>

                    <div class="orbit-mascot m6">
                        ⚡
                    </div>

                </div>

            </section>

        </div>

        <section class="section">

            <div class="page">

                <div class="section-head">

                    <div>

                        <span class="eyebrow">
                            THE WORLDS
                        </span>

                        <h2>
                            Enter the ECE Universe.
                        </h2>

                    </div>

                    <p>
                        Every major ECE domain becomes its own
                        world — connected by the concepts you learn.
                    </p>

                </div>

                <div class="domain-grid">

                    ${domains.map(domainCard).join("")}

                </div>

            </div>

        </section>

        <section class="section">

            <div class="page">

                <div class="section-head">

                    <div>

                        <span class="eyebrow">
                            CIRCUIT CREW
                        </span>

                        <h2>
                            Your teachers are characters.
                        </h2>

                    </div>

                    <p>
                        Instead of throwing textbook paragraphs at you,
                        NCU characters explain the ideas.
                    </p>

                </div>

                <div class="mascot-grid">

                    ${Object.values(mascots)
                        .map(mascotCard)
                        .join("")}

                </div>

            </div>

        </section>

        <section class="section">

            <div class="page">

                <div class="section-head">

                    <div>

                        <span class="eyebrow">
                            ROADMAP
                        </span>

                        <h2>
                            Zero → Advanced.
                        </h2>

                    </div>

                    <p>
                        Learn in order or jump into any world.
                        The universe will keep expanding.
                    </p>

                </div>

                <div class="roadmap">

                    ${roadmap
                        .map(
                            ([number,title,text,color]) => `

                            <div
                                class="road"
                                style="--road-color:${color}"
                            >

                                <div class="road-icon">
                                    ${number}
                                </div>

                                <div>

                                    <strong>
                                        ${title}
                                    </strong>

                                    <p>
                                        ${text}
                                    </p>

                                </div>

                                <div class="road-level">
                                    →
                                </div>

                            </div>

                        `
                        )
                        .join("")}

                </div>

            </div>

        </section>

        <section class="section">

            <div class="page">

                <div class="section-head">

                    <div>

                        <span class="eyebrow">
                            ENGINEERING IN EVERYDAY LIFE
                        </span>

                        <h2>
                            Look around.
                            ECE is everywhere.
                        </h2>

                    </div>

                    <p>
                        Don't just learn a component.
                        Discover where it is hiding inside
                        the devices you use every day.
                    </p>

                </div>

                <div class="everyday-grid">

                    ${everyday
                        .slice(0,6)
                        .map(everydayCard)
                        .join("")}

                </div>

                <div class="hero-actions">

                    <a
                        href="#/everyday"
                        class="btn btn-primary"
                    >
                        Explore Everyday Engineering →
                    </a>

                </div>

            </div>

        </section>

    `;

}

/* ============================================================
   CARDS

function domainCard(domain) {

    return `

        <a
            href="#/learn/${domain.id}"
            class="domain"
            style="--domain-color:${domain.color}"
        >

            <div class="domain-number">
                ${domain.number}
            </div>

            <div class="domain-icon">
                ${domain.icon}
            </div>

            <h3>
                ${domain.title}
            </h3>

            <p>
                ${domain.description}
            </p>

            <div class="domain-meta">

                <span>
                    ${domain.level}
                </span>

                <span>
                    EXPLORE →
                </span>

            </div>

        </a>

    `;

}

function mascotCard(m) {

    return `

        <a
            href="#/characters"
            class="mascot-card"
        >

            <div class="mascot-avatar">
                ${m.emoji}
            </div>

            <strong>
                ${m.name}
            </strong>

            <span>
                ${m.concept}
            </span>

        </a>

    `;

}

function everydayCard(item) {

    return `

        <a
            href="#/everyday/${item.id}"
            class="everyday-card"
        >

            <div class="everyday-image">

                <div class="everyday-icon">
                    ${item.icon}
                </div>

            </div>

            <div class="everyday-info">

                <h3>
                    ${item.title}
                </h3>

                <p>
                    ${item.description}
                </p>

                <div class="ece-tags">

                    ${item.tags
                        .map(
                            tag => `
                                <span class="ece-tag">
                                    ${tag}
                                </span>
                            `
                        )
                        .join("")}

                </div>

            </div>

        </a>

    `;

}

/* ============================================================
   UNIVERSE

function renderUniverse() {

    return `

        <div class="page">

            <section class="lesson-hero">

                <span class="eyebrow">
                    🌌 ECE UNIVERSE
                </span>

                <h1>
                    Choose your world.
                </h1>

                <p>
                    ECE is a connected system.
                    Learn one world and you'll start recognising
                    its concepts everywhere else.
                </p>

            </section>

            <section class="section-small">

                <div class="domain-grid">

                    ${domains.map(domainCard).join("")}

                </div>

            </section>

        </div>

    `;

}

/* ============================================================
   LEARN

function renderLearn() {

    const ids =
        Object.keys(lessons);

    const completed =
        getCompleted();

    const progress =
        Math.round(
            (
                completed.filter(
                    id => ids.includes(id)
                ).length /
                ids.length
            ) * 100
        );

    return `

        <div class="page">

            <section class="lesson-hero">

                <span class="eyebrow">
                    📚 ECE ZERO
                </span>

                <h1>
                    Start from nothing.
                </h1>

                <p>
                    No assumptions.
                    No "you should already know this."
                    We build the foundation one idea at a time.
                </p>

                <div style="margin-top:25px">

                    <div class="muted">
                        ECE Zero progress · ${progress}%
                    </div>

                    <div class="progress-bar">
                        <span style="width:${progress}%"></span>
                    </div>

                </div>

            </section>

            <section class="section-small">

                <div class="topic-grid">

                    ${Object.entries(lessons)
                        .map(
                            ([id, lesson], index) => `

                            <a
                                class="topic"
                                href="#/topic/${id}"
                            >

                                <span class="topic-tag">
                                    ${String(index + 1).padStart(2,"0")}
                                    · ${lesson.eyebrow.split("·")[0]}
                                </span>

                                <h3>
                                    ${lesson.title}
                                </h3>

                                <p>
                                    ${lesson.subtitle}
                                </p>

                                <span class="topic-arrow">
                                    ENTER LESSON →
                                </span>

                            </a>

                        `
                        )
                        .join("")}

                </div>

            </section>

        </div>

    `;

}

/* ============================================================
   DOMAIN

function renderDomain(id) {

    if (id === "ece-zero") {

        return renderLearn();

    }

    const domain =
        domains.find(
            d => d.id === id
        );

    if (!domain) {

        return renderNotFound();

    }

    const topics =
        domainTopics[id] || [];

    return `

        <div class="page">

            <section class="lesson-hero">

                <span class="eyebrow">
                    ${domain.number}
                    ·
                    ${domain.level}
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
                        .map(
                            (topic,index) => `

                            <div class="topic">

                                <span class="topic-tag">
                                    ${String(index+1).padStart(2,"0")}
                                </span>

                                <h3>
                                    ${topic}
                                </h3>

                                <p>
                                    This concept is part of the
                                    ${domain.title} learning path.
                                </p>

                                <span class="topic-arrow">
                                    CONTENT EXPANSION →
                                </span>

                            </div>

                        `
                        )
                        .join("")}

                </div>

            </section>

        </div>

    `;

}

/* ============================================================
   LESSON PAGE

function renderTopic(id) {

    const lesson =
        lessons[id];

    if (!lesson) {

        return renderNotFound();

    }

    const mascot =
        mascots[
            lesson.mascot
        ];

    const completed =
        getCompleted()
            .includes(id);

    return `

        <div class="page">

            <section class="lesson-hero">

                <span class="eyebrow">
                    ${lesson.eyebrow}
                </span>

                <h1>
                    ${lesson.title}
                </h1>

                <p>
                    ${lesson.subtitle}
                </p>

            </section>

            <div class="lesson-layout">

                <main class="lesson-main">

                    <!-- HOOK -->

                    <section class="lesson-card lesson-hook">

                        <div>

                            <span class="eyebrow">
                                ⚡ THE HOOK
                            </span>

                            <div class="hook-question">
                                ${lesson.hook}
                            </div>

                        </div>

                        <div class="lesson-visual">

                            ${visualFor(
                                lesson.visual
                            )}

                        </div>

                    </section>

                    <!-- SIMPLE -->

                    <section class="lesson-card">

                        <span class="eyebrow">
                            🧠 SIMPLE MODE
                        </span>

                        <h2>
                            Understand it first.
                        </h2>

                        <p>
                            ${lesson.simple}
                        </p>

                    </section>

                    <!-- MASCOT -->

                    <section class="lesson-card">

                        <span class="eyebrow">
                            👾 NCU MODE
                        </span>

                        <div
                            class="mascot-dialogue"
                            style="margin-top:20px"
                        >

                            <div class="dialogue-avatar">
                                ${mascot.emoji}
                            </div>

                            <div class="dialogue-bubble">

                                <strong>
                                    ${mascot.name}
                                    ·
                                    ${mascot.concept}
                                </strong>

                                <p>
                                    "${lesson.mascotText}"
                                </p>

                            </div>

                        </div>

                    </section>

                    <!-- ENGINEER -->

                    <section class="lesson-card">

                        <span class="eyebrow">
                            ⚙ ENGINEER MODE
                        </span>

                        <h2>
                            Now let's make it technical.
                        </h2>

                        <p>
                            ${lesson.engineer}
                        </p>

                    </section>

                    <!-- FORMULA -->

                    ${
                        lesson.formula
                            ? `

                                <section class="lesson-card">

                                    <span class="eyebrow">
                                        📐 FORMULA
                                    </span>

                                    <div class="formula-box">

                                        <div class="formula">
                                            ${lesson.formula}
                                        </div>

                                    </div>

                                </section>

                            `
                            : ""
                    }

                    <!-- REAL WORLD -->

                    <section class="lesson-card">

                        <span class="eyebrow">
                            🌍 REAL WORLD
                        </span>

                        <h2>
                            Where will you find it?
                        </h2>

                        <p>
                            ${lesson.real}
                        </p>

                    </section>

                    <!-- EXPERIMENT -->

                    <section class="lesson-card experiment">

                        <span class="eyebrow">
                            🧪 MINI EXPERIMENT
                        </span>

                        <h2>
                            Don't just read it.
                            Change it.
                        </h2>

                        <div class="experiment-grid">

                            <div class="controls">

                                <div class="control-row">

                                    <label>

                                        <span>
                                            Voltage
                                        </span>

                                        <strong
                                            id="voltageValue"
                                        >
                                            5 V
                                        </strong>

                                    </label>

                                    <input
                                        id="voltageSlider"
                                        type="range"
                                        min="1"
                                        max="24"
                                        value="5"
                                    >

                                </div>

                                <div class="control-row">

                                    <label>

                                        <span>
                                            Resistance
                                        </span>

                                        <strong
                                            id="resistanceValue"
                                        >
                                            100 Ω
                                        </strong>

                                    </label>

                                    <input
                                        id="resistanceSlider"
                                        type="range"
                                        min="10"
                                        max="1000"
                                        value="100"
                                    >

                                </div>

                                <div class="value-box">

                                    Current:
                                    <strong id="currentValue">
                                        50 mA
                                    </strong>

                                </div>

                                <div class="value-box">

                                    Power:
                                    <strong id="experimentPower">
                                        0.25 W
                                    </strong>

                                </div>

                            </div>

                            <div
                                class="circuit-screen"
                                id="circuitScreen"
                            >

                                ${svgResistance()}

                            </div>

                        </div>

                    </section>

                    <!-- QUICK CHECK -->

                    <section class="lesson-card">

                        <span class="eyebrow">
                            ❓ QUICK CHECK
                        </span>

                        <h2>
                            One question before you leave.
                        </h2>

                        <p>
                            If voltage stays constant and resistance
                            increases, what happens to current?
                        </p>

                        <div
                            class="quiz-options"
                            id="lessonQuiz"
                        >

                            <button
                                class="quiz-option"
                                data-correct="false"
                            >
                                It increases
                            </button>

                            <button
                                class="quiz-option"
                                data-correct="true"
                            >
                                It decreases
                            </button>

                            <button
                                class="quiz-option"
                                data-correct="false"
                            >
                                It becomes zero always
                            </button>

                        </div>

                    </section>

                    <!-- COMPLETE -->

                    <section class="lesson-card">

                        <span class="eyebrow">
                            🚀 YOUR JOURNEY
                        </span>

                        <h2>
                            ${completed
                                ? "Concept completed! ⚡"
                                : "Lock this concept in."
                            }
                        </h2>

                        <p>
                            ${
                                completed
                                ? "You've already earned XP for this concept."
                                : "Mark the concept as learned to earn 25 XP."
                            }
                        </p>

                        <div class="hero-actions">

                            <button
                                class="btn btn-primary"
                                data-complete="${id}"
                                ${completed ? "disabled" : ""}
                            >
                                ${
                                    completed
                                    ? "✓ Learned"
                                    : "✓ Mark as Learned · +25 XP"
                                }
                            </button>

                            ${
                                lesson.next
                                ? `
                                    <a
                                        class="btn"
                                        href="#/topic/${lesson.next}"
                                    >
                                        Next Concept →
                                    </a>
                                `
                                : `
                                    <a
                                        class="btn"
                                        href="#/learn"
                                    >
                                        Back to ECE Zero
                                    </a>
                                `
                            }

                        </div>

                    </section>

                </main>

                <aside class="lesson-sidebar">

                    <span class="eyebrow">
                        ECE ZERO
                    </span>

                    <a href="#/learn">
                        ← All ECE Zero
                    </a>

                    <a href="#/universe">
                        🌌 Universe
                    </a>

                    <a href="#/everyday">
                        🌍 Real World
                    </a>

                    <a href="#/characters">
                        👾 Circuit Crew
                    </a>

                    <a href="#/lab">
                        🧪 NCU Lab
                    </a>

                </aside>

            </div>

        </div>

    `;

}

/* ============================================================
   EVERYDAY LIST

function renderEveryday() {

    return `

        <div class="page">

            <section class="lesson-hero">

                <span class="eyebrow">
                    🌍 ENGINEERING IN EVERYDAY LIFE
                </span>

                <h1>
                    Look around.
                    <br>
                    ECE is everywhere.
                </h1>

                <p>
                    Pick something you use every day.
                    We'll break it down into the engineering
                    concepts hiding underneath.
                </p>

            </section>

            <section class="section-small">

                <div class="everyday-grid">

                    ${everyday
                        .map(everydayCard)
                        .join("")}

                </div>

            </section>

        </div>

    `;

}

/* ============================================================
   EVERYDAY DETAIL

function renderEverydayDetail(id) {

    const item =
        everyday.find(
            x => x.id === id
        );

    if (!item) {

        return renderNotFound();

    }

    return `

        <div class="page">

            <section class="real-life-hero">

                <span class="eyebrow">
                    🌍 ENGINEERING IN EVERYDAY LIFE
                </span>

                <h1>
                    ${item.icon}
                    ${item.title}
                </h1>

                <p>
                    ${item.intro}
                </p>

            </section>

            <section class="section-small">

                <div class="device-diagram">

                    <div style="
                        text-align:center;
                    ">

                        <div style="
                            font-size:140px;
                            filter:drop-shadow(
                                0 25px 35px rgba(0,0,0,.5)
                            );
                        ">
                            ${item.icon}
                        </div>

                        <div class="eyebrow">
                            ECE INSIDE
                        </div>

                    </div>

                </div>

            </section>

            <section class="section-small">

                <div class="section-head">

                    <div>

                        <span class="eyebrow">
                            BREAK IT DOWN
                        </span>

                        <h2>
                            What's actually happening?
                        </h2>

                    </div>

                    <p>
                        The same ECE concepts you've learned
                        appear as building blocks inside real systems.
                    </p>

                </div>

                <div class="breakdown">

                    ${item.blocks
                        .map(
                            ([title,text],index) => `

                            <article class="breakdown-card">

                                <span>
                                    0${index+1}
                                </span>

                                <h3>
                                    ${title}
                                </h3>

                                <p>
                                    ${text}
                                </p>

                            </article>

                        `
                        )
                        .join("")}

                </div>

            </section>

            <section class="section">

                <div class="lesson-card">

                    <span class="eyebrow">
                        🔗 CONNECT THE DOTS
                    </span>

                    <h2>
                        This is why ECE matters.
                    </h2>

                    <p>
                        A real product is rarely just one subject.
                        It combines circuits, components, signals,
                        embedded systems, software, communication
                        and power electronics.
                    </p>

                    <div class="ece-tags">

                        ${item.tags
                            .map(
                                tag => `
                                    <span class="ece-tag">
                                        ${tag}
                                    </span>
                                `
                            )
                            .join("")}

                    </div>

                </div>

            </section>

        </div>

    `;

}

/* ============================================================
   CHARACTERS

function renderCharacters() {

    return `

        <div class="page">

            <section class="lesson-hero">

                <span class="eyebrow">
                    👾 CIRCUIT CREW
                </span>

                <h1>
                    Meet the engineers
                    inside your head.
                </h1>

                <p>
                    Each mascot represents a concept.
                    Together, they make difficult ideas easier
                    to remember.
                </p>

            </section>

            <section class="section-small">

                <div class="mascot-grid">

                    ${Object.values(mascots)
                        .map(mascotCard)
                        .join("")}

                </div>

            </section>

        </div>

    `;

}

/* ============================================================
   LAB

function renderLab() {

    return `

        <div class="page">

            <section class="lesson-hero">

                <span class="eyebrow">
                    🧪 NCU LAB
                </span>

                <h1>
                    Stop reading.
                    Start experimenting.
                </h1>

                <p>
                    Day 1 introduces the interactive lab system.
                    More circuit simulations will plug into this
                    same architecture.
                </p>

            </section>

            <section class="section-small">

                <div class="lesson-card experiment">

                    <span class="eyebrow">
                        OHM'S LAW LAB
                    </span>

                    <h2>
                        Watch current change.
                    </h2>

                    <div class="experiment-grid">

                        <div class="controls">

                            <div class="control-row">

                                <label>
                                    <span>
                                        Voltage
                                    </span>

                                    <strong id="labV">
                                        5 V
                                    </strong>
                                </label>

                                <input
                                    id="labVoltage"
                                    type="range"
                                    min="1"
                                    max="24"
                                    value="5"
                                >

                            </div>

                            <div class="control-row">

                                <label>
                                    <span>
                                        Resistance
                                    </span>

                                    <strong id="labR">
                                        100 Ω
                                    </strong>
                                </label>

                                <input
                                    id="labResistance"
                                    type="range"
                                    min="10"
                                    max="1000"
                                    value="100"
                                >

                            </div>

                            <div class="value-box">
                                V = <span id="labVoltageText">5</span> V
                            </div>

                            <div class="value-box">
                                R = <span id="labResistanceText">100</span> Ω
                            </div>

                            <div class="value-box">
                                I =
                                <strong id="labCurrent">
                                    50 mA
                                </strong>
                            </div>

                        </div>

                        <div class="circuit-screen">

                            ${svgResistance()}

                        </div>

                    </div>

                </div>

            </section>

        </div>

    `;

}

/* ============================================================
   QUIZ

const quiz = [

    {
        question:
            "Which quantity represents electric potential difference?",

        options: [
            "Current",
            "Voltage",
            "Resistance",
            "Power"
        ],

        answer: 1

    },

    {
        question:
            "What is the SI unit of current?",

        options: [
            "Volt",
            "Ohm",
            "Ampere",
            "Watt"
        ],

        answer: 2

    },

    {
        question:
            "According to Ohm's Law, if resistance increases while voltage remains constant, current:",

        options: [
            "Increases",
            "Decreases",
            "Always becomes zero",
            "Does not change"
        ],

        answer: 1

    },

    {
        question:
            "Which component primarily opposes current in a basic circuit?",

        options: [
            "Resistor",
            "Battery",
            "Wire",
            "Antenna"
        ],

        answer: 0

    }

];

function renderQuiz() {

    return `

        <div class="page">

            <section class="lesson-hero">

                <span class="eyebrow">
                    🧠 QUIZ ARENA
                </span>

                <h1>
                    Let's see what
                    you actually remember.
                </h1>

                <p>
                    Don't worry about getting everything right.
                    Mistakes are part of engineering.
                </p>

            </section>

            <section class="section-small">

                ${quiz
                    .map(
                        (q,index) => `

                        <div
                            class="quiz-question"
                            data-question="${index}"
                        >

                            <span class="eyebrow">
                                QUESTION ${index+1}
                            </span>

                            <h3 style="margin-top:10px">
                                ${q.question}
                            </h3>

                            <div class="quiz-options">

                                ${q.options
                                    .map(
                                        (option,i) => `

                                        <button
                                            class="quiz-option"
                                            data-answer="${i}"
                                            data-correct="${q.answer}"
                                        >
                                            ${option}
                                        </button>

                                    `
                                    )
                                    .join("")}

                            </div>

                        </div>

                    `
                    )
                    .join("")}

            </section>

        </div>

    `;

}

/* ============================================================
   PROGRESS

function renderProgress() {

    const xp =
        getXP();

    const lvl =
        level();

    const completed =
        getCompleted();

    const percentage =
        xp % 100;

    return `

        <div class="page">

            <section class="lesson-hero">

                <span class="eyebrow">
                    📊 YOUR JOURNEY
                </span>

                <h1>
                    Keep building.
                </h1>

                <p>
                    Your current progress is stored locally.
                    Supabase will replace this system later
                    when accounts are introduced.
                </p>

            </section>

            <section class="section-small">

                <div class="progress-card">

                    <span class="eyebrow">
                        CURRENT LEVEL
                    </span>

                    <div class="progress-number">
                        ${lvl}
                    </div>

                    <div class="muted">
                        ${xp} XP
                    </div>

                    <div class="progress-bar">
                        <span
                            style="width:${percentage}%"
                        ></span>
                    </div>

                    <p
                        class="muted"
                        style="margin-top:12px"
                    >
                        ${100 - percentage}
                        XP until the next level.
                    </p>

                </div>

            </section>

            <section class="section-small">

                <div class="section-head">

                    <div>

                        <span class="eyebrow">
                            COMPLETED CONCEPTS
                        </span>

                        <h2>
                            ${completed.length}
                        </h2>

                    </div>

                </div>

                ${
                    completed.length
                    ?
                    `
                        <div class="topic-grid">

                            ${completed
                                .map(
                                    id => `

                                    <a
                                        class="topic"
                                        href="#/topic/${id}"
                                    >

                                        <span class="topic-tag">
                                            ✓ COMPLETED
                                        </span>

                                        <h3>
                                            ${
                                                lessons[id]
                                                ?.title ||
                                                id
                                            }
                                        </h3>

                                        <p>
                                            +25 XP
                                        </p>

                                    </a>

                                `
                                )
                                .join("")}

                        </div>
                    `
                    :
                    `
                        <div class="empty">

                            <h2>
                                Your first concept is waiting.
                            </h2>

                            <p>
                                Complete a lesson and start
                                building your ECE XP.
                            </p>

                            <a
                                href="#/learn"
                                class="btn btn-primary"
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
   ROUTER

function route() {

    const hash =
        location.hash
            .replace(/^#/, "")
            .replace(/\/+$/, "");

    return hash || "/";

}

function renderNotFound() {

    return `

        <div class="page">

            <div class="empty">

                <span class="eyebrow">
                    SIGNAL LOST
                </span>

                <h2>
                    This circuit isn't connected yet.
                </h2>

                <p>
                    This part of the universe is coming later.
                </p>

                <a
                    href="#/"
                    class="btn btn-primary"
                >
                    Return Home
                </a>

            </div>

        </div>

    `;

}

function render() {

    const current =
        route();

    const parts =
        current
            .split("/")
            .filter(Boolean);

    let html;

    if (current === "/") {

        html =
            renderHome();

    }

    else if (
        current === "/universe"
    ) {

        html =
            renderUniverse();

    }

    else if (
        current === "/learn"
    ) {

        html =
            renderLearn();

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

    else if (
        current === "/everyday"
    ) {

        html =
            renderEveryday();

    }

    else if (
        parts[0] === "everyday" &&
        parts[1]
    ) {

        html =
            renderEverydayDetail(
                parts[1]
            );

    }

    else if (
        current === "/characters"
    ) {

        html =
            renderCharacters();

    }

    else if (
        current === "/lab"
    ) {

        html =
            renderLab();

    }

    else if (
        current === "/quiz"
    ) {

        html =
            renderQuiz();

    }

    else if (
        current === "/progress"
    ) {

        html =
            renderProgress();

    }

    else {

        html =
            renderNotFound();

    }

    document
        .getElementById("app")
        .innerHTML = html;

    updateNavigation();

    updateXP();

    attachEvents();

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}

/* ============================================================
   NAVIGATION

function updateNavigation() {

    const current =
        route();

    document
        .querySelectorAll(".nav a")
        .forEach(link => {

            const href =
                link
                    .getAttribute("href")
                    .replace("#","");

            link.classList.toggle(
                "active",
                href === current
            );

        });

}

/* ============================================================
   EXPERIMENT ENGINE

function calculateCircuit(
    voltage,
    resistance
) {

    const current =
        voltage / resistance;

    const power =
        voltage * current;

    return {
        current,
        power
    };

}

function updateExperiment(
    voltageId,
    resistanceId,
    voltageTextId,
    resistanceTextId,
    currentId,
    powerId
) {

    const v =
        Number(
            document.getElementById(
                voltageId
            )?.value || 5
        );

    const r =
        Number(
            document.getElementById(
                resistanceId
            )?.value || 100
        );

    const result =
        calculateCircuit(
            v,
            r
        );

    const vText =
        document.getElementById(
            voltageTextId
        );

    const rText =
        document.getElementById(
            resistanceTextId
        );

    const current =
        document.getElementById(
            currentId
        );

    const power =
        document.getElementById(
            powerId
        );

    if (vText)
        vText.textContent =
            `${v} V`;

    if (rText)
        rText.textContent =
            `${r} Ω`;

    if (current)
        current.textContent =
            `${(
                result.current * 1000
            ).toFixed(1)} mA`;

    if (power)
        power.textContent =
            `${result.power.toFixed(2)} W`;

}

/* ============================================================
   EVENTS

function attachEvents() {

    /* Complete lesson */

    document
        .querySelectorAll(
            "[data-complete]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.complete;

                    if (
                        complete(id)
                    ) {

                        button.textContent =
                            "✓ Learned · +25 XP";

                        button.disabled =
                            true;

                    }

                }
            );

        });

    /* Lesson quiz */

    document
        .querySelectorAll(
            "#lessonQuiz .quiz-option"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const correct =
                        button.dataset.correct ===
                        "true";

                    const parent =
                        button.parentElement;

                    parent
                        .querySelectorAll(
                            ".quiz-option"
                        )
                        .forEach(
                            item => {
                                item.disabled =
                                    true;
                            }
                        );

                    if (correct) {

                        button.classList.add(
                            "correct"
                        );

                        addXP(10);

                    } else {

                        button.classList.add(
                            "wrong"
                        );

                        parent
                            .querySelector(
                                '[data-correct="true"]'
                            )
                            ?.classList.add(
                                "correct"
                            );

                    }

                }
            );

        });

    /* Main quiz */

    document
        .querySelectorAll(
            ".quiz-question .quiz-option"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const parent =
                        button.closest(
                            ".quiz-question"
                        );

                    parent
                        .querySelectorAll(
                            ".quiz-option"
                        )
                        .forEach(
                            item => {
                                item.disabled =
                                    true;
                            }
                        );

                    const answer =
                        Number(
                            button.dataset.answer
                        );

                    const correct =
                        Number(
                            button.dataset.correct
                        );

                    if (
                        answer === correct
                    ) {

                        button.classList.add(
                            "correct"
                        );

                        addXP(10);

                    } else {

                        button.classList.add(
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

    /* Lesson experiment */

    const vSlider =
        document.getElementById(
            "voltageSlider"
        );

    const rSlider =
        document.getElementById(
            "resistanceSlider"
        );

    if (
        vSlider &&
        rSlider
    ) {

        const update =
            () => {

                updateExperiment(
                    "voltageSlider",
                    "resistanceSlider",
                    "voltageValue",
                    "resistanceValue",
                    "currentValue",
                    "experimentPower"
                );

            };

        vSlider.addEventListener(
            "input",
            update
        );

        rSlider.addEventListener(
            "input",
            update
        );

        update();

    }

    /* Lab */

    const labV =
        document.getElementById(
            "labVoltage"
        );

    const labR =
        document.getElementById(
            "labResistance"
        );

    if (
        labV &&
        labR
    ) {

        const updateLab =
            () => {

                const v =
                    Number(
                        labV.value
                    );

                const r =
                    Number(
                        labR.value
                    );

                const i =
                    v / r;

                document.getElementById(
                    "labV"
                ).textContent =
                    `${v} V`;

                document.getElementById(
                    "labR"
                ).textContent =
                    `${r} Ω`;

                document.getElementById(
                    "labVoltageText"
                ).textContent =
                    v;

                document.getElementById(
                    "labResistanceText"
                ).textContent =
                    r;

                document.getElementById(
                    "labCurrent"
                ).textContent =
                    `${(
                        i * 1000
                    ).toFixed(1)} mA`;

            };

        labV.addEventListener(
            "input",
            updateLab
        );

        labR.addEventListener(
            "input",
            updateLab
        );

        updateLab();

    }

}

/* ============================================================
   SEARCH

function buildSearchIndex() {

    const index = [];

    Object.entries(
        lessons
    ).forEach(
        ([id,lesson]) => {

            index.push({

                type: "ECE Concept",

                title:
                    lesson.title,

                description:
                    lesson.subtitle,

                url:
                    `#/topic/${id}`

            });

        }
    );

    domains.forEach(
        domain => {

            index.push({

                type: "ECE World",

                title:
                    domain.title,

                description:
                    domain.description,

                url:
                    `#/learn/${domain.id}`

            });

        }
    );

    everyday.forEach(
        item => {

            index.push({

                type:
                    "Everyday Engineering",

                title:
                    item.title,

                description:
                    item.description,

                url:
                    `#/everyday/${item.id}`

            });

        }
    );

    Object.values(
        mascots
    ).forEach(
        mascot => {

            index.push({

                type:
                    "NCU Mascot",

                title:
                    `${mascot.name} — ${mascot.concept}`,

                description:
                    mascot.line,

                url:
                    "#/characters"

            });

        }
    );

    return index;

}

const searchIndex =
    buildSearchIndex();

function openSearch() {

    const overlay =
        document.getElementById(
            "searchOverlay"
        );

    overlay.classList.add(
        "open"
    );

    document.body.classList.add(
        "lock"
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

    document
        .getElementById(
            "searchOverlay"
        )
        .classList.remove(
            "open"
        );

    document.body.classList.remove(
        "lock"
    );

}

function search(query) {

    const results =
        document.getElementById(
            "searchResults"
        );

    const value =
        query
            .trim()
            .toLowerCase();

    if (!value) {

        results.innerHTML = `

            <div class="search-placeholder">
                Search the ECE Universe.
            </div>

        `;

        return;

    }

    const matches =
        searchIndex
            .filter(
                item =>
                    item.title
                        .toLowerCase()
                        .includes(value)

                    ||

                    item.description
                        .toLowerCase()
                        .includes(value)

                    ||

                    item.type
                        .toLowerCase()
                        .includes(value)
            )
            .slice(0,15);

    if (!matches.length) {

        results.innerHTML = `

            <div class="search-placeholder">
                No concept found.
                <br><br>
                Try:
                voltage,
                current,
                resistor,
                ESP32,
                VLSI,
                smartphone...
            </div>

        `;

        return;

    }

    results.innerHTML =
        matches
            .map(
                item => `

                    <a
                        href="${item.url}"
                        class="search-result"
                    >

                        <small>
                            ${item.type}
                        </small>

                        <strong>
                            ${item.title}
                        </strong>

                        <p>
                            ${item.description}
                        </p>

                    </a>

                `
            )
            .join("");

    results
        .querySelectorAll(
            "a"
        )
        .forEach(
            link =>
                link.addEventListener(
                    "click",
                    closeSearch
                )
        );

}

/* ============================================================
   GLOBAL

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document.getElementById(
            "year"
        ).textContent =
            new Date()
                .getFullYear();

        document.getElementById(
            "searchOpen"
        ).addEventListener(
            "click",
            openSearch
        );

        document.getElementById(
            "searchClose"
        ).addEventListener(
            "click",
            closeSearch
        );

        document.getElementById(
            "searchInput"
        ).addEventListener(
            "input",
            e =>
                search(
                    e.target.value
                )
        );

        document.getElementById(
            "searchOverlay"
        ).addEventListener(
            "click",
            e => {

                if (
                    e.target.id ===
                    "searchOverlay"
                ) {

                    closeSearch();

                }

            }
        );

        document.getElementById(
            "mobileMenu"
        ).addEventListener(
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
                ".mobile-nav a"
            )
            .forEach(
                link => {

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

                }
            );

        document.addEventListener(
            "keydown",
            e => {

                if (
                    e.key ===
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