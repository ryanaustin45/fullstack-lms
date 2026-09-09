import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { QueryCourseDto } from './dto/query-course.dto';
export declare class CoursesController {
    private coursesService;
    constructor(coursesService: CoursesService);
    findAll(query: QueryCourseDto): Promise<{
        success: boolean;
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
        success: boolean;
        data: {
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
        };
    }>;
    create(dto: CreateCourseDto): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    update(id: string, dto: UpdateCourseDto): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
