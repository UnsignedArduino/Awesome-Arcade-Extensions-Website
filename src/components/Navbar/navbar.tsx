import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NavbarDropdownThemePicker } from "./ThemePicker";
import icon from "../../../public/android-chrome-512x512.png";
import { AppProps } from "../WithAppProps";

const NavbarPages = {
  Home: "/",
  Help: "/help",
  GitHub:
    "https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website",
};

type NavbarProps = {
  appName: string;
  appProps: AppProps;
  currentPage?: string;
  extraNavbarHTML?: JSX.Element | undefined;
};

function Navbar({
  appName,
  appProps,
  currentPage,
  extraNavbarHTML,
}: NavbarProps): JSX.Element {
  return (
    <nav className="navbar sticky-top bg-body-tertiary navbar-expand-md">
      <div className="container-fluid">
        <div className="d-inline-flex align-items-center text-start">
          <Image
            src={icon}
            alt="Logo"
            className="d-inline-block me-1"
            style={{
              width: "1em",
              height: "1em",
              objectFit: "contain",
            }}
          />
          <Link className="navbar-brand mb-0 ms-1 h1" href="/">
            {appName}
          </Link>
          {(() => {
            switch (appProps.environment) {
              case "production": {
                return undefined;
              }
              case "preview": {
                return <span className="badge bg-danger me-2">Beta</span>;
              }
              case "development": {
                return <span className="badge bg-danger me-2">Dev</span>;
              }
            }
          })()}
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex">
            <ul className="navbar-nav">
              {Object.entries(NavbarPages).map(([key, value]) => {
                if (currentPage === key) {
                  return (
                    <li className="nav-item" key={key}>
                      <Link
                        className="nav-link active"
                        href={value}
                        aria-current="page"
                      >
                        {key}
                      </Link>
                    </li>
                  );
                } else if (!value.startsWith("/")) {
                  return (
                    <li className="nav-item" key={key}>
                      <a
                        href={value}
                        className="nav-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {key}
                      </a>
                    </li>
                  );
                } else {
                  return (
                    <li className="nav-item" key={key}>
                      <Link className="nav-link" href={value}>
                        {key}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
          {extraNavbarHTML != undefined ? (
            <div className="d-flex d-inline d-md-none mb-2">
              {extraNavbarHTML}
            </div>
          ) : undefined}
          <div className="d-flex d-inline d-md-none">
            <NavbarDropdownThemePicker />
          </div>
        </div>
        {extraNavbarHTML != undefined ? (
          <div className="d-flex d-none d-md-inline me-2">
            {extraNavbarHTML}
          </div>
        ) : undefined}
        <div className="d-flex d-none d-md-inline">
          <NavbarDropdownThemePicker alignEnd />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
