var libraries = {};

$(document).on('ready', function() {

  var Game = function(title, genre) {
    this.title = title;
    this.genre = genre;
  };

  var GameLibrary = function(title) {
    this.title = title;
    this.games = [];
  };

  GameLibrary.prototype.titleToID = function() {
    var id = this.title.toLowerCase().replace(/[^a-z0-9]/gi, "");
    return id;
  };

  GameLibrary.prototype.renderLibrary = function() {
    var id = this.titleToID();
    $('#title').append(
      "<div class='lib'>" + //.lib
        "<h2 id='" + id + "-header' class='header highlight'>" + this.title + "<button class='btn btn-danger lib-remove' data-title='"+this.title+"'>Remove library</button></h2>" +
        "<table class='table table-striped' id='"+ id + "-table' >" +
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
        '<div id="' + id + 'addGameForm" class="highlight">' +
          '<form class="form-inline" id="' + id + 'addGame">' +
            '<div class="form-group">' +
              '<input type="title" class="form-control newGameTitle" placeholder="Game title">' +
            '</div>' +
            '<div class="form-group">' +
              '<input type="genre" class="form-control newGameGenre" placeholder="Genre">' +
            '</div>' +
            '<div class="form-group">' +
              '<button type="submit" class="btn btn-default addGameSubmit">Add game</button>' +
            '</div>' +
          '</form>' +
        '</div>' +
      '</div' +
      '<div id="addGameErrors" class="gameError">'+
        '<div class="alert alert-danger gameError" role="alert">'+
            '<span class="glyphicon glyphicon-exclamation-sign gameError" aria-hidden="true"></span>' +
            '<span class="sr-only">Error:</span>' +
            '<span id="render-game-error"></span>' +
          '</div>' +
        '</div>');

    var thisGameLib = this;

    $('#' + id + 'addGame').submit(function(e){
      e.preventDefault();
      var gameTitle = $(this).find('.newGameTitle').val();
      var gameGenre = $(this).find('.newGameGenre').val();
      if (gameTitle !== '') {
        if (thisGameLib.games.indexOf(gameTitle) == -1) {
          var newGame = new Game(gameTitle, gameGenre);
          libraries[id].addGame(newGame);
          libraries[id].renderGame();
          $(this)[0].reset();
        }
      }
      else {
        $('.gameError').show();
        $('#render-game-error').html("Title can't be blank");
        $('.gameError').fadeOut(5000);
      }
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
          "<td> <span class='remove' data-game='" + this.games[i].title + "' data-lib='" + this.title + "'>Delete</span></td>" +
        "</tr>");
    }
  };

  $(document).on('click', '.lib-remove',function() {
    $(this).closest('.lib').remove();
    removeLib($(this).data('title'));
  });

  $(document).on('click', '.remove',function() {
    $(this).closest('tr').remove();
    libraries[$(this).data('lib')].removeGame($(this).data('game'));
  });

  GameLibrary.prototype.addGame = function(game) {
    this.games.push(game);
  };

  function removeLib(gameLibTitle) {
    delete libraries[gameLibTitle];
  }

  GameLibrary.prototype.removeGame = function(gameTitle) {
    for (var i=0; i<this.games.length; i++) {
      if (this.games[i].title === gameTitle) {
        this.games.splice(i, 1);
      }
    }
  };

  $('#addLibrary').submit(function(e){
    e.preventDefault();
    var title = $('#newLibraryTitle').val();
    if (title !== "") {
      if(!(title in libraries)) {
        var gameLib = new GameLibrary(title);
        gameLib.renderLibrary(gameLib);
        libraries[gameLib.titleToID()] = gameLib;
        addLibrary.reset();
      }
      else {
        $('#addLibErrors').show();
        $('#render-error').html('already a library');
        $('#addLibErrors').fadeOut(5000);

      }
    }
    else {
      $('#addLibErrors').show();
      $('#render-error').html("Library name must not be blank");
      $('#addLibErrors').fadeOut(5000);
    }
  });
});
// no duplicate game
// flash notice
// remove lib from liberaries