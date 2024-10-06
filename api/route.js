import { NextResponse } from "next/server"

export async function GET() {
    let res = {
        products: [
            {"id":1,"title": "comb"},
            {"id":2,"title": "brush"}
        ]
    }

    return Response.json(res)
}

export function POST() {

}