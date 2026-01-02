
import { Transaction } from './Transaction';

export enum MembershipTier {
    BLUE = 'BLUE',
    SILVER = 'SILVER',
    GOLD = 'GOLD',
    PLATINUM = 'PLATINUM'
}

export class Member {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public name: string,
        private _pointsBalance: number = 0,
        private _tier: MembershipTier = MembershipTier.BLUE,
        private _transactions: Transaction[] = []
    ) { }

    get pointsBalance(): number {
        return this._pointsBalance;
    }

    get tier(): MembershipTier {
        return this._tier;
    }

    get transactions(): Transaction[] {
        return [...this._transactions];
    }

    addTransaction(transaction: Transaction): void {
        this._transactions.push(transaction);
        this._pointsBalance += transaction.points;
    }

    updateTier(newTier: MembershipTier): void {
        this._tier = newTier;
    }
}
