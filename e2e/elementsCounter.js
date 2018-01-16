const should = require('chai').should();

const getElementsCounter = (driver) => driver.executeAsyncScript(function () {
    var callback = arguments[arguments.length - 1];
    callback(document.getElementsByTagName("*").length);
});

const run = async function (driver) {
    let elementsCounter = await getElementsCounter(driver);
    elementsCounter.should.be.above(100);
};

module.exports = {
    run
};
