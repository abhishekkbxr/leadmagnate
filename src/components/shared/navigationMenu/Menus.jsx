'use client'
import React, { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import getIcon from "@/utils/getIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Menus = () => {
    const [activeParent, setActiveParent] = useState("");
    const [openDropdown, setOpenDropdown] = useState(null);
    const pathName = usePathname();
    const { user } = useAuth();

    const handleMainMenu = (e, name) => {
        e.preventDefault();
        if (openDropdown === name) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(name);
        }
    };

    useEffect(() => {
        if (pathName !== "/") {
            const x = pathName.split("/");
            const parent = x[1].replace('-', '_');
            setActiveParent(parent);
            setOpenDropdown(parent);
        } else {
            setActiveParent("dashboard");
            setOpenDropdown("dashboard");
        }
    }, [pathName]);

    const definedMenuList = [
        { id: 1, name: 'dashboard', path: '/', icon: 'feather-airplay' },
        { id: 2, name: 'roles', path: '/roles', icon: 'feather-shield' },
        {
            id: 3,
            name: 'organisations',
            path: "#",
            icon: 'feather-briefcase',
            dropdownMenu: [
                { id: 1, name: "Organisations", path: "/organisations/list" },
                { id: 2, name: "Create Organisation", path: "/organisations/create" }
            ]
        },
        { id: 4, name: 'user', path: '/user', icon: 'feather-users' },
        { id: 5, name: 'permission', path: '/permission', icon: 'feather-lock' },
        {
            id: 6,
            name: 'leads',
            path: "#",
            icon: 'feather-alert-circle',
            dropdownMenu: [
                { id: 1, name: "Leads", path: "/leads/list" },
                { id: 2, name: "Leads View", path: "/leads/view" },
                { id: 3, name: "Leads Create", path: "/leads/create" }
            ]
        },
        { id: 7, name: 'lead_activities', path: '/lead-activities', icon: 'feather-activity' },
        { id: 8, name: 'lead_assignments', path: '/lead-assignments', icon: 'feather-user-plus' },
        { id: 9, name: 'analytics', path: '/dashboards/analytics', icon: 'feather-bar-chart-2' },
        {
            id: 10,
            name: 'reports',
            path: "#",
            icon: 'feather-cast',
            dropdownMenu: [
                { id: 1, name: "Sales Report", path: "/reports/sales" },
                { id: 2, name: "Leads Report", path: "/reports/leads" },
                { id: 3, name: "Project Report", path: "/reports/project" },
                { id: 4, name: "Timesheets Report", path: "/reports/timesheets" },
            ]
        },
        {
            id: 11,
            name: 'settings',
            path: "#",
            icon: 'feather-settings',
            dropdownMenu: [
                { id: 1, name: "General", path: "/settings/general" },
                { id: 2, name: "SEO", path: "/settings/seo" },
                { id: 3, name: "Tags", path: "/settings/tags" },
                { id: 4, name: "Email", path: "/settings/email" },
                { id: 5, name: "Tasks", path: "/settings/tasks" },
                { id: 6, name: "Leads", path: "/settings/leads" },
                { id: 7, name: "Support", path: "/settings/Support" },
                { id: 8, name: "Finance", path: "/settings/finance" },
                { id: 9, name: "Gateways", path: "/settings/gateways" },
                { id: 10, name: "Customers", path: "/settings/customers" },
                { id: 11, name: "Localization", path: "/settings/localization" },
                { id: 12, name: "reCAPTCHA", path: "/settings/recaptcha" },
                { id: 13, name: "Miscellaneous", path: "/settings/miscellaneous" },
            ]
        },
    ];

    const allowedModules = new Set(
        (user?.modules || [])
            .filter(module => {
                const { create, read, update, delete: deletePermission } = module.permissions;
                return create || read || update || deletePermission;
            })
            .map(module => module.name)
    );

    const menuList = definedMenuList.filter(menuItem => allowedModules.has(menuItem.name));

    return (
        <>
            {menuList.map(({ id, name, path, icon, dropdownMenu }) => {
                if (dropdownMenu) {
                    return (
                        <li key={id} className={`nxl-item nxl-hasmenu ${activeParent === name ? "active" : ""} ${openDropdown === name ? "nxl-trigger" : ""}`}>
                            <a href={path} className="nxl-link" onClick={(e) => handleMainMenu(e, name)}>
                                <span className="nxl-micon">{getIcon(icon || name)}</span>
                                <span className="nxl-mtext">{name.replace('_', ' ')}</span>
                                <span className="nxl-arrow">
                                    <FiChevronRight />
                                </span>
                            </a>
                            <ul className={`nxl-submenu ${openDropdown === name ? "nxl-menu-visible" : "nxl-menu-hidden"}`}>
                                {dropdownMenu.map(item => (
                                    <li key={item.id} className={`nxl-item ${pathName === item.path ? "active" : ""}`}>
                                        <Link href={item.path} className="nxl-link">
                                            <span className="nxl-mtext">{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    );
                } else {
                    const linkPath = path || `/${name.replace('_', '-')}`;
                    return (
                        <li
                            key={id}
                            className={`nxl-item ${activeParent === name ? "active" : ""}`}
                        >
                            <Link href={linkPath} className="nxl-link text-capitalize">
                                <span className="nxl-micon"> {getIcon(icon || name)} </span>
                                <span className="nxl-mtext" style={{ paddingLeft: "2.5px" }}>
                                    {name.replace('_', ' ')}
                                </span>
                            </Link>
                        </li>
                    );
                }
            })}
        </>
    );
};

export default Menus;
