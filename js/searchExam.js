import { ExamService } from "./Services/ExamService.js";

const examService = new ExamService();

const exams = examService.getAllExams();

const searchInput = document.getElementById("searchInput");

const examResults = document.getElementById("examResults");

render(exams);

searchInput.addEventListener("input", () => {

    const value = searchInput.value.toLowerCase();

    const filtered = exams.filter(exam =>
        exam.title.toLowerCase().includes(value)
    );

    render(filtered);

});

function render(list){

    examResults.innerHTML = "";

    if(list.length===0){

        examResults.innerHTML="<p>No exams found.</p>";

        return;

    }

    list.forEach(exam=>{

        const div=document.createElement("div");

        div.className="exam-card";

        div.innerHTML=`

        <h5>${exam.title}</h5>

        <p>${exam.getQuestionCount()} Questions</p>

        <button
        class="btn btn-primary startBtn"
        data-id="${exam.id}">

        Start Exam

        </button>

        `;

        examResults.appendChild(div);

    });

}

examResults.addEventListener("click",e=>{

    if(e.target.classList.contains("startBtn")){

        localStorage.setItem(
            "selectedExam",
            e.target.dataset.id
        );

        location.href="takeExam.html";

    }

});