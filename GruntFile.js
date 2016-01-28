/* global process */
module.exports = function(grunt) {
    var browsers = [{
        browserName: "firefox",
        version: "19",
        platform: "XP"
    }, {
        browserName: "googlechrome",
        version: "46",
        platform: "linux"
    }, {
        browserName: "internet explorer",
        platform: "WIN8",
        version: "10"
    }, {
        browserName: "internet explorer",
        platform: "WIN7",
        version: "9"
    }, {
        browserName: "chrome",
        platform: "Windows 8.1",
        version: "dev"
    }, {
        browserName: "chrome",
        platform: "Windows 7",
        version: "beta"
    }, {
        browserName: "safari",
        platform: "Windows 7",
        version: "5.1"
    }, {
        browserName: "iphone",
        platform: "OS X 10.10",
        version: "9.2",
        deviceName: "iPhone 6 Plus",
        deviceOrientation: 'portrait'
    }, {
        browserName: "iphone",
        platform: "OS X 10.10",
        version: "9",
        deviceName: "iPhone 6 Plus",
        deviceOrientation: 'portrait'
    }, {
        browserName: "android",
        platform: "Linux",
        version: "4.4",
        deviceName: "Google Nexus 7 HD Emulator",
        deviceOrientation: 'portrait'
    }, {
        browserName: "safari",
        platform: "OS X 10.11",
        version: "9.0"
    }, {
        browserName: "firefox",
        platform: "Windows 10",
        version: "beta"
    }, {
        browserName: "firefox",
        platform: "Windows 10",
        version: "42.0"
    }];
 
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    base: "",
                    port: 9999
                }
            }
        },
        'saucelabs-qunit': {
            all: {
                options: {
                    urls: ["http://localhost:8080/qunit/index.html"],
                    tunnelTimeout: 5,
                    build: process.env.TRAVIS_BUILD_NUMBER,
                    concurrency: 3,
                    browsers: browsers,
                    testname: "qunit tests",
                    tags: ["master"]
                }
            }
        },
        watch: {}
    });
 
    // Loading dependencies
    // for (var key in grunt.file.readJSON("package.json").devDependencies) {
    //     if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
    // }
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-saucelabs');
 
    //grunt.registerTask("dev", ["connect"]);
    grunt.registerTask("test", ["connect", "saucelabs-qunit"]);
};