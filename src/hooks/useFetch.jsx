import { useEffect, useState } from "react"

const useFetch = (endpoint, method = 'GET', body) => {

    const [data, setData] = useState({});


    useEffect(() => {

        const getData = async () => {

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL_BASE}${endpoint}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method,
                    body: body ? JSON.stringify(body) : null
                });

                const result = await response.json();

                setData(result)

            } catch (error) {
                console.log(error);
            }

        }

        getData(endpoint)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return data
}

export default useFetch
