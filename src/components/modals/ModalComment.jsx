import { useEffect, useState } from "react"
import TextAreaForm from "../forms/TextAreaForm.jsx"
import Modal from "./Modal.jsx"
import PropTypes from 'prop-types'
import { callAPI } from "../../utils/callAPI.js"
import { toast } from "react-toastify"

const ModalComment = ({ post, isOpen, closeModal, setPost, commentToEdit }) => {

    const [message, setMessage] = useState("");

    const handleAddComment = (comment) => {
        console.log(comment);

        setPost((oldPost) => {
            return {
                ...oldPost,
                comments: [comment, ...oldPost.comments]
            }
        })
    }

    const handleUpdateComment = (message) => {
        console.log('update....');
        const commentUpdated = post.comments.map(c => {
            if (c.id == commentToEdit.id) {
                c.message = message
            }
            return c
        })
        setPost((oldPost) => {
            return {
                ...oldPost,
                comments: commentUpdated
            }
        })
    }

    useEffect(() => {

        commentToEdit && setMessage(commentToEdit.message)

    }, [commentToEdit])



    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(message);

        const method = commentToEdit ? 'PATCH' : 'POST'

        try {
            const { ok, comment, message: msg, error } = await callAPI(`/posts/${post.id}/comments/${commentToEdit ? commentToEdit.id : ""}`, method, {
                message: message
            })
            if (ok) {
                toast.info(msg);

                commentToEdit ? handleUpdateComment(message) : handleAddComment(comment);

            } else {
                throw new Error(error)
            }
        } catch (error) {
            console.error(error)
            toast.error(error)
        } finally {
            setMessage("")
            closeModal()
        }

    }



    return (
        <Modal isOpen={isOpen} closeModal={closeModal} title={commentToEdit ? "Editar comentario" : "Nuevo comentario"}>
            <form onSubmit={handleSubmit}>
                <TextAreaForm
                    label="Mensaje"
                    name={"message"}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    cols={200}
                    rows={5}
                />
                <div style={{ textAlign: "right" }}>
                    <button className="button large" type="submit">{commentToEdit ? 'Guardar' : 'Enviar'}</button>
                </div>
            </form>
        </Modal>
    )
}

ModalComment.propTypes = {
    post: PropTypes.object,
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    commentToEdit: PropTypes.shape({
        id: PropTypes.number,
        message: PropTypes.string
    }),
    setPost: PropTypes.func
}

export default ModalComment
