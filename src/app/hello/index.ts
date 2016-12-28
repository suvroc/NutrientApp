export * from './hello.ctrl';

import { GlobalConfig } from '../index.config';
import { HelloComponent } from './hello.ctrl';

export class Hello {
  public static bootstrap() {
    angular.module(GlobalConfig.moduleName)
      .component('hello', new HelloComponent());
  }

  public static routes($stateProvider: angular.ui.IStateProvider) {
    $stateProvider
      .state('hello', {
        url: '/',
        template: '<hello class="container hello-container"></hello>'
      });
  }
}
