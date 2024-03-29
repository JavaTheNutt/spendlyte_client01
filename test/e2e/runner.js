require('dotenv').config();
process.env.NODE_ENV = 'test';
process.env.PORT     = '9090';
var server           = require('../../build/prod-server');
var createTestCafe   = require('testcafe');
var testcafe         = null;
var glob             = require('glob');
var strippedKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
const admin = require('firebase-admin');
// fixme: travis build failing. see https://stackoverflow.com/questions/44360792/unable-to-set-rsa-private-key-as-config-var
admin.initializeApp({
  credential: admin.credential.cert({
    'type': process.env.FIREBASE_TYPE,
    'project_id': process.env.FIREBASE_PROJECT_ID,
    'private_key_id': process.env.FIREBASE_PRIVATE_KEY_ID,
    'private_key': strippedKey,
    'client_email': process.env.FIREBASE_CLIENT_EMAIL,
    'client_id': process.env.FIREBASE_CLIENT_ID,
    'auth_uri': process.env.FIREBASE_AUTH_URI,
    'token_uri': process.env.FIREBASE_TOKEN_URI,
    'auth_provider_x509_cert_url': process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    'client_x509_cert_url': process.env.FIREBASE_CLIENT_X509_CERT_URL
  }),
  databaseURL: JSON.stringify(process.env.FIREBASE_DATABASE_URL)
});
const testFiles = glob.sync('test/e2e/specs/*.js');
server.ready.then(() => {
  console.log('server ready');
  createTestCafe('localhost').then(tc => {
    console.log('test cafe instance created');
    testcafe     = tc;
    const runner = testcafe.createRunner();
    const takeScreenshots = !process.env.TRAVIS;
    console.log('runner created');
    console.log('taking screenshots?', takeScreenshots);
    if (takeScreenshots) {
      runner.screenshots('reports/screenshots/', true);
    }
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
