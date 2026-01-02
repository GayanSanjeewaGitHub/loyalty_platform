
import { AccrueMiles } from '../../application/use-cases/AccrueMiles';
import { RedeemReward } from '../../application/use-cases/RedeemReward';
import { TierCalculator } from '../../application/services/TierCalculator';
import { ILoyaltyRepository } from '../../domain/repositories/ILoyaltyRepository';
import { Member } from '../../domain/entities/Member';

export class LoyaltyController {
    private accrueMiles: AccrueMiles;
    private redeemReward: RedeemReward;
    private tierCalculator: TierCalculator;

    constructor(private loyaltyRepo: ILoyaltyRepository) {
        this.accrueMiles = new AccrueMiles(loyaltyRepo);
        this.redeemReward = new RedeemReward(loyaltyRepo);
        this.tierCalculator = new TierCalculator(); // Domain service without dependencies
    }

    async registerMember(name: string, email: string): Promise<Member> {
        const id = Math.random().toString(36).substring(7);
        const member = new Member(id, email, name);
        await this.loyaltyRepo.saveMember(member);
        console.log(`[Controller] Registered Member: ${name} (${email})`);
        return member;
    }

    async addFlightPoints(memberId: string, points: number, description: string): Promise<void> {
        await this.accrueMiles.execute(memberId, points, description);

        // After transaction, check if tier needs update
        const member = await this.loyaltyRepo.findMemberById(memberId);
        if (member) {
            const newTier = this.tierCalculator.calculateTier(member);
            if (newTier !== member.tier) {
                console.log(`[Controller] Tier Upgrade! Member is now ${newTier}`);
                member.updateTier(newTier);
                await this.loyaltyRepo.saveMember(member);
            }
        }
        console.log(`[Controller] Accrued ${points} points for Member ${memberId}`);
    }

    async redeemPoints(memberId: string, points: number, description: string): Promise<void> {
        try {
            await this.redeemReward.execute(memberId, points, description);
            console.log(`[Controller] Redeemed ${points} points for Member ${memberId}: ${description}`);
        } catch (error: any) {
            console.error(`[Controller] Redemption Failed: ${error.message}`);
        }
    }

    async getMemberDetails(memberId: string): Promise<Member | null> {
        return await this.loyaltyRepo.findMemberById(memberId);
    }
}
