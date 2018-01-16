const webdriver    = require('selenium-webdriver'),
      logging      = webdriver.logging,
      capabilities = require('./capabilites');

const getWebdriver = (args, launcher) => {

    let capabilitiesObj, server;

    capabilitiesObj = capabilities.getCapabilities(args, launcher);
    server          = capabilities.getServerData(args);

    let prefs = new logging.Preferences();
    prefs.setLevel(logging.Type.BROWSER, logging.Level.DEBUG);
    prefs.setLevel(logging.Type.CLIENT, logging.Level.DEBUG);
    prefs.setLevel(logging.Type.DRIVER, logging.Level.DEBUG);
    prefs.setLevel(logging.Type.PERFORMANCE, logging.Level.DEBUG);
    prefs.setLevel(logging.Type.SERVER, logging.Level.DEBUG);

    return new webdriver.Builder().usingServer(server.server).withCapabilities(capabilitiesObj).setLoggingPrefs(prefs).build();
};

module.exports = {
    getWebdriver
};
