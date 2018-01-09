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
      it('should redirect to home when the route explicitly requires auth', () => {
        to.meta.noAuth = false;
        guards.globalAuthGuard(to, from, next);
        expect(next).calledWith('/');
      });
      it('should allow navigation when the route does not require auth', () => {
        to.meta.noAuth = true;
        guards.globalAuthGuard(to, from, next);
        expect(next).calledWith();
      });
      it('should assume that a route that does not have a meta property requires authentication', () => {
        to = {};
        guards.globalAuthGuard(to, from, next);
        expect(next).calledWith('/');
      });
      it('should assume implicit authentication when meta propety does not specify auth', () => {
        guards.globalAuthGuard(to, from, next);
        expect(next).calledWith('/');
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
        to.meta.noAuth = true;
        guards.globalAuthGuard(to, from, next);
        expect(next).calledWith();
      });
      it('should allow navigation on secured routes', () => {
        guards.globalAuthGuard(to, from, next);
        expect(next).calledWith();
      });
    });
  });
});
