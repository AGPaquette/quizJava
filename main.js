const submitInitials = document.querySelector("#submit-btn")
const highSCoreUser = document.querySelector("#current-highscore")
const start = document.querySelector("#quiz-start")
const time = document.querySelector("#timer")
const answerBtn = document.querySelector("#answers")
const quest = document.querySelector("#questions")

//stores the number for the question the user is on so that the question can be pulled
var questionNum = 0
var testScore = 0
var topScore = 0

//holds the quiz question and the answers the user is able to select from that go with the question being asked as well as the correct answer
var quizQuestions = [
	{
        question: "Which is a JavaScript Data Types??",
		answers: {
			"a": 'None',
			"b": 'Object',
			"c": 'Float',
            "d": 'Int'
        },
		correctAnswer: 'b: Object'
	},
	{
		question: "Difference between “==” and “===”?",
		answers: {
			"a": 'No difference',
			"b": '"==" assigns a variable and "===" checks for equality',
			"c": '"==" eqaul in value and "===" equal in value and type',
            "d": '"===" reasigns a value and "==" assigns the value'
		},
		correctAnswer: 'c: "==" eqaul in value and "===" equal in value and type'
	},
    {
        question: "Which is a Pop up boxes available in JavaScript?",
		answers: {
			"a": 'Alert',
			"b": 'Window',
			"c": 'String',
            "d": 'Exit'
		},
		correctAnswer: 'a: Alert'
	},
	{
		question: "What is a the disadvantages of using innerHTML in JavaScript?",
		answers: {
			"a": 'none',
			"b": 'It is slower than other methods',
			"c": 'Deletes the parent',
            "d": 'Content is replaced everywhere'
		},
		correctAnswer: 'd: Content is replaced everywhere'
	}
];

function startTest() {
    setInterval(startTimer, 1000);
    questGenerator();
};

//starts the count down for the timer
function startTimer() {
    if (time.textContent > 0) {
    time.textContent = time.textContent - 1
    };
    //directs the user to the input page when timer hits 0
    if (time.textContent == 0) {
        window.location.href = "./inputname.html";
    };
};

//Generates the selection of answers the user can select from as well as the current question
function questGenerator() {
    emptyQuestions()
    currentQuestion = quizQuestions[questionNum];
    quest.textContent = currentQuestion.question;

    for (const [key, value] of Object.entries(currentQuestion.answers)) {
        const button = document.createElement("button");
        button.textContent = key + ": " + value;
        button.setAttribute("class", "btn");
        button.addEventListener("click", function (event){
            var selectedAnswer = event.target.textContent
            console.log("you entered the event")
            console.log(selectedAnswer)
            console.log(currentQuestion.correctAnswer)
            if (selectedAnswer.includes(currentQuestion.correctAnswer)){
                console.log("hello")
                scoreTracker()
            }
            else{
                time.textContent = time.textContent - 10
                questionTracker()
            };
        })
        answerBtn.appendChild(button);
    };

    start.style.display = "none";
};

//Goes to the next question in the list
function nextQuestion() {
    questionNum = questionNum + 1
    questGenerator()
};

//removes all the children from parent element
function emptyQuestions() {
    answerBtn.innerHTML = ""
};

//keeps track of user score
function scoreTracker() {
    console.log(quizQuestions[questionNum].correctAnswer);
    testScore = 1 + testScore;
    localStorage.setItem("testscore", testScore);
    questionTracker()
    
};

//keeps track of what question the user is on to either move them to the next question or redirect them to the input.html file
function questionTracker(){
    if (questionNum < 3 ) {
        nextQuestion();
    }
    else {
        window.location.href = "./inputname.html";
    };
}

//checks for users input and if the user input is a length of 2 or 3 the user name is stored in local storage else an alert pops up
function usersInitials() {
    var userinput = document.querySelector("#initialtext");
    var username = userinput.value;
    userinput.value = "";
    if ( 2 == username.length || username.length == 3){
        localStorage.setItem("username", username);
        window.location.href = "./highscorepage.html";
    }
    else {
        window.alert("Initials can only be 2 or 3 characters long");
    };
};

//updates the high score and the user that holds that high score
function scoreUpdate() {
    localStorage.setItem("highscore", topScore)
    if (localStorage.getItem("highscore") <= localStorage.getItem("testscore")) {
        localStorage.setItem("highscore", localStorage.getItem("testscore"))
    };
    
    document.querySelector("#username").textContent = localStorage.getItem("username") + ": " + localStorage.getItem("highscore") + "/4"
};

//checks if the user is on the page that corrolates with the function or event
if (document.URL.includes("inputname.html")) {
    document.querySelector("#score").textContent = localStorage.getItem("testscore") + "/4";
    submitInitials.addEventListener("click", usersInitials);
};

if (document.URL.includes("highscorepage.html")) {
    scoreUpdate()
};

if (document.URL.includes("index.html")) {
    start.addEventListener("click", startTest);
};
