import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Dropzone from 'react-dropzone'
import useLabel from '../useLabel'
import './styles.scss'

export const DropZone = ({
  formik: {
    values, setFieldValue, setFieldTouched,
  },
  disabled,
  name,
  accept,
  zoneActiveText,
  disabledText,
  placeholder,
  ...rest
}) => {
  const onDrop = acceptedFiles => {
    setFieldValue(name, values[name].concat(acceptedFiles))
    setFieldTouched(name, true)
  }

  return (
    <Dropzone
      {...rest}
      accept={accept}
      disabled={disabled}
      onDrop={onDrop}
    >
      {({
        getRootProps, getInputProps, isDragActive, acceptedFiles, rejectedFiles,
      }) => (
        <div
          {...getRootProps()}
          className={cx('dropzone', { 'dropzone--isActive': isDragActive, 'dropzone--isDisabled': disabled })}
        >
          <input {...getInputProps()} />
          {
              (acceptedFiles.length || rejectedFiles.length)
                ? (
                  values[name].map(file => {
                    if (file.type.includes('image')) {
                      return (
                        <img
                          key={file.name}
                          src={URL.createObjectURL(file)}
                          className="img-thumbnail"
                          alt={file.name}
                        />
                      )
                    }

                    return (
                      <div key={file.name} className="icon-wrapper">
                        <div className="icon">
                          <i title={file.name.split('.').pop()} />
                        </div>
                        <p>{file.name.split('.').shift()}</p>
                      </div>
                    )
                  })
                ) : isDragActive ? zoneActiveText : placeholder
            }
          <div className="fileInfo">
            {disabled ? disabledText : `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`}
          </div>
        </div>
      )}
    </Dropzone>
  )
}

DropZone.propTypes = {
  /** @ignore */
  formik: PropTypes.instanceOf(Object).isRequired,
  /** Adds a custom class to the DropZone wrapper div */
  className: PropTypes.string,
  /** Adds a custom inline styles to the Dropzone wrapper div */
  style: PropTypes.instanceOf(Object),
  /** Disables the DropZone Field */
  disabled: PropTypes.bool,
  id: PropTypes.string,
  /** Sets the Name of the DropZone Field */
  name: PropTypes.string.isRequired,
  /** Allow specific types of files. See [attr-accept](https://github.com/okonet/attr-accept) for more information. */
  accept: PropTypes.string,
  /** Sets the main Label for the DropZone Field */
  label: PropTypes.string,
  /** Sets the text to be shown when draging files over the drop zone */
  zoneActiveText: PropTypes.string,
  /** text shown as placeholder if DropZone is disabled  */
  disabledText: PropTypes.string,
  /** Sets the Placeholder text */
  placeholder: PropTypes.string,
  /** Sets a hint text after/below the DropZone Field */
  hint: PropTypes.string,
  /** Sets the field as requierd, if label is passed, an * is added to the end of the main label. Validation will only work if you pass the required() method in the yup validation schema */
  required: PropTypes.bool,
}

DropZone.defaultProps = {
  className: null,
  style: null,
  disabled: false,
  id: null,
  accept: null,
  label: null,
  zoneActiveText: 'Drop file(s) here',
  disabledText: 'File upload disabled',
  placeholder: 'Dropp some files here.',
  hint: null,
  required: false,
}

export default useLabel('dropzone')(DropZone)
