import { Sample} from './../services/serviceClient';
import { GlobalConfig } from '../index.config';

export class HelloController {

  public selectedItem: string;
  public searchText: string;
  public foodInfo: Sample.FoodInfo;

  /* @ngInject */
  constructor(private ServiceClient: Sample.ServiceClient) {

  }

  public selectedItemChange(item: Sample.Food) {
    if (!item)
    {
      this.foodInfo = null;
    }
    this.ServiceClient.getFoodIdById(item.Id)
      .then(x => this.foodInfo = x.data);
  }

  public querySearch(searchText: string) {
    return this.ServiceClient.getFoodSearchBySearchText(searchText)
      .then(x => { return x.data; } );
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