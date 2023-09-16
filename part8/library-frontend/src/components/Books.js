import { useQuery } from "@apollo/client"
import { useState, useEffect } from "react"
import { useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from "../queries"
export const updateCache = (client, query, addedPerson, setBooks) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
  client.cache.updateQuery({
    query: ALL_BOOKS,
    variables: {
      filters: [],
    },
  }, ({ allBooks }) => {
    return {
      allBooks: allBooks.concat(addedPerson),
    }
  })
  const result = client.readQuery({
    query: ALL_BOOKS,
    variables: {
      filters: [],
    },
  });
  setBooks(result.allBooks)
}

const Books = (props) => {
  const [filter, setFilter] = useState([]);
  const [books, setBooks] = useState([])
  const result = useQuery(ALL_BOOKS, {
    variables: { filters: filter }, // Utiliza la variable "genre" en lugar de "$filter"
    onCompleted: (response) => {
      setBooks(response.allBooks)
    }
  });

  useSubscription(BOOK_ADDED, {
    onData: async ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      if (addedBook) {
        alert(`A new Book ${addedBook.title} was added`);
        updateCache(client, ALL_BOOKS, addedBook, setBooks);
      }
    },
  });
  useEffect(() => {
    result.refetch({ filters: filter });
  }, [filter]);
  if (result.loading) {
    return <div>loading...</div>
  }
  const allGenres = result.data.allBooks.reduce((genres, book) => {
    book.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    });
    return genres;
  }, []);

  const handleSetFilter = (genre) => {
    if (!filter.includes(genre)) {
      const newFilter = [...filter, genre];
      setFilter(newFilter);
    }
  }

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
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres.map((genre) => (
        <button
          key={genre}
          onClick={() => handleSetFilter(genre)}
          disabled={filter.includes(genre)}
        >
          {genre}
        </button>
      ))}
      <button onClick={() => setFilter([])}>Clear Filters</button>
    </div>
  )
}

export default Books
