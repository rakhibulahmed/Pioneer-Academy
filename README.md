# Pioneer Academy, Sonapur — Website

A fully responsive, animated school website built with plain HTML, CSS and JavaScript (no frameworks, no build step).

## How to use
1. Unzip this folder.
2. Double-click `index.html` to open it in any browser — or upload the whole folder to any web host (GitHub Pages, Netlify, cPanel, etc.).
3. That's it. No installation needed.

## Folder structure
```
pioneer-academy/
├── index.html      → page structure & content
├── style.css       → design system, colours, fonts, animations
├── script.js       → teacher/staff data, filters, modal, scroll effects
├── assets/         → logo, principal & vice-principal photos, gallery photos
└── README.md       → this file
```

## Editing content

**Teachers & staff:** open `script.js` and edit the `TEACHERS` and `STAFF` arrays near the top. Each teacher needs: `name`, `subject`, `cat` (category key used for filtering), `qual` (qualification), and `bio` (shown when a card is clicked). Photos are not required — each teacher gets an automatic colour avatar with their initials. To use a real photo instead, add an `img` field and update the card template in `script.js`.

**Principal / Vice-Principal:** edit the text directly inside `index.html` inside the `<section class="leadership">` block. Their photos live in `assets/principal.jpg` and `assets/vice-principal.jpg` — replace those files (keep the same filenames) to update the photos.

**School photos:** replace the files in `assets/gallery-1.jpg` through `gallery-5.jpg` with your own — same filenames, any aspect ratio works since they're cropped automatically.

**Colours & fonts:** all colours and fonts are defined as CSS variables at the top of `style.css` under `:root`. Change a value there and it updates everywhere.

**Developer / contact socials:** in `index.html`, search for `dev-socials` near the bottom and update the `href` links to Rakhibul Ahmed's real social profiles and email.

**Map:** in `index.html`, search for `contact-map` and replace the address in the embedded Google Maps link if the school address changes.

## Notes
- Teacher and staff photos are placeholder colour-initial avatars since no individual staff photographs were provided — swap in real photos any time using the note above.
- Fonts (Fraunces, Work Sans, Space Mono) load from Google Fonts; the site falls back to system fonts automatically if there's no internet connection.
- Built by Rakhibul Ahmed.
