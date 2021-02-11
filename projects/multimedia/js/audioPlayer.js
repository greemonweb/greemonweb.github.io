"use strict";
var song;
var songDir;
var songName;
var play = document.getElementById("play-pause");
var playC = document.getElementById("play-pause-controler");
var previous = document.getElementById("previous-controler");
var next = document.getElementById("next-controler");
var more = document.getElementById("moreVolume")
var less = document.getElementById("lessVolume")
var range = document.getElementById("range");
var songsList = [{
  "num": 0,
  "name": "Strech_Your_Face",
  "format": ".webm"
}, {
  "num": 1,
  "name": "Systematic",
  "format": ".webm"

}, {
  "num": 2,
  "name": "Kool_Aid",
  "format": ".webm"

}, {
  "num": 3,
  "name": "Passports",
  "format": ".webm"

}, {
  "num": 4,
  "name": "You_Came_To_Party",
  "format": ".webm"
}, {
  "num": 5,
  "name": "Blue_Flowers",
  "format": ".webm"
}, {
  "num": 6,
  "name": "Fun_House",
  "format": ".webm"
}, {
  "num": 7,
  "name": "Phantom",
  "format": ".webm"
}, {
  "num": 8,
  "name": "The_Mule",
  "format": ".webm"
}, {
  "num": 9,
  "name": "Nobody_Speak",
  "format": ".webm"
}, {
  "num": 10,
  "name": "Dont_Stop",
  "format": ".webm"
}, {
  "num": 11,
  "name": "On_My_Own",
  "format": ".webm"
}, {
  "num": 12,
  "name": "Problem_Child",
  "format": ".webm"
}, {
  "num": 13,
  "name": "Blown",
  "format": ".webm"
}, {
  "num": 14,
  "name": "Walking_On_Sunshine",
  "format": ".webm"
}];
var lastSong = songsList[songsList.length - 1]
window.addEventListener("load", () => {
  song = document.getElementById("audioSong");
  songDir = song.attributes.src.value.split("/");
  songName = songDir[2].split(".")[0];
  song.volume = 0.5;
  range.style.height = "50px"
  range.style.marginTop = "50px"
  song.addEventListener("timeupdate", songTime);
  play.addEventListener("click", playSong);
  playC.addEventListener("click", playSong);
  previous.addEventListener("click", previousSong)
  next.addEventListener("click", nextSong);
  more.addEventListener("click", upVolume)
  less.addEventListener("click", downVolume)
});
var songTime = () => {
  let currTime = song.currentTime;
  let totalTime = song.duration;
  if (currTime == totalTime) {
    nextSong();
  } else {
    let timeProg = document.getElementById("progSong");
    let actualProg = (100 * currTime) / totalTime;
    timeProg.value = actualProg;

  }
}

var playSong = () => {
  if (song.paused) {
    document.getElementById("img-play-pause").src = "./images/pauseIcon.png"
    document.getElementById("img-play").src = "./images/pauseIcon.png"
    let normalName = songName.replace(/_/g, ' ');
    document.getElementById("currentSong").innerHTML = normalName;
    song.play();
  } else {
    document.getElementById("img-play-pause").src = "./images/playIcon.png"
    document.getElementById("img-play").src = "./images/playIcon.png"
    song.pause();
  }
};

var nextSong = () => {
  songsList.forEach(element => {
    if (element.num == 0) {
      element.num = songsList.length
    }
    element.num = element.num - 1
  });
  songsList.sort(function (a, b) {
    return a.num - b.num
  })
  songName = songsList[0].name;
  song.src = `./audio/${songsList[0].name}${songsList[0].format}`
  console.log(songName);
  song.pause()
  playSong()
};

var previousSong = () => {
  songsList.forEach(element => {
    if (element.num == (songsList.length - 1)) {
      element.num = -1
    }
    element.num = element.num + 1
  });
  songsList.sort(function (a, b) {
    return a.num - b.num
  })
  songName = songsList[0].name;
  song.src = `./audio/${songName}${songsList[0].format}`
  song.pause();
  playSong()
};

var upVolume = () => {
  if (song.volume < 1) {
    song.volume += 0.1;
    range.style.height = `${song.volume*100}px`;
    range.style.marginTop = `${100-song.volume*100}px`
  }
}

var downVolume = () => {
  if (song.volume > 0) {
    song.volume -= 0.1
    range.style.height = `${song.volume*100}px`;
    range.style.marginTop = `${100-song.volume*100}px`
  }
}