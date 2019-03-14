/* 
User stories:
1. handle start quiz click:
    - first question should render to the DOM
    - page layout should be reorganized, 
    - question count and score should render to the DOM (calculateScore(), calculateQuestionCount())
2. Handle answer submit:
    - an answer must be selected (tried to do this with html required) 
    - on submit click, the selected answer should be saved to a variable
    - get id of question from DOM, pull corresponding object from data store or pull corresponding answer only?)
    - determine if answer is correct (compare selected answer vs. answer looked up in data store)
        - if correct, render appropriate message, answer and book cover to DOM
        - if incorrect, render appropriate message, answer and book cover to DOM
    - calcuateScore and render to DOM
    - calculateQuestionCount and render to DOM
        - if this is the last question, the next question button should be changed to 'see final score'
3. handle next question submit:
    - render the next question to the DOM (renderQuestion() same as above!)
4. handle see final score click:
    - layout should change back to start screen layout and styling
    - render final score to the DOM (it should be calculated already?)
    - render congratulatory message based on score (<50%, 50%, >50%, 100%)
*/

// Helper function for renderQuestion()
function getQuestionObject(questionID) {
    console.log('getQuestionObject ran');
    let questionObject = questionData.find(question => question.id === questionID);
    return questionObject;
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
        <input type="radio" name="answer" id="answer-${index}" value="${answer}" required>
        <label for="answer-${index}">${answer}</label>
        <br>`;
}

// Helper function for renderAnswerArea()
function createAnswerOptionsString(questionObject) {
    console.log('createAnswerString ran');
    let answerStringsArray = questionObject.answerOptions.map((answer, index) => {
        return createIndividualAnswerString(answer, index);
    });

    return `
        <section class="answer-area">
            <form class="answer-option-form" role="form" id="js-quiz-question" data-questionid="${questionObject.id}">
                <fieldset class="answer-options">
                    ${answerStringsArray.join('\n')}
                </fieldset>
                
                <button type="submit" id="js-submit-answer">submit answer</button>
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
            <p class="question-count">Question ${countScoreTracking.count} of 10</p> 
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
function changeLayout() {
    $(".js-quiz-content").removeClass("main-start-finish").addClass("main-question-answer");
    $(".js-header").removeClass("header-start-finish").addClass("header-question-answer");
}

function handleStartQuizClicked() {
    
    $("#js-start-quiz").submit(function(event) {
            
        console.log('handleStartQuizClicked ran');
        event.preventDefault();
        
        // Change page layout to display questions and answer layout and styling.
        changeLayout();
        
        // Render count and score to the DOM.
        renderCountScore(countScoreTracking.count, countScoreTracking.score); 

        // Render question and answer options to the DOM.
        renderQuestion(countScoreTracking.count);        
    });   
}
// Helper function for handleAnswerSubmitClicked();
function checkAnswer(userAnswer, questionID) {
    console.log("checkAnswer ran");
    
    let questionObject = getQuestionObject(questionID);

    // Create an array to return that holds the message and questionObject.
    const result = [questionObject];
    
    // If answered correctly
    if (questionObject.correctAnswer === userAnswer) {
        
        result.unshift("Correct!"); 
        countScoreTracking.incrementScore();
        return result;
    } else {
        
        result.unshift("Sorry, that is incorrect.");
        return result;
    } 
}

// Helper function for handleAnswerSubmitClicked()
function renderAnswerFeedback(answerInfo) {
    console.log("renderAnswerFeedback ran");
    // answerInfo is [message, {questionObject}]
    // Re-render the question
    renderQuestion(answerInfo[1].id);
    
    // Append Source link to question summary.
    $(".js-summary").append(` <a href=${answerInfo[1].answerSource}>Source</a>`);

    // Set Button text appropriately based on number of questions.
    let buttonString;
    if (countScoreTracking.count === questionData.length) {
        buttonString = "<button type='submit' id='js-get-final-score'>get final score</button>";
    } else {
        buttonString = "<button type='submit' id='js-next-question'>next question</button>";
    }

    // Replace answer options with answer feedback.
    $("#js-quiz-question").html(
        `<p>${answerInfo[0]}</p>
        <p>${answerInfo[1].correctAnswer} wrote <span class="title">${answerInfo[1].title}</span>.</p>
        <img class="book-cover" src="${answerInfo[1].coverImage}" alt="Cover of ${answerInfo[1].title}">
        <br>
        ${buttonString}`
    );    
}

 
function handleAnswerSubmitClicked() {
    
    //- on submit click, the selected answer should be saved to a variable
    // Attribution: https://www.tutorialrepublic.com/faq/how-to-get-the-value-of-selected-radio-button-using-jquery.php
    $(".js-quiz-content").on('click', '#js-submit-answer', function(event) {
        event.preventDefault();
        console.log('handleAnswerSubmitClicked ran');
        let userAnswer = $("input[name='answer']:checked").val();
        let questionID = $(this).closest("form").data("questionid");
        let answerInfo = checkAnswer(userAnswer, questionID);
        renderCountScore();
        renderAnswerFeedback(answerInfo);   
    });
}

function handleNextQuestionClicked() {
    console.log('handleNextQuestionClicked ran');
    //- render the next question to the DOM (renderQuestion() same as above!)
    $()
    "#js-next-question"
}

function handleFinalScoreClicked() {
    console.log('handleFinalScoreClicked ran');
    //- layout should change back to start screen layout and styling
    //- render final score to the DOM (it should be calculated already?)
    //- render congratulatory message based on score (<50%, 50%, >50%, 100%)
}





/** 
 * Render quiz start screen on page load and initiate the loop that will 
 * call the other functions to display each of the 10 questions. 
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





