import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 유효한 이더리움 주소인지 검증하는 함수
export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// 모든 EVM 기반 체인의 주소는 동일한 형식을 따르므로, 
// 동일한 검증 함수를 사용할 수 있습니다.
export function isValidEVMAddress(address: string): boolean {
  return isValidEthereumAddress(address);
}

// Sui 체인 주소 검증 (0x로 시작하는 64자리 또는 66자리 16진수)
export function isValidSuiAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{64,66}$/.test(address);
}

// Solana 체인 주소 검증 (base58 포맷, 32-44자)
export function isValidSolanaAddress(address: string): boolean {
  // 간단한 Base58 문자셋 확인 (정확한 길이 및 체크섬 검증이 필요할 수 있음)
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
}

// NEAR 체인 주소 검증 (계정 이름.near 형식)
export function isValidNearAddress(address: string): boolean {
  return /^[a-zA-Z0-9_-]+\.near$/.test(address);
}

// 선택된 체인에 따라 적절한 주소 검증 함수 사용
export function validateAddressByChainId(chainId: number, address: string): boolean {
  if (!address) return false;
  
  // 체인 ID에 따라 다른 검증 로직 적용
  switch (chainId) {
    // Solana
    case 2011:
      return isValidSolanaAddress(address);
    // Sui
    case 3030:
      return isValidSuiAddress(address);
    // NEAR
    case 4040:
      return isValidNearAddress(address);
    // 다른 EVM 체인들
    default:
      return isValidEVMAddress(address);
  }
}

export interface ChainAddressInfo {
  chainId: number;
  address: string;
}

// 체인 ID와 주소 정보가 모두 유효한지 검증합니다.
export function isValidChainAddress(chainId: number, address: string): boolean {
  if (!chainId) return false;
  return validateAddressByChainId(chainId, address);
} 