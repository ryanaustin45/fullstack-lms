"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LeaderboardService = class LeaderboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getLeaderboard(courseId, limit = 10) {
        const grouped = await this.prisma.userPoint.groupBy({
            by: ['userId', 'courseId'],
            where: courseId ? { courseId } : undefined,
            _sum: { points: true },
            orderBy: { _sum: { points: 'desc' } },
            take: limit,
        });
        const result = await Promise.all(grouped.map(async (item, index) => {
            const [user, course] = await Promise.all([
                this.prisma.user.findUnique({ where: { id: item.userId } }),
                this.prisma.course.findUnique({ where: { id: item.courseId } }),
            ]);
            return {
                rank: index + 1,
                user: { id: user?.id, name: user?.name },
                course: course?.title,
                points: item._sum.points ?? 0,
            };
        }));
        return result;
    }
    givePoints(givenBy, dto) {
        return this.prisma.userPoint.create({
            data: {
                userId: dto.user_id,
                courseId: dto.course_id,
                points: dto.points,
                notes: dto.notes,
                givenBy,
            },
        });
    }
};
exports.LeaderboardService = LeaderboardService;
exports.LeaderboardService = LeaderboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeaderboardService);
//# sourceMappingURL=leaderboard.service.js.map