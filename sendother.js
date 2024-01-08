const ethers = require('ethers');

const provider = new ethers.JsonRpcProvider('https://ethereum-holesky.publicnode.com');

// 송신자 지갑 개인 키 (절대로 공개하지 마세요!)
const senderPrivateKey = '0xd405ffd2180abab8803095b7027d3f92a8ad2aab52e1a3d9a3e98007da82db45'; // 여기에 실제 개인 키를 입력하세요.
const wallet = new ethers.Wallet(senderPrivateKey, provider);

// 토큰 컨트랙트 정보
const tokenAddress = '0x70d94C00663225117f6Bc383FF30a8c887BA869E'; // 대상 토큰 컨트랙트 주소
const tokenABI = [
  // ERC-20 토큰의 ABI 중 transfer 함수만 포함
  "function transfer(address to, uint amount) returns (bool)"
];

// 토큰 컨트랙트와 상호작용하기 위한 객체 생성
const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);

console.log('tokenContract:', tokenContract);

// 토큰 전송 함수
async function sendToken(recipient, amount) {
  // 토큰의 소수점을 고려한 양 조정
  // const numberOfTokens = ethers.parseUnits(amount.toString(), '18'); // 토큰 소수점
  const numberOfTokens = ethers.parseUnits(amount.toString(), 18); // 토큰 소수점

  // // 토큰 전송 트랜잭션 생성
  const tx = await tokenContract.transfer(recipient, numberOfTokens);
  console.log('Transaction hash:', tx.hash);

  // // 트랜잭션 영수증을 기다림
  const receipt = await tx.wait();
  console.log('Transaction confirmed:', receipt);
}

// 토큰 전송 실행
const recipientAddress = '0x9461305B5Dc8CE780005aE4c634e20adf88d1792'; // 수신자 주소
const sendAmount = 100000; // 전송할 토큰 양

sendToken(recipientAddress, sendAmount);