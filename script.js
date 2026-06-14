// Get clock display element
const clock = document.getElementById("clock");

// Create a more maintainable data structure for bit elements
const bitElements = {
    hours: {
        tens: [
            document.getElementById("h_tens_8"),
            document.getElementById("h_tens_4"),
            document.getElementById("h_tens_2"),
            document.getElementById("h_tens_1")
        ],
        ones: [
            document.getElementById("h_ones_8"),
            document.getElementById("h_ones_4"),
            document.getElementById("h_ones_2"),
            document.getElementById("h_ones_1")
        ]
    },
    minutes: {
        tens: [
            document.getElementById("m_tens_8"),
            document.getElementById("m_tens_4"),
            document.getElementById("m_tens_2"),
            document.getElementById("m_tens_1")
        ],
        ones: [
            document.getElementById("m_ones_8"),
            document.getElementById("m_ones_4"),
            document.getElementById("m_ones_2"),
            document.getElementById("m_ones_1")
        ]
    },
    seconds: {
        tens: [
            document.getElementById("s_tens_8"),
            document.getElementById("s_tens_4"),
            document.getElementById("s_tens_2"),
            document.getElementById("s_tens_1")
        ],
        ones: [
            document.getElementById("s_ones_8"),
            document.getElementById("s_ones_4"),
            document.getElementById("s_ones_2"),
            document.getElementById("s_ones_1")
        ]
    }
};

/**
 * Convert a number to Binary-Coded Decimal (BCD)
 * Each digit is converted to its 4-bit binary representation
 * @param {number} n - The number to convert
 * @returns {string} BCD representation as a string of 0s and 1s
 */
function toBCD(n) {
    if (!Number.isInteger(n)) return "";
    return n
        .toString()
        .split("")
        .map(digit => parseInt(digit).toString(2).padStart(4, "0"))
        .join("");
}

/**
 * Update the display for tens and ones place digits
 * @param {string} bcdString - BCD representation (8 bits: 4 for tens, 4 for ones)
 * @param {HTMLElement[]} tensElements - DOM elements for tens place bits
 * @param {HTMLElement[]} onesElements - DOM elements for ones place bits
 */
function updateBinaryDisplay(bcdString, tensElements, onesElements) {
    const tensBits = bcdString.slice(0, 4);
    const onesBits = bcdString.slice(4, 8);

    // Update tens place (first 4 bits)
    tensBits.split("").forEach((bit, index) => {
        tensElements[index].classList.toggle("glowing", bit === "1");
    });

    // Update ones place (last 4 bits)
    onesBits.split("").forEach((bit, index) => {
        onesElements[index].classList.toggle("glowing", bit === "1");
    });
}

/**
 * Main clock update function
 * Fetches current time and updates all binary digit displays
 */
function tick() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Update analog time display
    clock.innerHTML =
        String(hours).padStart(2, "0") +
        " : " +
        String(minutes).padStart(2, "0") +
        " : " +
        String(seconds).padStart(2, "0");

    // Update binary displays for each time unit
    updateBinaryDisplay(toBCD(hours), bitElements.hours.tens, bitElements.hours.ones);
    updateBinaryDisplay(toBCD(minutes), bitElements.minutes.tens, bitElements.minutes.ones);
    updateBinaryDisplay(toBCD(seconds), bitElements.seconds.tens, bitElements.seconds.ones);
}

// Update clock every second
setInterval(tick, 1000);

// Initial tick to avoid blank display on page load
tick();
