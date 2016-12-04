angular.module('Assur').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      template: '<home></home>'
    })
    .state('login', {
      url: '/login',
      template: '<utilisateur-connexion></utilisateur-connexion>'
    })
    .state('prospect', {
      url: '/prospect-creation',
      template: '<prospect-creation></prospect-creation>'
    })
    .state('prospect-liste', {
      url: '/prospect-liste',
      template: '<prospect-liste></prospect-liste>'
    })
    .state('client', {
      url: '/client-liste',
      template: '<client-liste></client-liste>'
    })
    .state('client-detail', {
      url: '/client-detail/:id',
      template: '<client-detail></client-detail>'
    })
    .state('utilisateur', {
      url: '/utilisateur-liste',
      template: '<utilisateur-liste></utilisateur-liste>'
    })
    .state('immeuble-liste', {
      url: '/immeuble-liste/:id',
      template: '<immeuble-liste></immeuble-liste>'
    })
    ;

  $urlRouterProvider.otherwise("/");

});

Router.configure({
    notFoundTemplate: "notFoundTemplate"
});
