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
  $scope.form = { error: '', message: '' };

  $scope.messageReady = function() {
    var length = $scope.form.message.length;

    return length < 1 || length > 100;
  };

  $scope.hasError = function() {
    return $scope.form.error.length > 0;
  };

  $scope.sendMessage = function() {
    Chats
      .sendMessage($stateParams.chatId, $scope.form.message)
      .then(function(response) {
        $scope.form.message = '';
      })
      .catch(function(response) {
        $scope.form.error = response.data.error;

        setTimeout(function() { $scope.form.error = ''; }, 500)
      });
  };

  Chats
    .get($stateParams.chatId)
    .then(function(chat) {
      $scope.chat = chat;
    });
})

.controller('PhotoCtrl', function($scope, Photos) {
  var vm = this;

  vm.photos = [];
  vm.photos = Photos.getPhotos();
});
