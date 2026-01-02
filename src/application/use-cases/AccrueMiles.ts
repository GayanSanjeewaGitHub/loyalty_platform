
import { ILoyaltyRepository } from '../../domain/repositories/ILoyaltyRepository';
import { Transaction, TransactionType } from '../../domain/entities/Transaction';
import { v4 as uuidv4 } from 'uuid'; // Assumption: uuid is installed, or I will use a simple random string for demo

export class AccrueMiles {
    constructor(private loyaltyRepo: ILoyaltyRepository) { }

    async execute(memberId: string, points: number, description: string): Promise<void> {
        const member = await this.loyaltyRepo.findMemberById(memberId);
        if (!member) {
            throw new Error(`Member with ID ${memberId} not found.`);
        }

        if (points <= 0) {
            throw new Error("Points to accrue must be positive.");
        }

        const transaction = new Transaction(
            Math.random().toString(36).substring(7), // Simple ID generation for demo
            memberId,
            new Date(),
            TransactionType.FLIGHT_ACCRUAL, // Simplification: defaulting to flight accrual for this generic use case
            points,
            description
        );

        member.addTransaction(transaction);
        await this.loyaltyRepo.saveMember(member);
    }
}
