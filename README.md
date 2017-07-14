<strong>The Odin Project</strong><br /><br />
<a href="https://www.theodinproject.com/courses/javascript-and-jquery/lessons/where-s-waldo-a-photo-tagging-app">Where's Waldo (A Photo Tagging App)</a><br />
Project Description<br /><br />
a< href="https://odinwhereswaldo.herokuapp.com/">Live App</a><br /><br />

This project will finally give you a chance to tie together everything you've learned so far. It's a project with a lot of complexity so take it one step at a time. Working with Rails as a back end is pretty straightforward but you'll be juggling some of the front end functionality too. This is entirely within the realm of the kind of thing you might be asked to build on the job (though of course not exactly). Are you ready???

Hopefully you got a chance to play "Where's Waldo" (see here if unfamiliar) as a kid. You're given a photograph with tons of stuff going on and you're meant to locate several familiar characters

<strong>Your Task</strong>
Here, you'll build an app that feels a whole lot like a photo tagging app. You'll start with a large photograph which contains several elements the user is meant to find, e.g. Waldo, The Wizard, Wilma etc... name your own if you'd like to use your own photos. The user will make selections for each character and they will get feedback on whether they are correct or not.

To start with, you'll need to choose a photo and identify where exactly each person is to start with and save that to your database. When the user clicks the photo, it should place a targeting box around the portion of the photo where the user has clicked. That box should contain a list of possible characters.

When the user selects one of these characters, you should check with your Rails Backend to see if that character is actually within the targeting box. Provide the user with appropriate feedback (e.g. if wrong, an error message). If correct, place a marker on the photo in the character's location. In either case, remove the targeting box until the user clicks again.

Keep track of how long it takes between when the photo is first loaded and when the user finally identifies all characters (do this on the server side otherwise the user could hack their score). Once a round is complete, ask the user for his/her name and record that time. This will get a bit tricky since you'll have annonymous users you need to keep track of!

1. Set up a Github Repo for this project. Follow the instructions atop the Google Homepage project if you need help.<br /><br />
2. Think about what you'll need to do to get this all working together. This is where it's really helpful to think it completely through on paper or whiteboard ahead of time! A few minutes of thought can save you from wasting an hour of coding.<br /><br />
3. Create a new Rails application with just the bare bones required to load your HTML page for now.<br /><br />
4. Build the front end functionality without actually using any calls to the back end yet. Specifically, that means creating the Javascript functionality which pops the targeting box and dropdown menu on the screen when the user clicks on the photo and removes it when the user clicks away.<br /><br />
5. Now hook up the functionality for validating with your back end whether the user has clicked in the right place for that character.<br /><br />
6. Tie it into your front end so you can seamlessly select characters, validate them, and place the appropriate markers on the map if the selection was correct.<br /><br />
7. Add in the ability to time the user from when they first load the page and then display their "score" (time) when they successfully identify all characters. Create a popup that asks them to enter their name for the high scores table if they have earned it.<br /><br />
8. Play with it!<br /><br />
9. Push your solution to Github and submit it below. This is a serious project, congratulations!<br /><br />
<strong>Optional Extensions:</strong><br />
Load many images into your database and allow your use to select from among them before starting the game.
# odin_wheres_waldo
