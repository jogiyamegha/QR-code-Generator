document.getElementById('searchBtn').addEventListener('click', () => {
    const songName = document.getElementById('songInput').value;
    if (songName) {
        fetchSongDetails(songName);
    }
});

function fetchSongDetails(songName) {
    const apiUrl = `https://api.deezer.com/search?q=${songName}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => addSongToPlaylist(data.data[0]))
        .catch(error => console.error('Error fetching song details:', error));
}

function addSongToPlaylist(song) {
    const playlist = document.getElementById('playlist');

    const songElement = document.createElement('li');
    songElement.classList.add('song');

    songElement.innerHTML = `
        <img src="${song.album.cover_small}" alt="${song.title}">
        <div class="song-info">
            <p>${song.title} by ${song.artist.name}</p>
            <audio controls src="${song.preview}"></audio>
        </div>
        <button onclick="removeSong(this)">Remove</button>
    `;

    playlist.appendChild(songElement);
}

function removeSong(button) {
    const songElement = button.parentElement;
    songElement.remove();
}
