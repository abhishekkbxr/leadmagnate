'use client'
import React, { useEffect, useState } from "react";
import getIcon from "@/utils/getIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Menus = () => {
    const [activeParent, setActiveParent] = useState("");
    const pathName = usePathname();
    const { user } = useAuth();

    useEffect(() => {
        if (pathName !== "/") {
            const x = pathName.split("/");
            setActiveParent(x[1]);
        } else {
            setActiveParent("dashboard");
        }
    }, [pathName]);

    const menuList = user?.modules || [];

    return (
        <>
            {menuList.map(({ id, name }) => {
                const path = `/${name.replace('_', '-')}`;
                return (
                    <li
                        key={id}
                        className={`nxl-item ${activeParent === name ? "active" : ""}`}
                    >
                        <Link href={path} className="nxl-link text-capitalize">
                            <span className="nxl-micon"> {getIcon(name)} </span>
                            <span className="nxl-mtext" style={{ paddingLeft: "2.5px" }}>
                                {name.replace('_', ' ')}
                            </span>
                        </Link>
                    </li>
                );
            })}
        </>
    );
};

export default Menus;
