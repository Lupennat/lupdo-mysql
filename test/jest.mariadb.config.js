const base = require('./jest.config');
base.globals = {
    __DB__: 'mariadb'
};

base.testPathIgnorePatterns.push('mysql-kill\\.test\\.ts');

module.exports = base;
