var app = angular.module("app", ["ngRoute"])
    .config(function($routeProvider) {
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
            })
    })

.controller("mainController", function() {
        console.log("Corriendo");
        contacto = new Contacto({
            name: "miguel",
            last_name: "Bautista",
            email: "angel.com",
            country: "mexico"
        });
    })
    .controller("listController", function() {})

.controller("contactController", function() {});
