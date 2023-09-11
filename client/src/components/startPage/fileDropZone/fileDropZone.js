import React, { useState } from 'react';
import axios from 'axios';
import useStore from '../../../store';
import './fileDropZone.scss';

const FileDropZone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const {setFile} = useStore();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if(e.dataTransfer.files.length>1){
      alert('Choose only one file');
    } else {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }    
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if(file.name.split('.')[file.name.split('.').length-1]!=='srt'){
      alert('choose only .srt files');
    } else {
      if (file) {
        const config = {
          headers: {
            'Content-Type': 'application/octet-stream', // Тип содержимого: бинарный файл
          },
        };
  
        axios.post('http://localhost:3001/api/upload', file, config)
          .then(response => {
            setFile(response.data);
          })
          .catch(error => {
            alert(error);
          });
      }
    }
    
  };

  return (
    <div
      className={`drop-zone ${isDragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('fileInput').click()}
    >
      <input
        id="fileInput"
        type="file"
        accept=".srt"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      {isDragging ? 'Drag file here' : 'Drag file here or click to choose'}
    </div>
  );
};

export default FileDropZone;