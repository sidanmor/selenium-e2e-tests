const should    = require('chai').should(),
      webdriver = require('selenium-webdriver'),
      logging   = webdriver.logging;

const getLogs = (driver) => driver.manage().logs().get(logging.Type.BROWSER);

const areLogsOK = (logs) => {
    for (let log of logs) {
        // TODO .... check your logs here ...
        //if (log.message.match(/error/)) return false;
    }
    return true;
};

const run = async function (driver) {
    let logs = await getLogs(driver);
    areLogsOK(logs).should.be.true;
};

module.exports = {
    run
};
