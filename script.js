document.addEventListener("DOMContentLoaded", () => {
    const screeningSelect = document.getElementById('screeningSelect');
    const movieImage = document.getElementById('movie-image');
    const movieSelect = document.getElementById('movieSelect');

    movieSelect.addEventListener('change', function () {
        const selectedMovie = this.value;

        switch (selectedMovie) {
            case 'squid-game-2':
                movieImage.src = 'squidgames.jpg';
                break;
            case 'the-dark-knight':
                movieImage.src = 'batman.jpg';
                break;
            case 'joker':
                movieImage.src = 'joker.jpg';
                break;
            default:
                movieImage.src = 'placeholder.png';
        }
    });

    screeningSelect.addEventListener('change', function () {
        const selectedOption = this.value.split('|');
        const movieTitle = selectedOption[0];
        const movieTime = selectedOption[1];

        movieSelect.value = movieTitle;

        switch (movieTitle) {
            case 'squid-game-2':
                movieImage.src = 'squidgames.jpg';
                break;
            case 'the-dark-knight':
                movieImage.src = 'batman.jpg';
                break;
            case 'joker':
                movieImage.src = 'joker.jpg';
                break;
            default:
                movieImage.src = 'placeholder.png';
        }

        const dateTime = new Date(movieTime);
        document.getElementById('date').value = dateTime.toISOString().split('T')[0];
        document.getElementById('timeSelect').value = dateTime.toTimeString().split(' ')[0];
    });

    fetch('https://plankton-app-xhkom.ondigitalocean.app/api/screenings')
        .then(response => response.json())
        .then(data => {
            if (!data || !data.data || data.data.length === 0) {
                screeningSelect.innerHTML = '<option value="">Inga visningar tillgängliga för de kommande dagarna.</option>';
                return;
            }

            let screeningsCount = 0;
            data.data.forEach(screening => {
                if (screeningsCount >= 10) return;

                const movieTitle = screening.attributes.movie_title;
                const startTime = new Date(screening.attributes.start_time).toISOString();
                screeningSelect.innerHTML += `<option value="${movieTitle}|${startTime}">${movieTitle} - ${startTime}</option>`;
                screeningsCount++;
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            screeningSelect.innerHTML = '<option value="">Kunde inte hämta visningar. Försök igen senare.</option>';
        });
});
