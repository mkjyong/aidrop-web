"use client";

import { useState, useEffect } from 'react';
import { PlusCircle, Search, Activity, Users, BriefcaseBusiness } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/footer';

// 목 데이터 - 캠페인 정보
const mockCampaigns = [
  {
    id: '1',
    name: 'Collector 타입 에어드랍',
    status: 'active',
    targetTypes: ['collector'],
    budget: 500,
    spent: 320,
    impressions: 15420,
    clicks: 4350,
    conversions: 865,
    createdAt: '2024-04-01',
  },
  {
    id: '2',
    name: 'Trader & Analyst 콜라보 프로모션',
    status: 'active',
    targetTypes: ['trader', 'analyst'],
    budget: 1200,
    spent: 980,
    impressions: 28750,
    clicks: 6210,
    conversions: 1240,
    createdAt: '2024-04-15',
  },
  {
    id: '3',
    name: 'Pioneer 유저 신규 체인 온보딩',
    status: 'paused',
    targetTypes: ['pioneer'],
    budget: 750,
    spent: 320,
    impressions: 8650,
    clicks: 2140,
    conversions: 430,
    createdAt: '2024-03-21',
  },
  {
    id: '4',
    name: 'Builder 커뮤니티 확장 프로그램',
    status: 'completed',
    targetTypes: ['builder'],
    budget: 1000,
    spent: 1000,
    impressions: 32140,
    clicks: 7850,
    conversions: 1570,
    createdAt: '2024-02-10',
  },
];

// 캠페인 카드 컴포넌트
const CampaignCard = ({ campaign }: { campaign: typeof mockCampaigns[0] }) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    draft: 'bg-gray-100 text-gray-800',
  };

  const conversionRate = ((campaign.conversions / campaign.impressions) * 100).toFixed(2);
  const budgetUsedPercentage = (campaign.spent / campaign.budget) * 100;

  return (
    <div className="bg-white border rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold mb-2 truncate">{campaign.name}</h3>
        <span className={`${statusColors[campaign.status as keyof typeof statusColors]} text-xs px-2.5 py-1 rounded-full`}>
          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {campaign.targetTypes.map((type) => (
          <span key={type} className="bg-primary/10 text-primary text-xs px-2.5 py-0.5 rounded-full">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        ))}
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        생성일: {new Date(campaign.createdAt).toLocaleDateString('ko-KR')}
      </p>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>예산 사용</span>
            <span>{campaign.spent} / {campaign.budget} Tokens</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-primary rounded-full" 
              style={{ width: `${budgetUsedPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-muted-foreground">노출수</p>
            <p className="font-semibold">{campaign.impressions.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-muted-foreground">클릭</p>
            <p className="font-semibold">{campaign.clicks.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-muted-foreground">전환율</p>
            <p className="font-semibold">{conversionRate}%</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t flex justify-end">
        <Link 
          href={`/admin/campaigns/${campaign.id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          캠페인 관리 →
        </Link>
      </div>
    </div>
  );
};

// 통계 카드 컴포넌트
const StatCard = ({ 
  title, 
  value, 
  change, 
  icon 
}: { 
  title: string; 
  value: string; 
  change: number; 
  icon: React.ReactNode 
}) => {
  return (
    <div className="bg-white border rounded-lg p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <div className={`text-xs flex items-center mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% 지난 달 대비
          </div>
        </div>
        <div className="p-3 bg-primary/10 text-primary rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [searchQuery, setSearchQuery] = useState('');
  
  // 검색 기능
  const filteredCampaigns = campaigns.filter(
    campaign => campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // 전체 통계 계산
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  
  return (
    <>
      <div className="container mx-auto pt-16 pb-24 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">관리자 대시보드</h1>
          <p className="text-muted-foreground">
            에어드랍 캠페인 관리 및 타겟 유저 트래킹
          </p>
        </div>
        
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="활성 캠페인" 
            value={activeCampaigns.toString()} 
            change={25} 
            icon={<Activity size={24} />} 
          />
          <StatCard 
            title="총 노출수" 
            value={totalImpressions.toLocaleString()} 
            change={12} 
            icon={<Users size={24} />} 
          />
          <StatCard 
            title="총 전환" 
            value={totalConversions.toLocaleString()} 
            change={18} 
            icon={<BriefcaseBusiness size={24} />} 
          />
          <StatCard 
            title="평균 전환율" 
            value={`${((totalConversions / totalImpressions) * 100).toFixed(2)}%`} 
            change={5} 
            icon={<Activity size={24} />} 
          />
        </div>
        
        {/* 검색 및 필터 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">캠페인 관리</h2>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="캠페인 검색"
                className="pl-9 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Link 
              href="/admin/campaigns/new"
              className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-primary/90 transition-colors"
            >
              <PlusCircle size={16} />
              <span>새 캠페인</span>
            </Link>
          </div>
        </div>
        
        {/* 캠페인 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-muted-foreground">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
} 