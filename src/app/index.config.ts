/** @ngInject */
export function basicConfig($logProvider: angular.ILogProvider, toastrConfig: ng.toastr.IToastrConfig) {
  // enable log
  $logProvider.debugEnabled(GlobalConfig.appConfig.loggingEnabled);
  // set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = false;
  toastrConfig.preventOpenDuplicates = false;
  toastrConfig.progressBar = false;
}

export class ConfigTemplate {
  public baseUrl: string;
  public loggingEnabled: boolean;
  public environment: string;
  public branch: string;
  public releaseNumber: string;
  public machineName: string;
}

function loadDevConfig() : ConfigTemplate {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "/app-config.json", false);
  xmlHttp.send(null);

  let config : ConfigTemplate = null;
  if(xmlHttp && xmlHttp.status === 200) {
    const response = xmlHttp.responseText;
    config = <ConfigTemplate>JSON.parse(response);
  } else {
    config = { // really does not matter. It's only for unit tests afterall.
      baseUrl: '/api',
      loggingEnabled: true,
      environment: "localhost",
      branch: "dev",
      releaseNumber: "0.0.1",
      machineName: "PLWAW0000"
    };
  }

  return config;
}

export class GlobalConfig {
  public static moduleName: string = 'appName';
  public static appConfig: ConfigTemplate;

  public static dependencies: Array<string> = [
    'templates', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'pascalprecht.translate',
    'ngMaterial'
  ];

  public static jasmineDeps() {
    return this.dependencies
      .concat([this.moduleName])
      .map(d => beforeEach(angular.mock.module(d)));
  }

  public static loadConfigs = () => {
    const defaultConfig = {
      baseUrl: '#{application.url}',
      loggingEnabled: '#{application.logEnabled}',
      environment: "#{application.environment}",
      branch: "#{application.branch}",
      releaseNumber: "#{application.releaseNumber}",
      machineName: "#{application.machineName}"
    };

    let config : ConfigTemplate = null;

    /**
     * If Octopus did not replace its own configs then
     * it's probably a dev environment. So use app-config.json strategy
     */
    if(defaultConfig.baseUrl.indexOf('#') === 0) {
      config = loadDevConfig();
    } else {
      config = {
        baseUrl: defaultConfig.baseUrl,
        loggingEnabled: defaultConfig.loggingEnabled.toLowerCase() === 'true',
        environment: defaultConfig.environment,
        branch: defaultConfig.branch,
        releaseNumber: defaultConfig.releaseNumber,
        machineName: defaultConfig.machineName
      };
    }

    GlobalConfig.appConfig = config;
  }
}
