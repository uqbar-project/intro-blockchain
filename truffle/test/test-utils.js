async function testRejection(callback, errorMessage) {
  try {
    await callback()
    assert.fail('Should have failed')
  } catch (e) {
    assert.equal(e.reason, errorMessage)
  }
}

module.exports = {
  testRejection,
}