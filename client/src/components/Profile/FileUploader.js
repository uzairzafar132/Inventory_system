import { useDropzone } from "react-dropzone";
const FileUploader = ({ onFileUpload }) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      accept: ".pdf",
      multiple: false, // Allow only one file to be uploaded
      onDrop: (acceptedFiles) => {
        // Pass the uploaded file to the parent component
        onFileUpload(acceptedFiles[0]);
      },
    });
  
    return (
      <div {...getRootProps()} style={{ marginTop: "1rem" }}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop a PDF file here, or click to select one</p>
        {acceptedFiles.length > 0 && (
          <div>
            <strong>Selected File:</strong> {acceptedFiles[0].name}
          </div>
        )}
      </div>
    );
  };

  export default FileUploader
  