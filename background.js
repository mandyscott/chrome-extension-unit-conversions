// Mirrors the unit codes used in popup.js's CATEGORIES object.
const UNIT_CATEGORIES = {
  length: { label: "Length", units: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"], defaults: ["cm", "in"] },
  weight: { label: "Weight", units: ["mg", "g", "kg", "t", "oz", "lb", "st"], defaults: ["kg", "lb"] },
  temperature: { label: "Temperature", units: ["c", "f", "k"], defaults: ["c", "f"] },
  volume: { label: "Volume", units: ["ml", "l", "tsp", "tbsp", "fl_oz", "cup", "pt", "qt", "gal"], defaults: ["l", "gal"] },
  speed: { label: "Speed", units: ["kn", "kmh", "mph", "ms", "fts"], defaults: ["kn", "kmh"] },
};

const UNIT_TITLES = {
  mm: "mm", cm: "cm", m: "m", km: "km", in: "in", ft: "ft", yd: "yd", mi: "mi",
  mg: "mg", g: "g", kg: "kg", t: "metric tons", oz: "oz", lb: "lb", st: "stone",
  c: "°C", f: "°F", k: "K",
  ml: "ml", l: "L", tsp: "tsp", tbsp: "tbsp", fl_oz: "fl oz", cup: "cup", pt: "pt", qt: "qt", gal: "gal",
  kn: "knots", kmh: "km/h", mph: "mph", ms: "m/s", fts: "ft/s",
};

function buildMenus() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "convertRoot",
      title: 'Convert "%s"',
      contexts: ["selection"],
    });

    chrome.contextMenus.create({
      id: "phonetic",
      parentId: "convertRoot",
      title: "Spell phonetically",
      contexts: ["selection"],
    });

    chrome.contextMenus.create({
      id: "separator-1",
      parentId: "convertRoot",
      type: "separator",
      contexts: ["selection"],
    });

    for (const [category, data] of Object.entries(UNIT_CATEGORIES)) {
      const categoryId = `category::${category}`;
      chrome.contextMenus.create({
        id: categoryId,
        parentId: "convertRoot",
        title: data.label,
        contexts: ["selection"],
      });

      for (const unit of data.units) {
        chrome.contextMenus.create({
          id: `unit::${category}::${unit}`,
          parentId: categoryId,
          title: UNIT_TITLES[unit] || unit,
          contexts: ["selection"],
        });
      }
    }
  });
}

chrome.runtime.onInstalled.addListener(buildMenus);

function parseLeadingNumber(text) {
  if (!text) return null;
  const match = text.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
}

chrome.contextMenus.onClicked.addListener(async (info) => {
  const id = info.menuItemId;
  if (typeof id !== "string") return;

  let pending = null;

  if (id === "phonetic") {
    pending = { category: "phonetic", text: (info.selectionText || "").slice(0, 32) };
  } else if (id.startsWith("unit::")) {
    const [, category, toUnit] = id.split("::");
    const defaults = UNIT_CATEGORIES[category]?.defaults;
    if (!defaults) return;

    let fromUnit = defaults[0];
    if (fromUnit === toUnit) fromUnit = defaults[1];

    pending = {
      category,
      fromUnit,
      toUnit,
      value: parseLeadingNumber(info.selectionText),
    };
  } else {
    return;
  }

  await chrome.storage.session.set({ pendingConversion: pending });

  try {
    await chrome.action.openPopup();
  } catch (err) {
    // Older Chrome, or no active window to anchor to — the popup will pick
    // up the pending conversion next time the user opens it from the toolbar.
  }
});
