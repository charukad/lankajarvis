# Javis - Full Implementation Plan

> A bilingual (Sinhala + English) desktop AI assistant inspired by Iron Man's Jarvis.
> Built with Tauri + React + TypeScript frontend, Node.js backend, Playwright browser automation, SQLite storage.

---

## Tool Assignment Legend

| Symbol | Meaning |
|--------|---------|
| **[Gemini]** | Task assigned to Gemini CLI (primary worker — 80% of work) |
| **[Claude]** | Task assigned to Claude Code (reserved for architecture, complex logic, debugging) |

> **Strategy**: Gemini CLI handles all scaffolding, boilerplate, UI components, tool implementations, and standard coding. Claude Code is reserved for critical architecture decisions, complex debugging, integration logic, and code review.

---

## Phase 1 — Project Setup & Desktop Shell (V0.1)

**Goal**: Get a working Tauri + React desktop app with basic UI shell.
**Duration**: ~1 week

### 1.1 Project Initialization
- [ ] **[Gemini]** Initialize monorepo with `pnpm` workspaces
- [ ] **[Gemini]** Create Tauri + React + TypeScript app in `apps/desktop-ui/`
- [ ] **[Gemini]** Create Node.js + TypeScript backend in `apps/orchestrator-api/`
- [ ] **[Gemini]** Set up shared types package in `packages/shared-types/`
- [ ] **[Gemini]** Configure ESLint, Prettier, tsconfig across all packages
- [ ] **[Gemini]** Set up `.gitignore`, `README.md`, and base configs
- [ ] **[Gemini]** Create initial folder structure matching the blueprint

### 1.2 Desktop UI Shell
- [ ] **[Gemini]** Build main app window layout (sidebar + main panel)
- [ ] **[Gemini]** Create floating assistant orb component
- [ ] **[Gemini]** Build message/transcript panel component
- [ ] **[Gemini]** Build activity/task log panel component
- [ ] **[Gemini]** Create text input bar with send button
- [ ] **[Gemini]** Add mic/push-to-talk button (UI only, no audio yet)
- [ ] **[Gemini]** Create settings drawer skeleton
- [ ] **[Gemini]** Set up dark theme and base styling (Tailwind CSS)
- [ ] **[Claude]** Review UI architecture and component structure

### 1.3 Backend Foundation
- [ ] **[Gemini]** Set up Express/Fastify server with TypeScript
- [ ] **[Gemini]** Create WebSocket server for real-time UI communication
- [ ] **[Gemini]** Set up SQLite database with Drizzle ORM or better-sqlite3
- [ ] **[Gemini]** Create initial database schema (users, conversations, messages, tasks)
- [ ] **[Gemini]** Build basic REST API endpoints skeleton
- [ ] **[Gemini]** Connect Tauri frontend to backend via WebSocket + HTTP

### 1.4 Phase 1 Testing & Polish
- [ ] **[Gemini]** Test Tauri app builds on macOS
- [ ] **[Gemini]** Verify frontend-backend WebSocket connection
- [ ] **[Gemini]** Test database CRUD operations
- [ ] **[Claude]** Review Phase 1 code quality and architecture decisions

---

## Phase 2 — Event System & Orchestrator Core (V0.2)

**Goal**: Build the brain of the system — event bus, intent router, planner, tool registry.
**Duration**: ~1.5 weeks

### 2.1 Event Bus
- [ ] **[Gemini]** Create event bus package in `packages/event-bus/`
- [ ] **[Gemini]** Implement typed event emitter with event catalog
- [ ] **[Gemini]** Define all core events (wake_word.detected, intent.classified, task.created, tool.requested, tool.completed, etc.)
- [ ] **[Gemini]** Add event logging middleware
- [ ] **[Gemini]** Connect event bus to WebSocket for UI real-time updates

### 2.2 Intent Router
- [ ] **[Claude]** Design intent classification system architecture
- [ ] **[Gemini]** Create intent router module in orchestrator
- [ ] **[Gemini]** Define intent categories (casual_chat, search_web, open_app, open_file, run_command, coding_help, browser_task, system_control)
- [ ] **[Gemini]** Build keyword + pattern-based intent classifier (V1)
- [ ] **[Gemini]** Add entity extraction (app names, URLs, file paths, search queries)
- [ ] **[Gemini]** Write unit tests for intent classification

