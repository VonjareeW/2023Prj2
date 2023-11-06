const mysql = require('mysql2');

const pool = mysql.createPool ({
    host: 'localhost',
    user: 'root',
    password: 'Tommy@613',
  });

  class Event {
    constructor(id, title, description) {
      this.id = id;
      this.title = title;
      this.description = description;
    }

    static fetchAll() {
      return pool.promise()
      .query('SELECT * FROM event')
      .then(([rows]) => {
        return rows.map(row => new Event(row.id, row.title, row.description));
      })
      .catch(err => {
        throw err;
      });
      }
    }

module.exports = Event;

//const eventService = require('../services/eventService');
//router.get('/', (req, res) => {
  // Handle the logic to fetch and display all events here
  //Event.fetchAll()
    //.then(events => {
      //res.json({ events });
    //})
    //.catch(err => {
      //res.status(500).json({ error: err.message });
    //});
//});