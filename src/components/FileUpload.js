import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { XCircleIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

import {
  baseStyle,
  focusedStyle,
  acceptStyle,
  rejectStyle,
} from "./style/FileUploadStyle";
import "./style/fileUpload.scss";
import { Stack } from "react-bootstrap";
const FileUpload = React.forwardRef(
  ({ name, setFieldValue, multiple, supportedFile, innerRef }, ref) => {
    const [acceptedFiles, setAcceptedFiles] = useState(multiple ? [] : null);
    const onDrop = useCallback(
      (files) => {
        if (multiple) {
          setAcceptedFiles((prevFiles) => [...prevFiles, ...files]);
        } else {
          setAcceptedFiles(files[0]);
        }
      },
      [multiple]
    );
    useEffect(() => {
      setFieldValue(name, acceptedFiles);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [acceptedFiles]);

    const {
      getRootProps,
      getInputProps,
      isFocused,
      isDragAccept,
      isDragReject,
      isDragActive,
    } = useDropzone({
      accept: { "text/csv": supportedFile },
      onDrop,
      multiple,
    });

    const handleDelete = (file) => {
      setAcceptedFiles((prevFiles) => {
        if (multiple) {
          const newFiles = prevFiles.filter((f) => f !== file);
          return newFiles;
        } else {
          return null;
        }
      });
      setFieldValue(name, acceptedFiles);
    };
    useImperativeHandle(ref, () => ({
      handleClear() {
        setAcceptedFiles(multiple ? [] : null);
      },
    }));
    const style = useMemo(
      () => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
      }),
      [isDragAccept, isDragReject, isFocused]
    );

    const files = multiple
      ? acceptedFiles.map((file) => (
          <li key={file.path}>
            <Stack className="file-item" direction="horizontal">
              <Stack>
                <span className="file-name">{file.path}</span>
                <span className="file-size">
                  {file.size / 1024 / 1024 < 1
                    ? `${file.size.toFixed(2)} bytes`
                    : `${(file.size / 1024 / 1024).toFixed(2)} MB`}
                </span>
              </Stack>
              <button
                className="btn btn-cross"
                onClick={() => handleDelete(file)}
              >
                <XCircleIcon />
              </button>
            </Stack>
          </li>
        ))
      : acceptedFiles && (
          <li key={acceptedFiles.path}>
            <Stack className="file-item" direction="horizontal">
              <Stack>
                <span className="file-name">{acceptedFiles.path}</span>
                <span className="file-size">
                  {acceptedFiles.size / 1024 / 1024 < 1
                    ? `${acceptedFiles.size.toFixed(2)} bytes`
                    : `${(acceptedFiles.size / 1024 / 1024).toFixed(2)} MB`}
                </span>
              </Stack>
              <button
                className="btn btn-cross"
                onClick={() => handleDelete(acceptedFiles)}
              >
                <XCircleIcon />
              </button>
            </Stack>
          </li>
        );
    return (
      <div className="dropzone">
        <div {...getRootProps({ style })} className="mb-3">
          <input {...getInputProps()} name={name} />
          <p className="m-0 text-center">
            {isDragActive
              ? isDragReject
                ? `${multiple ? "files" : "file"} not supported`
                : `Drag ${multiple ? "files" : "file"} here...`
              : `Drag ${
                  supportedFile.length > 0
                    ? supportedFile.join(", ").replaceAll(".", "").toUpperCase()
                    : supportedFile.join("").replaceAll(".", "").toUpperCase()
                } ${multiple ? "files" : "file"} here, or click to select ${
                  multiple ? "files" : "file"
                }`}
          </p>
        </div>
        <ul className="files-list">{files}</ul>
      </div>
    );
  }
);

FileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  supportedFile: PropTypes.array,
};
FileUpload.defaultProps = {
  name: "file",
  multiple: false,
  supportedFile: ["csv"],
};
export default FileUpload;
