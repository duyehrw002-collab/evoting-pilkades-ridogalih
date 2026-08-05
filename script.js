/* ===========================================================
   SIMULASI E-VOTING PILKADES RIDOGALIH
   script.js - Bagian 1
===========================================================*/

"use strict";

/* ===========================================================
   ELEMEN
===========================================================*/

const splash = document.getElementById("splash");
const votingPage = document.getElementById("votingPage");

const confirmModal = document.getElementById("confirmModal");
const successPage = document.getElementById("successPage");

const nomorCalon = document.getElementById("nomorCalon");
const namaCalon = document.getElementById("namaCalon");

const btnKembali = document.getElementById("btnKembali");
const btnYakin = document.getElementById("btnYakin");

const timer = document.getElementById("timer");

const clickSound = document.getElementById("clickSound");
const beepSound = document.getElementById("beepSound");
const successSound = document.getElementById("successSound");

const clock = document.getElementById("clock");
const clockDigital = document.getElementById("clockDigital");
const tanggal = document.getElementById("tanggal");

/* ===========================================================
   VARIABEL
===========================================================*/

let pilihanNomor = "";
let pilihanNama = "";

let sedangMemilih = false;

/* ===========================================================
   SPLASH SCREEN
===========================================================*/

splash.addEventListener("click", () => {

    splash.classList.add("hide");

    setTimeout(() => {

        splash.style.display = "none";

        votingPage.classList.remove("hidden");
        votingPage.classList.add("show");

    },700);

});

/* ===========================================================
   JAM DIGITAL
===========================================================*/

function updateClock(){

    const now = new Date();

    const jam =
        String(now.getHours()).padStart(2,"0");

    const menit =
        String(now.getMinutes()).padStart(2,"0");

    const detik =
        String(now.getSeconds()).padStart(2,"0");

    const waktu =
        jam + ":" + menit + ":" + detik;

    if(clock)
        clock.innerHTML = waktu;

    if(clockDigital)
        clockDigital.innerHTML = waktu;

}

setInterval(updateClock,1000);

updateClock();

/* ===========================================================
   TANGGAL
===========================================================*/

function updateTanggal(){

    const hari = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu"
    ];

    const bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];

    const d = new Date();

    const text =
        hari[d.getDay()] +
        ", " +
        d.getDate() +
        " " +
        bulan[d.getMonth()] +
        " " +
        d.getFullYear();

    if(tanggal)
        tanggal.innerHTML = text;

}

updateTanggal();

/* ===========================================================
   HOTSPOT CALON
===========================================================*/

const semuaCalon =
document.querySelectorAll(".hotspot");

semuaCalon.forEach((item)=>{

    item.addEventListener("click",()=>{

        if(sedangMemilih)
            return;

        sedangMemilih = true;

        pilihanNomor =
        item.dataset.calon;

        pilihanNama =
        item.dataset.nama;

        nomorCalon.innerHTML =
        pilihanNomor;

        namaCalon.innerHTML =
        pilihanNama;

        item.classList.add("active");

        if(clickSound){

            clickSound.currentTime = 0;
            clickSound.play();

        }

        setTimeout(()=>{

            confirmModal.classList.remove("hidden");

            if(beepSound){

                beepSound.currentTime = 0;
                beepSound.play();

            }

        },250);

    });

});
/* ===========================================================
   SCRIPT.JS - BAGIAN 2
   KONFIRMASI • BERHASIL • COUNTDOWN
===========================================================*/

/* ===========================================================
   TOMBOL KEMBALI
===========================================================*/

btnKembali.addEventListener("click", () => {

    confirmModal.classList.add("hidden");

    document
        .querySelectorAll(".hotspot")
        .forEach(item => item.classList.remove("active"));

    sedangMemilih = false;

});


/* ===========================================================
   TOMBOL YA SAYA YAKIN
===========================================================*/

