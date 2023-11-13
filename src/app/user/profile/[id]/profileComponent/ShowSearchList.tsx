import Image from "next/image";
// 사용자 닉네임 검색결과 저장
type SearchNameUser = {
  id: number;
  nickname: string;
  area: string;
  introduction: string | null;
  profileImage: string | null;
};

type SearchNameList = {
  data: SearchNameUser[];
};

export default function ShowSearchList(searchNameResult : SearchNameList) {
  return (
    <div>
      {searchNameResult.data.map((user) => (
        <div hidden key={user.id}>
          <div style={{display: "flex"}}>
          <Image src={user.profileImage ?? "/default-profile.png"} alt="profileImage" width={40} height={40}/>
          <h3>{user.nickname}</h3>
          <p>{user.area}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
