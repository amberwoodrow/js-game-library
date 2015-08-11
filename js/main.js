$(document).on('ready', function() {
  console.log('sanity check!');

  var Game = function(title, genre) {
    this.title = title;
    this.genre = genre;
  };

  var GameLibrary = function(title) {
    this.title = title;
    this.games = [];
  };

  Game.prototype.render = function(game) {
    $('body').append(JSON.stringify(game));
  };

  GameLibrary.prototype.render = function(gameLibrary) {
    $('body').append(JSON.stringify(gameLibrary));
  };

  GameLibrary.prototype.addGame = function(game) {
    this.games.push(game);
  };

  GameLibrary.prototype.removeGame = function(game) {
    for (var i=0; this.games.length; i++) {
      if (this.games[i] === game) {
        this.games.splice(i, 1);
      };
    }
  };

  var game = new Game('Game Title', 'game genre');
  var gameLibrary = new GameLibrary('Games Title');

  game.render(game);
  gameLibrary.render(gameLibrary);
  console.log(game);
  gameLibrary.addGame(game);
  console.log(gameLibrary);
  gameLibrary.removeGame(game);
  console.log(gameLibrary);
});
