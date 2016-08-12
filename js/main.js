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
		var rawContacts = JSON.parse(data);
		_(rawContacts)
			.forEach(function (value) {
				control.contacts.push(new Contact(value));
			});
	} else {
		$scope.contacts = [new Contacto({
				name: "miguel",
				last_name: "Bautista",
				email: "angel.com",
				country: "mexico"
			}),
            new Contacto({
				name: "angel",
				last_name: "Cruz",
				email: "angel.com",
				country: "españa"
			}),
            new Contacto({
				name: "reyna",
				last_name: "Bautista",
				email: "reyna.com",
				country: "mexico"
			}),
            new Contacto({
				name: "lety",
				last_name: "ramirez",
				email: "lety.com",
				country: "mexico"
			}),
			new Contacto({
				name: "miguel",
				last_name: "Bautista",
				email: "angel.com",
				country: "mexico"
			}),
	            new Contacto({
				name: "angel",
				last_name: "Cruz",
				email: "angel.com",
				country: "españa"
			}),
	            new Contacto({
				name: "reyna",
				last_name: "Bautista",
				email: "reyna.com",
				country: "mexico"
			}),
	            new Contacto({
				name: "lety",
				last_name: "ramirez",
				email: "lety.com",
				country: "mexico"
			})
        ];
	}

}])

.controller("listController", ["$scope", "$location", function ($scope, $location) {
	control = this;
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

.controller("contactController", ["$scope", function ($scope) {
	$scope.$parent.listView = false;
	$scope.$parent.contactView = true;
}]);
