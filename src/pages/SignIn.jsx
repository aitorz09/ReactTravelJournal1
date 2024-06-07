import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import useAuth from "../hooks/useAuth.jsx";
import useForm from "../hooks/useForm.jsx";
import { useEffect } from "react";

const SignIn = () => {

    const { signIn, currentUser } = useAuth()

    const navigate = useNavigate()

    const [formValues, handleInputChange, , , reset] = useForm({
        email: "",
        password: ""
    });

    const { email, password } = formValues;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${import.meta.env.VITE_API_URL_BASE}/auth/sign-in`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formValues),

        })
        const { ok, token, error } = await response.json();

        if (!ok) {
            console.error(error);
            toast.error(error)
            reset()
            return
        }

        signIn(token)

        navigate('/')

    }

    useEffect(() => {

        currentUser && navigate('/')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])



    return (
        <div id="main">
            <article className="post" style={{ maxWidth: "600px", width: "100%", margin: "0 auto" }}>
                <header>
                    <div className="title">
                        <h2>
                            Iniciar sesión
                        </h2>
                    </div>
                </header>
                <form action="" noValidate onSubmit={handleSubmit}>
                    <div className="box-input">
                        <label htmlFor="">Email</label>
                        <input type="email" name="email" value={email} id="email" onChange={handleInputChange} />
                    </div>
                    <div className="box-input">
                        <label htmlFor="">Contraseña</label>
                        <input type="password" name="password" value={password} id="password" onChange={handleInputChange} />
                        <a href="">Olvidé mi contraseña</a>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <button className="button large">Ingresar</button>
                    </div>

                </form>

            </article>
        </div>
    )
}

export default SignIn
