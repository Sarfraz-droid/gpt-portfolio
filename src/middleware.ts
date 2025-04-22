import { NextRequest } from "next/server";

import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
    const token = request.cookies.get("token");

    console.log(token?.value, process.env.ILMA_PASS, process.env.SARFRAZ_PASS);

    if (
        token?.value === process.env.ILMA_PASS ||
        token?.value === process.env.SARFRAZ_PASS
    ) {
        return NextResponse.next();
    } else {
        return NextResponse.redirect(
            new URL("/login?redirected=true", request.url)
        );
    }
};

export const config = {
    matcher: ["/dashboard/:path*", "/dashboard"]
};
