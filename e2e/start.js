const commandLineArgs = require('command-line-args'),
      webdriver       = require('../common/webdriver'),
      proxy           = require('../common/proxy/proxy'),
      common          = require('../common/common'),
      config          = require('../common/config');

try {
    const divider = '╺━━━━━━━━━━━━━━━━━━━๑۩۩๑━━━━━━━━━━━━━━━━━━━━╸';

    let start         = Date.now();
    const printHeader = function () {
        console.log(`┏${divider}┓`);
        console.log('┃              Starting E2E Tests              ┃');
        console.log(`┏${divider}┓`);
        console.log(`<--- Tests started at ${new Date()} --->`);
    };

    const printFooter = function () {
        console.log(`<--- Tests ended at ${new Date()}, after ${(Date.now() - start) / 1000} seconds --->`);
        console.log(divider);
    };

    printHeader();

    const optionDefinitions = [
              { name : 'launchers', alias : 'l', type : String, multiple : true },
              { name : 'browserstack', alias : 'b', type : Boolean },
              { name : 'production', alias : 'p', type : Boolean },
              { name : 'url', alias : 'u', type : String },
              { name : 'version', alias : 'v', type : String },
              { name : 'port', alias : 's', type : String },
              { name : 'ip', alias : 'k', type : String },
              { name : 'test', alias : 't', type : String }
          ],
          args              = commandLineArgs(optionDefinitions);

    (async function () {
        try {

            // get the test configurations
            let testConf = config[args.test || 'full'];

            // set the test modules
            let testModules = testConf.testModules.map(m => require(m));

            // start the proxy server
            await proxy.start(args);

            for (let i = 0, leni = args.launchers.length; i < leni; i++) {
                console.log(divider);
                console.log('Launcher: ' + args.launchers[i] + (args.browserstack ? ' (Browserstack) ' : ' (Local) '));

                let driver;
                try {
                    driver = await webdriver.getWebdriver(args, args.launchers[i]);
                    console.log();
                    console.log(`Start E2E Tests for ${args.url}`);

                    await driver.get(args.url);

                    for (let module of testModules) {
                        if (module.beforeRun) await module.beforeRun(driver, proxy);
                    }

                    await common.wait(driver, testConf.timeToWait);

                    for (let module of testModules) {
                        if (module.run) await module.run(driver, proxy);
                    }

                    if (driver) await driver.quit();
                } catch (err) {
                    console.log(err);
                    if (driver) await driver.quit();
                    process.exit(1);
                }
            }

            // close the proxy server
            await proxy.close();
            printFooter();
            process.exit(0);
        } catch (err) {
            console.log(err);
            process.exit(1);
        }
    })();
} catch (err) {
    console.log(err);
    process.exit(1);
}
