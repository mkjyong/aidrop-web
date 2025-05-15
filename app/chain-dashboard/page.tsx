"use client";

import { useState } from "react";
import { chains, Chain } from "@/lib/chains";
import { 
  BarChart4, PieChart, LineChart, FilterIcon, 
  Download, BarChart2, Activity, Users, ArrowUp,
  ChevronDown, ArrowUpRight, Layers, Network,
  ChevronRight
} from "lucide-react";
import { Footer } from "@/components/footer";

// 샘플 데이터 (실제로는 API에서 가져올 것)
const chainSubmissionData = chains.map((chain, index) => ({
  id: chain.id,
  name: chain.name,
  count: (chain.id % 10) * 100 + 50 + index * 10,
  growth: (chain.id % 15) * 5 - 20 + index * 2,
  activity: (chain.id % 20) * 5,
  users: (chain.id % 8) * 50 + 10 + index * 5,
}));

// 월별 트렌드 데이터
const monthlyTrendData = [
  { month: "Jan", submissions: 1245 },
  { month: "Feb", submissions: 1580 },
  { month: "Mar", submissions: 1720 },
  { month: "Apr", submissions: 1463 },
  { month: "May", submissions: 1958 },
  { month: "Jun", submissions: 2245 },
  { month: "Jul", submissions: 2580 },
  { month: "Aug", submissions: 2720 },
  { month: "Sep", submissions: 3120 },
  { month: "Oct", submissions: 3580 },
  { month: "Nov", submissions: 3920 },
  { month: "Dec", submissions: 4260 },
];

// 체인 유형 분포 데이터
const chainTypeDistribution = [
  { type: "EVM Chains", percentage: 68 },
  { type: "Non-EVM Chains", percentage: 24 },
  { type: "Other", percentage: 8 },
];

// 인기 프로토콜 데이터
const popularProtocolsData = [
  { name: "Ethereum", tvl: 45.8, change: 12.4 },
  { name: "Arbitrum", tvl: 12.2, change: 25.3 },
  { name: "Optimism", tvl: 8.6, change: 18.7 },
  { name: "Solana", tvl: 7.9, change: 35.2 },
  { name: "BNB Chain", tvl: 6.5, change: -3.8 },
  { name: "Polygon", tvl: 5.2, change: 7.1 },
  { name: "zkSync", tvl: 4.3, change: 64.2 },
  { name: "Base", tvl: 3.7, change: 52.8 },
];

// 마켓 인사이트 데이터
const marketInsights = [
  {
    title: "Increased Individual User Participation",
    description: "New users creating wallets for the first time increased by 42% over the last 3 months.",
    icon: <Users size={24} />,
    color: "bg-blue-500",
  },
  {
    title: "DeFi Activity Showing Recovery",
    description: "DEX trading volume increased by 23% compared to the previous month, showing signs of recovery in DeFi activity.",
    icon: <Activity size={24} />,
    color: "bg-green-500",
  },
  {
    title: "Growth of Modular Blockchains",
    description: "Interest in modular blockchains is rising, with the TVL of related projects increasing by 78%.",
    icon: <Layers size={24} />,
    color: "bg-purple-500",
  },
  {
    title: "Increase in Cross-Chain Activity",
    description: "Cross-chain bridge activity rose by 35% compared to last month, indicating activation of the multi-chain ecosystem.",
    icon: <Network size={24} />,
    color: "bg-orange-500",
  },
];

// 지역별 사용자 분포 데이터
const regionDistribution = [
  { region: "Asia", percentage: 42, change: 18 },
  { region: "North America", percentage: 26, change: 12 },
  { region: "Europe", percentage: 21, change: 15 },
  { region: "South America", percentage: 7, change: 32 },
  { region: "Africa", percentage: 3, change: 45 },
  { region: "Oceania", percentage: 1, change: 8 },
];

// 사용자 유형 분포 데이터 (신규)
const userTypeDistributionData = [
  { type: "Trader", count: 1250, percentage: 31, color: "bg-blue-500" },
  { type: "Collector", count: 980, percentage: 24, color: "bg-purple-500" },
  { type: "Pioneer", count: 820, percentage: 20, color: "bg-orange-500" },
  { type: "Analyst", count: 650, percentage: 16, color: "bg-red-500" },
  { type: "Builder", count: 300, percentage: 9, color: "bg-green-500" },
];

