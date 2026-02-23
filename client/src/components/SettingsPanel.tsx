import { SlidersHorizontal } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface SettingsPanelProps {
  targetKB: number;
  setTargetKB: (value: number) => void;
  disabled?: boolean;
}

export function SettingsPanel({ targetKB, setTargetKB, disabled }: SettingsPanelProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex items-center gap-2 mb-6 border-b border-border/50 pb-4">
        <SlidersHorizontal className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">Compression Settings</h3>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Label htmlFor="target-size" className="text-base font-medium text-muted-foreground">
            Target File Size
          </Label>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg font-mono font-bold text-lg">
            {targetKB} KB
          </div>
        </div>
        
        <Slider
          id="target-size"
          disabled={disabled}
          min={10}
          max={1000}
          step={10}
          value={[targetKB]}
          onValueChange={(val) => setTargetKB(val[0])}
          className="py-4"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground font-medium px-1">
          <span>Heavy Compression</span>
          <span>Balanced</span>
          <span>High Quality</span>
        </div>
      </div>
    </div>
  );
}
