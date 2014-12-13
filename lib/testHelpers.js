// testHelpers.js
var expect = require('expect.js');

function testExceptionMessage(message, func){
  var args = Array.prototype.slice.call(arguments, 2);
  try {
    func.apply(null, args);
  }
  catch(e) {
    expect(e.message).to.be(message);
    return true;
  }
  return false;
}

exports.testExceptionMessage = testExceptionMessage;
