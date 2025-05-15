export interface PersonalityType {
  id: string;
  name: string;
  emoji: string;
  description: string;
  keywords: string[];
  recommendedCommunities: string[];
  nftDescription: string;
  commonTraits?: string[];
}

// 20가지 웹3 성격유형 정의
export const personalityTypes: PersonalityType[] = [
  {
    id: "explorer",
    name: "Web3 Explorer",
    emoji: "🧭",
    description: "새로운 체인과 프로토콜을 모험하듯 탐험하는 유형입니다. 호기심이 왕성하여 신규 런칭된 테스트넷이나 디앱도 가장 먼저 시도해보고, 여러 체인 간 브릿지도 두려워하지 않는 얼리어답터입니다.",
    keywords: ["#호기심왕", "#얼리어답터", "#체인월드투어"],
    recommendedCommunities: ["Discord의 Testnet Hunters", "다양한 체인 테스트넷 커뮤니티"],
    nftDescription: "우주비행사나 탐험가 아바타가 여러 블록체인 로고가 그려진 지도를 들고 있는 모습"
  },
  {
    id: "dao-dreamer",
    name: "DAO Dreamer",
    emoji: "🏛️",
    description: "탈중앙화 자율조직(DAO)에 로맨스를 품은 이상주의자입니다. 토큰 보유와 투표 권한을 소중히 여겨 프로젝트 거버넌스 토론에 열심히 참여하고, 제안서를 읽고 의견을 내는 것을 즐깁니다.",
    keywords: ["#거버넌스광", "#이상주의", "#탈중앙화전도사"],
    recommendedCommunities: ["MakerDAO 포럼", "BanklessDAO", "Korea DAO"],
    nftDescription: "원형 탁자에 여러 사람들이 토큰을 들고 모여있는 장면, 깃발에 'Decentralize Everything' 문구"
  },
  {
    id: "airdrop-hunter",
    name: "Airdrop Hunter",
    emoji: "🎁",
    description: "'Wen Token?'을 입에 달고 사는 에어드랍 사냥꾼입니다. 토큰이 아직 없는 신규 프로토콜들을 찾아다니며 초기 사용자로 활동하고, 테스트넷 미션, 길고 지루한 갯수 채우기도 끈질기게 해냅니다.",
    keywords: ["#에어드랍신", "#testnet개척자", "#호기심과인내"],
    recommendedCommunities: ["에어드랍 정보 공유 채널", "신규 프로젝트 Discord"],
    nftDescription: "황금 낚싯대나 나비채를 들고 토큰 모양의 보물상자들을 잡는 캐릭터"
  },
  {
    id: "defi-degen",
    name: "DeFi Degen",
    emoji: "🚀",
    description: "탈중앙 금융(DeFi) 세계의 진정한 디젠(탐욕적 투기꾼)입니다. 새로 뜬 김치풀(고이율 유동성 풀)이나 알파(초기 정보)가 보이면 밤새 연구보다는 일단 찍고 본 뒤 나중에 결과를 확인하는 스타일입니다.",
    keywords: ["#디파이농부", "#욜로(YOLO)", "#FOMO", "#APY중독"],
    recommendedCommunities: ["디파이 알파 공유방", "텔레그램 DeFi Degen 모임"],
    nftDescription: "눈이 달러 표시로 빛나는 원숭이 캐릭터가 그래프 로켓을 타고 있는 만화풍 이미지"
  },
  {
    id: "diamond-hands",
    name: "Diamond Hands HODLer",
    emoji: "💎🙌",
    description: "이들은 '존버는 승리한다'는 신념이 뼛속까지 새겨진 다이아몬드 손(불굴의 보유자)입니다. 시장 폭락이 와도 패닉에 팔지 않고 꽉 잡고 놓지 않으며, 주위에 동요하는 사람들에게 오히려 굳은 믿음을 전파합니다.",
    keywords: ["#존버", "#인내심갑", "#언젠간간다"],
    recommendedCommunities: ["비트코인 톡방", "HODL 모토 공유 모임"],
    nftDescription: "양 손에 다이아몬드를 들고있는 강인한 캐릭터, 배경에 달과 로켓"
  },
  {
    id: "paper-hands",
    name: "Paper Hands Trader",
    emoji: "📄🤲",
    description: "일명 '종이손', 쉽게 물건을 팔아버리는 단기 트레이더입니다. 투자에 있어 손절매와 단타 매매가 일상으로, 조금 오르면 팔고 조금 떨어져도 겁부터 먹는 경향이 있습니다.",
    keywords: ["#단타왕", "#손절장인", "#불안러"],
    recommendedCommunities: ["국내 주식/코인 단타 카페", "트레이딩뷰 한글 커뮤니티"],
    nftDescription: "손이 종이로 되어 펄럭이는 우스꽝스러운 캐릭터, 롤러코스터 차트 앞에서 겁먹은 눈"
  },
  {
    id: "nft-collector",
    name: "NFT Collector",
    emoji: "🎨🐳",
    description: "NFT 콜렉터는 디지털 수집가로, 온체인 아트와 컬렉터블에 깊은 애정을 가진 유형입니다. OpenSea 등 마켓플레이스에서 희귀한 JPEG 예술품이나 PFP 컬렉션을 싹쓸이하는 것을 즐깁니다.",
    keywords: ["#JPEG부자", "#컬렉터", "#예술사랑"],
    recommendedCommunities: ["유명 NFT 컬렉션 Discord", "NFT 전시회 모임"],
    nftDescription: "한 손에는 루프로 NFT 아트를 감상하고 다른 손에는 컬렉션 앨범을 든 캐릭터"
  },
  {
    id: "metaverse-nomad",
    name: "Metaverse Nomad",
    emoji: "🕶️🌐",
    description: "메타버스 유목민은 가상세계 곳곳을 탐험하며 살아가는 유형입니다. Decentraland, The Sandbox 같은 메타버스 플랫폼을 넘나들며 가상 부동산을 소유하고, VR 이벤트에 참여합니다.",
    keywords: ["#메타버스여행자", "#VR라이프", "#게임파이러버"],
    recommendedCommunities: ["메타버스 플랫폼 커뮤니티", "게임 길드"],
    nftDescription: "사이버펑크 풍 도시를 배경으로 VR 헤드셋을 쓴 아바타가 여러 가상 세계를 배회하는 모습"
  },
  {
    id: "builder",
    name: "BUIDLer",
    emoji: "👷‍♂️🛠️",
    description: "'투자보다 구축'을 신조로 삼는 빌더형 인물입니다. 이들은 개발자이거나 프로젝트 기획자로, 새로운 스마트 컨트랙트를 만들거나 dApp을 출시하면서 코드를 통해 웹3에 기여합니다.",
    keywords: ["#개발자", "#해커톤매니아", "#디버거", "#BUIDL"],
    recommendedCommunities: ["Ethereum Developers Korea", "해커톤 참가자 디스코드"],
    nftDescription: "노트북과 코드 에디터 화면을 배경으로, 공사용 헬멧을 쓴 캐릭터"
  },
  {
    id: "security-sentinel",
    name: "Security Sentinel",
    emoji: "🛡️🔒",
    description: "보안을 최우선으로 하는 온체인 보안 수호자입니다. 이들은 지갑을 2중, 3중으로 관리하고, 하드웨어 지갑 없이는 어떤 트랜잭션도 승인하지 않을 정도로 신중합니다.",
    keywords: ["#보안깐부", "#드물게트랜잭션", "#체크또체크"],
    recommendedCommunities: ["하드웨어 월렛 사용자 모임", "보안 경고 공유 채널"],
    nftDescription: "갑옷을 입고 방패와 자물쇠를 든 기사 캐릭터가 금고를 지키는 모습"
  },
  {
    id: "privacy-purist",
    name: "Privacy Purist",
    emoji: "🕵️‍♀️🗝️",
    description: "프라이버시 지상주의자로, 완전한 익명성과 검열 저항을 추구하는 유형입니다. Monero와 같은 프라이버시 코인이나 Mixer 서비스를 활용해 자신의 온체인 활동이 추적되지 않도록 합니다.",
    keywords: ["#익명성추구", "#사이버펑크", "#내데이터내꺼"],
    recommendedCommunities: ["프라이버시 코인 포럼", "프라이버시 지향 SNS 사용자 모임"],
    nftDescription: "얼굴을 가이 폭스 가면이나 익명 마스크로 가린 해커 캐릭터"
  },
  {
    id: "maximalist",
    name: "Maximalist",
    emoji: "⚡🙏",
    description: "하나의 코인/체인을 맹목적으로 신봉하는 맥시멀리스트입니다. 비트코인, 이더리움, 혹은 특정 L1/L2 중 어느 한 가지를 선택해 '원 코인 교주'처럼 굴며 신념을 가집니다.",
    keywords: ["#맥시멀리스트", "#한우물파기", "#OO교도"],
    recommendedCommunities: ["해당 코인 공식 카카오톡/텔방", "맥시 멤버들이 모인 트위터 리스트"],
    nftDescription: "한 손에 자신이 신봉하는 코인의 로고 깃발을 들고 있는 수도승/전사 캐릭터"
  },
  {
    id: "omnichain-wanderer",
    name: "Omnichain Wanderer",
    emoji: "🌍🔗",
    description: "크로스체인 방랑자입니다. 이더리움, 솔라나, 폴리곤, 앱토스 등 유망하다는 체인은 전부 경험해보며, 체인 간 자산 이동과 브릿징에 능숙합니다.",
    keywords: ["#크로스체인", "#멀티지갑장인", "#탈중앙여행자"],
    recommendedCommunities: ["Layer0/브릿지 관련 포럼", "다중체인 지갑 유저 모임"],
    nftDescription: "여행자 캐릭터가 배낭에 여러 체인의 로고 스티커를 붙이고 있는 모습"
  },
  {
    id: "whale",
    name: "Whale",
    emoji: "🐳💰",
    description: "고래형 유저로, 막대한 자본을 움직이는 영향력 있는 투자자입니다. 한 번 거래로 시장에 파동을 일으킬 수 있을 정도의 큰 지갑을 보유하고 있습니다.",
    keywords: ["#고래지갑", "#큰손", "#시장메이커", "#넉넉재력"],
    recommendedCommunities: ["프라이빗 인비테이션 전용 채팅", "Whale Alert 팔로우"],
    nftDescription: "의인화된 귀여운 고래 캐릭터가 금화 더미 위에 앉아있거나, 한 지느러미로 시장 그래프를 움직이는 모습"
  },
  {
    id: "community-connector",
    name: "Community Connector",
    emoji: "🤝🎉",
    description: "'GM! GN!' 인사를 하루도 빼먹지 않는 커뮤니티 인싸 유형입니다. 트위터, 디스코드, 텔레그램 등 소셜 미디어에서 얼굴마담으로 활약하며, 프로젝트 소식이나 밈을 빠르게 공유합니다.",
    keywords: ["#인싸", "#소셜왕", "#GM마스터", "#밈전도사"],
    recommendedCommunities: ["트위터 크립토계", "디스코드 여러 서버"],
    nftDescription: "여러 사람들이 둘러서서 손을 하이파이브하는 가운데 중심에 웃는 얼굴의 캐릭터"
  },
  {
    id: "alpha-seeker",
    name: "Alpha Seeker",
    emoji: "🕵️‍♂️💡",
    description: "항상 초기 정보와 알파를 찾아 헤매는 유형입니다. 트위터나 디스코드를 항상 체크하며 새로운 프로젝트 정보를 찾고, 유명 인플루언서를 팔로우하여 힌트를 얻습니다.",
    keywords: ["#알파헌터", "#얼리버드", "#정보통"],
    recommendedCommunities: ["Secret Alpha 디스코드", "크립토 인플루언서 팔로워 모임"],
    nftDescription: "돋보기를 들고 정보를 찾아다니는 탐정 모습의 캐릭터"
  },
  {
    id: "meme-lord",
    name: "Meme Lord",
    emoji: "🐸🎭",
    description: "웹3 밈 문화의 최첨단을 달리는 밈 로드입니다. WAGMI, GM, NGMI 같은 웹3 밈어를 자유자재로 구사하며 트위터나 디스코드에서 재치있는 밈을 만들어 공유합니다.",
    keywords: ["#밈장인", "#유머러", "#바이럴러"],
    recommendedCommunities: ["Crypto Twitter 밈 계정들", "Dank Meme 디스코드"],
    nftDescription: "여러 유명 웹3 밈을 합성한 이미지를 들고 있는 코믹한 캐릭터"
  },
  {
    id: "solidity-sage",
    name: "Solidity Sage",
    emoji: "🧙‍♂️💻",
    description: "스마트 컨트랙트 개발의 달인입니다. 솔리디티 코드를 자유자재로 다루며, 취약점 분석부터 가스 최적화까지 컨트랙트의 모든 측면에 정통합니다.",
    keywords: ["#개발자", "#솔리디티장인", "#스마트컨트랙트마스터"],
    recommendedCommunities: ["이더리움 개발자 포럼", "Code4rena 감사자 모임"],
    nftDescription: "마법사 모자를 쓰고 코드 화면 앞에서 주문을 외우는 듯한 개발자 캐릭터"
  },
  {
    id: "governance-guru",
    name: "Governance Guru",
    emoji: "🗳️👑",
    description: "DAO 거버넌스의 달인으로, 여러 프로젝트의 제안(Proposal)을 꼼꼼히 검토하고 투표에 참여합니다. 토론과 합의 과정에 열정적이며 코드보다 정치와 경제학에 관심이 많습니다.",
    keywords: ["#다오마스터", "#투표참여자", "#거버넌스전문가"],
    recommendedCommunities: ["큰 DAO의 거버넌스 포럼", "거버넌스 디스코드 채널"],
    nftDescription: "한 손에 투표권을 들고 다른 손으로 발언하는 포즈의 로마 정치가 스타일 캐릭터"
  },
  {
    id: "layer2-pioneer",
    name: "Layer 2 Pioneer",
    emoji: "⚡💨",
    description: "가스비와 확장성 문제 해결에 진심인 L2 개척자입니다. Optimism, Arbitrum, zkSync 등 다양한 L2 솔루션에 적극적으로 참여하며, 메인넷보다 L2에서 활동하는 것을 선호합니다.",
    keywords: ["#확장성지지자", "#L2애호가", "#낮은수수료", "#빠른트랜잭션"],
    recommendedCommunities: ["L2 개발자 포럼", "L2Beat 커뮤니티", "Optimism Collective"],
    nftDescription: "번개 날개를 단 캐릭터가 여러 레이어를 신속하게 넘나드는 모습, 배경에는 네트워크 확장 그래프"
  },
  {
    id: "refi-advocate",
    name: "ReFi Advocate",
    emoji: "🌱💚",
    description: "재생 금융(ReFi)을 옹호하는 웹3 환경주의자입니다. 탄소 중립 프로젝트, 기후 행동 DAO, 환경 관련 NFT 등 긍정적인 사회적 영향을 추구하는 웹3 이니셔티브에 참여합니다.",
    keywords: ["#임팩트투자", "#지속가능성", "#녹색블록체인", "#공익지향"],
    recommendedCommunities: ["Gitcoin DAO", "Klimadao", "재생 금융 포럼"],
    nftDescription: "지구를 감싸 안은 손에서 블록체인으로 연결된 나무와 식물이 자라나는 이미지"
  },
  {
    id: "arbitrage-specialist",
    name: "Cross-chain Arbitrageur",
    emoji: "⚖️💱",
    description: "여러 체인과 DEX 간의 가격 차이를 발견하고 활용하는 차익거래 전문가입니다. 빠른 판단력과 기술적 이해를 바탕으로 시장 비효율성을 활용해 이익을 얻으며, 동시에 시장 효율성에 기여합니다.",
    keywords: ["#차익거래", "#크로스체인전략가", "#시장효율성", "#MEV사냥꾼"],
    recommendedCommunities: ["MEV 연구 그룹", "트레이딩 알고리즘 포럼", "크로스체인 브릿지 커뮤니티"],
    nftDescription: "여러 체인 사이를 연결하는 균형 저울을 들고 있는 캐릭터, 배경에는 다양한 가격 차트가 보임"
  }
];

