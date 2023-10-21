import Image from "next/image";
import MainMenu from "@/components/Main/MainMenu";
import {cookies} from 'next/headers'

export default function Home() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('next-auth.session-token')
  const csrfToken = cookieStore.get('next-auth.session-token')
  // console.log(sessionToken);
  // console.log(csrfToken);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div className="left-container" style={{ padding: "20px" }}>
          <h1>
            운동은 <br />
            함께할 때 <br />더 즐거우니까
          </h1>
          <MainMenu/>
        </div>
        <div className="right-container" style={{ padding: "20px" }}>
          <Image
            src="/main-page.png"
            width={914}
            height={677}
            alt="main-page-image"
          />
        </div>
      </div>
    </div>
  );
}
