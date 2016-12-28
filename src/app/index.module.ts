import { basicConfig, GlobalConfig } from './index.config';
import { routerConfig } from './index.route';
import { locationConfig } from './index.location';
import { ComponentLibrary } from './components';

import { Hello } from './hello';
/** @plopInject[import] -- DO NOT REMOVE THIS COMMENT! */

declare const moment: moment.MomentStatic;

module app {
  'use strict';

  angular.module('templates', []);

  GlobalConfig.loadConfigs();

  angular.module(GlobalConfig.moduleName, GlobalConfig.dependencies)
    .constant('moment', moment)
    .config(basicConfig)
    .config(routerConfig)
    .config(locationConfig)
    .constant('appConfig', GlobalConfig.appConfig);

  //ApiServices.bootstrap(GlobalConfig.moduleName, GlobalConfig.appConfig.baseUrl);

  ComponentLibrary.bootstrap();

  Hello.bootstrap();
  /** @plopInject[body] -- DO NOT REMOVE THIS COMMENT! */
}
