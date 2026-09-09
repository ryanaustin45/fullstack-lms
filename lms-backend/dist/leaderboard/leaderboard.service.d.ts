import { PrismaService } from '../prisma/prisma.service';
import { CreatePointDto } from './dto/create-point.dto';
export declare class LeaderboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getLeaderboard(courseId?: string, limit?: number): Promise<{
        rank: number;
        user: {
            id: string | undefined;
            name: string | undefined;
        };
        course: string | undefined;
        points: number;
    }[]>;
    givePoints(givenBy: string, dto: CreatePointDto): import(".prisma/client").Prisma.Prisma__UserPointClient<{
        id: string;
        createdAt: Date;
        points: number;
        courseId: string;
        userId: string;
        notes: string | null;
        givenBy: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