// 스켈레톤 로딩 컴포넌트
const DashboardLoadingSkeleton = () => (
  <div className="w-full">
    <div className="animate-pulse space-y-8">
      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-gray-200 rounded"></div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-96 bg-gray-200 rounded"></div>
        <div className="h-96 bg-gray-200 rounded"></div>
      </div>
      
      <div className="h-80 bg-gray-200 rounded"></div>
    </div>
  </div>
);

// 통계 카드 컴포넌트
const StatCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  color 
}: { 
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
}) => (
  <div className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-muted-foreground text-sm mb-1">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        
        {change !== undefined && (
          <div className={`flex items-center gap-1 mt-2 text-sm ${
            change >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {change >= 0 ? <ArrowUpRight size={16} /> : <ChevronDown size={16} />}
            <span>{Math.abs(change)}% {change >= 0 ? 'Increase' : 'Decrease'}</span>
          </div>
        )}
      </div>
      
      <div className={`p-3 rounded-full ${color} text-white`}>
        {icon}
      </div>
    </div>
  </div>
);

// 막대 차트 컴포넌트
const BarChart = ({ data, title }: { data: {name: string, count: number}[], title: string }) => {
  // 상위 7개 체인만 표시
  const topData = [...data].sort((a, b) => b.count - a.count).slice(0, 7);
  
  return (
    <div className="bg-card rounded-xl p-6 border border-border h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground">
            <FilterIcon size={16} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground">
            <Download size={16} />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {topData.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{item.name}</span>
              <span>{item.count.toLocaleString()}</span>
            </div>
            <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${(item.count / topData[0].count) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 라인 차트 컴포넌트
const LineChartComponent = ({ data, title }: { data: {month: string, submissions: number}[], title: string }) => {
  // 막대 차트로 구현
  return (
    <div className="bg-card rounded-xl p-6 border border-border h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground">
            <FilterIcon size={16} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground">
            <Download size={16} />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{item.month}</span>
              <span>{item.submissions.toLocaleString()}</span>
            </div>
            <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500" 
                style={{ width: `${(item.submissions / Math.max(...data.map(d => d.submissions))) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 도넛 차트 컴포넌트
const DonutChart = ({ data, title }: { data: {type: string, percentage: number}[], title: string }) => {
  const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500"];
  
  return (
    <div className="bg-card rounded-xl p-6 border border-border h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground">
            <FilterIcon size={16} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground">
            <Download size={16} />
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={item.type} className="space-y-1">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-sm ${colors[index % colors.length]}`} />
                <span className="font-medium">{item.type}</span>
              </div>
              <span>{item.percentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${colors[index % colors.length]}`} 
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
        
        <div className="h-[1px] bg-border my-2" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-primary" />
            <span className="font-medium">Total</span>
          </div>
          <span className="font-bold">100%</span>
        </div>
      </div>
    </div>
  );
};

// 네트워크 차트 컴포넌트
const NetworkChart = ({ title }: { title: string }) => {
  const networks = [
    { name: "ETH", color: "bg-blue-500" },
    { name: "BNB", color: "bg-green-500" },
    { name: "ARB", color: "bg-yellow-500" },
    { name: "OP", color: "bg-purple-500" },
    { name: "BASE", color: "bg-pink-500" },
    { name: "SOL", color: "bg-teal-500" }
  ];
  
  return (
    <div className="bg-card rounded-xl p-6 border border-border h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground">
            <FilterIcon size={16} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground">
            <Download size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-3 gap-3 w-full">
          {networks.map((network, index) => (
            <div key={index} className="flex flex-col items-center p-3 rounded-md border border-border hover:border-primary/50 transition-colors">
              <div className={`w-8 h-8 rounded-full ${network.color} flex items-center justify-center text-white text-xs mb-2`}>
                {network.name}
              </div>
              <div className="text-sm font-medium">{network.name}</div>
              <div className="text-xs text-muted-foreground mt-1">연결: {Math.floor(Math.random() * 100) + 10}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 체인 데이터 테이블 행
const ChainDataRow = ({ 
  rank, 
  chain, 
  count, 
  growth, 
  activity 
}: { 
  rank: number;
  chain: {id: number; name: string;};
  count: number;
  growth: number;
  activity: number;
}) => {
  // 체인 로고 가져오기 (실제로는 적절한 이미지 경로로 대체해야 함)
  const chainLogo = `/icons/${chain.name.toLowerCase().replace(' ', '-')}.svg`;
  
  return (
    <tr className="border-b border-border/60 hover:bg-secondary/20 transition-colors">
      <td className="py-4 px-4 text-center">{rank}</td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          {/* 실제로는 이미지 태그로 변경 필요 */}
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-xs">{chain.name.substring(0, 2)}</span>
          </div>
          <span className="font-medium">{chain.name}</span>
        </div>
      </td>
      <td className="py-4 px-4 text-right font-medium">{count.toLocaleString()}</td>
      <td className="py-4 px-4">
        <div className={`flex items-center justify-end gap-1 ${
          growth >= 0 ? 'text-green-500' : 'text-red-500'
        }`}>
          {growth >= 0 ? <ArrowUpRight size={16} /> : <ChevronDown size={16} />}
          <span>{Math.abs(growth)}%</span>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <div className="h-2 bg-gray-200 rounded-full flex-grow">
            <div 
              className="h-2 bg-primary rounded-full" 
              style={{ width: `${activity}%` }}
            ></div>
          </div>
          <span className="text-xs text-muted-foreground w-8">{activity}%</span>
        </div>
      </td>
    </tr>
  );
};

// 데이터 인사이트 카드
const InsightCard = ({ 
  title, 
  description,
  icon,
  color
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
    <div className={`w-12 h-12 rounded-full ${color} text-white mb-4 flex items-center justify-center`}>
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

// 프로토콜 TVL 컴포넌트
const ProtocolsTVL = ({ data, title }: { data: {name: string, tvl: number, change: number}[], title: string }) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-border h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground">
            <FilterIcon size={16} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground">
            <Download size={16} />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{item.name}</span>
              <div className="flex items-center gap-2">
                <span>${item.tvl.toFixed(1)}B</span>
                <span className={item.change >= 0 ? "text-green-500" : "text-red-500"}>
                  {item.change >= 0 ? "+" : ""}{item.change}%
                </span>
              </div>
            </div>
            <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.change >= 0 ? "bg-green-500" : "bg-red-500"}`}
                style={{ width: `${(item.tvl / data[0].tvl) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 지역별 분포 컴포넌트
const RegionDistribution = ({ data, title }: { data: {region: string, percentage: number, change: number}[], title: string }) => {
  const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-teal-500"];
  
  return (
    <div className="bg-card rounded-xl p-6 border border-border h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground">
            <FilterIcon size={16} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground">
            <Download size={16} />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-sm ${colors[index % colors.length]}`} />
                <span className="font-medium">{item.region}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{item.percentage}%</span>
                <span className="text-green-500 text-xs">+{item.change}%</span>
              </div>
            </div>
            <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${colors[index % colors.length]}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-3 bg-primary/5 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Key Growth Regions</span>
          <span className="font-bold text-primary">Africa & South America</span>
        </div>
      </div>
    </div>
  );
};

// 사용자 유형 분포 차트 컴포넌트 (신규)
const UserTypeDistribution = ({ data, title }: { data: {type: string, count: number, percentage: number, color: string}[], title: string }) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-border h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground">
            <FilterIcon size={16} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground">
            <Download size={16} />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-sm ${item.color}`} />
                <span className="font-medium">{item.type}</span>
              </div>
              <span>{item.count.toLocaleString()} ({item.percentage}%)</span>
            </div>
            <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.color}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-3 bg-primary/5 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Dominant Types</span>
          <span className="font-bold text-primary">Trader & Collector</span>
        </div>
      </div>
    </div>
  );
};

export default function ChainDashboardPage() {
  const [loading, setLoading] = useState<boolean>(false);
  
  // 실제 앱에서는 페이지 로드 시 API에서 데이터를 가져옴
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       // API 호출
  //       // const data = await api.fetchDashboardData();
  //       // setState(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   
  //   fetchData();
  // }, []);
  
  // 간단하게 로딩 false로 설정
  // loading 상태를 true로 해볼 경우 스켈레톤 UI 확인 가능
  
  return (
    <>
      <div className="container mx-auto pt-20 pb-12 px-4">
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Chain Data Dashboard</h1>
              <p className="text-muted-foreground">
                Analyze key metrics and trends across the entire blockchain ecosystem.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-card border border-border rounded-lg px-4 py-2 text-sm">
                <span className="text-muted-foreground mr-2">Period:</span>
                <span className="font-medium">Last 30 days</span>
              </div>
              
              <button className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium">
                Download Report
              </button>
            </div>
          </div>
          
          {loading ? (
            <DashboardLoadingSkeleton />
          ) : (
            <div className="space-y-8">
              {/* 주요 지표 섹션 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                  title="Total Submissions" 
                  value="28,532" 
                  change={12}
                  icon={<BarChart2 size={24} />}
                  color="bg-primary"
                />
                <StatCard 
                  title="Active Users" 
                  value="4,285" 
                  change={8}
                  icon={<Users size={24} />}
                  color="bg-blue-500"
                />
                <StatCard 
                  title="Daily Transactions" 
                  value="124,532" 
                  change={16}
                  icon={<Activity size={24} />}
                  color="bg-green-500"
                />
                <StatCard 
                  title="Supported Chains" 
                  value={chains.length} 
                  change={5}
                  icon={<Layers size={24} />}
                  color="bg-purple-500"
                />
              </div>
              
              {/* 새로운 섹션: 상세 통계 */}
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold mb-6">Detailed Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-muted-foreground text-sm">Avg. Session Duration</p>
                      <div className="p-2 rounded-full bg-green-100 text-green-600">
                        <ArrowUp size={14} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">4m 32s</h3>
                    <p className="text-xs text-muted-foreground">+15% vs last month</p>
                  </div>
                  
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-muted-foreground text-sm">Analyses per User</p>
                      <div className="p-2 rounded-full bg-green-100 text-green-600">
                        <ArrowUp size={14} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">2.8 times</h3>
                    <p className="text-xs text-muted-foreground">+22% vs last month</p>
                  </div>
                  
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-muted-foreground text-sm">Mobile Usage Rate</p>
                      <div className="p-2 rounded-full bg-green-100 text-green-600">
                        <ArrowUp size={14} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">58%</h3>
                    <p className="text-xs text-muted-foreground">+8% vs last month</p>
                  </div>
                  
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-muted-foreground text-sm">NFT Minting Rate</p>
                      <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
                        <ArrowUp size={14} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">12%</h3>
                    <p className="text-xs text-muted-foreground">+3% vs last month</p>
                  </div>
                </div>
              </div>
              
              {/* 차트 섹션 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarChart 
                  data={chainSubmissionData.map(c => ({ name: c.name, count: c.count }))} 
                  title="Popular Blockchains (by Submissions)"
                />
                <LineChartComponent 
                  data={monthlyTrendData} 
                  title="Monthly Submission Trends"
                />
              </div>
              
              {/* 새로운 섹션: 프로토콜 & 사용자 유형 분포 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProtocolsTVL 
                  data={popularProtocolsData} 
                  title="Popular Protocols (by TVL)"
                />
                <UserTypeDistribution
                  data={userTypeDistributionData}
                  title="Popular On-chain Types Distribution"
                />
              </div>
              
              {/* 새로운 섹션: 지역 분포 & 체인 유형 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RegionDistribution 
                  data={regionDistribution} 
                  title="User Distribution by Region"
                />
                <DonutChart 
                  data={chainTypeDistribution} 
                  title="Chain Type Distribution"
                />
              </div>
              
              {/* 인사이트 섹션 */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Key Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {marketInsights.map((insight, i) => (
                    <InsightCard 
                      key={i}
                      title={insight.title}
                      description={insight.description}
                      icon={insight.icon}
                      color={insight.color}
                    />
                  ))}
                </div>
              </div>
              
              {/* 체인 랭킹 테이블 */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Blockchain Ranking</h2>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground">
                      <FilterIcon size={16} />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="overflow-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-muted-foreground text-sm border-b border-border">
                        <th className="text-left py-3 px-4 font-medium">#</th>
                        <th className="text-left py-3 px-4 font-medium">Chain</th>
                        <th className="text-right py-3 px-4 font-medium">Submissions</th>
                        <th className="text-right py-3 px-4 font-medium">Growth</th>
                        <th className="text-right py-3 px-4 font-medium">Activity Score</th>
                        <th className="text-right py-3 px-4 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {chainSubmissionData
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 10)
                        .map((chainData, index) => (
                          <ChainDataRow 
                            key={chainData.id}
                            rank={index + 1}
                            chain={{id: chainData.id, name: chainData.name}}
                            count={chainData.count}
                            growth={chainData.growth}
                            activity={chainData.activity}
                          />
                        ))
                      }
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 text-center">
                  <button className="text-primary text-sm font-medium flex items-center gap-1 mx-auto">
                    View Full Ranking
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              
              {/* 마지막 업데이트 시간 */}
              <div className="text-center text-sm text-muted-foreground">
                Last Updated: August 10, 2024 14:32
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
} 