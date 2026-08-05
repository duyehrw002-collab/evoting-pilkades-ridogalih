// ======================================
// SIMULASI E-VOTING PILKADES
// ======================================

const splash = document.getElementById("splash");
const btnMulai = document.getElementById("btnMulai");

const votingPage = document.getElementById("votingPage");

const modal = document.getElementById("confirmModal");

const successPage = document.getElementById("successPage");

const modalNomor = document.getElementById("modalNomor");
const modalNama = document.getElementById("modalNama");

const btnYa = document.getElementById("btnYa");
const btnBatal = document.getElementById("btnBatal");

const clickSound = document.getElementById("clickSound");
const beepSound = document.getElementById("beepSound");
const successSound = document.getElementById("successSound");

const countdown = document.getElementById("countdown");

let nomorDipilih = "";
let namaDipilih = "";
let sedangMemilih = false;

// ======================================
// MULAI
// ======================================

btnMulai.addEventListener("click", function(){

    splash.style.display = "none";

    votingPage.classList.remove("hidden");

});

// ======================================
// JAM
// ======================================

function updateJam(){

    const now = new Date();

    let h = String(now.getHours()).padStart(2,"0");
    let m = String(now.getMinutes()).padStart(2,"0");
    let s = String(now.getSeconds()).padStart(2,"0");

    document.getElementById("clock").innerHTML =
    h + ":" + m + ":" + s;

}

setInterval(updateJam,1000);

updateJam();

// ======================================
// PILIH CALON
// ======================================

document.querySelectorAll(".hotspot").forEach(function(item){

    item.addEventListener("click",function(){

        if(sedangMemilih) return;

        sedangMemilih = true;

        nomorDipilih = item.dataset.nomor;
        namaDipilih = item.dataset.nama;

        modalNomor.innerHTML = nomorDipilih;
        modalNama.innerHTML = namaDipilih;

        modal.classList.remove("hidden");

        if(clickSound){

            clickSound.currentTime=0;
            clickSound.play();

        }

    });

});

// ======================================
// KEMBALI
// ======================================

btnBatal.addEventListener("click",function(){

    modal.classList.add("hidden");

    sedangMemilih = false;

});

// ======================================
// YAKIN
// ======================================

btnYa.addEventListener("click",function(){

    modal.classList.add("hidden");

    if(beepSound){

        beepSound.currentTime=0;
        beepSound.play();

    }

    setTimeout(function(){

        successPage.classList.remove("hidden");

        if(successSound){

            successSound.currentTime=0;
            successSound.play();

        }

        mulaiHitung();

    },500);

});

// ======================================
// COUNTDOWN
// ======================================

function mulaiHitung(){

    let waktu = 5;

    countdown.innerHTML = waktu;

    const timer = setInterval(function(){

        waktu--;

        countdown.innerHTML = waktu;

        if(waktu<=0){

            clearInterval(timer);

            resetVoting();

        }

    },1000);

}

// ======================================
// RESET
// ======================================

function resetVoting(){

    successPage.classList.add("hidden");

    sedangMemilih=false;

    nomorDipilih="";
    namaDipilih="";

}

// ======================================
// FULLSCREEN
// ======================================

document.addEventListener("keydown",function(e){

    if(e.key==="f"){

        if(!document.fullscreenElement){

            document.documentElement.requestFullscreen();

        }else{

            document.exitFullscreen();

        }

    }

});

// ======================================
// BLOK KLIK KANAN
// ======================================

document.addEventListener("contextmenu",function(e){

    e.preventDefault();

});

// ======================================
// BLOK DOUBLE CLICK
// ======================================

document.addEventListener("dblclick",function(e){

    e.preventDefault();

});

// ======================================
// PRELOAD AUDIO
// ======================================

window.onload=function(){

    [clickSound,beepSound,successSound].forEach(function(a){

        if(a){

            a.load();

            a.volume=0.7;

        }

    });

};

console.log("Simulasi E-Voting Siap");