try {
    global.WitelConfig = require('~/witel.config.json');
    console.log(WitelConfig)
} catch (error) {
    console.error('Error loading layoutList:', error);
}

export * from './components'
export * from './contexts'
export * from './hooks'
export * from './layouts'
export * from './middlewares'
export * from './utils'