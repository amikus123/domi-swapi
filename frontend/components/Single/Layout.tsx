import { Flex } from "@chakra-ui/react"
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
  const isOnFrontPage = router.pathname === "/"
  return (
    <>
      {isOnAuthPage || <Header navData={[]} user={user} />}
      <Flex
        direction="column"
        justifyContent="flex-start"
        px={isOnFrontPage || isOnAuthPage ? 0 : [6, 10]}
        pt={isOnFrontPage || isOnAuthPage ? 0 : 6}
        as="main"
      >
        {children}
      </Flex>
      {isOnAuthPage || <Footer />}
    </>
  )
}
