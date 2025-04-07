"use client";

import { Brain, Cpu, Target, Zap, Layers, CircleCheckBig } from "lucide-react";

const features = [
  {
    icon: <Layers className="h-8 w-8" />,
    title: "Multichain Analysis",
    description: "Comprehensively analyze activities across all major blockchains, including not only Ethereum chains but also non-EVM chains such as Solana and Sui."
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Onchain Personality Analysis",
    description: "Analyze transaction data to understand your onchain personality. Find out if you're a DeFi user, a gaming user, or an NFT collector."
  },
  {
    icon: <Cpu className="h-8 w-8" />,
    title: "AI-Based Data Processing",
    description: "Utilize the latest AI technology to analyze vast onchain data and discover meaningful patterns. Confirm your unique onchain identity."
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Customized Airdrops",
    description: "No more indiscriminate airdrops with accurate targeting based on chain-specific activity patterns and user characteristics. Discover projects that match your interests and activities."
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Onchain MBTI NFT",
    description: "Based on the analysis results, we issue an NFT representing your unique onchain personality type. Show off your onchain identity."
  },
  {
    icon: <CircleCheckBig className="h-8 w-8" />,
    title: "Cross-Chain Analysis",
    description: "Comprehensively analyze activities across multiple chains to identify cross-chain activity patterns and correlations. Check what activities you primarily engage in on specific chains."
  }
];

export function FeatureSection() {
  return (
    <div>
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center mb-4 px-4 py-1 rounded-full bg-blue-50 border border-blue-100">
          <span className="text-blue-600 font-medium text-sm">Free analysis in progress, limited to April 2025!</span>
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI-Based Multichain Data Analysis
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover your unique digital identity by analyzing onchain activities across all chains, 
          from EVM chains to Solana, Sui, and NEAR. No more wasteful airdrops.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="group p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex flex-col h-full relative z-10">
              <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 w-fit">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 flex-grow">{feature.description}</p>
              
              <div className="h-1 w-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-6 group-hover:w-20 transition-all duration-300" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-blue-50 border border-blue-100">
          <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-blue-700 font-medium">Free multichain analysis in progress, limited to April 2025</span>
        </div>
      </div>
    </div>
  );
} 