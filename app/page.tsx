"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FeatureSection } from "@/components/feature-section";
import { ProcessSteps } from "@/components/process-steps";
import { AddressForm } from "@/components/address-form";
import { SuccessMessage } from "@/components/success-message";
import { ChevronDown, ArrowRight, Layers, LucideShieldCheck } from "lucide-react";
import { ChainAddressInfo } from "@/lib/utils";
import { getChainById, chains } from "@/lib/chains";
import { submitChainAddress } from "@/lib/supabase";

export default function Home() {
  const [submittedInfo, setSubmittedInfo] = useState<ChainAddressInfo | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Function to generate share text
  const generateShareText = (chainId: number) => {
    const chain = getChainById(chainId);
    return `I'm analyzing my ${chain?.name || ""} onchain identity on AiDrop! In two weeks, I'll receive an onchain MBTI NFT in my wallet. Join and try it yourself!`;
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
        const errorMessage = "Invalid address format.";
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
      console.error("Error occurred while saving data:", error);
      
      // Set user-friendly error message
      const errorMessage = error instanceof Error 
        ? "Problem occurred while saving: " + error.message.split(":")[0]  // Limit detailed error message
        : "Error occurred while submitting address. Please try again.";
      
      setSubmitError(errorMessage);
      
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
        alert('Share text has been copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy to clipboard:', err);
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section - integrated with input form */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 z-0">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-400/10 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Supported chains display */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100 text-blue-600 text-sm font-medium">
                <Layers className="h-3.5 w-3.5" />
                <span>Supported Chains: {chains.length} chains including EVM and non-EVM chains</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left: Title and description */}
              <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Discover Your Multichain Onchain Identity
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8">
                  Discover your unique digital identity by AI analysis of your activities across all EVM and non-EVM chains you use. We analyze your activity patterns across all chains, including non-EVM chains like Solana and Sui.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1.5 rounded-full text-sm font-bold animate-pulse">
                    <LucideShieldCheck className="h-4 w-4" />
                    <span>Free analysis limited to April 2025!</span>
                  </div>
                  <a 
                    href="#features" 
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    <span>Explore Features</span>
                    <ChevronDown className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Right: Input form */}
              <div className="lg:w-1/2 w-full max-w-md mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl">
                  {/* Error message display */}
                  {submitError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {submitError}
                    </div>
                  )}
                  
                  {submittedInfo ? (
                    <div className="mt-8 flex flex-col items-center">
                      <SuccessMessage chainId={submittedInfo.chainId} address={submittedInfo.address} />
                      <div className="mt-6 text-center">
                        <p className="text-gray-700 mb-4">
                          Analysis results will be provided as an NFT minted to your provided wallet address in about 2 weeks. It may take longer depending on circumstances.
                        </p>
                        <div className="flex justify-center gap-4 mt-4">
                          <button
                            onClick={() => shareToTelegram(submittedInfo.chainId)}
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                            aria-label="Share on Telegram"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21.8 5.1c-.1-.3-.3-.5-.5-.7-.4-.2-.8-.3-1.3-.2 0 0-18 6.4-18.7 7.1-.3.3-.3.6-.3.8.1.5.5.7.9.9.6.2 1.5.5 1.5.5l4.7 1.4c.2.7 1.1 3.8 1.3 4.5.1.4.3.9.6 1 .3.2.6.1.8 0 .6-.2 1-.7 1-.7l2.6 2.1c.5.4 1.2.3 1.4.3.8-.2.9-1 .9-1s2.8-11.2 2.9-12.6c0-.2 0-.3 0-.5-.1-.4-.2-.5-.3-.7zm-3.2 2L9.9 15l-.3 3.4L8 14l10.6-6.9z" fill="currentColor" strokeWidth="0"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => shareToTwitter(submittedInfo.chainId)}
                            className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
                            aria-label="Share on X(Twitter)"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => copyToClipboard(submittedInfo.chainId)}
                            className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
                            aria-label="Copy text"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold mb-2">What's My Onchain Identity?</h2>
                        <p className="text-gray-600">Enter your chain and address to receive your unique NFT</p>
                      </div>
                      <AddressForm onSubmit={handleAddressSubmit} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <FeatureSection />
          </div>
        </section>

        {/* Process section */}
        <section id="process" className="py-20">
          <ProcessSteps />
        </section>

        {/* Call to action section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Start Your Analysis Now</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Want to discover what characteristics your onchain activities have? Choose any chain, whether Ethereum, Solana, Sui, or others, and start right now.
            </p>
            <div className="flex flex-col items-center gap-4">
              <a 
                href="#top" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
              >
                <span>Start Analysis</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <p className="text-xs font-semibold text-blue-600">Don't miss the free analysis opportunity limited to April 2025!</p>
              <p className="text-xs text-gray-600 mt-1">Analysis results will be provided as an NFT minted to your wallet address in about 2 weeks</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
