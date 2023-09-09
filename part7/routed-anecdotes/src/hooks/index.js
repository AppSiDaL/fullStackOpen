import { useState } from 'react'


export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }
    const clean = () => {
        setValue("")
    }

    const { ...values } = { type, value, onChange }

    return {
        clean,
        values
    }
}

// modules can have several named exports

export const useAnotherHook = () => {
    // ...
}