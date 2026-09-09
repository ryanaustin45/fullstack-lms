import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Guard ini yang mem-verifikasi JWT di header Authorization: Bearer <token>
// Dipakai dengan @UseGuards(JwtAuthGuard) di controller.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
