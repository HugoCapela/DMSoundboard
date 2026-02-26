# 🎲 DM Soundboard

A dynamic web-based soundboard designed for tabletop RPG sessions.

This project allows Dungeon Masters to organize and trigger ambience, cinematic music, combat tracks, and sound effects directly from the browser.

All sounds, categories, and metadata are generated automatically from the file system.

# ✨ Features
- 🎵 Dynamic category generation from folder structure
- 📂 Automatic `sounds.json` generation via Python script
- ⚡ Special behavior for SFX category
- 🔊 Independent volume controls
- 📱 Responsive layout (mobile, tablet, desktop)
- 🎨 CSS design tokens and scalable spacing system
- 🧱 Clean, scalable project structure

# 🏗 Architecture (Current State)

The project currently consists of:
- **HTML** – Base structure
- **CSS** – Token-based styling system
- **JavaScript** – Dynamic UI generation + audio logic
- **sounds.json** – Sound configuration data

The application:
- Loads sound data asynchronously
- Generates UI dynamically
- Manages audio state internally

Future refactors and upgrades will separate logic into modules (UI, audio engine, utilities, data layer).

# 🎨 Styling System

The project uses:
- CSS custom properties (design tokens)
- 8px-based spacing scale
- Responsive typography
- Mobile-first layout
- Media queries for tablet and desktop scaling

# 📂 Project Structure
```
/
├── sounds/
│   ├── ambience/
│   ├── cinematic/
│   ├── combat/
│   └── sfx/
├── generate_sounds.py
├── index.html
├── script.js
├── sounds.json
├── styles.css
```

# 🎵 Sounds Directory

All audio files are stored inside the `sounds/` directory.

Each subfolder represents a category in the soundboard UI.

Example:
```
sounds/
├── ambience/
├── cinematic/
├── combat/
└── sfx/
```

Every folder inside `sounds/` becomes a category tab automatically after regenerating `sounds.json`.

If you add:
```
sounds/
└── horror/
```
A new Horror category will appear in the UI.

# 📝 sounds.json Generation

The `generate_sounds.py` script:
- Scans the sounds/ directory
- Detects all category folders
- Parses filenames into metadata
- Accepts `.mp3`, `.wav` and `.flac` file extensions
- Generates a fresh `sounds.json`

To regenerate:
``` python
python generate_sounds.py
```

You must rerun the script whenever:
- You add new sound files
- You remove files
- You rename files
- You add or remove folders

# 🏷 Sound File Naming Convention
Metadata is derived directly from the filename.

## Structural Rule
The filename must contain at least one separator:  `space-hyphen-space` => ` - `

- The first segment → **artist**
- The second segment → **song name**
- If a third segment exists → **source**
- Everything after the third separator is ignored
- The script does not **validate text** content, only separator count

# Accepted Formats
## Artist + Song
```
Artist - Song Name.mp3
```
Parsed as:
- Artist → `Artist`
- Song → `Song Name`
- Source → `""` (empty)

## Artist + Song + Source
```
Artist - Song Name - Source.mp3
```
Parsed as:
- Artist → `Artist`
- Song → `Song Name`
- Source → `Source`

## Multiple Separators
```
Artist - Song Name - Source - Extra Info.mp3
```
Parsed as:
- Artist → `Artist`
- Song → `Song Name`
- Source → `Source`
- `Extra info` is ignored

## Important Notes

- Separator must be exactly `space-hyphen-space` => ` - `
- Filenames without at least one separator will not parse correctly
- The script does not validate:
  - Text
  - Formatting quality
  - Spelling

It only splits based on separator count.

# 📂 Dynamic Category System

The UI categories are generated dynamically from the folder structure.

Each folder inside `sounds/` becomes:
- A category tab
- A group of buttons
- A collection in `sounds.json`

This makes the system fully scalable without manual configuration.

# ⚡ SFX Category Behavior

If a folder named `sfx/` exists:
- That category receives special playback behavior
- SFX sounds are treated as one-shot effects
- They trigger a short visual flash animation
- They do not behave like other categories tracks

SFX is intended for:
- Weapon sounds
- Spells sounds
- Doors, traps sounds
- Creatures sounds
- Etc

## If No `sfx/` Folder Exists
- No special behavior is applied
- All categories behave the same
- The soundboard adapts automatically

# 🚀 Getting Started

1. Clone the repository
``` bash
git clone https://github.com/HugoCapela/DMSoundboard.git
cd dm-soundboard
```

2. Add sound files inside `sounds/<category>/`
3. Follow the naming convention
4. Run:
``` python
python generate_sounds.py
```

5. Run locally

You can open `index.html` directly, but using a local server, like **VS Code Live Server**, is recommended.

# 🛠 Technologies Used

- JavaScript (ES6+)
- CSS Variables (Design Tokens)
- CSS Grid & Flexbox
- HTML5 Audio API

No frameworks. No dependencies.

# 🎯 Purpose

This project was built to:
- Provide fast, in-session sound control for tabletop RPGs
- Explore design system principles
- Practice scalable CSS architecture
- Implement structured audio state management

# 📌 Future Improvements
This project is functional and stable, but several improvements are planned to make it more flexible, dynamic, and robust.

- Refactor JavaScript into ES modules
- Fully dynamic category behavior (remove hardcoded interruption logic from JavaScript)
- Enhance `generate-sounds.py` (text validation and validation warnings, for example)
- Persistance (save volume levels)
- Light/Dark themes
- Unit testing
