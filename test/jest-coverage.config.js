const base = require('./jest.config');
base.globals = {
    __DB__: 'mysql56'
};

module.exports = base;
