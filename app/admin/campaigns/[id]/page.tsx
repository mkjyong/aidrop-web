"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Users, Clock, Calendar, Wallet, ArrowUpRight, BarChart2, Info, Download, Filter, Search } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";

// 캠페인 데이터 타입 정의
type Campaign = {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "completed" | "scheduled";
  targetTypes: string[];
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  rewardType: string;
  rewardAmount?: number;
  rewardMessage?: string;
  requirements?: {
    minTransactions?: number;
    minHoldingPeriod?: number;
    minTokensHeld?: number;
  };
  specificTokens: { symbol: string; address: string }[];
  stats: {
    impressions: number;
    clicks: number;
    participations: number;
    conversions: number;
  };
  participants: {
    id: string;
    address: string;
    type: string;
    joinedAt: string;
    status: "pending" | "completed" | "failed";
    txHash?: string;
  }[];
};

// 온체인 타입 매핑
const typeLabels: Record<string, string> = {
  "collector": "컬렉터",
  "trader": "트레이더",
  "pioneer": "선구자",
  "builder": "빌더",
  "analyst": "분석가",
};

// 상태별 색상 매핑
const statusColors: Record<string, string> = {
  "active": "bg-green-100 text-green-800",
  "paused": "bg-amber-100 text-amber-800",
  "completed": "bg-blue-100 text-blue-800",
  "scheduled": "bg-purple-100 text-purple-800",
  "pending": "bg-blue-100 text-blue-800",
  "failed": "bg-red-100 text-red-800",
};

// 더미 캠페인 데이터
const mockCampaign: Campaign = {
  id: "camp-123456",
  name: "트레이더 보상 프로그램",
  description: "활발한 거래 활동을 보이는 트레이더에게 토큰 보상을 제공하는 에어드랍 캠페인입니다.",
  status: "active",
  targetTypes: ["trader", "collector"],
  budget: 10000,
  spent: 3240,
  startDate: "2023-10-15",
  endDate: "2023-11-15",
  rewardType: "token",
  rewardAmount: 25,
  requirements: {
    minTransactions: 10,
    minHoldingPeriod: 30,
    minTokensHeld: 5,
  },
  specificTokens: [
    { symbol: "ETH", address: "0x0000000000000000000000000000000000000000" },
    { symbol: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
  ],
  stats: {
    impressions: 5420,
    clicks: 1230,
    participations: 520,
    conversions: 420,
  },
  participants: [
    {
      id: "user-1",
      address: "0x1234...5678",
      type: "trader",
      joinedAt: "2023-10-16T08:30:00Z",
      status: "completed",
      txHash: "0xabcd...efgh",
    },
    {
      id: "user-2",
      address: "0x2345...6789",
      type: "collector",
      joinedAt: "2023-10-16T09:15:00Z",
      status: "completed",
      txHash: "0xbcde...fghi",
    },
    {
      id: "user-3",
      address: "0x3456...7890",
      type: "trader",
      joinedAt: "2023-10-16T10:45:00Z",
      status: "pending",
    },
    {
      id: "user-4",
      address: "0x4567...8901",
      type: "trader",
      joinedAt: "2023-10-17T11:20:00Z",
      status: "failed",
    },
    {
      id: "user-5",
      address: "0x5678...9012",
      type: "collector",
      joinedAt: "2023-10-17T14:05:00Z",
      status: "completed",
      txHash: "0xcdef...ghij",
    },
    {
      id: "user-6",
      address: "0x6789...0123",
      type: "trader",
      joinedAt: "2023-10-18T09:30:00Z",
      status: "completed",
      txHash: "0xdefg...hijk",
    },
    {
      id: "user-7",
      address: "0x7890...1234",
      type: "trader",
      joinedAt: "2023-10-18T16:45:00Z",
      status: "pending",
    },
  ],
};

// 통계 카드 컴포넌트
function StatCard({ title, value, icon, subtitle }: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
    </div>
  );
}

