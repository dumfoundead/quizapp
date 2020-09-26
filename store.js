// This script is strictly for our list of questions and answers //

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