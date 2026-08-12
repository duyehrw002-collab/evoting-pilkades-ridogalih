(() => {
"use strict";

/*
  AUDIO:
  Simpan suara milik Anda di folder "sound".
  Nama yang disarankan:
    sound/click.mp3   = bunyi saat foto calon diklik
    sound/beep.mp3    = bunyi saat tombol Pilih Kandidat Ini diklik
    sound/success.mp3 = bunyi setelah suara berhasil tersimpan

  Jika nama file Anda berbeda, cukup ubah 3 nama file di bawah.
*/
const SOUND = {
  click: "sound/click.mp3",
  beep: "sound/beep.mp3",
  success: "sound/success.mp3"
};

const audio = {
  click: new Audio(SOUND.click),
  beep: new Audio(SOUND.beep),
  success: new Audio(SOUND.success)
};
Object.values(audio).forEach(a => { a.preload = "auto"; a.volume = 1.0; });

function playSound(name){
  const a = audio[name];
  if(!a) return;
  try {
    a.currentTime = 0;
    const p = a.play();
    if(p) p.catch(()=>{});
  } catch(e){}
}

const candidates=document.querySelectorAll(".candidate-card");
const voteButton=document.getElementById("voteButton");
const confirmOverlay=document.getElementById("confirmOverlay");
const selectedImage=document.getElementById("selectedImage");
const selectedName=document.getElementById("selectedName");
const cancelButton=document.getElementById("cancelButton");
const confirmButton=document.getElementById("confirmButton");
const successOverlay=document.getElementById("successOverlay");
let selectedCandidate=null;

candidates.forEach(card=>{
  card.addEventListener("click",()=>{
    candidates.forEach(item=>item.classList.remove("selected"));
    card.classList.add("selected");

    // KLIK FOTO/CALON -> suara CLICK
    playSound("click");

    const image=card.querySelector("img");
    selectedCandidate={
      number:card.dataset.number,
      name:card.dataset.name,
      image:image.currentSrc||image.src
    };
  });
});

voteButton.addEventListener("click",()=>{
  if(!selectedCandidate){
    alert("Silakan pilih salah satu kandidat terlebih dahulu.");
    return;
  }

  // PILIH KANDIDAT INI -> suara BEEP
  playSound("beep");

  selectedImage.src=selectedCandidate.image;
  selectedImage.alt=selectedCandidate.name;
  selectedName.textContent=selectedCandidate.name;
  confirmOverlay.classList.remove("hidden");
});

cancelButton.addEventListener("click",()=>{
  confirmOverlay.classList.add("hidden");
});

confirmButton.addEventListener("click",()=>{
  if(!selectedCandidate) return;

  const key="simulasi_pilkades_ridogalih_2026";
  const results=JSON.parse(localStorage.getItem(key)||"{}");
  results[selectedCandidate.number]=(Number(results[selectedCandidate.number])||0)+1;
  localStorage.setItem(key,JSON.stringify(results));

  confirmOverlay.classList.add("hidden");

  // SUARA BERHASIL TERSIMPAN -> suara SUCCESS
  playSound("success");
  successOverlay.classList.remove("hidden");
});

confirmOverlay.addEventListener("click",e=>{
  if(e.target===confirmOverlay) confirmOverlay.classList.add("hidden");
});

successOverlay.addEventListener("click",()=>{
  successOverlay.classList.add("hidden");
  candidates.forEach(item=>item.classList.remove("selected"));
  selectedCandidate=null;
});

document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    confirmOverlay.classList.add("hidden");
    successOverlay.classList.add("hidden");
  }
});
})();