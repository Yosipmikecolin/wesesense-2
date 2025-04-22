"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Upload, X, FileText, AlertCircle } from "lucide-react";
import { Button } from "./button";
import { Alert, AlertDescription } from "./alert";
import { Progress } from "./progress";
import toast from "react-hot-toast";

interface FileUploadButtonProps {
  onUploadComplete?: (files: File[]) => void;
}

export function FileUploadButton({ onUploadComplete }: FileUploadButtonProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Lista de tipos MIME de imágenes para excluir
  const imageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "image/bmp",
    "image/tiff",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const selectedFiles = Array.from(e.target.files);
    const nonImageFiles = selectedFiles.filter(
      (file) => !imageTypes.includes(file.type)
    );

    if (selectedFiles.length !== nonImageFiles.length) {
      setError(
        "Se han excluido archivos de imagen. Solo se permiten documentos y otros tipos de archivos."
      );
    } else {
      setError(null);
    }

    setFiles((prev) => [...prev, ...nonImageFiles]);

    // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!files.length) return;

    setUploading(true);
    setProgress(0);

    try {
      // Simulación de carga
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setProgress(i);
      }

      // Aquí iría la lógica real de carga de archivos
      // const formData = new FormData()
      // files.forEach(file => formData.append('files', file))
      // const response = await fetch('/api/upload', { method: 'POST', body: formData })

      // Notificar al componente padre sobre la carga completada
      if (onUploadComplete) {
        onUploadComplete([...files]);
      }

      toast.success("Archivo cargado");
      setFiles([]);
    } catch (err) {
      setError("Error al cargar los archivos. Intente nuevamente.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
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
    <div className="w-full space-y-4">
      <div
        className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
          accept=".pdf,.doc,.docx,.txt,.xlsx,.csv,.ppt,.pptx,.zip,.rar"
        />
        <Upload className="w-10 h-10 mb-2 text-gray-500" />
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">
            Haz clic para seleccionar archivos
          </span>{" "}
          o arrastra y suelta
        </p>
        <p className="text-xs text-gray-500">
          Documentos, hojas de cálculo, presentaciones, archivos comprimidos (no
          imágenes)
        </p>
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          variant="outline"
          className="mt-4"
          disabled={uploading}
        >
          Seleccionar archivos
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5" />
            <AlertDescription>{error}</AlertDescription>
          </div>
        </Alert>
      )}

      {files.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="p-3 bg-gray-100 font-medium">
            Archivos seleccionados ({files.length})
          </div>
          <ul className="divide-y">
            {files.map((file, index) => (
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
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  disabled={uploading}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-xs text-center text-gray-500">
            Cargando... {progress}%
          </p>
        </div>
      )}

      <Button
        type="button"
        onClick={handleUpload}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        disabled={!files.length || uploading}
      >
        {uploading ? "Cargando..." : "Cargar archivos"}
      </Button>
    </div>
  );
}
