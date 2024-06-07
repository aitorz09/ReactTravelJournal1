import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth.jsx';
import { callAPI } from '../utils/callAPI.js';
import { toast } from 'react-toastify';

const Votes = ({ idPost, voteCountUp, voteCountDown, postVote }) => {

  const { currentUser } = useAuth()

  const [countUp, setCountUp] = useState(null);
  const [countDown, setCountDown] = useState(null);
  const [vote, setVote] = useState(null);

  const changeVote = async (e, type) => {
    e.preventDefault()

    if (!currentUser) {
      toast.warning('Debe iniciar sesión para votar')
      return
    }
    try {
      if (!vote || (type == 'positive' && vote == -1 || (type == 'negative' && vote == 1))) {
        //agrego su voto (positivo o negativo => type)
        const {
          message,
          voteCountUp,
          voteCountDown,
          postVote
        } = await callAPI(`/posts/${idPost}/votes/${type}`, 'POST')

        toast.info(message);

        setCountUp(voteCountUp);
        setCountDown(voteCountDown);
        setVote(postVote);

      } else {
        //elimino su voto
        const {
          message,
          voteCountUp,
          voteCountDown,
        } = await callAPI(`/posts/${idPost}/votes`, 'DELETE')

        toast.info(message)
        setCountUp(voteCountUp);
        setCountDown(voteCountDown);
        setVote(null);

      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setCountUp(voteCountUp);
    setCountDown(voteCountDown);
    setVote(postVote);
  }, [voteCountUp, voteCountDown, postVote])


  return (
    <>
      <li><a href="#" onClick={(e) => changeVote(e, 'positive')} style={{ fontSize: "24px" }} className={`icon ${vote && vote > 0 ? 'regular' : 'solid'} fa-thumbs-up`}>{countUp}</a></li >
      <li><a href="#" onClick={(e) => changeVote(e, 'negative')} style={{ fontSize: "24px" }} className={`icon ${vote && vote < 0 ? 'regular' : 'solid'} fa-thumbs-down`}>{countDown}</a></li>
    </>
  )
}

Votes.propTypes = {
  idPost: PropTypes.number,
  voteCountUp: PropTypes.number,
  voteCountDown: PropTypes.number,
  postVote: PropTypes.number
}

export default Votes