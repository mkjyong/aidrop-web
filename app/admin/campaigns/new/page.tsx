"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Info } from "lucide-react";

const userTypes = [
  { id: "collector", label: "수집가", description: "NFT 및 디지털 자산을 수집하는 경향이 있는 사용자" },
  { id: "trader", label: "트레이더", description: "거래 활동이 활발하고 토큰 스왑을 자주 하는 사용자" },
  { id: "pioneer", label: "개척자", description: "새로운 프로토콜과 체인을 먼저 사용해보는 얼리어답터" },
  { id: "builder", label: "빌더", description: "스마트 컨트랙트 배포나 개발 관련 활동을 하는 사용자" },
  { id: "analyst", label: "분석가", description: "온체인 데이터를 분석하고 정보를 기반으로 활동하는 사용자" }
];

const rewardTypes = [
  { id: "token", label: "토큰", description: "가상화폐 또는 토큰 보상" },
  { id: "nft", label: "NFT", description: "고유한 디지털 아이템 보상" },
  { id: "points", label: "포인트", description: "플랫폼 내 사용 가능한 포인트 보상" },
  { id: "discount", label: "할인", description: "서비스 이용 할인 혜택" }
];

interface FormData {
  name: string;
  description: string;
  targetUserTypes: string[];
  rewardType: string;
  rewardAmount: string;
  budget: string;
  startDate: string;
  endDate: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  targetUserTypes?: string;
  rewardType?: string;
  rewardAmount?: string;
  budget?: string;
  startDate?: string;
  endDate?: string;
  dates?: string;
}

const NewCampaignPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    targetUserTypes: [],
    rewardType: "",
    rewardAmount: "",
    budget: "",
    startDate: "",
    endDate: ""
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  
  // 입력값 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 입력 시 해당 필드 에러 초기화
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  // 체크박스 변경 처리
  const handleCheckboxChange = (id: string) => {
    setFormData(prev => {
      const updatedTypes = prev.targetUserTypes.includes(id)
        ? prev.targetUserTypes.filter(type => type !== id)
        : [...prev.targetUserTypes, id];
      
      return { ...prev, targetUserTypes: updatedTypes };
    });
    
    // 타겟 유저 타입 에러 초기화
    if (formErrors.targetUserTypes) {
      setFormErrors(prev => ({ ...prev, targetUserTypes: undefined }));
    }
  };
  
  // 폼 유효성 검사
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = "캠페인 이름을 입력해주세요";
    }
    
    if (!formData.description.trim()) {
      errors.description = "캠페인 설명을 입력해주세요";
    }
    
    if (formData.targetUserTypes.length === 0) {
      errors.targetUserTypes = "하나 이상의 타겟 유저 타입을 선택해주세요";
    }
    
    if (!formData.rewardType) {
      errors.rewardType = "보상 유형을 선택해주세요";
    }
    
    if (!formData.rewardAmount || isNaN(Number(formData.rewardAmount)) || Number(formData.rewardAmount) <= 0) {
      errors.rewardAmount = "유효한 보상 금액을 입력해주세요";
    }
    
    if (!formData.budget || isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) {
      errors.budget = "유효한 예산을 입력해주세요";
    }
    
    if (!formData.startDate) {
      errors.startDate = "시작 날짜를 선택해주세요";
    }
    
    if (!formData.endDate) {
      errors.endDate = "종료 날짜를 선택해주세요";
    }
    
    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      errors.dates = "종료 날짜는 시작 날짜보다 이후여야 합니다";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // 폼 제출 처리
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // API 호출 (이 부분은 실제 API 엔드포인트로 대체)
      await new Promise(resolve => setTimeout(resolve, 1500)); // 임시 지연
      console.log("캠페인 생성:", formData);
      
      // 성공 시 캠페인 목록 페이지로 이동
      router.push("/admin/campaigns?success=created");
    } catch (error) {
      console.error("캠페인 생성 실패:", error);
      alert("캠페인 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="p-8">
      <div className="mb-8">
        <Link 
          href="/admin/campaigns"
          className="text-indigo-600 hover:text-indigo-800 flex items-center mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          캠페인 목록으로 돌아가기
        </Link>
        <h1 className="text-2xl font-bold">새 캠페인 생성</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit} className="p-6">
          {/* 기본 정보 */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">기본 정보</h2>
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                캠페인 이름 *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="캠페인의 이름을 입력하세요"
                className={`w-full p-2 border rounded-md ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                캠페인 설명 *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="캠페인에 대한 상세 설명을 입력하세요"
                rows={4}
                className={`w-full p-2 border rounded-md ${formErrors.description ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formErrors.description && (
                <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
              )}
            </div>
          </div>
          
          {/* 타겟 유저 */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">타겟 유저 설정</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                타겟 유저 타입 *
              </label>
              {formErrors.targetUserTypes && (
                <p className="mb-2 text-sm text-red-600">{formErrors.targetUserTypes}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {userTypes.map(type => (
                  <div 
                    key={type.id}
                    className={`
                      border rounded-md p-3 cursor-pointer
                      ${formData.targetUserTypes.includes(type.id) 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-gray-300'}
                    `}
                    onClick={() => handleCheckboxChange(type.id)}
                  >
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id={`type-${type.id}`}
                        checked={formData.targetUserTypes.includes(type.id)}
                        onChange={() => {}}
                        className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                      />
                      <div className="ml-3">
                        <label htmlFor={`type-${type.id}`} className="font-medium text-gray-700">
                          {type.label}
                        </label>
                        <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 보상 설정 */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">보상 설정</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                보상 유형 *
              </label>
              {formErrors.rewardType && (
                <p className="mb-2 text-sm text-red-600">{formErrors.rewardType}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {rewardTypes.map(type => (
                  <div 
                    key={type.id}
                    className={`
                      border rounded-md p-3 cursor-pointer
                      ${formData.rewardType === type.id
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-gray-300'}
                    `}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, rewardType: type.id }));
                      if (formErrors.rewardType) {
                        setFormErrors(prev => ({ ...prev, rewardType: undefined }));
                      }
                    }}
                  >
                    <div className="flex items-start">
                      <input
                        type="radio"
                        id={`reward-${type.id}`}
                        name="rewardType"
                        checked={formData.rewardType === type.id}
                        onChange={() => {}}
                        className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded-full"
                      />
                      <div className="ml-3">
                        <label htmlFor={`reward-${type.id}`} className="font-medium text-gray-700">
                          {type.label}
                        </label>
                        <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <label htmlFor="rewardAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  보상 금액 *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="rewardAmount"
                    name="rewardAmount"
                    value={formData.rewardAmount}
                    onChange={handleInputChange}
                    placeholder="사용자당 보상 금액"
                    min="0"
                    step="1"
                    className={`w-full p-2 border rounded-md ${formErrors.rewardAmount ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">
                      {formData.rewardType === 'token' ? 'tokens' : 
                       formData.rewardType === 'points' ? 'points' : 
                       formData.rewardType === 'nft' ? 'items' : 
                       formData.rewardType === 'discount' ? '%' : ''}
                    </span>
                  </div>
                </div>
                {formErrors.rewardAmount && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.rewardAmount}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  총 예산 *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="총 캠페인 예산"
                    min="0"
                    step="1"
                    className={`w-full p-2 border rounded-md ${formErrors.budget ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">
                      {formData.rewardType === 'token' ? 'tokens' : 
                       formData.rewardType === 'points' ? 'points' : 
                       formData.rewardType === 'nft' ? 'items' : '$'}
                    </span>
                  </div>
                </div>
                {formErrors.budget && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.budget}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* 캠페인 일정 */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">캠페인 일정</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  시작 날짜 *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className={`w-full pl-10 p-2 border rounded-md ${formErrors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                {formErrors.startDate && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.startDate}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  종료 날짜 *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className={`w-full pl-10 p-2 border rounded-md ${formErrors.endDate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                {formErrors.endDate && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.endDate}</p>
                )}
              </div>
            </div>
            
            {formErrors.dates && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <Info className="h-4 w-4 mr-1" />
                {formErrors.dates}
              </p>
            )}
          </div>
          
          {/* 제출 버튼 */}
          <div className="flex justify-end pt-4 border-t">
            <Link 
              href="/admin/campaigns"
              className="bg-white text-gray-700 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 mr-2"
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700
                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
              `}
            >
              {isSubmitting ? '캠페인 생성 중...' : '캠페인 생성하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCampaignPage; 