// 모든 유형에 commonTraits 필드를 보장하도록 기본값 설정
personalityTypes.forEach(pt => {
  pt.commonTraits = pt.commonTraits ?? [];
});

// 웹3 성격검사 질문 20개
export const questions = [
  {
    id: 1,
    text: "당신은 새로운 DeFi 프로토콜에서 연 1000%의 유동성 공급 이자를 제시한다는 소식을 들었습니다. 이때 당신의 반응은 무엇인가요?",
    options: [
      { value: 1, text: "'무조건 참여!' 남들보다 먼저 소액이라도 넣어본다." },
      { value: 2, text: "'조사부터.' 바로 뛰어들기보다 먼저 리서치하고 안전성 검증 후 움직인다." },
      { value: 3, text: "'의심된다.' 그런 고이율은 사기일 가능성이 크므로 관망한다." },
      { value: 4, text: "'흥미 없다.' 복잡한 디파이보다는 검증된 투자만 하는 편이다." }
    ]
  },
  {
    id: 2,
    text: "NFT에 대한 당신의 생각은?",
    options: [
      { value: 1, text: "'디지털 아트 혁명이다.' 진지하게 가치가 있다고 믿는다." },
      { value: 2, text: "'재미있는 수집품.' 밈이나 PFP로 재미를 느낀다." },
      { value: 3, text: "'단타 투자 수단.' 싸게 사서 비싸게 팔면 그만인 자산으로 본다." },
      { value: 4, text: "'거품이다.' 실체 없는 자산이니 관심 없다." }
    ]
  },
  {
    id: 3,
    text: "암호화폐 가격이 30% 폭락한 날, 당신의 행동은?",
    options: [
      { value: 1, text: "패닉에 팔아버린다. 더 떨어질까 봐 불안해서 일단 현금화한다." },
      { value: 2, text: "아무것도 하지 않는다. 이런 변동은 일상이라 느긋하게 존버한다." },
      { value: 3, text: "더 산다. 세일 기간이라 생각하고 평소보다 더 매수한다." },
      { value: 4, text: "관심 없다. 가격 변동에 일희일비하지 않고 기술만 바라본다." }
    ]
  },
  {
    id: 4,
    text: "당신은 DAO 거버넌스 투표에 참여해본 적이 있나요?",
    options: [
      { value: 1, text: "전혀 없고 관심도 없다." },
      { value: 2, text: "아직은 없지만 기회가 있으면 해보고 싶다." },
      { value: 3, text: "몇 번 해봤지만 적극적이진 않다." },
      { value: 4, text: "자주 참여하며, 제안 글도 쓰고 투표 독려도 한다." }
    ]
  },
  {
    id: 5,
    text: "웹3 관련 결정을 내릴 때 당신에게 더 중요한 것은?",
    options: [
      { value: 1, text: "커뮤니티의 합의. 모두의 의견을 모아 결정하는 과정." },
      { value: 2, text: "나의 직감. 남들 의견보다 내 촉과 아이디어." },
      { value: 3, text: "데이터와 분석. 수치와 팩트에 근거한 판단." },
      { value: 4, text: "윤리와 가치. 이 결정이 거시적으로 좋은 방향인가." }
    ]
  },
  {
    id: 6,
    text: "새로운 블록체인이 출시되었을 때 당신은 어떻게 행동하나요?",
    options: [
      { value: 1, text: "즉시 지갑을 연결하고 이것저것 테스트해본다." },
      { value: 2, text: "기술 백서를 읽고 팀 배경을 리서치한다." },
      { value: 3, text: "다른 사람들의 사용 후기를 기다린다." },
      { value: 4, text: "메인넷 런칭 후 안정기에 접어들 때까지 관망한다." }
    ]
  },
  {
    id: 7,
    text: "웹3 프로젝트에서 가장 중요하게 생각하는 가치는?",
    options: [
      { value: 1, text: "탈중앙화와 검열 저항성" },
      { value: 2, text: "사용자 경험(UX)과 접근성" },
      { value: 3, text: "경제적 인센티브와 토큰노믹스" },
      { value: 4, text: "커뮤니티와 공동 거버넌스" }
    ]
  },
  {
    id: 8,
    text: "지갑 보안에 대한 당신의 접근 방식은?",
    options: [
      { value: 1, text: "하드웨어 지갑 다중 서명, 콜드월렛 등 최고 수준의 보안을 유지한다." },
      { value: 2, text: "주요 자금은 하드웨어 지갑에, 소액은 메타마스크에 보관한다." },
      { value: 3, text: "불편해도 기본적인 보안 수칙은 지키려고 노력한다." },
      { value: 4, text: "편리함을 위해 핫월렛 위주로 사용하며 보안은 크게 신경쓰지 않는다." }
    ]
  },
  {
    id: 9,
    text: "메타버스에 대한 당신의 생각은?",
    options: [
      { value: 1, text: "정기적으로 가상 공간에서 시간을 보내며 가상 부동산도 소유하고 있다." },
      { value: 2, text: "가끔 호기심에 들어가보고 이벤트에 참여하기도 한다." },
      { value: 3, text: "아직은 시기상조라고 생각하지만, 미래에 잠재력이 있다고 본다." },
      { value: 4, text: "과장된 마케팅일 뿐, 현실 세계에 집중하는 편이다." }
    ]
  },
  {
    id: 10,
    text: "에어드랍에 대한 당신의 접근 방식은?",
    options: [
      { value: 1, text: "모든 신규 프로젝트에 참여하고 지갑을 여러 개 만들어 최대한 많이 받으려 한다." },
      { value: 2, text: "진짜 사용할 프로젝트만 선별해서 참여한다." },
      { value: 3, text: "큰 기대 없이 가끔 참여하고 받으면 보너스라고 생각한다." },
      { value: 4, text: "공수가 많이 들어가는 일은 안 하고 자연스럽게 사용하다 받는 것만 챙긴다." }
    ]
  },
  {
    id: 11,
    text: "새로운 웹3 트렌드가 등장했을 때 당신은?",
    options: [
      { value: 1, text: "트렌드를 이끄는 사람이 되고 싶어 빠르게 참여하고 콘텐츠도 생산한다." },
      { value: 2, text: "확실한 정보를 수집한 후 신중하게 참여 여부를 결정한다." },
      { value: 3, text: "대중의 반응을 보고 어느 정도 검증된 후에 참여한다." },
      { value: 4, text: "대부분의 트렌드는 일시적이므로 무시하고 본인의 길을 간다." }
    ]
  },
  {
    id: 12,
    text: "토큰 투자에 대한 당신의 전략은?",
    options: [
      { value: 1, text: "고위험-고수익을 노리며 작은 시총의 알트코인에 투자한다." },
      { value: 2, text: "가치투자를 지향하며 기본적으로 탄탄한 프로젝트에 장기 투자한다." },
      { value: 3, text: "비트코인/이더리움 같은 블루칩 중심으로 안전하게 투자한다." },
      { value: 4, text: "기술과 유틸리티에만 관심 있고 투기적 투자는 하지 않는다." }
    ]
  },
  {
    id: 13,
    text: "웹3 커뮤니티 활동에서 당신의 역할은?",
    options: [
      { value: 1, text: "리더/모더레이터로 활동하며 커뮤니티를 이끌고 활성화시킨다." },
      { value: 2, text: "적극적으로 토론에 참여하고 정보와 의견을 공유한다." },
      { value: 3, text: "lurker(잠복자)로 주로 읽기만 하며 가끔 댓글을 단다." },
      { value: 4, text: "정보 수집 목적으로만 가입하고 거의 활동하지 않는다." }
    ]
  },
  {
    id: 14,
    text: "프라이버시에 대한 당신의 생각은?",
    options: [
      { value: 1, text: "완전한 익명성이 중요하며 프라이버시 보호 도구를 적극 활용한다." },
      { value: 2, text: "기본적인 프라이버시는 지키려 하지만 편의성과 균형을 맞춘다." },
      { value: 3, text: "투명성이 프라이버시보다 중요하다고 생각한다." },
      { value: 4, text: "신경쓰지 않으며 필요시 개인정보 공개에도 거부감이 없다." }
    ]
  },
  {
    id: 15,
    text: "NFT 프로젝트에 참여하는 주된 이유는?",
    options: [
      { value: 1, text: "디지털 아트와 컬렉션에 진정한 가치를 느껴서" },
      { value: 2, text: "커뮤니티 소속감과 독점 혜택을 위해" },
      { value: 3, text: "단기 수익과 플립(재판매) 기회를 노려서" },
      { value: 4, text: "참여하지 않는다." }
    ]
  },
  {
    id: 16,
    text: "웹3 기술 학습에 투자하는 시간은?",
    options: [
      { value: 1, text: "매일 몇 시간씩 개발 문서, 강의, 코드를 학습한다." },
      { value: 2, text: "정기적으로 트렌드를 따라가고 필요한 기술을 익힌다." },
      { value: 3, text: "기본적인 개념만 이해하고 필요할 때 검색한다." },
      { value: 4, text: "기술보다는 사용과 투자에 관심이 있어 깊게 파지 않는다." }
    ]
  },
  {
    id: 17,
    text: "온체인 신원(Identity)에 대해 어떻게 생각하나요?",
    options: [
      { value: 1, text: "ENS, NFT PFP 등으로 온체인 정체성을 적극적으로 구축한다." },
      { value: 2, text: "몇 가지 기본적인 디지털 아이덴티티를 관리한다." },
      { value: 3, text: "온라인과 오프라인 정체성은 분리되어야 한다고 생각한다." },
      { value: 4, text: "디지털 신원에 특별한 의미를 두지 않는다." }
    ]
  },
  {
    id: 18,
    text: "웹3 이벤트나 컨퍼런스에 참여하나요?",
    options: [
      { value: 1, text: "가능한 모든 이벤트에 참석하고 네트워킹을 즐긴다." },
      { value: 2, text: "중요한 컨퍼런스는 선별해서 참석한다." },
      { value: 3, text: "온라인으로만 팔로우하고 현장 참석은 거의 하지 않는다." },
      { value: 4, text: "전혀 관심이 없다." }
    ]
  },
  {
    id: 19,
    text: "웹3에서 얻고자 하는 주된 가치는?",
    options: [
      { value: 1, text: "경제적 자유와 새로운 투자 기회" },
      { value: 2, text: "기술적 혁신과 미래 산업 참여" },
      { value: 3, text: "커뮤니티 소속감과 사회적 연결" },
      { value: 4, text: "개인의 주권과 탈중앙화된 시스템" }
    ]
  },
  {
    id: 20,
    text: "웹3의 미래에 대한 당신의 전망은?",
    options: [
      { value: 1, text: "모든 산업을 혁신하고 인터넷의 기본 인프라가 될 것이다." },
      { value: 2, text: "특정 영역에서 중요한 역할을 하지만 전통 시스템과 공존할 것이다." },
      { value: 3, text: "니치 시장으로 남을 것이지만 열렬한 팬층은 유지될 것이다." },
      { value: 4, text: "현재 형태로는 지속되기 어렵고 많은 부분이 변화해야 한다." }
    ]
  },
  {
    id: 21,
    text: "웹3에 참여하는 가장 큰 이유는 무엇인가요?",
    options: [
      { value: 1, text: "경제적 이득과 새로운 투자 기회를 찾기 위해" },
      { value: 2, text: "최첨단 기술과 혁신에 참여하고 싶어서" },
      { value: 3, text: "탈중앙화와 개인 주권 같은 가치를 지지하기 때문에" },
      { value: 4, text: "웹3 커뮤니티에 소속감을 느끼고 연결되고 싶어서" }
    ]
  },
  {
    id: 22,
    text: "지지하는 프로젝트에 대한 부정적 뉴스를 접했을 때 어떻게 반응하나요?",
    options: [
      { value: 1, text: "FUD(공포/불확실성/의심)일 뿐이라 생각하고 무시한다" },
      { value: 2, text: "사실 여부를 확인하고 객관적으로 재평가한다" },
      { value: 3, text: "걱정되어 즉시 자산을 정리하거나 포지션을 줄인다" },
      { value: 4, text: "커뮤니티의 반응을 살피고 집단 지성에 의존한다" }
    ]
  },
  {
    id: 23,
    text: "L2(Layer 2) 솔루션에 대한 당신의 태도는?",
    options: [
      { value: 1, text: "적극적으로 사용하며 L2 생태계 발전에 기여한다" },
      { value: 2, text: "필요할 때만 사용하지만 유용성을 인정한다" },
      { value: 3, text: "아직 안전성이 검증되지 않아 조심스럽게 접근한다" },
      { value: 4, text: "L1의 확장성이 개선될 때까지 기다리는 편이다" }
    ]
  },
  {
    id: 24,
    text: "웹3 활동이 환경에 미치는 영향에 대해 어떻게 생각하나요?",
    options: [
      { value: 1, text: "매우 걱정하며 친환경 프로젝트와 PoS 체인만 지지한다" },
      { value: 2, text: "환경 문제는 중요하지만, 이를 위한 기술적 발전을 기대한다" },
      { value: 3, text: "다른 산업에 비해 과장된 문제라고 생각한다" },
      { value: 4, text: "효율성과 확장성이 더 중요하므로 크게 고려하지 않는다" }
    ]
  },
  {
    id: 25,
    text: "여러 체인 간 자산 가격 차이를 발견했을 때 어떻게 행동하나요?",
    options: [
      { value: 1, text: "즉시 차익거래 기회를 활용하여 이익을 취한다" },
      { value: 2, text: "위험을 평가한 후 합리적이라면 적절한 규모로 시도한다" },
      { value: 3, text: "너무 복잡하거나 위험해 보여서 참여하지 않는다" },
      { value: 4, text: "시장 효율성에 관심이 있어 관찰만 하고 기록한다" }
    ]
  }
];

