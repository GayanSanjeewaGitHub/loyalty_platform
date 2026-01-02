# Airline Loyalty Platform Analysis: Build vs. Buy

## Executive Summary
For a South American airline, the decision to build or buy a loyalty platform hinges on the balance between **speed-to-market** and **customization**. Given the local market's focus on digital wallets, cashback, and partners (retail/banking), a **Hybrid approach** or **API-first "Headless" Vendor** is often the recommended strategy.

## 1. Market Expectations (South America Focus)
*   **Mobile-First Integration:** Users expect seamless integration with mobile wallets and super-apps.
*   **Alternative Earn/Burn:** High demand for non-flight redemption (groceries, fuel, cashback) due to economic factors.
*   **Partnership Ecosystem:** Strong diverse partner networks (banks, retail) are critical.
*   **Tiered & Personalized:** Elite status benefits (lounge, upgrades) combined with AI-driven personalized offers.

## 2. Make vs. Buy Analysis

| Feature | **Build (In-House)** | **Buy (SaaS/Vendor)** | **Hybrid / Headless** |
| :--- | :--- | :--- | :--- |
| **Cost (Initial)** | 🔴 Very High ($10M - $100M+) | 🟢 Low (Setup fees) | 🟡 Medium |
| **Cost (Ongoing)** | 🟡 Maintenance & DevOps | 🔴 Licensing/Transaction fees | 🟡 Mixed |
| **Time-to-Market** | 🔴 Slow (12-24 months) | 🟢 Fast (3-6 months) | 🟢 Fast (core) + Custom UI |
| **Customization** | 🟢 Unlimited | 🔴 Limited to vendor roadmap | 🟢 High (via APIs) |
| **Control** | 🟢 100% Data & IP ownership | 🟡 Data resides with vendor | 🟢 Logic owned, Core outsourced |
| **Innovation** | 🔴 Dependent on internal team | 🟢 Vendor R&D (AI, new features) | 🟢 Best of both |

### Recommendation
**Don't build from scratch.** The complexity of accrual logic, inter-airline settlement, and security is massive.
**Preferred Path:** Use a **Headless Loyalty Engine** (e.g., Talon.One, Antavo, or basic GDS modules) and **build a custom TypeScript Experience Layer** on top. This gives you the specific "South American" features (local partners, specific UX) without rebuilding the complex ledger logic.

## 3. Top Platform Options
*   **Major GDS (Amadeus / Sabre / Travelport):**
    *   *Pros:* Integrated with booking engine, standard airline features.
    *   *Cons:* Legacy tech, hard to customize, slower to innovate.
*   **Modern Loyalty Cloud (Comarch, Antavo, Talon.One):**
    *   *Pros:* API-first, great for non-flight rewards, modern tech stack.
    *   *Cons:* Integration with flight PSS (Passenger Service System) requires work.
*   **Regional Players:** Look for providers with strong LATAM payment/partner integrations.

## 4. Proposed Technical Strategy
We will demonstrate a **Clean Architecture** approach in TypeScript. This allows you to:
1.  Start with a simple internal database.
2.  Swap in a Vendor API (like Amadeus) later without rewriting your app.
3.  Keep your business rules (e.g., "Gold members get double miles on Tuesdays") separate from the vendor logic.
