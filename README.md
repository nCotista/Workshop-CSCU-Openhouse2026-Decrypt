# 💣 Operation: BLACKOUT — CSCU Open House 2026

> *"You have 20 minutes. Decrypt the ciphers. Defuse the bomb. Save the world."*

An interactive, real-time **cryptography escape room** workshop built for the **Computer Science, Chulalongkorn University (CSCU) Open House 2026**. Teams compete to decrypt secret messages across 3 levels, then race to defuse a bomb before the countdown reaches zero.

---

## 🎮 How It Works

```
[ Team Registration ]
        ↓
[ Level 1 — Decrypt the Cipher ]
        ↓
[ Level 2 — Harder Cipher ]
        ↓
[ Level 3 — Final Cipher ]
        ↓
[ ⚠️ DEFUSE THE BOMB — Enter PIN ]
        ↓
[ 🏆 MISSION COMPLETE — Ranked on Leaderboard ]
```

1. **Register** — Each team enters their agent name to begin the mission
2. **Decrypt** — Solve 3 progressively harder cipher challenges. Hints are available if stuck
3. **Defuse** — After all levels are cleared, enter the correct 4-digit PIN to defuse the bomb
4. **Race** — A live 20-minute countdown runs on the **Monitor Screen**. The first team to defuse wins 🥇

---

## ✨ Features

- 🔐 Multi-level cipher challenge with hint system
- ⏱️ Live 20-minute bomb countdown on a dedicated monitor screen
- 🏆 Real-time leaderboard showing Top 3 teams (🥇🥈🥉)
- 💾 Firebase Realtime Database — synced across all devices instantly
- 🖥️ Separate monitor screen (`mornitor.html`) for the game host/presenter
- 🎨 Hacker-themed UI with green-on-black terminal aesthetic

---

## 📁 File Structure

```
Workshop-CSCU-Openhouse2026-Decrypt/
├── index.html       # Player screen — game UI & cipher challenges
├── mornitor.html    # Host/presenter screen — countdown timer & leaderboard
├── script.js        # Game logic — level progression, cipher validation, Firebase sync
├── style.css        # Hacker terminal styling
└── env.js           # Firebase config (environment variables — not committed)
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML / CSS / JavaScript | Frontend (no framework) |
| Firebase Realtime Database | Live sync between players and monitor |
| Firebase JS SDK v8 | Database connection |

---

## 🚀 Setup & Running

### 1. Clone the repository

```bash
git clone https://github.com/nCotista/Workshop-CSCU-Openhouse2026-Decrypt.git
cd Workshop-CSCU-Openhouse2026-Decrypt
```

### 2. Configure Firebase

Create an `env.js` file in the root directory with your Firebase project credentials:

```javascript
window.ENV = {
  API_KEY: "your-api-key",
  AUTH_DOMAIN: "your-project.firebaseapp.com",
  DB_URL: "https://your-project-default-rtdb.firebaseio.com"
};
```

> ⚠️ Never commit `env.js` to version control. It is already listed in `.gitattributes`.

### 3. Run the game

Since this is a plain HTML project, simply open the files in a browser or serve locally:

```bash
# Using Python
python3 -m http.server 8000

# Or using Node.js (npx)
npx serve .
```

Then open:
- **Player screen:** `http://localhost:8000/index.html`
- **Monitor screen:** `http://localhost:8000/mornitor.html`

---

## 🖥️ Running the Workshop

| Screen | Who uses it | URL |
|---|---|---|
| `index.html` | Players / Teams | Open on each team's device |
| `mornitor.html` | Game Host / Projector | Open **first** — resets the leaderboard on load |

> ⚠️ Open `mornitor.html` **before** players start. Loading it resets the `winners_list` in Firebase and starts the countdown fresh.

---

## 🔧 Customization

- **Timer duration** — Change `let timeLeft = 20 * 60;` in `mornitor.html` (in seconds)
- **Cipher content & answers** — Edit the level data in `script.js`
- **Number of levels** — The game currently has 3 levels; adjust in `script.js`
- **Defuse PIN** — Set the correct PIN in `script.js`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ for <strong>CSCU Open House 2026</strong><br>
  Good luck, Agent. The clock is ticking. 💣
</div>
