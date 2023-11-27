import {resolve} from 'app-root-path'

let list: any
try {
    list = require(resolve('witel.config.json'));
} catch (error) {
    // Handle the error, file doesn't exist
    console.error('Error loading layoutList:', error);
}

export const ReadFile = () => {
    console.log(list)

}