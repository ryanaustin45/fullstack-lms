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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoriesService = class CategoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.category.findMany({ orderBy: { name: 'asc' } });
    }
    generateSlug(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    async create(dto) {
        const slug = this.generateSlug(dto.slug || dto.name);
        const existing = await this.prisma.category.findUnique({ where: { slug } });
        if (existing) {
            throw new common_1.ConflictException('Kategori dengan nama/slug ini sudah ada');
        }
        return this.prisma.category.create({ data: { name: dto.name, slug } });
    }
    async update(id, dto) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException('Kategori tidak ditemukan');
        }
        let slug = category.slug;
        if (dto.name && dto.name !== category.name) {
            slug = this.generateSlug(dto.name);
            const clashing = await this.prisma.category.findFirst({
                where: { slug, NOT: { id } },
            });
            if (clashing) {
                throw new common_1.ConflictException('Kategori dengan nama/slug ini sudah ada');
            }
        }
        return this.prisma.category.update({
            where: { id },
            data: { name: dto.name ?? category.name, slug },
        });
    }
    async remove(id) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException('Kategori tidak ditemukan');
        }
        try {
            await this.prisma.category.delete({ where: { id } });
        }
        catch (err) {
            if (err.code === 'P2003') {
                throw new common_1.ConflictException('Kategori tidak bisa dihapus karena masih dipakai oleh course. Hapus atau pindahkan course-nya dulu.');
            }
            throw err;
        }
        return { message: 'Kategori berhasil dihapus' };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map