import PropTypes from 'prop-types';
import { getDateFormat } from '../utils/getDateFormat.js';
import defaultImage from '../assets/default.jpeg'
import { Link } from 'react-router-dom';


const CardMiniPost = ({ id, title, createdAt, media, user, style }) => {
    return (
        <article className="mini-post" style={{ ...style }}>
            <header>
                <h3><Link to={`/posts/${id}`}>{title}</Link></h3>
                <time className="published" dateTime="2015-10-20">{getDateFormat(createdAt, 'MMMM d, yyyy')}</time>
                <a href="#" className="author"><img src={user.avatar} alt="" /></a>
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
        </article>

    )
}

CardMiniPost.propTypes = {
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string.isRequired
    }),
    media: PropTypes.shape({
        url: PropTypes.string.isRequired,
    }),
    style: PropTypes.object
}

export default CardMiniPost
