import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon, FileWarning } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  disabled?: boolean;
}

export function ImageUploader({ onUpload, disabled }: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles: 1,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "w-full p-8 md:p-12 rounded-2xl border-2 border-dashed transition-all duration-300 ease-out flex flex-col items-center justify-center text-center cursor-pointer group",
        isDragActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-primary/50 hover:bg-muted/50",
        isDragReject && "border-destructive bg-destructive/5",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none"
      )}
    >
      <input {...getInputProps()} />
      
      <div className={cn(
        "w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300",
        isDragActive ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/25" : "bg-primary/10 text-primary group-hover:bg-primary/20",
        isDragReject && "bg-destructive/10 text-destructive"
      )}>
        {isDragReject ? (
          <FileWarning className="w-10 h-10" />
        ) : isDragActive ? (
          <UploadCloud className="w-10 h-10 animate-bounce" />
        ) : (
          <ImageIcon className="w-10 h-10" />
        )}
      </div>

      <h3 className="text-xl md:text-2xl font-bold mb-2">
        {isDragActive ? "Drop image to compress" : "Drag & drop your image here"}
      </h3>
      <p className="text-muted-foreground mb-8 max-w-sm">
        Supports JPG, PNG, and WEBP formats up to 20MB. Processing happens entirely in your browser.
      </p>

      <Button size="lg" className="rounded-xl px-8 shadow-md hover:shadow-lg transition-all" type="button">
        Select Image
      </Button>
    </div>
  );
}