export const typeWeights: Record<string, Record<number, number>> = {
  "explorer": { 1: 2, 6: 2, 9: 1.5, 11: 1.5, 18: 1.5, 21: 1 },
  "dao-dreamer": { 4: 2, 7: 2, 13: 1.5, 16: 1, 19: 1.5, 21: 1 },
  "airdrop-hunter": { 1: 1.5, 6: 1.5, 10: 2, 11: 1.5, 17: 1, 21: 1 },
  "defi-degen": { 1: 2, 3: 1.5, 10: 1, 12: 2, 19: 1.5, 22: 1 },
  "diamond-hands": { 3: 2, 11: 1, 12: 2, 19: 1, 20: 1.5, 22: 1.5 },
  "paper-hands": { 3: 2, 11: 1.5, 12: 2, 13: 1, 19: 1, 22: 2 },
  "nft-collector": { 2: 2, 9: 1, 15: 2, 17: 1.5, 18: 1, 21: 1 },
  "metaverse-nomad": { 2: 1, 9: 2, 15: 1, 17: 1.5, 18: 1.5, 21: 1.5 },
  "builder": { 6: 1.5, 7: 1.5, 13: 2, 16: 2, 20: 1, 21: 1.5 },
  "security-sentinel": { 1: 1, 8: 2, 14: 1.5, 16: 1.5, 20: 1, 22: 1.5 },
  "privacy-purist": { 7: 1.5, 8: 1.5, 14: 2, 17: 1.5, 19: 2, 21: 2 },
  "maximalist": { 7: 2, 11: 1.5, 12: 2, 13: 1.5, 20: 2, 22: 1 },
  "omnichain-wanderer": { 3: 1, 6: 2, 9: 1, 17: 1, 18: 1.5, 23: 1.5 },
  "whale": { 3: 1.5, 8: 1.5, 12: 2, 18: 1.5, 19: 2, 25: 1 },
  "community-connector": { 4: 1, 13: 2, 15: 1.5, 17: 1.5, 18: 2, 21: 2 },
  "alpha-seeker": { 6: 1.5, 10: 1.5, 11: 2, 13: 1.5, 16: 1.5, 22: 1.5 },
  "meme-lord": { 2: 1.5, 11: 2, 13: 2, 15: 1, 17: 1.5, 21: 2 },
  "solidity-sage": { 7: 1.5, 8: 1.5, 13: 1.5, 16: 2, 20: 1.5, 21: 1.5 },
  "governance-guru": { 4: 2, 7: 2, 13: 2, 16: 1.5, 19: 1.5, 21: 1.5 },
  "layer2-pioneer": { 6: 1.5, 7: 2, 16: 1.5, 20: 1.5, 21: 1.5, 23: 2 },
  "refi-advocate": { 5: 1.5, 7: 2, 19: 2, 20: 1.5, 21: 1.5, 24: 2 },
  "arbitrage-specialist": { 1: 1.5, 3: 1.5, 6: 1.5, 12: 2, 23: 1.5, 25: 2 }
};

