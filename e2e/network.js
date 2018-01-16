const should = require('chai').should(),
      common = require('../common/common');

const run = async function (driver, proxy) {
    let networkDataA   = await proxy.getData();
    let myHostRequests = networkDataA.requests.filter(r => (r.host === 'myHost'));
    myHostRequests.length.should.be.above(0);
};

const beforeRun = async function (driver, proxy) {
    await common.wait(driver, common.waitM);
};

module.exports = {
    run,
    beforeRun : beforeRun
};
