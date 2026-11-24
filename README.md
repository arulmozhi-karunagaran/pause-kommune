# The Pause Kommune — website

Open `index.html` in any browser. No install needed.

## Folder
- `index.html`: the page
- `styles.css`: ready-built styles (Tailwind)
- `app.js`: events, talks, gallery list, animations
- `images/`: all photos used on the site
- `source/`: Tailwind source, only needed if you change classes in the HTML

## Put it online (free)
Drag this whole folder onto https://app.netlify.com/drop, or upload it to GitHub Pages or Vercel.

## Editing
- Text for events and talks: edit the lists at the top of `app.js`.
- If you add new Tailwind classes, rebuild the CSS from this folder:
  `npx tailwindcss@3.4.17 -c source/tailwind.config.js -i source/input.css -o styles.css --minify`
