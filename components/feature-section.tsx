"use client";

import { Layers, Cpu, Sparkles, BarChart2, Brain, FileSearch } from "lucide-react";

// Placeholder for a potential data visualization component
const DataFlowVisualization = () => (
  <div className="aspect-video bg-secondary/50 rounded-lg flex items-center justify-center text-muted-foreground">
    [Data Flow Visualization Placeholder]
  </div>
);

export function FeatureSection() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">블록체인 데이터로 디지털 정체성 분석</h2>
          <p className="text-muted-foreground md:text-lg">
            다양한 블록체인의 온체인 데이터를 AI로 분석하여 유니크한 디지털 정체성을 시각화하고, 
            블록체인 네트워크 전반의 유의미한 인사이트를 제공합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1: Data Aggregation */}
          <div className="bg-card/50 p-6 rounded-lg border border-border/30 text-center hover:border-primary/50 transition-colors duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="inline-block p-3 rounded-full bg-primary/10 text-primary mb-4">
              <Layers size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">멀티체인 데이터 통합</h3>
            <p className="text-muted-foreground text-sm">EVM, Solana, Sui 등 다양한 체인의 활동 데이터를 표준화하여 통합 분석합니다.</p>
          </div>
          
          {/* Feature 2: AI Analysis */}
          <div className="bg-card/50 p-6 rounded-lg border border-border/30 text-center hover:border-primary/50 transition-colors duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="inline-block p-3 rounded-full bg-primary/10 text-primary mb-4">
              <Cpu size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI 기반 패턴 인식</h3>
            <p className="text-muted-foreground text-sm">고급 알고리즘을 통해 고유한 행동, 관심사 및 패턴을 파악합니다.</p>
          </div>
          
          {/* Feature 3: NFT Generation */}
          <div className="bg-card/50 p-6 rounded-lg border border-border/30 text-center hover:border-primary/50 transition-colors duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="inline-block p-3 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">유니크 NFT 발행</h3>
            <p className="text-muted-foreground text-sm">디지털 정체성을 시각적으로 표현하는 맞춤형 NFT를 생성합니다.</p>
          </div>
        </div>

        {/* Second Row of Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {/* Feature 4: User Analysis */}
          <div className="bg-card/50 p-6 rounded-lg border border-border/30 text-center hover:border-primary/50 transition-colors duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="inline-block p-3 rounded-full bg-primary/10 text-primary mb-4">
              <Brain size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">유저별 성향 분석</h3>
            <p className="text-muted-foreground text-sm">온체인 활동에 기반한 MBTI와 같은 개인화된 디지털 자산 성향 유형을 제공합니다.</p>
          </div>
          
          {/* Feature 5: Chain Dashboard */}
          <div className="bg-card/50 p-6 rounded-lg border border-border/30 text-center hover:border-primary/50 transition-colors duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="inline-block p-3 rounded-full bg-primary/10 text-primary mb-4">
              <BarChart2 size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">체인별 데이터 대시보드</h3>
            <p className="text-muted-foreground text-sm">블록체인 네트워크별 활동과 추세를 실시간으로 모니터링할 수 있는 분석 대시보드를 제공합니다.</p>
          </div>
          
          {/* Feature 6: Detailed Reports */}
          <div className="bg-card/50 p-6 rounded-lg border border-border/30 text-center hover:border-primary/50 transition-colors duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="inline-block p-3 rounded-full bg-primary/10 text-primary mb-4">
              <FileSearch size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">상세 보고서 생성</h3>
            <p className="text-muted-foreground text-sm">심층적인 온체인 활동 분석과 인사이트가 담긴 맞춤형 보고서를 생성합니다.</p>
          </div>
        </div>

        {/* Optional: Placeholder for more complex visualization */}
        <div className="mt-16 md:mt-20">
          <DataFlowVisualization />
        </div>
      </div>
    </section>
  );
} 