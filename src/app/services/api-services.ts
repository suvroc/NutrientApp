/* tslint:disable */

export class ApiConfig {
    constructor(public baseUrl: string, public jsonParseReviver: (key: string, value: any) => any = undefined) {
    }
}

export class SampleCountryService {
    private baseUrl: string = undefined;
    private http: ng.IHttpService = null;
    private jsonParseReviver: (key: string, value: any) => any = undefined;

	 /* @ngInject */
    constructor($http: ng.IHttpService, ApiConfig: ApiConfig) {
        this.http = $http;
        this.baseUrl = ApiConfig.baseUrl !== undefined ? ApiConfig.baseUrl : "http://octopusdeploy.britishcouncil.org:333";
        this.jsonParseReviver = ApiConfig.jsonParseReviver;
    }

    /**
     * @return OK
     */
    get(id: number): ng.IPromise<CountryViewModel> {
        var url = this.baseUrl + "/api/SampleCountry/{id}";

        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url = url.replace("{id}", encodeURIComponent("" + id));

        var content = "";

        return this.http({
            url: url,
            method: "Get",
            data: content,
            transformResponse: [],
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet(response);
        });
    }

    private processGet(response: any) {
        var data = response.data;
        var status = response.status;

        if (status === 200) {
            var result200: CountryViewModel = null;
            var resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
            result200 = resultData200 ? CountryViewModel.fromJS(resultData200) : null;
            return result200;
        }
        else
        {
            throw "error_no_callback_for_the_received_http_status";
        }
    }

    /**
     * @return OK
     */
    getAll(): ng.IPromise<CountryViewModel[]> {
        var url = this.baseUrl + "/api/SampleCountry";

        var content = "";

        return this.http({
            url: url,
            method: "Get",
            data: content,
            transformResponse: [],
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGetAll(response);
        });
    }

    private processGetAll(response: any) {
        var data = response.data;
        var status = response.status;

        if (status === 200) {
            var result200: CountryViewModel[] = null;
            var resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(CountryViewModel.fromJS(item));
            }
            return result200;
        }
        else
        {
            throw "error_no_callback_for_the_received_http_status";
        }
    }
}

export class TypeScriptClientService {
    private baseUrl: string = undefined;
    private http: ng.IHttpService = null;
    private jsonParseReviver: (key: string, value: any) => any = undefined;

	 /* @ngInject */
    constructor($http: ng.IHttpService, ApiConfig: ApiConfig) {
        this.http = $http;
        this.baseUrl = ApiConfig.baseUrl !== undefined ? ApiConfig.baseUrl : "http://octopusdeploy.britishcouncil.org:333";
        this.jsonParseReviver = ApiConfig.jsonParseReviver;
    }

    /**
     * @return OK
     */
    post(request: any): ng.IPromise<ClientViewModel> {
        var url = this.baseUrl + "/api/TypeScriptClient?";

        if (request === undefined || request === null)
            throw new Error("The parameter 'request' must be defined and cannot be null.");
        else
            url += "request=" + encodeURIComponent("" + request) + "&";

        var content = "";

        return this.http({
            url: url,
            method: "Post",
            data: content,
            transformResponse: [],
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processPost(response);
        });
    }

    private processPost(response: any) {
        var data = response.data;
        var status = response.status;

        if (status === 200) {
            var result200: ClientViewModel = null;
            var resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
            result200 = resultData200 ? ClientViewModel.fromJS(resultData200) : null;
            return result200;
        }
        else
        {
            throw "error_no_callback_for_the_received_http_status";
        }
    }
}

export class CountryViewModel {
    id: number;
    name: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.id = data["Id"] !== undefined ? data["Id"] : null;
            this.name = data["Name"] !== undefined ? data["Name"] : null;
        }
    }

    static fromJS(data: any): CountryViewModel {
        return new CountryViewModel(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["Id"] = this.id !== undefined ? this.id : null;
        data["Name"] = this.name !== undefined ? this.name : null;
        return data;
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new CountryViewModel(JSON.parse(json));
    }
}

export class ClientViewModel {
    content: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.content = data["Content"] !== undefined ? data["Content"] : null;
        }
    }

    static fromJS(data: any): ClientViewModel {
        return new ClientViewModel(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["Content"] = this.content !== undefined ? this.content : null;
        return data;
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new ClientViewModel(JSON.parse(json));
    }
}

export interface IApiConfig {
    baseUrl: string;
}

export class ApiServices {
    public static bootstrap(moduleName: string, baseUrl: string) {
        angular.module(moduleName)
            .service('ApiConfig', () => new ApiConfig(baseUrl, null))
			.service('SampleCountryService', SampleCountryService)
			.service('TypeScriptClientService', TypeScriptClientService)
			;
    }
}