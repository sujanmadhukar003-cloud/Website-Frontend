# 📚 NotesVault - Student Dashboard Web Application

**NotesVault** is a modern, responsive, student dashboard application designed for college database management systems. Built with **React**, **Tailwind CSS**, and **Lucide Icons**, it provides students with seamless access to semesters, subjects, notes, practice questions, and study resources.

---

## ✨ Key Design Features & Color Scheme

- **Pure White Main Canvas (`#FFFFFF`)**: Clean, minimalist white background across all main containers and panels.
- **Two-Color System**:
  - **Primary Brand Color (Teal / Emerald - `#0D9488` / `#0F766E`)**: Used for primary action buttons, active navigation indicators, progress meters, and key highlights.
  - **Neutral Structural Color (Dark Slate / Charcoal - `#0F172A` / `#334155`)**: Used for typography, subtle card borders (`#E2E8F0`), and secondary controls.
- **Centered Header Search Bar**: Perfectly centered search input in top header bar with quick `Ctrl + K` Command Palette keyboard shortcut.
- **Dynamic Views**:
  - **Dashboard**: Personal greetings for Sujan (Student), Continue Learning banner (Binary Search 82%), Semesters grid, Recently Opened items, Practice Questions, Today's Plan checklist with SVG circular gauge, Announcements, and Resources.
  - **Semesters**: Full 6-semester breakdown with key subjects and topic counts.
  - **Subjects**: Semester 1–6 subject cards with direct links to Notes and Question Banks.
  - **Practice**: Topic-wise, Subject-wise, and PYQ sets with difficulty badges (*Easy*, *Medium*, *Hard*).
  - **Resources**: Filterable document list (*Notes*, *Question Banks*, *Lab Manuals*, *PYQ*, *Syllabus*) with file sizes and download actions.
  - **Announcements**: VTU examination schedules and workshop notices.
  - **Feedback & Settings**: User feedback form and profile settings.

---

## 📁 Structured Directory Organization

```
notesvault/
├── index.html              # Root HTML entry point for Vite React app
├── react-app.html          # Standalone browser-runnable React file (Direct double-click view)
├── package.json            # Node project configuration & dependencies
├── vite.config.js          # Vite server configuration (Port 3000)
├── tailwind.config.js      # Tailwind CSS custom theme & color palette
├── postcss.config.js       # PostCSS plugins configuration
├── server.js               # Node.js ES Module static server script
├── styles.css              # Custom CSS variables & scrollbar styling
├── app.js                  # Standalone JavaScript application logic
├── README.md               # Complete documentation & localhost guide
└── src/                    # React Source Code Directory
    ├── main.jsx            # React DOM entry point
    ├── App.jsx             # Main React application component & state router
    ├── index.css           # Tailwind base styles & global CSS imports
    └── components/         # Modular React Components
        ├── Header.jsx        # Top navigation header with centered search bar
        ├── Sidebar.jsx       # Left navigation menu (Dashboard, Semesters, Subjects, etc.)
        ├── SearchModal.jsx   # Ctrl + K Command Palette search modal
        └── Toast.jsx         # Popup notification toast component
```

---

## 🚀 How to Run on Localhost

You can run **NotesVault** on your local machine using any of the three methods below:

### Method 1: Using Vite Dev Server (Recommended)

1. Open your terminal in the `notesvault` folder:
   ```bash
   cd "d:\college date base management system\notesvault"
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:3000/
   ```

---

### Method 2: Using the Included Node.js Server

1. Run the static server script directly:
   ```bash
   node server.js
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000/
   ```

---

### Method 3: Direct Browser File (No Node/NPM required)

Double-click either of the HTML files directly in your file explorer:
- [`react-app.html`](file:///d:/college%20date%20base%20management%20system/notesvault/react-app.html) (Full Standalone React Application)
- [`index.html`](file:///d:/college%20date%20base%20management%20system/notesvault/index.html)

---

## ⌨️ Useful Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + K` / `Cmd + K` | Open/Close Global Command Search Palette |
| `ESC` | Close Search Modal Palette |

---

## 🛠️ Built With

- **React 18** - UI Component Architecture
- **Tailwind CSS** - Utility-first CSS styling
- **Lucide Icons** - Clean vector icons
- **Vite** - Lightning-fast frontend build tool
