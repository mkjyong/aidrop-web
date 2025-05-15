"use client";

import { WalletCards, UserCircle, FileText, BarChart4, Sparkles } from "lucide-react";

// Process steps data
const steps = [
  {
    id: 1,
    icon: <WalletCards className="h-6 w-6" />,
    title: "Submit Wallet Address",
    description: "Input the blockchain network and wallet address you want to analyze."
  },
  {
    id: 2,
    icon: <FileText className="h-6 w-6" />,
    title: "On-chain Data Collection",
    description: "AI automatically collects transaction data and activity patterns for the submitted wallet."
  },
  {
    id: 3,
    icon: <BarChart4 className="h-6 w-6" />,
    title: "Data Analysis and Categorization",
    description: "Analyze collected data to classify user on-chain tendencies and activity patterns."
  },
  {
    id: 4,
    icon: <UserCircle className="h-6 w-6" />,
    title: "Custom Report Generation",
    description: "Provide a visual report based on the analysis results of the user's on-chain tendencies and characteristics."
  },
  {
    id: 5,
    icon: <Sparkles className="h-6 w-6" />,
    title: "Data Portrait NFT Issuance",
    description: "Create a unique NFT encapsulating the user's on-chain identity and mint it to their wallet."
  },
];

// ProcessSteps component
export function ProcessSteps() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-semibold uppercase tracking-wider mb-2 block">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your On-chain Analysis in 5 Simple Steps
          </h2>
          <p className="text-muted-foreground text-lg">
            Our AI-powered platform simplifies the process of understanding your on-chain identity.
            Follow these steps to get your personalized analysis and unique NFT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center text-center">
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 shadow-lg">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>

              {/* Connecting line for desktop view */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border" style={{ transform: 'translateX(50%)' }}>
                  <div className="absolute top-1/2 left-0 w-2 h-2 bg-border rounded-full transform -translate-y-1/2"></div>
                  <div className="absolute top-1/2 right-0 w-2 h-2 bg-border rounded-full transform -translate-y-1/2"></div>
                </div>
              )}
              
              {/* Vertical line for mobile view */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute top-16 left-1/2 w-0.5 h-full bg-border" style={{ transform: 'translateX(-50%)', top: '4rem', bottom: '-2rem' }}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 