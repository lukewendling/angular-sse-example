angular
  .module('app', [
    'lbServices',
    'ui.router', 'ls.LiveSet', 'ls.ChangeStream'
  ])
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('todo', {
          url: '',
          templateUrl: 'views/todo.html',
          controller: 'TodoController'
        });

      $urlRouterProvider.otherwise('todo');
    }]
  );
