import {useQuery} from "@apollo/client";
import {ALL_BOOKS} from "../queries";
import {useState} from "react";

const Books = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_BOOKS)

  if (result.loading)  {
    return <div>loading...</div>
  }
  if (result.error) {
    setErrorMessage(result.error.message);
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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
