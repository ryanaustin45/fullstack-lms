import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Dipakai di controller: getProfile(@CurrentUser() user) -> ambil user dari JWT payload
// Mirip auth()->user() di Laravel.
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
