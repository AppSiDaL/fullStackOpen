import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from '../queries'
import { useState } from "react"
const Recomendations = () => {
    const [books, setBooks] = useState([])
    const user = JSON.parse(localStorage.getItem('phonenumbers-user'))
    console.log({ filters: [user.favoriteGenre] })
    const result = useQuery(ALL_BOOKS, {
        variables: { filters: [user.favoriteGenre] }, // Utiliza la variable "genre" en lugar de "$filter"
        onCompleted: (response) => {
            console.log("response", response)
            setBooks(response.allBooks)
        }
    });
    if (result.loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <h2>recomendations</h2>
            books in your favorite genre <strong>{user.favoriteGenre}</strong>
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
        </div>
    );
}

export default Recomendations;