### 2.3 Planner / Orchestrator
- [ ] **[Claude]** Design planner decision tree and task execution flow
- [ ] **[Gemini]** Create planner module that receives classified intents
- [ ] **[Gemini]** Implement task creation and tracking system
- [ ] **[Gemini]** Build tool selection logic based on intent
- [ ] **[Gemini]** Add multi-step task chaining support
- [ ] **[Gemini]** Implement task status tracking (pending, running, completed, failed, cancelled)
- [ ] **[Gemini]** Add timeout and cancellation support

### 2.4 Tool Registry
- [ ] **[Gemini]** Create tool registry package in `packages/tool-registry/`
- [ ] **[Gemini]** Define `Tool` interface (name, description, inputSchema, execute, riskLevel)
- [ ] **[Gemini]** Build tool registration and lookup system
- [ ] **[Gemini]** Create tool execution wrapper with error handling
- [ ] **[Gemini]** Add tool execution logging to database

### 2.5 Phase 2 Testing
- [ ] **[Gemini]** Test intent routing with sample inputs
- [ ] **[Gemini]** Test planner task creation and execution flow
- [ ] **[Gemini]** Test event bus message delivery
- [ ] **[Claude]** Review orchestrator architecture for edge cases

---

## Phase 3 — Desktop Tools (V0.3)

**Goal**: Make the assistant actually DO things on macOS — open apps, files, URLs, run commands.
**Duration**: ~1 week

### 3.1 Desktop Agent Package
- [ ] **[Gemini]** Create desktop agent package in `packages/desktop-agent/`
- [ ] **[Gemini]** Implement `open_application` tool (uses `open -a` on macOS)
- [ ] **[Gemini]** Implement `close_application` tool
- [ ] **[Gemini]** Implement `open_folder` tool (Finder / VS Code)
- [ ] **[Gemini]** Implement `open_file` tool
- [ ] **[Gemini]** Implement `open_url` tool (default browser)
- [ ] **[Gemini]** Implement `run_terminal_command` tool with output capture
- [ ] **[Gemini]** Implement `get_running_apps` tool
- [ ] **[Gemini]** Implement `switch_application` tool (bring to foreground)
- [ ] **[Gemini]** Implement `system_info` tool (battery, volume, etc.)

### 3.2 Command Safety Layer
- [ ] **[Claude]** Design command safety validation rules
- [ ] **[Gemini]** Build command risk scoring system
- [ ] **[Gemini]** Create allowlist/blocklist for shell commands
- [ ] **[Gemini]** Implement path restriction checks
- [ ] **[Gemini]** Add destructive command detection (rm, kill, sudo, etc.)

### 3.3 Register Desktop Tools
- [ ] **[Gemini]** Register all desktop tools in the tool registry
- [ ] **[Gemini]** Wire planner to route desktop intents to desktop tools
- [ ] **[Gemini]** Update UI to show tool execution status in real-time
- [ ] **[Gemini]** Add tool execution results to conversation panel

### 3.4 Phase 3 Testing
- [ ] **[Gemini]** Test opening Chrome, VS Code, Finder, Terminal
- [ ] **[Gemini]** Test running safe shell commands
- [ ] **[Gemini]** Test command blocking for dangerous commands
- [ ] **[Gemini]** End-to-end test: type "open Chrome" → Chrome opens
- [ ] **[Claude]** Review safety layer completeness

---

## Phase 4 — Permission System (V0.4)

**Goal**: Build the 3-tier permission system so the assistant asks before doing risky things.
**Duration**: ~1 week

### 4.1 Permission Engine
- [ ] **[Gemini]** Create permissions engine package in `packages/permissions-engine/`
- [ ] **[Gemini]** Define permission tiers (auto_allow, ask_once, always_confirm)
- [ ] **[Gemini]** Create default permission mappings for all tools
- [ ] **[Gemini]** Build permission check middleware for tool execution
- [ ] **[Gemini]** Implement session-based approval caching (ask_once tier)
- [ ] **[Gemini]** Store permission overrides in database

### 4.2 Approval UI
- [ ] **[Gemini]** Build permission approval popup component
- [ ] **[Gemini]** Show tool name, risk level, and action details in popup
- [ ] **[Gemini]** Add "Allow", "Deny", "Always Allow" buttons
- [ ] **[Gemini]** Wire approval flow through WebSocket (backend asks → UI shows → user responds → backend continues)
- [ ] **[Gemini]** Build permissions management screen in settings

