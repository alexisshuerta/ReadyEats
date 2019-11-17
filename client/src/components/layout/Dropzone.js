import React from 'react';
// Import the useDropzone hooks from react-dropzone
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ onDrop, accept }) => {
	// Initializing useDropzone hooks with options
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept
	});

	return (
		<div {...getRootProps()}>
			<input className="dropzone-input" {...getInputProps()} />
			<div className="text-center">
				{isDragActive ? (
					<p className="dropzone-content">Release to drop the files here</p>
				) : (
					<p className="dropzone-content">Drag Picture here</p>
				)}
			</div>
		</div>
	);
};

export default Dropzone;
