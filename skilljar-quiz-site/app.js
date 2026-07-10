const quizEl = document.querySelector("#quiz");
const answeredCountEl = document.querySelector("#answeredCount");
const scoreCountEl = document.querySelector("#scoreCount");
const totalCountEl = document.querySelector("#totalCount");
const progressBarEl = document.querySelector("#progressBar");
const instantFeedbackEl = document.querySelector("#instantFeedback");
const shuffleBtn = document.querySelector("#shuffleBtn");
const resetBtn = document.querySelector("#resetBtn");
const modeButtons = [...document.querySelectorAll("[data-mode]")];

const state = {
  questions: [],
  order: [],
  answers: new Map(),
  mode: "practice",
};

function parseMarkdown(markdown) {
  const blocks = markdown
    .split(/^## Question\s+\d+\s+\(Q\d+\)\s*$/gm)
    .slice(1);
  const headings = [...markdown.matchAll(/^## Question\s+(\d+)\s+\(Q\d+\)\s*$/gm)].map((match) => Number(match[1]));

  return blocks.map((block, index) => {
    const lines = block.trim().split("\n");
    const optionStart = lines.findIndex((line) => /^- \*?\*?[A-D]\./.test(line.trim()));
    const question = lines.slice(0, optionStart).join("\n").trim();
    const options = lines
      .slice(optionStart)
      .filter((line) => /^- /.test(line.trim()))
      .map((line) => {
        const isCorrect = line.includes("✅");
        const cleaned = line
          .replace(/^- /, "")
          .replace(/\*\*/g, "")
          .replace(/\s*✅\s*/g, "")
          .trim();
        const letter = cleaned.slice(0, 1);
        const text = cleaned.replace(/^[A-D]\.\s*/, "");
        return { letter, text, isCorrect };
      });

    return {
      id: headings[index],
      question,
      options,
      correct: options.find((option) => option.isCorrect)?.letter,
    };
  });
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

function getVisibleQuestions() {
  const byOrder = state.order.map((id) => state.questions.find((question) => question.id === id));
  if (state.mode === "review") {
    return byOrder.filter((question) => {
      const picked = state.answers.get(question.id);
      return picked && picked !== question.correct;
    });
  }
  if (state.mode === "all") {
    return byOrder;
  }
  return byOrder;
}

function updateStats() {
  const answered = state.answers.size;
  const correct = state.questions.filter((question) => state.answers.get(question.id) === question.correct).length;
  const total = state.questions.length;
  answeredCountEl.textContent = answered;
  scoreCountEl.textContent = correct;
  totalCountEl.textContent = total;
  progressBarEl.style.width = total ? `${(answered / total) * 100}%` : "0%";
}

function render() {
  const visibleQuestions = getVisibleQuestions();
  updateStats();

  if (!visibleQuestions.length) {
    quizEl.innerHTML = `<div class="empty-state">Không có câu nào trong chế độ này.</div>`;
    return;
  }

  quizEl.innerHTML = visibleQuestions
    .map((question, index) => renderQuestion(question, index))
    .join("");
}

function renderQuestion(question, index) {
  const picked = state.answers.get(question.id);
  const reveal = picked && instantFeedbackEl.checked;
  const note = picked
    ? picked === question.correct
      ? `<p class="result-note good">Đúng. Đáp án ${question.correct}.</p>`
      : `<p class="result-note bad">Chưa đúng. Đáp án đúng là ${question.correct}.</p>`
    : "";

  const answers = question.options
    .map((option) => {
      const classes = ["answer"];
      if (picked === option.letter) classes.push("selected");
      if (reveal && option.isCorrect) classes.push("correct");
      if (reveal && picked === option.letter && !option.isCorrect) classes.push("incorrect");

      return `
        <button class="${classes.join(" ")}" type="button" data-question="${question.id}" data-answer="${option.letter}">
          <span class="letter">${option.letter}</span>
          <span class="copy">${escapeHtml(option.text)}</span>
        </button>
      `;
    })
    .join("");

  return `
    <article class="question-card">
      <div class="question-meta">
        <span>Câu ${question.id}</span>
        <span>${index + 1}/${getVisibleQuestions().length}</span>
      </div>
      <p class="question-text">${escapeHtml(question.question)}</p>
      <div class="answers">${answers}</div>
      ${reveal ? note : ""}
    </article>
  `;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

quizEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-question][data-answer]");
  if (!button) return;
  state.answers.set(Number(button.dataset.question), button.dataset.answer);
  render();
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode;
    modeButtons.forEach((item) => item.classList.toggle("active", item === button));
    render();
  });
});

instantFeedbackEl.addEventListener("change", render);

shuffleBtn.addEventListener("click", () => {
  state.order = shuffle(state.order);
  render();
});

resetBtn.addEventListener("click", () => {
  state.answers.clear();
  state.mode = "practice";
  modeButtons.forEach((button) => button.classList.toggle("active", button.dataset.mode === "practice"));
  render();
});

async function init() {
  try {
    const response = await fetch("questions.md");
    if (!response.ok) throw new Error(`Cannot load questions.md: ${response.status}`);
    const markdown = await response.text();
    state.questions = parseMarkdown(markdown);
    state.order = state.questions.map((question) => question.id);
    render();
  } catch (error) {
    quizEl.innerHTML = `<div class="empty-state">Không tải được dữ liệu câu hỏi.</div>`;
    console.error(error);
  }
}

init();
