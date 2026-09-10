module.exports = {
    collectCoverage: true,

    collectCoverageFrom: [
        'src/**/*.js'
    ],

    coverageThreshold: {
        global: {
            lines: 90,
            statements: 90,
            functions: 90,
            branches: 90
        }
    }
};