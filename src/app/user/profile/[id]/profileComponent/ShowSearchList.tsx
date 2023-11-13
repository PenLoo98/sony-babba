import Image from "next/image";
// 사용자 닉네임 검색결과 저장
type SearchNameUser = {
  id: number;
  nickname: string;
  area: string;
  introduction: string | null;
  profileImage: string | "/default-profile.png";
};

type SearchNameList = {
  data: SearchNameUser[];
};

type SearchNameProps = {
  searchNameResult: SearchNameList;
};

export default function ShowSearchList({ searchNameResult }: SearchNameProps) {
  return (
    <>
      {searchNameResult.data.map((user) => (
        <div hidden key={user.id}>
          <Image src={user.profileImage} alt="profileImage" />
          <div>{user.nickname}</div>
          <div>{user.area}</div>
          <p>{user.introduction}</p>
        </div>
      ))}
    </>
  );
}
