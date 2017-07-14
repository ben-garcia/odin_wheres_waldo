var userClickedPosX, userClickedPosY;
var buttonChoices = ['Waldo', 'Wilma', 'Wizard'];
var interval;
var minutes = 0, seconds = 0, tenths = 0;
var dialog, form;
var puzzleIdNumber;

$(document).ready(function() {

  $('button').each(function(index, element) {
    // 'this' refers to the element.
    $(this).click(function() {
      if ($(this).text() == 'Play') {
        var src = $($($(this).parentsUntil('picture-buttons').get(1)).find('img')[0]).attr('src');
        if ($(this).attr('id') == 'The Town') {
          var puzzleID = $(this).attr('id');
          puzzleidNumber = 1;
          loadPuzzle(src);
          userInput(puzzleID);
        }
        else if ($(this).attr('id') == 'FVN and Games in Ancient Rome') {
          var puzzleID = $(this).attr('id');
          puzzleidNumber = 2;
          loadPuzzle(src);
          userInput(puzzleID);
        }
        else if ($(this).attr('id') == 'The Gobbling Gluttons') {
          var puzzleID = $(this).attr('id');
          puzzleidNumber = 3;
          loadPuzzle(src);
          userInput(puzzleID);
        }
      } else {
        if ($(this).attr('id') == 'The Town') {
          console.log('high scores');
          window.location.replace('puzzles/' + 1);
        }
        else if ($(this).attr('id') == 'FVN and Games in Ancient Rome') {
          console.log('high scores');
          window.location.replace('puzzles/' + 2);
        }
        else if ($(this).attr('id') == 'The Gobbling Gluttons') {
          console.log('high scores');
          window.location.replace('puzzles/' + 3);
        }
      }
    });
  });

  function loadPuzzle(puzzleUrl) {
    var image = '<img id=\'puzzle-picture\' src=' + puzzleUrl + '>';
    var div = '<div id=\'puzzle-page\'></div>';
    var puzzleStats = '<div id=\'puzzle-content\'></div>';

    $('body').empty();
    $('body').append(div);
    $('div#puzzle-page').append('<div id=\'image-container\'></div>');
    //$('div#puzzle-page').append(image);
    $('div#image-container').append(image);
    $('body').css({
      margin: '0',
      padding: '0'
    });
    $('img').css({
      borderRadius: '10px',
      border: '2px solid red',
      width: '1300px',
      height: '750px',
      margin: '10px',
      display: 'inline-block'
    });
    $('div#puzzle-page').append(puzzleStats);
    $('div#puzzle-content').append('<h1>Find</h1>');

    // Load the characters to find in the puzzle-content section.
    $('div#puzzle-content').append('<div id=\'find-waldo\'><h3>Waldo</h3><img src=\'https://vignette3.wikia.nocookie.net/waldo/images/9/9d/Character.Waldo.jpg/revision/latest?cb=20071001045624\'></div>');
    $('div#puzzle-content').append('<div id=\'find-wilma\'><h3>Wilma</h3><img src=\'https://vignette1.wikia.nocookie.net/waldo/images/3/3e/Character.Wenda.jpg/revision/latest?cb=20071001044014\'></div>');
    $('div#puzzle-content').append('<div id=\'find-wizard\'><h3>Wizard</h3><img src=\'https://static.giantbomb.com/uploads/scale_small/4/46311/1341868-wizard.gif\'></div>');

    // Set up the timer.
    $('div#puzzle-content').append('<div id=\'timer\'><h3>Timer</h3><p><span id=\'minutes\'>00</span>:<span id=\'seconds\'>00</span>:<span id=\'tenths\'>00</span></p></div>');

    $('div#puzzle-content').append('<button id=\'main-menu\' type=\'button\'>Main Menu</button>');
    $('button#main-menu').click(function() {
      document.location.href = '/';
    })

    // Set the interval to increment the timer.
    var mins = document.getElementById('minutes');
    var secs = document.getElementById('seconds');
    var tens = document.getElementById('tenths');

    clearInterval(interval);
    interval = setInterval(function startTimer() {
      tenths++;

      if (tenths < 9) {
        tens.innerHTML = '0' + tenths;
      }

      if (tenths > 9) {
        tens.innerHTML = tenths;
      }

      if (tenths > 99) {
        seconds++;
        secs.innerHTML = '0' + seconds;
        tenths = 0;
        tens.innerHTML = '0' + 0;
      }

      if (seconds < 9) {
        secs.innerHTML = '0' + seconds;
      }

      if (seconds > 9) {
        secs.innerHTML = seconds;
      }

      if (seconds > 59) {
        minutes++;
        mins.innerHTML = '0' + minutes;
        seconds = 0;
        secs.innerHTML = '0' + seconds;
      }

    }, 10);
  }

  function userInput(puzzleID) {
    $('#puzzle-picture').click(function(event) {
      // check if the element with id 'user-prompt' exists.
      // if it does then remove it.
      if ($('#user-prompt').length) {
        $('#user-prompt').remove();
      }
      // if the element doesn't exists
      // then place it on the DOM.
      else {
        var highlighted = '<div id=\'user-prompt\'><div id=\'highlighted\'></div></div>';
        // Remove any previous highlighted divs.
        $('div#user-prompt').remove();

        $('div#image-container').append(highlighted);
        $('div#user-prompt').append('<div id=\'character-options\'></div>');
        $('div#character-options').append('<p><strong>Who Did You Find?</strong></p>');

        if (buttonChoices.length > 0) {
          $.each(buttonChoices, function(index, element) {
            if (element == 'Waldo') {
              $('div#character-options').append('<button id=\'waldo\'>Waldo</button>');
            }
            else if (element == 'Wilma') {
              $('div#character-options').append('<button id=\'wilma\'>Wilma</button>');
            }
            else if (element == 'Wizard') {
              $('div#character-options').append('<button id=\'wizard\'>Wizard</button>');
            }
          })
        }
        else {
          // TODO what happens when the user has found all the characters.
        }

        $('div#character-options').fadeIn('slow', 5000);
        $('div#user-prompt').css({
          left: event.pageX - 20,
          top: event.pageY - 25
        });
        userClickedPosX = event.pageX;
        userClickedPosY = event.pageY;
        fetchCharacters(puzzleID);
      }
    });
  }

  // Making an AJAX request to the Rails backend to get the
  // Characters in the database.
  function fetchCharacters(puzzleID) {
    $.ajax({
      url: '/characters.json',
      dataType: 'json',
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Status: ' + textStatus);
        console.log('Error Thrown: ' + errorThrown);
      },
      method: 'GET',
      success: function(data, textStatus, jqXHR) {
        var characters;

        $.each(data, function(index, element) {

          if (puzzleID == 'The Town' && index == 0) {
            characters = [{
                name: data[0].name,
                posX: data[0].x_position,
                posY: data[0].y_position
              },
              {
                name: data[1].name,
                posX: data[1].x_position,
                posY: data[1].y_position
              },
              {
                name: data[2].name,
                posX: data[2].x_position,
                posY: data[2].y_position
              }
            ]
            verifyUserChoice(characters);
          }
          else if (puzzleID == 'FVN and Games in Ancient Rome' && index == 3) {
            characters = [{
                name: data[3].name,
                posX: data[3].x_position,
                posY: data[3].y_position
              },
              {
                name: data[4].name,
                posX: data[4].x_position,
                posY: data[4].y_position
              },
              {
                name: data[5].name,
                posX: data[5].x_position,
                posY: data[5].y_position
              }
            ]
            verifyUserChoice(characters);
          }
          else if (puzzleID == 'The Gobbling Gluttons' && index == 6) {
            characters = [{
                name: data[6].name,
                posX: data[6].x_position,
                posY: data[6].y_position
              },
              {
                name: data[7].name,
                posX: data[7].x_position,
                posY: data[7].y_position
              },
              {
                name: data[8].name,
                posX: data[8].x_position,
                posY: data[8].y_position
              }
            ]
            verifyUserChoice(characters);
          }
        });
      }
    })
  }

  function verifyUserChoice(characters) {
    var name, posX, posY;

    $('#waldo').click(function(event) {
      name = characters[0].name;
      posX = characters[0].posX;
      posY = characters[0].posY;

      if ((userClickedPosX + 25) > posX && (userClickedPosX - 25) < posX && (userClickedPosY + 25) > posY && (userClickedPosY - 25) < posY) {
        $('#image-container').prepend('<h1 id=\'correct\'>Correct</h1>');
        setTimeout(function() {
          $('#correct').remove();
        }, 3000);
        $('#waldo').remove();
        $('#find-waldo').remove();
        $('#user-prompt').remove();
        // remove the 'Waldo' element for the buttonChoices array.
        // find the index to 'Waldo' to remove it.
        var i = buttonChoices.indexOf('Waldo');
        buttonChoices.splice(i, 1);
        $('div#image-container').append('<div id=\'permanent-box-waldo\'></div>');
        $('#permanent-box-waldo').css({
          left: userClickedPosX - 20,
          top: userClickedPosY - 25
        });
      }
      else {
        $('#image-container').prepend('<h1 id=\'try-again\'>Try Again</h1>');
        setTimeout(function() {
          $('#try-again').remove();
        }, 3000);
      }
      if (buttonChoices == 0) {
        clearInterval(interval);
        showForm();
      }

    });

    $('#wilma').click(function(event) {
      name = characters[1].name;
      posX = characters[1].posX;
      posY = characters[1].posY;

      if ((userClickedPosX + 25) > posX && (userClickedPosX - 25) < posX && (userClickedPosY + 25) > posY && (userClickedPosY - 25) < posY) {
        $('#image-container').prepend('<h1 id=\'correct\'>Correct</h1>');
        setTimeout(function() {
          $('#correct').remove();
        }, 3000);
        $('#wilma').remove();
        $('#find-wilma').remove();
        $('#user-prompt').remove();
        // remove the 'Wilma' element for the buttonChoices array.
        // find the index to 'Wilma' to remove it.
        var i = buttonChoices.indexOf('Wilma');
        buttonChoices.splice(i, 1);
        $('div#image-container').append('<div id=\'permanent-box-wilma\'></div>');
        $('#permanent-box-wilma').css({
          left: userClickedPosX - 20,
          top: userClickedPosY - 25
        });
      }
      else {
        $('#image-container').prepend('<h1 id=\'try-again\'>Try Again</h1>');
        setTimeout(function() {
          $('#try-again').remove();
        }, 3000);
      }
      if (buttonChoices == 0) {
        clearInterval(interval);
        showForm();
      }

    });

    $('#wizard').click(function(event) {
      name = characters[2].name;
      posX = characters[2].posX;
      posY = characters[2].posY;

      if ((userClickedPosX + 25) > posX && (userClickedPosX - 25) < posX && (userClickedPosY + 25) > posY && (userClickedPosY - 25) < posY) {
        $('#image-container').prepend('<h1 id=\'correct\'>Correct</h1>');
        setTimeout(function() {
          $('#correct').remove();
        }, 3000);
        $('#wizard').remove();
        $('#find-wizard').remove();
        $('#user-prompt').remove();
        // remove the 'Wizard' element for the buttonChoices array.
        // find the index to 'Wizard' to remove it.
        var i = buttonChoices.indexOf('Wizard');
        buttonChoices.splice(i, 1);
        $('div#image-container').append('<div id=\'permanent-box-wizard\'></div>');
        $('#permanent-box-wizard').css({
          left: userClickedPosX - 20,
          top: userClickedPosY - 25
        });
      }
      else {
        $('#image-container').prepend('<h1 id=\'try-again\'>Try Again</h1>');
        setTimeout(function() {
          $('#try-again').remove();
        }, 3000);
      }
      if (buttonChoices == 0) {
        clearInterval(interval);
        showForm();
      }
    });

  }

  function showForm() {
    var formHTML = '<div id=\'dialog-form\'><form id=\'congrats-form\'><fieldset><input type=\'text\' name=\'name\' placeholder=\'Enter Your Name\'></input><input type=\'submit\'></input></fieldset></form><div>';
    $('#puzzle-page').prepend(formHTML);
    dialog = $('#dialog-form').dialog({
      title: 'Congratulations!',
      dialogClass: 'no-class',
      autoOpen: false,
      height: 400,
      width: 500,
      model: true,
      resizeable: false,
      draggable: false,
      open: function() {
        $('#dialog-form').prepend('<p id=\'dialog-user-info\'>You Have Completed The Puzzle<br>Your Time: <strong>' + minutes + ' mins ' + seconds + '.' + tenths + ' secs</strong><br><br> Enter Your Name or Click Submit to remain Anonymous<br><br> Thank You For Playing!!!' + '</p>');
      }
    });

    form = dialog.find('form').on('submit', function(event) {
      // Stop the form from submitting normally.
      event.preventDefault();

      // Send query parameters to the Rails ScoresController create action.
      var userTime;
      if (minutes == 0) {
        userTime = parseInt(seconds.toString() + tenths.toString());
      }
      else {
        userTime = parseInt(minutes.toString() + seconds.toString() + tenths.toString());
      }

      var userName;
      var userInput = $('input[type=text]').val();

      if (/\S/.test(userInput)) {
        userName = $('input[type=text]').val();
      }
      else {
        userName = 'Anonymous' + Math.floor(Math.random() * 10000);
      }

      var url = '/ScoreCreate';
      var dataToSend = 'player_name=' + userName + '&number=' + userTime + '&puzzle_id=' + puzzleidNumber

      $.ajax({
        url: url,
        type: 'post',
        data: dataToSend,
        success: function() {
          // redirect to the root page.
          window.location.replace('/');
        }
      });

    });

    dialog.dialog('open');

  }

});
