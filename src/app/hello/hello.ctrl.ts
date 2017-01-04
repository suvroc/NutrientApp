import { Sample } from './../services/serviceClient';
import { GlobalConfig } from '../index.config';

export class HelloController {

  public selectedItem: string;
  public searchText: string;
  public foodInfo: Sample.FoodInfo;
  public weights: Sample.FoodWeight[];
  public selectedWeight: Sample.FoodWeight;
  public amount: number;

  private defaultWeight: Sample.FoodWeight = {
    Description: '100 g',
    Amount: 1,
    GramWeight: 100
  };



  /* @ngInject */
  constructor(private ServiceClient: Sample.ServiceClient) {
    this.weights = [this.defaultWeight];

    this.selectedWeight = this.defaultWeight;
  }

  public getFactor() {
    if (!this.amount || !this.selectedWeight) {
      return 1;
    }
    return this.amount * this.selectedWeight.GramWeight / 100;
  }

  public selectedItemChange(item: Sample.Food) {
    if (!item) {
      this.foodInfo = null;
      return;
    }
    this.ServiceClient.getFoodIdById(item.Id)
      .then(x => this.foodInfo = x.data);

    this.ServiceClient.getFoodByFoodIdWeight(item.Id)
      .then(x => this.weights = [this.defaultWeight].concat(x.data));
  }

  public querySearch(searchText: string) {
    return this.ServiceClient.getFoodSearchBySearchText(searchText)
      .then(x => { return x.data; });
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