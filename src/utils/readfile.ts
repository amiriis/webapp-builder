import {resolve} from 'app-root-path'

let list: any
try {
    list = require(resolve('src/core/data/sidebarMenu'));
} catch (error) {
    // Handle the error, file doesn't exist
    console.error('Error loading layoutList:', error);
}

const ReadFile = () => {
    console.log(list)

}

export default ReadFile