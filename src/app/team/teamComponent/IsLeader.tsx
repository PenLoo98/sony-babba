"use client";

import React from "react";

type Props = {
  isLeader: boolean;
  setIsLeader: (isLeader: boolean) => void;
  children: React.ReactNode;
};

export default function IsLeader({isLeader, setIsLeader, children}: Props) {
  // TODO: 팀장 여부 확인하기
  // fetch를 통해 팀장 여부를 확인한다.

  // 1. 로그인한 유저의 팀 정보를 가져온다.
  // 2. 팀 정보에서 팀장의 id를 가져온다.
  // 3. 로그인한 유저의 id와 팀장의 id를 비교한다.
  // 4. 같으면 팀장이고, 다르면 팀원이다.

  return (
    <div className="isLeader">
    <button onClick={() => setIsLeader(!isLeader)}>
        {isLeader ? "팀장" : "팀원"}
    </button>
    {children}
    </div>
  );
}
