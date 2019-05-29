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
        { answer: "A. Dr. Doom", value: true },
        { answer: "B. Galactus", value: false },
        { answer: "C. Mole Man", value: false },
        { answer: "D. Puppet Master", value: false }
    ]
    },
    {
    question: "Which of the following is NOT a true fact about the Hulk?",
    answers: [
        { answer: "A. Very susceptible to mind control", value: true },
        { answer: "B. Does not need to sleep", value: false },
        { answer: "C. Immune to all diseases", value: false },
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
        { answer: "A. Werewolves", value: true },
        { answer: "B. Zombies", value: false },
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

$(document).ready(function() {
    // Start the game when that start button is clicked
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
          $('.first-answer').css('background-color', 'green');
          $('.first-answer').css('color', 'white');
          wrongAnswer();
        }
      }
    });
    $('body').on('click', '.reset-button', function() {
        location.reload();
      });
    });
    
// Create function to update the correct answer counter, reset the clock, and add the number of correctly answered questions to the DOM
    function rightAnswer() {
      correctCounter++;
      $('.time').html(timer);
      $('.right').html('<p>Right answers: ' + correctCounter + '</p><br>');
      setTimeout(questionCounter, 1000);
    }