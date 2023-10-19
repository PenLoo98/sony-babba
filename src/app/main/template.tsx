import HeaderOnSign from "@/components/HeaderOnSign"
import Footer from "@/components/Footer"
export default function Template({ children }: { children: React.ReactNode }) {
    return <div>
        <HeaderOnSign/>
        {children}
        <Footer/>
        </div>
  }