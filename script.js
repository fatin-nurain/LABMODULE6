let questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "Hyper Trainer Markup Loop",
            "HighText Machine Language",
            "Hyperlink and Text Management Language"
        ],
        answer: "HyperText Markup Language"
    },
    {
        question: "Which tag is used to link an external CSS file?",
        options: [
            "<style>",
            "<css>",
            "<link>",
            "<meta>"
        ],
        answer: "<link>"
    },
    {
        question: "Which CSS property controls text size?",
        options: [
            "font-weight",
            "font-size",
            "text-size",
            "text-style"
        ],
        answer: "font-size"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            "<!-- -->",
            "//",
            "**",
            "##"
        ],
        answer: "//"
    },
    {
        question: "Where should JavaScript be placed for best performance?",
        options: [
            "Inside <head>",
            "Top of <body>",
            "Bottom of <body>",
            "Before <!DOCTYPE html>"
        ],
        answer: "Bottom of <body>"
    }
];

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('time');

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

function startTimer() {
    timerEl.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            feedbackEl.textContent = "Time's up!";
            submitBtn.disabled = true;
            nextBtn.style.display = "inline-block";
        }
    }, 1000);
}

function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    q.options.forEach(option => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'option';
        input.value = option;
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        optionsEl.appendChild(label);
    });

    feedbackEl.textContent = '';
    submitBtn.disabled = false;
    nextBtn.style.display = 'none';
    timeLeft = 15;
    startTimer();
}

submitBtn.addEventListener('click', () => {
    clearInterval(timer);
    const selected = document.querySelector('input[name="option"]:checked');
    if (!selected) {
        feedbackEl.textContent = "Please select an answer!";
        startTimer();
        return;
    }

    if (selected.value === questions[currentQuestion].answer) {
        feedbackEl.textContent = "Correct!";
        score++;
        scoreEl.textContent = score;
    } else {
        feedbackEl.textContent = `Wrong! Answer: ${questions[currentQuestion].answer}`;
    }

    submitBtn.disabled = true;
    nextBtn.style.display = 'inline-block';
});

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        questionEl.textContent = "Quiz Completed!";
        optionsEl.innerHTML = '';
        submitBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        feedbackEl.textContent = `Your final score is ${score} / ${questions.length}`;
        timerEl.parentElement.style.display = 'none';
    }
});

// Start the quiz
showQuestion();
