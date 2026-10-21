# Unit Converter

A Chrome extension for quick, bidirectional unit conversions — plus a NATO phonetic alphabet speller — accessible from the toolbar popup or a right-click menu.

## Features

- **Bidirectional conversion** across five categories: Length, Weight, Temperature, Volume, and Speed. Type a value into either field and the other updates instantly; swap the two units with one click.
- **Phonetic alphabet speller**: type or paste up to 32 characters and see each one spelled out using the standard NATO phonetic alphabet (Alpha, Bravo, Charlie...) — handy for reading codes or passwords aloud over the phone.
- **Right-click "Convert" menu**: select any text on a page, right-click, and jump straight to a pre-filled conversion or phonetic spelling without opening the popup first.
- Works entirely offline. No network requests, no analytics, no data collection of any kind — see [privacy-policy.html](privacy-policy.html).

## Installing (unpacked, for development)

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode** (top-right toggle).
3. Click **Load unpacked** and select this repository's folder.

## Project structure

| File | Purpose |
|---|---|
| `manifest.json` | Extension manifest (Manifest V3) |
| `popup.html` / `popup.css` / `popup.js` | The toolbar popup UI and conversion logic |
| `background.js` | Service worker — builds the right-click context menu and hands selected text off to the popup |
| `icons/` | Extension icons (16/48/128px), SVG sources and generated PNGs |
| `privacy-policy.html` | Published privacy policy (required for Chrome Web Store listing) |
| `CHROMEWEBSTORE.md` | Chrome Web Store submission tracker — listing copy, permissions justifications, privacy disclosure, version history |

## License

MIT — see [LICENSE](LICENSE).

## Support

If you find this useful, you're welcome to support ongoing development:

☕ **[Buy me a coffee](https://buymeacoffee.com/mandyscott)**

Entirely optional — the extension is free and always will be.
