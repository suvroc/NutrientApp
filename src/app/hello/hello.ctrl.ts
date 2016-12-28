import { Sample} from './../services/serviceClient';
import { GlobalConfig } from '../index.config';

export class HelloController {
  public version: String;
  public foods: Sample.Food[];

  /* @ngInject */
  constructor(private ServiceClient: Sample.ServiceClient) {
    this.version = "0.1";

    this.ServiceClient.getFoodSearchBySearchText('corn')
      .then(x => this.foods = x.data);
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