export const typePreferences: Record<string, Record<number, number>> = {
  "explorer": { 1: 1, 6: 1, 9: 1, 11: 1, 18: 1, 21: 2 },
  "dao-dreamer": { 4: 4, 7: 4, 13: 1, 16: 2, 19: 3, 21: 3 },
  "airdrop-hunter": { 1: 1, 6: 1, 10: 1, 11: 2, 17: 2, 21: 1 },
  "defi-degen": { 1: 1, 3: 3, 10: 1, 12: 1, 19: 1, 22: 1 },
  "diamond-hands": { 3: 2, 11: 4, 12: 2, 19: 2, 20: 1, 22: 1 },
  "paper-hands": { 3: 1, 11: 3, 12: 1, 13: 3, 19: 1, 22: 3 },
  "nft-collector": { 2: 1, 9: 2, 15: 1, 17: 1, 18: 2, 21: 4 },
  "metaverse-nomad": { 2: 2, 9: 1, 15: 2, 17: 1, 18: 1, 21: 4 },
  "builder": { 6: 2, 7: 2, 13: 1, 16: 1, 20: 1, 21: 2 },
  "security-sentinel": { 1: 2, 8: 1, 14: 1, 16: 1, 20: 3, 22: 2 },
  "privacy-purist": { 7: 1.5, 8: 1.5, 14: 2, 17: 1.5, 19: 2, 21: 2 },
  "maximalist": { 7: 2, 11: 4, 12: 3, 13: 1, 20: 1, 22: 1 },
  "omnichain-wanderer": { 3: 3, 6: 1, 9: 2, 17: 1, 18: 1, 23: 1 },
  "whale": { 3: 3, 8: 1, 12: 1, 18: 1, 19: 1, 25: 1 },
  "community-connector": { 4: 1, 13: 2, 15: 1.5, 17: 1.5, 18: 2, 21: 2 },
  "alpha-seeker": { 6: 1, 10: 2, 11: 1, 13: 2, 16: 2, 22: 2 },
  "meme-lord": { 2: 2, 11: 1, 13: 1, 15: 2, 17: 1, 21: 4 },
  "solidity-sage": { 7: 2, 8: 1, 13: 2, 16: 1, 20: 2, 21: 2 },
  "governance-guru": { 4: 2, 7: 2, 13: 2, 16: 1.5, 19: 1.5, 21: 1.5 },
  "layer2-pioneer": { 6: 1.5, 7: 2, 16: 1.5, 20: 1.5, 21: 1.5, 23: 2 },
  "refi-advocate": { 5: 1.5, 7: 2, 19: 2, 20: 1.5, 21: 1.5, 24: 2 },
  "arbitrage-specialist": { 1: 1.5, 3: 1.5, 6: 1.5, 12: 2, 23: 2, 25: 1 }
};

