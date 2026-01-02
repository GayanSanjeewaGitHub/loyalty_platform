# Loyalty Platform Sample - Walkthrough (Hybrid Architecture)

## Overview
We have refactored the project to use a **Hybrid Connector** approach. This connects **Navitaire Digital API** (for bookings) with **Talon.One Integration API** (for loyalty rules).

## 1. Project Structure
The `LoyaltyController` acts as the middleware.
*   **NavitaireProvider**: Handles `x-apikey` authentication and flight pricing.
*   **TalonOneProvider**: Handles `updateCustomerSession` and point deduction.

## 2. Verification Results
We ran the `test_loyalty_flow.ts` simulation.

### Scenario Tested:
1.  **Booking Flow**:
    *   App asks Connector to book JFK -> LHR.
    *   Connector gets price from Navitaire ($147).
    *   Connector sends cart to Talon.One Rule Engine.
    *   Connector finalizes booking in Navitaire.
2.  **Wallet Payment**:
    *   App asks to pay with 5000 points.
    *   Connector checks Talon.One balance.
    *   Connector applies $50 credit to Navitaire PNR.

### Output Log
```text
=== Starting Hybrid Loyalty Connector (Navitaire + Talon.One) ===

--- STARTING HYBRID BOOKING SAGA for CUST_001 ---
[Navitaire] Authenticating using x-apikey: KEY_123 ...
[Navitaire] Session Token obtained: MOCK_JWT_TOKEN_3w9w4
[Navitaire] Fetching price for JFK->LHR on 2026-01-02...
[Connector] Navitaire Price: $147
[Talon.One] Update Session SESSION_1767316886479 for Customer CUST_001
[Connector] Talon.One Rule Engine Results: { effects: [...] }
[Navitaire] Creating Booking...
[Connector] Booking Confirmed! Ref: P_FHJTH7

--- STARTING WALLET PAYMENT SAGA ---
[Talon.One] Requesting deduction of 5000 points from CUST_001...
[Talon.One] Points deducted. Transaction OK.
[Connector] Applied $50 credit to Navitaire PNR.
```

## 3. Key Benefits Demonstrated
*   **Decoupled Logic**: Navitaire doesn't know about Points. Talon.One doesn't know about PNRs. The Connector bridges them.
*   **Real-Time Rules**: Discounts and Points are calculated *before* payment.
