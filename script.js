const questions = [
  {
    question: "ข้อ 1 Guidelines ใดสนับสนุนการใช้ rTMS เพื่อช่วยฟื้นฟู motor recovery หลังโรคหลอดเลือดสมอง?",
    choices: [
      "A) WHO Rehabilitation Guidelines",
      "B) AHA/ASA Stroke Guidelines",
      "C) Canadian Stroke Best Practice Recommendations",
      "D) NICE Guidelines",
    ],
    correct: [2],
    //multiSelect: false
  },
  {
    question: "ข้อ 2  รูปแบบการกระตุ้น rTMS แบบใดที่มีหลักฐานดีที่สุดในการลด interhemispheric inhibition เพื่อฟื้นฟูแขน ในผู้ป่วย Post Stroke?",
    choices: [
              "A) ใช้ความถี่ 1 Hz บริเวณ ipsilesional M1", 
              "B) ใช้ความถี่ 5–20 Hz บริเวณ contralesional M1",
              "C) ใช้ความถี่ 1 Hz บริเวณ contralesional M1",
              "D) ไม่มีข้อใดถูก"
    ],
    correct: [2]
  },
  {
    question: "ข้อ 3 ในโรคกลุ่ม Neurology (ที่ไม่ใช่โรคทางจิตเวช)  rTMS ได้รับ US FDA อนุมัติสำหรับข้อบ่งใช้อะไร?",
    choices: [
      "A) Major Depressive Disorder",
      "B) Post stroke with Depression",
      "C) Motor recovery ในผู้ป่วย Post stroke",
      "D) Relieve pain caused by migraine headache with aura"
    ],
    correct: [3]
  },
  {
    question: "ข้อ 4 จุดเด่นใดของเครื่อง  Yiruide TMS ที่สำคัญมากที่สุดต่อการรักษาและฟื้นฟูผู้ป่วย Post Stroke Rehabilitation?",
    choices: [
      "A) มี Prococol อ้างอิงทั้งจาก USFDA และ IFCN (European expert)",
      "B) ลักษณะการออกแบบเป็น One piece unit",
      "C) มีโหมด ทั้ง rTMS, ITBS, cTBS และ ppTMS ครบ สำหรับ Post stroke rehabilitation",
      "D) มีระบบ internal liquid cooling system ให้ในทุกหัวคอยด์"
    ],
    correct: [2]
  },
  {
    question: "ข้อ 5 อะไรคือเหตุผลที่ถูกต้องที่สุดที่คลินิกฟื้นฟู stroke นิยมใช้ TMS ควบคู่กายภาพบำบัด (PT/OT)?",
    choices: [
      "A) ทำให้คนไข้มีความร่วมมือในการรักษาและฟื้นฟูมากขึ้น",
      "B) เพิ่ม neuroplasticity ก่อนทำ PT/OT และเพิ่มผลลัพธ์ของ motor training",
      "C) เป็นเทคโนโลยีที่ทันสมัย",
      "D) มีงานวิจัยสนับสนุนมากมาย"
    ],
    correct: [1],
    //multiSelect: true
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
  const imgContainer = document.createElement("div");
  imgContainer.className = "image-row";

  const img1 = document.createElement("img");
  img1.src = "images/PictureV2_1.png";
  img1.className = "question-image side-image enlarged-image";

  const img2 = document.createElement("img");
  img2.src = "images/Q2_picture.jpg";
  img2.className = "question-image side-image enlarged-image";

  imgContainer.appendChild(img1);
  imgContainer.appendChild(img2);

  questionContainer.appendChild(imgContainer);

  }
   if (current === 1) {
    const img = document.createElement("img");
    img.src = "images/magtd.png";
    img.className = "question-image small-image";
    questionContainer.appendChild(img);
  } 
  if (current === 2) {
    const img = document.createElement("img");
    img.src = "images/PictureV2_Q3.png";
    img.className = "question-image";
    questionContainer.appendChild(img);
  }
  if (current === 3) {
  const imgContainer = document.createElement("div");
  imgContainer.className = "image-row";

  const img1 = document.createElement("img");
  img1.src = "images/Q5_picture.jpg";
  img1.className = "question-image side-image enlarged-image";

  const img2 = document.createElement("img");
  img2.src = "images/magtd.png";
  img2.className = "question-image side-image enlarged-image";

  imgContainer.appendChild(img1);
  imgContainer.appendChild(img2);

  questionContainer.appendChild(imgContainer);
  }
  if (current === 4) {
    const img = document.createElement("img");
    img.src = "images/Q5_V2_picture.jpg";
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



