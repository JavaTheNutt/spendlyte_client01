process.env.NODE_ENV = 'test';
process.env.PORT     = '9090';
var server           = require('../../build/dev-server');
var createTestCafe   = require('testcafe');
var testcafe         = null;
var glob             = require('glob');

const testFiles = glob.sync('test/e2e/specs/*.js');
server.ready.then(() => {
  createTestCafe('localhost').then(tc => {
    testcafe     = tc;
    const runner = testcafe.createRunner();
    return runner.src(testFiles).browsers(['chrome']).run();
  }).then(failedCount => {
    console.log(`tests failed: ${failedCount}`);
    testcafe.close();
    server.close();
    process.exit(failedCount > 0 ? 888 : 0);
  }).catch(err => {
    console.log(`error while running tests: ${err}`);
    server.close();
    process.exit(999);
  });
});
