# Javis - Master Task List

> Quick-reference checklist for all tasks. Track progress here.
> **[G]** = Gemini CLI | **[C]** = Claude Code

---

## Phase 1 — Project Setup & Desktop Shell

### Setup
- [x] [G] Init pnpm monorepo
- [x] [G] Create Tauri + React + TS app (`apps/desktop-ui/`)
- [x] [G] Create Node.js + TS backend (`apps/orchestrator-api/`)
- [x] [G] Create shared-types package (`packages/shared-types/`)
- [x] [G] Configure linting, formatting, tsconfig
- [x] [G] Set up .gitignore, README, base configs
- [x] [G] Create full folder structure

### Desktop UI Shell
- [x] [G] Main app layout (sidebar + main panel)
- [x] [x] [G] Floating assistant orb component
- [x] [G] Message/transcript panel
- [x] [G] Activity/task log panel
- [x] [G] Text input bar + send button
- [x] [G] Mic button (UI only)
- [x] [G] Settings drawer skeleton
- [x] [G] Dark theme + Tailwind CSS setup
- [ ] [C] **REVIEW**: UI architecture and components

### Backend Foundation
- [x] [G] Express/Fastify server setup
- [x] [G] WebSocket server for real-time comms
- [x] [G] SQLite + ORM setup
- [x] [G] Initial DB schema (users, conversations, messages, tasks)
- [x] [G] REST API endpoints skeleton
- [ ] [G] Connect frontend ↔ backend (WS + HTTP)

### Phase 1 Validation
- [ ] [G] Test Tauri build on macOS
- [ ] [G] Verify WebSocket connection
- [ ] [G] Test DB CRUD
- [ ] [C] **REVIEW**: Phase 1 code quality

---

## Phase 2 — Event System & Orchestrator Core

### Event Bus
- [ ] [G] Create `packages/event-bus/`
- [ ] [G] Typed event emitter implementation
- [ ] [G] Define core event catalog
- [ ] [G] Event logging middleware
- [ ] [G] Connect events → WebSocket → UI

### Intent Router
- [ ] [C] **DESIGN**: Intent classification architecture
- [ ] [G] Intent router module
- [ ] [G] Define intent categories
- [ ] [G] Keyword + pattern-based classifier (V1)
- [ ] [G] Entity extraction (apps, URLs, paths, queries)
- [ ] [G] Unit tests for intent classification

### Planner / Orchestrator
- [ ] [C] **DESIGN**: Planner decision tree + execution flow
- [ ] [G] Planner module implementation
- [ ] [G] Task creation & tracking system
- [ ] [G] Tool selection logic
- [ ] [G] Multi-step task chaining
- [ ] [G] Task status tracking (pending/running/completed/failed/cancelled)
- [ ] [G] Timeout & cancellation support

### Tool Registry
- [ ] [G] Create `packages/tool-registry/`
- [ ] [G] Define Tool interface
- [ ] [G] Tool registration & lookup system
- [ ] [G] Tool execution wrapper + error handling
- [ ] [G] Tool execution logging to DB

### Phase 2 Validation
- [ ] [G] Test intent routing
- [ ] [G] Test planner task flow
- [ ] [G] Test event bus
- [ ] [C] **REVIEW**: Orchestrator edge cases

---

## Phase 3 — Desktop Tools

### Desktop Agent
- [ ] [G] Create `packages/desktop-agent/`
- [ ] [G] `open_application` tool
- [ ] [G] `close_application` tool
- [ ] [G] `open_folder` tool
- [ ] [G] `open_file` tool
- [ ] [G] `open_url` tool
- [ ] [G] `run_terminal_command` tool
- [ ] [G] `get_running_apps` tool
- [ ] [G] `switch_application` tool
- [ ] [G] `system_info` tool

### Command Safety
- [ ] [C] **DESIGN**: Safety validation rules
- [ ] [G] Command risk scoring
- [ ] [G] Allowlist/blocklist for commands
- [ ] [G] Path restriction checks
- [ ] [G] Destructive command detection

### Integration
- [ ] [G] Register desktop tools in registry
- [ ] [G] Wire planner → desktop tools
- [ ] [G] Show tool execution in UI
- [ ] [G] Show results in conversation

