# ARCHITECTURE

This document describes the initial architecture foundation for Praxis.

Overview:
- apps/web — Next.js frontend (placeholder in Phase 0)
- apps/api — FastAPI backend (placeholder in Phase 0)
- packages/* — shared packages (types, config, etc.)
- docs/adr — Architectural Decision Records

Model provider abstraction:
All model provider access must be implemented behind a ModelProvider interface. Agents must not call provider SDKs directly.

Execution lifecycle:
Idea → Planning → Architecture → Build → Testing → Review → Delivery

Security and observability are first-class concerns; expand this document as the system evolves.
