import { revalidatePath } from "next/cache";

export async function GET() {
    revalidatePath('/');

    return Response.json({
        message: "Revalidation triggered"
    }, { status: 200 })
}