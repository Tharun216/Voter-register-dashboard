# Voter Register Dashboard — Offline GitHub Edition

A static, offline-first voter/family **record management demo**. Includes Add Voter, Add Family, add to existing family, head-of-family grouping, member counts by gender, optional ages, Category 1–3, dashboard analytics, search/filters, customization, CSV import/export, JSON backup/restore, local change history and light/dark mode.

## Quick start

1. Download the ZIP and extract it, or clone the repository.
2. Open `index.html` in a modern browser. For more consistent browser storage, serve locally via `python3 -m http.server 8080` and open `http://localhost:8080`.
3. Use **Data Tools → Backup** to export a JSON backup regularly.

## Upload to GitHub

1. Create a **private** repository on GitHub (recommended while developing).
2. Upload all the files in this folder (keep the `assets/` folders).
3. Commit changes; use GitHub Issues for feature requests and version tags for releases.
4. Optionally deploy the **code only** via GitHub Pages (Settings → Pages → Deploy from branch → main / root). GitHub Pages is public and uses HTTPS. **Do not commit voter data, CSV exports or backups.**

## Development

- `index.html` — page structure
- `assets/css/styles.css` — styles and themes
- `assets/js/app.js` — local data and interactions
- `tests/smoke.cjs` — static checks
- `npm run check` — syntax and static smoke checks (Node.js required)

No runtime third-party JavaScript libraries are required. The app stores records in browser `localStorage`, not GitHub. It is **not** a cloud database, secure multi-user service, or encrypted vault. Different browser origins and devices do not automatically share data. GitHub Pages hosts code but does not store your records.

## Data safety and upgrades

- Before upgrading, **export a JSON backup from the old version**. Keep it somewhere private and secure.
- Import that backup using the restore tool if the new version uses a different browser origin.
- Never delete the old browser storage before checking the new version.
- Keep the same origin and storage keys for in-place updates; this edition retains `voter-register-demo-v1` and `voter-register-history-v1`.
- Use dummy records for testing. Do not publish real personal information to GitHub.
- The current UI has not passed comprehensive browser/device or security testing. Test all flows before real-world use.
- If deploying publicly, implement access control, consent and appropriate privacy/security protections before storing personal data.

## Known limitations

- Static smoke tests do not prove runtime functionality.
- Browser local storage can be cleared, limited or blocked.
- XLSX import may need a local library; CSV works without one.
- A family head is displayed first in family grouping; family management remains basic.
