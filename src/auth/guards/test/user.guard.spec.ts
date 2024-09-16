import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/user/entities/user.entity';
import { UserGuard } from '../user.guard';

describe('UserGuard', () => {
  let guard: UserGuard;
  let reflector: Reflector;
  let context: Partial<ExecutionContext>;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new UserGuard(reflector);

    context = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          user: { roles: [UserRole.USER] },
        }),
      }),
    };
  });

  it('should grant access if user has the user role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.USER]);
    expect(guard.canActivate(context as ExecutionContext)).toBe(true);
  });

  it('should deny access if user does not have the user role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.USER]);
    (context.switchToHttp().getRequest as jest.Mock).mockReturnValueOnce({
      user: { roles: [UserRole.AUTHOR] },
    });
    expect(guard.canActivate(context as ExecutionContext)).toBe(false);
  });

  it('should allow access if no roles are required', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(null);
    expect(guard.canActivate(context as ExecutionContext)).toBe(true);
  });
});
