import assert from 'assert'
import golos from '../src'

import { camelCase } from '../src/utils'
import { methods_v17 } from './methods_by_version'

describe('golos.methods', () => {

    it('has all generated methods', () => {
        let m16 = [
            "getOrderBook_16",
            "getOpenOrders_16",
            "getTicker_16",
            "getTradeHistory_16",
            "getRecentTrades_16"
        ]

        const m17 = methods_v17
            .map( m => `${camelCase(m)}`)
            .concat(...m16)
            .sort()

        let libMethods = Object.keys(golos.api.Golos.prototype)
            .filter( m => !m.endsWith('With'))
            .filter( m => !m.endsWith('Async'))
            .sort()
        
        assert.equal(libMethods.length, m17.length)
        assert.deepEqual(libMethods, m17)
    })

})
