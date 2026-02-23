import { useState } from 'react';
import { Download, RefreshCw, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CompressionResult } from '@/hooks/use-compress-image';

interface ResultViewProps {
  result: CompressionResult;
  onReset: () => void;
}

export function ResultView({ result, onReset }: ResultViewProps) {
  const [downloaded, setDownloaded] = useState(false);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = result.compressedUrl;
    // Keep original extension but append -compressed
    const nameParts = result.originalFile.name.split('.');
    const ext = nameParts.pop();
    const baseName = nameParts.join('.');
    link.download = `${baseName}-compressed.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-8"
    >
      {/* Success Banner */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-green-500 text-white rounded-full p-2">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground">Successfully Compressed!</h3>
            <p className="text-muted-foreground text-sm">
              Saved {formatSize(result.originalSize - result.compressedSize)} ({result.savingsPercentage.toFixed(1)}% reduction)
            </p>
          </div>
        </div>
        
        <Button 
          size="lg" 
          onClick={handleDownload}
          className="w-full md:w-auto rounded-xl shadow-lg shadow-primary/20 transition-all font-semibold"
        >
          <Download className="w-4 h-4 mr-2" />
          {downloaded ? "Download Again" : "Download Image"}
        </Button>
      </div>

      {/* Comparison Visuals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="font-semibold text-muted-foreground uppercase tracking-wider text-xs">Original</span>
            <span className="font-mono font-medium">{formatSize(result.originalSize)}</span>
          </div>
          <div className="aspect-video relative rounded-xl overflow-hidden bg-muted/30 border border-border">
            <img 
              src={result.originalUrl} 
              alt="Original" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Compressed */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="font-semibold text-primary uppercase tracking-wider text-xs">Compressed</span>
            <span className="font-mono font-bold text-green-600 dark:text-green-400">
              {formatSize(result.compressedSize)}
            </span>
          </div>
          <div className="aspect-video relative rounded-xl overflow-hidden bg-muted/30 border-2 border-primary/20">
            <img 
              src={result.compressedUrl} 
              alt="Compressed" 
              className="w-full h-full object-contain"
            />
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-md text-xs font-bold">
              -{result.savingsPercentage.toFixed(0)}%
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 flex justify-center border-t border-border/50">
        <Button 
          variant="ghost" 
          onClick={onReset}
          className="text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Compress Another Image
        </Button>
      </div>
    </motion.div>
  );
}
