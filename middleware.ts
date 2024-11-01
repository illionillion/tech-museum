import { auth as middleware } from "@/utils/auth/"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

export default middleware()
// export default middleware((req) => {

//   console.dir(req, { depth: null })
// })
