const guardsInjector = require('inject-loader!./guards');

const sandbox = sinon.sandbox.create();
describe('guards', () => {
  describe('globalAuthGuard', () => {
    let to, from, next, guards;
    beforeEach(() => {
      next = sandbox.spy();
      from = {};
      to = { meta: {}};
    });
    afterEach(() => {
      sandbox.restore();
    });
    describe('user not logged in', () => {
      beforeEach(() => {
        guards = guardsInjector({
          '../store': {
            state: {
              auth: {
                loggedIn: false
              }
            }
          }
        });
      });
      it('should redirect to home when the route requires auth', () => {
        to.meta = { requireAuth: true };
        guards.globalAuthGuard(to, from, next);
        expect(next).calledWith('/');
      });
      it('should allow navigation when the route does not require auth', () => {
        guards.globalAuthGuard(to, from, next);
        expect(next).calledWith();
      });
    });
    describe('user logged in', () => {
      beforeEach(() => {
        guards = guardsInjector({
          '../store': {
            state: {
              auth: {
                loggedIn: true
              }
            }
          }
        });
      });
      it('should allow navigation on unsecured routes', () => {
        guards.globalAuthGuard(to, from, next);
        expect(next).calledWith();
      });
      it('should allow navigation on secured routes', () => {
        to.meta.requireAuth = true;
        guards.globalAuthGuard(to, from, next);
        expect(next).calledWith();
      });
    });
  });
});
