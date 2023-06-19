import React, { useCallback, useEffect, useMemo, useState } from "react";
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
const FileUpload = ({ name, setFieldValue, multiple }) => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const onDrop = useCallback((files) => {
    setAcceptedFiles((prevFiles) => [...prevFiles, ...files]);
  }, []);
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
    accept: { "text/csv": [".csv"] },
    onDrop,
    multiple,
  });

  const handleDelete = (file) => {
    setAcceptedFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      let index = acceptedFiles.indexOf(file);
      newFiles.splice(index, 1);
      return newFiles;
    });
    setFieldValue(name, acceptedFiles);
  };
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragAccept, isDragReject, isFocused]
  );

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      <Stack className="file-item" direction="horizontal">
        <Stack>
          <span className="file-name">{file.path}</span>
          <span className="file-size">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </span>
        </Stack>
        <button className="btn btn-cross" onClick={() => handleDelete(file)}>
          <XCircleIcon />
        </button>
      </Stack>
    </li>
  ));

  return (
    <div className="dropzone">
      <div {...getRootProps({ style })} className="mb-3">
        <input {...getInputProps()} name={name} />
        <p className="m-0 text-center">
          {isDragActive
            ? isDragReject
              ? `${multiple ? "files" : "file"} not supported`
              : `Drag ${multiple ? "files" : "file"} here...`
            : `Drag CSV ${
                multiple ? "files" : "file"
              } here, or click to select ${multiple ? "files" : "file"}`}
        </p>
      </div>
      <ul className="files-list">{files}</ul>
    </div>
  );
};

FileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
};
FileUpload.defaultProps = {
  name: "file",
  multiple: false,
};
export default FileUpload;
