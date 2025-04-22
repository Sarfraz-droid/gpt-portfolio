import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  type: string;
  success: boolean;
}
 
export async function POST(
  req: Request,
) {
    const { password } = await req.json();
    console.log(password,)
    if(password === process.env.ILMA_PASS) {
        return Response.json({
            type: "ilma",
            success: true
        }, { status: 200 })
    }
    else if(password === process.env.SARFRAZ_PASS) {
        return Response.json({
            type: "sarfraz",
            success: true
        }, { status: 200 })
    }
    else {
        return Response.json({
            type: "error",
            success: false
        }, { status: 401 })
    }

}