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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CoursesService = class CoursesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { search, category_id, status, page = 1, limit = 10 } = query;
        const where = {};
        if (search)
            where.title = { contains: search, mode: 'insensitive' };
        if (category_id)
            where.categoryId = category_id;
        if (status)
            where.status = status;
        const [data, total] = await Promise.all([
            this.prisma.course.findMany({
                where,
                skip: (page - 1) * limit,
                take: Number(limit),
                orderBy: { createdAt: 'desc' },
                include: {
                    category: { select: { id: true, name: true } },
                    instructor: { select: { id: true, name: true } },
                },
            }),
            this.prisma.course.count({ where }),
        ]);
        return {
            data,
            meta: {
                page: Number(page),
                limit: Number(limit),
                total,
                total_pages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                category: { select: { id: true, name: true } },
                instructor: { select: { id: true, name: true } },
                materials: { orderBy: { orderNo: 'asc' } },
            },
        });
        if (!course) {
            throw new common_1.NotFoundException('Course tidak ditemukan');
        }
        return course;
    }
    create(dto) {
        return this.prisma.course.create({
            data: {
                title: dto.title,
                description: dto.description,
                categoryId: dto.category_id,
                instructorId: dto.instructor_id,
                thumbnail: dto.thumbnail,
                startDate: dto.start_date ? new Date(dto.start_date) : undefined,
                status: dto.status ?? 'draft',
            },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.course.update({
            where: { id },
            data: {
                title: dto.title,
                description: dto.description,
                categoryId: dto.category_id,
                instructorId: dto.instructor_id,
                thumbnail: dto.thumbnail,
                startDate: dto.start_date ? new Date(dto.start_date) : undefined,
                status: dto.status,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.course.delete({ where: { id } });
        return { message: 'Course berhasil dihapus' };
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map