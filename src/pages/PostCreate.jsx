import { useEffect, useState } from "react";
import InputForm from "../components/forms/InputForm.jsx";
import TextAreaForm from "../components/forms/TextAreaForm.jsx";
import useForm from "../hooks/useForm.jsx"
import useAuth from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import InputCheck from "../components/forms/InputCheck.jsx";
import { callAPI } from "../utils/callAPI.js";
import InputFiles from "../components/forms/InputFiles.jsx";
import { toast } from "react-toastify";

const PostCreate = () => {

    const { currentUser } = useAuth()
    const navigate = useNavigate()

    const [tags, setTags] = useState([])

    const [formValues, handleInputChange, handleInputCheck, handleInputFiles] = useForm({
        title: "",
        description: "",
        tags: [],
        media: []
    });

    const { title, description } = formValues;

    const handleSubmit = async (e) => {
        e.preventDefault()

        if ([title, description].includes("") || !formValues.media.length) {
            toast.error('El título y la descripción son obligatorias')
            return null
        }

        // envío los datos de texto para registrar una nueva publicación y obtengo su id
        const { ok, id, error } = await callAPI('/posts', 'POST', {
            title,
            description,
            tags: formValues.tags
        });

        if (!ok) {
            console.log(error);
            return
        }

        // recorro el array de contenido multimedia y hago las peticiones en pararelo obteniendo un array de promesas
        const arrayPromises = formValues.media.map(async (mediaFile) => {

            const formData = new FormData();
            formData.set("media", mediaFile);

            const ressult = await callAPI(`/posts/${id}/media`, 'POST', formData)

            return ressult
        });

        // hago todas peticiones y obtengo el resultado
        const results = await Promise.all(arrayPromises);

        // chequeo si hay errores para mostrarlos por consola. Si no hay errores redirijo al home
        const errors = results.filter(result => !result.ok);

        if (errors.length) {
            console.log('Error en la carga de archivos')
            errors.forEach(({ error }) => console.log(error))
        } else {
            console.log('Publicación creada con éxito!!')
            navigate('/')
        }
    }

    useEffect(() => {
        !currentUser && navigate('/sign-in')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    useEffect(() => {
        callAPI('/tags')
            .then(result => {
                if (result.ok) {
                    const tagsModified = result.tags.map(tag => ({ id: tag.id, label: tag.name }));
                    setTags(tagsModified)
                }
            })
            .catch(error => console.log(error))
    }, [])


    return (
        <div id="main">
            <article className="post" style={{ maxWidth: "600px", margin: "0 auto" }}>
                <header>
                    <div className="title">
                        <h2>
                            Nueva Publicación
                        </h2>
                    </div>
                </header>
                <form action="" noValidate onSubmit={handleSubmit}>
                    <InputForm name={'title'} label={'Título'} value={title} onChange={handleInputChange} />
                    <TextAreaForm name={'description'} label={'Descripción'} value={description} onChange={handleInputChange} />
                    <label>Etiquetas</label>
                    <InputCheck name={'tags'} options={tags} onChange={handleInputCheck} />
                    <InputFiles label={'Archivos multimedia'} name={"media"} onChange={handleInputFiles} multiple={true} accept={"video/*, image/*"} />
                    <div style={{ textAlign: "right" }}>
                        <button className="button large">Publicar</button>
                    </div>
                </form>

            </article>
        </div>
    )
}

export default PostCreate
