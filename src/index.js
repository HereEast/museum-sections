import './sass/index.scss';

console.log('Museum');

// PLAY AND PAUSE
const mainVideo = document.querySelector(".main-video");
const mainPlayButton = document.querySelector(".play__button_big");
const controlsPlayButton = document.querySelector(".play__button");
const playSVG = document.querySelector(".play-ic__svg");
const pauseSVG = document.querySelector(".pause-ic__svg");

mainPlayButton.addEventListener("click", toggleMainVideo);
mainVideo.addEventListener("click", toggleMainVideo);
controlsPlayButton.addEventListener("click", toggleMainVideo);

function toggleMainVideo() {
    if(mainVideo.paused) {
        pausePlayingSmallVideo();

        mainPlayButton.style.display = "none";
        playSVG.style.display = "none";
        pauseSVG.style.display = "block";
        mainVideo.play();
    } else {
        mainVideo.pause();
        mainPlayButton.style.display = "block";
        pauseSVG.style.display = "none";
        playSVG.style.display = "block";
    }
}

// FULL SCREEN
const fullscreen = document.querySelector('.fullscreen__button');

fullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        mainVideo.requestFullscreen();
    } else {
        mainVideo.exitFullscreen();
    }
});


// VOLUME
const volume = document.querySelector('#volume__progress');
const volumeBtn = document.querySelector('.volume__button');
const volumeIcon = document.querySelector('.volume-ic__svg');
const noVolumeIcon = document.querySelector('.novolume-ic__svg');

volume.addEventListener("input", changeVolume);
volumeBtn.addEventListener("click", toggleVolume);

let currentVolume;

function changeVolume() {
    let v = volume.value;
    mainVideo.volume = v / 100;

    if(mainVideo.volume === 0) {
        volumeIcon.style.display="none";
        noVolumeIcon.style.display="block";
    } else {
        volumeIcon.style.display="block";
        noVolumeIcon.style.display="none";
    }
    changeVolumeProgress(v);
    currentVolume = volume.value;
}

function toggleVolume() {

    if(volume.value > 0) {
        volume.value = 0;
        mainVideo.volume = 0;
        volumeIcon.style.display="none";
        noVolumeIcon.style.display="block";
        changeVolumeProgress(volume.value);
    } else {
        volume.value = currentVolume;
        mainVideo.volume = currentVolume / 100;
        noVolumeIcon.style.display="none";
        volumeIcon.style.display="block"; 
        changeVolumeProgress(volume.value);
    }
}


// PROGRESS VOLUME
function changeVolumeProgress(v) {
    volume.style.background = `linear-gradient(to right, #710707 ${v}%, #710707 ${v}%, #C4C4C4 0%, #C4C4C4 100%)`;
}

// PROGRESS VIDEO
const videoProgress = document.querySelector("#video__progress");
mainVideo.addEventListener("timeupdate", changeVideoProgress);
videoProgress.addEventListener("input", rewindVideo);

function changeVideoProgress() {
    let d = mainVideo.duration;
    let c = mainVideo.currentTime;
    videoProgress.value = c / d * 100;
    videoProgress.style.background = `linear-gradient(to right, #710707 ${videoProgress.value}%, #710707 ${videoProgress.value}%, #C4C4C4 0%, #C4C4C4 100%)`;
}

function rewindVideo() {
    mainVideo.currentTime = mainVideo.duration * videoProgress.value / 100;
    changeVideoProgress();
}


////////////////////////////////
// VIDEO GALLERY ///////////////
////////////////////////////////

const videos = document.querySelectorAll(".slider-video");
const buttons = document.querySelectorAll(".play-button__gallery");

const playButtons = Array.from(buttons);
const smallVideos = Array.from(videos);

playButtons.forEach((btn) => {
    btn.addEventListener("click", playGalleryVideo);
})

smallVideos.forEach((video) => {
    video.addEventListener("click", pausePlayingVideo);
})

function playGalleryVideo(event) {
    mainVideo.pause();
    
    let targetBtn = event.target.closest(".play-button__gallery");
    let n = targetBtn.getAttribute("data-btn");

    smallVideos.forEach((v) => {
        if(!v.paused) {
            v.pause();
            let n = v.getAttribute("data-video");
            playButtons[n].style.display = "block";
        }
    })

    smallVideos[n].play();
    targetBtn.style.display = "none";
}

function pausePlayingVideo(event) {
    let targetVideo = event.target;
    let n = targetVideo.getAttribute("data-video");
    targetVideo.pause();
    playButtons[n].style.display = "block";
}

function pausePlayingSmallVideo() {
    smallVideos.forEach((vid) => {
        vid.pause();

        playButtons.forEach((btn) => {
            btn.style.display = "block";
        })
    })
}

