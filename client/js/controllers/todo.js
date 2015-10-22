angular
  .module('app')
  .controller('TodoController', ['$scope', '$state', 'Todo','createChangeStream', function($scope,
      $state, Todo,createChangeStream) {
    $scope.todos = [];

    var src = new EventSource('/api/Todos/change-stream?_format=event-source');
    var changes = createChangeStream(src);

    changes.on('data', function(update) {
      console.log(update);
    });

    /*var urlToChangeStream = '/api/Todos/change-stream?_format=event-source';
    var src = new EventSource(urlToChangeStream);
    src.addEventListener('data', function(msg) {
      var data = JSON.parse(msg.data);
      console.log(data); // the change object
    });*/

    function getTodos() {
      Todo
        .find()
        .$promise
        .then(function(results) {
          $scope.todos = results;
        });
    }
    getTodos();



    $scope.addTodo = function() {
      Todo
        .create($scope.newTodo)
        .$promise
        .then(function(todo) {
          $scope.newTodo = '';
          $scope.todoForm.content.$setPristine();
          $('.focus').focus();
          getTodos();
        });
    };

    $scope.removeTodo = function(item) {
      Todo
        .deleteById(item)
        .$promise
        .then(function() {
          getTodos();
        });
    };
  }]);
