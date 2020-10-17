(function () {
'use strict';

angular.module('Data')
.component('categories', {
  templateUrl: 'src/menuApp/templates/categories.template.html',
  controller: 'CategoriesController as categoriesList',
  bindings: {
    categories: '<'
  }
});

})();
