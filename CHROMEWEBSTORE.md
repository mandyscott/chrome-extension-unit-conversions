# Chrome Web Store Listing — Unit Converter

> Last Updated: 2026-10-20

## Store Listing

**Extension Name** [REQUIRED]
Unit Converter

**Short Description** [REQUIRED]
Convert length, weight, temperature, volume, and speed units, or spell text phonetically — from the popup or right-click menu.

**Detailed Description** [REQUIRED]
Unit Converter turns any number you've typed or selected into the unit you actually need — instantly, in both directions.

Pick a category — Length, Weight, Temperature, Volume, or Speed — type a value into either box, and the other updates immediately. Change either unit at any time, or tap the swap button to flip the conversion around.

Need to read a code or password out loud over the phone? Switch to the Phonetic tab, type or paste up to 32 characters, and see each one spelled out using the standard NATO phonetic alphabet (Alpha, Bravo, Charlie...).

Selected a number or code on any webpage? Right-click it and choose Convert from the menu to jump straight to the right tab with your value already filled in — no need to retype anything.

This extension works entirely offline. It doesn't collect, store, or transmit any personal data, and it makes no network requests of any kind.

Found a bug or have a feature request? Reach out through the support link on this listing.

**Category** [REQUIRED]
Productivity

**Single Purpose** [REQUIRED]
Converts values between common units of measurement (and spells text phonetically), accessible from the toolbar popup or a right-click menu.

**Primary Language** [REQUIRED]
English

## Graphics & Assets

| Asset | Dimensions | Status | Filename |
|-------|-----------|--------|----------|
| Store Icon [REQUIRED] | 128×128 PNG | ✅ Ready | icons/icon128.png |
| Screenshot 1 [REQUIRED] | 1280×800 or 640×400 | ⬜ Not created | |
| Screenshot 2 [RECOMMENDED] | 1280×800 or 640×400 | ⬜ Not created | |
| Small Promo Tile [RECOMMENDED] | 440×280 | ⬜ Not created | |

### Screenshot Notes
- Screenshot 1: popup open on the Length tab mid-conversion (e.g. "72 cm = 28.3465 in") — shows the core bidirectional feature.
- Screenshot 2 (optional): Phonetic tab with a code like "FB4XO8" spelled out, or the right-click "Convert" context menu open over selected text — shows the two features a single screenshot of the popup alone wouldn't convey.

## Permissions Justification

| Permission | Type | Justification |
|------------|------|----------------|
| `contextMenus` | permissions | Adds a "Convert" option to the right-click menu when the user has text selected, so they can jump directly to a conversion without first opening the toolbar popup. |
| `storage` | permissions | Uses `chrome.storage.session` only — an in-memory, non-persistent store. When the user picks a conversion from the right-click menu, the selected text and target unit are held here just long enough to hand off to the popup, then cleared immediately. Never written to disk, never synced, cleared when the browser closes. |

No `host_permissions` are requested — the extension makes no network requests and does not need access to page content beyond the text Chrome already passes via the context menu's `selectionText`.

## Privacy & Data Use

### Data Collection

**Does the extension collect user data?** No

The extension collects, stores, and transmits no personal data of any kind. All state (unit selections, the phonetic input field, the brief context-menu handoff) lives only in the browser's local, in-memory session storage and is never sent anywhere — the extension makes zero network requests.

### Data Use Certification
- [x] Data is NOT sold to third parties
- [x] Data is NOT used for purposes unrelated to the extension's core functionality
- [x] Data is NOT used for creditworthiness or lending purposes

## Privacy Policy

**Privacy Policy URL** [REQUIRED]
https://claude.ai/artifact/VXz916qEBxLcTF6prTkDdW

⚠️ This artifact is currently **private**. Before submitting, open the link and use its Share menu to set it to "Anyone with the link can view" — the review team and users must be able to open it.

## Distribution

**Visibility**: Public
**Regions**: All regions

## Developer Info

**Publisher Name** [REQUIRED]
CuriousQuasar

**Contact Email** [REQUIRED]
TODO — fill in during submission (not stored in this repo)

**Support URL / Email** [RECOMMENDED]
TODO — e.g. a GitHub Issues link, once the repo has a public remote

**Homepage URL** [RECOMMENDED]
TODO — optional, e.g. a GitHub repo link

## Version History

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| 1.2.0 | 2026-10-20 | Updated manifest description to mention Speed and Phonetic tabs (previously stale); switched icons to a two-arrow design in royal purple; added Speed category and Phonetic (NATO alphabet) tab; added right-click context-menu quick-convert. | Draft |

## Review Notes

### Known Issues / Limitations
- If `chrome.action.openPopup()` fails (pre-Chrome 127, or no active window), the context-menu click silently falls back to "apply on next manual popup open" with no toast/notification to the user. Low risk, but worth knowing if a reviewer or user reports the right-click menu "doing nothing" on an old Chrome version.
- The context menu assumes a default "from" unit per category (e.g. cm for Length, kg for Weight) since Chrome doesn't tell the extension what unit the selected text is actually in. Users may need to adjust the "from" unit after the popup opens.

### Rejection History
None yet — first submission pending.
