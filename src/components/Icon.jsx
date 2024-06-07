import PropTypes from 'prop-types'

const Icon = ({ name }) => {
    return (
        <span className="material-symbols-outlined">
            {name}
        </span>
    )
}

Icon.propTypes = {
    name : PropTypes.string
}

export default Icon
