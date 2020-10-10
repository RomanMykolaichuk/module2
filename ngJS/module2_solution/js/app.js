/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
            .controller('ToBuyController', ToBuyController)
            .controller('AlreadyBoughtController', AlreadyBoughtController)
            .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var controller = this;

        controller.items = ShoppingListCheckOffService.getbought();
        controller.messageVisible = function(){return ShoppingListCheckOffService.isBought();};
    }
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var controller = this;

        controller.items = ShoppingListCheckOffService.getbye();
        controller.messageVisible = function(){return ShoppingListCheckOffService.isBye();};
        controller.byeItem= function(index){
            ShoppingListCheckOffService.byeItem(index);                   
        };
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var tobye = [{name: 'cookies', quantity: '3 bags'},
            {name: 'chips', quantity: '2 bags'},
            {name: 'shugar', quantity: '1 kg'},
            {name: 'cakes', quantity: '2 bags'},
            {name: 'cola', quantity: '1 bottle'}];

        var bought = [];

        service.byeItem = function (itemIndex) {
            bought.push(tobye[itemIndex]);
            tobye.splice(itemIndex, 1);
        };

        service.isBye = function () {
            return (tobye.length > 0);
        };
        service.isBought = function () {
            return (bought.length > 0);
        };

        service.getbye = function () {
            return tobye;
        };
        service.getbought = function () {
            return bought;
        };

    }


}());