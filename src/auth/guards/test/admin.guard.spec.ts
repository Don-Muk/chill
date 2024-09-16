import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/user/entities/user.entity';
import { AdminGuard } from '../admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let reflector: Reflector;
  let context: Partial<ExecutionContext>;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new AdminGuard(reflector);

    context = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          user: { roles: [UserRole.ADMIN] },
        }),
      }),
    };
  });

  it('should grant access if user has the admin role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);
    expect(guard.canActivate(context as ExecutionContext)).toBe(true);
  });

  it('should deny access if user does not have the admin role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);
    (context.switchToHttp().getRequest as jest.Mock).mockReturnValueOnce({
      user: { roles: [UserRole.USER] },
    });
    expect(guard.canActivate(context as ExecutionContext)).toBe(false);
  });

  it('should allow access if no roles are required', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(null);
    expect(guard.canActivate(context as ExecutionContext)).toBe(true);
  });
});
