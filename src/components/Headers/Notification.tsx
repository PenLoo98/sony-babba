"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Badge from "@mui/material/Badge";
import ModalCustom from "../ModalCustom";
import ReadNotification from "./ReadNotification";

type NotificationResponse = {
  code: string;
  message: string;
  data: {
    notifications: Notification[];
  };
};

type Notification = {
  id: number;
  title: string; //제목
  message: string; //메시지
  readYn: boolean; //읽음 여부
  createdAt: string; //생성 날짜
};

type NotificationCountResponse = {
  code: string;
  message: string;
  data: number;
};

// TODO: 알림 기능 구현
export default function Notification() {
  // 알림 갯수 state
  const [notificationCount, setNotificationCount] = useState(0);

  // 알림 모달 보여주는 state
  const [showNotification, setShowNotification] = useState(false);

  // 알림 리스트 state
  const [notificationList, setNotificationList] = useState<Notification[]>([]);

  // TODO: 알림 fetch
  async function getNotification() {
    // 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 알림 가져오기 API
    const getNotificationURL = `https://withsports.shop:8000/notification-service/notifications`;

    const response = await fetch(getNotificationURL, {
      method: "GET",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: NotificationResponse) => {
        if (data.code === "SUCCESS") {
          console.log("알림 목록 data:");
          console.log(data);
          setNotificationList(data.data.notifications);
        }
        // TODO: 토큰 만료되었을 때 예외처리하기
        else {
          console.log("알림 정보를 가져오는데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // TODO: 알림 갯수 fetch
  async function countNotification() {
    // 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 알림 가져오기 API
    const countNotificationURL = `https://withsports.shop:8000/notification-service/notification/counts`;

    const response = await fetch(countNotificationURL, {
      method: "GET",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: NotificationCountResponse) => {
        if (data.code === "SUCCESS") {
          console.log("알림 개수 응답 data:");
          console.log(data);
          setNotificationCount(data.data);
        }
        // TODO: 토큰 만료되었을 때 예외처리하기
        else {
          console.log("알림 정보를 가져오는데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getNotification();
    countNotification();
  }, []);

  return (
    <>
      <Badge badgeContent={notificationCount} color="error" style={{display: "block"}}>
        <div>
          <Image
            src="/bell.png"
            width={50}
            height={50}
            alt="bell-image"
            style={{ margin: "0 10px" }}
            onClick={() => setShowNotification(true)}
          />
        </div>
        <p>알림</p>
      </Badge>
      <ModalCustom show={showNotification} setShow={setShowNotification}>
        <h1>알림</h1>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>메시지</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {notificationList.map((notification) => (
              <tr key={notification.id}>
                <td>{notification.id}</td>
                <td>{notification.title}</td>
                <td>{notification.message}</td>
                <td>{notification.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ModalCustom>
    </>
  );
}
