import { AuthService } from "./Services/AuthService.js";
import { ExamService } from "./Services/ExamService.js";

const auth = new AuthService();

const examService = new ExamService();

const currentUser = auth.getCurrentUser();

if (!currentUser || currentUser.role !== "teacher") {

    location.href = "login.html";

}

document
.getElementById("logoutBtn")
.addEventListener("click", () => {

    auth.logout();

    location.href = "index.html";

});

const exams = examService.getAllExams();

const list = document.getElementById("teacherExamList");

if (exams.length === 0) {

    list.innerHTML = "<p>No exams yet.</p>";

}

else {

    exams.forEach(exam => {

        const card = document.createElement("div");

        card.className = "exam-card";

        card.innerHTML = `

            <h5>${exam.title}</h5>

            <p>${exam.getQuestionCount()} Questions</p>

            <button
            class="btn btn-success runBtn"
            data-id="${exam.id}">

            Run

            </button>

            <button
            class="btn btn-danger deleteBtn"
            data-id="${exam.id}">

            Delete

            </button>

        `;

        list.appendChild(card);

    });

}

list.addEventListener("click", e => {

    const id = e.target.dataset.id;

    if (e.target.classList.contains("deleteBtn")) {

        examService.deleteExam(id);

        location.reload();

    }

    if (e.target.classList.contains("runBtn")) {

        localStorage.setItem("selectedExam", id);

        location.href = "takeExam.html";

    }

});