"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TeamRanking from "../teamComponent/TeamRanking";
import Link from "next/link";
import GetBelongTeam from "../teamComponent/GetBelongTeam";

export default function TeamSpecific() {
  // 팀 메인 페이지 그리드 스타일
  const teamMainStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 0.5fr",
    gridTemplateRows: "1fr 0.5fr",
    gap: "10px 10px",
    gridTemplateAreas: `
      ". . . ."
      ". . . ."
      `,
  };

  return (
    <div className="teamMain">
      <div style={teamMainStyle}>
        <Image src="/team-main.png" alt="team" width={180} height={180} />

        {/* 팀 검색 */}
        <Link href="/team/search">
          <Button
            className="teamMemberSearch"
            variant="outlined"
            startIcon={<SearchIcon />}
          >
            팀 검색
          </Button>
        </Link>
      </div>

      {/* 소속 팀 */}
      <GetBelongTeam/>
      
      {/* <div className="teamRanking">
        <TeamRanking />
      </div> */}
    </div>
  );
}
