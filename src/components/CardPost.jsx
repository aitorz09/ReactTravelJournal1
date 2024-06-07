import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Votes from './Votes.jsx';

import { getDateFormat } from '../utils/getDateFormat.js';
import defaultImage from '../assets/default.jpeg'



export default function CardPost({ id, title, description, createdAt, user, media, tags, voteCountUp, voteCountDown, commentCount, postVote }) {
    return (
        <article className="post">
            <header>
                <div className="title">
                    <h2><Link to={`/posts/${id}`}>{title}</Link></h2>
                </div>
                <div className="meta">
                    <time className="published" dateTime="2015-11-01">{getDateFormat(createdAt, 'MMMM d, yyyy')}</time>
                    <a href="#" className="author"><span className="name">{user.username}</span><img src={user.avatar} alt="" /></a>
                </div>
            </header>
            <Link to={`/posts/${id}`} className="image featured">
                {
                    media
                        ?
                        (
                            media.mimeType.startsWith('image')
                                ?
                                <img width={"100%"} src={media.url} alt="" />
                                :
                                <video width={"100%"} src={media.url} controls />
                        )
                        :
                        <img src={defaultImage} alt="sdfsdf" />
                }

            </Link>


            <p>{description}</p>
            <footer>
                <ul className="actions">
                    <li><Link to={`/posts/${id}`} className="button large">Continúa leyendo...</Link></li>
                </ul>

                <div style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <ul className="stats">


                        <Votes idPost={id} voteCountUp={voteCountUp} voteCountDown={voteCountDown} postVote={postVote} />

                        <li><a style={{ fontSize: "24px" }} className="icon solid fa-comment">{commentCount}</a></li>
                    </ul>
                    <ul className="stats">
                        {
                            tags.map((tag, index) => <li key={index}><Link to={`/posts?tag=${tag.id}&title=${tag.name}`}>{tag.name}</Link></li>)
                        }
                    </ul>
                </div>

            </footer>
        </article>
    )
}

CardPost.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    }),
    media: PropTypes.shape({
        url: PropTypes.string.isRequired,
        mimeType : PropTypes.string.isRequired
    }),
    tags: PropTypes.array.isRequired,
    voteCount: PropTypes.number.isRequired,
    voteCountUp : PropTypes.number,
    voteCountDown : PropTypes.number,
    commentCount: PropTypes.number.isRequired,
    postVote: PropTypes.number
}
