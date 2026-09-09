import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// Strategy ini dijalankan otomatis oleh JwtAuthGuard di setiap request
// yang membawa header Authorization: Bearer <token>.
// Hasil validate() akan otomatis jadi `request.user`.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string; role: string }) {
    // payload ini adalah isi JWT yang di-generate saat login (lihat auth.service.ts)
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
