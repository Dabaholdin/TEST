import * as React from "react";

function SvgCatalog(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M24.843 3.04L21.886.22C21.773.111 21.657 0 21.44 0H9.594a.628.628 0 00-.627.627v1.927l-4.175.716a.618.618 0 00-.502.713l.212 1.236c-1.357.456-2.75.927-4.095 1.41a.621.621 0 00-.371.79l2.675 7.437a.367.367 0 00.69-.249L.767 7.28c1.267-.454 2.58-.898 3.862-1.33l1.26 7.351 1.451 8.466a.622.622 0 00.713.503l3.93-.674 3.07-.527-4.618 1.66-3.641 1.31-2.829-7.867a.367.367 0 10-.69.248l2.868 7.978a.62.62 0 00.79.37l3.75-1.348 8.518-3.062 1.627-.279h3.595a.629.629 0 00.627-.628V3.453c0-.22-.119-.332-.206-.413zm-.972.086H21.989c-.088.001-.294.003-.346-.05-.012-.011-.026-.051-.026-.125L21.613.973l2.258 2.153zm.444 16.22H9.701v-7.152a.367.367 0 10-.734 0v7.256c0 .347.281.63.627.63h6.89l-4.626.792-3.815.655-1.431-8.35-1.58-9.204L8.968 3.3v7.193a.367.367 0 00.734 0V.734h11.177l.005 2.217c0 .27.082.487.243.647.248.246.598.263.816.263h2.373v15.484z"
                fill="currentColor"
            />
            <path
                d="M11.47 5.697c0 .203.163.367.366.367h10.491a.367.367 0 000-.734h-10.49a.367.367 0 00-.368.367zM22.327 7.938h-10.49a.367.367 0 100 .733h10.49a.367.367 0 000-.733zM22.327 10.544h-10.49a.367.367 0 100 .734h10.49a.367.367 0 000-.734zM22.327 13.151h-10.49a.367.367 0 100 .734h10.49a.367.367 0 000-.734zM22.327 15.758h-10.49a.367.367 0 100 .733h10.49a.367.367 0 000-.733z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgCatalog;
