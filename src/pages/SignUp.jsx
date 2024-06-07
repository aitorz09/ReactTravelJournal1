import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm.jsx"

const SignUp = () => {

    const navigate = useNavigate()
    const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}/;

    const [formValues, handleInputChange] = useForm({
        username: "",
        email: "",
        password: "",
        password2: ""
    })

    const { username, email, password, password2 } = formValues;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([username, email, password, password2].includes("")) {
            console.log('Todos los campos son obligatorios');
            return
        }

        if (!exRegEmail.test(email)) {
            console.log("El email tiene un formato inválido");
            return
        }

        if (password !== password2) {
            console.log("La verificación de las contraseñas no coinciden");
            return
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL_BASE}/auth/sign-up`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formValues),

        })
        const { ok, message, error } = await response.json();

        if (!ok) {
            console.error(error);
            return
        }

        console.log(message);
        navigate('/')

    }

    return (
        <>
            <div id="main">
                <article className="post" style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <header><div className="title">
                        <h2>
                            Registrarme
                        </h2>
                    </div>
                    </header>
                    <form action="" noValidate onSubmit={handleSubmit}>
                        <div className="box-input">
                            <label htmlFor="">Nombre de usuario</label>
                            <input type="text" name="username" id="username" value={username} onChange={handleInputChange} />
                        </div>
                        <div className="box-input">
                            <label htmlFor="">Email</label>
                            <input type="email" name="email" id="email" value={email} onChange={handleInputChange} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                            <div className="box-input">
                                <label htmlFor="">Contraseña</label>
                                <input type="password" name="password" id="password" value={password} onChange={handleInputChange} />
                            </div>
                            <div className="box-input">
                                <label htmlFor="">Confirmar contraseña</label>
                                <input type="password" name="password2" id="password2" value={password2} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div style={{ textAlign: "right" }}>
                            <button>Enviar</button>
                        </div>

                    </form>

                </article>
            </div>
        </>
    )
}

export default SignUp
