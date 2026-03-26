async function fetchQuote() {
    var quote = document.querySelector(".motivation-content h2");
    var author = document.querySelector(".motivation-lower h2");

    // **loading state 
    quote.textContent = "Loading...";
    author.textContent = "";
    try {
        let response = await fetch("https://dummyjson.com/quotes/random");

        if (!response.ok) throw new Error("API failed");

        let data = await response.json();

        quote.textContent = data.quote;
        author.textContent = data.author;

    } catch (err) {
        console.error(err);
        quote.textContent = "Failed to load quote";
        author.textContent = "";
    }
}

function openFeature() {
    var allElems = document.querySelectorAll(".elem");
    var allFullElements = document.querySelectorAll(".fullElem");
    var backBtns = document.querySelectorAll(".fullElem .back");

    allElems.forEach((elem) => {
        elem.addEventListener("click", () => {
            allFullElements[elem.id].style.display = "block";

            if (elem.id == "2") {
                fetchQuote(); // call again when motivation opens
            }
        })
    })

    backBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            btn.parentElement.style.display = "none";
        })
    })
};
openFeature();

function todoList() {
    let form = document.querySelector(".addTask form");
    let taskInput = document.querySelector(".addTask form input");
    let taskDetailsInput = document.querySelector(".addTask form textarea");
    let impChecker = document.querySelector(".addTask form #check");
    let allTask = document.querySelector(".allTask");

    let currTask = []

    if (localStorage.getItem("currTask") === null) {
        localStorage.setItem("currTask", currTask);
    } else {
        currTask = JSON.parse(localStorage.getItem("currTask"));
    }

    function renderTask() {
        localStorage.setItem("currTask", JSON.stringify(currTask));
        allTask.innerHTML = "";

        currTask.forEach((task, idx) => {
            let newTask = document.createElement("div");
            newTask.classList.add("task");

            newTask.innerHTML = `
                <h5>${task.task}
                ${task.imp ? '<span>imp</span>' : ''}
                </h5>
                ${task.details ? `
                    <details>
                        <summary>View Details</summary>
                        <p>${task.details}</p>
                    </details>
                ` : ""}
                <button id=${idx}>Mark as completed</button>
            `;
            allTask.appendChild(newTask);
        });

        // ** mark as complete button **
        document.querySelectorAll(".task button").forEach((btn) => {
            btn.addEventListener("click", () => {
                currTask.splice(btn.id, 1);
                localStorage.setItem("currTask", JSON.stringify(currTask));
                renderTask();
            })
        });
    }

    renderTask();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let newTask = {
            task: taskInput.value,
            details: taskDetailsInput.value,
            imp: impChecker.checked
        };

        currTask.push(newTask);
        renderTask();
        form.reset();
    });
};
todoList();


function dailyPlanner() {
    let dayPlanner = document.querySelector(".day-planner");
    let dayPlannerData = JSON.parse(localStorage.getItem("dayPlannerData")) || {}

    let hours = Array.from({ length: 18 }, (elem, idx) => {
        return `${6 + idx}:00 - ${7 + idx}:00`
    })

    let wholeDay = '';
    hours.forEach((hour, idx) => {
        wholeDay +=
            `<div class="day-planner-time">
            <p>${hour}</p>
            <input id="${idx}" 
                type="text" 
                placeholder="..." 
                value="${dayPlannerData[idx] || ''}">
        </div>`
    })

    dayPlanner.innerHTML = wholeDay;

    let dayPlannerInputs = document.querySelectorAll(".day-planner input");

    dayPlannerInputs.forEach((elem) => {
        elem.addEventListener("input", () => {
            dayPlannerData[elem.id] = elem.value;
            localStorage.setItem("dayPlannerData", JSON.stringify(dayPlannerData));
        })
    })
}
dailyPlanner();


function motivationalQuote() {
    fetchQuote();
}
motivationalQuote();


function pomodoroTimer() {
    let totalSeconds = 25 * 60;
    let session = document.querySelector(".pomodoro-fullPage .session");
    let timer = document.querySelector(".pomodoro-timer h1");
    let startBtn = document.querySelector('.pomodoro-timer .start-timer');
    let pauseBtn = document.querySelector('.pomodoro-timer .pause-timer');
    let resetBtn = document.querySelector('.pomodoro-timer .reset-timer');
    let isWorkSession = true;
    let timerInterval = null;

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        timer.classList.remove("break-message", "work-message");

        timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function startTimer() {
        clearInterval(timerInterval);

        timerInterval = setInterval(() => {

            if (totalSeconds > 0) {
                totalSeconds--;
                updateTimer();
                return;
            }

            clearInterval(timerInterval);

            session.classList.remove("break-message", "work-message");

            if (isWorkSession) {
                timer.innerHTML = "Break";
                session.innerHTML = "Take a Break";

                session.classList.add("break-message");
                session.style.backgroundColor = "var(--break)";

                isWorkSession = false;
                totalSeconds = 5 * 60;

            } else {
                timer.innerHTML = "Focus";
                session.innerHTML = "Work Session";

                session.classList.add("work-message");
                session.style.backgroundColor = "var(--work)";

                isWorkSession = true;
                totalSeconds = 25 * 60;
            }

        }, 1000);
    }


    function pauseTimer() {
        clearInterval(timerInterval);
    }

    function resetTimer() {
        clearInterval(timerInterval);

        isWorkSession = true;
        totalSeconds = 25 * 60;

        session.classList.remove("break-message");
        session.classList.add("work-message");

        session.innerHTML = "Work Session";
        session.style.backgroundColor = "var(--work)";

        updateTimer();
    }

    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);
}
pomodoroTimer();


