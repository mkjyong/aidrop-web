"use client";

import { useState, useEffect } from "react";
import { Save, Wallet, Shield, Key, LoaderCircle, HelpCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";

export default function AdminSettingsPage() {
  // 설정 상태
  const [settings, setSettings] = useState({
    apiKey: "",
    walletAddress: "",
    adminEmail: "",
    notificationEnabled: true,
    automaticDistribution: false,
    maxCampaignsPerMonth: 10,
    gasLimit: 200000,
    testMode: true,
  });
  
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // 에러 상태
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // 설정 불러오기 (모의)
  useEffect(() => {
    const loadSettings = async () => {
      // 실제로는 API 호출하여 설정 불러오기
      setTimeout(() => {
        setSettings({
          apiKey: "ak_23xTs9F7hPqLcMe8K",
          walletAddress: "0x7a87c6a698598f067a2e01cffbafaef9a0a1c1b5",
          adminEmail: "admin@example.com",
          notificationEnabled: true,
          automaticDistribution: false,
          maxCampaignsPerMonth: 10,
          gasLimit: 200000,
          testMode: true,
        });
        setIsLoading(false);
      }, 800);
    };
    
    loadSettings();
  }, []);
  
  // 설정 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
    
    // 에러 초기화
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    
    // 저장 성공 메시지 초기화
    if (saveSuccess) {
      setSaveSuccess(false);
    }
  };
  
  // 숫자 입력 핸들러
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({ 
      ...settings, 
      [name]: value === "" ? 0 : parseInt(value, 10) 
    });
    
    // 에러 초기화
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };
  
  // 체크박스 변경 핸들러
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings({ ...settings, [name]: checked });
  };
  
  // API 키 생성 핸들러
  const handleGenerateApiKey = () => {
    const randomKey = `ak_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
    setSettings({ ...settings, apiKey: randomKey });
  };
  
  // 설정 저장 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    const newErrors: Record<string, string> = {};
    
    if (!settings.walletAddress.trim()) {
      newErrors.walletAddress = "지갑 주소는 필수입니다";
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(settings.walletAddress)) {
      newErrors.walletAddress = "유효한 이더리움 지갑 주소를 입력해주세요";
    }
    
    if (!settings.adminEmail.trim()) {
      newErrors.adminEmail = "관리자 이메일은 필수입니다";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.adminEmail)) {
      newErrors.adminEmail = "유효한 이메일 주소를 입력해주세요";
    }
    
    if (settings.maxCampaignsPerMonth <= 0) {
      newErrors.maxCampaignsPerMonth = "캠페인 수는 0보다 커야 합니다";
    }
    
    if (settings.gasLimit <= 0) {
      newErrors.gasLimit = "가스 제한은 0보다 커야 합니다";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // 저장 처리 (모의)
    setIsSaving(true);
    
    // 실제로는 API 호출
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      // 5초 후 성공 메시지 숨기기
      setTimeout(() => {
        setSaveSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto pt-16 pb-24 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <LoaderCircle className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">설정을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto pt-16 pb-24 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">관리자 설정</h1>
          <p className="text-muted-foreground">
            캠페인 관리 및 에어드랍 설정을 구성하세요
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 사이드바 네비게이션 */}
          <div className="md:col-span-1">
            <div className="border rounded-lg overflow-hidden bg-white">
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <a 
                      href="#general" 
                      className="flex items-center px-4 py-3 rounded-md bg-muted text-primary font-medium"
                    >
                      <Shield className="h-5 w-5 mr-2" />
                      <span>일반 설정</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#wallet" 
                      className="flex items-center px-4 py-3 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <Wallet className="h-5 w-5 mr-2" />
                      <span>지갑 설정</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#api" 
                      className="flex items-center px-4 py-3 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <Key className="h-5 w-5 mr-2" />
                      <span>API 설정</span>
                    </a>
                  </li>
                </ul>
              </nav>
              
              <div className="px-4 py-3 border-t">
                <div className="flex items-start bg-blue-50 text-blue-800 rounded-md p-3">
                  <HelpCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">도움이 필요하신가요?</p>
                    <p className="text-xs mt-1">자세한 설명은 관리자 가이드를 참조하세요.</p>
                    <a
                      href="#"
                      className="text-xs inline-flex items-center mt-2 text-blue-600 hover:underline"
                    >
                      <span>가이드 보기</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 메인 설정 폼 */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="border rounded-lg bg-white overflow-hidden">
              {/* 일반 설정 섹션 */}
              <div id="general" className="border-b">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">일반 설정</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        관리자 이메일
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="email"
                        name="adminEmail"
                        value={settings.adminEmail}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50
                          ${errors.adminEmail ? "border-red-500" : "border-gray-300"}`}
                        placeholder="관리자 이메일 주소"
                      />
                      {errors.adminEmail && (
                        <p className="text-red-500 text-xs mt-1">{errors.adminEmail}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notificationEnabled"
                        name="notificationEnabled"
                        checked={settings.notificationEnabled}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 accent-primary"
                      />
                      <label htmlFor="notificationEnabled" className="text-sm ml-2">
                        이메일 알림 활성화 (캠페인 시작, 종료 및 오류 발생 시)
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        월간 최대 캠페인 수
                      </label>
                      <input
                        type="number"
                        name="maxCampaignsPerMonth"
                        value={settings.maxCampaignsPerMonth || ""}
                        onChange={handleNumberChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50
                          ${errors.maxCampaignsPerMonth ? "border-red-500" : "border-gray-300"}`}
                        placeholder="10"
                        min="1"
                      />
                      {errors.maxCampaignsPerMonth && (
                        <p className="text-red-500 text-xs mt-1">{errors.maxCampaignsPerMonth}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="testMode"
                        name="testMode"
                        checked={settings.testMode}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 accent-primary"
                      />
                      <label htmlFor="testMode" className="text-sm ml-2">
                        테스트 모드 (실제 블록체인 트랜잭션을 전송하지 않음)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 지갑 설정 섹션 */}
              <div id="wallet" className="border-b">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">지갑 설정</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        관리자 지갑 주소
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="walletAddress"
                        value={settings.walletAddress}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50
                          ${errors.walletAddress ? "border-red-500" : "border-gray-300"}`}
                        placeholder="0x..."
                      />
                      {errors.walletAddress && (
                        <p className="text-red-500 text-xs mt-1">{errors.walletAddress}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        에어드랍 비용이 이 지갑에서 차감됩니다
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        가스 제한 (Gas Limit)
                      </label>
                      <input
                        type="number"
                        name="gasLimit"
                        value={settings.gasLimit || ""}
                        onChange={handleNumberChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50
                          ${errors.gasLimit ? "border-red-500" : "border-gray-300"}`}
                        placeholder="200000"
                        min="21000"
                      />
                      {errors.gasLimit && (
                        <p className="text-red-500 text-xs mt-1">{errors.gasLimit}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="automaticDistribution"
                        name="automaticDistribution"
                        checked={settings.automaticDistribution}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 accent-primary"
                      />
                      <label htmlFor="automaticDistribution" className="text-sm ml-2">
                        자동 배포 활성화 (캠페인 시작 시 자동으로 에어드랍 실행)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* API 설정 섹션 */}
              <div id="api">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">API 설정</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        API 키
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="apiKey"
                          value={settings.apiKey}
                          onChange={handleInputChange}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="API 키가 없습니다"
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={handleGenerateApiKey}
                          className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          생성
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        외부 서비스에서 API 호출 시 필요합니다
                      </p>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-sm">
                        API 문서 및 사용 예제는 
                        <a href="#" className="text-primary hover:underline ml-1 mr-1">
                          개발자 포털
                        </a>
                        에서 확인할 수 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 저장 버튼 */}
              <div className="flex justify-end gap-4 p-6 bg-muted border-t">
                <Link
                  href="/admin/campaigns"
                  className="px-6 py-2 border rounded-lg hover:bg-white transition-colors"
                >
                  취소
                </Link>
                
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center"
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                      <span>저장 중...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      <span>설정 저장</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* 저장 성공 메시지 */}
              {saveSuccess && (
                <div className="px-6 pb-6">
                  <div className="p-3 bg-green-50 text-green-700 rounded-lg">
                    설정이 성공적으로 저장되었습니다.
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 