"use client";

import { useState } from "react";
import { Footer } from "@/components/footer";
import { FeatureSection } from "@/components/feature-section";
import { ProcessSteps } from "@/components/process-steps";
import { AddressForm } from "@/components/address-form";
import { SuccessMessage } from "@/components/success-message";
import { ChevronDown, ArrowRight, Layers, LucideShieldCheck, ChevronRight, Copy, Twitter, Send, Cpu, Sparkles, ShieldCheck, Settings } from "lucide-react";
import { ChainAddressInfo } from "@/lib/utils";
import { getChainById, chains } from "@/lib/chains";
import { submitChainAddress } from "@/lib/supabase";
import Link from "next/link";

// Placeholder for a potential data visualization component
const DataFlowVisualization = () => (
  <div className="aspect-video bg-secondary/50 rounded-lg flex items-center justify-center text-muted-foreground">
    [Data Flow Visualization Placeholder]
  </div>
);

// Placeholder for an NFT card component
const NftCardPlaceholder = ({ index }: { index: number }) => (
  <div className="aspect-[3/4] bg-card border border-border/50 rounded-xl p-4 flex flex-col justify-end shadow-lg hover:shadow-primary/20 transition-shadow duration-300 relative overflow-hidden">
     {/* Neon glow effect */}
     <div className="absolute inset-0 opacity-10 animate-pulse-glow"></div>
    <div className="relative z-10">
      <h3 className="font-semibold text-lg mb-1 text-primary">Data Portrait #{index + 1}</h3>
      <p className="text-sm text-muted-foreground">Unique Traits: [...]</p>
    </div>
  </div>
);

export default function Home() {
  const [submittedInfo, setSubmittedInfo] = useState<ChainAddressInfo | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Function to generate share text
  const generateShareText = (chainId: number) => {
    const chain = getChainById(chainId);
    return `I'm minting my unique 'Data Portrait' NFT based on my ${chain?.name || ''} onchain activity with AiDrop! See what your data reveals:`;
  };

  const handleAddressSubmit = async (data: ChainAddressInfo) => {
    // Reset previous error state
    setSubmitError(null);
    
    try {
      const chain = getChainById(data.chainId);
      
      if (!chain) {
        const errorMessage = "Selected chain information not found.";
        setSubmitError(errorMessage);
        return;
      }
      
      // Simple address format validation (example: minimum length)
      if (data.address.trim().length < 10) {
        const errorMessage = "Please enter a valid wallet address.";
        setSubmitError(errorMessage);
        return;
      }
      
      // Save data to Supabase
      await submitChainAddress(
        data.chainId, 
        data.address, 
        chain.isEVM, 
        chain.name
      );
            
      // Update state
      setSubmittedInfo(data);
    } catch (error) {
      console.error("Submission Error:", error);
      
      // Set user-friendly error message
      const message = error instanceof Error ? error.message.split(":")[0] : "An unknown error occurred.";
      setSubmitError(`Submission failed: ${message}. Please try again.`);
      
      // Display error in UI (changed from alert to inline method)
    }
  };

  // Telegram share function
  const shareToTelegram = (chainId: number) => {
    const text = generateShareText(chainId);
    window.open(`https://t.me/share/url?url=${encodeURIComponent("https://aidrop.me")}&text=${encodeURIComponent(text)}`);
  };

  // Twitter share function
  const shareToTwitter = (chainId: number) => {
    const text = generateShareText(chainId);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent("https://aidrop.me")}`);
  };

  // Clipboard copy function
  const copyToClipboard = (chainId: number) => {
    const text = generateShareText(chainId) + " https://aidrop.me";
    navigator.clipboard.writeText(text)
      .then(() => {
        // Better method would be to use toast message
        alert('Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Copy failed:', err);
      });
  };

  return (
    <>
      {/* === Hero Section === */}
      <section id="top" className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
         {/* Subtle Animated Gradient Background */}
         <div aria-hidden="true" className="absolute inset-0 z-0 opacity-20">
           <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/30 animate-[spin_20s_linear_infinite]" />
         </div>
         {/* Noise overlay */}
         <div aria-hidden="true" className="absolute inset-0 z-0 opacity-[0.03] bg-[url('/noise.png')]" style={{ backgroundRepeat: 'repeat' }}></div>

        {/* Admin Link (상단 우측에 배치) */}
        <div className="absolute top-4 right-4 z-20">
          <Link 
            href="/admin/campaigns" 
            className="flex items-center gap-1 px-3 py-1.5 bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white rounded-full text-sm transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>관리자</span>
          </Link>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
               <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/30">
                  <Sparkles className="h-4 w-4" />
                  <span>AI-Powered Onchain Identity Analysis</span>
                </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Mint Your Unique <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Data Portrait NFT</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Unlock the story hidden in your wallet. AiDrop analyzes your multichain activity using AI to generate a unique, personalized NFT reflecting your onchain identity.
              </p>
               <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-green-400 mb-8 font-semibold animate-pulse">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Limited Free Minting Available!</span>
                </div>
            </div>

            {/* Right: Form / Success Message */}
            <div className="w-full max-w-md mx-auto">
              <div className="bg-card/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-border/50 shadow-2xl shadow-primary/10">
                {submitError && (
                  <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm font-medium">
                    {submitError}
                  </div>
                )}

                {submittedInfo ? (
                  <div className="text-center">
                    <SuccessMessage chainId={submittedInfo.chainId} address={submittedInfo.address} />
                     <p className="text-muted-foreground text-sm mt-4 mb-5">
                       Your Data Portrait NFT is being generated and will be minted to your wallet in ~2 weeks. Share your journey!
                     </p>
                     {/* Share Buttons */}
                     <div className="flex justify-center gap-3">
                        <button onClick={() => shareToTelegram(submittedInfo.chainId)} className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors" aria-label="Share on Telegram"><Send size={20} /></button>
                        <button onClick={() => shareToTwitter(submittedInfo.chainId)} className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors" aria-label="Share on Twitter"><Twitter size={20} /></button>
                        <button onClick={() => copyToClipboard(submittedInfo.chainId)} className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors" aria-label="Copy Link"><Copy size={20} /></button>
                     </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-2 text-center text-foreground">Start Your Analysis</h2>
                    <p className="text-muted-foreground text-center mb-6 text-sm">Enter wallet address to begin.</p>
                    <AddressForm onSubmit={handleAddressSubmit} />
                     <p className="text-xs text-muted-foreground text-center mt-4">Supports {chains.length}+ EVM & Non-EVM chains.</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === How It Works / Features Section === */}
      <FeatureSection />

      {/* === Process Steps === */}
      <ProcessSteps />

      {/* === Footer === */}
      <Footer />
    </>
  );
}
