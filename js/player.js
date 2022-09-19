const wrapper = document.querySelector(".wrapper");
audio = wrapper.querySelector("#audio");
musicName = wrapper.querySelector(".song-details .name");
playPauseBtn = wrapper.querySelector(".play-pause");
prevBtn = wrapper.querySelector("#prev");
nextBtn = wrapper.querySelector("#next");
musicList = wrapper.querySelector(".music-list");
showMoreBtn = wrapper.querySelector("#more-music");
hideMusicBtn = musicList.querySelector("#close");


// load random music on page refresh
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);

window.addEventListener("load", () => {
  loadMusic(musicIndex);
  playingNow();
})

// load music
function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name;
  audio.src = `../audio/${allMusic[indexNumb - 1].src}.ogg`;
}

// play music
function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  audio.play();
}

// pause music
function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  audio.pause();
}

//next music
function nextMusic() {
  musicIndex++;
  // if musicIndex is greater than array length then musicIndex will be 1
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}

//prev music
function prevMusic() {
  musicIndex--;
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}

playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = wrapper.classList.contains("paused");
  isMusicPaused ? pauseMusic() : playMusic();
  playingNow();
});

nextBtn.addEventListener("click", () => {
  nextMusic();
});

prevBtn.addEventListener("click", () => {
  prevMusic();
});

showMoreBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", () => {
  showMoreBtn.click();
});

// create li according to the array length
const ulTag = wrapper.querySelector("ul");
for (let i = 0; i < allMusic.length; i++) {

  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                </div>
                <audio class="${allMusic[i].src}" src="../audio/${allMusic[i].src}.ogg"></audio>
                <span id="${allMusic[i].src}" class="audio-duration"></span>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);
  let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

  liAudioTag.addEventListener("loadeddata", () => {
    let audioDuration = liAudioTag.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    liAudioDuration.innerText = `${totalMin}:${totalSec}`;
    liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}

//play particular song on click
const allLiTags = ulTag.querySelectorAll("li");
function playingNow() {
  for (let j = 0; j < allLiTags.length; j++) {
    let audioTag = allLiTags[j].querySelector(".audio-duration");
    if (allLiTags[j].classList.contains("playing")) {
      allLiTags[j].classList.remove("playing");
      let addDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = addDuration;
    }

    if (allLiTags[j].getAttribute("li-index") == musicIndex) {
      allLiTags[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }
    allLiTags[j].setAttribute("onclick", "clicked(this)");
  }
}

// play song on li click
function clicked(element) {
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex;
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}
