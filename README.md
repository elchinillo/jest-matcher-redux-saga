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
# Usage

saga.js

```javascript
function worker(action) {
  ...
}

function foo(bar) {
  ...
}

function* saga() {
  yield delay(5000);
  yield delay(5000);
  const val = yield call(foo, 'bar');
  yield put(actionCreator(val));

  yield takeLatest('SET_ACTION', worker);
}
```
test.js

```javascript
import { skip, step, done } from 'jest-matcher-redux-saga';
import { delay } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

test('toYield', () => {
  expect(saga()).toYield([
    skip(2),
    call(foo, 'bar'),
    step('someValue', put(actionCreator('someValue'))),
    takeLatest('SET_ACTION', worker),
    done()
  ]);
});
```
