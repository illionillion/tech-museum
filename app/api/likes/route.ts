import { PrismaClient } from "@prisma/client"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { responseMessage } from "@/app/api/types/responseMessage"

const prisma = new PrismaClient()

type Like = {
  userId: number
  articleId: number
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

  if (!body.userId || !body.articleUrl) {
    return NextResponse.json(
      { message: responseMessage.error.invalidRequest },
      { status: 400 },
    )
  }

  const article = await prisma.article.findFirst({
    where: {
      url: body.articleUrl,
    },
    select: {
      id: true,
    },
  })

  // 記事が存在しない場合
  if (!article) {
    return NextResponse.json(
      { message: responseMessage.error.notFound },
      { status: 404 },
    )
  }

  const like: Like = {
    userId: body.userId,
    articleId: article.id,
  }

  // 重複したデータが存在するか確認
  const isExist =
    (await prisma.like.findFirst({
      where: like,
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

  const createdData = await prisma.like.create({
    data: like,
    include: {
      article: {
        select: {
          url: true,
        },
      },
    },
  })

  const responseData = {
    id: createdData.id,
    userId: createdData.userId,
    articleUrl: createdData.article.url,
    createdAt: createdData.createdAt,
    updatedAt: createdData.updatedAt,
  }

  return NextResponse.json(
    {
      message: responseMessage.success.post,
      data: responseData,
    },
    { status: 201 },
  )
}

export async function DELETE(request: NextRequest) {
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

  if (!body.userId || !body.articleUrl) {
    return NextResponse.json(
      { message: responseMessage.error.invalidRequest },
      { status: 400 },
    )
  }

  const article = await prisma.article.findFirst({
    where: {
      url: body.articleUrl,
    },
    select: {
      id: true,
    },
  })

  // 記事が存在しない場合
  if (!article) {
    return NextResponse.json(
      { message: responseMessage.error.notFound },
      { status: 404 },
    )
  }

  const like: Like = {
    userId: body.userId,
    articleId: article.id,
  }

  // 重複したデータが存在するか確認
  const likeData = await prisma.like.findFirst({
    where: like,
    select: {
      id: true,
    },
  })

  if (!likeData) {
    return NextResponse.json(
      { message: responseMessage.error.notFound },
      { status: 404 },
    )
  }

  await prisma.like.delete({
    where: {
      id: likeData.id,
    },
  })

  return NextResponse.json(
    {
      message: responseMessage.success.delete,
    },
    { status: 201 },
  )
}