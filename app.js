let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
  });
}
let buttons = document.getElementsByTagName('button');
let playButton = buttons[0];
let pauseButton = buttons[1];
let scrollbar = document.querySelectorAll('.controls input')
playButton.addEventListener('click',playVideo);
pauseButton.addEventListener('click',pauseVideo);
function playVideo() {
  player.playVideo();
}

function pauseVideo() {
  player.stopVideo();
}