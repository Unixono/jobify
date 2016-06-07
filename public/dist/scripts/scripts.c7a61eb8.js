"use strict";angular.module("publicApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider","$httpProvider",function(a,b){b.defaults.withCredentials=!0,a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/site-list",{templateUrl:"views/site-list.html",controller:"SiteListCtrl",controllerAs:"siteList"}).when("/offer-list",{templateUrl:"views/offer-list.html",controller:"OfferListCtrl",controllerAs:"offerList"}).when("/offer",{templateUrl:"views/offer.html",controller:"OfferCtrl",controllerAs:"offer"}).when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl",controllerAs:"register"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$location","CurrentUserProfile",function(a,b,c){a.$on("$routeChangeStart",function(a){var d=b.path();""!==d&&"/"!==d?""===c.getUserUsername()&&(a.preventDefault(),b.path("/")):"/"===d&&""!==c.getUserUsername()&&(a.preventDefault(),b.path("/offer-list"))}),$.material.init(),$.material.ripples(),$.material.checkbox(),$.material.radio()}]),angular.module("publicApp").controller("MainCtrl",["$scope","$rootScope","$location","ServerCommunication","CurrentUserProfile",function(a,b,c,d,e){a.user={username:null,password:null},b.errorText="on server, please reload the page",b.hasError=!1,b.showLoading=!1,a.login=function(){b.showLoading=!0,d.loginUser(a.user).then(function(a){e.loginUser(a.user.username),b.showLoading=!1,b.hasError=!1,c.path("/offer-list")},function(c){a.user.password="",b.errorText=c.error.message,b.showLoading=!1,b.hasError=!0})}}]),angular.module("publicApp").controller("SiteListCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("publicApp").controller("OfferListCtrl",["$scope","$rootScope","$location","ServerCommunication","CurrentUserProfile",function(a,b,c,d,e){function f(){b.showLoading=!0,d.getDevelopers().then(function(b){a.developerList=b,g()})}function g(){b.showLoading=!0,d.getUserFilter().then(function(c){if(c.filter.length>0){a.statusNew=c.filter[0],a.statusApplied=c.filter[1],a.statusRejected=c.filter[2],a.statusResolved=c.filter[3],a.filterOption.company=c.filter[4];for(var d=0;d<a.developerList.length;d++)for(var f=5;f<c.filter.length;f++)a.developerList[d].username===c.filter[f]&&a.addSelectedDev(a.developerList[d]);a.updateJobList()}else{a.statusNew=!0,a.statusApplied=!0,a.statusRejected=!1,a.statusResolved=!1,a.filterOption.company="";for(var g=0;g<a.developerList.length;g++)e.getUserUsername()===a.developerList[g].username&&a.addSelectedDev(a.developerList[g])}b.showLoading=!1})}b.errorText="on server, please reload the page",b.hasError=!1,b.showLoading=!1,a.filterOption={developers:[],status:[],company:""},f(),a.updateJobList=function(){b.showLoading=!0,a.jobsList=[],a.filterOption.status=[],a.statusNew&&a.filterOption.status.push("new"),a.statusApplied&&a.filterOption.status.push("applied"),a.statusRejected&&a.filterOption.status.push("rejected"),a.statusResolved&&a.filterOption.status.push("resolved"),d.getJobsList(a.filterOption).then(function(c){b.showLoading=!1,b.hasError=!1,a.jobsList=c.offers},function(a){b.errorText="reading data, please reload the page",b.showLoading=!1,b.hasError=!0,c.path("/")})},a.addSelectedDev=function(b){b.required=!b.required,b.required?a.filterOption.developers.push(b.username):a.filterOption.developers.splice(a.filterOption.developers.indexOf(b.username),1)},a.showJob=function(a){e.setJob(a),c.path("/offer")},a.newJob=function(){e.setJob("new"),c.path("/offer")},a.predicate=e.getListPredicate(),a.reverse=e.getListOrder(),a.order=function(b){a.reverse=a.predicate===b?!a.reverse:!1,a.predicate=b,e.setListPredicate(a.predicate),e.setListOrder(a.reverse)}}]),angular.module("publicApp").controller("OfferCtrl",["$scope","$rootScope","$location","CurrentUserProfile","ServerCommunication",function(a,b,c,d,e){function f(){b.showLoading=!0,e.getDevelopers().then(function(c){b.showLoading=!1,a.developerList=c,"new"!==d.getJob()&&(b.showLoading=!0,e.getJob(d.getJob()).then(function(c){b.showLoading=!1,a.job=c.job,h(),i()}))})}function g(b){a.job={company:null,position:null,url:null,skillsRequired:[],skillsDesired:[],otherSkillsRequired:"",otherSkillsDesired:"",developerNotes:null,managerNotes:null,applicationResult:null,status:null,applicationMethod:null,applicationEmail:null,coverLetter:null,adviceToScrapp:null,creationDate:null,applyRejectDate:null},b&&(a.job={developers:[]})}function h(){for(var b=0;b<a.job.developers.length;b++)for(var c=0;c<a.developerList.length;c++)a.job.developers[b]===a.developerList[c].username&&(a.developerList[c].required=!0)}function i(){for(var b=0;b<a.job.skillsRequired.length;b++)a[a.job.skillsRequired[b]+"Required"]=!0;for(b=0;b<a.job.skillsDesired.length;b++)a[a.job.skillsDesired[b]+"Desired"]=!0}function j(){a.jsDesired=!1,a.jsRequired=!1,a.angularDesired=!1,a.angularRequired=!1,a.reactDesired=!1,a.reactRequired=!1,a.nodeDesired=!1,a.nodeRequired=!1,a.meanDesired=!1,a.meanRequired=!1,a.pythonDesired=!1,a.pythonRequired=!1,a.djangoDesired=!1,a.djangoRequired=!1,a.cssDesired=!1,a.cssRequired=!1}function k(a){return a.indexOf("https://")>-1||a.indexOf("http://")>-1?a:"http://"+a}b.errorText="on server, please reload the page",b.hasError=!1,b.showLoading=!1,f(),g(!0),a.addSelectedDev=function(b){b.required=!b.required,b.required?a.job.developers.push(b.username):a.job.developers.splice(a.job.developers.indexOf(b.username),1)},a.addSelectedSkill=function(b,c,d){d?a.job.skillsDesired.push(b):a.job.skillsDesired.indexOf(b)>-1&&a.job.skillsDesired.splice(a.job.skillsDesired.indexOf(b),1),c?a.job.skillsRequired.push(b):a.job.skillsRequired.indexOf(b)>-1&&a.job.skillsRequired.splice(a.job.skillsRequired.indexOf(b),1)},a.setEmailFocus=function(){document.getElementById("emailInput").focus()},a.goToList=function(){c.path("/offer-list")},a.method="form",a.getJob=function(a){return d.getJob()===a},a.saveClicked=function(){b.showLoading=!0,a.job.status="new",a.job.creationDate=Date.now(),a.job.url=k(a.job.url),e.saveOffer(a.job).then(function(a){b.showLoading=!1,b.hasError=!1,c.path("/offer-list")},function(a){b.errorText="on save the offer, please try again",b.showLoading=!1,b.hasError=!0})},a.saveNewClicked=function(){b.showLoading=!0,a.job.status="new",a.job.creationDate=Date.now(),a.job.url=k(a.job.url),e.saveOffer(a.job).then(function(a){b.showLoading=!1,b.hasError=!1,d.setJob("new"),g(!1),j(),c.path("/offer")},function(a){b.errorText="on save the offer, please try again",b.showLoading=!1,b.hasError=!0})},a.resolveClicked=function(){b.showLoading=!0,a.job.status="resolved",e.updateOffer(a.job,d.getJob()).then(function(a){b.showLoading=!1,b.hasError=!1,c.path("/offer-list")},function(a){b.errorText="on resolve the offer, please try again",b.showLoading=!1,b.hasError=!0})},a.applyClicked=function(){b.showLoading=!0,a.job.status="applied",a.job.applyRejectDate=Date.now(),e.updateOffer(a.job,d.getJob()).then(function(a){b.showLoading=!1,b.hasError=!1,c.path("/offer-list")},function(a){b.errorText="on apply the offer, please try again",b.showLoading=!1,b.hasError=!0})},a.rejectClicked=function(){b.showLoading=!0,a.job.status="rejected",a.job.applyRejectDate=Date.now(),e.updateOffer(a.job,d.getJob()).then(function(a){b.showLoading=!1,b.hasError=!1,c.path("/offer-list")},function(a){b.errorText="on reject the offer, please try again",b.showLoading=!1,b.hasError=!0})},a.updateClicked=function(){b.showLoading=!0,a.job.url=k(a.job.url),e.updateOffer(a.job,d.getJob()).then(function(a){b.showLoading=!1,b.hasError=!1,c.path("/offer-list")},function(a){b.errorText="on update the offer, please try again",b.showLoading=!1,b.hasError=!0})},a.removeClicked=function(){b.showLoading=!0,e.removeOffer(d.getJob()).then(function(a){b.showLoading=!1,b.hasError=!1,c.path("/offer-list")},function(a){b.errorText="on remove the offer, please try again",b.showLoading=!1,b.hasError=!0})}}]),angular.module("publicApp").controller("RegisterCtrl",["$scope","$rootScope","$window","$location","ServerCommunication","CurrentUserProfile",function(a,b,c,d,e,f){a.passwordHasSpaces=!1,a.emailValid=!1,a.updateUser=!1,b.errorText="on server, please reload the page",b.hasError=!1,b.showLoading=!1,a.user={username:null,email:null,password:null,role:"developer",filter:null},a.goHome=function(){""===f.getUserUsername()?d.path("/"):d.path("/offer-list")},"settings"===f.getRegister()&&(b.showLoading=!0,a.updateUser=!0,e.getLoggedUser().then(function(c){a.user.username=c.user.username,a.user.password=c.user.password,a.user.role=c.user.role,a.user.email=c.user.email,a.user.email&&""!==a.user.email&&a.emailChanged(),b.showLoading=!1,b.hasError=!1},function(a){b.errorText="on import user, please try again",b.showLoading=!1,b.hasError=!0})),a.passwordComplexity=0,a.passwordChange=function(b,c){b.indexOf(" ")>-1?(a.passwordHasSpaces=!0,a.passwordAdvice="Spaces not allowed"):(a.passwordHasSpaces=!1,a.passwordAdvice=""),b!==c?a.retypePasswordAdvice="Password doesnt match":a.retypePasswordAdvice=""},a.passwordMatches=function(a,b){return void 0===a||void 0===b?!1:a===b?!0:!1},a.retypePasswordAdvice="",a.retypePasswordChanged=function(b,c){b!==c?a.retypePasswordAdvice="Password doesnt match":a.retypePasswordAdvice=""},a.emailChanged=function(){var b=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;b.test(a.user.email)?a.emailValid=!0:a.emailValid=!1},a.signUpButtonClicked=function(){b.showLoading=!0,e.registerUser(a.user).then(function(a){b.showLoading=!1,b.hasError=!1,f.loginUser(a.user.username),d.path("/offer-list")},function(a){b.errorText=a.message,b.showLoading=!1,b.hasError=!0})},a.updateUserButtonClicked=function(){b.showLoading=!0,e.updateUser(a.user).then(function(a){b.showLoading=!1,b.hasError=!1,f.loginUser(a.user.username),d.path("/offer-list")},function(a){b.errorText=a.message,b.showLoading=!1,b.hasError=!0})},a.removeUserButtonClicked=function(){b.showLoading=!0,e.removeUser(a.user).then(function(a){b.showLoading=!1,b.hasError=!1,f.logoutCurrentUser(),d.path("/")},function(a){b.errorText="removing user, please try again",b.showLoading=!1,b.hasError=!0})}}]),angular.module("publicApp").service("ServerCommunication",["$http","$q",function(a,b){var c="http://api.jobifyweb.com";this.loginUser=function(d){var e=b.defer();return a.post(c+"/login",d).success(function(a){e.resolve(a)}).error(function(a){console.log("error"),console.log(a),e.reject(a)}),e.promise},this.getLoggedUser=function(){var d=b.defer();return a.get(c+"/getuser").success(function(a){d.resolve(a)}).error(function(a){console.log("error"),console.log(a),d.reject(a)}),d.promise},this.getUserFilter=function(){var d=b.defer();return a.get(c+"/getfilter").success(function(a){d.resolve(a)}).error(function(a){console.log("error"),console.log(a),d.reject(a)}),d.promise},this.registerUser=function(d){var e=b.defer();return a.post(c+"/signup",d).success(function(a){e.resolve(a)}).error(function(a){console.log("error"),console.log(a),e.reject(a)}),e.promise},this.updateUser=function(d){var e=b.defer();return a.put(c+"/updateuser",d).success(function(a){e.resolve(a)}).error(function(a){console.log("error"),console.log(a),e.reject(a)}),e.promise},this.getJobsList=function(d){var e=b.defer();return a.post(c+"/offer-list",d).success(function(a){e.resolve(a)}).error(function(a){console.log("error"),console.log(a),e.reject(a)}),e.promise},this.getJob=function(d){var e=b.defer();return a.get(c+"/offer/"+d).success(function(a){e.resolve(a)}).error(function(a){console.log("error"),console.log(a),e.reject(a)}),e.promise},this.logoutUser=function(){var d=b.defer();return a.post(c+"/logout").success(function(a){d.resolve("ok")}).error(function(a){console.log("error"),console.log(a),d.reject(a)}),d.promise},this.removeUser=function(d){var e=b.defer();return a.put(c+"/removeuser",d).success(function(a){e.resolve("ok")}).error(function(a){console.log("error"),console.log(a),e.reject(a)}),e.promise},this.getDevelopers=function(){var d=b.defer();return a.get(c+"/getdeveloperlist").success(function(a){d.resolve(a.devs)}).error(function(a){console.log("error"),console.log(a),d.reject(a)}),d.promise},this.saveOffer=function(d){var e=b.defer();return a.put(c+"/saveoffer",d).success(function(a){e.resolve(a)}).error(function(a){console.log("error"),console.log(a),e.reject(a)}),e.promise},this.updateOffer=function(d,e){var f=b.defer(),g={offer:d,id:e};return a.put(c+"/updateoffer",g).success(function(a){f.resolve(a)}).error(function(a){console.log("error"),console.log(a),f.reject(a)}),f.promise},this.removeOffer=function(d){var e=b.defer();return console.log(d),a.put(c+"/removeoffer/"+d).success(function(a){console.log("success"),console.log(a),e.resolve(a)}).error(function(a){console.log("error"),console.log(a),e.reject(a)}),e.promise}}]),angular.module("publicApp").filter("applied",function(){return function(a){return a?"Yes":"No"}}),angular.module("publicApp").factory("UserProfile",function(){var a=function(a){this.username=a,this.email=null,this.fullName=null,this.role=null};return a.prototype.setUserProfileData=function(a){if(0===arguments.length)throw"Missing parameters for setUserProfileData function.";this.email=a.email||null,this.fullName=a.fullName||null,this.role=a.role||null},a.prototype.getUserUsername=function(){return this.username},a.prototype.getUserEmail=function(){return this.email},a.prototype.getUserFullName=function(){return this.fullName},a.prototype.getUserRole=function(){return this.role},a}),angular.module("publicApp").service("CurrentUserProfile",function(){function a(a){for(var b=a+"=",c=document.cookie.split(";"),d=0;d<c.length;d++){for(var e=c[d];" "===e.charAt(0);)e=e.substring(1);if(0===e.indexOf(b))return e.substring(b.length,e.length)}return""}function b(a,b,c){var d=new Date;d.setTime(d.getTime()+24*c*60*60*1e3);var e="expires="+d.toUTCString();document.cookie=a+"="+b+"; "+e}var c=a("jobifyUser"),d="new",e="register",f=!("false"===a("jobifyListOrder")),g=a("jobifyListPred");""===g&&(g="job.company"),this.setJob=function(a){d=a},this.getJob=function(){return d},this.setListOrder=function(a){b("jobifyListOrder",a,7),f=a},this.getListOrder=function(){return f},this.setListPredicate=function(a){b("jobifyListPred",a,7),g=a},this.getListPredicate=function(){return g},this.setRegister=function(a){e=a},this.getRegister=function(){return e},this.loginUser=function(a){b("jobifyUser",a,7),c=a},this.getUserUsername=function(){return c},this.getUser=function(){return c},this.logoutCurrentUser=function(){b("jobifyUser","",7),c=""}}),angular.module("publicApp").controller("HeaderCtrl",["$scope","$rootScope","$location","$route","ServerCommunication","CurrentUserProfile",function(a,b,c,d,e,f){a.userName=f.getUserUsername(),b.errorText="on server, please reload the page",b.hasError=!1,b.showLoading=!1,a.settings=function(){f.setRegister("settings"),d.reload(),c.path("/register")},a.logoutUser=function(){b.showLoading=!0,e.logoutUser().then(function(a){b.showLoading=!1,b.hasError=!1,f.logoutCurrentUser(),c.path("/")},function(a){b.showLoading=!1,b.hasError=!0,b.errorText="when logout user, please reload the page",c.path("/")})},a.goHome=function(){""===f.getUserUsername()?c.path("/"):c.path("/offer-list")},a.$watch(function(){return f.getUserUsername()},function(b,c){a.userName=b,""===a.userName&&a.goHome()},!0),a.registerUser=function(){f.setRegister("register"),d.reload(),c.path("/register")}}]),angular.module("publicApp").run(["$templateCache",function(a){a.put("views/main.html",'<section> <div class="jumbotron"> <h1 style="display: flex; align-items: center; margin-left: auto; width: 180px; margin-right: auto">J<img src="/images/job.ecd79945.png" style="height: 44px; width: 44px; margin-top: 10px; margin-left: -6px; margin-right: 3px; margin-bottom: -7px">bify</h1> <p>A job-tracking tool</p> </div> <div class="home-content center-block"> <form> <div class="form-group"> <input type="text" class="form-control" ng-model="user.username" placeholder="Username"> </div> <div class="form-group"> <input type="password" class="form-control" ng-model="user.password" placeholder="Password"> </div> <button type="submit" class="btn btn-primary" ng-click="login()">Login</button> <br> <!-- <a class="btn&#45;link pull&#45;right" ng&#45;click="registerUser()">Register</a> --> </form> <div ng-show="hasError" class="alert alert-danger alert-dismissible" style="margin-top: 35px; text-align: center" role="alert"> <strong>Error</strong> {{errorText}} </div> <div class="alert-info2" ng-show="showLoading && !hasError"> <h5 class="loading">Please wait ...</h5> </div> </div></section>'),a.put("views/offer-list.html",'<section> <h4 class="pull-left" style="margin-top: 0px" ng-hide="showSearchForm">Available Jobs</h4> <p ng-init="showSearchForm = false;" ng-click="showSearchForm = true;" class="pull-right" ng-hide="showSearchForm"><i class="mdi-content-filter-list vertical-middle"></i></p> <p ng-click="showSearchForm = false;" class="pull-right" ng-show="showSearchForm"><i class="mdi-content-clear" style="color: white; padding: 7px"></i></p> <div ng-show="showSearchForm"> <div class="panel panel-primary"> <div class="panel-heading"> <h3 class="panel-title">Filter options </h3> </div> <div class="panel-body" style="padding-bottom: 0px"> <div class="btn-toolbar" style="display: flex; align-items: center"> <h4 class="panel-title">Users</h4> <a class="btn btn-xs btn-raised" ng-repeat="dev in developerList | orderBy:\'username\'" ng-click="addSelectedDev(dev); updateJobList()" ng-class="{\'btn-info\': dev.required}" href> {{dev.username}} </a> </div> </div> <div class="panel-body" style="padding-top: 0px; padding-bottom: 0px"> <div class="btn-toolbar" style="display: flex; align-items: center"> <h4 class="panel-title">Status</h4> <a class="btn btn-xs btn-raised" ng-click="statusNew = !statusNew; updateJobList()" ng-class="{\'btn-info\': statusNew}" href>New</a> <a class="btn btn-xs btn-raised" ng-click="statusApplied = !statusApplied; updateJobList()" ng-class="{\'btn-info\': statusApplied}" href>Applied</a> <a class="btn btn-xs btn-raised" ng-click="statusRejected = !statusRejected; updateJobList()" ng-class="{\'btn-info\': statusRejected}" href>Rejected</a> <a class="btn btn-xs btn-raised" ng-click="statusResolved = !statusResolved; updateJobList()" ng-class="{\'btn-info\': statusResolved}" href>Resolved</a> </div> </div> <div class="panel-body" style="padding-top: 0px"> <input class="form-control" type="text" placeholder="Company name" ng-model="filterOption.company" ng-change="updateJobList()" ng-model-options="{debounce: 400}"> </div> </div> </div> <table class="table"> <thead> <th style="width: 32%"><a ng-click="order(\'job.company\')"> Company <span class="sortorder" ng-show="predicate === \'job.company\'" ng-class="{reverse:reverse}"></a></th> <th style="width: 32%"><a ng-click="order(\'job.url\')"> URL <span class="sortorder" ng-show="predicate === \'job.url\'" ng-class="{reverse:reverse}"></a></th> <th style="width: 16%"><a ng-click="order(\'job.creationDate\')"> Date <span class="sortorder" ng-show="predicate === \'job.creationDate\'" ng-class="{reverse:reverse}"></a></th> <th style="width: 16%"><a ng-click="order(\'job.status\')"> Status <span class="sortorder" ng-show="predicate === \'job.status\'" ng-class="{reverse:reverse}"></a></th> <th style="width: 4%"></th> </thead> <tbody class="table-striped"> <tr ng-repeat="job in jobsList | orderBy:predicate:reverse"> <td ng-bind="job.company"></td> <td><a href="{{job.url}}" target="_blank" ng-click="showJob(job._id)">{{job.url | limitTo: 20 }}{{job.url.length > 20 ? \'...\' : \'\'}}</a></td> <td>{{job.creationDate | date:\'dd-MM-yy\'}}</td> <td ng-bind="job.status"></td> <td> <i class="mdi-navigation-chevron-right" style="cursor: pointer" ng-click="showJob(job._id)"></i> </td> </tr> </tbody> </table> <div style="position: fixed; bottom: 70px"> <div class="container"> <button class="btn btn-fab btn-raised btn-material-red ripple-effect" style="float: right; margin-right: 15px" ng-click="newJob()"><i class="mdi-content-add"></i></button> </div> </div> <div ng-show="hasError" class="alert alert-danger alert-dismissible" style="margin-top: 35px; text-align: center" role="alert"> <strong>Error</strong> {{errorText}} </div> <div class="alert-info2" ng-show="showLoading && !hasError"> <h5 class="loading">Please wait ...</h5> </div> </section>'),a.put("views/offer.html",'<section> <div id="signup-form-div" class="center-block"> <form name="offerForm" ng-class="{\'has-error\': hasError}" novalidate> <div class="panel panel-primary"> <div class="panel-heading"> <h3 class="panel-title">Assigned users</h3> </div> <div class="panel-body"> <div class="btn-toolbar"> <a class="btn btn-sm btn-raised" ng-repeat="dev in developerList | orderBy:\'username\'" ng-click="addSelectedDev(dev);" ng-class="{\'btn-info\': dev.required}" href> {{dev.username}} </a> </div> <span class="label label-success" ng-show="job.developers.length > 0">OK</span> <span class="label label-warning" ng-show="job.developers.length === 0">Required</span> </div> </div> <div class="form-group"> <input type="text" name="joburl" class="form-control" ng-show="getJob(\'new\')" ng-model="job.url" placeholder="Site Url" required> <span class="label label-success" ng-show="offerForm.joburl.$invalid === false && getJob(\'new\')">OK</span> <span class="label label-warning" ng-show="offerForm.joburl.$invalid === true && getJob(\'new\')">Required</span> <button class="btn btn-raised btn-xs btn-info" ng-show="getJob(\'new\')" data-toggle="modal" data-target="#modal-scrapp">Scrapp page</button> <a class="btn btn-raised btn-xs btn-info" ng-show="!getJob(\'new\')" href="{{job.url}}" target="_blank">Open URL</a> <button class="btn btn-raised btn-xs btn-info" ng-show="!getJob(\'new\')" data-toggle="modal" data-target="#modal-url">Edit link</button> <button class="btn btn-raised btn-xs btn-info" ng-show="!getJob(\'new\')" data-toggle="modal" data-target="#modal-letter">Cover Letter</button> <button class="btn btn-raised btn-xs btn-info" ng-show="!getJob(\'new\')" data-toggle="modal" data-target="#modal-method">Apply method</button> </div> <div class="form-group"> <input type="text" name="companyname" class="form-control" ng-model="job.company" placeholder="Company Name" required> <span class="label label-success" ng-show="offerForm.companyname.$invalid === false">OK</span> <span class="label label-warning" ng-show="offerForm.companyname.$invalid === true">Required</span> </div> <div class="form-group"> <input type="text" class="form-control" ng-model="job.position" placeholder="Job Position"> </div> <div class="panel panel-primary"> <div class="panel-heading"> <h3 class="panel-title">Skills <small>(Clicks: 1 Required in Green, 2 Desired in Blue)</small></h3> </div> <div class="panel-body"> <div class="btn-toolbar"> <a class="btn btn-sm btn-raised" ng-click="varAux = jsRequired; jsRequired = (!jsDesired && !jsRequired); jsDesired = (varAux && !jsDesired); addSelectedSkill(\'js\', jsRequired, jsDesired);" ng-class="{\'btn-info\': jsDesired, \'btn-primary\': jsRequired}" href>JS</a> <a class="btn btn-sm btn-raised" ng-click="varAux = angularRequired; angularRequired = (!angularDesired && !angularRequired); angularDesired = (varAux && !angularDesired); addSelectedSkill(\'angular\', angularRequired, angularDesired);" ng-class="{\'btn-info\': angularDesired, \'btn-primary\': angularRequired}" href>Angular</a> <a class="btn btn-sm btn-raised" ng-click="varAux = reactRequired; reactRequired = (!reactDesired && !reactRequired); reactDesired = (varAux && !reactDesired); addSelectedSkill(\'react\', reactRequired, reactDesired);" ng-class="{\'btn-info\': reactDesired, \'btn-primary\': reactRequired}" href>React</a> <a class="btn btn-sm btn-raised" ng-click="varAux = nodeRequired; nodeRequired = (!nodeDesired && !nodeRequired); nodeDesired = (varAux && !nodeDesired); addSelectedSkill(\'node\', nodeRequired, nodeDesired);" ng-class="{\'btn-info\': nodeDesired, \'btn-primary\': nodeRequired}" href>Node</a> <a class="btn btn-sm btn-raised" ng-click="varAux = meanRequired; meanRequired = (!meanDesired && !meanRequired); meanDesired = (varAux && !meanDesired); addSelectedSkill(\'mean\', meanRequired, meanDesired);" ng-class="{\'btn-info\': meanDesired, \'btn-primary\': meanRequired}" href>Mean</a> <a class="btn btn-sm btn-raised" ng-click="varAux = pythonRequired; pythonRequired = (!pythonDesired && !pythonRequired); pythonDesired = (varAux && !pythonDesired); addSelectedSkill(\'python\', pythonRequired, pythonDesired);" ng-class="{\'btn-info\': pythonDesired, \'btn-primary\': pythonRequired}" href>Python</a> <a class="btn btn-sm btn-raised" ng-click="varAux = djangoRequired; djangoRequired = (!djangoDesired && !djangoRequired); djangoDesired = (varAux && !djangoDesired); addSelectedSkill(\'django\', djangoRequired, djangoDesired);" ng-class="{\'btn-info\': djangoDesired, \'btn-primary\': djangoRequired}" href>Django</a> <a class="btn btn-sm btn-raised" ng-click="varAux = cssRequired; cssRequired = (!cssDesired && !cssRequired); cssDesired = (varAux && !cssDesired); addSelectedSkill(\'css\', cssRequired, cssDesired);" ng-class="{\'btn-info\': cssDesired, \'btn-primary\': cssRequired}" href>Css</a> </div> <input type="text" name="otherSkillsReq" class="form-control" ng-model="job.otherSkillsRequired" placeholder="Other skills required (separated with \',\')"> <input type="text" name="otherSkillsDes" class="form-control" ng-model="job.otherSkillsDesired" placeholder="Other skills desired (separated with \',\')"> </div> </div> <div class="panel panel-primary"> <div class="panel-heading"> <h3 class="panel-title">Notes</h3> </div> <div class="panel-body"> <span class="help-block">Manager Notes</span> <textarea class="form-control" rows="2" id="textArea1" ng-model="job.managerNotes"></textarea> <span class="help-block" ng-show="!getJob(\'new\')">Developer Notes</span> <textarea class="form-control" rows="2" id="textArea2" ng-show="!getJob(\'new\')" ng-model="job.developerNotes"></textarea> <span class="help-block" ng-show="job.status === \'applied\'||job.status === \'resolved\'">Application result</span> <textarea class="form-control" rows="2" id="textArea3" ng-show="job.status === \'applied\' || job.status === \'resolved\'" ng-model="job.applicationResult"></textarea> </div> </div> <div ng-show="!showLoading"> <button class="btn btn-success btn-raised" ng-show="getJob(\'new\')" ng-disabled="offerForm.$invalid || job.developers.length === 0" ng-click="saveClicked()">Save</button> <button class="btn btn-info btn-raised" ng-show="job.status === \'applied\'" ng-disabled="offerForm.$invalid || job.developers.length === 0" ng-click="resolveClicked()">Resolve</button> <button class="btn btn-info btn-raised" ng-show="getJob(\'new\')" ng-disabled="offerForm.$invalid || job.developers.length === 0" ng-click="saveNewClicked()">Save and New</button> <button class="btn btn-success btn-raised" ng-show="(job.status === \'new\')&&(!getJob(\'new\'))" ng-disabled="offerForm.$invalid || job.developers.length === 0" ng-click="applyClicked()">Apply</button> <button class="btn btn-danger btn-raised" ng-show="(job.status === \'new\')&&(!getJob(\'new\'))" ng-disabled="offerForm.$invalid || job.developers.length === 0" ng-click="rejectClicked()">Reject</button> <button class="btn btn-info btn-xs pull-bottom btn-raised" ng-show="!getJob(\'new\')" ng-disabled="offerForm.$invalid || job.developers.length === 0" ng-click="updateClicked()">Update</button> <button class="btn btn-danger btn-xs pull-bottom btn-raised" ng-show="!getJob(\'new\')" ng-click="removeClicked()">Remove</button> <label ng-show="job.status != null" style="color:gray; font-size: 12px; text-align: center">Offer status: {{job.status}}</label> <button class="btn btn-default pull-right btn-raised" ng-click="goToList()">Go Back</button> </div> <div ng-show="hasError" class="alert alert-danger alert-dismissible" style="margin-top: 35px; text-align: center" role="alert"> <strong>Error</strong> {{errorText}} </div> <div class="alert-info2" ng-show="showLoading && !hasError"> <h5 class="loading">Please wait ...</h5> </div> </form> </div> </section> <!--modal section  --> <div id="modal-url" class="modal fade in"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> <h4 class="modal-title">Page link</h4> </div> <div class="modal-body"> <span class="help-block">Advice url</span> <input type="text" class="form-control" ng-model="job.url"> </div> <div class="modal-footer"> <button type="button" class="btn btn-raised btn-sm btn-default" data-dismiss="modal">Close</button> </div> </div> </div> </div> <div id="modal-method" class="modal fade in"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> <h4 class="modal-title">Application Method</h4> </div> <div class="modal-body"> <div class="radio radio-primary"> <label> <input id="method-option1" type="radio" ng-model="job.applicationMethod" value="form"> Form </label> </div> <div class="radio radio-primary"> <label> <input id="method-option2" type="radio" ng-model="job.applicationMethod" ng-click="" value="email"> Email </label> </div> <span class="help-block">email</span> <textarea id="emailInput" ng-disabled="job.applicationMethod === \'form\'" class="form-control" rows="1" ng-model="job.applicationEmail"></textarea> </div> <div class="modal-footer"> <button type="button" class="btn btn-raised btn-sm btn-default" data-dismiss="modal">Close</button> </div> </div> </div> </div> <div id="modal-letter" class="modal fade in"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> <h4 class="modal-title">Cover Letter</h4> </div> <div class="modal-body"> <span class="help-block">Please Paste the letter used for presentation</span> <textarea class="form-control" rows="7" ng-model="job.coverLetter"></textarea> </div> <div class="modal-footer"> <button type="button" class="btn btn-raised btn-sm btn-default" data-dismiss="modal">Close</button> </div> </div> </div> </div> <div id="modal-scrapp" class="modal fade in"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> <h4 class="modal-title">Scrapp Page</h4> </div> <div class="modal-body"> <span class="help-block">Please Paste the advice text to scrapp</span> <textarea class="form-control" rows="7" ng-model="job.adviceToScrapp"></textarea> </div> <div class="modal-footer"> <button type="button" class="btn btn-raised btn-sm btn-primary" data-dismiss="modal" ng-click="">Scrapp</button> <button type="button" class="btn btn-raised btn-sm btn-default" data-dismiss="modal">Close</button> </div> </div> </div> </div>'),a.put("views/register.html",'<section> <div id="signup-form-div" class="home-content center-block"> <form name="registerForm" novalidate> <div class="form-group"> <input type="email" name="email" class="form-control" ng-model="user.email" ng-change="emailChanged()" placeholder="User e-mail" required> <span class="label label-success" ng-show="emailValid">OK</span> <span class="label label-warning" ng-show="!emailValid">Not Valid</span> </div> <div class="form-group"> <input type="text" name="username" class="form-control" ng-disabled="updateUser" ng-model="user.username" placeholder="User Name" required> <span class="label label-success" ng-show="registerForm.username.$invalid === false">OK</span> <span class="label label-warning" ng-show="registerForm.username.$invalid === true">Required</span> </div> <div class="form-group"> <label for="role">User role</label> <div class="radio radio-primary"> <label> <input id="register-role-option1" type="radio" ng-model="user.role" value="developer"> Developer </label> </div> <div class="radio radio-primary"> <label> <input id="register-role-option2" type="radio" ng-model="user.role" value="manager"> Manager </label> </div> </div> <div class="form-group"> <input type="password" name="password" class="form-control" id="signup-password" ng-model="user.password" ng-change="passwordChange(user.password, user.cpassword)" placeholder="Password" required> <span class="label label-success" ng-show="registerForm.password.$invalid === false && !passwordHasSpaces">OK</span> <span class="label label-warning" ng-show="registerForm.password.$invalid === true || passwordHasSpaces">Not Valid</span> <span class="label label-warning" class="message">{{ passwordAdvice }}</span> </div> <div class="form-group"> <input type="password" name="re-password" class="form-control" id="signup-re-password" ng-model="user.cpassword" ng-change="retypePasswordChanged(user.password, user.cpassword)" placeholder="Retipe Password" required> <span class="label label-success" ng-show="passwordMatches(user.password, user.cpassword) === true && !form.re-password.$invalid">OK</span> <span class="label label-warning" ng-show="passwordMatches(user.password, user.cpassword) === false || form.re-password.$invalid">Not Valid</span> <span class="label label-warning" class="message">{{ retypePasswordAdvice }}</span> </div> <div ng-show="!showLoading" class="form-row submit-btn" ng-init="termsAccepted = false" style="text-align: right"> <button id="signup-submit-form" class="btn btn-primary" ng-show="!updateUser" ng-disabled="registerForm.$invalid || !passwordMatches(user.password, user.cpassword) || passwordHasSpaces" ng-click="signUpButtonClicked()"> Sing up </button> <button id="update-submit-form" class="btn btn-primary" ng-show="updateUser" ng-disabled="registerForm.$invalid || !passwordMatches(user.password, user.cpassword) || passwordHasSpaces" ng-click="updateUserButtonClicked()"> Update </button> <button class="btn btn-xs pull-left btn-raised" ng-click="goHome()" style="width:140px"> Cancel </button> <button id="remove-submit-form" class="btn btn-danger btn-xs pull-bottom btn-raised" ng-show="updateUser" ng-disabled="!passwordMatches(user.password, user.cpassword) || passwordHasSpaces" ng-click="removeUserButtonClicked()" style="width:140px"> Remove User </button> </div> </form> <div ng-show="hasError" class="alert alert-danger alert-dismissible" style="margin-top: 35px; text-align: center" role="alert"> <strong>Error</strong> {{errorText}} </div> <div class="alert-info2" ng-show="showLoading && !hasError"> <h5 class="loading">Please wait ...</h5> </div> </div> </section>'),
a.put("views/site-list.html","<p>This is the site-list view.</p>")}]);