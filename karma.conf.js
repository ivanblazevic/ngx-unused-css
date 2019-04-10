// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = (config) => {
    config.set({
        basePath: '',
        files: ["index.spec.js"],
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher')
        ],
        browsers: ['ChromeHeadless'],
        singleRun: true
    });
};