// 진행 상황 바 컴포넌트
function ProgressBar({ value, max, label }: {
  value: number;
  max: number;
  label?: string;
}) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-muted-foreground">{label || `${percentage}%`}</span>
        <span className="text-sm font-medium">{value.toLocaleString()} / {max.toLocaleString()}</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-2 bg-primary rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function CampaignDetailsPage({ params }: { params: { id: string } }) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  // 참여자 필터링
  const filteredParticipants = campaign?.participants.filter(participant => {
    if (searchQuery && !participant.address.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (statusFilter !== "all" && participant.status !== statusFilter) {
      return false;
    }
    
    if (typeFilter !== "all" && participant.type !== typeFilter) {
      return false;
    }
    
    return true;
  }) || [];

  // 데이터 가져오기 (실제로는 API 호출)
  useEffect(() => {
    const fetchCampaign = async () => {
      // 실제 API 호출 대신 목업 데이터 사용
      setTimeout(() => {
        setCampaign(mockCampaign);
        setIsLoading(false);
      }, 1000);
    };

    fetchCampaign();
  }, [params.id]);

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 시간 포맷 함수
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 잔여 일수 계산
  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // 보고서 다운로드 핸들러
  const handleDownloadReport = () => {
    console.log("보고서 다운로드");
    // 실제로는 API 호출하여 보고서 다운로드
    alert("보고서가 다운로드 중입니다.");
  };

  // 캠페인 상태 변경 핸들러
  const handleStatusChange = (newStatus: Campaign["status"]) => {
    console.log("캠페인 상태 변경:", newStatus);
    // 실제로는 API 호출하여 상태 변경
    if (campaign) {
      setCampaign({ ...campaign, status: newStatus });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto pt-20 pb-24 px-4">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">캠페인 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="container mx-auto pt-20 pb-24 px-4">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h2 className="text-2xl font-bold mb-2">캠페인을 찾을 수 없습니다</h2>
          <p className="text-muted-foreground mb-6">요청하신 캠페인 정보가 존재하지 않습니다.</p>
          <Link 
            href="/admin/campaigns"
            className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>모든 캠페인 목록으로 돌아가기</span>
          </Link>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(campaign.endDate);
  const isActive = campaign.status === "active";

  return (
    <>
      <div className="container mx-auto pt-16 pb-24 px-4">
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/admin/campaigns"
            className="flex items-center justify-center border rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{campaign.name}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[campaign.status]}`}>
                {campaign.status === "active" ? "활성" :
                 campaign.status === "paused" ? "일시중지" :
                 campaign.status === "completed" ? "완료" : "예정"}
              </span>
            </div>
            <p className="text-muted-foreground">{campaign.description}</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>보고서</span>
            </button>
            
            {campaign.status === "active" ? (
              <button
                onClick={() => handleStatusChange("paused")}
                className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
              >
                <span>일시중지</span>
              </button>
            ) : campaign.status === "paused" ? (
              <button
                onClick={() => handleStatusChange("active")}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <span>재개</span>
              </button>
            ) : null}
          </div>
        </div>

        {/* 요약 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="예산 사용"
            value={`${Math.round((campaign.spent / campaign.budget) * 100)}%`}
            icon={<Wallet className="h-5 w-5 text-blue-500" />}
            subtitle={`${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()} 토큰`}
          />
          <StatCard
            title="참여자 수"
            value={campaign.participants.length}
            icon={<Users className="h-5 w-5 text-green-500" />}
            subtitle={`완료: ${campaign.participants.filter(p => p.status === "completed").length}`}
          />
          <StatCard
            title="남은 기간"
            value={`${daysRemaining}일`}
            icon={<Clock className="h-5 w-5 text-amber-500" />}
            subtitle={`${formatDate(campaign.startDate)} ~ ${formatDate(campaign.endDate)}`}
          />
          <StatCard
            title="전환율"
            value={`${Math.round((campaign.stats.conversions / campaign.stats.participations) * 100)}%`}
            icon={<BarChart2 className="h-5 w-5 text-purple-500" />}
            subtitle={`${campaign.stats.conversions} / ${campaign.stats.participations}`}
          />
        </div>

        {/* 캠페인 세부 정보 */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* 진행 상황 */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-bold mb-4">진행 상황</h2>
              <div className="space-y-4">
                <ProgressBar 
                  value={campaign.spent} 
                  max={campaign.budget} 
                  label="예산 사용" 
                />
                <ProgressBar 
                  value={campaign.participants.filter(p => p.status === "completed").length} 
                  max={campaign.participants.length} 
                  label="참여자 완료율" 
                />
                <ProgressBar 
                  value={campaign.stats.conversions} 
                  max={campaign.stats.impressions} 
                  label="전환율" 
                />
              </div>
            </div>

            {/* 참여자 목록 */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-bold mb-4">참여자 목록</h2>
              
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="지갑 주소로 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="all">모든 상태</option>
                    <option value="pending">대기 중</option>
                    <option value="completed">완료</option>
                    <option value="failed">실패</option>
                  </select>
                  
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="all">모든 유형</option>
                    {Object.entries(typeLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {filteredParticipants.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">지갑 주소</th>
                        <th className="text-left py-3 px-4 font-medium">유형</th>
                        <th className="text-left py-3 px-4 font-medium">참여 시간</th>
                        <th className="text-left py-3 px-4 font-medium">상태</th>
                        <th className="text-left py-3 px-4 font-medium">트랜잭션</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredParticipants.map((participant) => (
                        <tr key={participant.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{participant.address}</td>
                          <td className="py-3 px-4">
                            <span className="text-sm">{typeLabels[participant.type] || participant.type}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm">{formatDate(participant.joinedAt)}</div>
                            <div className="text-xs text-muted-foreground">{formatTime(participant.joinedAt)}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${statusColors[participant.status]}`}>
                              {participant.status === "completed" ? "완료" :
                               participant.status === "pending" ? "대기 중" : "실패"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {participant.txHash ? (
                              <a 
                                href={`https://etherscan.io/tx/${participant.txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-primary hover:underline"
                              >
                                <span className="text-sm">보기</span>
                                <ArrowUpRight className="h-3 w-3" />
                              </a>
                            ) : (
                              <span className="text-sm text-muted-foreground">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
                  <Info className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-center text-muted-foreground">
                    검색 조건에 맞는 참여자가 없습니다.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 캠페인 정보 사이드바 */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-lg font-bold mb-4">캠페인 정보</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
                  <p>{campaign.id}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">기간</h3>
                  <p>{formatDate(campaign.startDate)} ~ {formatDate(campaign.endDate)}</p>
                  <p className="text-sm text-muted-foreground">
                    {daysRemaining > 0 
                      ? `${daysRemaining}일 남음` 
                      : "종료됨"}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">타겟 유형</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {campaign.targetTypes.map((type) => (
                      <span key={type} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {typeLabels[type] || type}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">보상 정보</h3>
                  <p>
                    {campaign.rewardType === "token" && campaign.rewardAmount
                      ? `${campaign.rewardAmount} 토큰/사용자`
                      : campaign.rewardType}
                  </p>
                </div>
                
                {campaign.requirements && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">필수 조건</h3>
                    <ul className="text-sm space-y-1 mt-1 list-disc list-inside">
                      {campaign.requirements.minTransactions && (
                        <li>최소 {campaign.requirements.minTransactions}회 트랜잭션</li>
                      )}
                      {campaign.requirements.minHoldingPeriod && (
                        <li>최소 {campaign.requirements.minHoldingPeriod}일 보유</li>
                      )}
                      {campaign.requirements.minTokensHeld && (
                        <li>최소 {campaign.requirements.minTokensHeld}개 토큰 보유</li>
                      )}
                    </ul>
                  </div>
                )}
                
                {campaign.specificTokens.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">지정 토큰</h3>
                    <div className="space-y-1 mt-1">
                      {campaign.specificTokens.map((token, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="font-medium">{token.symbol}</span>
                          <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                            {token.address}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-lg font-bold mb-4">성과 지표</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">노출 수</h3>
                  <p className="text-xl font-bold">{campaign.stats.impressions.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">클릭 수</h3>
                  <p className="text-xl font-bold">{campaign.stats.clicks.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">참여 수</h3>
                  <p className="text-xl font-bold">{campaign.stats.participations.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">전환 수</h3>
                  <p className="text-xl font-bold">{campaign.stats.conversions.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-muted-foreground">클릭률 (CTR)</h3>
                  <p className="font-bold">
                    {Math.round((campaign.stats.clicks / campaign.stats.impressions) * 100)}%
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <h3 className="text-sm font-medium text-muted-foreground">전환율</h3>
                  <p className="font-bold">
                    {Math.round((campaign.stats.conversions / campaign.stats.participations) * 100)}%
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <h3 className="text-sm font-medium text-muted-foreground">참여자당 비용</h3>
                  <p className="font-bold">
                    {(campaign.spent / (campaign.participants.filter(p => p.status === "completed").length || 1)).toFixed(2)} 토큰
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 