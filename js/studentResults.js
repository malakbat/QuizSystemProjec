import { ResultService } from "./services/ResultService.js";
import { AuthService } from "./services/AuthService.js";
import { ExamService } from "./services/ExamService.js";

const auth = new AuthService();
const resultService = new ResultService();
const examService = new ExamService();

const currentUser = auth.getCurrentUser();

const results = resultService.getStudentResults(currentUser.id);

const list = document.getElementById("resultsList");

if (results.length === 0) {

    list.innerHTML = "<p>No results yet.</p>";

}

else {

    results.forEach(result => {

        const exam = examService.getExamById(result.examId);

        const card = document.createElement("div");

        card.className = "exam-card";

        card.innerHTML = `

        <h5>${exam.title}</h5>

        <p>Score: ${result.score}/${result.totalQuestions}</p>

        <p>Percent: ${result.percent}%</p>

        <p>${result.date}</p>

        `;

        list.appendChild(card);

    });

}