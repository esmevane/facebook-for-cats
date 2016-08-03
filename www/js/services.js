angular.module('starter.services', [])

  .factory('Chats', ['$http', '$window', function($http, $window) {
    var baseUri = 'https://facebook-for-cats-api.herokuapp.com/chats';
    var chats = [];
    var cache = {};

    var getChats = function() {
      if (chats.length > 0) {
        return Promise.resolve(chats);
      };

      return $http
        .get(baseUri)
        .then(function(response) {
          chats = response.data;

          return chats;
        });
    };

    var getChat = function(chatId) {
      var getChatBody = function(chat) {
        if (chat.id) {
          if (cache[chat.id]) {
            return Promise.resolve(cache[chat.id]);
          };

          var uri = [baseUri, chat.id].join('/');

          return $http
            .get(uri)
            .then(function(response) {
              cache[chat.id] = response.data;

              return cache[chat.id];
            });
        };

        return Promise.resolve(chat);
      }

      var locateChat = function(chats) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }

      return getChats().then(locateChat).then(getChatBody);
    }

    var sendMessage = function(chatId, message) {
      var request = {
        method: 'POST',
        url: 'https://facebook-for-cats-api.herokuapp.com/echoThePost',
        data: { text: message },
        headers: { 'catbook-apikey': "catbook123secretapikey" }
      }

      return $http(request)
        .then(function() {
          $window.history.back();
        })
    }

    return {
      all: getChats,
      sendMessage: sendMessage,
      remove: function(chat) {
        return chats.splice(chats.indexOf(chat), 1);
      },
      get: getChat
    };
  }])

  .factory('News', ['$http', function($http) {
    var getNews = function() {
      return $http
        .get('https://facebook-for-cats-api.herokuapp.com/news');
    }

    return {
      getNews: getNews
    }
  }])

  // Photos Service
  .factory('Photos', function() {
    var KITTEN_PHOTOS = 40;
    var MIN_WIDTH = 50;
    var MAX_WIDTH = 100;
    var MIN_HEIGHT = 50;
    var MAX_HEIGHT = 120;

    function getPhotos() {
      var width, height;
      var photos = [];
      var widthRange = MAX_WIDTH - MIN_WIDTH;
      var heightRange = MAX_HEIGHT - MIN_HEIGHT;

      // create a bunch of random urls to placekitten.com
      for (var i = 0; i < KITTEN_PHOTOS; i++) {
        width = MIN_WIDTH + Math.round(Math.random() * widthRange);
        height = MIN_HEIGHT + Math.round(Math.random() * heightRange);

        photos.push({
          url : 'https://placekitten.com/' + width + '/' + height
        })
      }

      return photos;
    }

    return {
      getPhotos: getPhotos
    }
  });
