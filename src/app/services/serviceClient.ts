export module Sample {
    "use strict";
    
    /*Food*/
    export interface Food  {
    
        /**/
        Id : number;
    
        /**/
        Name : string;
    
    }
    
    /*FoodInfo*/
    export interface FoodInfo  {
    
        /**/
        ShortDescription : string;
    
        /**/
        LongDescription : string;
    
        /**/
        CommonName : string;
    
        /**/
        Nutrients : FoodNutrientData[];
    
    }
    
    /*FoodNutrientData*/
    export interface FoodNutrientData  {
    
        /**/
        Name : string;
    
        /**/
        TagName : string;
    
        /**/
        Value : number;
    
    }



    export class ServiceClient {
        private baseUri: string;
        private hostName: string;
        private scheme: string;
    
        /* @ngInject */
        constructor(
            private $http: angular.IHttpService
        ) {
            this.hostName = 'nutrientswebapi20161229020551.azurewebsites.net';
            this.scheme = 'https';
            this.baseUri = this.scheme + '://' + this.hostName ;
            debugger;
        }
    
        /**
        * 
        * @param { string } searchText 
        * @return { any } 
        */
        getFoodSearchBySearchText(
                searchText: string,
            canceller?: angular.IDeferred<any>
        ) : angular.IHttpPromise<Food[]> {
    
            var uri = this.baseUri + '/Food/Search/' + String(searchText);
    
            var httpRequestParams: any = {
                method: 'GET',
                url: uri,
                json: true,
                params: {
                },
                headers: {
                }
            };
    
    
            if (canceller){
                httpRequestParams.timeout = canceller.promise;
            }
    
    
            return this.$http(httpRequestParams);
        }
    
        /**
        * 
        * @param { string } searchText 
        * @return { any } 
        */
        getFoodBySearchText(
                searchText: string,
            canceller?: angular.IDeferred<any>
        ) : angular.IHttpPromise<FoodInfo[]> {
    
            var uri = this.baseUri + '/Food/' + String(searchText);
    
            var httpRequestParams: any = {
                method: 'GET',
                url: uri,
                json: true,
                params: {
                },
                headers: {
                }
            };
    
    
            if (canceller){
                httpRequestParams.timeout = canceller.promise;
            }
    
    
            return this.$http(httpRequestParams);
        }
    
        /**
        * 
        * @param { number } id 
        * @return { any } 
        */
        getFoodIdById(
                id: number,
            canceller?: angular.IDeferred<any>
        ) : angular.IHttpPromise<FoodInfo> {
    
            var uri = this.baseUri + '/Food/Id/' + String(id);
    
            var httpRequestParams: any = {
                method: 'GET',
                url: uri,
                json: true,
                params: {
                },
                headers: {
                }
            };
    
    
            if (canceller){
                httpRequestParams.timeout = canceller.promise;
            }
    
    
            return this.$http(httpRequestParams);
        }
    
        /**
        * 
        * @return { any } 
        */
        postFoodTest(
            canceller?: angular.IDeferred<any>
        ) : angular.IHttpPromise<number> {
    
            var uri = this.baseUri + '/Food/Test';
    
            var httpRequestParams: any = {
                method: 'POST',
                url: uri,
                json: true,
                params: {
                },
                headers: {
                }
            };
    
    
            if (canceller){
                httpRequestParams.timeout = canceller.promise;
            }
    
    
            return this.$http(httpRequestParams);
        }
    
    }
}
