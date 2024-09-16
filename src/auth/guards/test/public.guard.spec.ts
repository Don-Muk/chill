import { PublicGuard } from "../public.guard";

describe('PublicGuard', () => {
  let guard: PublicGuard;

  beforeEach(() => {
    guard = new PublicGuard();
  });

  it('should always grant access', async () => {
    expect(await guard.canActivate()).toBe(true);
  });
});
