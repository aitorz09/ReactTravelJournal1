import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom"

const ConfirmAccount = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const [message, setMessage] = useState(null)

    useEffect(() => {

        const confirmAccount = async (token) => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL_BASE}/users/confirm?token=${token}`)
                const {ok,message, error} = await response.json()
                if(ok){
                    navigate('/sign-in')
                }
                console.log(message,error);
                setMessage(error)
            } catch (error) {
                console.error(error)
            }
        }

        if (!searchParams.has('token')) {
            console.log('No hay token');
        } else {
            const token = searchParams.get('token')
            confirmAccount(token)
          
        }

    })



    return (
        <div id="main">
            <article className="post" style={{
                maxWidth: "600px",
                margin: "0 auto"
            }}>
                <header>
                    <div className="title">
                        <h2>{message}</h2>
                    </div>

                </header>
                <div>
                    <Link className="button large" to={'/'}>Volver al Home</Link>
                </div>
            </article>
        </div>

    )
}

export default ConfirmAccount
