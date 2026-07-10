export class Result {

    constructor(studentId, examId, score, totalQuestions) {

        this.id = crypto.randomUUID();

        this.studentId = studentId;

        this.examId = examId;

        this.score = score;

        this.totalQuestions = totalQuestions;

        this.percent = Math.round((score / totalQuestions) * 100);

        this.date = new Date().toLocaleString();

    }

}