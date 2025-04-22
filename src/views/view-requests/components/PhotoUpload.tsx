import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PhotoUploadProps {
  onPhotosSelected: (files: File[]) => void;
}

const PhotoUpload = ({ onPhotosSelected }: PhotoUploadProps) => {
  /* const [selectedFiles, setSelectedFiles] = useState<File[]>([]); */

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      /*    setSelectedFiles(filesArray); */
      onPhotosSelected(filesArray);
    }
  };

  return (
    <div>
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        id="photo-upload"
      />
      <Button asChild>
        <label htmlFor="photo-upload">Subir fotos</label>
      </Button>
    </div>
  );
};

export default PhotoUpload;
