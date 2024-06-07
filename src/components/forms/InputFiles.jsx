import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import Icon from '../Icon.jsx';

//todo: crear una función que se ocupe de mostrar la vista previa o nombres de los archivos dependiendo del mimeTypes

const InputFiles = ({ className, label, name, accept, onChange, multiple = false }) => {

    const [files, setFiles] = useState([]);
    const inputRef = useRef(null);

    const addFiles = (e) => {
        const filesChecked = files.length ? Array.from(e.target.files).filter(e => !files.some(f => f.name == e.name)) : e.target.files

        const newFiles = [...files, ...filesChecked] 
            setFiles(newFiles)
        onChange(name, newFiles);

    }
    const removeFile = (e, file) => {
        e.preventDefault()
        const modifyFiles = files.filter(item => item != file)
        setFiles(modifyFiles)
        onChange(name, modifyFiles)
    }

    return (
        <div className={`box-input ${className}`}>
            <label htmlFor={name}>{label}</label>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {
                    files.map((file, index) => {
                        return (
                            <li key={index} style={{
                                padding: "0 30px",
                                position: "relative"
                            }}>

                                <a href="#" style={{
                                    position: "absolute",
                                    top: "0",
                                    right: "0",
                                    border: "none"
                                }}
                                    id={name}
                                    onClick={(e) => removeFile(e, file)}
                                >
                                    <Icon name={"delete"} />
                                </a>
                                {
                                    file.type.startsWith("image")
                                        ? (

                                            <img width={"100%"} src={URL.createObjectURL(file)} alt="image" />

                                        )
                                        : (
                                            <video width={"100%"} src={URL.createObjectURL(file)} controls />
                                        )
                                }


                            </li>
                        )
                    })
                }
            </ul>
            <input
                type="file"
                name={name}
                accept={accept}
                ref={inputRef}
                onChange={addFiles}
                multiple={multiple}
                hidden
            />
            <button type='button' onClick={() => inputRef.current.click()} className='button large'>Agregar archivos</button>
        </div>
    )
}

InputFiles.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    accept: PropTypes.string,
    onChange: PropTypes.func,
    multiple: PropTypes.bool,

}

export default InputFiles
