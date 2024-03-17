import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserDescriptionDecoratorDto } from '../dto';

export const CurrentUserDescriptor = createParamDecorator(
  (
    data: unknown,
    ctx: ExecutionContext,
  ): CurrentUserDescriptionDecoratorDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
