# 🏫 Student Management System (Pure CLI)

A high-performance, modular **Command Line Interface (CLI)** application built using **Node.js (ESM)** and **SQLite**. This system runs completely inside the terminal, utilizing native Linux input/output streams and lazy-loaded database connections.

## 📂 Project Architecture

```text
student-management-app/
├── data/
│   └── school.db             # 📁 The SQLite database file (auto-generated)
├── src/
│   └── config/
│       └── database.js       # 🔌 Database connection configuration (ESM wrapper)
├── cli/
│   ├── manage-db.js          # 🛠️ Script 1: Database schema initialization & data seeding
│   └── manage-students.js    # 🏫 Script 2: Main interactive terminal application loop
└── package.json              # 📋 Project manifest and script execution shortcuts
```

***

## 📝 Detailed File Summaries

### 1. `package.json`
The project core configuration manifest. It specifies modern ECMAScript Module rules (`"type": "module"`) and contains no web server overhead (Express has been completely removed). It registers your automated terminal shortcuts:

*   **`npm run db-init`**: Launches the setup script to construct the environment matrix.
*   **`npm run cli-manage`**: Boots up the live, interactive administrative dashboard.

### 2. `src/config/database.js`
The database lifeline wrapper. 
*   **How it works:** When imported, it runs top-level calculations to compute the absolute path of the SQLite destination file using modern ESM workarounds (`fileURLToPath`). 
*   **Behavior:** It initializes a single `sqlite3` instance. If `school.db` is missing from the `data/` folder, it automatically constructs it on the disk out of thin air.

### 3. `cli/manage-db.js`
The setup automation script. It behaves like a surgical strike: it launches, executes structural queries line-by-line using `db.serialize()`, and immediately terminates.
*   **Security:** Uses compiled statements (`db.prepare()`) and positional placeholders (`?`) to shield the database against malicious SQL injection strings.
*   **Logic:** Builds the `students` table and safely populates initial test rows using `INSERT OR IGNORE` parameters to prevent duplicate row errors if executed multiple times.

### 4. `cli/manage-students.js`
The central administrative portal application loop.
*   **System Streams:** Binds onto the standard operating system communication channels (**`process.stdin`** for keyboard inputs and **`process.stdout`** for terminal displays) using the core Node.js `readline` utility.
*   **Optimization:** Utilizes a **Lazy Loading Function Pattern**. It holds database connections dormant on import, only establishing an active wire to the file system the exact millisecond an administrator requests a data modification.
*   **Formatting:** Leverages the native `console.table()` utility to parse raw data arrays and automatically paint a beautifully formatted matrix grid directly onto the shell screen.

***

## 🚀 Execution Instructions

### 1. Initial Setup
Install the lightweight, single runtime database driver cleanly without using root-level privileges:
```bash
npm install
```

### 2. Initialize Database & Seed Records
Construct the relational data schema columns and generate your dummy data elements instantly:
```bash
npm run db-init
```

### 3. Run the Interactive Dashboard
Launch the terminal UI application loop:
```bash
npm run cli-manage
```
