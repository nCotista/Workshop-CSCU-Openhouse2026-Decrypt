const firebaseConfig = {
    apiKey: window.ENV.API_KEY,
    authDomain: window.ENV.AUTH_DOMAIN,
    databaseURL: window.ENV.DB_URL,
    projectId: "workshop-cscu-oph-2026",
    storageBucket: "workshop-cscu-oph-2026.firebasestorage.app",
    messagingSenderId: "42429829940",
    appId: "1:42429829940:web:290be270c87a4487818b61",
    measurementId: "G-72QVG6088V"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let teamName = "";
let currentLevel = 0;
let pinCode = "";

const levels = [
    { 
        cipher: "zhduh", 
        answer: "68b6b89a3ce7b2d3184213194b7082dbfde41921c21988db3825bfd52fdcdb10",
        hint: "ไปที่ Colab ด่านที่ 1 นำข้อความนี้ไปใส่ใน cipher1 แล้วลองเปลี่ยนตัวเลข shift_value (ใบ้ให้ว่าเป็นค่าติดลบ)", 
        story: "ด่านที่ 1: นำข้อความที่ถูกล็อคด้วย Caesar Cipher นี้ไปใส่ใน Colab เพื่อถอดรหัส" 
    },
    { 
        cipher: "Oamjcho", 
        answer: "9059d883145dad31b9356e68608bdb258e86f9e62ddb6583bbf322aa3b6467fc", 
        hint: "ไปที่ Colab ด่านที่ 2 ใส่ข้อความนี้ใน cipher2 และใส่กุญแจ (key2) ที่ได้จากเกมทายภาพ", 
        story: "ด่านที่ 2: รหัสแบบ Vigenère Cipher นำข้อความนี้และ 'กุญแจ' ที่ได้จากภารกิจไปใส่ใน Colab" 
    },
    { 
        cipher: "Bekkx", 
        answer: "70975e0cf0e2d20bfa128dc53a2891ed037a832924feca225736864e4a389edb", 
        hint: "ไปที่ Colab ด่านสุดท้าย! ใส่รหัสนี้ใน final_cipher แล้วเอาตัวเลขจากด่าน 1 และกุญแจจากด่าน 2 มากรอก", 
        story: "ด่านที่ 3: ระบบป้องกัน 2 ชั้น! นำรหัสนี้ไปใส่ใน Colab ด่าน FINAL MISSION พร้อมกับข้อมูลที่ได้มา" 
    }
];

function showCustomAlert(title, message, isError = false) {
    const alertModal = document.getElementById('custom-alert');
    const alertBox = document.getElementById('alert-box');
    document.getElementById('alert-title').innerText = title;
    document.getElementById('alert-msg').innerText = message;

    if (isError) alertBox.classList.add('error-mode');
    else alertBox.classList.remove('error-mode');

    alertModal.style.display = 'flex';
}

function closeCustomAlert() {
    document.getElementById('custom-alert').style.display = 'none';
}

function saveTeamName() {
    const input = document.getElementById('team-name-input').value.trim();
    if (input) {
        teamName = input;
        document.getElementById('display-team-name').innerText = teamName;
        document.getElementById('team-modal').style.display = 'none';
        document.getElementById('game-container').classList.remove('hidden');
        loadLevel();
    } else {
        showCustomAlert("ACCESS DENIED", "กรุณาระบุชื่อทีม (Agent Name) ก่อนเข้าสู่ระบบ!", true);
    }
}

function loadLevel() {
    if (currentLevel >= levels.length) {
        document.getElementById('game-content').innerHTML = `
            <h2 style="text-align:center; color:yellow;">CODE FOUND: 2026</h2>
            <div style="text-align:center;"><button class="defuse-btn" onclick="openDefuseModal()">ENTER CODE</button></div>
        `;
        return;
    }
    const level = levels[currentLevel];
    document.getElementById('level-num').innerText = currentLevel + 1;
    document.getElementById('cipher-text').innerText = level.cipher;
    document.getElementById('story-text').innerText = level.story;
    document.getElementById('answer-input').value = "";
    document.getElementById('message').innerText = "";
}

async function hash(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text.toLowerCase()); // normalize
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

async function checkAnswer() {
    const userInput = document.getElementById('answer-input').value.trim();

    const hashed = await hash(userInput);

    if (hashed === levels[currentLevel].answer) {
        document.getElementById('message').innerText = "CORRECT";
        document.getElementById('message').className = "success";
        setTimeout(() => { currentLevel++; loadLevel(); }, 1000);
    } else {
        document.getElementById('message').innerText = "WRONG";
        document.getElementById('message').className = "error";
    }
}

function showHint() {
    showCustomAlert("INTEL ACQUIRED (HINT)", levels[currentLevel].hint, false);
}

function openDefuseModal() {
    document.getElementById('defuse-modal').style.display = 'flex';
    clearPin();
}

function closeDefuseModal() {
    document.getElementById('defuse-modal').style.display = 'none';
}

function addPin(num) {
    if (pinCode.length < 4) {
        pinCode += num;
        updatePinDisplay();
    }
}

function clearPin() {
    pinCode = "";
    updatePinDisplay();
}

function updatePinDisplay() {
    document.getElementById('pin-display').innerText = pinCode.padEnd(4, '-');
}

function submitPin() {
    if (pinCode === "2026") {
        db.ref('winners_list').transaction(function(currentList) {
            let list = currentList || [];
            if (!list.includes(teamName)) list.push(teamName);
            return list;
        }, function(error, committed, snapshot) {
            if (error) {
                showCustomAlert("SYSTEM ERROR", error.message, true);
            } else if (committed) {
                const list = snapshot.val() || [];
                const myRank = list.indexOf(teamName) + 1;
                showVictory(myRank);
            }
        });
    } else {
        showCustomAlert("INVALID CODE", "รหัสผิด! ระเบิดยังทำงานอยู่ รีบหาคำตอบใหม่!", true);
        clearPin();
    }
}

function showVictory(rank) {
    closeDefuseModal();
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('winner-name-display').innerText = teamName;

    let rankText = "";
    if(rank === 1) rankText = "1st 🥇 (HERO)";
    else if(rank === 2) rankText = "2nd 🥈";
    else if(rank === 3) rankText = "3rd 🥉";
    else rankText = rank + "th";

    document.getElementById('team-rank-display').innerText = rankText;
    document.getElementById('victory-screen').classList.remove('hidden');
}

document.getElementById('answer-input').addEventListener("keypress", (e) => {
    if(e.key==="Enter") checkAnswer();
});
document.getElementById('team-name-input').addEventListener("keypress", (e) => {
    if(e.key==="Enter") saveTeamName();
});