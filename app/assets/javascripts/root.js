var userClickedPosX, userClickedPosY;
var buttonChoices = ["Waldo", "Wilma", "Wizard"];
var interval;
var minutes = 0,
  seconds = 0,
  tenths = 0;
var dialog, form;
var puzzleIdNumber, puzzleID;

$(document).ready(function() {
  $(".info__button").each(function(index, element) {
    // 'this' refers to the element.
    $(this).click(function() {
      // Get the src of the image the belongs to the button the user clicked.
      var src = $($(this).parents()[1]).children()[0].src;

      // Check the id attribute associated with the button clicked.
      // load the correct puzzle based on the id.
      if ($(this).attr("id") == "The Town") {
        puzzleID = $(this).attr("id");

        puzzleidNumber = 1;

        loadPuzzle(src);
        userInput(puzzleID);
      } else if ($(this).attr("id") == "FVN and Games in Ancient Rome") {
        puzzleID = $(this).attr("id");

        puzzleidNumber = 2;

        loadPuzzle(src);
        userInput(puzzleID);
      } else if ($(this).attr("id") == "The Gobbling Gluttons") {
        puzzleID = $(this).attr("id");

        puzzleidNumber = 3;

        loadPuzzle(src);
        userInput(puzzleID);
      }
    });
  });

  function loadPuzzle(puzzleUrl) {
    var image = "<img class='game-board__img' src=" + puzzleUrl + ">";
    var div = "<div class='game-board'></div>";
    var puzzleStats = "<div class='game-board__info'></div>";

    $(".main")
      .empty()
      .append(div);
    $(".game-board").append("<div class='game-board__inner'></div>");
    $(".game-board__inner").append(image);

    $("img").css({
      borderRadius: "10px",
      border: "2px solid red",
      width: "1300px",
      height: "750px",
      margin: "10px",
      display: "inline-block"
    });

    $(".game-board").append(puzzleStats);
    $(".game-board__info").append(
      "<h1 class='game-board__instructions'>Find</h1>"
    );

    // Load the characters to find in the puzzle-content section.
    $(".game-board__info").append(
      "<div class='find-waldo'><h3 class='find-waldo__title'>Waldo</h3><img class='find-waldo__img' src='https://vignette3.wikia.nocookie.net/waldo/images/9/9d/Character.Waldo.jpg/revision/latest?cb=20071001045624'></div>"
    );
    $(".game-board__info").append(
      "<div class='find-wilma'><h3 class='find-wilma__title'>Wilma</h3><img class='find-wilma__img' src='https://vignette1.wikia.nocookie.net/waldo/images/3/3e/Character.Wenda.jpg/revision/latest?cb=20071001044014'></div>"
    );
    $(".game-board__info").append(
      "<div class='find-wizard'><h3 class='find-wizard__title'>Wizard</h3><img class='find-wizard__img' src='https://static.giantbomb.com/uploads/scale_small/4/46311/1341868-wizard.gif'></div>"
    );

    // Set up the timer.
    $(".game-board__info").append(
      "<div class='timer'><h3 class='timer__title'>Timer</h3><p class='timer__inner'><span class='timer__minutes'>00</span>:<span class='timer__seconds'>00</span>:<span class='timer__tenths'>00</span></p></div>"
    );

    // Set the interval to increment the timer.
    var mins = document.querySelector(".timer__minutes");
    var secs = document.querySelector(".timer__seconds");
    var tens = document.querySelector(".timer__tenths");

    clearInterval(interval);
    interval = setInterval(function startTimer() {
      tenths++;

      if (tenths < 9) {
        tens.innerHTML = "0" + tenths;
      }

      if (tenths > 9) {
        tens.innerHTML = tenths;
      }

      if (tenths > 99) {
        seconds++;
        secs.innerHTML = "0" + seconds;
        tenths = 0;
        tens.innerHTML = "0" + 0;
      }

      if (seconds < 9) {
        secs.innerHTML = "0" + seconds;
      }

      if (seconds > 9) {
        secs.innerHTML = seconds;
      }

      if (seconds > 59) {
        minutes++;
        mins.innerHTML = "0" + minutes;
        seconds = 0;
        secs.innerHTML = "0" + seconds;
      }
    }, 10);

    showForm();
  }

  function userInput(puzzleID) {
    $(".game-board__img").click(function(event) {
      // check if the element with class 'game-board__prompt' exists.
      // if it does then remove it.
      if ($(".game-board__prompt").length) {
        $(".game-board__prompt").remove();
      }
      // if the element doesn't exists
      // then place it on the DOM.
      else {
        var highlighted =
          "<div class='game-board__prompt'><div class='highlighted'></div></div>";
        // Remove any previous highlighted divs.
        $(".game-board__prompt").remove();

        $(".game-board__inner").append(highlighted);
        $(".game-board__prompt").append(
          "<div class='character-options'></div>"
        );
        $(".character-options").append(
          "<p class='character-options__inner'><strong>Who Did You Find?</strong></p>"
        );

        // Let the user know what characters he/she is looking for.
        if (buttonChoices.length > 0) {
          $.each(buttonChoices, function(index, element) {
            if (element == "Waldo") {
              $(".character-options").append(
                "<button class='character-options__waldo'>Waldo</button>"
              );
            } else if (element == "Wilma") {
              $(".character-options").append(
                "<button class='character-options__wilma'>Wilma</button>"
              );
            } else if (element == "Wizard") {
              $(".character-options").append(
                "<button class='character-options__wizard'>Wizard</button>"
              );
            }
          });
        }

        var headerHeight = $(".header").height();

        $(".character-options").fadeIn("slow", 5000);
        $(".game-board__prompt").css({
          left: event.pageX - 20,
          top: event.pageY - (25 + headerHeight)
        });
        userClickedPosX = event.pageX;
        userClickedPosY = event.pageY - headerHeight;

        fetchCharacters(puzzleID);
      }
    });
  }

  // Making an AJAX request to the Rails backend to get the
  // character positions in the database.
  function fetchCharacters(puzzleID) {
    $.ajax({
      url: "/characters.json",
      dataType: "json",
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("Status: " + textStatus);
        console.log("Error Thrown: " + errorThrown);
      },
      method: "GET",
      success: function(data, textStatus, jqXHR) {
        var characters;

        $.each(data, function(index, element) {
          if (puzzleID == "The Town" && index == 0) {
            characters = [
              {
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
            ];
            verifyUserChoice(characters);
          } else if (
            puzzleID == "FVN and Games in Ancient Rome" &&
            index == 3
          ) {
            characters = [
              {
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
            ];
            verifyUserChoice(characters);
          } else if (puzzleID == "The Gobbling Gluttons" && index == 6) {
            characters = [
              {
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
            ];
            verifyUserChoice(characters);
          }
        });
      }
    });
  }

  function verifyUserChoice(characters) {
    var name, posX, posY;

    $(".character-options__waldo").click(function(event) {
      name = characters[0].name;
      posX = characters[0].posX;
      posY = characters[0].posY;

      if (
        userClickedPosX + 25 > posX &&
        userClickedPosX - 25 < posX &&
        userClickedPosY + 25 > posY &&
        userClickedPosY - 25 < posY
      ) {
        $(".game-board__inner").prepend("<span class='correct'>Correct</span>");
        setTimeout(function() {
          $(".correct").remove();
        }, 3000);
        $(".character-options__waldo").remove();
        $(".find-waldo").remove();
        $(".game-board__prompt").remove();
        // remove the 'Waldo' element for the buttonChoices array.
        // find the index of 'Waldo' to remove it.
        var i = buttonChoices.indexOf("Waldo");
        buttonChoices.splice(i, 1);
        $(".game-board__inner").append(
          "<div class='permanent-box-waldo'></div>"
        );
        $(".permanent-box-waldo").css({
          left: userClickedPosX - 20,
          top: userClickedPosY - 25
        });
      } else {
        $(".game-board__inner").prepend(
          "<span class='incorrect'>Try Again</span>"
        );
        $(".game-board__prompt").remove();
        setTimeout(function() {
          $(".incorrect").remove();
        }, 3000);
      }
      if (buttonChoices == 0) {
        clearInterval(interval);
        showForm();
      }
    });

    $(".character-options__wilma").click(function(event) {
      name = characters[1].name;
      posX = characters[1].posX;
      posY = characters[1].posY;

      if (
        userClickedPosX + 25 > posX &&
        userClickedPosX - 25 < posX &&
        userClickedPosY + 25 > posY &&
        userClickedPosY - 25 < posY
      ) {
        $(".game-board__inner").prepend("<span class='correct'>Correct</span>");
        setTimeout(function() {
          $(".correct").remove();
        }, 3000);
        $(".character-options__wilma").remove();
        $(".find-wilma").remove();
        $(".game-board__prompt").remove();
        // remove the 'Wilma' element for the buttonChoices array.
        // find the index to 'Wilma' to remove it.
        var i = buttonChoices.indexOf("Wilma");
        buttonChoices.splice(i, 1);
        $(".game-board__inner").append(
          "<div class='permanent-box-wilma'></div>"
        );
        $(".permanent-box-wilma").css({
          left: userClickedPosX - 20,
          top: userClickedPosY - 25
        });
      } else {
        $(".game-board__inner").prepend(
          "<span class='incorrect'>Try Again</span>"
        );
        $(".game-board__prompt").remove();
        setTimeout(function() {
          $(".incorrect").remove();
        }, 3000);
      }
      if (buttonChoices == 0) {
        clearInterval(interval);
        showForm();
      }
    });

    $(".character-options__wizard").click(function(event) {
      name = characters[2].name;
      posX = characters[2].posX;
      posY = characters[2].posY;

      if (
        userClickedPosX + 25 > posX &&
        userClickedPosX - 25 < posX &&
        userClickedPosY + 25 > posY &&
        userClickedPosY - 25 < posY
      ) {
        $(".game-board__inner").prepend("<span class='correct'>Correct</span>");
        setTimeout(function() {
          $(".correct").remove();
        }, 3000);
        $(".character-options__wizard").remove();
        $(".find-wizard").remove();
        $(".game-board__prompt").remove();
        // remove the 'Wizard' element for the buttonChoices array.
        // find the index to 'Wizard' to remove it.
        var i = buttonChoices.indexOf("Wizard");
        buttonChoices.splice(i, 1);
        $(".game-board__inner").append(
          "<div class='permanent-box-wizard'></div>"
        );
        $(".permanent-box-wizard").css({
          left: userClickedPosX - 20,
          top: userClickedPosY - 25
        });
      } else {
        $(".game-board__inner").prepend("<span class='incorrect'>Again</span>");
        $(".game-board__prompt").remove();
        setTimeout(function() {
          $(".incorrect").remove();
        }, 3000);
      }
      if (buttonChoices == 0) {
        clearInterval(interval);
        showForm();
      }
    });
  }

  function showForm() {
    // blur the main section and show the form.
    $(".main").css({ opacity: 0.3 });

    var formHTML =
      "<section class='dialog-form'><form class='congrats-form'><fieldset class='congrats-form__inner'><input class='dialog-form__input' type='text' name='name' placeholder='Enter Your Name'></input><input class='dialog-form__submit' type='submit'></input></fieldset></form></section>";

    $(".game-board").prepend(formHTML);

    dialog = $(".dialog-form").dialog({
      title: "Congratulations!",
      dialogClass: "formform",
      autoOpen: false,
      height: 400,
      width: 500,
      model: true,
      resizeable: false,
      draggable: false,
      open: function() {
        $(".dialog-form").prepend(
          "<p class='dialog-user-info'>You Have Completed The Puzzle<br>Your Time: <strong>" +
            minutes +
            " mins " +
            seconds +
            "." +
            tenths +
            " secs</strong><br><br> Thank You For Playing!!!" +
            "</p>"
        );
      }
    });

    form = dialog.find(".congrats-form").on("submit", function(event) {
      // Stop the from from submitting normally(refreshing the page)
      event.preventDefault();

      // Send query parameters to the Rails ScoresController create action.
      var userTime;
      if (minutes == 0) {
        userTime = parseInt(seconds.toString() + tenths.toString());
      } else {
        userTime = parseInt(
          minutes.toString() + seconds.toString() + tenths.toString()
        );
      }

      var userName;
      var userInput = $("input[type=text]").val();

      if (/\S/.test(userInput)) {
        userName = $("input[type=text]").val();
      } else {
        userName = "Anonymous" + Math.floor(Math.random() * 10000);
      }

      var url = "/ScoreCreate";
      var dataToSend =
        "player_name=" +
        userName +
        "&number=" +
        userTime +
        "&puzzle_id=" +
        puzzleidNumber;

      $.ajax({
        url: url,
        type: "post",
        data: dataToSend,
        success: function() {
          // redirect to the root page.
          window.location.replace("/");
        }
      });
    });

    dialog.dialog("open");
  }
});
