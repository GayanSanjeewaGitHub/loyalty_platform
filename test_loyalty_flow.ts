
import { InMemoryLoyaltyRepo } from './src/infrastructure/persistence/InMemoryLoyaltyRepo';
import { LoyaltyController } from './src/interfaces/http/LoyaltyController';

async function main() {
    console.log("=== Starting Loyalty System Sample ===");

    // 1. Setup Dependency Injection
    const repo = new InMemoryLoyaltyRepo();
    const controller = new LoyaltyController(repo);

    // 2. Register a Member
    const member = await controller.registerMember("Juan Perez", "juan@latamairline.com");

    // 3. Accrue Points (Flight)
    // Trip 1: Santiago -> Miami
    await controller.addFlightPoints(member.id, 10000, "Flight SCL-MIA");

    // Trip 2: Miami -> Santiago
    await controller.addFlightPoints(member.id, 16000, "Flight MIA-SCL (First Class)"); // Total 26,000 -> Should be SILVER

    let updatedMember = await controller.getMemberDetails(member.id);
    console.log(`Current Status: ${updatedMember?.pointsBalance} points, Tier: ${updatedMember?.tier}`);

    // Trip 3: Big trip to Europe
    await controller.addFlightPoints(member.id, 30000, "Flight SCL-MAD"); // Total 56,000 -> Should be GOLD

    updatedMember = await controller.getMemberDetails(member.id);
    console.log(`Current Status: ${updatedMember?.pointsBalance} points, Tier: ${updatedMember?.tier}`);

    // 4. Redeem Points
    await controller.redeemPoints(member.id, 20000, "Lounge Access & Upgrade");

    updatedMember = await controller.getMemberDetails(member.id);
    console.log(`Final Status: ${updatedMember?.pointsBalance} points, Tier: ${updatedMember?.tier}`);

    console.log("=== End of Simulation ===");
}

main().catch(console.error);
