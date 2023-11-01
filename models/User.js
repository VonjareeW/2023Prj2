const mysql = require('mysql2');

const pool = mysql.createPool ({
  host: 'localhost',
  user: 'root',
  password: 'Tommy@613',
});

class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static findByEmail(email) {
    return pool.promise().query('SELECT * FROM users WHERE email = ?', [email])
      .then(([rows]) => {
        if (rows.length === 0) {
          return null;
        }
        const row = rows[0];
        return new User(row.id, row.username, row.email, row.password);
      })
      .catch(err => {
        throw err;
      });
  }
}
module.exports = User;
