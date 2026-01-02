# Loyalty Platform Implementation Plan (Hybrid: Navitaire + Talon.One)

## Goal
Implement a **Middleware Adapter** in TypeScript that connects **Navitaire Digital API** (for Bookings/Payments) with **Talon.One** (for Loyalty Rules/Wallets).

## User Review Required
> [!IMPORTANT]
> **The "Connector" Concept:**
> This codebase *is* the connector. It sits between your Mobile App and the two backend systems (Navitaire & Talon.One).
> It ensures that when a user pays for a flight (Navitaire), they get points (Talon.One).

## Proposed Changes

### Architecture
We are moving from a generic "Loyalty Controller" to a specific **Hybrid Gateway**:

```mermaid
graph TD
    App[Mobile App / Web] --> Middleware[Typescript Middleware (This Project)]
    Middleware -->|Booking & Payments| Navitaire[Navitaire Digital API]
    Middleware -->|Points & Rules| Talon[Talon.One API]
```

### Components to Build

#### [MODIFY] [Architecture Layers](file:///C:/Users/gayan%20sanjeewa/.gemini/antigravity/brain/065dccf0-e65c-4d08-881a-c61c933ec2eb/loyalty-system/src)

1.  **Navitaire Provider** (`src/infrastructure/providers/NavitaireProvider.ts`)
    *   **Responsibility:** Authenticate with Navitaire (API Key + Token).
    *   **Action:** Retrieve Flight Price.

2.  **Talon.One Provider** (`src/infrastructure/providers/TalonOneProvider.ts`)
    *   **Responsibility:** Authenticate with Talon.One (Management Key).
    *   **Action:** `updateCustomerSession` (Send cart items to see if they earn points).
    *   **Action:** `deductLoyaltyPoints` (for wallet payment).

3.  **Booking Orchestrator** (Use Case)
    *   **Logic:**
        1.  Start Transaction.
        2.  Call Talon.One -> "Can user pay 500 points?".
        3.  If Yes -> Call Navitaire -> "Book Flight (Pay remainder with Card)".
        4.  If Booking Success -> Call Talon.One -> "Commit Point Deduction".

### Files to Create/Update

#### [NEW] [NavitaireProvider.ts](file:///C:/Users/gayan%20sanjeewa/.gemini/antigravity/brain/065dccf0-e65c-4d08-881a-c61c933ec2eb/loyalty-system/src/infrastructure/providers/NavitaireProvider.ts)
*(Replaces MockAmadeusProvider)*

#### [NEW] [TalonOneProvider.ts](file:///C:/Users/gayan%20sanjeewa/.gemini/antigravity/brain/065dccf0-e65c-4d08-881a-c61c933ec2eb/loyalty-system/src/infrastructure/providers/TalonOneProvider.ts)
*(Handles the "Rule Engine" logic)*

## Verification Plan
We will simulate a "Split Payment" flow:
*   Flight Cost: $100
*   User has: $20 worth of Points in Talon.One.
*   **Expected:** Code creates a generic "External Payment" in Navitaire for $20, and charges Credit Card for $80.
