let socket  =  io.connect('http://localhost:4000');

// Extracted buttons
let buttons = document.getElementsByTagName('button');
let playButton = buttons[0];
let pauseButton = buttons[1];

// slider
let slider = document.getElementById('slider');

// pause and play event listener added
playButton.addEventListener('click',playVideo);
pauseButton.addEventListener('click',pauseVideo);

let player;
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


// play event added
function playVideo() {
  socket.emit('play')
  player.playVideo();
  setInterval(()=>{
    let fraction = player.getCurrentTime()/player.getDuration()*100;
    slider.value = fraction;
    socket.emit('slider',slider.value);
  },200)
}

// pause event handled
function pauseVideo() {
  socket.emit('pause')
  player.pauseVideo();
}

// seeker handled
function changeTime(e){
  let goTo = player.getDuration() * (e.value / 100);
  console.log(goTo);
  player.seekTo(goTo,true);
  e.value = goTo
  socket.emit('update',goTo);
}

// socket events handled

socket.on('update',(data)=>{
  console.log('Recieved data',data)
  slider.value = data;
  player.seekTo(data,true);
})

socket.on('play',()=>{
  player.playVideo();
})

socket.on('pause',()=>{
  player.pauseVideo();
})

socket.on('slider',(data)=>{
  slider.value = data;
})
