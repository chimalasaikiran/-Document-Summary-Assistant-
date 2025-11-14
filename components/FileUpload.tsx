import React, { useState, useCallback, useRef } from 'react';
import UploadIcon from './icons/UploadIcon';
import FileIcon from './icons/FileIcon';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  acceptedTypes?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, acceptedTypes = "application/pdf,image/*" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((selectedFile: File) => {
    if (selectedFile && acceptedTypes.split(',').some(type => selectedFile.type.startsWith(type.replace('*', '')))) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null); // No preview for PDFs
      }
      onFileSelect(selectedFile);
    } else {
      alert(`Invalid file type. Please upload one of: ${acceptedTypes}`);
    }
  }, [onFileSelect, acceptedTypes]);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
  }

  const onClearFile = () => {
    setFile(null);
    setFilePreview(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const onBrowseClick = () => {
    fileInputRef.current?.click();
  };

  if (file) {
    return (
      <div className="w-full p-4 border border-slate-300 rounded-lg bg-white flex flex-col items-center text-center">
        {filePreview ? (
          <img src={filePreview} alt="Preview" className="max-h-40 rounded-md mb-4 object-contain" />
        ) : (
          <FileIcon className="w-16 h-16 text-primary mb-4" />
        )}
        <p className="text-sm font-medium text-slate-800 truncate max-w-full">{file.name}</p>
        <p className="text-xs text-slate-500 mb-4">{(file.size / 1024).toFixed(2)} KB</p>
        <button
          onClick={onClearFile}
          className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
        >
          Clear File
        </button>
      </div>
    );
  }

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onClick={onBrowseClick}
      className={`relative w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ease-in-out
        ${isDragging ? 'border-primary bg-blue-100' : 'border-slate-300 bg-slate-100 hover:bg-slate-200'}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={onFileChange}
        accept={acceptedTypes}
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <UploadIcon className="w-10 h-10 text-slate-500" />
        <p className="text-slate-600 font-semibold">
          Drag & drop a file here or <span className="text-primary font-bold">browse</span>
        </p>
        <p className="text-xs text-slate-500">Supports PDF and Image files</p>
      </div>
    </div>
  );
};

export default FileUpload;