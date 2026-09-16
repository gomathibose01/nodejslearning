create-volumes/
├── package.json
├── index.js                  # CLI Gateway Router (Commander definitions only)
└── src/
    ├── client.js             # Low-level Network Layer (Reusable Async SSH Executor)
    ├── services.js           # Mainframe Business Logic (orchestrates runner + parsers)
    ├── parsers.js            # Pure text-to-JSON parsing algorithms
    └── __tests__/

