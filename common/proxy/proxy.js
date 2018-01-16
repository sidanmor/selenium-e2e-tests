const MiniProxy = require("./lib/MiniProxy.js");

let miniProxy;

let data;


const start = async (args) => {

    data = { requests : [], responses : [] };

    let port = args && args.port || '9393',
        ip   = args && args.ip || 'localhost';
    
    miniProxy = new MiniProxy({
        'port'             : args.port,
        'onBeforeRequest'  : (requestOptions) => {
            //u can change the request param here
            data.requests.push(requestOptions);

            // if you want to redirect the request to your server...
            // requestOptions.host = 'yourServerHost';
        },
        "onBeforeResponse" : function (remoteResponse) {
            // u can change the response here
            data.responses.push(remoteResponse);
        },
        "onServerError"    : function (e, req, res) {
            console.log(e);
        },
        "onRequestError"   : function (e, req, res) {
            // console.log(e);
        }
    });

    miniProxy.start();
    console.log(`proxy start ${ip}:${port}`);

    return data;
};

const close = () => new Promise((resolve, reject) => {
    miniProxy.close((err) => {
        console.log(`proxy close`);
        if (err) return reject(err);
        resolve();
    });
});

const getData = () => new Promise((resolve) => {
    process.nextTick(() => resolve(data));
});

const clearData = () => new Promise((resolve) => {
    data = { requests : [], responses : [] };
    process.nextTick(resolve);
});

module.exports = {
    start,
    close,
    getData,
    clearData
};
