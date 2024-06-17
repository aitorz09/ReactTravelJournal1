import CardMiniPost from "./CardMiniPost.jsx"
import useFetch from "../hooks/useFetch.jsx";

const Sidebar = () => {

    const { posts } = useFetch('/posts/random');

    return (
        <section id="sidebar">
            <section id="intro">
                <a href="#" className="logo"><img src="images/logo.jpg" alt="" /></a>
                <header>
                    <h2>Travel Journal HAB</h2>
                    <p>Edición JSB36RT by <a href="https://www.hackaboss.com/" target="blank">HACK A BOOS</a></p>
                </header>
            </section>
            <section>
                <div className="mini-posts">
                    {
                        !posts
                            ?
                            <p>Cargando...</p>
                            :
                            posts.map(post => <CardMiniPost {...post} key={post.id} />)
                    }

                </div>
            </section>


            <section>
            <div className="mini-posts">
                    {
                        !posts
                            ?
                            <p>Cargando...</p>
                            :
                            posts.map(post => <CardMiniPost {...post} key={post.id} />)
                    }

                </div>
            </section>


            <section className="blurb">
                <h2>About</h2>
                <p>Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod amet placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at phasellus sed ultricies.</p>
                <ul className="actions">
                    <li><a href="#" className="button">Learn More</a></li>
                </ul>
            </section>


            <section id="footer">
                <ul className="icons">
                    <li><a href="#" className="icon brands fa-twitter"><span className="label">Twitter</span></a></li>
                    <li><a href="#" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
                    <li><a href="#" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
                    <li><a href="#" className="icon solid fa-rss"><span className="label">RSS</span></a></li>
                    <li><a href="#" className="icon solid fa-envelope"><span className="label">Email</span></a></li>
                </ul>
                <p className="copyright">&copy; Untitled. Design: <a href="http://html5up.net">HTML5 UP</a>. Images: <a href="http://unsplash.com">Unsplash</a>.</p>
            </section>

        </section>
    )
}

export default Sidebar
