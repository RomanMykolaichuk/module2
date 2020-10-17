(function () {
    'use strict';

    angular.module('MenuApp')
            .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

                // Home page
                .state('home', {
                    url: '/',
                    templateUrl: 'src/menuApp/templates/home.template.html'
                })

                // Premade list page

                .state('categoriesList', {
                    url: '/categories-list',
                    templateUrl: 'src/menuApp/templates/categories.template.html',
                    controller: 'CategoriesController as categoriesList',
                    resolve: {
                        categories: ['MenuDataService', function (MenuDataService) {
                                MenuDataService.getAllCategories();                               
                               


                            }]
                    }
                })
        /*
         .state('itemDetail', {
         url: '/item-detail/{itemId}',
         templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
         controller: 'ItemDetailController as itemDetail',
         resolve: {
         item: ['$stateParams', 'ShoppingListService',
         function ($stateParams, ShoppingListService) {
         return ShoppingListService.getItems()
         .then(function (items) {
         return items[$stateParams.itemId];
         });
         }]
         }
         });*/
    }

})();
