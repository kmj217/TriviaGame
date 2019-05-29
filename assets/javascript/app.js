//need arrays for questions to be used
var questions = [
    {
      question: "What is Spiderman's real name?",
      answers: [
        { answer: "A. Peter Parker", value: true },
        { answer: "B. Tony Starker", value: false },
        { answer: "C. Peter Johnson", value: false },
        { answer: "D. Miles Parker", value: false }
      ]
    },
    {
    question: "Who was the first enemy of the Fantastic Four?",
    answers: [
        { answer: "A. Mole Man", value: false },
        { answer: "B. Galactus", value: false },
        { answer: "C. Dr. Doom", value: true },
        { answer: "D. Puppet Master", value: false }
    ]
    },
    {
    question: "Which of the following is NOT a true fact about the Hulk?",
    answers: [
        { answer: "A. Immune to all diseases", value: false },
        { answer: "B. Does not need to sleep", value: false },
        { answer: "C. Very susceptible to mind control", value: true },
        { answer: "D. Near impenatrable skin", value: false }
    ]
    },
    {
    question: "What was the original name of the X-Men?",
    answers: [
        { answer: "A. Merry Mutants", value: true },
        { answer: "B. Project-M", value: false },
        { answer: "C. Mutant Militia", value: false },
        { answer: "D. X-Mutants", value: false }
    ]
    },
    {
    question: "What creatures did the Comics Code Authority ban Marvel from adding into their comics?",
    answers: [
        { answer: "A. Zombies", value: false },
        { answer: "B. Werewolves", value: true },
        { answer: "C. Vampires", value: false },
        { answer: "D. Aliens", value: false }
    ]
    },
  ];

//Set variables for corrects answers, incorrect answers, unanswered questions timer, question counter, 
var counter = 0;
var clock;
var timer = 10;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;

    // Create function to update the correct answer counter, reset the clock, and add the number of correctly answered questions to the DOM
    function rightAnswer() {
        correctCounter++;
        $('.time').html(timer);
        $('.right').html('<p>Right answers: ' + correctCounter + '</p>');
        $('.main').append("<p class='correct'>Congratulations! That's correct.</p>");
        $('.correct')
            .delay(1000)
            .fadeOut(400);
        setTimeout(questionCounter, 1000);
      }
  
    // Create function to update the incorrect answer counter, reset the clock, and add the number of incorrectly answered questions to the DOM
    function wrongAnswer() {
        incorrectCounter++;
        $('.time').html(timer);
        $('.wrong').html('<p>Wrong answers: ' + incorrectCounter + '</p>');
        $('.main').append("<p class='incorrect'>Oh, too bad. That is incorrect.</p>");
        $('.incorrect')
            .delay(1000)
            .fadeOut(400);
        setTimeout(questionCounter, 1000);
    }
        
      // Create function to update the unanswered counter, reset the clock, and add the number of unanswered questions to the DOM
    function unanswered() {
        unansweredCounter++;
        $('.time').html(timer);
        $('.main').append("<p class='times-up'>Time's up!</p>");
        $('.unanswered').html('<p>Unanswered Questions: ' + unansweredCounter + '</p>');
        $('.times-up')
            .delay(1000)
            .fadeOut(400);
        setTimeout(questionCounter, 1000);
    }
        
      // Start the game with a function to display the questions and start the time
      function startTrivia() {
          $('.start-page').css('display', 'none');
          $('.questions-page').css('visibility', 'visible');
          $('.timer').html('<p>Time remaining: <span class="time">10</span></p>');
        
          $('.question').html(questions[counter].question);
          var displayAnswers =
            '<p class="answer first-answer">' +
            questions[counter].answers[0].answer +
            '</p><p class="answer">' +
            questions[counter].answers[1].answer +
            '</p><p class="answer">' +
            questions[counter].answers[2].answer +
            '</p><p class="answer">' +
            questions[counter].answers[3].answer +
            '</p>';
        
          $('.answers').html(displayAnswers);
        
          timeHolder();
        }
        
        // Create a function to continue the game as long as there are questions to ask. Finish game when all questions are asked
        function questionCounter() {
          if (counter < 4) {
            counter++;
            startTrivia();
            timer = 10;
            timeHolder();
          } else {
            finishTrivia();
          }
        }
        
        // Timer function
        function timeHolder() {
          clearInterval(clock);
          clock = setInterval(seconds, 1000);
          function seconds() {
              if (timer === 0) {
              clearInterval(clock);
              unanswered();
            } else if (timer > 0) {
              timer--;
              $('.time').html(timer);
            }
          }
        }
        
        // Append reset button, correct, incorrect, and unanswered questions upon completing the trivia
        function finishTrivia() {
          var final = $('.main')
            .html("<p>Here's your results!<p><br>")
            .append('<p>Correct Answers: ' + correctCounter + '</p><br>')
            .append('<p>Wrong Answers: ' + incorrectCounter + '</p><br>')
            .append('<p>Unanswered Answers: ' + unansweredCounter + '</p><br>');
          $(final).attr('<div>');
          $(final).attr('class', 'final');
          $('.final').append('<p><a class="reset-button" href="#">Restart Trivia!</a></p>');
        }

$(document).ready(function() {
    // Start the trivia when that start button is clicked
    $('.answers').css('visibility', 'hidden');
    $('body').on('click', '.start-btn', function() {
      startTrivia();
      $('.answers').css('visibility', 'visible');
    });
  
    $('body').on('click', '.answer', function() {
      chosenAnswer = $(this).text();
      var answerCounter = questions[counter].answers;
  
      for (var i = 0; i < answerCounter.length; i++) {
        if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === true) {
          clearInterval(clock);
          var right = $(this).attr('class', 'right-answer answer');
          rightAnswer();
        } else if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === false) {
          clearInterval(clock);
          $(this).attr('class', 'wrong-answer answer');
          wrongAnswer();
        }
      }
    });
    $('body').on('click', '.reset-button', function() {
        location.reload();
      });
    });