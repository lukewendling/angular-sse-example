var es = require('event-stream');
module.exports = function(app) {

  app.models.Todo.createChangeStream(function(err, changes) {
    changes.pipe(es.stringify()).pipe(process.stdout);
  });

  app.models.Todo.create({
    "content": "watched"
  });
};
