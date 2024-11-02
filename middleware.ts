import { auth as middleware } from "@/utils/auth/"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default middleware(() => {})

// export default middleware((req) => {

//   console.dir(req, { depth: null })
// })
