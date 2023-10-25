module.exports = {
    MOVIE_SCHEMA_NAME: 'Movies',
    CHARACTER_SCHEMA_NAME: 'Characters',
    CHARACTER_PATH_NAME: "characters",
    GENRE_REQUIRED_MESSAGE: 'Path `genre` is required.',
    GENRES: process.env.GENRES.split(process.env.GENRE_SEPERATOR)
}