export const typeSimilarities: Record<string, string[]> = {
  "explorer": ["omnichain-wanderer", "airdrop-hunter", "layer2-pioneer"],
  "dao-dreamer": ["governance-guru", "community-connector", "refi-advocate"],
  "airdrop-hunter": ["explorer", "alpha-seeker", "paper-hands"],
  "defi-degen": ["arbitrage-specialist", "whale", "paper-hands"],
  "diamond-hands": ["maximalist", "whale", "security-sentinel"],
  "paper-hands": ["defi-degen", "airdrop-hunter", "arbitrage-specialist"],
  "nft-collector": ["metaverse-nomad", "community-connector", "meme-lord"],
  "metaverse-nomad": ["nft-collector", "community-connector", "explorer"],
  "builder": ["solidity-sage", "layer2-pioneer", "security-sentinel"],
  "security-sentinel": ["privacy-purist", "builder", "diamond-hands"],
  "privacy-purist": ["security-sentinel", "builder", "refi-advocate"],
  "maximalist": ["diamond-hands", "whale", "community-connector"],
  "omnichain-wanderer": ["explorer", "arbitrage-specialist", "layer2-pioneer"],
  "whale": ["diamond-hands", "defi-degen", "maximalist"],
  "community-connector": ["meme-lord", "dao-dreamer", "governance-guru"],
  "alpha-seeker": ["airdrop-hunter", "arbitrage-specialist", "explorer"],
  "meme-lord": ["community-connector", "nft-collector", "alpha-seeker"],
  "solidity-sage": ["builder", "layer2-pioneer", "security-sentinel"],
  "governance-guru": ["dao-dreamer", "community-connector", "refi-advocate"],
  "layer2-pioneer": ["builder", "omnichain-wanderer", "solidity-sage"],
  "refi-advocate": ["dao-dreamer", "governance-guru", "privacy-purist"],
  "arbitrage-specialist": ["defi-degen", "omnichain-wanderer", "alpha-seeker"]
}; 