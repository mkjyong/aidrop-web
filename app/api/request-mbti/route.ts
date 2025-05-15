import { NextResponse } from 'next/server';

// 분석 결과 인터페이스 정의
interface MbtiResult {
  sourceaddress: string;
  storyaddress: string;
  chainId: string;
  mbtiType: string;
  analysis: string;
  traits: {
    type: string;
    description: string;
    score: number;
  }[];
  completed: boolean;
}

// 분석 진행 상태 모니터링을 위한 간단한 글로벌 상태
// 실제 프로덕션에서는 데이터베이스나 Redis와 같은 상태 저장소를 사용해야 합니다.
export let analysisStatus = "idle"; // idle, processing, completed, error
export let statusMessage = "";
export let analysisResult: MbtiResult | null = null;

// MBTI 분석 요청을 처리하는 POST 엔드포인트
export async function POST(request: Request) {
  try {
    // 요청 본문 파싱
    const body = await request.json();
    const { sourceaddress, storyaddress, sourcechainId } = body;

    // 간단한 입력 유효성 검사
    if (!sourceaddress || !storyaddress || !sourcechainId) {
      return NextResponse.json(
        { error: "모든 필드가 필요합니다." },
        { status: 400 }
      );
    }
    
    // 분석 상태 업데이트
    analysisStatus = "processing";
    statusMessage = "MBTI 분석이 진행 중입니다.";
    
    // 비동기로 MBTI 분석 시작
    // 실제 구현에서는 분석 서비스 호출 또는 백그라운드 작업 예약 
    startMbtiAnalysis(sourceaddress, storyaddress, sourcechainId);
    
    return NextResponse.json({
      message: "MBTI 분석이 시작되었습니다.",
      status: "processing"
    });
    
  } catch (error) {
    console.error("MBTI 분석 요청 처리 중 오류:", error);
    
    // 분석 상태 업데이트
    analysisStatus = "error";
    statusMessage = "분석 요청 처리 중 오류가 발생했습니다.";
    
    return NextResponse.json(
      { error: "요청 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// MBTI 분석 작업 시뮬레이션 (테스트를 위해 10초로 단축)
async function startMbtiAnalysis(sourceaddress: string, storyaddress: string, sourcechainId: string) {
  try {
    // 실제 외부 API 호출 또는 분석 로직을 구현할 수 있습니다.
    // 여기서는 시뮬레이션을 위해 타임아웃을 사용합니다.
    
    // 10초 후 분석 완료 (테스트용, 실제로는 더 오래 걸릴 수 있음)
    setTimeout(() => {
      // 분석 결과 생성 (실제 구현에서는 외부 서비스의 응답을 사용)
      const mbtiTypes = ["INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", 
                         "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"];
      const randomMbti = mbtiTypes[Math.floor(Math.random() * mbtiTypes.length)];
      
      // 예시 특성 정의
      const traits = [
        {
          type: "트랜잭션 행동",
          description: "거래 빈도와 패턴을 기반으로 한 행동 특성",
          score: Math.floor(Math.random() * 40) + 60
        },
        {
          type: "자산 다양성",
          description: "보유 자산의 다양성과 분배 방식",
          score: Math.floor(Math.random() * 30) + 65
        },
        {
          type: "DeFi 참여도",
          description: "분산형 금융 프로토콜과의 상호작용 수준",
          score: Math.floor(Math.random() * 50) + 40
        },
        {
          type: "커뮤니티 활동",
          description: "DAO 거버넌스 및 온체인 커뮤니티 참여",
          score: Math.floor(Math.random() * 60) + 30
        },
        {
          type: "NFT 관여도",
          description: "NFT 수집 및 거래 활동",
          score: Math.floor(Math.random() * 70) + 20
        }
      ];
      
      // 분석 결과 생성
      analysisResult = {
        sourceaddress,
        storyaddress,
        chainId: sourcechainId,
        mbtiType: randomMbti,
        analysis: generateAnalysisText(randomMbti, sourceaddress),
        traits,
        completed: true
      };
      
      // 상태 업데이트
      analysisStatus = "completed";
      statusMessage = "MBTI 분석이 완료되었습니다.";
      
      console.log("MBTI 분석 완료:", randomMbti);
    }, 10000); // 10000ms = 10초
    
  } catch (error) {
    console.error("MBTI 분석 중 오류:", error);
    analysisStatus = "error";
    statusMessage = "MBTI 분석 중 오류가 발생했습니다.";
  }
}

// MBTI 유형에 따른 분석 텍스트 생성
function generateAnalysisText(mbtiType: string, address: string): string {
  const addressShort = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  
  const descriptions: Record<string, string> = {
    "INTJ": `당신의 온체인 행동은 전략적이고 계획적입니다. ${addressShort} 주소는 장기적인 투자 패턴을 보이며, 신중하게 리서치된 프로젝트에 투자하는 경향이 있습니다. DeFi 프로토콜 사용 시 깊이 있는 분석 후 참여하며, 리스크 관리에 능숙합니다. 당신은 시장 트렌드보다 토큰의 근본적 가치와 장기적 비전을 중요시합니다.`,
    "INTP": `당신의 온체인 발자취는 지적 호기심이 강하고 실험적인 성향을 보여줍니다. ${addressShort} 주소는 새로운 DeFi 프로토콜을 탐색하고 복잡한 금융 메커니즘을 실험하는데 많은 시간을 투자합니다. 트랜잭션 패턴은 지속적인 학습과 최적화를 추구하는 모습을 보여주며, 혁신적인 금융 솔루션을 발견하는 것에 큰 즐거움을 느낍니다.`,
    "ENTJ": `당신의 온체인 활동은 결단력 있고 목표 지향적인 성향을 보여줍니다. ${addressShort} 주소는 체계적인 포트폴리오 관리와 효율적인 자산 배분이 특징입니다. DAO 거버넌스 참여가 활발하며, 리더십을 발휘하는 투표 패턴을 보입니다. 당신은 효율성과 수익 극대화를 위해 자산을 적극적으로 관리하며, 프로젝트의 장기적 성장 가능성을 중요시합니다.`,
    "ENTP": `온체인 행동에서 혁신과 기회를 발견하는 선구자적 성향이 드러납니다. ${addressShort} 주소는 새로운 프로토콜과 토큰을 빠르게 탐색하고 적응하는 모습을 보입니다. 다양한 체인과 프로젝트에 걸쳐 폭넓은 활동을 하며, 독창적인 전략으로 시장 기회를 포착합니다. 당신은 트렌드를 빠르게 감지하고 창의적인 방식으로 참여합니다.`,
    "INFJ": `당신의 온체인 발자취는 가치 중심적이고 사회적 영향을 중요시하는 특성을 보여줍니다. ${addressShort} 주소는 환경, 사회적 영향을 고려한 프로젝트에 참여하는 경향이 있으며, 공공재 펀딩과 같은 활동에 기여하는 패턴을 보입니다. 당신은 블록체인 기술의 변혁적 잠재력을 믿으며, 긍정적인 변화를 만드는데 기여하고자 합니다.`,
    "INFP": `당신의 온체인 활동은 이상주의적이고 개인적 가치를 중요시하는 성향을 드러냅니다. ${addressShort} 주소는 강한 커뮤니티 연결과 가치 기반 결정을 보여줍니다. NFT 컬렉션에서 예술적, 문화적 의미를 중요시하며, 자신의 신념과 일치하는 프로젝트를 지지합니다. 당신은 블록체인의 민주화와 창조적 잠재력에 깊이 공감합니다.`,
    "ENFJ": `당신의 온체인 행동은 커뮤니티 중심적이고 협력을 촉진하는 특성을 보여줍니다. ${addressShort} 주소는 DAO 참여와 거버넌스에서 높은 활동성을 보이며, 프로젝트의 사회적 측면과 커뮤니티 건강성을 중요시합니다. 다양한 사용자들과 연결되어 있으며, 온체인 생태계 내에서 조화와 합의를 추구합니다.`,
    "ENFP": `당신의 온체인 발자취는 열정적이고 다양한 가능성을 탐색하는 모습을 보여줍니다. ${addressShort} 주소는 다양한 프로젝트와 NFT 컬렉션에 참여하며, 새로운 트렌드와 커뮤니티에 빠르게 적응합니다. 호기심이 많고 실험적인 트랜잭션 패턴을 보여주며, 창의적이고 혁신적인 프로젝트에 끌리는 경향이 있습니다.`,
    "ISTJ": `당신의 온체인 활동은 책임감 있고 체계적인 특성을 보여줍니다. ${addressShort} 주소는 안정적인 투자 패턴과 일관된 자산 관리가 특징입니다. 검증된 프로토콜과 확립된 프로젝트를 선호하며, 장기적 가치 보존에 중점을 두는 모습을 보입니다. 당신은 리스크를 신중하게 관리하면서 안정적인 수익을 추구합니다.`,
    "ISFJ": `당신의 온체인 발자취는 충실하고 보호적인 성향을 드러냅니다. ${addressShort} 주소는 안정적인 보유 패턴과 신중한 자산 보호 전략이 특징입니다. 커뮤니티 지원 활동에 참여하며, 장기적 관계를 중요시합니다. 당신은 블록체인 생태계에서 신뢰와 안전을 중요시하며, 지속 가능한 성장을 위해 기여합니다.`,
    "ESTJ": `당신의 온체인 행동은 체계적이고 효율성을 추구하는 모습을 보여줍니다. ${addressShort} 주소는 잘 정의된 투자 전략과 구조화된 포트폴리오 관리가 특징입니다. 명확한 목표와 기준에 따라 의사결정을 하며, 결과 지향적인 프로젝트 참여를 선호합니다. 당신은 블록체인 시장에서 실용적이고 체계적인 접근 방식을 취합니다.`,
    "ESFJ": `당신의 온체인 활동은 사회적이고 협력적인 특성을 보여줍니다. ${addressShort} 주소는 커뮤니티 중심 프로젝트와 소셜 토큰에 적극적으로 참여하는 모습을 보입니다. 다른 사용자와의 상호작용이 빈번하며, 프로젝트의 사회적 측면과 관계를 중요시합니다. 당신은 온체인 커뮤니티의 조화와 포용을 위해 기여합니다.`,
    "ISTP": `당신의 온체인 발자취는 실용적이고 적응력이 뛰어난 모습을 보여줍니다. ${addressShort} 주소는 기술적 효율성과 시장 기회를 활용하는 데 능숙합니다. 빠른 의사결정과 유연한 전략 변경이 특징이며, 복잡한 거래와 기술적 상호작용을 숙련되게 다룹니다. 당신은 실시간으로 변화하는 시장 조건에 빠르게 적응합니다.`,
    "ISFP": `당신의 온체인 행동은 심미적이고 개인적 가치를 중요시하는 특성을 드러냅니다. ${addressShort} 주소는 NFT 및 창의적 프로젝트에 대한 강한 관심을 보여줍니다. 독특하고 개인적인 선택을 선호하며, 감성적인 연결을 중요시합니다. 당신은 블록체인의 표현적이고 창조적인 가능성을 높이 평가합니다.`,
    "ESTP": `당신의 온체인 활동은 대담하고 기회주의적인 특성을 보여줍니다. ${addressShort} 주소는 높은 거래 빈도와 시장 기회에 대한 빠른 반응이 특징입니다. 리스크를 감수하는 경향이 있으며, 단기적 시장 변동을 활용하는데 능숙합니다. 당신은 실시간 데이터와 시장 움직임에 민감하게 반응하면서 활발하게 포지션을 관리합니다.`,
    "ESFP": `당신의 온체인 발자취는 사교적이고 즐거움을 추구하는 성향을 드러냅니다. ${addressShort} 주소는 소셜 토큰, 커뮤니티 이벤트, 게임파이 프로젝트에 활발하게 참여하는 모습을 보입니다. 다양한 체험과 즐거운 상호작용을 추구하며, 트렌디한 프로젝트와 사회적 요소가 강한 활동을 선호합니다. 당신은 블록체인 세계에서 즐거움과 연결을 찾습니다.`
  };
  
  return descriptions[mbtiType] || `${addressShort} 주소는 독특한 온체인 행동 패턴을 보여줍니다. 당신의 활동은 블록체인 생태계 내에서 특별한 디지털 정체성을 형성하고 있으며, 다양한 프로젝트와 트랜잭션을 통해 고유한 온체인 MBTI 유형을 나타냅니다.`;
} 