angular.module('$selectBox', []).directive('selectBox', function () {
    return {
        restrict: 'E',
        require: [],
        template: '<input id="showed" type="text" ng-click="showSelectModal()" style="cursor:inherit;" readonly />' + '<span id="hidden" type="text" style="display: none;"></span>',
        scope: {
            ngSelectedId: "@",
            ngSelectedValue: "@",
            ngTitle: "@",
            ngItemName: "@",
            ngItemId: "@",
            ngData: "@"
        },
        controller: function ($scope, $element, $attrs, $ionicModal, $parse) {
            $scope.modal = {};

            $scope.showSelectModal = function () {
                var val = $parse($attrs.ngData);
                $scope.data = val($scope);

                $scope.modal.show();
            };

            $scope.closeSelectModal = function () {
                $scope.modal.hide();
            };

            $scope.$on('$destroy', function (id) {
                $scope.modal.remove();
            });

            $scope.modal = $ionicModal.fromTemplate('<ion-modal-view id="select">' + '<ion-header-bar>' + '<h1 class="title">' + $attrs.ngTitle + '</h1>' + ' <a ng-click="closeSelectModal()" class="button button-icon icon ion-close"></a>' + '</ion-header-bar>' + '<ion-content>' + '<ion-list>' + '<ion-item  ng-click="clickItem(item)" ng-repeat="item in data" ng-bind-html="item[\'' + $attrs.ngItemName + '\']"></ion-item>' + '</ion-list>' + ' </ion-content>' + '</ion-modal-view>', {
                scope: $scope,
                animation: 'slide-in-right'
            });

            $scope.clickItem = function (item) {
                var index = $parse($scope.ngSelectedId);
                index.assign($scope.$parent.$parent, item[$scope.ngItemId]);
                index.assign($scope, item[$scope.ngItemId]);

                var value = $parse($scope.ngSelectedValue);
                value.assign($scope.$parent.$parent, item[$scope.ngItemName]);
                value.assign($scope, item[$scope.ngItemName]);

                $scope.closeSelectModal();
            };
        },
        compile: function ($element, $attrs) {
            var input = $element.find('input');
            angular.forEach({
                'name': $attrs.name,
                'placeholder': $attrs.ngPlaceholder,
                'ng-model': $attrs.ngSelectedValue
            }, function (value, name) {
                if (angular.isDefined(value)) {
                    input.attr(name, value);
                }
            });

            var span = $element.find('span');
            if (angular.isDefined($attrs.ngSelectedId)) {
                span.attr('ng-model', $attrs.ngSelectedId);
            }
        }
    };
});
//# sourceMappingURL=selectBox.js.map
