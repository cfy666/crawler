const seq = require('../connection/mysql_connection'),
      { STRING, INT } = require('../../config/db_type_config');

const CourseTab = seq.define('coure_tab', {
  cid: {
    comment: 'course category ID',
    type: INT,
    allowNull: false,
    unique: true
  },
  title: {
    comment: 'course tab item title text',
    type: STRING,
    allowNull: false
  }
});

module.exports = CourseTab;