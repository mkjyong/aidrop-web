"use client";

import { CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chain, getChainById, getExplorerAddressUrl } from "@/lib/chains";
import { useMemo } from "react";

interface SuccessMessageProps {
  chainId: number;
  address: string;
}

export function SuccessMessage({ chainId, address }: SuccessMessageProps) {
  // Memoize chain info to prevent unnecessary recalculations
  const chain: Chain | undefined = useMemo(() => getChainById(chainId), [chainId]);
  
  // Address formatting function (reusable)
  const formatAddress = (address: string): string => {
    if (!address || address.length < 8) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  // View in explorer functionality
  const handleViewInExplorer = () => {
    if (!chain || !address) return;
    
    try {
      const url = getExplorerAddressUrl(chain, address);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Cannot open explorer URL:", error);
    }
  };

  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
        <CheckCircle className="h-10 w-10 text-green-500" />
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gray-800">
          Analysis has started!
        </h3>
        <div className="flex flex-col items-center gap-1">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100 text-blue-700 font-medium text-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            {chain?.name || "Unknown chain"}
          </div>
          <p className="text-gray-600 text-lg">
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-blue-600">
              {formatAddress(address)}
            </span>
            is being analyzed for onchain personality
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-5 w-full">
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800">What's next?</h4>
          <p className="text-gray-600 text-sm">
            Once the analysis is complete, we'll issue your unique onchain personality type NFT to your provided wallet address in about 2 weeks.
            (It may take longer depending on circumstances)
          </p>
          <div className="inline-flex flex-wrap gap-3 pt-1">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white border-blue-200 hover:bg-blue-50 text-blue-600"
              onClick={handleViewInExplorer}
              disabled={!chain || !address}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              View in Explorer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 