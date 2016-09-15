var connection = require('../connection');

function Fantasy () {
  this.get = function (res) {
    connection.acquire(function (err, con) {
      con.query('select * from teams', function (err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.create = function (name, res) {
    connection.acquire(function (err, con) {
      con.query('insert into players set ?', name, function (err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'player creation failed'});
        } else {
          res.send({status: 0, message: 'player created successfully'});
        }
      });
    });
  };

  this.update = function (name, res) {
    connection.acquire(function (err, con) {
      con.query('update players set ? where name = ?', [name, players.name], function (err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'player update failed'});
        } else {
          res.send({status: 0, message: 'player updated successfully'});
        }
      });
    });
  };

  this.delete = function (id, res) {
    connection.acquire(function (err, con) {
      con.query('delete from players where id = ?', [id], function (err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Failed to delete'});
        } else {
          res.send({status: 0, message: 'Deleted successfully'});
        }
      });
    });
  };
}

module.exports = new Fantasy();
