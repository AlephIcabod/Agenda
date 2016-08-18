var app = angular.module("app", ["ngRoute"])
	.config(function ($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "templates/list.html",
				controller: "listController",
				controllerAs: "listController",
				reloadOnSearch: false
			})
			.when("/contact", {
				templateUrl: "templates/contact.html",
				controller: "contactController",
				controllerAs: "contactController",
				reloadOnSearch: false
			});
	})

.controller("mainController", ["$scope", function ($scope) {
	var control = this;
	$scope.listView = true;
	$scope.contactView = false;
	this.data = localStorage.getItem("agendaData");
	if (this.data != null) {
		$scope.contacts = [];
		var rawContacts = JSON.parse(control.data);
		_(rawContacts)
			.forEach(function (value) {
				$scope.contacts.push(new Contacto(value));
			});
	} else {
		$scope.contacts = [new Contacto({
				name: "miguel",
				last_name: "Bautista",
				email: "angel.com",
				country: "mx"
			})
        ];
	}

}])

.controller("listController", ["$scope", "$location", function ($scope, $location) {
	control = this;

	$scope.verBotones = false;
	$scope.$parent.listView = true;
	$scope.$parent.contactView = false;
	this.form = function (id) {
		$location.path("contact")
			.search({
				id: id
			});
	}
	this.mouseDown = function (direction) {
		control.direction = direction;
		control.timer = setInterval(scroll, 10);
	};
	this.mouseUp = function () {
		clearInterval(control.timer)
	}

	var scroll = function () {
			var wraper = document.getElementsByClassName("list-wrapper")[0];

			wraper.scrollTop = wraper.scrollTop + control.direction;

		}
		//	this.parent.$scope.listView = true;
}])

.controller("contactController", ["$scope", "$routeParams", "$location", function ($scope, $routeParams, $location) {

	$scope.$parent.listView = false;
	$scope.$parent.contactView = true;
	control = this;
	this.countries=window.countries;
	this.nuevo=true;

	var id = Number($routeParams.id)
	if (!_.isNaN(id)) {
		control.contact = _.find($scope.contacts, function (i) {
			return i.id == id
		})
		this.currentContact = angular.copy(this.contact);
		control.nuevo=false;
	}
	this.add=function(){
		console.log("añadir")
			var auxCont=new Contacto(control.currentContact);
			$scope.contacts.push(auxCont);
			control.goHome();
		}
		this.update=function(){
			_.forIn(control.currentContact,function(val,key){
				control.contact[key]=val;
			})
			control.goHome();
		}
		this.delete=function(){
			var deleted=_.remove($scope.contacts,function(obj){
				return obj.id==control.currentContact.id;
			});
			control.goHome();
		}

		this.goHome=function(){
			control.persistir();
			$location.path("/");
		}
		this.persistir=function(){
			localStorage.setItem("agendaData",JSON.stringify($scope.contacts));
		}

}])

.directive("listReady", ["$timeout", function ($timeout) {
	return {
		restrict: "A",
		link: function ($scope, elem, attr) {
			if ($scope.$last === true) {
				console.log($scope);
				$timeout(function () {
					var wrap = document.getElementsByClassName('list-wrapper')[0];
					var ul = wrap.getElementsByTagName("ul")[0];
					if (ul.offsetHeight > wrap.offsetHeight) {
						console.log("mostrar")
						$scope.$parent.verBotones = true;
						console.log($scope.$parent.verBotones)
					} else {
						$scope.$parent.verBotones = false;
					}
				}, 10);
			}
		}
	}
}]);
