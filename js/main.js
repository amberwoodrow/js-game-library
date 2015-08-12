$(document).on('ready', function() {
  console.log('sanity check!');
  var libraries = {};

  var Game = function(title, genre) {
    this.title = title;
    this.genre = genre;
  };

  var GameLibrary = function(title) {
    this.title = title;
    this.games = [];
  };

  // Game.prototype.render = function(game) {
  //   $('').append('<li>' + JSON.stringify(game)+ '</li>');
  // };

  GameLibrary.prototype.titleToID = function() {
    var id = this.title.toLowerCase().replace(/ /g, "");
    return id;
  };

  GameLibrary.prototype.renderLibrary = function() {
    var id = this.titleToID();
    console.log(id);

    $('#title').append("<h4>" + this.title + "</h4><table class='table table-striped' id='"+ id + "-table' >" +
        "<thead>" +
          "<tr>" +
            "<th>Title</th>" +
            "<th>Genre</th>" +
            "<th>Delete</th>" +
          "</tr>" +
        "</thead>" +
        "<tbody id=" + id + ">" +
        "</tbody>" +
      "</table>" +
      '<button type="button" class="btn btn-success" id="'+ id +'-btn">' +
        '<span class="glyphicon glyphicon-plus">' + 
        '</span> ' +
        'Add game' + 
      '</button>'
      );

    $('#'+id+'-btn').click(function() {
      $('<div>' +
          '<form class="form-inline" id="' + id + 'addGame">' +
            '<div class="form-group">' +
              '<input type="title" class="form-control newGameTitle" placeholder="Game title">' +
            '</div>' +
            '<div class="form-group">' +
              '<input type="genre" class="form-control newGameGenre" placeholder="Genre">' +
            '</div>' +
            '<button type="submit" class="btn btn-default addGameSubmit">Add game</button>' +
          '</form>' +
        '</div>').insertBefore(('#'+id+'-btn')); //slide btn down to display add game form.

      $('#' + id + 'addGame').submit(function(e){
        e.preventDefault();
        var gameTitle = $(this).find('.newGameTitle').val();
        var gameGenre = $(this).find('.newGameGenre').val();
        var newGame = new Game(gameTitle, gameGenre);
        libraries[id].addGame(newGame);
        libraries[id].renderGame();
        console.log(libraries);
      });
    });
  };

  GameLibrary.prototype.renderGame = function() {
    var id = "#" + this.titleToID();
    $(id).html("");
    for (var i=0;i<this.games.length; i++) {
      $(id).append(
        "<tr>" +
          "<td>" + this.games[i].title + "</td>" +
          "<td>" + this.games[i].genre + "</td>" +
          "<td> <span class='remove' id=" + this.games[i].title + ">Delete</span></td>" +
        "</tr>");
      // if I find it, to remove it with unique id
    }
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

  $('#addLibrary').submit(function(e){
    e.preventDefault();
    var title = $('#newLibraryTitle').val();
    var gameLib = new GameLibrary(title);
    gameLib.renderLibrary(gameLib);
    libraries[gameLib.titleToID()] = gameLib;
    console.log(libraries);
  });

  // var game = new Game('Travel the World on a Magic Carpet', 'RPG');
  // var gameLibrary = new GameLibrary('Adventure Games');

  // var game2 = new Game('Candy Crush', 'Puzzle');
  // var game3 = new Game('Candy Stomp', 'Angry Puzzle');
  // var gameLibrary2 = new GameLibrary('Puzzle Games');

  // game.render(game);
  // gameLibrary.addGame(game);
  // gameLibrary2.addGame(game2);
  // gameLibrary2.addGame(game3);

  // gameLibrary.render(gameLibrary);
  // gameLibrary.renderPart2(gameLibrary);
  // gameLibrary.render(gameLibrary2);
  // gameLibrary.renderPart2(gameLibrary2);

  // gameLibrary.removeGame(game);
  // console.log(gameLibrary);
});

// add games to existing game library or make a newlibrary
// can delete games and libraries
// reset form
// hide form
// delete games
// delete libraries
