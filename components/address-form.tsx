"use client";

import { useState } from "react";
import { Form, FormField, FormMessage, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectGroup,
  SelectItem, 
  SelectLabel,
  SelectSeparator,
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { validateAddressByChainId, ChainAddressInfo } from "@/lib/utils";
import { chains, getEVMChains, getNonEVMChains, getChainById } from "@/lib/chains";
import { Loader2 } from "lucide-react";

interface AddressFormProps {
  onSubmit: (data: ChainAddressInfo) => void;
  isSubmitting?: boolean;
  submitError?: string | null;
}

export function AddressForm({ onSubmit, isSubmitting = false, submitError = null }: AddressFormProps) {
  const [address, setAddress] = useState("");
  const [selectedChainId, setSelectedChainId] = useState<number | null>(null);
  const [isAddressInvalid, setIsAddressInvalid] = useState(false);
  const [isChainInvalid, setIsChainInvalid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const evmChains = getEVMChains();
  const nonEvmChains = getNonEVMChains();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    let hasError = false;
    
    if (!selectedChainId) {
      setIsChainInvalid(true);
      hasError = true;
    } else {
      setIsChainInvalid(false);
    }

    if (!address) {
      setIsAddressInvalid(true);
      hasError = true;
    } else if (!validateAddressByChainId(selectedChainId!, address)) {
      setIsAddressInvalid(true);
      hasError = true;
    } else {
      setIsAddressInvalid(false);
    }

    if (hasError) return;

    setIsSubmitted(true);
    onSubmit({ 
      chainId: selectedChainId!, 
      address 
    });
  };

  const getSelectedChainName = () => {
    if (!selectedChainId) return null;
    const chain = chains.find(c => c.id === selectedChainId);
    return chain ? chain.name : null;
  };

  const getAddressPlaceholder = () => {
    if (!selectedChainId) return "0x...";
    
    const chain = getChainById(selectedChainId);
    if (!chain) return "0x...";
    
    switch (chain.id) {
      case 2011: // Solana
        return "Solana 주소 (예: 3XdZWxhwsx...)";
      case 3030: // Sui
        return "0x... (Sui 주소, 64-66자)";
      case 4040: // NEAR
        return "계정ID.near";
      default: // EVM 체인
        return "0x... (42자)";
    }
  };

  const getAddressErrorMessage = () => {
    if (!selectedChainId) return "유효한 주소를 입력해주세요";
    
    const chain = getChainById(selectedChainId);
    if (!chain) return "유효한 주소를 입력해주세요";
    
    switch (chain.id) {
      case 2011: // Solana
        return "유효한 Solana 주소를 입력해주세요";
      case 3030: // Sui
        return "유효한 Sui 주소를 입력해주세요 (0x로 시작하는 64-66자리)";
      case 4040: // NEAR
        return "유효한 NEAR 주소를 입력해주세요 (계정ID.near 형식)";
      default: // EVM 체인
        return "유효한 주소를 입력해주세요 (0x로 시작하는 42자리)";
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="space-y-5">
        {/* Supabase 제출 오류 메시지 */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
            {submitError}
          </div>
        )}

        {/* 체인 선택 */}
        <FormField name="chain">
          <div className="space-y-3">
            <FormLabel className="text-base font-medium">체인 선택</FormLabel>
            <Select 
              onValueChange={(value) => {
                setSelectedChainId(Number(value));
                setIsChainInvalid(false);
              }} 
              disabled={isSubmitted}
            >
              <SelectTrigger 
                className={`h-11 ${isChainInvalid ? "border-red-500 focus-visible:ring-red-300" : "border-blue-200 focus-visible:ring-blue-200"} transition-all bg-white/90 shadow-sm`}
              >
                <SelectValue placeholder="분석할 체인을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-blue-600 font-medium">EVM 체인</SelectLabel>
                  {evmChains.map(chain => (
                    <SelectItem 
                      key={chain.id} 
                      value={chain.id.toString()}
                    >
                      {chain.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
                
                <SelectSeparator />
                
                <SelectGroup>
                  <SelectLabel className="text-purple-600 font-medium">Non-EVM 체인</SelectLabel>
                  {nonEvmChains.map(chain => (
                    <SelectItem 
                      key={chain.id} 
                      value={chain.id.toString()}
                    >
                      {chain.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {isChainInvalid && (
              <FormMessage>
                체인을 선택해주세요
              </FormMessage>
            )}
            
            {selectedChainId && (
              <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                <span>{getSelectedChainName()} 체인을 선택하셨습니다</span>
              </div>
            )}
          </div>
        </FormField>

        {/* 주소 입력 */}
        <FormField name="address">
          <div className="space-y-3">
            <FormLabel className="text-base font-medium">지갑 주소</FormLabel>
            <div className="relative">
              <Input
                placeholder={getAddressPlaceholder()}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setIsAddressInvalid(false);
                }}
                className={`text-base py-6 px-4 ${isAddressInvalid ? "border-red-500 focus-visible:ring-red-300" : "border-blue-200 focus-visible:ring-blue-200"} transition-all bg-white/90 shadow-sm`}
                disabled={isSubmitted}
              />
              {address && !isAddressInvalid && !isSubmitted && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                </div>
              )}
            </div>
            {isAddressInvalid && (
              <FormMessage>
                {getAddressErrorMessage()}
              </FormMessage>
            )}
          </div>
        </FormField>

        <Button 
          type="submit" 
          variant="gradient" 
          size="lg" 
          className="w-full font-bold py-6 text-base transition-all relative overflow-hidden mt-2"
          disabled={isSubmitted}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              분석 중...
            </span>
          ) : isSubmitted ? (
            "제출 완료"
          ) : (
            <span className="flex items-center justify-center gap-1">
              나의 온체인 성격 분석 받기
              <svg className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 12H4.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          )}
        </Button>
        
        <div className="space-y-2">
          <p className="text-xs text-center text-gray-500">
            * 개인정보는 안전하게 보호되며, 분석 목적으로만 사용됩니다
          </p>
          <p className="text-xs text-center font-medium text-blue-600">
            2025년 4월 한정 무료 분석 진행 중!
          </p>
        </div>
      </div>
    </Form>
  );
} 