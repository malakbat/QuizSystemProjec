import { AuthService } from "./Services/AuthService.js";
import { ExamService } from "./services/ExamService.js";
import { ExamUI } from "./ui/ExamUI.js";

const authService = new AuthService();
const examService = new ExamService();
const examUI = new ExamUI(examService);

const currentUser = authService.getCurrentUser();

// 1. הגנת דף - רק סטודנט מחובר יכול להיכנס
if (!currentUser || currentUser.role !== "student") {
  alert("גישה חסומה! דף זה מיועד לסטודנטים בלבד.");
  window.location.href = "index.html";
}

// 2. עדכון כותרת ברוכים הבאים
document.getElementById("welcomeStudentHeader").textContent = `שלום, ${currentUser.username} (סטודנט)`;

// 3. מנגנון התנתקות
document.getElementById("logoutBtn").addEventListener("click", () => {
  authService.logout();
  window.location.href = "index.html";
});

// 4. פונקציה להצגת נתוני היסטוריית המבחנים והממוצע של הסטודנט
function renderStudentStats() {
  const users = authService.getAllUsers();
  const currentFullUser = users.find(u => u.username === currentUser.username);
  
  const historyListElement = document.getElementById("studentHistoryList");
  const averageElement = document.getElementById("studentAverage");

  if (!currentFullUser || !currentFullUser.history || currentFullUser.history.length === 0) {
    historyListElement.innerHTML = `<p class="text-muted small text-center">טרם ביצעת מבחנים במערכת.</p>`;
    averageElement.textContent = "0%";
    return;
  }

  // רינדור רשימת ההיסטוריה
  historyListElement.innerHTML = "";
  let totalPercent = 0;

  currentFullUser.history.forEach(item => {
    totalPercent += item.percent;
    const div = document.createElement("div");
    div.className = "border-bottom py-1 small d-flex justify-content-between";
    div.innerHTML = `<span><strong>${item.examTitle}</strong></span> <span>ציון: ${item.score}/${item.total} (${item.percent}%)</span>`;
    historyListElement.appendChild(div);
  });

  // חישוב ממוצע
  const avg = Math.round(totalPercent / currentFullUser.history.length);
  averageElement.textContent = `${avg}%`;
}

// 5. עריכת פונקציית הבדיקה של ExamUI כדי לשמור את הציון ב-Storage של הסטודנט הנוכחי
const originalCheckExam = examUI.checkExam;
examUI.checkExam = function(exam) {
  // קריאה לפונקציה המקורית שמציגה את התוצאה על המסך
  originalCheckExam.call(this, exam);

  // חישוב הציון העדכני שהתקבל ברגע זה
  let score = 0;
  exam.questions.forEach((question, questionIndex) => {
    const selectedAnswer = document.querySelector(`input[name="question-${questionIndex}"]:checked`);
    if (selectedAnswer && Number(selectedAnswer.value) === question.correctAnswerIndex) {
      score++;
    }
  });

  const percent = Math.round((score / exam.questions.length) * 100);

  // שמירת התוצאה לתוך מערך ההיסטוריה של המשתמש ב-localStorage
  const users = authService.getAllUsers();
  const userIdx = users.findIndex(u => u.username === currentUser.username);
  
  if (userIdx !== -1) {
    if (!users[userIdx].history) users[userIdx].history = [];
    
    users[userIdx].history.push({
      examTitle: exam.title,
      score: score,
      total: exam.questions.length,
      percent: percent,
      date: new Date().toLocaleDateString()
    });

    localStorage.setItem(authService.usersKey, JSON.stringify(users));
    
    // עדכון תצוגת ההישגים על המסך באופן מיידי
    renderStudentStats();
  }
};

// 6. שירות חיפוש וסינון מבחנים בזמן אמת (Real-time Search)
document.getElementById("searchExamInput").addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  const cards = document.querySelectorAll("#examList .exam-card");

  cards.forEach(card => {
    const title = card.querySelector("h5").textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// הפעלה ראשונית של התצוגה
examUI.renderExamList();
renderStudentStats();

// טיפול בלחיצה על כפתור "Run Exam" מתוך רשימת המבחנים של הסטודנט
document.getElementById("examList").addEventListener("click", (event) => {
  if (event.target.classList.contains("run-btn")) {
    const examId = event.target.dataset.id;
    const exam = examService.getExamById(examId);
    examUI.renderExamRunner(exam);
    
    // גלילה חלקה למטה אל אזור ביצוע המבחן
    document.getElementById("examRunner").scrollIntoView({ behavior: 'smooth' });
  }
});