
const songs = [
    { title: "Song 1", artist: "Artist A", src: "song1.mp3" },
    { title: "Song 2", artist: "Artist B", src: "song2.mp3" }
];

let index = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");

// 1. Gaana load karne ka simple tarika
function load(i) {
    index = (i + songs.length) % songs.length; // Loop handle karne ke liye
    title.innerText = songs[index].title;
    artist.innerText = songs[index].artist;
    audio.src = songs[index].src;
}
load(index);

// 2. Play / Pause Button
playBtn.onclick = () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
};

// 3. Next, Previous aur Autoplay (Teeno ek hi logic se)
document.getElementById("next").onclick = () => { load(index + 1); audio.play(); playBtn.innerHTML = '<i class="fas fa-pause"></i>'; };
document.getElementById("prev").onclick = () => { load(index - 1); audio.play(); playBtn.innerHTML = '<i class="fas fa-pause"></i>'; };
audio.onended = () => { load(index + 1); audio.play(); }; // Autoplay

// 4. Progress Bar (Chalna aur Drag karna)
const prog = document.getElementById("progress");
audio.ontimeupdate = () => { if(audio.duration) prog.value = (audio.currentTime / audio.duration) * 100; };
prog.oninput = () => audio.currentTime = (prog.value / 100) * audio.duration;

// 5. Volume Control
document.getElementById("volume").oninput = (e) => audio.volume = e.target.value;