btnYakin.addEventListener("click", () => {

    btnYakin.disabled = true;

    btnKembali.disabled = true;

    confirmModal.classList.add("hidden");

    const loading = document.getElementById("loading");

    loading.classList.remove("hidden");

    if(beepSound){

        beepSound.currentTime = 0;
        beepSound.play();

    }

    setTimeout(() => {

        loading.classList.add("hidden");

        tampilBerhasil();

    },1500);

});


/* ===========================================================
   HALAMAN BERHASIL
===========================================================*/

function tampilBerhasil(){

    successPage.classList.remove("hidden");

    successPage.classList.add("show");

    if(successSound){

        successSound.currentTime = 0;
        successSound.play();

    }

    mulaiCountdown();

}


/* ===========================================================
   COUNTDOWN
===========================================================*/

function mulaiCountdown(){

    let hitung = 5;

    timer.innerHTML = hitung;

    const interval = setInterval(() => {

        hitung--;

        timer.innerHTML = hitung;

        if(hitung <= 0){

            clearInterval(interval);

            kembaliKeAwal();

        }

    },1000);

}


/* ===========================================================
   RESET HALAMAN
===========================================================*/

function kembaliKeAwal(){

    successPage.classList.add("hidden");

    btnYakin.disabled = false;

    btnKembali.disabled = false;

    document
        .querySelectorAll(".hotspot")
        .forEach(item => item.classList.remove("active"));

    sedangMemilih = false;

    pilihanNomor = "";
    pilihanNama = "";

}


/* ===========================================================
   ANTI DOUBLE CLICK
===========================================================*/

document.addEventListener("dblclick",(e)=>{

    e.preventDefault();

});


/* ===========================================================
   NONAKTIFKAN DRAG GAMBAR
===========================================================*/

document.querySelectorAll("img").forEach(img=>{

    img.draggable = false;

});
/* ===========================================================
   SCRIPT.JS - BAGIAN 3
   FULLSCREEN • RIPPLE • FLASH • LOADING BAR
===========================================================*/

/* ===========================================================
   FULLSCREEN
===========================================================*/

const fullscreenBtn = document.getElementById("fullscreenBtn");

if(fullscreenBtn){

    fullscreenBtn.addEventListener("click", toggleFullscreen);

}

function toggleFullscreen(){

    if(!document.fullscreenElement){

        document.documentElement.requestFullscreen();

        fullscreenBtn.innerHTML = "🡼 KELUAR FULLSCREEN";

    }else{

        document.exitFullscreen();

        fullscreenBtn.innerHTML = "⛶ FULLSCREEN";

    }

}

/* ===========================================================
   RIPPLE EFFECT
===========================================================*/

const rippleContainer =
document.getElementById("rippleContainer");

document.addEventListener("click",(e)=>{

    const ripple =
    document.createElement("span");

    ripple.className="ripple";

    ripple.style.left =
    e.clientX + "px";

    ripple.style.top =
    e.clientY + "px";

    ripple.style.width="20px";
    ripple.style.height="20px";

    rippleContainer.appendChild(ripple);

    setTimeout(()=>{

        ripple.remove();

    },600);

});

/* ===========================================================
   FLASH SCREEN
===========================================================*/

const flash =
document.getElementById("flashScreen");

function flashScreen(){

    flash.style.opacity="1";

    setTimeout(()=>{

        flash.style.transition="opacity .5s";

        flash.style.opacity="0";

    },80);

}

/* ===========================================================
   LOADING BAR
===========================================================*/

const loadingProgress =
document.getElementById("loadingProgress");

function loadingBar(){

    loadingProgress.style.width="0%";

    let persen = 0;

    const proses = setInterval(()=>{

        persen += 5;

        loadingProgress.style.width =
        persen + "%";

        if(persen>=100){

            clearInterval(proses);

        }

    },50);

}

/* ===========================================================
   TOAST
===========================================================*/

const toast =
document.getElementById("toast");

