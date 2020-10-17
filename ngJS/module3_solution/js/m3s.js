(function () {
    'use strict';

    angular
            .module('NarrowItDownApp', [])
            .controller('NarrowItDownController', NarrowItDownController)
            .service('MenuSearchService', MenuSearchService)
            .directive('foundItems', foundItems)
            .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

    
    function foundItems() {
        return {
            templateUrl: 'foundList.html',
            scope: {
                found: '<',
                removeItem: '&',
            },
            restrict: 'E',
        };
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var ndc = this;
        ndc.searchItem = '';
        ndc.showAlert = false;
        ndc.showLoader = false;
        ndc.found = [];

        ndc.getItems = function (search) {
            ndc.showAlert = false;
            var promise = MenuSearchService.getMatchedMenuItems(search);
            ndc.showLoader = true;

            promise
                    .then(function (response) {
                        ndc.found = response;
                console.log(ndc.found);
                        ndc.showLoader = false;
                        ndc.showAlert = !ndc.found.length;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
        };

        ndc.removeItem = function (itemIndex) {
            ndc.found.splice(itemIndex, 1);
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
                url: ApiBasePath + '/menu_items.json'
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