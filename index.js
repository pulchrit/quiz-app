/* 
User stories:
1. handle start quiz click:
    - first question should render to the DOM
    - page layout should be reorganized, 
    - question count and score should render to the DOM (calculateScore(), calculateQuestionCount())
2. Handle answer submit:
    - an answer must be selected (html required) 
    - on submit click, the selected answer should be saved to a variable
    - get id of question from DOM, pull corresponding object from data store
    - determine if answer is correct (compare selected answer vs. answer looked up in data store)
        - if correct, render appropriate message, answer and book cover to DOM
        - if incorrect, render appropriate message, answer and book cover to DOM
    - calcuateScore and render to DOM
    - calculateQuestionCount and render to DOM
        - if this is the last question, the next question button should be changed to 'see final score'
3. handle next question submit:
    - render the next question to the DOM 
4. handle see final score click:
    - layout should change back to start screen layout and styling
    - render final score to the DOM (it should be calculated already?)
    - render congratulatory message based on score (<50%, 50%, >50%, 100%)
    - ask to replay quiz
*/

// Helper function for renderQuestion()
function getQuestionObject(questionID) {
    console.log('getQuestionObject ran');
    return questionData.find(question => question.id === questionID);
}

// Helper function for renderQuestion()
function createQuestionString(questionObject) {
    console.log('createQuestionString ran');
    return `
        <section class="question-area">
            <p class="question">${questionObject.question}</p>
            <p class="js-summary">${questionObject.summary}</p>
        </section>`;
}

// Helper function for createAnswerString()
function createIndividualAnswerString(answer, index) {
    console.log("createIndividualAnswerString ran");
    return `
        <label class="individual-answers">
            <input type="radio" name="answer" id="answer-${index}" value="${answer}" required>
        ${answer}</label>`
}

// Helper function for renderQuestion()
function createAnswerOptionsString(questionObject) {
    console.log('createAnswerString ran');
    let answerStringsArray = questionObject.answerOptions.map((answer, index) => {
        return createIndividualAnswerString(answer, index);
    });

    return `
        <section class="answer-area">
            <form class="answer-option-form" role="form" id="js-submit-answer" data-questionid="${questionObject.id}">
                <fieldset class="answer-options">
                    ${answerStringsArray.join('\n')}
                </fieldset>
                <button type="submit">submit answer</button>
            </form>
        </section>`;
}

// Helper function for handleStartQuizClicked()
function renderQuestion(count) { 
    console.log('renderQuestion ran');
    const questionObject = getQuestionObject(count);
    let questionAnswerArea = 
        "<div class='question-answer-combined js-question-answer-combined'>" +
        createQuestionString(questionObject) + "\n" +
        createAnswerOptionsString(questionObject) +
        "</div>";
    $('.js-quiz-content').append(questionAnswerArea);
}

// Creating object to hold count and score...I think this is not a great way 
// to handle this because this object is a global variable, but I'm not quite 
// sure of the better way to manage it just yet... 
const countScoreTracking = {
    count: 1,
    score: 0,
    incrementScore: function() {
        countScoreTracking.score++;
    },
    incrementCount: function() {
        countScoreTracking.count++;
    },
};

// Helper function for renderCountScore()
function createCountScoreString() {
    console.log('createCountScoreString ran');
    return `
        <section class="count-score">
            <p class="question-count">Question ${countScoreTracking.count} of ${questionData.length}</p> 
            <p class="score">Score: ${countScoreTracking.score} correct</p>
        </section>`;
}

// Helper function for handleStartQuizClicked(), handleAnswerSubmitClicked()
function renderCountScore() { 
    console.log('renderCountScore ran');
    let countScoreString = createCountScoreString();
    $(".js-quiz-content").html(countScoreString);
}

// Helper function for handleStartQuizClicked()
// Toggles between start screen and question screen layouts
function changeLayout() {
    $(".js-quiz-content").toggleClass("main-start-finish main-question-answer");
    $(".js-header").toggleClass("header-start-finish header-question-answer");
}

function handleStartQuizClicked() { 
    $("#js-start-quiz").submit(function(event) {    
        console.log('handleStartQuizClicked ran');
       
        event.preventDefault();
        changeLayout();
        renderCountScore(countScoreTracking.count, countScoreTracking.score); 
        renderQuestion(countScoreTracking.count);        
    });   
}
// Helper function for handleAnswerSubmitClicked();
function checkAnswer(userAnswer, questionID) {
    console.log("checkAnswer ran");
    
    let questionObject = getQuestionObject(questionID);

    // Create an array to return that holds the message and questionObject.
    const result = [questionObject];
    
    // If answered correctly.
    if (questionObject.correctAnswer === userAnswer) {
        result.unshift("Correct!"); 
        countScoreTracking.incrementScore();
        return result;
    // If answered incorrectly.
    } else {
        result.unshift("Sorry, that is incorrect.");
        return result;
    } 
}

