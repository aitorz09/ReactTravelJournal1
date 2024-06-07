import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { callAPI } from '../utils/callAPI.js';
import imageDefault from '../assets/default.jpeg'
import { getDateFormat } from "../utils/getDateFormat.js";
import Slider from '../components/Slider.jsx';
import useAuth from '../hooks/useAuth.jsx';
import { formatDistanceToNow } from 'date-fns';
import { useModal } from '../hooks/useModal.jsx';
import ModalComment from '../components/modals/ModalComment.jsx';
import Votes from '../components/Votes.jsx';
import { toast } from 'react-toastify';

const Post = () => {

    const { id } = useParams();
    const { currentUser } = useAuth();
    const [isOpen, openModal, closeModal] = useModal();

    const [post, setPost] = useState(null);

    const [commentToEdit, setCommentToEdit] = useState(null);

    const handleOpenModal = (e, comment) => {
        e.preventDefault()

        if (!currentUser) {
            toast.warning('Debes iniciar sesión para comentar')
            return
        }

        setCommentToEdit(comment)
        openModal()
    }

    const handleDeleteComment = async (e, idComment) => {
        e.preventDefault()
        try {
            const {ok, message, error} = await callAPI(`/posts/${post.id}/comments/${idComment}`,'DELETE')

            if(!ok) throw new Error(error)

            toast.info(message)

            setPost((oldPost) => {
                return {
                    ...oldPost,
                    comments : oldPost.comments.filter(c => c.id != idComment)
                }
            })

        } catch (error) {
            console.error(error)
            toast.error(error)
        }
    }


    useEffect(() => {
        callAPI(`/posts/${id}`)
            .then(response => {
                const { ok, post, error } = response;
                if (ok) {
                    setPost(post)
                } else {
                    throw new Error(error)
                }
            })
            .catch(error => console.error(error))

    }, [id])


    return (

        !post ?
            <p>Cargando...</p>
            :
            <>
                <article className="post">
                    <header>
                        <div className="title">
                            <h2>{post.title}</h2>
                        </div>
                        <div className="meta">
                            <time className="published" dateTime="2015-11-01">{getDateFormat(post.createdAt, 'MMMM d, yyyy')}</time>
                            <a href="#" className="author"><span className="name">{post.user.username}</span><img src={post.user.avatar} alt="" /></a>
                        </div>
                    </header>
                    <section className="image featured">
                        {
                            post.media.length ?

                                <Slider media={post.media} />
                                :
                                <img src={imageDefault} alt="" />
                        }

                    </section>            
                    <p>{post.description}</p>
                    <footer>

                        <div style={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <ul className="stats">


                                <Votes
                                    idPost={post.id}
                                    voteCountUp={post.voteCountUp}
                                    voteCountDown={post.voteCountDown}
                                    postVote={post.postVote}
                                />
                                <li><a href="#" onClick={(e) => handleOpenModal(e, null)} style={{ fontSize: "24px" }} className="icon regular fa-comment-dots"><span style={{ fontSize: "14px" }}>Comentar</span></a></li>
                            </ul>
                            <ul className="stats">
                                {
                                    post.tags.map((tag, index) => <li key={index}><Link to={`/posts?tag=${tag.id}&title=${tag.name}`}>{tag.name}</Link></li>)
                                }
                            </ul>
                        </div>
                    </footer>
                </article>
                <aside id="post" >
                     
                    <div className="post"  >

                    <footer>
                        <h3>{post.comments.length ? 'Comentarios' : 'No hay comentarios todavía...'}</h3>

                    </footer>
                 

                    {
                        post.comments.map((comment, index) => (
                            <article key={index}>
                                <small className="published" style={{
                                        color: 'silver',
                                        fontSize: "14px"
                                }}>{formatDistanceToNow(comment.createdAt)}</small>
                                <section className="blurb">
                                    <p>{comment.message}</p>
                                </section>
                                <div className="meta">
                                   
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}>
                                        {
                                            currentUser?.id == comment.userId &&
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center"
                                            }}>
                                                    <a href="#" onClick={(e) => handleOpenModal(e, comment)} className="author"><span className="name icon solid fa-pencil">Editar</span></a>
                                                    <a href="#" onClick={(e) => handleDeleteComment(e, comment.id)} className="author"><span className="name icon solid fa-trash">Borrar</span></a>
                                                </div>
                                        }

                                    </div>
                                    <a href="#" className="author"><span className="name">{comment.username}</span><img src={comment.avatar} alt="" /></a>

                                </div>
<hr />
                            </article>

                        ))

                    }
                      </div>
                </aside>
                <ModalComment post={post} isOpen={isOpen} closeModal={closeModal} setPost={setPost} commentToEdit={commentToEdit} />
            </>





    )
}

export default Post
