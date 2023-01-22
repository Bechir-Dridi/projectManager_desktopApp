import { useState, useEffect } from 'react'

const useFetch = (url) => {
    const [dbData, setDbData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        fetch(url)//"http://localhost:8000/projects"
            // .then(res => {
            //   if (!res.ok) {
            //     throw Error("error: could not fetch data from the resource")
            //   }
            // })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setDbData(data)
                setIsLoading(false)
                setError(null)
                console.log("connected to local db", data)
            })
            .catch(err => {
                setIsLoading(false)
                setError(err.message)
            })
    }, [url])



    return { dbData, isLoading, error }
}

export default useFetch;