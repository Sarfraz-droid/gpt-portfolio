import { revalidatePath } from "next/cache";
import React from "react";

export const Refresh = () => {
    revalidatePath("/");
    return <div>Refresh Cache</div>;
};
