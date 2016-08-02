angular.module('starter.services', [])

  // MockChats Service
  .factory('Chats', function() {
    // Some fake testing data
    var chats = [];

    return {
      all: function() {
        return chats;
      },
      remove: function(chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function(chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  })

  // MockNews Service
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
