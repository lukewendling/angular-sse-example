angular
  .module('app')
  .controller('TodoController', ['$scope', 'Todo', 'createChangeStream', 'LiveSet',
    function($scope, Todo, createChangeStream, LiveSet) {
      $scope.todos = [];

      var src = new EventSource('/api/Todos/change-stream?_format=event-source');
      var changes = createChangeStream(src);
      var todoSet;

      function getTodos() {
        Todo
          .find()
          .$promise
          .then(function(todos) {
            todoSet = new LiveSet(todos, changes);
            $scope.todos = todoSet.toLiveArray();
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
