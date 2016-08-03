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
  $scope.chats = [];
  $scope.unread = 0;

  Chats
    .all()
    .then(function(chats) {
      var unread = chats.filter(function(chat) {
        return chat.unread
      });

      $scope.chats = chats;
      $scope.unread = unread.length;
    });

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = {};

  Chats
    .get($stateParams.chatId)
    .then(function(chat) {
      $scope.chat = chat;
    })
})

.controller('PhotoCtrl', function($scope, Photos) {
  var vm = this;

  vm.photos = [];
  vm.photos = Photos.getPhotos();
});
