import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const postId = Number(params.id)
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })
        return Response.json(post)
    } catch (error) {
        return new Response(error as BodyInit, {
            status: 500,
        })
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { title, content, categoryId } = await req.json()
        const post = await prisma.post.update({
            where: { id: Number(params.id) },
            data: { title, content, categoryId },
        })
        return Response.json(post)
    } catch (error) {
        return new Response(error as BodyInit, {
            status: 500,
        })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const postId = Number(params.id)
        const deletedPost = await prisma.post.delete({
            where: {
                id: postId
            }
        })
        return Response.json(deletedPost)
    } catch (error) {
        return new Response(error as BodyInit, {
            status: 500,
        })
    }
}