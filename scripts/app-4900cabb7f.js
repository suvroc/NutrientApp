!function e(t,n,o){function i(a,l){if(!n[a]){if(!t[a]){var s="function"==typeof require&&require;if(!l&&s)return s(a,!0);if(r)return r(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[a]={exports:{}};t[a][0].call(u.exports,function(e){var n=t[a][1][e];return i(n?n:e)},u,u.exports,e,t,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(e,t,n){"use strict";var o=e("../index.config"),i=function(){function e(){}return e.bootstrap=function(){angular.module(o.GlobalConfig.moduleName)},e}();n.ComponentLibrary=i},{"../index.config":4}],2:[function(e,t,n){"use strict";var o=function(){function e(e){this.ServiceClient=e,this.defaultWeight={Description:"100 g",Amount:1,GramWeight:100},this.weights=[this.defaultWeight],this.selectedWeight=this.defaultWeight}return e.$inject=["ServiceClient"],e.prototype.getFactor=function(){return this.amount&&this.selectedWeight?this.amount*this.selectedWeight.GramWeight/100:1},e.prototype.selectedItemChange=function(e){var t=this;return e?(this.ServiceClient.getFoodIdById(e.Id).then(function(e){return t.foodInfo=e.data}),void this.ServiceClient.getFoodByFoodIdWeight(e.Id).then(function(e){return t.weights=[t.defaultWeight].concat(e.data)})):void(this.foodInfo=null)},e.prototype.querySearch=function(e){return this.ServiceClient.getFoodSearchBySearchText(e).then(function(e){return e.data})},e}();n.HelloController=o;var i=function(){function e(){this.bindings={},this.controller=o,this.templateUrl="app/hello/hello.html",this.controllerAs="vm"}return e}();n.HelloComponent=i},{}],3:[function(e,t,n){"use strict";function o(e){for(var t in e)n.hasOwnProperty(t)||(n[t]=e[t])}o(e("./hello.ctrl"));var i=e("../index.config"),r=e("./hello.ctrl"),a=function(){function e(){}return e.bootstrap=function(){angular.module(i.GlobalConfig.moduleName).component("hello",new r.HelloComponent)},e.routes=function(e){e.state("hello",{url:"/",template:'<hello class="container hello-container"></hello>'})},e}();n.Hello=a},{"../index.config":4,"./hello.ctrl":2}],4:[function(e,t,n){"use strict";function o(e,t){e.debugEnabled(a.appConfig.loggingEnabled),t.allowHtml=!0,t.timeOut=3e3,t.positionClass="toast-top-right",t.preventDuplicates=!1,t.preventOpenDuplicates=!1,t.progressBar=!1}function i(){var e=new XMLHttpRequest;e.open("GET","/app-config.json",!1),e.send(null);var t=null;if(e&&200===e.status){var n=e.responseText;t=JSON.parse(n)}else t={baseUrl:"/api",loggingEnabled:!0,environment:"localhost",branch:"dev",releaseNumber:"0.0.1",machineName:"PLWAW0000"};return t}o.$inject=["$logProvider","toastrConfig"],n.basicConfig=o;var r=function(){function e(){}return e}();n.ConfigTemplate=r;var a=function(){function e(){}return e.jasmineDeps=function(){return this.dependencies.concat([this.moduleName]).map(function(e){return beforeEach(angular.mock.module(e))})},e.moduleName="appName",e.dependencies=["templates","ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ui.bootstrap","toastr","pascalprecht.translate","ngMaterial"],e.loadConfigs=function(){var t={baseUrl:"#{application.url}",loggingEnabled:"#{application.logEnabled}",environment:"#{application.environment}",branch:"#{application.branch}",releaseNumber:"#{application.releaseNumber}",machineName:"#{application.machineName}"},n=null;n=0===t.baseUrl.indexOf("#")?i():{baseUrl:t.baseUrl,loggingEnabled:"true"===t.loggingEnabled.toLowerCase(),environment:t.environment,branch:t.branch,releaseNumber:t.releaseNumber,machineName:t.machineName},e.appConfig=n},e}();n.GlobalConfig=a},{}],5:[function(e,t,n){"use strict";function o(e){e.hashPrefix("")}o.$inject=["$locationProvider"],n.locationConfig=o},{}],6:[function(e,t,n){"use strict";var o,i=e("./services/serviceClient"),r=e("./index.config"),a=e("./index.route"),l=e("./index.location"),s=e("./components"),c=e("./hello");!function(e){angular.module("templates",[]),r.GlobalConfig.loadConfigs(),angular.module(r.GlobalConfig.moduleName,r.GlobalConfig.dependencies).constant("moment",moment).config(r.basicConfig).config(a.routerConfig).config(l.locationConfig).constant("appConfig",r.GlobalConfig.appConfig).service("ServiceClient",i.Sample.ServiceClient),s.ComponentLibrary.bootstrap(),c.Hello.bootstrap()}(o||(o={}))},{"./components":1,"./hello":3,"./index.config":4,"./index.location":5,"./index.route":7,"./services/serviceClient":8}],7:[function(e,t,n){"use strict";function o(e,t){i.Hello.routes(e),t.when("",["$state",function(e){return e.go("hello")}]),t.otherwise("/404")}o.$inject=["$stateProvider","$urlRouterProvider"];var i=e("./hello");n.routerConfig=o},{"./hello":3}],8:[function(e,t,n){"use strict";var o;!function(e){var t=function(){function e(e){this.$http=e,this.hostName="nutrientswebapi20161229020551.azurewebsites.net",this.scheme="http",this.baseUri=this.scheme+"://"+this.hostName}return e.$inject=["$http"],e.prototype.getFoodSearchBySearchText=function(e,t){var n=this.baseUri+"/Food/Search/"+String(e),o={method:"GET",url:n,json:!0,params:{},headers:{}};return t&&(o.timeout=t.promise),this.$http(o)},e.prototype.getFoodBySearchText=function(e,t){var n=this.baseUri+"/Food/"+String(e),o={method:"GET",url:n,json:!0,params:{},headers:{}};return t&&(o.timeout=t.promise),this.$http(o)},e.prototype.getFoodIdById=function(e,t){var n=this.baseUri+"/Food/Id/"+String(e),o={method:"GET",url:n,json:!0,params:{},headers:{}};return t&&(o.timeout=t.promise),this.$http(o)},e.prototype.getFoodByFoodIdWeight=function(e,t){var n=this.baseUri+"/Food/"+String(e)+"/Weight",o={method:"GET",url:n,json:!0,params:{},headers:{}};return t&&(o.timeout=t.promise),this.$http(o)},e.prototype.postFoodTest=function(e){var t=this.baseUri+"/Food/Test",n={method:"POST",url:t,json:!0,params:{},headers:{}};return e&&(n.timeout=e.promise),this.$http(n)},e}();e.ServiceClient=t}(o=n.Sample||(n.Sample={}))},{}]},{},[6]),angular.module("templates").run(["$templateCache",function(e){e.put("app/hello/hello.html",'<article class=content><h1>Choose food:</h1><md-content class=searchRow><md-autocomplete class=foodSelect md-floating-label="Find food" md-selected-item=vm.selectedItem md-search-text=vm.searchText md-selected-item-change=vm.selectedItemChange(item) md-items="item in vm.querySearch(vm.searchText)" md-min-length=3 placeholder="Find a food" md-item-text=item.Name><md-item-template><span md-highlight-text=vm.searchText md-highlight-flags=^i>{{item.Name}}</span></md-item-template><md-not-found>No states matching "{{vm.searchText}}" were found.<!--<a ng-click="ctrl.newState(ctrl.searchText)">Create a new one!</a>--></md-not-found></md-autocomplete><md-input-container class="md-block amountSelect" flex-gt-sm><label>Amount</label><input ng-model=vm.amount type=number></md-input-container><md-select ng-model=vm.selectedWeight class=weightSelect><md-option ng-repeat="weight in vm.weights" ng-value=weight>{{ weight.Description }} ( {{ weight.GramWeight }} g)</md-option></md-select><md-list flex style=width:100%><md-subheader class=md-no-sticky>Nutrients data (per {{ vm.selectedWeight.GramWeight }} g)</md-subheader><md-list-item class=md-3-line ng-repeat="item in vm.foodInfo.Nutrients" ng-click=null><div class=md-list-item-text layout=column><h3>{{ item.Name }}</h3><h3 class=md-secondary>{{ item.Value * vm.getFactor() }} {{ item.Units }}</h3></div></md-list-item></md-list></md-content></article>')}]);
//# sourceMappingURL=../maps/scripts/app-4900cabb7f.js.map
