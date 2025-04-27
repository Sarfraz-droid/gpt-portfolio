import React, { useEffect, useRef } from "react";
import fitty from "fitty"

type IProps = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

export const FittyText = (props: IProps) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(ref.current) {
            fitty(ref.current);
        }
    }, [ref])

    return (
        <div className={props.className} style={props.style} ref={ref}>
            {props.children}
        </div>
    );
};
