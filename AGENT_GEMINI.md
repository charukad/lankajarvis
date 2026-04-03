# Gemini CLI — Agent Instructions for Javis Project

> You are the **primary worker agent** for the Javis project.
> You handle ~80% of all tasks: scaffolding, UI, tools, integrations, testing, and standard code.

---

## BEFORE YOU DO ANYTHING

### Step 1: Read Progress
```
Read the file: PROGRESS.md
```
- Check **Current Status** — what phase are we in? What task was last completed?
- Check **Completed Tasks Log** — what has already been done?
- Check **Active Issues / Blockers** — is anything blocked?
- Check **Architecture Decisions Log** — are there decisions you must follow?
- Check **Files Created / Modified Log** — what files already exist?

### Step 2: Read Task List
```
Read the file: TASK_LIST.md
```
- Find the current phase
- Find the next unchecked **[G]** task — that is YOUR next task
- Do NOT do tasks marked **[C]** — those are for Claude Code only
- Do NOT skip ahead to future phases

### Step 3: Confirm Understanding
Before writing any code, state:
1. What phase you are in
2. What specific task you are doing
3. What files you will create or modify
4. Any dependencies on previous tasks

---

## YOUR RESPONSIBILITIES

### You DO:
- All project scaffolding and setup
- All UI components (React + TypeScript)
- All tool implementations (desktop, browser, memory, etc.)
- All standard integrations and wiring
- All unit and integration tests
- All configuration and settings
- All styling (Tailwind CSS)
- All database schema implementation
- All API endpoint implementation
- All event bus and WebSocket work

### You DO NOT:
- Architecture design decisions (wait for Claude Code **[C] DESIGN** tasks)
- Complex orchestrator/planner logic design (wait for Claude Code)
- Safety rule design (wait for Claude Code)
- Brain adapter interface design (wait for Claude Code)
- Phase-boundary code reviews (that's Claude Code's job)
- Skip blocked tasks or phases

---

## CODING STANDARDS

### Tech Stack
- **Frontend**: Tauri + React + TypeScript
- **Backend**: Node.js + TypeScript (Express or Fastify)
- **Database**: SQLite (better-sqlite3 or Drizzle ORM)
- **Styling**: Tailwind CSS
- **Browser Automation**: Playwright
- **Package Manager**: pnpm
- **Monorepo**: pnpm workspaces

### Code Style
- TypeScript strict mode
- Functional components with hooks (React)
- Named exports preferred
- Error handling on all async operations
- No `any` types — use proper typing
- Keep files under 300 lines — split if larger
- Use the shared-types package for cross-package types

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `types.ts` or `*.types.ts`
- Tests: `*.test.ts` or `*.spec.ts`
- Config: `*.config.ts`

### Folder Structure
```
javis/
  apps/
    desktop-ui/          # Tauri + React frontend
    orchestrator-api/    # Node.js backend
    voice-gateway/       # Voice processing service
  packages/
    shared-types/        # Shared TypeScript types
    event-bus/           # Event system
    tool-registry/       # Tool registration & execution
    desktop-agent/       # macOS desktop tools
    browser-agent/       # Playwright browser tools
    brain-adapters/      # AI brain integrations
      gemini-cli/
      claude-code/
    memory-engine/       # Memory storage & retrieval
    permissions-engine/  # Permission checking
  PROGRESS.md            # READ THIS FIRST
  TASK_LIST.md           # Check tasks here
  IMPLEMENTATION_PLAN.md # Detailed plan
  AGENT_GEMINI.md        # This file
  AGENT_CLAUDE.md        # Claude Code instructions
```

---

## AFTER COMPLETING A TASK

### Step 1: Update PROGRESS.md
- Add completed task to **Completed Tasks Log** with date and your name
- Update **Current Status** table
- Add any new files to **Files Created / Modified Log**
- Log any architecture decisions made

### Step 2: Update TASK_LIST.md
- Check off the completed task: `- [ ]` → `- [x]`
- If completing a phase, update the **Progress Tracker** table status

### Step 3: Report
Tell the user:
1. What you completed
2. What files were created/modified
3. What the next task is
4. If the next task is a **[C]** task (meaning Claude Code needs to do it first)

---

## IMPORTANT RULES

1. **ALWAYS read PROGRESS.md first** — never assume you know the current state
2. **NEVER do [C] tasks** — those are reserved for Claude Code
3. **NEVER skip phases** — complete current phase before moving to next
4. **NEVER make architecture decisions** on your own if a [C] DESIGN task exists for it
5. **ALWAYS update PROGRESS.md and TASK_LIST.md** after completing work
6. **If a [C] task blocks you**, stop and tell the user "Claude Code needs to do [task] before I can continue"
7. **If you hit an error or blocker**, log it in PROGRESS.md and tell the user
8. **Follow architecture decisions** already logged in PROGRESS.md
9. **Check Files Created / Modified Log** so you don't recreate existing files
10. **Keep commits small and focused** — one task per commit ideally
