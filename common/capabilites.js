const launchers = require('./launchers');

const getCapabilities = (args, launcher) => {
    const launcherObj = launchers.getLauncher(launcher);

    let capabilities = {
        'browserstack.user'             : 'idan',
        'browserstack.key'              : 'mor',
        'browserstack.debug'            : true,
        'project'                       : 'customer.js',
        'build'                         : `E2E ${args.production ? 'PROD' : 'DEV'} Tests`,
        'name'                          : `${args.version} for: ${args.url}`,
        'browserstack.selenium_version' : '3.5.2',
        'browserstack.console'          : 'verbose'
    };

    if (launcherObj.browserName) capabilities['browserName'] = launcherObj.browserName;
    if (launcherObj.browserName) capabilities['browser'] = launcherObj.browserName;
    if (launcherObj.browser_version) capabilities['browser_version'] = launcherObj.browser_version;
    if (launcherObj.os) capabilities['os'] = launcherObj.os;
    if (launcherObj.os_version) capabilities['os_version'] = launcherObj.os_version;
    if (launcherObj.resolution) capabilities['resolution'] = launcherObj.resolution;

    if (launcherObj.platform) capabilities['platform'] = launcherObj.platform;
    if (launcherObj.device) capabilities['device'] = launcherObj.device;


    let ip   = args && args.ip || 'localhost',
        port = args && args.port || '9393';

    capabilities['proxyEverything'] = true;
    capabilities['proxy']           = {
        'proxyType' : 'manual',
        'httpProxy' : `${ip}:${port}`
    };

    if (args.browserstack) {
        capabilities['browserstack.user'] = 'idan';
        capabilities['browserstack.key']  = 'mor';
    }

    return capabilities;
};

const getServerData = (args) => ((args && args.browserstack) ? { server : 'http://hub-cloud.browserstack.com/wd/hub' } : { server : '' });

module.exports = {
    getCapabilities,
    getServerData,
};
