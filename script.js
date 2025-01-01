console.log("Hey, it's Spotify cloned but userly modified!");

let currentSong = new Audio();


async function getData() {
    let a = await fetch("http://127.0.0.1:8080/songs");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            // Correct the URL by adding 'songs/' after 'spotify clone/'
            let correctedPath = element.href.replace(
                "/spotify%20clone/",
                "/spotify%20clone/songs/"
            );
            songs.push(correctedPath); // Add the corrected URL to the songs array
            
        }
    }
    return songs;
}


const PlayMusic = (track) => {
//   let audio = new Audio( "/spotify%20clone/songs/" + track)
  currentSong.src = "/spotify%20clone/songs/" + track
  currentSong.play()
  currenttrack.src = "images/logos/pause.svg"
  document.querySelector(".songName").innerHTML = track
  document.querySelector(".songDuration").innerHTML = ""
}




async function main() {

    

    let songs = await getData();
    console.log("Fetched songs:", songs);


    let musicli = document.querySelector(".songslist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        let songName = song.split('/').pop();
        musicli.innerHTML += `<li> 
        
        
              <img class="musiclogo invert" src="images/logos/music.svg" alt="musiclogo">
              <div class="songinfo">
                <div> ${songName.replaceAll("%20", " ")}</div>
                <div>Vraj Lakum</div>
              </div>
              <div class="play_pause">
                 <span>Play/Pause</span> 
                <img class="play_pause invert" src="images/logos/play_pause.svg" alt="musicPlay/Pause">
              </div>
            
        
        
         </li>`;
    }

    Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click",element =>{
            console.log(e.querySelector(".songinfo").firstElementChild.innerHTML);
            PlayMusic(e.querySelector(".songinfo").firstElementChild.innerHTML.trim())

        })
        
    });
    
    currenttrack.addEventListener("click",() => {
      if (currentSong.paused) {
        currentSong.play()
        currenttrack.src = "images/logos/pause.svg"
      }
      else{
        currentSong.pause()
        currenttrack.src = "images/logos/play_pause.svg"
      }
    }
    )

//     let playButton = document.querySelector(".play")  
//     playButton.addEventListener("click", () => {
//         if (songs.length > 0) {
//             let audio = new Audio(songs[23]); // Play the first song from the array
//             audio.play()
//                 .then(() => console.log("Playback started successfully"))
//                 .catch((err) => console.error("Playback error:", err));
//         } else {
//             console.log("No songs found.");
//         }
//     });
}

main();


// seekbarjs

// Seekbar 2
var rangetwo = document.getElementById("range-two");
var completionBartwo = document.getElementById("completionBar-two");

// Update dynamically as Seekbar 2 moves
rangetwo.oninput = function () {
    // Update the width of the completion bar
    completionBartwo.style.width = this.value + '%';

    // Update the background gradient
    this.style.background = `linear-gradient(to right,rgb(255, 209, 72) ${this.value}%, rgba(211,211,211,0.4) ${this.value}%)`;
};
