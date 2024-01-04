const ethers = require('ethers');

// 랜덤 니모닉 생성
const randomMnemonic = ethers.Wallet.createRandom().mnemonic;
console.log('randomMnemonic: ', randomMnemonic);

// 니모닉으로 지갑 생성
const wallet = ethers.Wallet.fromPhrase(randomMnemonic.phrase);

console.log('privateKey: ', wallet.privateKey);

// 테스트넷 선택
const provider = ethers.getDefaultProvider('goerli');
const walletWithProvider = wallet.connect(provider);

console.log('address: ', walletWithProvider.address);

