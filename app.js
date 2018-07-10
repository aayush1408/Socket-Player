let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    playerVars: {
      autoplay:0,
      // controls: 0,
      // disablekb: 1,
  }, 
  });
}

let buttons = document.getElementsByTagName('button');
let playButton = buttons[0];
let pauseButton = buttons[1];
let slider = document.getElementById('slider');
playButton.addEventListener('click',playVideo);
pauseButton.addEventListener('click',pauseVideo);
function playVideo() {
  player.playVideo();
}

function pauseVideo() {
  player.pauseVideo();
}

function changeTime(e){
  let goTo = player.getDuration() * (e.value / 100);
  console.log(goTo)
  player.seekTo(goTo,true);
}