import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
const TextAreaForm = ({ className, label, name, value, onChange, cols, rows }) => {

    const refTextArea = useRef(null)

    useEffect(() => refTextArea.current.focus())

    return (
        <div className={`box-input ${className}`}>
            <label htmlFor={name}>{label}</label>
            <textarea
                name={name}
                value={value}
                id={name}
                onChange={onChange}
                style={{ resize: "none" }}
                cols={cols}
                rows={rows}
                ref={refTextArea}
            />
        </div>
    )
}

TextAreaForm.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    cols: PropTypes.number,
    rows: PropTypes.number,
}

export default TextAreaForm
