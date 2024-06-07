import { callAPI } from '../utils/callAPI.js';
import CardPost from './CardPost.jsx'
import { useEffect, useState } from 'react';

const BoxPosts = () => {

    const [posts, setPosts] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        callAPI(`/posts?limit=3&offset=${offset}`)
            .then(result => {

                if (result.ok) setPosts(result.posts)
            })
            .catch(error => console.error(error))

    }, [offset])

    return (
        <div id="main">

            {
                !posts.length
                    ?
                    <p>Cargando....</p>
                    :
                    posts.map((post, index) => {
                        return <CardPost {...post} key={index} />
                    })
            }


            <ul className="actions pagination">
                <li><a href="#" onClick={() => setOffset(oldOffset => oldOffset - 3)} className={`${offset == 0 && 'disabled'} button large previous`}>Previous Page</a></li>
                <li><a href="#" onClick={() => setOffset(oldOffset => oldOffset + 3)} className="button large next">Next Page</a></li>
            </ul>

        </div>
    )
}

export default BoxPosts
