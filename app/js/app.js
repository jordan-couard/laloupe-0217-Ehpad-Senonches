
angular.module('app', ['ngMap','ui.router', 'ui.tinymce', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngFileUpload', 'dndLists', 'ngSanitize', 'ksSwiper', 'textSizeSlider'])
.run(function() {
  moment.locale('fr');
});
