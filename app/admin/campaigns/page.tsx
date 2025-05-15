"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { PlusCircle, Search, Filter, MoreHorizontal, ArrowUp, ArrowDown, LoaderCircle, Calendar, Users, Coins, Tag, ChevronDown, Plus, ArrowUpDown, Trash2, Edit, Eye, Download, RefreshCcw, AlertCircle, XCircle } from "lucide-react";
import { Footer } from "@/components/footer";
import { useRouter, useSearchParams } from "next/navigation";

// 캠페인 타입 정의
type CampaignStatus = "대기 중" | "진행 중" | "완료" | "취소" | "active" | "scheduled" | "paused" | "draft";

type Campaign = {
  id: string;
  name: string;
  targetUserTypes: string[];
  rewardType: string;
  rewardAmount: number;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  participants: number;
  claimed: number;
  conversionRate: number;
};

export default function CampaignsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const successMessage = searchParams.get("success");
  
  // 상태 관리
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | "전체">("전체");
  const [typeFilter, setTypeFilter] = useState<string | "전체">("전체");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showSuccess, setShowSuccess] = useState(false);
  
  // 캠페인 데이터 가져오기 (모의)
  useEffect(() => {
    const fetchCampaigns = async () => {
      // 실제로는 API 호출
      setTimeout(() => {
        const mockCampaigns: Campaign[] = [
          {
            id: "camp-123456",
            name: "2024 여름 NFT 수집가 에어드랍",
            targetUserTypes: ["수집가", "개척자"],
            rewardType: "토큰",
            rewardAmount: 100,
            startDate: "2024-06-01",
            endDate: "2024-06-30",
            status: "진행 중",
            participants: 256,
            claimed: 178,
            conversionRate: 69.5,
          },
          {
            id: "camp-234567",
            name: "DeFi 트레이더 보상 프로그램",
            targetUserTypes: ["트레이더"],
            rewardType: "NFT",
            rewardAmount: 1,
            startDate: "2024-07-01",
            endDate: "2024-07-15",
            status: "대기 중",
            participants: 0,
            claimed: 0,
            conversionRate: 0,
          },
          {
            id: "camp-345678",
            name: "빌더 커뮤니티 에어드랍",
            targetUserTypes: ["빌더", "분석가"],
            rewardType: "토큰",
            rewardAmount: 500,
            startDate: "2024-05-01",
            endDate: "2024-05-31",
            status: "완료",
            participants: 385,
            claimed: 342,
            conversionRate: 88.8,
          },
          {
            id: "camp-456789",
            name: "개척자 스페셜 리워드",
            targetUserTypes: ["개척자"],
            rewardType: "토큰",
            rewardAmount: 200,
            startDate: "2024-04-15",
            endDate: "2024-05-15",
            status: "취소",
            participants: 124,
            claimed: 82,
            conversionRate: 66.1,
          },
        ];
        
        setCampaigns(mockCampaigns);
        setFilteredCampaigns(mockCampaigns);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchCampaigns();
  }, []);
  
  useEffect(() => {
    if (successMessage) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  
  // 검색 및 필터링 기능
  useEffect(() => {
    let result = [...campaigns];
    
    // 검색 쿼리 적용
    if (searchQuery) {
      result = result.filter(campaign => 
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // 상태 필터 적용
    if (statusFilter !== "전체") {
      result = result.filter(campaign => campaign.status === statusFilter);
    }
    
    // 타입 필터 적용
    if (typeFilter !== "전체") {
      result = result.filter(campaign => campaign.targetUserTypes.includes(typeFilter));
    }
    
    // 정렬 적용
    result.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Campaign];
      let bValue: any = b[sortBy as keyof Campaign];
      
      // 숫자나 날짜 데이터 비교
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      // 문자열 비교
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
    
    setFilteredCampaigns(result);
  }, [campaigns, searchQuery, statusFilter, typeFilter, sortBy, sortOrder]);
  
  // 정렬 토글 핸들러
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };
  
  // 상태 태그 렌더링 함수
  const renderStatusBadge = (status: CampaignStatus) => {
    let style = "px-2 py-1 text-xs font-medium rounded-full ";
    
    switch (status) {
      case "대기 중":
        style += "bg-blue-100 text-blue-800";
        return <span className={style}>대기 중</span>;
      case "진행 중":
        style += "bg-green-100 text-green-800";
        return <span className={style}>진행 중</span>;
      case "완료":
        style += "bg-gray-100 text-gray-800";
        return <span className={style}>완료</span>;
      case "취소":
        style += "bg-red-100 text-red-800";
        return <span className={style}>취소</span>;
      default:
        return null;
    }
  };
  
  // 진행률 계산 함수
  const calculateProgress = (reached: number, target: number) => {
    if (target === 0) return 0;
    const progress = (reached / target) * 100;
    return Math.min(progress, 100);
  };
  
  // 리워드 타입 렌더링 함수
  const renderRewardType = (type: string) => {
    switch (type) {
      case "token":
        return <span className="flex items-center text-purple-600"><Coins className="h-4 w-4 mr-1" /> 토큰</span>;
      case "nft":
        return <span className="flex items-center text-indigo-600"><Tag className="h-4 w-4 mr-1" /> NFT</span>;
      case "both":
        return <span className="flex items-center text-teal-600"><Coins className="h-4 w-4 mr-1" /><Tag className="h-4 w-4 ml-1" /></span>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto pt-16 pb-24 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <LoaderCircle className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">캠페인 목록을 불러오는 중...</p>
      </div>
    );
  }

  const userTypes = ["수집가", "트레이더", "개척자", "빌더", "분석가"];
  const statuses: (CampaignStatus | "전체")[] = ["전체", "대기 중", "진행 중", "완료", "취소"];

  // 필터 초기화
  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("전체");
    setTypeFilter("전체");
  };
  
  // 캠페인 삭제 핸들러 (모의 구현)
  const handleDelete = (id: string) => {
    if (confirm(`캠페인 ID: ${id} 를 삭제하시겠습니까?`)) {
      alert(`캠페인 삭제를 요청했습니다. (모의 구현)`);
    }
  };

  return (
    <>
      <div className="container mx-auto pt-16 pb-24 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">캠페인 관리</h1>
            <p className="text-muted-foreground">
              온체인 유형별 에어드랍 및 마케팅 캠페인을 생성하고 관리하세요
            </p>
          </div>
          <Link 
            href="/admin/campaigns/new" 
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span>새 캠페인</span>
          </Link>
        </div>
        
        {/* 필터 및 검색 */}
        <div className="bg-white rounded-lg border mb-6 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="캠페인 이름 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-40">
                <div className="relative">
                  <button 
                    className="px-4 py-2 border rounded-md flex items-center"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    상태: {statusFilter}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => setStatusFilter(status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-40">
                <div className="relative">
                  <button 
                    className="px-4 py-2 border rounded-md flex items-center"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    타입: {typeFilter}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => setTypeFilter("전체")}
                    >
                      전체
                    </button>
                    {userTypes.map((type) => (
                      <button
                        key={type}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => setTypeFilter(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 요약 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm mb-1">활성 캠페인</p>
                <h3 className="text-2xl font-bold mb-1">
                  {campaigns.filter(c => c.status === "진행 중").length}
                </h3>
                <p className="text-xs text-muted-foreground">
                  현재 진행 중인 캠페인
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm mb-1">타겟 사용자</p>
                <h3 className="text-2xl font-bold mb-1">
                  {campaigns.reduce((sum, c) => sum + c.participants, 0).toLocaleString()}
                </h3>
                <p className="text-xs text-muted-foreground">
                  모든 캠페인의 총 타겟 사용자 수
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm mb-1">총 예산</p>
                <h3 className="text-2xl font-bold mb-1">
                  ${campaigns.reduce((sum, c) => sum + c.rewardAmount, 0).toLocaleString()}
                </h3>
                <p className="text-xs text-muted-foreground">
                  모든 캠페인의 총 예산
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Coins className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* 캠페인 테이블 */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort("name")}
                      className="flex items-center focus:outline-none"
                    >
                      캠페인 이름
                      {sortBy === "name" && (
                        sortOrder === "asc" 
                          ? <ArrowUp className="h-3 w-3 ml-1" /> 
                          : <ArrowDown className="h-3 w-3 ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort("status")}
                      className="flex items-center focus:outline-none"
                    >
                      상태
                      {sortBy === "status" && (
                        sortOrder === "asc" 
                          ? <ArrowUp className="h-3 w-3 ml-1" /> 
                          : <ArrowDown className="h-3 w-3 ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    대상 유형
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort("startDate")}
                      className="flex items-center focus:outline-none"
                    >
                      기간
                      {sortBy === "startDate" && (
                        sortOrder === "asc" 
                          ? <ArrowUp className="h-3 w-3 ml-1" /> 
                          : <ArrowDown className="h-3 w-3 ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort("rewardAmount")}
                      className="flex items-center focus:outline-none"
                    >
                      보상
                      {sortBy === "rewardAmount" && (
                        sortOrder === "asc" 
                          ? <ArrowUp className="h-3 w-3 ml-1" /> 
                          : <ArrowDown className="h-3 w-3 ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort("participants")}
                      className="flex items-center focus:outline-none"
                    >
                      참여자
                      {sortBy === "participants" && (
                        sortOrder === "asc" 
                          ? <ArrowUp className="h-3 w-3 ml-1" /> 
                          : <ArrowDown className="h-3 w-3 ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort("claimed")}
                      className="flex items-center focus:outline-none"
                    >
                      수령
                      {sortBy === "claimed" && (
                        sortOrder === "asc" 
                          ? <ArrowUp className="h-3 w-3 ml-1" /> 
                          : <ArrowDown className="h-3 w-3 ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort("conversionRate")}
                      className="flex items-center focus:outline-none"
                    >
                      전환율
                      {sortBy === "conversionRate" && (
                        sortOrder === "asc" 
                          ? <ArrowUp className="h-3 w-3 ml-1" /> 
                          : <ArrowDown className="h-3 w-3 ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCampaigns.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground">
                      검색 결과가 없습니다. 필터를 조정하거나 새 캠페인을 생성하세요.
                    </td>
                  </tr>
                ) : (
                  filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-muted/30">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href={`/admin/campaigns/${campaign.id}`} className="font-medium text-primary hover:underline">
                          {campaign.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderStatusBadge(campaign.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {campaign.targetUserTypes.map((type, index) => (
                            <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-full">
                              {type}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm">
                          {campaign.startDate} ~ {campaign.endDate}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium">${campaign.rewardAmount.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm">
                          {campaign.participants.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm">
                          {campaign.claimed.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">
                              {campaign.conversionRate}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-primary h-1.5 rounded-full" 
                              style={{ width: `${calculateProgress(campaign.claimed, campaign.participants)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderRewardType(campaign.rewardType)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-muted-foreground hover:text-primary">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* 간단한 페이지네이션 */}
          <div className="px-6 py-4 flex items-center justify-between border-t">
            <div className="text-sm text-muted-foreground">
              총 {filteredCampaigns.length}개의 캠페인 표시
            </div>
            
            <div className="flex gap-2">
              <button 
                className="px-3 py-1 border rounded-md bg-muted text-sm text-muted-foreground hover:bg-muted/80 disabled:opacity-50"
                disabled
              >
                이전
              </button>
              <button 
                className="px-3 py-1 border rounded-md bg-primary text-sm text-white hover:bg-primary/90"
              >
                1
              </button>
              <button 
                className="px-3 py-1 border rounded-md bg-muted text-sm text-muted-foreground hover:bg-muted/80 disabled:opacity-50"
                disabled
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 