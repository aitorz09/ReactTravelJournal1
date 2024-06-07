import PropTypes from 'prop-types'
import Icon from '../Icon.jsx';
import './Modal.css'
const Modal = ({ children, isOpen, closeModal, title = "Modal" }) => {

    const handleModalContainerClick = (e) => e.stopPropagation();

    return (
        <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
            <div className="modal-container" onClick={handleModalContainerClick}>
                <div className="title">
                    <h2>{title}</h2>
                    <hr />
                </div>
                <span className="modal-close" onClick={closeModal}>
                    <Icon name={'close'} />
                </span>
                {children}
            </div>
        </article>
    );
};

Modal.propTypes = {
    children: PropTypes.element,
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    title: PropTypes.string
}

export default Modal