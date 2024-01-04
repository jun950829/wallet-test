const ethers = require('ethers');

// 사용할 네트워크와 연결

// const provider = new ethers.InfuraProvider('goerli', 'e6ef79fb204a4504b62c257931cfcc1f')
const provider = new ethers.JsonRpcProvider('https://ethereum-holesky.publicnode.com');

// 송신자 지갑 개인 키 (절대로 공개하지 마세요!)
const senderPrivateKey = '0x6d2d0100769937b26c2f1a170d32c2838f2984d8efbd7ae6ef77428415d71712'; // 여기에 실제 개인 키를 입력하세요.
const senderWallet = new ethers.Wallet(senderPrivateKey, provider);

console.log(senderWallet);
// 수신자 주소
const recipientAddress = '0x8990938473915cd89a29c797DECA539885a031d1';

// 이더 전송 함수 정의
async function sendEther() {
  // 트랜잭션 객체 생성
  const tx = {
    to: recipientAddress,
    // 전송할 이더의 양 - ethers.js 유틸리티를 사용하여 이더 단위로 변환
    // value: ethers.utils.parseEther("0.1") // 예시로 0.01 이더를 전송합니다.
    value: ethers.parseEther("0.1") // 예시로 0.01 이더를 전송합니다.
  };

  try {
    // 트랜잭션 전송하고 결과를 기다림
    const txResponse = await senderWallet.sendTransaction(tx);
    console.log(`Transaction hash: ${txResponse.hash}`);

    // 트랜잭션이 채굴될 때까지 기다림  
    const receipt = await txResponse.wait();
    console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
  } catch (error) {
    console.error("Error sending ether:", error);
  }
}

// 이더 전송 함수 호출
sendEther();
