"use client";

import { useState } from "react";
import { Upload, FileText, Download, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Modal } from "./components/modal";
import { FileUploadButton } from "./components/file-upload-button";

export function UploadButtonWithModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleUploadComplete = (files: File[]) => {
    setUploadedFiles((prev) => [...prev, ...files]);
    setIsModalOpen(false);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div className="w-full space-y-4 mt-4">
      <Button
        type="button"
        size={"lg"}
        variant={"outline"}
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-2"
      >
        <Upload className="h-5 w-5" />
        Cargar archivos
      </Button>

      {uploadedFiles.length > 0 && (
        <div className="border rounded-lg overflow-hidden mt-4">
          <div className="p-3 bg-gray-100 font-medium">
            Archivos cargados ({uploadedFiles.length})
          </div>
          <ul className="divide-y">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-blue-600 hover:text-blue-700"
                    title="Descargar"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFile(index)}
                    className="h-8 w-8 text-red-600 hover:text-red-700"
                    title="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Cargar archivos"
      >
        <FileUploadButton onUploadComplete={handleUploadComplete} />
      </Modal>
    </div>
  );
}
