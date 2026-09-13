import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<{
        success: boolean;
        data: {
            name: string;
            id: string;
            slug: string;
        }[];
    }>;
    create(dto: CreateCategoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            name: string;
            id: string;
            slug: string;
        };
    }>;
    update(id: string, dto: UpdateCategoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            name: string;
            id: string;
            slug: string;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
