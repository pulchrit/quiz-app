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

/* function renderStartScreen() {
    console.log('renderStartScreen');
    $(".js-quiz-content").html(`
        <p class="intro-copy">Welcome to the Who Wrote It? quiz. Test your knowledge of who wrote these 
            popular science fiction and fantasy books.
        </p>
        <form role="form" id="js-start-quiz">
            <button type="submit">Start quiz!</button>
        </form>
        `);
} */

// Helper function for renderQuestion()
function getQuestionObject(count) {
    console.log('getQuestionObject ran');
    let questionObject = questionData.find(question => question.id === count);
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

// Helper function for renderQuestion()
function createAnswerString(questionObject) {
    console.log('createAnswerString ran');
    let answerStringsArray = questionObject.answerOptions.map((answer, index) => {
        return createIndividualAnswerString(answer, index);
    });

    return `
        <section class="answer-area">
            <form class="answer-option-form" role="form" id="js-quiz-question">
                <fieldset class="answer-options">
                    ${answerStringsArray.join('\n')}
                </fieldset>
                
                <button type="submit">submit answer</button>
            </form>
        </section>`;
}


function renderQuestion(count) { 
    console.log('renderQuestion ran');
    const questionObject = getQuestionObject(count);
    let questionAnswerArea = 
        "<div class='question-answer-combined'>" +
        createQuestionString(questionObject) + "\n" +
        createAnswerString(questionObject) +
        "</div>";
    $('.js-quiz-content').append(questionAnswerArea);
}

// ????
function incrementScore(score) {
    return score++;
}

// ?????
function incrementCount(questionId) {
    return questionId++;
}

// Helper function for renderCountScore()
function createCountScoreString(count, score) {
    console.log('createCountScoreString ran');
    return `
        <section class="count-score">
            <p class="question-count">Question ${count} of 10</p> 
            <p class="score">Score: ${score} correct</p>
        </section>`;
}

function renderCountScore(count, score) { 
    console.log('renderCountScore ran');
    let countScoreString = createCountScoreString(count, score)
    $(".js-quiz-content").html(countScoreString);
}

function changeLayout() {
    $(".js-quiz-content").removeClass("main-start-finish").addClass("main-question-answer");
    $(".js-header").removeClass("header-start-finish").addClass("header-question-answer");
}

function handleStartQuizClicked() {
    
    $("#js-start-quiz").submit(function(event) {
            
        console.log('handleStartQuizClicked ran');
        event.preventDefault();
        
        // Change page layout
        changeLayout();

                /* // Reorganize page layout  FIX THIS!!!!!!!! Also, pull into a separate function? 
        //$(".js-body").addClass(".body-question");
        $(".js-header").removeClass(".header-hero").addClass(".header-question");
       // $(".js-header").switchClass(".header-hero", ".header-question", 500, "easeInOutQuad");
        $(".js-quiz-content").switchClass("main", ".main-question", 500, "easeInOutQuad");
        //$(".js-screen").switchClass(".hero-screen", ".question-screen", 500, "easeInOutQuad"); */
        
        // Render count and score to the DOM.
        // Initiating the count at 1 and the score at 0 here when 'Start Quiz' is clicked. (Is there a better way?)
        renderCountScore(count=1, score=0); // or just (1,0), not sure if this default param will work

        // Initiate count at 1 when 'Start Quiz' is clicked. (Again, is there a better way?)
        renderQuestion(count=1); // or just (1), not sure if this default param will work
    });   
}

function handleAnswerSubmitClicked() {
    console.log('handleAnswerSubmitClicked ran');
    //- an answer must be selected (tried to do this with html required) 
    //- on submit click, the selected answer should be saved to a variable
    //- get id of question from DOM, pull corresponding object from data store or pull corresponding answer only?)
    //- determine if answer is correct (compare selected answer vs. answer looked up in data store)
    //    - if correct, render appropriate message, answer and book cover to DOM
    //    - if incorrect, render appropriate message, answer and book cover to DOM
    //- calcuateScore and render to DOM
    //- calculateQuestionCount and render to DOM
    //    - if this is the last question, the next question button should be changed to 'see final score'
}

function handleNextQuestionClicked() {
    console.log('handleNextQuestionClicked ran');
    //- render the next question to the DOM (renderQuestion() same as above!)
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
    //renderStartScreen();
    
    handleStartQuizClicked();
    //renderQuestion(); don't think this needs to be here
    handleAnswerSubmitClicked();
    handleNextQuestionClicked();
    handleFinalScoreClicked();
}

// When the page loads, call handleQuiz().
$(handleQuiz);





