import MuiLink from "@mui/material/Link";
import {styled} from "@mui/material/styles";
import clsx from "clsx";
import NextLink from "next/link";
import {useRouter} from "next/router";
import * as React from "react";

const Anchor = styled("a")({});

interface NextLinkComposedProps {
    to: string | { pathname: string; query?: Record<string, string> };
    linkAs?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    prefetch?: boolean;
    legacyBehavior?: boolean;
    locale?: string;
}

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
    function NextLinkComposed(props, ref) {
        const {
            to,
            linkAs,
            replace,
            scroll,
            shallow,
            prefetch,
            legacyBehavior = true,
            locale,
            ...other
        } = props;

        return (
            <NextLink
                href={to}
                prefetch={prefetch}
                as={linkAs}
                replace={replace}
                scroll={scroll}
                shallow={shallow}
                passHref
                locale={locale}
                legacyBehavior={legacyBehavior}
            >
                <Anchor ref={ref} {...other} />
            </NextLink>
        );
    }
);

interface LinkRoutingProps {
    activeClassName?: string;
    as?: string;
    className?: string;
    href: string | { pathname: string };
    legacyBehavior?: boolean;
    linkAs?: string;
    locale?: string;
    noLinkStyle?: boolean;
    prefetch?: boolean;
    replace?: boolean;
    role?: string;
    scroll?: boolean;
    shallow?: boolean;
}

export const LinkRouting = React.forwardRef<HTMLAnchorElement, LinkRoutingProps>(
    function LinkRouting(props, ref) {
        const {
            activeClassName = "active",
            as,
            className: classNameProps,
            href,
            legacyBehavior,
            linkAs: linkAsProp,
            locale,
            noLinkStyle,
            prefetch,
            replace,
            role, // Link don't have roles.
            scroll,
            shallow,
            ...other
        } = props;

        const router = useRouter();
        const pathname = typeof href === "string" ? href : href.pathname;
        const className = clsx(classNameProps, {
            [activeClassName]: router.pathname === pathname && activeClassName,
        });

        const isExternal =
            typeof href === "string" &&
            (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

        if (isExternal) {
            if (noLinkStyle) {
                return <Anchor className={className} href={href as string} ref={ref} {...other} />;
            }

            return <MuiLink className={className} href={href as string} ref={ref} {...other} />;
        }

        const linkAs = linkAsProp || as;
        const nextjsProps: NextLinkComposedProps = {
            to: href as string,
            linkAs,
            replace,
            scroll,
            shallow,
            prefetch,
            legacyBehavior,
            locale,
        };

        if (noLinkStyle) {
            return (
                <NextLinkComposed
                    ref={ref}
                    {...nextjsProps}
                    {...other}
                />
            );
        }

        return (
            <MuiLink
                component={NextLinkComposed}
                className={className}
                ref={ref}
                {...nextjsProps}
                {...other}
            />
        );
    }
);