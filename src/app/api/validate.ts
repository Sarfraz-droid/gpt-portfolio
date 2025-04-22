import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  type: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const { password } = req.body;
    if(password === process.env.ILMA_PASS) {
        res.status(200).json({
            type: "ilma"
        })
    }
    else if(password === process.env.SARFRAZ_PASS) {
        res.status(200).json({
            type: "sarfraz"
        })
    }
    else {
        res.status(401).json({
            type: "error"
        })
    }

}