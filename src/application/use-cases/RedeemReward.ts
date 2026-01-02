
import { ILoyaltyRepository } from '../../domain/repositories/ILoyaltyRepository';
import { Transaction, TransactionType } from '../../domain/entities/Transaction';

export class RedeemReward {
    constructor(private loyaltyRepo: ILoyaltyRepository) { }

    async execute(memberId: string, pointsCost: number, description: string): Promise<void> {
        const member = await this.loyaltyRepo.findMemberById(memberId);
        if (!member) {
            throw new Error(`Member with ID ${memberId} not found.`);
        }

        if (member.pointsBalance < pointsCost) {
            throw new Error('Insufficient points balance.');
        }

        const transaction = new Transaction(
            Math.random().toString(36).substring(7),
            memberId,
            new Date(),
            TransactionType.REDEMPTION,
            -pointsCost, // Negative points for redemption
            description
        );

        member.addTransaction(transaction);
        await this.loyaltyRepo.saveMember(member);
    }
}
