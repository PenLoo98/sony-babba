"use client";

import { useEffect, useState } from "react";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
  }
}

type ABIDefinition = {
  constant?: boolean;
  inputs?: Array<{ name: string; type: string; indexed?: boolean }>;
  name?: string;
  outputs?: Array<{ name: string; type: string }>;
  payable?: boolean;
  stateMutability?: "nonpayable" | "payable" | "pure" | "view";
  type?: "function" | "constructor" | "event" | "fallback";
  anonymous?: boolean;
};

export default function MvpPage() {
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);

      // ABI와 컨트랙트 주소

      const ABI: ABIDefinition[] = []; // 실제 ABI 값
      const contractAddress = ""; // 실제 컨트랙트 주소

      // 컨트랙트 인스턴스 생성
      // const contractInstance = new web3.eth.Contract(ABI, contractAddress);

      // setContract(contractInstance);
    } else {
      alert("Please install MetaMask!");
    }
  }, []);

  // 컨트랙트의 getBalance 함수 호출
  const getBalance = async () => {
    if (contract) {
      const fromAddress = ""; // 실제 from 주소
      try {
        const balance = await contract.methods
          .getBalance()
          .call({ from: fromAddress });
        console.log(balance);
      } catch (error) {
        console.error(`Failed to call getBalance: ${error}`);
      }
    }
  };

  // 기존의 코드를 유지하면서, 추가적인 JSX나 로직을 추가
  return (
    <div>
      {/* 기존의 JSX 코드 */}
      <button onClick={getBalance}>Get Balance</button>
    </div>
  );
}
