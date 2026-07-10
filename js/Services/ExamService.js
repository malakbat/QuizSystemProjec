import { Exam } from "../models/Exam.js";
import { Question } from "../models/Question.js";

export class ExamService {
  constructor() {
    this.storageKey = "exams";
  }

  getAllExams() {
    //Get Data From LocalStorage by exams key
    const data = localStorage.getItem(this.storageKey);

    if (!data) {
      return [];
    }
    //continue if key exsists and parse data to arrsy of objects
    const plainExams = JSON.parse(data);
    //for each examData(Exam) return new exam object with the same for each 
    // clone the data to new objects to avoid direct
    let allExamsClones = plainExams.map(examData => {
    const exam = new Exam(

      examData.title,

      examData.description,

      examData.category,

      examData.duration

    );
      exam.id = examData.id;
      exam.createdAt = examData.createdAt;
      exam.examCode = examData.examCode;
      exam.questions = examData.questions.map(questionData => {
        const question = new Question(
          questionData.text,
          questionData.answers,
          questionData.correctAnswerIndex
        );

        question.id = questionData.id;

        return question;
      });

      return exam;
    });
    return allExamsClones;
  }

  saveExam(exam) {
    const exams = this.getAllExams();

    exams.push(exam);

    localStorage.setItem(this.storageKey, JSON.stringify(exams));
  }

  deleteExam(examId) {
    const exams = this.getAllExams();

    const filteredExams = exams.filter(exam => exam.id !== examId);

    localStorage.setItem(this.storageKey, JSON.stringify(filteredExams));
  }

  getExamById(examId) {
    const exams = this.getAllExams();

    return exams.find(exam => exam.id === examId);
  }

  clearAllExams() {
    localStorage.removeItem(this.storageKey);
  }
}