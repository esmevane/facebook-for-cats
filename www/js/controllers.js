angular.module('starter.controllers', [])

.controller('NewsCtrl', function($scope, News) {
  var vm = this;

  vm.articles = [];

  News
    .getNews()
    .then(function(response) {
      vm.articles = response.data;
    });
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('PhotoCtrl', function($scope, Photos) {
  var vm = this;

  vm.photos = [];
  vm.photos = Photos.getPhotos();
});