### 4.3 Phase 4 Testing
- [ ] **[Gemini]** Test auto-allow tools execute without popup
- [ ] **[Gemini]** Test ask-once tools show popup first time only
- [ ] **[Gemini]** Test always-confirm tools always show popup
- [ ] **[Gemini]** Test deny action stops execution

---

## Phase 5 — Browser Tools (V0.5)

**Goal**: Add web search, page opening, and basic browser automation.
**Duration**: ~1.5 weeks

### 5.1 Browser Agent Package
- [ ] **[Gemini]** Create browser agent package in `packages/browser-agent/`
- [ ] **[Gemini]** Set up Playwright integration
- [ ] **[Gemini]** Implement `search_web` tool (search API or scrape)
- [ ] **[Gemini]** Implement `open_url_in_browser` tool
- [ ] **[Gemini]** Implement `extract_page_text` tool
- [ ] **[Gemini]** Implement `summarize_webpage` tool (send text to AI for summary)
- [ ] **[Gemini]** Implement `take_screenshot` tool

### 5.2 Advanced Browser Actions
- [ ] **[Gemini]** Implement tab management (list, switch, close)
- [ ] **[Gemini]** Implement `click_element` tool
- [ ] **[Gemini]** Implement `fill_form` tool
- [ ] **[Gemini]** Implement `scroll_page` tool
- [ ] **[Gemini]** Build browser session manager (reuse browser instance)

### 5.3 Register & Wire
- [ ] **[Gemini]** Register all browser tools in tool registry
- [ ] **[Gemini]** Wire planner to route browser intents
- [ ] **[Gemini]** Show search results in UI conversation panel
- [ ] **[Gemini]** Show page summaries in UI

### 5.4 Phase 5 Testing
- [ ] **[Gemini]** Test web search returns results
- [ ] **[Gemini]** Test opening URLs in browser
- [ ] **[Gemini]** Test page text extraction
- [ ] **[Gemini]** End-to-end: "search latest AI news" → results shown
- [ ] **[Claude]** Review browser automation error handling

---

## Phase 6 — Gemini CLI Brain Integration (V0.6)

**Goal**: Connect Gemini CLI as the first worker brain for coding and complex reasoning tasks.
**Duration**: ~1.5 weeks

### 6.1 Brain Adapter Layer
- [ ] **[Claude]** Design brain adapter interface and protocol
- [ ] **[Gemini]** Create brain adapters package in `packages/brain-adapters/`
- [ ] **[Gemini]** Define `BrainAdapter` interface (runTask, streamTask, cancelTask, healthCheck)
- [ ] **[Gemini]** Define `BrainTaskRequest` and `BrainTaskResult` types
- [ ] **[Gemini]** Build brain adapter registry

### 6.2 Gemini CLI Adapter
- [ ] **[Gemini]** Create Gemini CLI adapter in `packages/brain-adapters/gemini-cli/`
- [ ] **[Gemini]** Implement process spawning for Gemini CLI
- [ ] **[Gemini]** Implement output streaming and parsing
- [ ] **[Gemini]** Implement task cancellation (kill process)
- [ ] **[Gemini]** Implement health check
- [ ] **[Gemini]** Handle Gemini CLI errors and timeouts
- [ ] **[Gemini]** Add Gemini CLI configuration (model, settings)

### 6.3 Brain Routing
- [ ] **[Claude]** Design brain selection decision logic
- [ ] **[Gemini]** Build brain router in planner (which tasks go to brain vs local tools)
- [ ] **[Gemini]** Implement coding task detection
- [ ] **[Gemini]** Implement repo analysis task detection
- [ ] **[Gemini]** Route complex questions to Gemini CLI
- [ ] **[Gemini]** Show brain activity in UI (streaming output)

### 6.4 Phase 6 Testing
- [ ] **[Gemini]** Test Gemini CLI adapter spawns and communicates
- [ ] **[Gemini]** Test task routing to Gemini CLI
- [ ] **[Gemini]** Test output streaming to UI
- [ ] **[Gemini]** Test cancellation works
- [ ] **[Gemini]** End-to-end: "explain this repository" → Gemini analyzes → result shown

---

## Phase 7 — Memory System (V0.7)

**Goal**: Remember user preferences, project folders, command shortcuts, and recent tasks.
**Duration**: ~1 week

