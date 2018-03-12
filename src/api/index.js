import EventEmitter from 'events';
import Promise from 'bluebird';
import config from '../config';
import methods from './methods';
import transports from './transports';
import { camelCase } from '../utils';
import { hash } from '../auth/ecc';
import { ops } from '../auth/serializer';

class Golos extends EventEmitter {
  constructor(options = {}) {
    super(options);
    this._setTransport(options);
    this.options = options;
    this.seqNo = 0; // used for rpc calls
    
    methods.forEach(method => {
        const methodName = method.method_name || camelCase(method.method);
        const methodParams = method.params || [];

        this[`${methodName}With`] = (options, callback) => {
            return this.send(method.api, {
                method: method.method,
                params: methodParams.map(param => options[param])
            }, callback);
        };

        this[methodName] = (...args) => {
            const options = methodParams.reduce((memo, param, i) => {
                memo[param] = args[i]; // eslint-disable-line no-param-reassign
                return memo;
            }, {});
            const callback = args[methodParams.length];
            return this[`${methodName}With`](options, callback);
        };

        this[`${methodName}WithAsync`] = Promise.promisify(this[`${methodName}With`]);
        this[`${methodName}Async`] = Promise.promisify(this[methodName]);
    });
}

_setTransport(options) {
    this.transport = new transports.ws(options);
}

start() {
    return this.transport.start();
}

stop() {
    return this.transport.stop();
}

send(api, data, callback) {
    return this.transport.send(api, data, callback);
}

setOptions(options) {
    Object.assign(this.options, options);
    this._setTransport(options);
    this.transport.setOptions(options);
}

setWebSocket(url) {
    this.setOptions({ websocket: url });
}

streamBlockNumber(mode = 'head', callback, ts = 200) {
    if (typeof mode === 'function') {
        callback = mode;
        mode = 'head';
    }
    let current = '';
    let running = true;

    const update = () => {
        if (!running) return;

        this.getDynamicGlobalPropertiesAsync()
        .then( result => {
                const blockId = mode === 'irreversible'
                    ? result.last_irreversible_block_num
                    : result.head_block_number;

                if (blockId !== current) {
                    if (current) {
                        for (let i = current; i < blockId; i++) {
                            if (i !== current) {
                                callback(null, i);
                            }
                            current = i;
                        }
                    } else {
                        current = blockId;
                        callback(null, blockId);
                    }
                }

                Promise.delay(ts).then(() => {
                    update();
                });
            },
            err => {
                callback(err);
            },
        );
    };

    update();

    return () => {
        running = false;
    };
}

streamBlock(mode = 'head', callback) {
    if (typeof mode === 'function') {
        callback = mode;
        mode = 'head';
    }

    let current = '';
    let last = '';

    const release = this.streamBlockNumber(mode, (err, id) => {
        if (err) {
            release();
            callback(err);
            return;
        }

        current = id;
        if (current !== last) {
            last = current;
            this.getBlock(current, callback);
        }
    });

    return release;
}

streamTransactions(mode = 'head', callback) {
    if (typeof mode === 'function') {
        callback = mode;
        mode = 'head';
    }

    const release = this.streamBlock(mode, (err, result) => {
        if (err) {
            release();
            callback(err);
            return;
        }

        if (result && result.transactions) {
            result.transactions.forEach(transaction => {
                callback(null, transaction);
            });
        }
    });

    return release;
}

streamOperations(mode = 'head', callback) {
    if (typeof mode === 'function') {
        callback = mode;
        mode = 'head';
    }

    const release = this.streamTransactions(mode, (err, transaction) => {
        if (err) {
            release();
            callback(err);
            return;
        }

        transaction.operations.forEach(operation => {
            callback(null, operation);
        });
    });

    return release;
}

}

// Export singleton instance
const golos = new Golos(config);
exports = module.exports = golos;
exports.Golos = Golos;
