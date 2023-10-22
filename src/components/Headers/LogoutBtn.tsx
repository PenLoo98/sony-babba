import MsgButton from "../Message/MsgButton";

export default function LogoutBtn() {
  return (
    <>
      <MsgButton 
      successMsg="로그아웃 되었습니다." 
      failMsg="로그아웃에 실패했습니다."
      buttonText="로그아웃" />
    </>
  );
}
