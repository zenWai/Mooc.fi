import {useQuery} from "@apollo/client";
import {ALL_BOOKS, ALL_GENRES, ME} from "../queries";
import {useEffect, useState} from "react";

const Books = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState(null);
  const result = useQuery(ALL_BOOKS, { variables: { genre: selectedGenre } });
  const genreResult = useQuery(ALL_GENRES);
  const meResult = useQuery(ME);
  const favoriteGenre = meResult.data ? meResult.data.me.favoriteGenre.toLowerCase() : null;
  useEffect(() => {
    if (result.error) {
      setErrorMessage(result.error.message);
    }
    if (meResult.error) {
      setErrorMessage(meResult.error.message);
    }
  }, [result.error, meResult.error]);

  if (result.loading)  {
    return <div>loading...</div>
  }
  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  const books = result.data.allBooks;
  const genres = genreResult.data.allGenres;
  console.log(books);
  return (
    <div>
      <h2>books</h2>
      <div>
        In genre: {selectedGenre || "All genres"}
      </div>
      <div>
        {favoriteGenre && (
          <button onClick={() => setSelectedGenre(favoriteGenre)}>Recommended</button>
        )}
        <button onClick={() => setSelectedGenre(null)}>All genres</button>
        {genres.map((genre, index) => (
          <button key={index} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>Genre</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