### Phase 3 Validation
- [ ] [G] Test opening apps (Chrome, VS Code, Finder)
- [ ] [G] Test safe shell commands
- [ ] [G] Test dangerous command blocking
- [ ] [G] E2E: "open Chrome" → Chrome opens
- [ ] [C] **REVIEW**: Safety layer completeness

---

## Phase 4 — Permission System

### Permission Engine
- [ ] [G] Create `packages/permissions-engine/`
- [ ] [G] Define 3 tiers (auto_allow, ask_once, always_confirm)
- [ ] [G] Default permission mappings
- [ ] [G] Permission check middleware
- [ ] [G] Session-based approval caching
- [ ] [G] Permission overrides in DB

### Approval UI
- [ ] [G] Approval popup component
- [ ] [G] Show tool name, risk, details
- [ ] [G] Allow/Deny/Always Allow buttons
- [ ] [G] Wire approval through WebSocket
- [ ] [G] Permissions management screen

### Phase 4 Validation
- [ ] [G] Test auto-allow (no popup)
- [ ] [G] Test ask-once (popup first time)
- [ ] [G] Test always-confirm (popup every time)
- [ ] [G] Test deny stops execution

---

## Phase 5 — Browser Tools

### Browser Agent
- [ ] [G] Create `packages/browser-agent/`
- [ ] [G] Playwright integration setup
- [ ] [G] `search_web` tool
- [ ] [G] `open_url_in_browser` tool
- [ ] [G] `extract_page_text` tool
- [ ] [G] `summarize_webpage` tool
- [ ] [G] `take_screenshot` tool

### Advanced Browser
- [ ] [G] Tab management (list, switch, close)
- [ ] [G] `click_element` tool
- [ ] [G] `fill_form` tool
- [ ] [G] `scroll_page` tool
- [ ] [G] Browser session manager

### Integration
- [ ] [G] Register browser tools
- [ ] [G] Wire planner → browser tools
- [ ] [G] Show search results in UI
- [ ] [G] Show page summaries in UI

### Phase 5 Validation
- [ ] [G] Test web search
- [ ] [G] Test opening URLs
- [ ] [G] Test page extraction
- [ ] [G] E2E: "search latest AI news" → results shown
- [ ] [C] **REVIEW**: Error handling

---

## Phase 6 — Gemini CLI Brain Integration

### Brain Adapter Layer
- [ ] [C] **DESIGN**: Brain adapter interface & protocol
- [ ] [G] Create `packages/brain-adapters/`
- [ ] [G] Define BrainAdapter interface
- [ ] [G] Define BrainTaskRequest/Result types
- [ ] [G] Brain adapter registry

### Gemini CLI Adapter
- [ ] [G] Create `packages/brain-adapters/gemini-cli/`
- [ ] [G] Process spawning for Gemini CLI
- [ ] [G] Output streaming & parsing
- [ ] [G] Task cancellation
- [ ] [G] Health check
- [ ] [G] Error/timeout handling
- [ ] [G] Configuration (model, settings)

### Brain Routing
- [ ] [C] **DESIGN**: Brain selection decision logic
- [ ] [G] Brain router in planner
- [ ] [G] Coding task detection
- [ ] [G] Repo analysis task detection
- [ ] [G] Route complex questions to Gemini
- [ ] [G] Show brain activity in UI

### Phase 6 Validation
- [ ] [G] Test adapter spawn & communication
- [ ] [G] Test task routing
- [ ] [G] Test output streaming
- [ ] [G] Test cancellation
- [ ] [G] E2E: "explain this repo" → Gemini analyzes → result shown

---

## Phase 7 — Memory System

### Memory Engine
- [ ] [G] Create `packages/memory-engine/`
- [ ] [G] memory_items table
- [ ] [G] `store_memory` function
- [ ] [G] `recall_memory` function
- [ ] [G] `search_memory` function
- [ ] [G] `recent_tasks` retrieval

### Memory Types
- [ ] [G] Project folder shortcuts
- [ ] [G] App aliases
- [ ] [G] User preferences
- [ ] [G] Command history
- [ ] [G] Conversation context carry-over

### Memory UI
- [ ] [G] Memory management screen
- [ ] [G] Show shortcuts & preferences
- [ ] [G] Manual add/edit/delete
- [ ] [G] Recent task history

### Integration
- [ ] [G] Planner resolves memory before executing
- [ ] [G] Auto-save frequent commands
- [ ] [G] Auto-save project associations
- [ ] [C] **REVIEW**: Memory retrieval accuracy

