const seq = require('./connection/mysql_connection');
require('./models');

seq.authenticate().then(() => {
  console.log('MySQl server is connected completely');
}).catch( (error) => {
  console.log('MySQL server is failed to be connected. Error information is below：'  + error);
})

seq.sync({
  force: true
}).then(() => {
  console.log('The table has been synchronised into database successful');
  process.exit();
})