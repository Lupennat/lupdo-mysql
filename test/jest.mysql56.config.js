const base = require('./jest.config');
base.globals = {
    __DB__: 'mysql56'
};

base.testPathIgnorePatterns.push('mysql-kill\\.test\\.ts');

module.exports = base;