function WeatherFunctionality() {
    let header = document.querySelector(".allElems header");
    let timeHeader = document.querySelector('.header1 .day')
    let dateHeader = document.querySelector('.header1 .time')
    let place = document.querySelector('.header1 .place')

    let temp = document.querySelector('.header2 .temp')
    let condition = document.querySelector('.header2 .condition')
    let pressure = document.querySelector('.header2 .pressure')
    let humidity = document.querySelector('.header2 .humidity')
    let wind = document.querySelector('.header2 .wind')


    let apiKey = '4e491b1952554aea879185611260703'
    let city = 'Kolkata'
    let data = null;

    function changeBackgroundByTime(hours) {

        if (hours >= 5 && hours < 16) {
            // Morning
            header.style.backgroundImage =
                "url('/public/morning.jpeg')";
        }

        else if (hours >= 16 && hours < 20) {
            // Evening
            header.style.backgroundImage =
                "url('/public/evening.jpeg')";
        }

        else {
            // Night
            header.style.backgroundImage =
                "url('/public/night.jpeg')";
        }

    }

    async function weatherAPI() {
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        data = await response.json();

        place.innerHTML = `${data.location.name}, ${data.location.region}`
        temp.innerHTML = `${data.current.temp_c}°C`
        condition.innerHTML = `${data.current.condition.text}`
        pressure.innerHTML = `Pressure : ${data.current.pressure_mb} mb`
        humidity.innerHTML = `Humidity : ${data.current.humidity}`
        wind.innerHTML = `Wind : ${data.current.wind_kph} km/h`
    }
    weatherAPI();


    let date = null;
    function time() {
        const daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        date = new Date();
        let dayInWeek = daysInWeek[date.getDay()]
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        const amPmOnly = date.getHours() >= 12 ? 'PM' : 'AM';
        // changeBackgroundByTime(hours);

        timeHeader.innerHTML = `${dayInWeek}, ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${amPmOnly}`

        let day = date.getDate();
        let month = months[date.getMonth()];
        let year = date.getFullYear();

        dateHeader.innerHTML = `${day} ${month} ${year}`
    }

    setInterval(() => {
        time();
    }, 1000)
}
WeatherFunctionality();


function changeTheme() {
    let themeBtn = document.querySelector('.theme');
    let rootEl = document.documentElement;
    let click = 0;

    themeBtn.addEventListener('click', () => {
        console.log('clicked')
        if (click == 0) {
            rootEl.style.setProperty('--pri', '#352F44');
            rootEl.style.setProperty('--sec', '#FAF0E6');
            rootEl.style.setProperty('--tri1', '#5C5470');
            rootEl.style.setProperty('--tri2', '#B9B4C7');
            click = 1;
        }
        else if (click == 1) {
            rootEl.style.setProperty('--pri', '#F8EDE3');
            rootEl.style.setProperty('--sec', '#798777');
            rootEl.style.setProperty('--tri1', '#BDD2B6');
            rootEl.style.setProperty('--tri2', '#A2B29F');
            click = 0;
        }
    })
}
changeTheme();

function quickNotes() {
    const form = document.getElementById("noteForm");
    const titleInput = document.getElementById("noteTitle");
    const contentInput = document.getElementById("noteContent");
    const notesContainer = document.getElementById("notesContainer");

    let notes = JSON.parse(localStorage.getItem("quickNotes")) || [];


    function renderNotes() {
        notesContainer.innerHTML = "";
        notes.forEach((note, index) => {
            const noteCard = document.createElement("div");
            noteCard.classList.add("note-card");

            noteCard.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button class="deleteNote" data-index="${index}">Delete</button>
        `;

            notesContainer.appendChild(noteCard);
        });
    }


    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
        if (!title || !content) return;   // safety check
        const newNote = {
            title,
            content
        };
        notes.push(newNote);
        localStorage.setItem("quickNotes", JSON.stringify(notes));
        form.reset();
        renderNotes();
    });


    notesContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("deleteNote")) {
            const index = e.target.dataset.index;
            notes.splice(index, 1);
            localStorage.setItem("quickNotes", JSON.stringify(notes));
            renderNotes();
        }
    });


    renderNotes();
}
quickNotes();