### 7.1 Memory Engine
- [ ] **[Gemini]** Create memory engine package in `packages/memory-engine/`
- [ ] **[Gemini]** Create memory_items table (type, key, value, embedding_ref)
- [ ] **[Gemini]** Implement `store_memory` function
- [ ] **[Gemini]** Implement `recall_memory` function (exact key lookup)
- [ ] **[Gemini]** Implement `search_memory` function (keyword/fuzzy search)
- [ ] **[Gemini]** Implement `recent_tasks` retrieval

### 7.2 Memory Types
- [ ] **[Gemini]** Implement project folder shortcuts ("my LMS project" → path)
- [ ] **[Gemini]** Implement app aliases ("Chrome eka" → "Google Chrome")
- [ ] **[Gemini]** Implement user preferences (language, verbosity, etc.)
- [ ] **[Gemini]** Implement command history and frequent commands
- [ ] **[Gemini]** Implement conversation context carry-over

### 7.3 Memory UI
- [ ] **[Gemini]** Build memory management screen
- [ ] **[Gemini]** Show saved shortcuts and preferences
- [ ] **[Gemini]** Allow manual add/edit/delete of memory items
- [ ] **[Gemini]** Show recent task history

### 7.4 Wire Memory to Orchestrator
- [ ] **[Gemini]** Planner checks memory before executing (resolve "my project" → actual path)
- [ ] **[Gemini]** Auto-save frequently used commands
- [ ] **[Gemini]** Auto-save project folder associations
- [ ] **[Claude]** Review memory retrieval logic for accuracy

### 7.5 Phase 7 Testing
- [ ] **[Gemini]** Test storing and recalling memories
- [ ] **[Gemini]** Test shortcut resolution ("open my LMS project" uses stored path)
- [ ] **[Gemini]** Test memory persists across app restarts

---

## Phase 8 — Conversation Manager & AI Chat (V0.8)

**Goal**: Make the text conversation feel natural — context tracking, follow-ups, direct AI answers.
**Duration**: ~1 week

### 8.1 Conversation Manager
- [ ] **[Gemini]** Build conversation manager module
- [ ] **[Gemini]** Track conversation history per session
- [ ] **[Gemini]** Implement context window management (last N messages)
- [ ] **[Gemini]** Handle follow-up references ("open that one", "run it again", "explain more")
- [ ] **[Gemini]** Store conversations in database

### 8.2 Direct AI Chat
- [ ] **[Gemini]** Integrate a fast conversation model API (Gemini API) for quick Q&A
- [ ] **[Gemini]** Route casual chat and knowledge questions to direct AI
- [ ] **[Gemini]** Stream AI responses to UI in real-time
- [ ] **[Gemini]** Show typing indicator during AI response

### 8.3 Response Formatting
- [ ] **[Gemini]** Format AI responses for display (markdown support)
- [ ] **[Gemini]** Format tool execution results as conversation messages
- [ ] **[Gemini]** Add action suggestion buttons after responses
- [ ] **[Gemini]** Distinguish between AI chat responses and tool action reports

### 8.4 Phase 8 Testing
- [ ] **[Gemini]** Test multi-turn conversation context
- [ ] **[Gemini]** Test follow-up references resolve correctly
- [ ] **[Gemini]** Test AI chat responses stream properly
- [ ] **[Claude]** Review conversation flow and edge cases

---

## Phase 9 — Voice Pipeline (V0.9)

**Goal**: Add speech-to-text and text-to-speech — make it actually talk.
**Duration**: ~2 weeks

### 9.1 Audio Capture
- [ ] **[Gemini]** Set up microphone access in Tauri
- [ ] **[Gemini]** Build audio capture service (push-to-talk mode first)
- [ ] **[Gemini]** Implement silence detection
- [ ] **[Gemini]** Implement audio streaming to STT service
- [ ] **[Gemini]** Add mic status indicator in UI

### 9.2 Speech-to-Text (STT)
- [ ] **[Claude]** Research and choose best STT service/API for English + Sinhala
- [ ] **[Gemini]** Integrate STT API (e.g., Google Cloud Speech, Whisper API, Deepgram)
- [ ] **[Gemini]** Build STT module in `apps/voice-gateway/`
- [ ] **[Gemini]** Handle streaming partial transcripts
- [ ] **[Gemini]** Display live transcript in UI
- [ ] **[Gemini]** Send final transcript to intent router

