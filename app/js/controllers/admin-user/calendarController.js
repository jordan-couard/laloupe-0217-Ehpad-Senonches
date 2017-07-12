angular.module('app')
  .controller('CalendarController', function($scope, $state, $stateParams, $mdDialog, CurrentUser, CalendarService) {
    $scope.user = CurrentUser.user();
    $scope.newEvenement = {
      date: undefined,
      start: undefined,
      end: undefined,
      title: '',
      // content: '',
      isOnline: false
    };

    $scope.idEvenement = $stateParams.id;

    function loadAllEvenements() {
      CalendarService.getAll().then(function(res) {
        $scope.evenements = res.data;
      });
    }
    loadAllEvenements();

    $scope.currentPageCalendar = 0;
    $scope.pageSizeCalendar = 5;
    $scope.evenements = [];
    $scope.numberOfPagesCalendar = function() {
      return Math.ceil($scope.evenements.length / $scope.pageSizeCalendar);
    };
    for (var i = 0; i < $scope.evenements.length - 1; i++) {
      $scope.evenements.push("Item " + i);
    }

    function loadEvenement(id) {
      if (id !== undefined) {
        CalendarService.getOne($scope.idEvenement).then(function(res) {
          $scope.evenement = res.data;
        });
      }
    }
    loadEvenement($scope.idEvenement);

    $scope.redirectCalendar = function() {
      $state.go('user.calendar');
    };

    $scope.redirectCreateCalendar = function() {
      $state.go('user.create-calendar');
    };

    $scope.showConfirm = function(ev, id) {
      swal({
        text: "Voulez-vous supprimer cet évènement ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Supprimer',
        cancelButtonText: 'Annuler',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      }).then(function() {
        CalendarService.delete(id).then(function(res) {
            swal({
              type: 'success',
              showConfirmButton: false,
              text: 'Element supprimé',
              timer: 2000
            });
            loadAllEvenements();
          },
          function(err) {
            swal({
              type: 'error',
              title: 'Une erreur s\'est produite',
              text: 'Vous pouvez réessayer',
              timer: 2000
            });
          });
      });
    };
  });
