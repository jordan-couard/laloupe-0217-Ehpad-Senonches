angular.module('app')
    .controller('NavbarController', function($scope, Auth, CurrentUser, $timeout, $mdSidenav, $log) {

      // side
      $scope.toggleLeft = buildDelayedToggler('left');
          $scope.toggleLeft = buildToggler('left');
          // $scope.toggleRight = buildToggler('right');
          // $scope.isOpenRight = function(){
          //   return $mdSidenav('right').isOpen();
          // };
          $scope.isOpenLeft = function(){
            return $mdSidenav('left').isOpen();
          };

      //     /**
      //      * Supplies a function that will continue to operate until the
      //      * time is up.
      //      */
          function debounce(func, wait, context) {
            var timer;

            return function debounced() {
              var context = $scope,
                  args = Array.prototype.slice.call(arguments);
              $timeout.cancel(timer);
              timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
              }, wait || 10);
            };
          }
      //
      //     /**
      //      * Build handler to open/close a SideNav; when animation finishes
      //      * report completion in console
      //      */
          function buildDelayedToggler(navID) {
            return debounce(function() {
              // Component lookup should always be available since we are not using `ng-if`
              $mdSidenav(navID)
                .toggle()
                .then(function () {
                  $log.debug("toggle " + navID + " is done");
                });
            }, 200);
          }

          function buildToggler(navID) {
            return function() {
              // Component lookup should always be available since we are not using `ng-if`
              $mdSidenav(navID)
                .toggle()
                .then(function () {
                  $log.debug("toggle " + navID + " is done");
                });
            };
          }
      //   .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
          $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
              .then(function () {
                $log.debug("close LEFT is done");
              });
      };
          // $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
          //   $mdSidenav('right').close()
          //     .then(function () {
          //       $log.debug("close RIGHT is done");
          //     });
          // };
      // side

        $scope.isCollapsed = true;
        $scope.auth = Auth;
        $scope.user = CurrentUser.user();

        $scope.logout = function() {
            Auth.logout();
        };
    });
