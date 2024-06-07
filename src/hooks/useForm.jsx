import { useState } from 'react'

const useForm = (initialState = {}) => {

    const [formValues, setFormValues] = useState(initialState);


    const handleInputChange = ({ target: { name, value } }) => {

        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleInputCheck = ({ target: { name, value } }) => {

        const array = formValues[name]
        const index = array.indexOf(value)

        setFormValues({
            ...formValues,
            [name]: index != -1 ? array.filter(item => item != value) : [...array, value]
        })

    }

    const handleInputFiles = (name, files) => {
        setFormValues({
            ...formValues,
            [name]: [...files]
        })
    }

    const reset = () => setFormValues(initialState)

    return [formValues, handleInputChange, handleInputCheck, handleInputFiles, reset]
}

export default useForm
