/**
 * seconds
 * @type {number}
 */
const waitXS  = 1000,
      waitS   = 2000,
      waitM   = 6000,
      waitL   = 10000,
      waitXL  = 25000,
      waitXXL = 60000;

/**
 * wait
 * @param driver
 * @param time - in milli seconds
 * @return {Promise}
 */
const wait = (driver, time) => driver.sleep(time);

module.exports = {
    waitXS,
    waitS,
    waitM,
    waitL,
    waitXL,
    waitXXL,
    wait
};
