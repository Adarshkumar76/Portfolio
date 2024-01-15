import React from "react";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function NoPage() {
    const { loginWithRedirect } = useAuth0();
    return (
        <>
            <Header />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "75.8vh",
                    padding: "15px",
                }}
            >
                <h1> Go to {" "} <Link
                    style={{ color: "DodgerBlue", "text-decoration": "none" }}
                    to="/"
                >
                    HOME PAGE
                </Link>
                    {" "}or
                    <span
                        style={{ color: "DodgerBlue", cursor: "pointer" }}
                        onClick={() => loginWithRedirect()}
                    >
                        {" "}
                        Login{" "}
                    </span>
                    to see the content of this page
                </h1>
            </div>
            <Footer />
        </>
    );
}

export default NoPage;