### 9.3 Text-to-Speech (TTS)
- [ ] **[Gemini]** Integrate TTS API (e.g., Google Cloud TTS, ElevenLabs)
- [ ] **[Gemini]** Build TTS module in voice gateway
- [ ] **[Gemini]** Implement audio playback in Tauri
- [ ] **[Gemini]** Support interruptible speech (stop speaking when user talks)
- [ ] **[Gemini]** Add voice selection in settings

### 9.4 Voice Flow Integration
- [ ] **[Gemini]** Wire full flow: mic → STT → intent → action → response → TTS
- [ ] **[Gemini]** Add push-to-talk keyboard shortcut
- [ ] **[Gemini]** Show voice waveform animation on orb during listening/speaking
- [ ] **[Claude]** Review voice pipeline latency and optimization

### 9.5 Phase 9 Testing
- [ ] **[Gemini]** Test push-to-talk captures audio correctly
- [ ] **[Gemini]** Test STT transcription accuracy (English)
- [ ] **[Gemini]** Test TTS playback works
- [ ] **[Gemini]** End-to-end: speak "open Chrome" → Chrome opens → voice confirms

---

## Phase 10 — Sinhala + Mixed Language Support (V1.0)

**Goal**: Add Sinhala speech recognition, mixed language handling, and bilingual responses.
**Duration**: ~2 weeks

### 10.1 Language Detection
- [ ] **[Claude]** Design language detection and routing strategy
- [ ] **[Gemini]** Build language detector module (Sinhala / English / Mixed)
- [ ] **[Gemini]** Handle transliterated Sinhala (Singlish like "karanna", "eka")
- [ ] **[Gemini]** Add language mode to conversation context

### 10.2 Sinhala STT
- [ ] **[Gemini]** Research and integrate Sinhala-capable STT
- [ ] **[Gemini]** Test Sinhala recognition accuracy
- [ ] **[Gemini]** Test mixed Sinhala-English recognition
- [ ] **[Gemini]** Build normalization layer for mixed input

### 10.3 Sinhala TTS
- [ ] **[Gemini]** Research and integrate Sinhala-capable TTS
- [ ] **[Gemini]** Implement language-based voice switching
- [ ] **[Gemini]** Test Sinhala speech output quality

### 10.4 Bilingual Intent Understanding
- [ ] **[Gemini]** Extend intent router to understand Sinhala commands
- [ ] **[Gemini]** Add Sinhala keyword mappings (e.g., "open karanna" = open, "hoyanna" = search)
- [ ] **[Gemini]** Handle code-switching mid-sentence
- [ ] **[Gemini]** Add reply language preference setting

### 10.5 Phase 10 Testing
- [ ] **[Gemini]** Test Sinhala-only commands work
- [ ] **[Gemini]** Test mixed commands like "Chrome eka open karala AI news search karanna"
- [ ] **[Gemini]** Test correct reply language selection
- [ ] **[Claude]** Review bilingual system completeness

---

## Phase 11 — Wake Word Engine (V1.1)

**Goal**: Always-listening mode with "Jarvis" wake word detection.
**Duration**: ~1 week

### 11.1 Wake Word Detection
- [ ] **[Gemini]** Research wake word detection library (Porcupine, Snowboy, or custom)
- [ ] **[Gemini]** Integrate wake word engine for "Jarvis"
- [ ] **[Gemini]** Implement always-listening background audio monitoring
- [ ] **[Gemini]** Add wake sound effect on detection
- [ ] **[Gemini]** Transition from wake word to active listening mode
- [ ] **[Gemini]** Handle false positives with confidence threshold

### 11.2 Wake Word Settings
- [ ] **[Gemini]** Add custom wake word configuration in settings
- [ ] **[Gemini]** Add sensitivity slider
- [ ] **[Gemini]** Add option to switch between push-to-talk and always-on mode

### 11.3 Phase 11 Testing
- [ ] **[Gemini]** Test wake word activates listening
- [ ] **[Gemini]** Test false positive rate is acceptable
- [ ] **[Gemini]** End-to-end: say "Jarvis, open Chrome" → works hands-free

---

## Phase 12 — Claude Code Brain Integration (V1.2)

**Goal**: Add Claude Code as second brain for deep engineering tasks.
**Duration**: ~1 week

### 12.1 Claude Code Adapter
- [ ] **[Claude]** Design Claude Code adapter using Agent SDK or CLI wrapping
- [ ] **[Gemini]** Create Claude Code adapter in `packages/brain-adapters/claude-code/`
- [ ] **[Gemini]** Implement process spawning / SDK integration
- [ ] **[Gemini]** Implement output streaming and parsing
- [ ] **[Gemini]** Handle authentication and API limits
- [ ] **[Gemini]** Implement health check

