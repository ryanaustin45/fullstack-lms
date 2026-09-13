import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        slug: string;
    }[]>;
    private generateSlug;
    create(dto: CreateCategoryDto): Promise<{
        name: string;
        id: string;
        slug: string;
    }>;
    update(id: string, dto: UpdateCategoryDto): Promise<{
        name: string;
        id: string;
        slug: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
