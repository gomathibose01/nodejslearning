# 🌐 Student Management System (Independent Web API)

A standalone, production-grade **Web API backend** application built using **Node.js (ESM)** and **Express.js**. This application features an isolated **SQLite** database data tier, automated initialization utilities, and optimized **Lazy-Loaded** resource lifecycle handling [💡].

---

## 📂 Project Architecture

```text
basics/student-web/
├── bin/
│   └── manage-db.js       # 🛠️ Script: Standalone database seeder & initializer
├── data/
│   └── school.db          # 📁 Isolated SQLite Database File (auto-generated)
├── src/
│   ├── config/
│   │   └── database.js    # 🔌 Lazy-loaded SQLite Connector (Named Export)
│   ├── controllers/
│   │   └── studentController.js # 🧠 Data Core Worker (Handles queries & JSON streams)
│   └── routes/
│       └── studentRoutes.js # 🗺️ Endpoint Dispatcher Router (Maps URLs to logic)
└── package.json           # 📋 Project manifest with custom automation shortcuts
```

---

## ⚙️ The Data Request Lifecycle Flow

When an external client, script, or browser requests student records, data cycles through this strict backend pipeline [💡]:

```text
 [ External Client / Script ] ───( Hit: GET http://localhost:3000/api/students )───► [ src/app.js ]
                                                                                         │ (Matches Prefix Namespace)
                                                                                         ▼
                                                                                [ src/routes/studentRoutes.js ]
                                                                                         │ (Maps Web Method & Endpoints)
                                                                                         ▼
                                                                              [ src/controllers/studentController.js ]
                                                                                         │ 💥 connectDb()
                                                                                         ▼
 [ External Client / Script ] ◄───( Streams Raw JSON Data Payload )──────────── [ SQLite File: data/school.db ]
```

---

## 📝 Component Responsibilities

### 1. `src/app.js` (The Gateway Daemon)
The long-running background process thread that sets up the system environment configurations, boots the port binding, and mounts global middleware stack filters (like `express.json()` input parsers) [💡].

### 2. `src/routes/studentRoutes.js` (The Traffic Router)
The infrastructure dispatcher layer [💡]. It intercepts incoming HTTP actions (like `GET` or `POST`), evaluates whether the target path matches the endpoint rules, and shifts the workload safely down to the controller layer [💡].

### 3. `src/controllers/studentController.js` (The Processing Workers)
Houses the business logic rules and controls resource connection life cycles [💡]. 
*   **The Workflow:** It runs the lazy loading database call (`connectDb()`), fires off fast asynchronous actions to read or write file data on the disk, and instantly executes `db.close()` as soon as the transaction finishes to protect server memory [💡]. It then packages records into standard **JSON text format** and streams them back to the client [💡].

### 4. `src/config/database.js` (The Connection Layer)
Exports a **Named Function Wrapper** (`connectDb`) instead of a raw data instance [💡]. This enforces **Lazy Evaluation**—the system stays completely asleep during boot time, only drawing system resources the exact millisecond a worker controller requests a database file stream handle [💡].

---

## 🚀 Step-by-Step Onboarding Setup Instructions

Have your freshers open their local terminal shells and execute these four commands sequentially [💡]:

### 1. Step Into the Target Partition Folder
```bash
cd ~/nodejslearning/basics/student-web
```

### 2. Provision Your Local Kitchen Pantry (Run Once)
Download and install all localized system dependencies listed in your configuration manifest cleanly without using root-level privileges:
```bash
npm install
```

### 3. Construct and Seed the Isolated Database File
Carve out your standalone SQLite table columns and automatically inject your unique web dataset (**Charlie Brown & Diana Prince**):
```bash
npm run db-init
```

### 4. Boot Up the Infinite Process Server Loop
Launch your server process to start listening for active network traffic [💡]:
```bash
npm start
```

### 5. Inspect Your Live Data Streams
Open your web browser or run an API client test command targeting your namespace endpoint:
👉 **`http://localhost:5000/api/students`**

---

## 🛡️ Workspace Maintenance Rules
*   **Never type `sudo npm install`.** Root-level file system execution locks down directory configuration file permissions, causing project runtime crashes [💡].
*   **Always exclude binary databases and modules.** The root repository file contains global wildcard parameters (`**/node_modules/` and `**/data/*.db`) to ensure your commits remain lightweight and perfectly portable across different operating system environments [💡].
