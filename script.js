const questions = [
  {
    question: "ข้อบ่งใช้ใดที่ได้รับการอนุมัติจาก USFDA ให้ใช้ TMS ในกรณีที่ใช้ยารักษาแล้วไม่ได้ผล?",
    choices: [
      "Major Depressive Disorder (MDD)",
      "Obsessive-Compulsive Disorder (OCD)",
      "Substance Addiction (for smoking cessation)",
      "Generalized Anxiety Disorder (GAD)",
      "Post-Traumatic Stress Disorder (PTSD)",
      "Schizophrenia (negative symptoms)",
      "Schizophrenia (auditory hallucinations)"
    ],
    correct: [0, 1, 2],
    multiSelect: false
  },
  {
    question: "US FDA ได้อนุมัติให้ TMS สามารถใช้ในการรักษา  Major Depressive Disorder (MDD) <b>ครั้งแรก</b> ในปีใด?",
    choices: ["2018", "2008", "2010", "2020"],
    correct: [1]
  },
  {
    question: "rTMS หรือ repetitive TMS Protocol ที่ US FDA อนุมัติให้รักษา Major Depressive Disorder (MDD) จะต้องวางหัวคอยด์ Figure of 8 กระตุ้นที่ศรีษะบริเวณไหน?",
    choices: [
      "Right DLPFC",
      "Left M1 area",
      "Left temporoparietal lobe",
      "Left DLPFC"
    ],
    correct: [3]
  },
  {
    question: "rTMS หรือ repetitive TMS Protocol ที่ US FDA อนุมัติให้รักษา Major Depressive Disorder (MDD) จะต้องใช้หัวคอยด์ชนิดไหน ในการกระตุ้นที่ศรีษะบริเวณ Left dorsolateral prefrontal cortex (DLPFC)?",
    choices: [
      "Figure of 8 coil",
      "Circular coil",
      "H-coil",
      "Double cone coil"
    ],
    correct: [0]
  },
  {
    question: "เพราะเหตุใดในเครื่อง TMS ต้องมีระบบ Cooling system ที่ดีทั้งในตัวเครื่อง (body) และที่หัวคอยด์?",
    choices: [
      "Patient Safety",
      "Continue using during the service period",
      "Protecting Coil overheating",
      "Better design for a friendly user (light and thin)"
    ],
    correct: [0, 1, 2, 3],
    multiSelect: true
  }
];

let current = 0;
let score = 0;
let answers = [];
let selectedIndex = null;
let locked = false;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-btn").addEventListener("click", startGame);
  document.getElementById("next-btn").addEventListener("click", nextQuestion);
});

function startGame() {
  document.querySelector('.intro-screen').style.display = 'none';
  document.querySelector('.quiz-screen').style.display = 'block';
  document.querySelector('.result-screen').style.display = 'none';
  current = 0;
  score = 0;
  answers = [];
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  selectedIndex = null;
  locked = false;

  const questionContainer = document.getElementById("question");
  questionContainer.innerHTML = `<p>${q.question}</p>`;
  if (current === 0) {
    const img = document.createElement("img");
    img.src = "images/Q1_picture.jpg";
    img.className = "question-image small-image";
    questionContainer.appendChild(img);
  }
   if (current === 1) {
    const img = document.createElement("img");
    img.src = "images/Q2_picture.jpg";
    img.className = "question-image small-image";
    questionContainer.appendChild(img);
  } 
  if (current === 2) {
    const img = document.createElement("img");
    img.src = "images/Q3_picture.png";
    img.className = "question-image";
    questionContainer.appendChild(img);
  }
  if (current === 3) {
    const img = document.createElement("img");
    img.src = "images/Q4_picture.png";
    img.className = "question-image small-image"; 
    questionContainer.appendChild(img);
  }
  if (current === 4) {
    const img = document.createElement("img");
    img.src = "images/Q5_picture.jpg";
    img.className = "question-image"; 
    questionContainer.appendChild(img);
  }
  const choicesList = document.getElementById("choices");
  choicesList.innerHTML = "";
  document.getElementById("next-btn").style.display = "none";

  q.choices.forEach((choice, index) => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.style.cursor = "pointer";
    li.onclick = () => handleChoice(index, li);
    choicesList.appendChild(li);
  });
}

