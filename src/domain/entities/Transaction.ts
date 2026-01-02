
export enum TransactionType {
    FLIGHT_ACCRUAL = 'FLIGHT_ACCRUAL',
    PARTNER_ACCRUAL = 'PARTNER_ACCRUAL',
    REDEMPTION = 'REDEMPTION',
    ADJUSTMENT = 'ADJUSTMENT'
}

export class Transaction {
    constructor(
        public readonly id: string,
        public readonly memberId: string,
        public readonly date: Date,
        public readonly type: TransactionType,
        public readonly points: number,
        public readonly description: string
    ) {}
}
