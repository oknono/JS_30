// Select elements in page
const player = document.querySelector('.player');
const video = player.querySelector('video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const expand = player.querySelector('.screen__size');

// Functions

function togglePlay(){ 
	const play = video.paused ? 'play' : 'pause'; 
	video[play]();
}
function toggleButton(){ 
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.innerHTML = icon;
}
	
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value;
}

function handleProgress(){
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
	const scrubTime =(e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

var smallSize = true;

function changeSize(){
    const icon = smallSize ? "+" : "-";
	expand.innerHTML = icon;
}

// Event Handlers
// play/pause video
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
// update ui based on video playing or not
video.addEventListener('play', toggleButton);
video.addEventListener('pause', toggleButton);
// manipulate video - skip, change time, volume
skipButtons.forEach( button => button.addEventListener('click', skip));
ranges.forEach( range => range.addEventListener('change', handleRangeUpdate));
// Update progress bar
video.addEventListener('timeupdate', handleProgress);
// manipulate progress bar
let mouseDown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown  && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

// change size
expand.addEventListener('click', changeSize);



