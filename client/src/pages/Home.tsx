import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ImageIcon,
  Zap,
  Shield,
  Image as ImageIcon2,
  Loader2,
} from "lucide-react";

import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ImageUploader } from "@/components/ImageUploader";
import { SettingsPanel } from "@/components/SettingsPanel";
import { ResultView } from "@/components/ResultView";
import { useCompressImage } from "@/hooks/use-compress-image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [targetKB, setTargetKB] = useState(100);
  const { status, progress, result, compress, reset } = useCompressImage();

  const handleUpload = (file: File) => {
    compress(file, targetKB);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background/50 relative overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute top-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Header */}
      <header className="w-full border-b border-border/40 bg-background/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-primary to-blue-500 text-white p-1.5 rounded-lg shadow-sm">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              ImgShrink
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-gradient pb-2 leading-tight">
            Compress Image to{" "}
            <span className="text-gradient-primary">{targetKB}KB</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Free online tool to reduce image file size instantly without losing
            quality. Everything happens securely in your browser.
          </p>
        </div>

        {/* Top Ad */}
        <div className="flex flex-col md:flex-row gap-4 w-full mb-8">
          <AdPlaceholder
            slot="1490444822"
            className="h-[90px] flex-1"
            label="Top Banner Advertisement 1"
          />
          <AdPlaceholder
            slot="2784179345"
            className="h-[90px] flex-1 hidden md:flex"
            label="Top Banner Advertisement 2"
          />
        </div>

        {/* Main Application Area */}
        <div className="w-full max-w-3xl mx-auto mb-12 relative">
          <SettingsPanel
            targetKB={targetKB}
            setTargetKB={setTargetKB}
            disabled={status === "compressing"}
          />

          <div className="glass-card rounded-3xl p-6 md:p-8 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              {status === "idle" || status === "error" ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex flex-col items-center justify-center"
                >
                  <ImageUploader
                    onUpload={handleUpload}
                    disabled={status === "compressing"}
                  />
                </motion.div>
              ) : status === "compressing" ? (
                <motion.div
                  key="compressing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full flex flex-col items-center justify-center py-20"
                >
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                    <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Squishing pixels...
                  </h3>
                  <p className="text-muted-foreground mb-6 text-center max-w-sm">
                    Running advanced compression algorithms right in your
                    browser.
                  </p>

                  {/* Fake progress bar for visual feedback since real progress can jump quickly */}
                  <div className="w-full max-w-md h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: `${Math.max(10, progress)}%` }}
                      transition={{ ease: "linear" }}
                    />
                  </div>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <ResultView result={result} onReset={reset} />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar/Content Ads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-16">
          <AdPlaceholder
            className="h-[250px]"
            label="In-Content Advertisement 1"
          />
          <AdPlaceholder
            className="h-[250px]"
            label="In-Content Advertisement 2"
          />
        </div>

        {/* Features / SEO Content */}
        <section className="w-full mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why use our image compressor?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We built this tool to solve a simple problem: reducing image sizes
              quickly without compromising privacy or quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-background/50 border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">100% Private</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Your images never leave your device. All compression happens
                  locally in your browser using WebAssembly. No server uploads.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  By utilizing your device's multi-core CPU, compression happens
                  almost instantly. No waiting for server queues.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center mb-4">
                  <ImageIcon2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Quality</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our algorithm automatically finds the perfect balance between
                  file size and visual quality to hit your target KB.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className="w-full max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <Accordion
            type="single"
            collapsible
            className="w-full bg-card border border-border rounded-2xl px-6 py-2 shadow-sm"
          >
            <AccordionItem value="item-1" className="border-b-border/50">
              <AccordionTrigger className="text-left font-semibold text-lg py-5 hover:no-underline hover:text-primary transition-colors">
                How do I compress an image to exactly 100KB?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
                Simply use the slider above to set your target size to 100KB,
                then drag and drop your image. Our tool will automatically
                adjust the image resolution and quality to achieve a file size
                under 100KB while maintaining the best possible visual fidelity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b-border/50">
              <AccordionTrigger className="text-left font-semibold text-lg py-5 hover:no-underline hover:text-primary transition-colors">
                Are my images uploaded to a server?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
                No! Unlike many other tools, our image compressor works entirely
                offline within your browser. Your images never leave your
                device, ensuring 100% privacy and security for your personal or
                professional photos.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b-border/50">
              <AccordionTrigger className="text-left font-semibold text-lg py-5 hover:no-underline hover:text-primary transition-colors">
                Which image formats are supported?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
                Our tool currently supports the most common web image formats:
                JPEG (.jpg, .jpeg), PNG (.png), and WebP (.webp). When you
                download the compressed image, it will maintain its original
                format.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-none">
              <AccordionTrigger className="text-left font-semibold text-lg py-5 hover:no-underline hover:text-primary transition-colors">
                Why is the final size sometimes slightly above or below my
                target?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
                Image compression algorithms (like JPEG compression) are not
                perfectly exact. We aim to get as close to your target size as
                possible without drastically destroying the image quality. If it
                misses the target, you can always try adjusting the slider and
                compressing again.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Bottom Ad */}
        <div className="flex flex-col md:flex-row gap-4 w-full mb-12">
          <AdPlaceholder
            slot="9158016007"
            className="h-[90px] flex-1"
            label="Bottom Banner Advertisement 1"
          />
          <AdPlaceholder
            slot="6531852665"
            className="h-[90px] flex-1 hidden md:flex"
            label="Bottom Banner Advertisement 2"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border/40 bg-card py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-foreground">
            <ImageIcon className="w-4 h-4 text-primary" />
            <span className="font-display font-semibold text-sm">
              ImgShrink
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Free Online Image Compressor. No
            rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