function handleChoice(index, element) {
  if (locked) return;

  const q = questions[current];
  const choicesList = document.getElementById("choices").children;

  for (let i = 0; i < choicesList.length; i++) {
    choicesList[i].style.background = "";
  }

  selectedIndex = index;
  element.style.background = "#d0eaff";

  if (confirm("คุณต้องการยืนยันคำตอบนี้หรือไม่?")) {
    locked = true;
    const isCorrect = q.correct.includes(index);
    element.style.background = isCorrect ? "green" : "red";

    const resultOverlay = document.createElement("div");
    resultOverlay.textContent = isCorrect ? "✅ Correct!" : "❌ Incorrect!";
    resultOverlay.className = "result-popup";
    resultOverlay.style.color = isCorrect ? "green" : "red";
    document.body.appendChild(resultOverlay);

    setTimeout(() => {
      resultOverlay.remove();
    }, 2000);

    answers.push(q.choices[index] + (isCorrect ? " ✅" : " ❌"));
    if (isCorrect) {
      score++;
      document.getElementById("correct-sound").play();
    } else {
      document.getElementById("wrong-sound").play();
    }

    document.getElementById("next-btn").style.display = "block";
  }
}

function nextQuestion() {
  current++;
  document.getElementById("next-btn").style.display = "none";
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.querySelector('.quiz-screen').style.display = 'none';
  document.querySelector('.result-screen').style.display = 'block';

  const resultText = document.getElementById("result-text");
  resultText.textContent = `Great! คุณได้ ${score}/${questions.length}`;
  document.getElementById("clap-sound").play();

  const name = document.getElementById("name").value;
  const hospital = document.getElementById("hospital").value;
  const specialty = document.getElementById("specialty").value;
  const tmsExp = document.getElementById("tmsYes").checked;

  exportToExcel(name, hospital, specialty, tmsExp, answers);

  const resultScreen = document.querySelector('.result-screen');
  if (!document.getElementById("back-home-btn")) {
    const backBtn = document.createElement("button");
    backBtn.textContent = "กลับหน้าหลัก";
    backBtn.id = "back-home-btn";
    backBtn.style.marginTop = "20px";
    backBtn.onclick = () => {
      document.querySelector('.result-screen').style.display = 'none';
      document.querySelector('.intro-screen').style.display = 'block';

      // ✅ ล้างค่าฟอร์มทั้งหมด
      document.getElementById("name").value = "";
      document.getElementById("hospital").value = "";
      document.getElementById("specialty").value = "";
      document.getElementById("tmsYes").checked = false;
      document.getElementById("tmsNo").checked = false;
    };
    resultScreen.appendChild(backBtn);
  }
}


function exportToExcel(name, hospital, specialty, tmsExp, answers) {
  const wb = XLSX.utils.book_new();
  const wsData = [
    ["Name", name],
    ["Hospital", hospital],
    ["Specialty", specialty],
    ["TMS Experience", tmsExp ? "Yes" : "No"],
    [],
    ["Question", "Answer"]
  ];
  answers.forEach((ans, i) => {
    wsData.push([`Q${i + 1}`, ans]);
  });

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, "TMS Quiz");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  // ✅ แปลง binary เป็น ArrayBuffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  // ✅ ใช้ MIME type ที่ iOS รองรับ
  const blob = new Blob([s2ab(wbout)], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `TMS_Quiz_${name.replace(" ", "_")}.xlsx`;

  // ✅ เพิ่ม delay ก่อน revoke URL เพื่อให้ Safari ทำงานทัน
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, 1500);
}


