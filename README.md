# jest-matcher-redux-saga
Jest matcher for redux-saga


# Install
`yarn add --dev jest-matcher-redux-saga`

# Global set up of the testing framework
- Open your jest.config.js file and enable a setup module
```javascript
{
  ...
  setupTestFrameworkScriptFile: './jest.setup.js'
  ...
}
```

- Open your jest.setup.js file and extend the expect API

ES6
```javascript
import toYield from 'jest-matcher-redux-saga';

expect.extend({ toYield });
```
CommonJS
```javascript
const toYield = require('jest-matcher-redux-saga').default;

expect.extend({ toYield });
```
