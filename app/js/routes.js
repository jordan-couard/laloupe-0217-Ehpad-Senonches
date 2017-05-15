angular.module('app')
    .config(function($stateProvider, $urlRouterProvider, AccessLevels) {
        $stateProvider
            .state('anon', {
                abstract: true,
                data: {
                    access: AccessLevels.anon
                },
                views: {
                    'navbar@': {
                        templateUrl: 'anon/navbar.html',
                        controller: 'NavbarController'
                    }
                }
            })
            .state('anon.home', {
                url: '/',
                views: {
                    'content@': {
                        templateUrl: 'anon/home.html',
                        controller: 'MainController'
                    }
                }
            })
            .state('anon.login', {
                url: '/login',
                views: {
                    'content@': {
                        templateUrl: 'anon/login.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('anon.register', {
                url: '/register',
                views: {
                    'content@': {
                        templateUrl: 'anon/register.html',
                        controller: 'RegisterController'
                    }
                }
            });
        $stateProvider
            .state('user', {
                abstract: true,
                url: '/user',
                views: {
                    'navbar@': {
                        templateUrl: 'user/navbar.html',
                        controller: 'NavbarController'
                    }
                },
                data: {
                    access: AccessLevels.user
                }
            })
            .state('user.dashboard', {
                url: '/dashboard',
                views: {
                    'content@': {
                        templateUrl: 'user/dashboard.html',
                        controller: 'DashboardController'
                    }
                }
            })
            .state('user.admin', {
                url: '/admin',
                views: {
                    'content@': {
                        templateUrl: 'user/admin.html',
                        controller: 'AdminController'
                    }
                }
            })
            .state('user.submenu', {
                url: '/submenu',
                views: {
                    'content@': {
                        templateUrl: 'user/submenu.html',
                        controller: 'SubmenuController'
                    }
                }
            })
            .state('user.edit-submenu', {
                url: '/submenu/:id',
                views: {
                    'content@': {
                        templateUrl: 'user/edit-submenu.html',
                        controller: 'SubmenuController'
                    }
                }
            })
            .state('user.news', {
                url: '/news',
                views: {
                    'content@': {
                        templateUrl: 'user/news.html',
                        controller: 'newsController'
                    }
                }
            })
            .state('user.edit-news', {
                url: '/news/:id',
                views: {
                    'content@': {
                        templateUrl: 'user/edit-news.html',
                        controller: 'newsController'
                    }
                }
            })
            .state('user.calendar', {
                url: '/evenements',
                views: {
                    'content@': {
                        templateUrl: 'user/calendar.html',
                        controller: 'CalendarController'
                    }
                }
            })
            .state('user.users', {
                url: '/users',
                views: {
                    'content@': {
                        templateUrl: 'user/users.html',
                        controller: 'UsersController'
                    }
                }
            })
            .state('user.profile', {
                url: '/profile',
                views: {
                    'content@': {
                        templateUrl: 'user/profile.html',
                        controller: 'ProfileController'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
    })
    .directive('modalDialog', function() {
      return {
        restrict: 'E',
        scope: {
          show: '='
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: function(scope, element, attrs) {
          scope.dialogStyle = {};
          if (attrs.width)
            scope.dialogStyle.width = attrs.width;
          if (attrs.height)
            scope.dialogStyle.height = attrs.height;
          scope.hideModal = function() {
            scope.show = false;
          };
        },
        templateUrl:'user/galerie-images.html'
      };
    });
