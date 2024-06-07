import PropTypes from 'prop-types'
const InputForm = ({ className, label, type = "text", name, value, onChange }) => {
    return (
        <div className={`box-input ${className}`}>
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} value={value} id={name} onChange={onChange} />
        </div>
    )
}

InputForm.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default InputForm
