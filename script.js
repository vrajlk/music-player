console.log("Hey, it's Spotify cloned but userly modified!");
let songs;
let currfolder;
let currentSong = new Audio();
let song;
// time converting function from seconds to minutes
function timeconverter(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(remainingSeconds).padStart(2, '0')

  return `${formattedMinutes}:${formattedSeconds}`
}

// async function for fetching the songs from localDirectory by enabling the node server in spotify clone folder outside the songs folder

async function getData(folder) {
  currfolder = folder;
  let a = await fetch(`/songs/${folder}/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let = songs = [];

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      // Correct the URL by adding 'songs/' after 'spotify clone/'
      let correctedPath = `/songs/${folder}/${element.href.split('/').pop()}`;
      console.log(correctedPath);

      songs.push(correctedPath); // Add the corrected URL to the songs array
     
    


    }
  }


  let musicli = document.querySelector(".songslist").getElementsByTagName("ul")[0]
  musicli.innerHTML = ""
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
  // library songs only name displaying and removing space

  Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element => {
     
      PlayMusic(e.querySelector(".songinfo").firstElementChild.innerHTML.trim())

    })

  });
  return songs;


}


const PlayMusic = (track) => {
  //   let audio = new Audio( "/spotify%20clone/songs/" + track)
  currentSong.src = `/songs/${currfolder}/${track}`;



  currentSong.play()
  currenttrack.src = "images/logos/pause.svg"
  document.querySelector(".songName").innerHTML = track
  document.querySelector(".songDuration").innerHTML = "00:00/00:00"
}


async function main() {

  
  await getData("Karan Aujla");

  

  // displaying all the songs fetched from the local directory in the form of list
  
  // play and pause function in playbar and logo change dynamically

  currenttrack.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play()
      currenttrack.src = "images/logos/pause.svg"
    }
    else {
      currentSong.pause()
      currenttrack.src = "images/logos/play_pause.svg"
    }
  }
  )

  // timeupdateliveinplaybar

  // Update the time in the playbar dynamically
  currentSong.addEventListener("timeupdate", () => {
    

    // Update the song duration display
    document.querySelector(".songDuration").innerHTML = `${timeconverter(currentSong.currentTime)}/${timeconverter(currentSong.duration)}`;

    // Update the seek bar position dynamically
    if (currentSong.duration) {
      const progressPercent = (currentSong.currentTime / currentSong.duration) * 100;
      rangetwo.value = progressPercent;
      completionBartwo.style.width = progressPercent + '%';
      rangetwo.style.background = `linear-gradient(to right, rgb(255, 209, 72) ${progressPercent}%, rgba(211,211,211,0.4) ${progressPercent}%)`;

    }
  });

  // event listner for opening left menu

  document.querySelector(".leftmenu").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0"
  }
  )
  // event listner for closing left menu 

  document.querySelector(".leftclose").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%"
  }
  )


 

  // Event listener for the forward button
  document.querySelector(".forward").addEventListener("click", () => {
   

    // Decode current song name to handle %20
    let currentSongName = decodeURIComponent(currentSong.src.split("/").pop());

    // Find the index of the current song
    let index = songs.findIndex(song => decodeURIComponent(song.split("/").pop()) === currentSongName);

    if (index === -1) {
      console.log("Current song not found in the songs array.");
      return;
    }

    if ((index + 1) < songs.length) { // Check if the next song exists
      PlayMusic(decodeURIComponent(songs[index + 1].split("/").pop())); // Play the next song
    } else {
      console.log("No more songs to play.");
    }


   
  });



  // Event listener for the backward button
  document.querySelector(".backward").addEventListener("click", () => {
  
    // Decode current song name to handle %20
    let currentSongName = decodeURIComponent(currentSong.src.split("/").pop());

    // Find the index of the current song
    let index = songs.findIndex(song => decodeURIComponent(song.split("/").pop()) === currentSongName);

    if (index === -1) {
      console.log("Current song not found in the songs array.");
      return;
    }

    if ((index - 1) >= 0) { // Check if the previous song exists
      PlayMusic(decodeURIComponent(songs[index - 1].split("/").pop())); // Play the previous song
    } else {
      console.log("No previous songs to play.");
    }

    
  });

  const volumeSlider = document.querySelector(".volume-slider");
  const audioElement = currentSong; // Assuming you're using the `currentSong` Audio element

  volumeSlider.addEventListener("input", (e) => {
    const volume = e.target.value; // Get the slider value
    audioElement.volume = volume; // Set the audio volume
  });

  document.addEventListener("DOMContentLoaded", () => {
    const volumeButton = document.querySelector(".volume-button");
    const volumeSlider = document.querySelector(".volume-slider");

    // Toggle the visibility of the slider on mobile
    volumeButton.addEventListener("click", () => {
      if (window.innerWidth <= 768) { // For mobile and tablet
        const isVisible = volumeSlider.style.visibility === "visible";
        volumeSlider.style.visibility = isVisible ? "hidden" : "visible";
        volumeSlider.style.opacity = isVisible ? "0" : "1";
      }
    });
  });

}
Array.from(document.getElementsByClassName("card")).forEach(e => {
  e.addEventListener("click", async item => {
    songs = await getData(`${item.currentTarget.dataset.folder}`)
  })

}
)

// seekbarjs

// Seekbar 2
var rangetwo = document.getElementById("range-two");
var completionBartwo = document.getElementById("completionBar-two");




// Update dynamically as Seekbar moves
rangetwo.oninput = function () {

  if (isFinite(currentSong.duration)) {
  const seekTime = (this.value / 100) * currentSong.duration;

  // Seek the song to the new time
  currentSong.currentTime = seekTime;

  // Update the width of the completion bar
  completionBartwo.style.width = this.value + '%';

  // Update the background gradient
  this.style.background = `linear-gradient(to right, rgb(255, 209, 72) ${this.value}%, rgba(211,211,211,0.4) ${this.value}%)`;

}

  else {
    console.warn("Audio duration is not yet available.");

}
};
main();

