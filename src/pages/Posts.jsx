import { useEffect, useRef, useState } from 'react'
import { callAPI } from '../utils/callAPI.js';
import CardMiniPost from '../components/CardMiniPost.jsx';
import { useSearchParams } from 'react-router-dom';
import GoTop from '../components/GoTop.jsx';

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState(0)
    const page = useRef(1);

    const [searchParams] = useSearchParams();

    const title = searchParams.has('title') ? searchParams.get('title') : 'Todas las publicaciones'


    const getData = (offset = 0) => {

    const url = searchParams.has('tag') 
    ? `/tags/${searchParams.get('tag')}/posts?offset=${offset}`
    : `/posts?offset=${offset}`

        callAPI(url)
            .then(result => {
                console.log(result);
                if (result.ok) {
                    if (offset == 0) {
                        setTotal(result.total);
                        setPosts(result.posts)
                    } else {
                        setPosts(oldPosts => [...oldPosts, ...result.posts])
                    }
                }
            })
            .catch(error => console.error(error))
    }

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {


        const handleScroll = () => {
            const currentY = window.scrollY;
            const minWidth = window.innerWidth;
            //console.log(currentY, minWidth);

            if (minWidth < 768 && currentY > 2600 * page.current) {
                getData(10 * page.current)
                page.current++
            } else if (minWidth < 1024 && currentY > 800 * page.current) {
                getData(10 * page.current)
                page.current++
            } else if (minWidth < 1440 && currentY > 600 * page.current) {
                getData(10 * page.current)
                page.current++
            } else if (minWidth >= 1440 && currentY > 60 * page.current) {
                getData(10 * page.current)
                page.current++
            }
        }

        document.addEventListener('scroll', handleScroll)

        return () => {
            document.removeEventListener('scroll', handleScroll)
        }

    }, [])




    return (
        <div id="main">
            <section id="intro" >
                <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <h2 style={{ width: "100%" }}>{title}</h2>
                </header>
            </section>

            <p style={{ textAlign: "right", position: "sticky", top: "60px" }}>{`${posts.length} de ${total}`}</p>

            <section style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", width: "100%" }}>

                {
                    !posts.length
                        ?
                        <p>Cargando....</p>
                        :
                     
                                posts.map((post, index) => {
                                    return <CardMiniPost style={{ width: "260px" }} {...post} key={index} />
                                })
                         
                     
                }
            </section>
            <GoTop />

        </div>
    )
}

export default Posts
