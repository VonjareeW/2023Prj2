const mysql = require('mysql2');

const pool = mysql.createPool ({
    host: 'localhost',
    user: 'root',
    password: 'Tommy@613',
  });

  class Goal {
    constructor(id, title, description) {
      this.id = id;
      this.title = title;
      this.description = description;
    }

    static fetchAll() {
        return pool.promise().query('SELECT * FROM goal')
          .then(([rows]) => {
            return rows.map(row => new Goal(row.id, row.title, row.description));
          })
          .catch(err => {
            throw err;
          });
      }
    }

module.exports = Goal;