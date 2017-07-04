angular.module('app')
  .controller('EditSubmenuController', function($scope, $state, $stateParams, $window, $sce, UploadPdfService, UploadService, $timeout, $mdDialog, CurrentUser, SubmenuService, Auth) {

    $scope.theme = 'ehpad';
    $scope.user = CurrentUser.user();
    $scope.auth = Auth;

    $scope.idSubmenu = $stateParams.id;
    console.log('id', $scope.idSubmenu);

    $scope.menus = [
      "Votre admission",
      "Votre séjour",
      "Vos droits"
    ];

    function loadSubmenu(id) {
      if (id !== undefined) {
        SubmenuService.getOne($scope.idSubmenu).then(function(res) {
          console.log('res One', res);
          $scope.submenu = res.data;
        }, function(err) {
          console.error('error on getOne Submenu', err);
        });
      }
    }
    loadSubmenu($scope.idSubmenu);

    $scope.uCanTrust = function(string) {
      return $sce.trustAsHtml(string);
    };

    $scope.updateSubmenu = function() {
      SubmenuService.update($scope.idSubmenu, $scope.submenu).then(function(res) {
        console.log('update', res);
        location.reload(true);
      }, function(err) {
        console.error('error on update Submenus', err);
      });
    };

    $scope.tinymceOptions = {
      onChange: function(e) {
        // put logic here for keypress and cut/paste changes
      },
      inline: false,
      skin: 'ehpad2',
      height: 300,
      theme: 'modern',
      plugins: 'advlist autolink lists colorpicker link textcolor image charmap code table',
      toolbar1: 'fontsizeselect | undo redo | bold italic underline | alignleft aligncenter alignjustify alignright | bullist numlist outdent indent | preview media | forecolor backcolor | link',
      fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
      content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        // '//www.tinymce.com/css/codepen.min.css'
      ]
    };

    $scope.redirect = function() {
      $state.go('user.submenu');
    };

    $scope.redirectCreateSubmenu = function() {
      $state.go('user.create-submenu');
    };

    $scope.galleryInsertModalShow = false;
    $scope.OpenModalgalleryInsert = function() {
      $scope.galleryInsertModalShow = !$scope.galleryInsertModalShow;
      UploadService.getAll().then(function(res) {
        console.log('load', res);
        $scope.listimages = res.data;
      }, function(err) {
        console.error('error on image load', err);
      });
    };
    $scope.textmodal = [];
    $scope.textModalShow = false;
    $scope.OpenModalDisplayText = function() {
      $scope.textModalShow = !$scope.textModalShow;
    };
    console.log('$scope.textmodal', $scope.textmodal);


    $scope.UploadImgModalShow = false;
    $scope.OpenModalUploadImg = function() {
      $scope.UploadImgModalShow = !$scope.UploadImgModalShow;
    };

    $scope.insertImg = function(nameImg) {
      $scope.newSubmenu.content += '<p><img src="uploads/images/' + nameImg + '" width="100%"/></p>';
      $scope.galleryInsertModalShow = false;
    };

    $scope.insertImgEdit = function(name) {
      $scope.submenu.content += '<p><img src="uploads/images/' + name + '" width="100%"/></p>';
      console.log('submenu.content', $scope.submenu.content);
      $scope.galleryInsertModalShow = false;
    };

    $scope.currentPage = 0;
    $scope.pageSize = 12;
    $scope.listimages = [];
    $scope.numberOfPages = function() {
      return Math.ceil($scope.listimages.length / $scope.pageSize);
    };
    for (var i = 0; i < $scope.listimages.length - 1; i++) {
      $scope.listimages.push("Item " + i);
    }

    $scope.UploadPdfModalShow = false;
    $scope.OpenModalUploadPdf = function() {
      $scope.UploadPdfModalShow = !$scope.UploadPdfModalShow;
    };

    $scope.galleryPdfModalShow = false;
    $scope.OpenModalUrlPdf = function() {
      $scope.galleryPdfModalShow = !$scope.galleryPdfModalShow;
      UploadPdfService.getAll().then(function(res) {
        console.log('loadpdf', res);
        $scope.listPdf = res.data;
        console.log('listpdf', res.data);
      }, function(err) {
        console.error('error on image load', err);
      });
    };

    $scope.decodeURI = function(filename) {
      return decodeURI(filename);
    };

    $scope.currentPagePdf = 0;
    $scope.pageSizePdf = 8;
    $scope.listPdf = [];
    $scope.numberOfPagesPdf = function() {
      return Math.ceil($scope.listPdf.length / $scope.pageSizePdf);
    };
    for (i = 0; i < $scope.listPdf.length - 1; i++) {
      $scope.listPdf.push("Item " + i);
    }

  });
