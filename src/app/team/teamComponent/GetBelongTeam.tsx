"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import GroupsIcon from "@mui/icons-material/Groups";
import CreateTeamButton from "./CreateTeamButton";

type belongInfo = {
  teamId: number;
  teamName: string;
  sports: string;
  leaderId: number;
  leaderName: string;
  userCount: number;
};

type getBelongTeamInfo = {
  code?: string;
  message?: string;
  data: belongInfo[];
};

export default function GetBelongTeam() {
  async function fetchUserBelongTeam() {
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");
    const getUserBelongTeamAPI: string = `https://withsports.shop:8000/team-service/team/teams`;

    const response = await fetch(getUserBelongTeamAPI, {
      headers: {
        Credentials: "include",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: getBelongTeamInfo) => {
        if (data.code === "SUCCESS") {
          console.log("data:");
          console.log(data);
          // return data.data;
          for (let i = 0; i < data.data.length; i++) {
            console.log("data.data[i]: ");
            console.log(data.data[i]);
            if (data.data[i].sports == "축구") {
              setBelongSoccerTeam(true);
              setBelongSoccerTeamId(data.data[i].teamId);
            }
            if (data.data[i].sports == "풋살") {
              setBelongFutsalTeam(true);
              setBelongFutsalTeamId(data.data[i].teamId);
            }
            if (data.data[i].sports == "농구") {
              setBelongBasketballTeam(true);
              setBelongBasketballTeamId(data.data[i].teamId);
            }
          }
        } else {
          console.log("소속팀 정보를 가져오는데 실패했습니다.");
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });
  }

  const [belongSoccerTeam, setBelongSoccerTeam] = useState(false);
  const [belongSoccerTeamId, setBelongSoccerTeamId] = useState<number>();
  const [belongFutsalTeam, setBelongFutsalTeam] = useState(false);
  const [belongFutsalTeamId, setBelongFutsalTeamId] = useState<number>();
  const [belongBasketballTeam, setBelongBasketballTeam] = useState(false);
  const [belongBasketballTeamId, setBelongBasketballTeamId] =
    useState<number>();

  useEffect(() => {
    fetchUserBelongTeam();
  }, []);

  return (
    <div>
      <p>축구</p>
      {belongSoccerTeam ? (
        <Link href={`/team/${belongSoccerTeamId}`}>
          <Button
            component="label"
            variant="contained"
            startIcon={<GroupsIcon />}
            style={{ backgroundColor: "green", color: "black" }}
          >
            팀 조회
          </Button>
        </Link>
      ) : (
        <CreateTeamButton />
      )}

      <p>풋살</p>
      {belongFutsalTeam ? (
        <Link href={`/team/${belongFutsalTeamId}`}>
          <Button
            component="label"
            variant="contained"
            startIcon={<GroupsIcon />}
            style={{ backgroundColor: "#2196f3", color: "black" }}
          >
            팀 조회
          </Button>
        </Link>
      ) : (
        <CreateTeamButton />
      )}

      <p>농구</p>
      {belongBasketballTeam ? (
        <Link href={`/team/${belongBasketballTeamId}`}>
          <Button
            component="label"
            variant="contained"
            startIcon={<GroupsIcon />}
            style={{ backgroundColor: "orange", color: "black" }}
          >
            팀 조회
          </Button>
        </Link>
      ) : (
        <CreateTeamButton />
      )}
    </div>
  );
}
