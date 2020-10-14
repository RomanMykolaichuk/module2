(function () {
    'use strict';

    angular
            .module('NarrowItDownApp', [])
            .controller('NarrowItDownController', NarrowItDownController)
            .service('MenuSearchService', MenuSearchService)
            .directive('foundItems', foundItems)
            .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

    foundItems.$inject = [];
    function foundItems() {
        return {
            templateUrl: 'foundItemsList.html',
            scope: {
                items: '<',
                removeItem: '&',
            },
            restrict: 'E',
        };
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.searchItem = '';
        menu.showAlert = false;
        menu.showLoader = false;
        menu.found = [];

        menu.getItems = function (search) {
            menu.showAlert = false;
            var promise = MenuSearchService.getMatchedMenuItems(search);
            menu.showLoader = true;

            promise
                    .then(function (response) {
                        menu.found = response;
                        menu.showLoader = false;
                        menu.showAlert = !menu.found.length;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
        };

        menu.removeItem = function (itemIndex) {
            menu.found.splice(itemIndex, 1);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            var items = [];
            searchTerm = searchTerm.trim().toLowerCase();
            return $http({
                method: 'GET',
                url: ApiBasePath + '/menu_items.json',
            })
                    .then(function (response) {
                        if (!searchTerm) {
                            return items;
                        }
                        response.data.menu_items.forEach(function (item) {
                            if (item.description.toLowerCase().indexOf(searchTerm) !== -1) {
                                items.push(item);
                            }
                        });
                        return items;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
        };
    }
})();