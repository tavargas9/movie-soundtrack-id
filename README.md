# Movie Soundtrack Identifier
![badge](https://img.shields.io/badge/MIT-License-blue.svg) ![Awesome](https://awesome.re/badge.svg)

A web application that helps users find and listen to the soundtrack to their favorite movies.

## Table of Contents

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

## User Story:

```
AS A user
I WANT to see the soundtracks that a movie uses or vise versa
SO THAT I can identify and enjoy the music or vise versa
```

## Acceptance Criteria

```
GIVEN a movie/soundtrack dashboard with search results
WHEN i load the page a Home page
THEN i am presented with the website logo and brief description
WHEN i click the dropdown button above
THEN i am presented with a choice of "movie" or "song"
WHEN i search for a movie in the search bar above
THEN i recieve a list of soundtracks associeted with said movie on the left and the movie poster on the right
WHEN i search for a song in the search bar above
THEN i am presented with that song on the left and a list of movies associeted with that song on the right
```

## Usage

To use this application, go to the deployed website [here](https://tavargas9.github.io/movie-soundtrack-id/).

![Screenshot](./assets/images/Screenshot%202023-10-12%20at%2010.17.08%20PM.png)

- Use the search bar at the top of the screen to search for a movie to see a list of songs on its soundtrack.
- Click on the hamburger menu on top right of the page to see the navigation links. 
- Every time you search for a movie, it will be saved to your search history. Use the "View Search History" link in the dropdown menu to see your previous searches.

![Screenshot](./assets/images/Screenshot%202023-10-12%20at%2010.18.37%20PM.png)

- The image above shows the results page. It includes an image of the movie and a list of songs.
- Click on a song to listen to it via an embedded youtube video.

## Technologies Used

Tailwind CSS, JavaScript, jQuery, YouTube Data API, and IMDB API (via RapidAPI).

## License 

This project is available under the MIT license. See LICENSE in the repository for more info.