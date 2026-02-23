import { useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import { useToast } from '@/hooks/use-toast';

export type CompressionStatus = 'idle' | 'compressing' | 'success' | 'error';

export interface CompressionResult {
  originalFile: File;
  compressedFile: File;
  originalSize: number;
  compressedSize: number;
  originalUrl: string;
  compressedUrl: string;
  savingsPercentage: number;
}

export function useCompressImage() {
  const [status, setStatus] = useState<CompressionStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const { toast } = useToast();

  const compress = useCallback(async (file: File, targetSizeKB: number) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a valid image file (JPG, PNG, WEBP).',
        variant: 'destructive',
      });
      return;
    }

    setStatus('compressing');
    setProgress(0);
    setResult(null);

    try {
      // Create local URLs for preview
      const originalUrl = URL.createObjectURL(file);
      
      const options = {
        maxSizeMB: targetSizeKB / 1024,
        maxWidthOrHeight: 4096, // Keep resolution reasonably high, rely on quality drop for size
        useWebWorker: true,
        onProgress: (p: number) => setProgress(p),
        initialQuality: 0.8,
      };

      const compressedFile = await imageCompression(file, options);
      const compressedUrl = URL.createObjectURL(compressedFile);

      const originalSize = file.size;
      const compressedSize = compressedFile.size;
      
      // Calculate savings, ensure it's not negative (rare, but possible with very small images)
      const savings = Math.max(0, ((originalSize - compressedSize) / originalSize) * 100);

      setResult({
        originalFile: file,
        compressedFile,
        originalSize,
        compressedSize,
        originalUrl,
        compressedUrl,
        savingsPercentage: savings,
      });

      setStatus('success');
      toast({
        title: 'Compression complete!',
        description: `Successfully reduced file size by ${savings.toFixed(1)}%`,
      });

    } catch (error) {
      console.error('Compression error:', error);
      setStatus('error');
      toast({
        title: 'Compression failed',
        description: 'An error occurred while compressing your image. Please try again with a different file.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const reset = useCallback(() => {
    if (result) {
      URL.revokeObjectURL(result.originalUrl);
      URL.revokeObjectURL(result.compressedUrl);
    }
    setStatus('idle');
    setProgress(0);
    setResult(null);
  }, [result]);

  return {
    status,
    progress,
    result,
    compress,
    reset,
  };
}
