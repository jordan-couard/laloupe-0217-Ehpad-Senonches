angular.module('app')
  .controller('CreateNewsController', function($scope, $stateParams, $window, $state, UploadPdfService, UploadService, $timeout, $mdDialog, CurrentUser, NewsService, Auth) {

    $scope.user = CurrentUser.user();
    $scope.auth = Auth;

    $scope.idNews = $stateParams.id;

    function loadAllNews() {
      NewsService.getAll().then(function(res) {
        $scope.listNews = res.data;
      });
    }
    loadAllNews();

    $scope.news = {
      content: '',
      title: '',
      image: '',
      author: ''
    };

    function loadNews(id) {
      if (id !== undefined) {
        NewsService.getOne($scope.idNews).then(function(res) {
          $scope.news = res.data;
        });
      }
    }
    loadNews($scope.idNews);

    $scope.uCanTrust = function(string) {
      return $sce.trustAsHtml(string);
    };

    $scope.newNews = {
      content: '',
      title: '',
      image: '',
      author: ''
    };

    $scope.newNews.author = CurrentUser.user()._id;

    $scope.addNews = function() {
      NewsService.create($scope.newNews).then(function(res) {
        $state.go('user.edit-news', {
          id: res.data.news._id
        });
      });
    };

    $scope.textmodal = [];
    $scope.textModalShow = false;
    $scope.OpenModalDisplayText = function() {
      $scope.textModalShow = !$scope.textModalShow;

    };

    $scope.updateNews = function() {
      NewsService.update($scope.idNews, $scope.news).then(function(res) {});
    };

    $scope.redirectListNews = function() {
      $state.go('user.news');
    };

    $scope.tinymceOptions = {
      onChange: function(e) {},
      inline: false,
      skin: 'ehpad2',
      height: 300,
      theme: 'modern',
      plugins: 'advlist autolink paste lists colorpicker link textcolor image charmap code table emoticons',
      toolbar1: 'fontsizeselect | undo redo | bold italic underline | alignleft aligncenter alignjustify alignright | bullist numlist outdent indent | preview media | forecolor backcolor emoticons | link',
      fontsize_formats: '12pt 14pt 18pt 24pt 36pt',
      paste_as_text: true,
      content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
      ]
    };

    $scope.redirectCreateNews = function() {
      $state.go('user.create-news');
    };

    $scope.showConfirm = function(ev, id) {
      var confirm = $mdDialog.confirm()
        .title('Voulez vous supprimer cet article ?')
        .textContent('Tous les éléments seront définitivement perdus')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Supprimer')
        .cancel('Annuler');

      $mdDialog.show(confirm).then(function() {
        NewsService.delete(id).then(function(res) {
          loadAllNews();
        });
      });
    };

    $scope.UploadImgModalShow = false;
    $scope.OpenModalUploadImg = function() {
      $scope.UploadImgModalShow = !$scope.UploadImgModalShow;
    };

    $scope.galleryInsertModalShow = false;
    $scope.OpenModalgalleryInsert = function() {
      $scope.galleryInsertModalShow = !$scope.galleryInsertModalShow;
      UploadService.getAll().then(function(res) {
        $scope.listimages = res.data;
      }, function(err) {});
    };

    $scope.currentPageNews = 0;
    $scope.pageSizeNews = 5;
    $scope.listNews = [];
    $scope.numberOfPagesNews = function() {
      return Math.ceil($scope.listNews.length / $scope.pageSizeNews);
    };
    for (var i = 0; i < $scope.listNews.length - 1; i++) {
      $scope.listNews.push("Item " + i);
    }

    $scope.insertImg = function(nameImg) {
      $scope.newNews.content += '<p><img src="uploads/images/' + nameImg + '" width="100%"/></p>';
      $scope.galleryInsertModalShow = false;
    };

    $scope.insertImgEditNews = function(nameImg) {
      $scope.news.content += '<p><img src="uploads/images/' + nameImg + '" width="100%"/></p>';
      $scope.galleryInsertModalShow = false;
    };

    $scope.galleryAssociateModalShow = false;
    $scope.OpenModalgalleryAssociate = function() {
      if ($scope.newNews.image) {
        $scope.newNews.image = '';
      } else {
        $scope.galleryAssociateModalShow = !$scope.galleryAssociateModalShow;
        UploadService.getAll().then(function(res) {
          $scope.listimages = res.data;
        }, function(err) {});
      }
    };

    $scope.associateImg = function(nameImg) {
      $scope.newNews.image += 'uploads/images/' + nameImg;
      $scope.news.image = 'uploads/images/' + nameImg;
      $scope.galleryAssociateModalShow = false;
      NewsService.update($scope.idNews, $scope.news).then(function(res) {});
    };

    $scope.currentPage = 0;
    $scope.pageSize = 12;
    $scope.listimages = [];
    $scope.numberOfPages = function() {
      return Math.ceil($scope.listimages.length / $scope.pageSize);
    };
    for (var j = 0; j < $scope.listimages.length - 1; j++) {
      $scope.listimages.push("Item " + j);
    }

    $scope.UploadPdfModalShow = false;
    $scope.OpenModalUploadPdf = function() {
      $scope.UploadPdfModalShow = !$scope.UploadPdfModalShow;
    };

    $scope.galleryPdfModalShow = false;
    $scope.OpenModalUrlPdf = function() {
      $scope.galleryPdfModalShow = !$scope.galleryPdfModalShow;
      UploadPdfService.getAll().then(function(res) {
        $scope.listPdf = res.data;
      }, function(err) {});
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

    $scope.OpenModalgalleryAssociateEdit = function() {
      $scope.news.image = '';
      $scope.galleryAssociateModalShow = !$scope.galleryAssociateModalShow;
      UploadService.getAll().then(function(res) {
        $scope.listimages = res.data;
      }, function(err) {});
      NewsService.update($scope.idNews, $scope.news).then(function(res) {});
    };
  });
