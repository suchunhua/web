'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: '10.88.10.34',
      port: '3306',
      database: 'first_dimension',
      user: 'root',
      password: '123456',
      prefix: '',
      encoding: 'UTF8MB4_GENERAL_CI' 
    },
    mongo: {

    }
  }
};