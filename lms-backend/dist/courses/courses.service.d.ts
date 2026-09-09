import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { QueryCourseDto } from './dto/query-course.dto';
export declare class CoursesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: QueryCourseDto): Promise<{
        data: ({
            category: {
                name: string;
                id: string;
            };
            instructor: {
                name: string;
                id: string;
            } | null;
        } & {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            thumbnail: string | null;
            status: import(".prisma/client").$Enums.CourseStatus;
            categoryId: string;
            instructorId: string | null;
            startDate: Date | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
        };
    }>;
    findOne(id: string): Promise<{
        category: {
            name: string;
            id: string;
        };
        instructor: {
            name: string;
            id: string;
        } | null;
        materials: {
            title: string;
            id: string;
            orderNo: number;
            courseId: string;
        }[];
    } & {
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        thumbnail: string | null;
        status: import(".prisma/client").$Enums.CourseStatus;
        categoryId: string;
        instructorId: string | null;
        startDate: Date | null;
    }>;
    create(dto: CreateCourseDto): import(".prisma/client").Prisma.Prisma__CourseClient<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        thumbnail: string | null;
        status: import(".prisma/client").$Enums.CourseStatus;
        categoryId: string;
        instructorId: string | null;
        startDate: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdateCourseDto): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        thumbnail: string | null;
        status: import(".prisma/client").$Enums.CourseStatus;
        categoryId: string;
        instructorId: string | null;
        startDate: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
