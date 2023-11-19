const path = require('path');

module.exports = {
    entry: './src/contexts/toast.js', // فایل ورودی اصلی پکیج شما
    output: {
        filename: 'toast.js', // نام فایل خروجی
        path: path.resolve(__dirname, 'dist'), // مسیر فایل خروجی
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    },
                },
            },
        ],
    },
    target: 'node',
    resolve: {
        extensions: ['.js', '.jsx'], // تعیین پسوند فایل‌های JS
    },
};