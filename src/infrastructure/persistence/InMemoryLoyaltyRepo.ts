
import { ILoyaltyRepository } from '../../domain/repositories/ILoyaltyRepository';
import { Member } from '../../domain/entities/Member';

export class InMemoryLoyaltyRepo implements ILoyaltyRepository {
    private members: Map<string, Member> = new Map();

    async findMemberById(memberId: string): Promise<Member | null> {
        return this.members.get(memberId) || null;
    }

    async saveMember(member: Member): Promise<void> {
        this.members.set(member.id, member);
    }

    async findMemberByEmail(email: string): Promise<Member | null> {
        for (const member of this.members.values()) {
            if (member.email === email) {
                return member;
            }
        }
        return null;
    }
}