### Phase 7 Validation
- [ ] [G] Test store & recall
- [ ] [G] Test shortcut resolution
- [ ] [G] Test persistence across restarts

---

## Phase 8 — Conversation Manager & AI Chat

### Conversation Manager
- [ ] [G] Conversation manager module
- [ ] [G] Session history tracking
- [ ] [G] Context window management
- [ ] [G] Follow-up reference handling
- [ ] [G] DB conversation storage

### Direct AI Chat
- [ ] [G] Integrate Gemini API for quick Q&A
- [ ] [G] Route casual chat to direct AI
- [ ] [G] Stream AI responses to UI
- [ ] [G] Typing indicator

### Response Formatting
- [ ] [G] Markdown response rendering
- [ ] [G] Tool result formatting
- [ ] [G] Action suggestion buttons
- [ ] [G] Distinguish chat vs action reports

### Phase 8 Validation
- [ ] [G] Test multi-turn context
- [ ] [G] Test follow-up references
- [ ] [G] Test AI streaming
- [ ] [C] **REVIEW**: Conversation edge cases

---

## Phase 9 — Voice Pipeline

### Audio Capture
- [ ] [G] Mic access in Tauri
- [ ] [G] Audio capture service (push-to-talk)
- [ ] [G] Silence detection
- [ ] [G] Audio streaming to STT
- [ ] [G] Mic status indicator

### Speech-to-Text
- [ ] [C] **RESEARCH**: Best STT for English + Sinhala
- [ ] [G] Integrate STT API
- [ ] [G] Build STT module (`apps/voice-gateway/`)
- [ ] [G] Streaming partial transcripts
- [ ] [G] Live transcript in UI
- [ ] [G] Send transcript → intent router

### Text-to-Speech
- [ ] [G] Integrate TTS API
- [ ] [G] Build TTS module
- [ ] [G] Audio playback in Tauri
- [ ] [G] Interruptible speech
- [ ] [G] Voice selection in settings

### Voice Flow
- [ ] [G] Wire: mic → STT → intent → action → response → TTS
- [ ] [G] Push-to-talk keyboard shortcut
- [ ] [G] Voice waveform animation on orb
- [ ] [C] **REVIEW**: Voice latency optimization

### Phase 9 Validation
- [ ] [G] Test audio capture
- [ ] [G] Test STT accuracy (English)
- [ ] [G] Test TTS playback
- [ ] [G] E2E: speak "open Chrome" → Chrome opens → voice confirms

---

## Phase 10 — Sinhala + Mixed Language

### Language Detection
- [ ] [C] **DESIGN**: Language detection strategy
- [ ] [G] Language detector module
- [ ] [G] Transliterated Sinhala handling
- [ ] [G] Language mode in conversation context

### Sinhala STT
- [ ] [G] Integrate Sinhala STT
- [ ] [G] Test Sinhala accuracy
- [ ] [G] Test mixed recognition
- [ ] [G] Normalization layer for mixed input

### Sinhala TTS
- [ ] [G] Integrate Sinhala TTS
- [ ] [G] Language-based voice switching
- [ ] [G] Test Sinhala speech quality

### Bilingual Intent
- [ ] [G] Extend intent router for Sinhala
- [ ] [G] Sinhala keyword mappings
- [ ] [G] Code-switching handling
- [ ] [G] Reply language preference

### Phase 10 Validation
- [ ] [G] Test Sinhala-only commands
- [ ] [G] Test mixed commands
- [ ] [G] Test reply language selection
- [ ] [C] **REVIEW**: Bilingual completeness

---

## Phase 11 — Wake Word Engine

### Wake Word
- [ ] [G] Research wake word library
- [ ] [G] Integrate "Jarvis" wake word
- [ ] [G] Background audio monitoring
- [ ] [G] Wake sound effect
- [ ] [G] Transition to active listening
- [ ] [G] False positive handling

### Settings
- [ ] [G] Custom wake word config
- [ ] [G] Sensitivity slider
- [ ] [G] Push-to-talk vs always-on toggle

### Phase 11 Validation
- [ ] [G] Test wake word activation
- [ ] [G] Test false positive rate
- [ ] [G] E2E: "Jarvis, open Chrome" → hands-free

---