### 12.2 Multi-Brain Routing
- [ ] **[Claude]** Define final brain selection rules (which tasks → which brain)
- [ ] **[Gemini]** Update brain router with multi-brain support
- [ ] **[Gemini]** Route repo-heavy tasks to Claude Code
- [ ] **[Gemini]** Route general coding tasks to Gemini CLI
- [ ] **[Gemini]** Show active brain indicator in UI
- [ ] **[Gemini]** Allow manual brain selection override in UI

### 12.3 Phase 12 Testing
- [ ] **[Gemini]** Test Claude Code adapter communicates correctly
- [ ] **[Gemini]** Test brain routing sends tasks to correct brain
- [ ] **[Gemini]** Test switching between brains mid-session

---

## Phase 13 — UI Polish & Jarvis Personality (V1.3)

**Goal**: Make it feel like Jarvis — animations, personality, smooth UX.
**Duration**: ~1.5 weeks

### 13.1 Visual Polish
- [ ] **[Gemini]** Animate the assistant orb (idle pulse, listening glow, thinking spin, speaking wave)
- [ ] **[Gemini]** Add smooth transitions between states
- [ ] **[Gemini]** Polish the conversation panel (message bubbles, timestamps)
- [ ] **[Gemini]** Polish the task log (status badges, progress indicators)
- [ ] **[Gemini]** Add notification system for background tasks

### 13.2 Personality Engine
- [ ] **[Gemini]** Create system prompt for Jarvis personality (calm, concise, helpful)
- [ ] **[Gemini]** Add personality presets (formal, casual, mixed)
- [ ] **[Gemini]** Implement progressive responses ("Opening Chrome... Done. Searching now...")
- [ ] **[Gemini]** Add acknowledgment sounds for actions

### 13.3 Settings & Configuration
- [ ] **[Gemini]** Build full settings screen (voice, language, brains, permissions, memory)
- [ ] **[Gemini]** Add keyboard shortcuts configuration
- [ ] **[Gemini]** Add startup behavior settings
- [ ] **[Gemini]** Add global hotkey for activation

### 13.4 Phase 13 Testing
- [ ] **[Gemini]** Test all UI states and animations
- [ ] **[Gemini]** Test settings persist correctly
- [ ] **[Gemini]** User acceptance testing on full workflow
- [ ] **[Claude]** Final code review and optimization pass

---

## Phase 14 — Advanced Features (V2.0+)

**Goal**: Post-MVP enhancements for power users.
**Duration**: Ongoing

### 14.1 Advanced Desktop Control
- [ ] **[Gemini]** AppleScript integration for deeper app control
- [ ] **[Gemini]** Clipboard read/write tools
- [ ] **[Gemini]** Screenshot + screen context awareness
- [ ] **[Gemini]** Window management (resize, position, arrange)

### 14.2 Workflow Automation
- [ ] **[Gemini]** Workflow macro recording and replay
- [ ] **[Gemini]** Proactive suggestions based on time/context
- [ ] **[Gemini]** Multi-step task templates
- [ ] **[Gemini]** Scheduled tasks

### 14.3 Advanced Memory
- [ ] **[Gemini]** Vector embeddings for semantic memory search
- [ ] **[Gemini]** Coding session memory (what you were working on)
- [ ] **[Gemini]** Auto-learning from user corrections

### 14.4 Integrations
- [ ] **[Gemini]** Calendar integration
- [ ] **[Gemini]** Notification/messaging bridge (Telegram/WhatsApp)
- [ ] **[Gemini]** Mobile companion app
- [ ] **[Gemini]** MCP server support for extensibility

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| **Total Phases** | 14 |
| **Total Tasks** | ~195 |
| **Gemini CLI Tasks** | ~160 (~82%) |
| **Claude Code Tasks** | ~35 (~18%) |

### Claude Code Usage Strategy

Claude Code is reserved for **high-impact, low-frequency** tasks:
- Architecture design decisions (phase starts)
- Complex logic design (planner, brain routing, safety rules)
- Code review at phase boundaries
- Debugging critical integration issues
- Research decisions (STT/TTS service selection)

### Gemini CLI Handles Everything Else:
- All scaffolding and boilerplate
- All UI components and styling
- All tool implementations
- All standard integrations
- All testing
- All configuration and settings
