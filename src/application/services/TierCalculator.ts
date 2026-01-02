
import { Member, MembershipTier } from '../../domain/entities/Member';

export class TierCalculator {
    public calculateTier(member: Member): MembershipTier {
        const points = member.pointsBalance;

        if (points >= 100000) {
            return MembershipTier.PLATINUM;
        } else if (points >= 50000) {
            return MembershipTier.GOLD;
        } else if (points >= 25000) {
            return MembershipTier.SILVER;
        } else {
            return MembershipTier.BLUE;
        }
    }
}
