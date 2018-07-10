let socket  =  io.connect('http://localhost:4000');

let key = 'AIzaSyAyvfAsotATTNWLd0LHwyt_dQZJRvEgAsk';

let buttons = document.getElementsByTagName('button');
let playButton = buttons[1];
let pauseButton = buttons[2];
let slider = document.getElementById('slider');
playButton.addEventListener('click',playVideo);
pauseButton.addEventListener('click',pauseVideo);

let player;
let playing = false;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '500px',
    width: '100%' ,
    videoId: '5_3AzyRJcJE',
    playerVars: {
      autoplay:0,
      rel:0,
      modestbranding:1,
      controls: 0,
      disablekb: 1,
      showInfo:0
  }, 
  });
}


function playVideo() {
  socket.emit('play')
  player.playVideo();
  setInterval(()=>{
    let fraction = player.getCurrentTime()/player.getDuration()*100;
    slider.value = fraction;
  },200)
}

function pauseVideo() {
  player.pauseVideo();
}

function changeTime(e){
  let goTo = player.getDuration() * (e.value / 100);
  console.log(goTo)
  player.seekTo(goTo,true);
  e.value = goTo
  socket.emit('update',goTo);
}

socket.on('update',(data)=>{
  console.log('Recieved data',data)
  slider.value = data;
  player.seekTo(data,true);
})

socket.on('play',()=>{
  player.playVideo();
})