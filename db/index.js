const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  host:'localhost',
  database: 'midterm',
  password: 'labber',
  port: 5432
});


module.exports = {
  query(text, params, isSpecific = false) {
    const start = Date.now();
    return pool.query(text, params).then((res) => {
      const duration = Date.now() - start;
      console.log('executed query', {text, duration, rows: res.rowCount});
      if (isSpecific) {
        return res.rows[0];
      } else {
        return res.rows;
      }

    }).catch((err) => {
      return err.message;
    });
  }
};
