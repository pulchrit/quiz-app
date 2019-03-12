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

// done-ish
function renderStartScreen() {
    console.log('renderStartScreen');
    // render start screen to the DOM
    $(".js-quiz-content").html(`
        <p class="intro-copy">Welcome to the Who Wrote It? quiz. Test your knowledge of who wrote these 
            popular science fiction and fantasy books.
        </p>
        <form role="form" id="js-start-quiz">
            <button type="submit">Start quiz!</button>
        </form>
        `);
}

// done-ish
function getQuestionObject(count) {
    console.log('getQuestionObject ran');
    let questionObject = questionData.find(question => question.id === count);
    return questionObject;

}

// done-ish
function createQuestionString(questionObject) {
    console.log('createQuestionString ran');
    return `
        <section class="question-area">
            <p class="question">${questionObject.question}</p>
            <p class="summary">${questionObject.summary}</p>
        </section>`;
}

// done-ish
function createIndividualAnswerString(answer, index) {
    console.log("createIndividualAnswerString ran");
    return `
        <input type="radio" name="answer" id="answer-${index}" value="${answer}" required>
        <label for="answer-${index}">${answer}</label>
        <br>`;
}

// done-ish
function createAnswerString(questionObject) {
    console.log('createAnswerString ran');
    let answerStrings = questionObject.answerOptions.map((answer, index) => {
        createIndividualAnswerString(answer, index);
    });
    answerStrings = answerStrings.join("");
    return `
        <section class="answer-area">
            <form class="answer-option-form" role="form" id="js-quiz-question">
                <fieldset class="answer-options">
                    ${answerStrings}
                </fieldset>
                
                <button type="submit">submit answer</button>
            </form>
        </section>`;
}

function renderQuestion(count) { 
    console.log('renderQuestion ran');
    const questionObject = getQuestionObject(count);
    // render question screen to the DOM ???????? will \n cause problems below??????????????????
    let questionAnswerArea = `
        ${createQuestionString(questionObject)} \\n
        ${createAnswerString(questionObject)}`;
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

// done-ish
function createCountScoreString(count, score) {
    console.log('createCountScoreString ran');
    return `
        <section class="question-score">
            <p class="question-count">Question ${count} of 10</p> 
            <p class="score">Score: ${score} correct</p>
        </section>`;
}

// done-ish
function renderCountScore(count, score) { 
    console.log('renderCountScore ran');
    $(".js-quiz-content").append(createCountScoreString(count, score));
}


function handleStartQuizClicked() {
    console.log('handleStartQuizClicked ran');
    $(".js-quiz-content").on('click', '#js-start-quiz', function(event) {
        // Prevent form from submitting to server.
        event.preventDelegation();
        
        // Reorganize page layout 
        $(".js-body").toggleClass(".body-question");
        
        // question count and score should render to the DOM (calculateScore(), calculateQuestionCount())
        // Initiating the count at 1 and the score at 0. (Not sure if this is ok?)
        renderCountScore(count=1, score=0); // or just (1,0), not sure if this default param will work

        // Initiate count at 1 when start quick is clicked. (Again, not sure if this is ok?)
        renderQuestion(count=1); // or just (1), not sure if this default param will work
        
    });
   // - first question should render to the DOM
   
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
    renderStartScreen();
    
    handleStartQuizClicked();
    //renderQuestion(); don't think this needs to be here
    handleAnswerSubmitClicked();
    handleNextQuestionClicked();
    handleFinalScoreClicked();
}

// When the page loads, call handleQuiz().
$(handleQuiz);





