var Assur = angular.module('Assur', ['ngSanitize', 'angular-meteor', 'ui.router', 'ngMaterial', 'ngCsv']);

Assur.config(function($mdThemingProvider) {
  /*var warnAssurPalette = $mdThemingProvider.extendPalette('red', {
    '500': '#ffea28',
    'contrastDefaultColor': 'dark'
  });
  $mdThemingProvider.definePalette('warnAssurPalette', warnAssurPalette);

  $mdThemingProvider.theme('default')
      .warnPalette('warnAssurPalette');*/

  $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('orange')
      .dark();

});

angular.module('Assur').controller('DashboardCtrl', function ($scope) {
  	Session.set('menuSelected', 0);
  
});
