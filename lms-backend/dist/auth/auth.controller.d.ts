import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    login(dto: LoginDto): Promise<{
        success: boolean;
        data: {
            user: {
                id: string;
                name: string;
                role: import(".prisma/client").$Enums.Role;
            };
            access_token: string;
            refresh_token: string;
        };
    }>;
    refresh(dto: RefreshDto): Promise<{
        success: boolean;
        data: {
            access_token: string;
        };
    }>;
}
