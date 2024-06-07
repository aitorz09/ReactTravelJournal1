import PropTypes from 'prop-types'
const InputCheck = ({ className = "", type = "checkbox", name, options = [], onChange }) => {
    return (
        <div className={`box-input ${className}`}>
            {
                options.map((option, index) => {
                    return (
                        <div key={index}>
                            <input type={type} name={name} value={option.id} id={option.id} onChange={onChange} />
                            <label htmlFor={option.id}>{option.label}</label>
                        </div>
                    )
                })
            }

        </div>
    )
}

InputCheck.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
}

export default InputCheck
