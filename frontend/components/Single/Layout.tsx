import { useRouter } from "next/dist/client/router"
import Footer from "./Footer"
import Header from "./Header"

interface LayoutProps {
  children: React.ReactNode
  user: any | null
}
export default function Layout({ children, user }: LayoutProps) {
  const router = useRouter()

  const isOnAuthPage = router.pathname.startsWith("/auth/")
  return (
    <>
      {isOnAuthPage || <Header navData={[]}  user={user}/>}
      <main>{children}</main>
      {isOnAuthPage || <Footer />}
    </>
  )
}
