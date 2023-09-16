import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select';
import { EDIT_BIRTH, ALL_AUTHORS } from '../queries'

const AuthorsForm = () => {
    const [name, setName] = useState(null)
    const [birth, setBirth] = useState('')

    const [changeNumber, result] = useMutation(EDIT_BIRTH, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            const messages = error.graphQLErrors[0].message
            console.log(messages)
        }
    })
    const authors = useQuery(ALL_AUTHORS)
    if (authors.loading) {
        return <div>loading...</div>
    }

    const submit = (event) => {
        event.preventDefault()
        changeNumber({ variables: { name: name.value, birth: parseInt(birth) } })
        setName('')
        setBirth('')
    }
    const options = authors.data.allAuthors.map(author => ({
        value: author.name,
        label: author.name,
    }));

    return (
        <div>
            <h2>change birth</h2>

            <form onSubmit={submit}>
                <div>
                    <Select
                        defaultValue={name}
                        onChange={setName}
                        options={options}
                    />
                </div>
                <div>
                    birth <input
                        value={birth}
                        onChange={({ target }) => setBirth(target.value)}
                    />
                </div>
                <button type='submit'>change birth</button>
            </form>
        </div>
    )
}

export default AuthorsForm