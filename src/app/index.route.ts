import { Hello } from './hello';
/** @plopInject[import] -- DO NOT REMOVE THIS COMMENT! */

/** @ngInject */
export function routerConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  Hello.routes($stateProvider);
/** @plopInject[body] -- DO NOT REMOVE THIS COMMENT! */

  $urlRouterProvider.when('', /* @ngInject */ ($state: angular.ui.IStateService) => $state.go('hello'));
  $urlRouterProvider.otherwise('/404');
}
