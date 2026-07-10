import { ExamService } from "./Services/ExamService.js";
import { ExamUI } from "./ui/ExamUI.js";

const examService = new ExamService();

const examUI = new ExamUI(examService);

const examId = localStorage.getItem("selectedExam");

const exam = examService.getExamById(examId);

examUI.renderExamRunner(exam);