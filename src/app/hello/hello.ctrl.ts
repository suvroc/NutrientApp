import { GlobalConfig } from '../index.config';

export class HelloController {
  public version: String;

  /* @ngInject */
  constructor() {
    this.version = "0.1";
  }
}

export class HelloComponent implements ng.IComponentOptions {
  public bindings: any;
  public controller: any;
  public templateUrl: string;
  public controllerAs: string;

  /** @ngInject */
  constructor() {
    this.bindings = {};
    this.controller = HelloController;
    this.templateUrl = 'app/hello/hello.html';
    this.controllerAs = 'vm';
  }
}