// Helper function for handleAnswerSubmitClicked()
function renderAnswerFeedback(answerInfo) {
    console.log("renderAnswerFeedback ran");
    
    // answerInfo is [message, {questionObject}]
    // Re-render the question...Room for improvement here. I have to re-render the question
    // because of how I have my html organized in order to add flexbox classes appropriately.
    renderQuestion(answerInfo[1].id);
    
    // Append Source link to question summary.
    $(".js-summary").append(` <a class="source-link" href=${answerInfo[1].answerSource}>Source</a>`);

    // Set Button text appropriately based on number of questions.
    let buttonString;
    let appropriateId;
    
    // If last question, final-score is applied.
    if (countScoreTracking.count === questionData.length) {
        buttonString = "<button type='submit'>get final score</button>";
        appropriateId = "js-get-final-score";
    
        // If not the last question, next-question is applied.
    } else {
        buttonString = "<button type='submit'>next question</button>";
        appropriateId = "js-next-question";
    }

    // Replace answer options with answer feedback.
    $(".answer-area").html(
        `<form class="answer-option-form" role="form" data-questionid="${answerInfo[1].id}">
        <p>${answerInfo[0]}</p>
        <p>${answerInfo[1].correctAnswer} wrote <span class="title">${answerInfo[1].title}</span>.</p>
        <img class="book-cover" src="${answerInfo[1].coverImage}" alt="Cover of ${answerInfo[1].title}">
        <br>
        ${buttonString}`
    );    

    // Add appropriate ID depending on whether this is the last question or not.
    $("form").attr("id", appropriateId);
}

 
function handleAnswerSubmitClicked() {
    $(".js-quiz-content").on('submit', '#js-submit-answer', function(event) {
        console.log('handleAnswerSubmitClicked ran');
        
        event.preventDefault();
        // On submit click, the selected answer should be saved to a variable
        // Attribution: https://www.tutorialrepublic.com/faq/how-to-get-the-value-of-selected-radio-button-using-jquery.php
        let userAnswer = $("input[name='answer']:checked").val();
        let questionID = $(this).closest("form").data("questionid");
        let answerInfo = checkAnswer(userAnswer, questionID);
        renderCountScore();
        renderAnswerFeedback(answerInfo);
    });
}

function handleNextQuestionClicked() {
    $(".js-quiz-content").on('submit', '#js-next-question', function(event) {
        console.log('handleNextQuestionClicked ran');

        event.preventDefault();
        countScoreTracking.incrementCount();
        renderCountScore(countScoreTracking.count, countScoreTracking.score); 
        renderQuestion(countScoreTracking.count); 
    });
}

function handleFinalScoreClicked() {
    $(".js-quiz-content").on('submit', "#js-get-final-score", function(event) {
        console.log('handleFinalScoreClicked ran');

        event.preventDefault();
        changeLayout();
        // Calculate final score.
        const finalScore = countScoreTracking.score / questionData.length;
       
        // Get score message based on final score.
        const scoreMessage = 
            (finalScore === .5) ? "Not too bad!" : 
            (finalScore < .5) ? "Seems like you're not a fan of science fiction." :
            (finalScore > .5 && finalScore < 1) ? "Wow! Well done!" :
            "Amazing. You are defnitely a fan of science fiction!";

        // Render score message to DOM and ask if user wants to play again.
        $(".js-quiz-content").html(
            `<p class="intro-copy">You got ${countScoreTracking.score} correct.</p>
            <p class="intro-copy">${scoreMessage}</p>
            <p class="intro-copy">Would you like to play again?</p>
            <form role="form" id="js-start-quiz">
                <button type="submit">play again</button>
            </form> `
        )
    });
}


/** 
 * Render quiz start screen on page load and initiate the other functions 
 * to display each of the 10 questions. 
 **/
function handleQuiz() {
    const questionData = getQuestionData();
    handleStartQuizClicked();
    handleAnswerSubmitClicked();
    handleNextQuestionClicked();
    handleFinalScoreClicked();
}

// When the page loads, call handleQuiz().
$(handleQuiz);





