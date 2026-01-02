
import { Member } from '../entities/Member';

export interface ILoyaltyRepository {
    findMemberById(memberId: string): Promise<Member | null>;
    saveMember(member: Member): Promise<void>;
    findMemberByEmail(email: string): Promise<Member | null>;
}
