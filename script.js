console.log("Hey, it's Spotify cloned but userly modified!");

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

    
    let playButton = document.querySelector(".play")  
    playButton.addEventListener("click", () => {
        if (songs.length > 0) {
            let audio = new Audio(songs[23]); // Play the first song from the array
            audio.play()
                .then(() => console.log("Playback started successfully"))
                .catch((err) => console.error("Playback error:", err));
        } else {
            console.log("No songs found.");
        }
    });
}

main();
