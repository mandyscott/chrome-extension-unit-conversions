const CATEGORIES = {
  length: {
    units: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
    labels: {
      mm: "Millimeters (mm)",
      cm: "Centimeters (cm)",
      m: "Meters (m)",
      km: "Kilometers (km)",
      in: "Inches (in)",
      ft: "Feet (ft)",
      yd: "Yards (yd)",
      mi: "Miles (mi)",
    },
    // All values relative to meters
    toBase: {
      mm: v => v / 1000,
      cm: v => v / 100,
      m:  v => v,
      km: v => v * 1000,
      in: v => v * 0.0254,
      ft: v => v * 0.3048,
      yd: v => v * 0.9144,
      mi: v => v * 1609.344,
    },
    fromBase: {
      mm: v => v * 1000,
      cm: v => v * 100,
      m:  v => v,
      km: v => v / 1000,
      in: v => v / 0.0254,
      ft: v => v / 0.3048,
      yd: v => v / 0.9144,
      mi: v => v / 1609.344,
    },
    defaults: ["cm", "in"],
  },

  weight: {
    units: ["mg", "g", "kg", "t", "oz", "lb", "st"],
    labels: {
      mg: "Milligrams (mg)",
      g:  "Grams (g)",
      kg: "Kilograms (kg)",
      t:  "Metric Tons (t)",
      oz: "Ounces (oz)",
      lb: "Pounds (lb)",
      st: "Stone (st)",
    },
    // All values relative to kilograms
    toBase: {
      mg: v => v / 1_000_000,
      g:  v => v / 1000,
      kg: v => v,
      t:  v => v * 1000,
      oz: v => v * 0.0283495,
      lb: v => v * 0.453592,
      st: v => v * 6.35029,
    },
    fromBase: {
      mg: v => v * 1_000_000,
      g:  v => v * 1000,
      kg: v => v,
      t:  v => v / 1000,
      oz: v => v / 0.0283495,
      lb: v => v / 0.453592,
      st: v => v / 6.35029,
    },
    defaults: ["kg", "lb"],
  },

  temperature: {
    units: ["c", "f", "k"],
    labels: {
      c: "Celsius (°C)",
      f: "Fahrenheit (°F)",
      k: "Kelvin (K)",
    },
    // Temperature conversions are non-linear, handle directly
    toBase: null,
    fromBase: null,
    convert(value, from, to) {
      if (from === to) return value;
      // Convert to Celsius first
      let celsius;
      if (from === "c") celsius = value;
      else if (from === "f") celsius = (value - 32) * 5 / 9;
      else if (from === "k") celsius = value - 273.15;
      // Then Celsius to target
      if (to === "c") return celsius;
      if (to === "f") return celsius * 9 / 5 + 32;
      if (to === "k") return celsius + 273.15;
    },
    defaults: ["c", "f"],
  },

  volume: {
    units: ["ml", "l", "tsp", "tbsp", "fl_oz", "cup", "pt", "qt", "gal"],
    labels: {
      ml:    "Milliliters (ml)",
      l:     "Liters (L)",
      tsp:   "Teaspoons (tsp)",
      tbsp:  "Tablespoons (tbsp)",
      fl_oz: "Fl. Ounces (fl oz)",
      cup:   "Cups (cup)",
      pt:    "Pints (pt)",
      qt:    "Quarts (qt)",
      gal:   "Gallons (gal)",
    },
    // All values relative to liters
    toBase: {
      ml:    v => v / 1000,
      l:     v => v,
      tsp:   v => v * 0.00492892,
      tbsp:  v => v * 0.0147868,
      fl_oz: v => v * 0.0295735,
      cup:   v => v * 0.236588,
      pt:    v => v * 0.473176,
      qt:    v => v * 0.946353,
      gal:   v => v * 3.78541,
    },
    fromBase: {
      ml:    v => v * 1000,
      l:     v => v,
      tsp:   v => v / 0.00492892,
      tbsp:  v => v / 0.0147868,
      fl_oz: v => v / 0.0295735,
      cup:   v => v / 0.236588,
      pt:    v => v / 0.473176,
      qt:    v => v / 0.946353,
      gal:   v => v / 3.78541,
    },
    defaults: ["l", "gal"],
  },
};

const PRECISION = 6;

function convert(category, value, fromUnit, toUnit) {
  if (isNaN(value) || value === "") return "";
  if (fromUnit === toUnit) return value;

  const cat = CATEGORIES[category];
  if (cat.convert) {
    return +cat.convert(+value, fromUnit, toUnit).toFixed(PRECISION);
  }
  const base = cat.toBase[fromUnit](+value);
  const result = cat.fromBase[toUnit](base);
  return +result.toFixed(PRECISION);
}

function populateSelects(category) {
  const cat = CATEGORIES[category];
  [unitA, unitB].forEach((sel, i) => {
    sel.innerHTML = cat.units
      .map(u => `<option value="${u}">${cat.labels[u]}</option>`)
      .join("");
    sel.value = cat.defaults[i];
  });
}

// DOM refs
const inputA = document.getElementById("input-a");
const inputB = document.getElementById("input-b");
const unitA  = document.getElementById("unit-a");
const unitB  = document.getElementById("unit-b");
const swapBtn = document.getElementById("swap-btn");
const tabs   = document.querySelectorAll(".tab");

let activeCategory = "length";
let updatingField = null; // prevents feedback loops

function updateB() {
  if (updatingField === "b") return;
  updatingField = "a";
  const result = convert(activeCategory, inputA.value, unitA.value, unitB.value);
  inputB.value = result === "" ? "" : result;
  updatingField = null;
}

function updateA() {
  if (updatingField === "a") return;
  updatingField = "b";
  const result = convert(activeCategory, inputB.value, unitB.value, unitA.value);
  inputA.value = result === "" ? "" : result;
  updatingField = null;
}

inputA.addEventListener("input", updateB);
inputB.addEventListener("input", updateA);

unitA.addEventListener("change", () => {
  if (inputA.value !== "") updateB();
  else if (inputB.value !== "") updateA();
});

unitB.addEventListener("change", () => {
  if (inputA.value !== "") updateB();
  else if (inputB.value !== "") updateA();
});

swapBtn.addEventListener("click", () => {
  const tmpUnit = unitA.value;
  unitA.value = unitB.value;
  unitB.value = tmpUnit;

  const tmpVal = inputA.value;
  inputA.value = inputB.value;
  inputB.value = tmpVal;

  if (inputA.value !== "") updateB();
});

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    activeCategory = tab.dataset.category;
    inputA.value = "";
    inputB.value = "";
    populateSelects(activeCategory);
  });
});

// Init
populateSelects(activeCategory);
inputA.focus();
