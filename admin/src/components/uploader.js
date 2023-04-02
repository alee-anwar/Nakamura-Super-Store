import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  preview: {
    width: '100%',
    maxWidth: 300,
    maxHeight: 300,
    objectFit: 'contain',
  },
}));

function ImageUploader({ apiUrl }) {
  const classes = useStyles();
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    setUploading(true);

    const formData = new FormData();
    formData.append('image', selectedImage);

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        setUploadProgress(progress);
      },
    });

    if (response.ok) {
      setSelectedImage(null);
      setUploadProgress(0);
      setUploading(false);
      alert('Image uploaded successfully!');
    } else {
      alert('Error uploading image!');
    }
  };

  return (
    <div className={classes.root}>
      {selectedImage ? (
        <img src={URL.createObjectURL(selectedImage)} alt="Selected" className={classes.preview} />
      ) : (
        <div>Select an image</div>
      )}

      <input type="file" accept="image/*" onChange={handleImageSelect} />

      {selectedImage && (
        <Button variant="contained" color="primary" onClick={handleUpload} disabled={uploading}>
          Upload
        </Button>
      )}

      {uploading && (
        <div>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
