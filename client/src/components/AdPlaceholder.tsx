import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AdPlaceholderProps {
  className?: string;
  label?: string;     // optional placeholder text
  slot: string;       // REQUIRED: AdSense ad slot id
  format?: "auto" | "fluid";
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdPlaceholder({
  className,
  label = "Advertisement",
  slot,
  format = "auto",
}: AdPlaceholderProps) {
  const insRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    // Prevent double-push in React StrictMode / re-mounts
    if (!insRef.current) return;
    if (insRef.current.getAttribute("data-adsbygoogle-status")) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn("AdSense push failed:", e);
    }
  }, []);

  return (
    <div className={cn("w-full", className)} aria-label="Advertisement">
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "100%" }}
        data-ad-client="ca-pub-3021119007649802"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      {/* Fallback text if ad doesn't load */}
      <noscript>{label}</noscript>
    </div>
  );
}