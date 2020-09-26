/* Array of objects containing our questions and answers, start quiz, question and score tracker */

const STORE = {
    questions: [
    // Question 1
      {
        question: 'How many players from each team can be on the court when the ball is in play?',
        answers: ['6', '5', '7', '10'],
        correctAnswer: '5'
      },
    // Question 2
      {
        question: 'How many points is a free throw worth?',
        answers: ['1', '2', '3', '4'],
        correctAnswer: '1'
      },
    // Question 3
      {
        question: 'What happens when the shot clock reaches 0?',
        answers: [
          'The team with the ball receives a point',
          'Both teams jump for the ball',
          'The team with the ball loses possession',
          'The team with the ball loses the game automatically'
        ],
        correctAnswer: 'The team with the ball loses possession'
      },
    // Question 4
      {
        question: 'How long is each quarter in the NBA?',
        answers: ['6 minutes', '10 minutes', '12 minutes', '25 minutes'],
        correctAnswer: '12 minutes'
      },
    // Question 5
      {
        question: 'Which of the following determines who gets the first possession of a game?',
        answers: [
          'Coin flip',
          'Captains play Rock, Paper, Scissors',
          'Jump ball',
          'Referees choose their favorite team'
        ],
        correctAnswer: 'Jump ball'
      }
    ],
    quizStarted: false,
    currentQuestion: 0,
    score: 0
  };

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

// Displays start screen to begin quiz
function displayStartScreen() {
  return `
    <div class="start-screen">
      <p>How well do you know the rules of basketball? Click the button below to find out.</p>
      <button type="button" id="start">Start Quiz</button>
    </div>
  `;
}

// Displays question and score number
function displayQuestionNumberAndScore() {
  return `
    <ul class="question-score">
      <li id="question-number">Question ${STORE.currentQuestion + 1} of ${STORE.questions.length}</li>
      <li id="score">Score: ${STORE.score}/${STORE.questions.length}</li>
    </ul>
  `;
}

// Displays possible answers
function displayPossibleAnswers() {
  const possibleAnswers = STORE.questions[STORE.currentQuestion].answers;
  let displayAnswers = '';
  let i = 0;
  possibleAnswers.forEach(answer => {
    displayAnswers += `
      <div id="option-container-${i}">
        <input type="radio" name="options" id="option${i + 1}" value="${answer}" tabindex="${i + 1}" required>
        <label for="options${i + 1}"> ${answer}</label>
      </div>
    `;
    i++;
  });
  return displayAnswers;
}

// Display question and corresponding answers
function displayQuestion() {
  let currentQuestion = STORE.questions[STORE.currentQuestion];
  return `
    <form id="question-form" class="question-form">
      <fieldset>
        <div class="question">
          <legend>${currentQuestion.question}</legend>
        </div>
        <div class="options">
          <div class="answers">
            ${displayPossibleAnswers()}
          </div>
        </div>
        <button type="submit" id="submit-answer-button" tabindex="5">Submit</button>
        <button type"button" id="next-question-button" tabindex="6">Next</button>
      </fieldset>
    </form>
  `;
}

// Display feedback for answer user has chosen
function answerFeedback(answerStatus) {
  let correctAnswer = STORE.questions[STORE.currentQuestion].correctAnswer;
  let html = '';
  if (answerStatus === 'correct') {
    html = `
      <div class="right">Correct!</div>
    `;
  } else if (answerStatus === 'incorrect') {
    html = `
      <div class="wrong">Incorrect. The answer was: ${correctAnswer}.</div>
    `;
  }
  return html;
}

// Display result screen to show final score and button to restart the quiz
function resultsScreen() {
  if (STORE.score < 3) {
    return `
        <div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div>
              <legend>You scored: ${STORE.score}/${STORE.questions.length}</legend>
              <legend>Want to try again?</legend>
          </div>
          <div>
              <button type="button" id="restart">Restart Quiz</button>
          </div>
        </fieldset>
      </form>
    </div>
    `;
  }
  else {
    return `
      <div class="results">
        <form id="js-restart-quiz">
          <fieldset>
            <div>
                <legend>Well done! You scored: ${STORE.score}/${STORE.questions.length}</legend>
            </div>
            <div>
                <button type="button" id="restart">Restart Quiz</button>
            </div>
          </fieldset>
        </form>
      </div>
    `;
  }  
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function render() {
  let html = '';
  if (STORE.quizStarted === false) {
    $('main').html(displayStartScreen());
    return;
  } else if (STORE.currentQuestion >= 0 && STORE.currentQuestion < STORE.questions.length) {
      html = displayQuestionNumberAndScore();
      html += displayQuestion();
      $('main').html(html);
  } else {
      $('main').html(resultsScreen());
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function clickStartButton() {
  $('main').on('click', '#start', function(event) {
    STORE.quizStarted = true;
    render();
  });
}

function clickNextButton() {
  $('body').on('click', '#next-question-button', function(event) {
    render();
  });
}

function submission() {
  $('body').on('submit', '#question-form', function(event) {
    event.preventDefault();
    const currentQuestion = STORE.questions[STORE.currentQuestion];
    let selectedAnswer = $('input[name=options]:checked').val();
    let optionContainerId = `#option-container-${currentQuestion.answers.findIndex(i => i === selectedAnswer)}`;
    if (selectedAnswer === currentQuestion.correctAnswer) {
      STORE.score += 1;
      $(optionContainerId).append(answerFeedback('correct'));
    } else {
        $(optionContainerId).append(answerFeedback('incorrect'));
    }
    STORE.currentQuestion += 1;
    $('#submit-answer-button').hide();
    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });
    $('#next-question-button').show();
  });
}

function restartQuiz() {
  STORE.quizStarted = false;
  STORE.currentQuestion = 0;
  STORE.score = 0;
}

function clickRestartButton() {
  $('body').on('click', '#restart', function(event) {
    restartQuiz();
    render();
  });
}

function quizApp() {
  render();
  clickStartButton();
  clickNextButton();
  submission();
  clickRestartButton();
}

$(quizApp);