function showToast(text){

    toast.classList.remove("hidden");

    toast.classList.add("show");

    toast.querySelector(".toast-text").innerHTML=text;

    setTimeout(()=>{

        toast.classList.add("hidden");

        toast.classList.remove("show");

    },2500);

}

/* ===========================================================
   UPDATE FUNGSI BERHASIL
===========================================================*/

const tampilBerhasilAsli = tampilBerhasil;

tampilBerhasil = function(){

    flashScreen();

    loadingBar();

    showToast("Pilihan berhasil diproses");

    tampilBerhasilAsli();

};

/* ===========================================================
   ESC FULLSCREEN
===========================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        if(fullscreenBtn){

            fullscreenBtn.innerHTML="⛶ FULLSCREEN";

        }

    }

});

/* ===========================================================
   NONAKTIFKAN KLIK KANAN
===========================================================*/

document.addEventListener("contextmenu",(e)=>{

    e.preventDefault();

});

/* ===========================================================
   NONAKTIFKAN SELECT TEXT
===========================================================*/

document.addEventListener("selectstart",(e)=>{

    e.preventDefault();

});
/* ===========================================================
   SCRIPT.JS - BAGIAN 4
   FINISHING
===========================================================*/

/* ===============================
   VOLUME AUDIO
================================*/

[clickSound, beepSound, successSound].forEach(audio => {
    if(audio){
        audio.volume = 0.7;
    }
});

/* ===============================
   AUTO FULLSCREEN
================================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        if(document.fullscreenEnabled){

            document.documentElement.requestFullscreen()
            .catch(()=>{});

        }

    },800);

});

/* ===============================
   KLIK SUKSES
================================*/

successPage.addEventListener("click", () => {

    kembaliKeAwal();

});

/* ===============================
   RESET SEMUA
================================*/

function resetSemua(){

    pilihanNomor = "";
    pilihanNama = "";

    sedangMemilih = false;

    confirmModal.classList.add("hidden");
    successPage.classList.add("hidden");

    btnYakin.disabled = false;
    btnKembali.disabled = false;

    document.querySelectorAll(".hotspot")
    .forEach(item=>{

        item.classList.remove("active");
        item.classList.remove("disable-click");

    });

}

/* ===============================
   UPDATE RESET
================================*/

const resetAsli = kembaliKeAwal;

kembaliKeAwal = function(){

    resetAsli();

    resetSemua();

};

/* ===============================
   ANTI DOUBLE TAP
================================*/

let lastTap = 0;

document.addEventListener("touchend",(e)=>{

    const now = Date.now();

    if(now-lastTap<400){

        e.preventDefault();

    }

    lastTap = now;

},{passive:false});

/* ===============================
   ENTER = YA
================================*/

document.addEventListener("keydown",(e)=>{

    if(confirmModal.classList.contains("hidden"))
        return;

    if(e.key==="Enter"){

        btnYakin.click();

    }

});

/* ===============================
   ESC = KEMBALI
================================*/

document.addEventListener("keydown",(e)=>{

    if(confirmModal.classList.contains("hidden"))
        return;

    if(e.key==="Escape"){

        btnKembali.click();

    }

});

/* ===============================
   ANIMASI HOTSPOT
================================*/

document.querySelectorAll(".hotspot").forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        item.style.transform="scale(1.03)";

    });

    item.addEventListener("mouseleave",()=>{

        item.style.transform="scale(1)";

    });

});

/* ===============================
   PRELOAD AUDIO
================================*/

window.addEventListener("load",()=>{

    [clickSound,beepSound,successSound].forEach(a=>{

        if(a){

            a.load();

        }

    });

});

/* ===============================
   STATUS
================================*/

console.log("===================================");
console.log(" SIMULASI E-VOTING PILKADES");
console.log(" Desa Ridogalih");
console.log(" Version 1.0");
console.log(" Ready");
console.log("===================================");

/* ===========================================================
   END
===========================================================*/