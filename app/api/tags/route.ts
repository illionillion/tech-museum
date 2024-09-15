import type { Tag } from "@prisma/client"
import { PrismaClient } from "@prisma/client"

import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { responseMessage } from "@/app/api/types/responseMessage"

const prisma = new PrismaClient()

export async function GET() {
  const tagList: Array<Tag> = await prisma.tag.findMany()

  return NextResponse.json(
    {
      message: responseMessage.success.get,
      data: {
        tagList: tagList,
      },
    },
    { status: 200 },
  )
}

export async function POST(request: NextRequest) {
  let body

  try {
    body = await request.json()
  } catch (error) {
    // リクエストボディが存在しない場合にエラーを返す
    console.log(error)
    return NextResponse.json(
      { message: responseMessage.error.invalidRequest },
      { status: 400 },
    )
  }

  if (body.name == null) {
    return NextResponse.json(
      { message: responseMessage.error.invalidRequest },
      { status: 400 },
    )
  }

  const tag: Pick<Tag, "name" | "iconUrl"> = {
    name: body.name,
    iconUrl: body.iconUrl != undefined ? body.iconUrl : "",
  }

  // 重複したデータが存在するか確認
  const isExist: boolean =
    (await prisma.tag.findFirst({
      where: {
        name: tag.name,
      },
      select: {
        id: true,
      },
    })) !== null

  if (isExist) {
    return NextResponse.json(
      { message: responseMessage.error.conflict },
      { status: 409 },
    )
  }

  const responseData: Tag = await prisma.tag.create({
    data: tag,
  })

  return NextResponse.json(
    {
      message: responseMessage.success.post,
      data: responseData,
    },
    { status: 201 },
  )
}