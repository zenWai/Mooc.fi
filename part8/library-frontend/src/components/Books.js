import {useQuery} from "@apollo/client";
import {ALL_BOOKS} from "../queries";
import {useEffect, useState} from "react";

const Books = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.error) {
      setErrorMessage(result.error.message);
    }
  }, [result.error]);

  if (result.loading)  {
    return <div>loading...</div>
  }
  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  const books = result.data.allBooks;
  console.log(books);
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
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
