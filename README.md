# SpendLyte Client

_A finance tracker client built with VueJS, Vuetify and Firebase_

Name | URL
:---: | :---:
Application | [https://spendlyte.com](https://spendlyte.com)
Report Repo | [https://github.com/JavaTheNutt/spendlyte_reports](https://github.com/JavaTheNutt/spendlyte_reports)
Server Repo | [https://github.com/JavaTheNutt/spendlyte_server](https://github.com/JavaTheNutt/spendlyte_server)

## Outline

This is a client application built using VueJS. The idea behind this client is to simply showcase some of the capabilities of the back-end. The main functionality of this application is to save upcoming transactions, and view summary data about these transactions.

This application is a Progressive Web Application that is designed to work offline. It adheres to Googles Material Design specification. 

## Authentication
Authentication in this application is handled by Firebase. In the client, authentication operations are outsourced to Firebase, and authentication events are triggered which this application can hook into. When the application needs to make a request to the back-end, it requests a token from Firebase. This token is then added to the headers of each request. This token is decrypted on the server to verify the identity of the user who made the request. 

## Building

### Environment Setup

In order to build this project, you will need to create a new [Firebase App](https://console.firebase.google). Then create two files in the root of this project. Call these files `.env` and `.firebaserc`. These files can be filled out as follows:

#### .env
This file is used to store environment variables that will differ across projects. These variables mostly pertain to your Firebase project

##### Firebase Client
This data can be found by opening the project on [Firebase](https://console.firebase.google.com) and clicking on the settings icon in the top left of the console. Click Project Settings and select "Add Firebase to your web app". Copy the respective values and place them in the `.env` file like this:

```dotenv
FIREBASE_API_KEY=<YOUR_DATA_HERE>
FIREBASE_AUTH_DOMAIN=<YOUR_DATA_HERE>
FIREBASE_DATABASE_UR<YOUR_DATA_HERE>
FIREBASE_PROJECT_ID=<YOUR_DATA_HERE>
FIREBASE_STORAGE_BUCKET=<YOUR_DATA_HERE>
FIREBASE_MESSAGING_SENDER_ID=<YOUR_DATA_HERE>
```
##### Cloud Functions Endpoints
These variables pertain to the endpoints that REST requests will be made to. They are mapped to the apps run in the [back-end server for this application](https://github.com/JavaTheNutt/spendlyte_server). The "BACKEND_BASE_URL" & "LOCAL_BACKEND_BASE_URL" variables pertain to the _finance_ app and the "ITEM_BASE_URL" & "LOCAL_ITEM_BASE_URL" variables pertain to the _items_ app.  Both local and remote URLs are printed to the console when running, or deploying, the back-end. Append these URL's to the `.env` file like this:
```dotenv
LOCAL_BACKEND_BASE_URL=<YOUR_DATA_HERE>
BACKEND_BASE_URL=<YOUR_DATA_HERE>
LOCAL_ITEM_BASE_URL=<YOUR_DATA_HERE>
ITEM_BASE_URL=<YOUR_DATA_HERE>
```
##### Firebase Server
These environment variables are only required if you plan on running the E2E test suite. They are used to perform operations that are outside the scope of the Client API when running E2E tests. In order to fetch this data, navigate to the project settings again. This time switch to the "SERVICE ACCOUNTS" tab and click the "GENERATE NEW PRIVATE KEY" button. This will give you a JSON download containing the required data. Append this data to the `.env` file as follows:

_Note: The E2E test suite is currently broken. This is due to changes in the layout leading up to the final submission which would have required an entire re-write of the suite. I plan to re-write the tests at a later date_

```dotenv
FIREBASE_CLIENT_EMAIL=<YOUR_DATA_HERE>
FIREBASE_PRIVATE_KEY=<YOUR_DATA_HERE>
FIREBASE_TYPE=service_account
FIREBASE_PRIVATE_KEY_ID="<YOUR_DATA_HERE>"
FIREBASE_CLIENT_ID<YOUR_DATA_HERE>
FIREBASE_AUTH_URI=<YOUR_DATA_HERE>
FIREBASE_TOKEN_URI=<YOUR_DATA_HERE>
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=<YOUR_DATA_HERE>
FIREBASE_CLIENT_X509_CERT_URL=<YOUR_DATA_HERE>
```

##### Full File
```dotenv
FIREBASE_API_KEY=<YOUR_DATA_HERE>
FIREBASE_AUTH_DOMAIN=<YOUR_DATA_HERE>
FIREBASE_DATABASE_UR<YOUR_DATA_HERE>
FIREBASE_PROJECT_ID=<YOUR_DATA_HERE>
FIREBASE_STORAGE_BUCKET=<YOUR_DATA_HERE>
FIREBASE_MESSAGING_SENDER_ID=<YOUR_DATA_HERE>
LOCAL_BACKEND_BASE_URL=<YOUR_DATA_HERE>
BACKEND_BASE_URL=<YOUR_DATA_HERE>
LOCAL_ITEM_BASE_URL=<YOUR_DATA_HERE>
ITEM_BASE_URL=<YOUR_DATA_HERE>
FIREBASE_CLIENT_EMAIL=<YOUR_DATA_HERE>
FIREBASE_PRIVATE_KEY=<YOUR_DATA_HERE>
FIREBASE_TYPE=service_account
FIREBASE_PRIVATE_KEY_ID=<YOUR_DATA_HERE>
FIREBASE_CLIENT_ID<YOUR_DATA_HERE>
FIREBASE_AUTH_URI=<YOUR_DATA_HERE>
FIREBASE_TOKEN_URI=<YOUR_DATA_HERE>
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=<YOUR_DATA_HERE>
FIREBASE_CLIENT_X509_CERT_URL=<YOUR_DATA_HERE>
```
#### .firebaserc
This file is used to tell Firebase which project it should use when deploying. The `default` field is simply filled with the same value as used for the `FIREBASE_PROJECT_ID` environment variable.
```json
{
  "projects": {
    "default": "<PROJECT_ID_HERE>"
  }
}
```

### Development Build
This project requires both [NodeJS](https://nodejs.org)(&gt; v6.0.0) and [NPM](https://npmjs.com)(&gt; v3.0.0). The `package.json` for this project comes with several scripts to speed up development workflow. To see these scripts, use `npm run` with no arguments. This should give an output similar to the following:

```bash
Lifecycle scripts included in spendlyte-client:
  start
    node build/dev-server.js
  test
    npm run unit && npm run e2e

available via `npm run-script`:
  dev
    node build/dev-server.js
  build
    node build/build.js
  prebuild
    npm run lint:fix
  e2e
    npm run e2e:no-build
  e2e:no-build
    cross-env NODE_ENV=test node test/e2e/runner
  pree2e
    npm run build
  unit
    cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run
  unit:verbose
    cross-env LOG_LEVEL=trace npm run unit
  lint
    eslint --ext .js,.vue src test/unit/specs
  lint:fix
    npm run lint -- --fix
  serve-coverage
    serve test/unit/coverage/lcov-report
  serve:prod
    npm run serve:prod:no-build
  serve:prod:no-build
    node build/prod-server.js
  preserve:prod
    npm run build
  flow
    flow start
```
In order to run this application in development mode, use `npm run dev`. This will start a small express server that will serve the application at port 8080. This server provides hot-reload, to rebuild the application on changes to the source code, and hot module replacement, to only reload pertinent modules when possible preventing full page reloads. ESLint is wired into this server, to show linting errors over the page content when applicable.  

### Production Build
To build this application for production, use the command `npm run build`. This will use [Webpack](https://webpack.js.org/) to compile and build the application. The output will be generated in `/dist`. The bundle which is generated will contain all of the assets required to run the application, split into minified chunks. This is the directory that will be uploaded to Firebase to be hosted. 

### Deployment
The first step to deploying the application is to install [firebase-tools](https://www.npmjs.com/package/firebase-tools) globally using the command `npm i -g firebase-tools`. Then run `firebase login` to login to your Firebase account. Once you are authenticated you can deploy at any time using `firebase deploy`. Make sure to run `npm run build` before deploying to ensure you are deploying the most recent version of your app.

## Technology Overview
### Application
Category | Choice | Description
---: | :---: | :---
Application Framework | [VueJS](https://vuejs.org/) | Javascript MVVM framework
State Management | [Vuex](https://vuex.vuejs.org/) | Client side state management, similar to Redux but built for VueJS
Client Side Routing | [Vue-Router](https://router.vuejs.org/en/) | Client side routing, built for VueJS
Component \ CSS Library | [Vuetify](https://vuetifyjs.com/en/) | Prebuilt Material Design components and styles
HTTP Requests | [Axios](https://github.com/axios/axios) | Javascript HTTP Client
Validation | [Vee-Validate](https://github.com/baianat/vee-validate) | Form input validation for VueJS
Date Functions | [Date-FNS](https://date-fns.org/) | Date utilities for Javascript
Client Side Storage | [LocalForage](https://github.com/localForage/localForage) | Abstraction over client side storage solutions (localStorage, WebSQL and IndexedDB)


### Infrastructure
Category | Choice | Description
---: | :---: | :---
Authentication | [Firebase Auth](https://firebase.google.com/docs/auth) | Authentication services from Firebase
Hosting | [Firebase Hosting](https://firebase.google.com/docs/hosting/) | Static file CDN providing free SSL
Database | [Cloud Firestore](https://firebase.google.com/docs/firestore/) | NoSQL collection based database with an interface that can be accessed in the client

### Testing
Category | Choice | Description
---: | :---: | :---
Test Framework | [Karma](https://karma-runner.github.io/2.0/index.html) | Run test suites across multiple browsers
Test Runner | [Mocha](https://mochajs.org/) | Javascript test runner
Assertion Framework | [Chai](http://www.chaijs.com/) | Assertion library for test assertions
Mocks \ Stubs | [Sinon](http://sinonjs.org/) | Javascript Stubbing and Mocking utility
E2E Testing | [TestCafe](https://github.com/DevExpress/testcafe) | End-to-end test runner

### Building
Category | Choice | Description
---: | :---: | :---
Bundling | [Webpack](https://webpack.js.org/) | Javascript module bundler
Package Management | [NPM](https://npmjs.org) | Node Package Manager
Build Scripts | [NPM](https://npmjs.org) | Node Package Manager
Minification | [UglifyJS](https://github.com/mishoo/UglifyJS) | Javascript minification and optimisation
Asset Pre Caching | [SW-Precache](https://github.com/GoogleChromeLabs/sw-precache) | Tool from Google for generating service worker files to pre-cache application shell
Scaffolding | [Vue-CLI](https://github.com/vuejs/vue-cli) | Command Line Interface for scaffolding VueJS apps
Type Checking | [Flow](https://flow.org/) | Javascript type checking
ES Transpilation | [Babel](https://babeljs.io/) | Transpile from ES6+ to browser compatible JS
Cross-Platform env var setting | [Cross-Env](https://www.npmjs.com/package/cross-env) | Transparently set environment variables cross platform.  



