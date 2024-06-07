
export async function callAPI(endpoint, method = 'GET', payload) {

    try {

        const isSendingData = !!payload;
        const isSendingFiles = payload instanceof FormData;

        const response = await fetch(`${import.meta.env.VITE_API_URL_BASE}${endpoint}`, {
            headers: {
                Authorization : localStorage.getItem('AUTH_TOKEN_TJ') ?? undefined,
                ...(isSendingData && !isSendingFiles) && {'Content-Type': 'application/json'}
            },
            method,
            body: isSendingData && !isSendingFiles ? JSON.stringify(payload) : payload
        });

        const result =  await response.json();

        if(!result.ok) throw new Error(result.error);

        return result


    } catch (error) {
        console.log(error);
        return error
    }

}

