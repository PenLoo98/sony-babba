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

type SearchNameProps = {
  searchNameResult: SearchNameList;
};

export default function ShowSearchList(searchNameResult: SearchNameProps) {
  return (
    <div>
      <h1>검색결과</h1>
      <p>프로필 이미지를 누르면 해당 프로필로 이동합니다.</p>
      <table style={{ marginTop: "40px", textAlign: "center" }}>
        <thead>
          <tr style={{ backgroundColor: "deepskyblue" }}>
            <td style={{ color: "black", padding: "10px" }}>사진 </td>
            <td style={{ color: "black", padding: "10px" }}>이름</td>
            <td style={{ color: "black", padding: "10px" }}>지역</td>
          </tr>
        </thead>

        <tbody>
          {searchNameResult.searchNameResult.data.map((user) => (
            <tr key={user.id}>
              <td>
                <Image
                  src={user.profileImage || "/default-profile.png"}
                  alt="profileImage"
                  width={40}
                  height={40}
                  style={{ margin: "0 10px" }}
                  onClick={() => {
                    window.location.href = `/user/profile/${user.id}`;
                  }}
                />
              </td>
              <td>
                <h3>{user.nickname}</h3>
              </td>
              <td>{user.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
