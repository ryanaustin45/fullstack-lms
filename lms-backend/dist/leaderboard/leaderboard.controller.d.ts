import { LeaderboardService } from './leaderboard.service';
import { CreatePointDto } from './dto/create-point.dto';
export declare class LeaderboardController {
    private leaderboardService;
    constructor(leaderboardService: LeaderboardService);
    getLeaderboard(courseId?: string, limit?: number): Promise<{
        success: boolean;
        data: {
            rank: number;
            user: {
                id: string | undefined;
                name: string | undefined;
            };
            course: string | undefined;
            points: number;
        }[];
    }>;
    givePoints(user: any, dto: CreatePointDto): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            points: number;
            courseId: string;
            userId: string;
            notes: string | null;
            givenBy: string;
        };
    }>;
}
