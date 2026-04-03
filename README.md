# Javis (LankaJarvis)

A bilingual (Sinhala + English) desktop AI assistant inspired by Iron Man's Jarvis.
Built with Tauri + React + TypeScript frontend, Node.js backend, Playwright browser automation, SQLite storage.

## Monorepo Structure

- `apps/desktop-ui`: Tauri + React frontend
- `apps/orchestrator-api`: Node.js backend orchestrator
- `packages/shared-types`: Shared TypeScript definitions across the stack

## Prerequisites

- Node.js (v18+)
- pnpm
- Rust (for Tauri)

## Getting Started

1. Clone the repo
2. Run `pnpm install`
3. Run `pnpm dev`
