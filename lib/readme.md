testHelpers.js contains helper function which can be used for special testing tasks for except.js.

**testExceptionMessage(message, func[, arg1, arg2, ...])**

  This function returns true if calling `func` function throws an exception with a given `message` else returns false. You can use it in tests for example like this:

```js
var helper = require('testHelper.js');

if (!helper.testExceptionMessage(message, func, arg)) {
  expect().fail();
}
```
