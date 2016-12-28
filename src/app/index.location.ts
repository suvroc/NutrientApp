/** @ngInject */
export function locationConfig($locationProvider: ng.ILocationProvider) {
  $locationProvider.hashPrefix("");
}