## Phase 12 — Claude Code Brain Integration

### Claude Code Adapter
- [ ] [C] **DESIGN**: Claude Code adapter (SDK/CLI wrapping)
- [ ] [G] Create `packages/brain-adapters/claude-code/`
- [ ] [G] Process spawning / SDK integration
- [ ] [G] Output streaming & parsing
- [ ] [G] Auth & API limit handling
- [ ] [G] Health check

### Multi-Brain Routing
- [ ] [C] **DESIGN**: Final brain selection rules
- [ ] [G] Multi-brain router update
- [ ] [G] Route repo-heavy → Claude Code
- [ ] [G] Route general coding → Gemini CLI
- [ ] [G] Active brain indicator in UI
- [ ] [G] Manual brain selection override

### Phase 12 Validation
- [ ] [G] Test Claude Code adapter
- [ ] [G] Test correct brain routing
- [ ] [G] Test mid-session brain switching

---

## Phase 13 — UI Polish & Personality

### Visual Polish
- [ ] [G] Orb animations (idle, listening, thinking, speaking)
- [ ] [G] Smooth state transitions
- [ ] [G] Conversation panel polish
- [ ] [G] Task log polish
- [ ] [G] Notification system

### Personality Engine
- [ ] [G] Jarvis personality system prompt
- [ ] [G] Personality presets
- [ ] [G] Progressive responses
- [ ] [G] Acknowledgment sounds

### Settings & Config
- [ ] [G] Full settings screen
- [ ] [G] Keyboard shortcuts config
- [ ] [G] Startup behavior settings
- [ ] [G] Global hotkey activation

### Phase 13 Validation
- [ ] [G] Test all UI states
- [ ] [G] Test settings persistence
- [ ] [G] Full workflow UAT
- [ ] [C] **REVIEW**: Final code review & optimization

---

## Phase 14 — Advanced Features (V2.0+)

### Advanced Desktop
- [ ] [G] AppleScript integration for deeper app control
- [ ] [G] Clipboard tools
- [ ] [G] Screenshot + screen context
- [ ] [G] Window management

### Workflow Automation
- [ ] [G] Macro recording & replay
- [ ] [G] Proactive suggestions
- [ ] [G] Multi-step templates
- [ ] [G] Scheduled tasks

### Advanced Memory
- [ ] [G] Vector embeddings search
- [ ] [G] Coding session memory
- [ ] [G] Auto-learning from user corrections

### Integrations
- [ ] [G] Calendar integration
- [ ] [G] Telegram/WhatsApp bridge
- [ ] [G] Mobile companion app
- [ ] [G] MCP server support

---

## Progress Tracker

| Phase | Total Tasks | Gemini | Claude | Status |
|-------|------------|--------|--------|--------|
| 1. Setup & Desktop Shell | 27 | 23 | 4 | In Progress |
| 2. Event System & Orchestrator | 23 | 19 | 4 | Not Started |
| 3. Desktop Tools | 20 | 17 | 3 | Not Started |
| 4. Permission System | 11 | 11 | 0 | Not Started |
| 5. Browser Tools | 18 | 17 | 1 | Not Started |
| 6. Gemini CLI Brain | 18 | 15 | 3 | Not Started |
| 7. Memory System | 16 | 15 | 1 | Not Started |
| 8. Conversation & Chat | 14 | 13 | 1 | Not Started |
| 9. Voice Pipeline | 17 | 15 | 2 | Not Started |
| 10. Sinhala + Mixed Lang | 14 | 12 | 2 | Not Started |
| 11. Wake Word | 9 | 9 | 0 | Not Started |
| 12. Claude Code Brain | 11 | 8 | 3 | Not Started |
| 13. UI Polish & Personality | 14 | 13 | 1 | Not Started |
| 14. Advanced (V2.0+) | 12 | 12 | 0 | Not Started |
| **TOTAL** | **~195** | **~160 (82%)** | **~35 (18%)** | - |

---

## How to Use This List

1. Start from Phase 1, work sequentially
2. For each task, check **[G]** or **[C]** to know which tool to use
3. Tick the checkbox `[x]` when done
4. Use **Claude Code** only for tasks marked **[C]** — save your usage
5. **Gemini CLI** handles all the heavy lifting
6. At each phase boundary, do a Claude Code review before moving on
7. Update the Progress Tracker status as you complete phases
