export class Exam {
  constructor(title) {
    this.id = crypto.randomUUID();
    this.title = title;
    // ================= NEW =================
    this.description = description;

    this.category = category;

    this.duration = duration;

    this.examCode = Math.floor(100000 + Math.random() * 900000).toString();
    this.questions = [];
    this.createdAt = new Date().toISOString();
  }

  //get ouuestion class object (model/Question.js)
  
  addQuestion(question) {
    this.questions.push(question);
  }

  getQuestionCount() {
    return this.questions.length;
  }
}