import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Signupinput } from "@ayush2173/medium-common";

export function Auth({ type }: { type: "signup" | "signin" }) {
    const navigate = useNavigate();
    const [postinputs, setpostinputs] = useState<Signupinput>({
        email: "",
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);  // Loading state

    return (
        <div className="bg-white-500 h-screen flex flex-col justify-center items-center">
            <div>
                <div className="text-3xl font-extrabold flex justify-center">
                    {type === "signup" ? "Create an Account" : "Login"}
                </div>
                <div className="text-slate-400 flex justify-center mb-6">
                    {type === "signup" ? "Already have an account ?" : "Don't have an account ?"}
                    <Link className="pl-2 underline text-blue-500" to={type === "signup" ? "/signin" : "/"}>
                        {type === "signup" ? "Login" : "Signup"}
                    </Link>
                </div>
            </div>
            <div className="w-80 flex flex-col space-y-4">
                <Inputbox
                    placeholder="Enter your username"
                    title="Username"
                    type="text"
                    onChange={(e) => {
                        setpostinputs((c) => ({ ...c, username: e.target.value }));
                    }}
                />
                {type === "signup" ? (
                    <Inputbox
                        placeholder="m@example.com"
                        title="Email"
                        type="email"
                        onChange={(e) => {
                            setpostinputs({
                                ...postinputs,
                                email: e.target.value,
                            });
                        }}
                    />
                ) : null}
                <Inputbox
                    placeholder="......."
                    title="Password"
                    type="password"
                    onChange={(e) => {
                        setpostinputs({
                            ...postinputs,
                            password: e.target.value,
                        });
                    }}
                />
                <button
                    onClick={async () => {
                        setLoading(true);  // Set loading to true when request starts
                        try {
                            const response = await axios.post(
                                `${BACKEND_URL}api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                                postinputs
                            );

                            const token = response.data?.token;
                            if (!token) {
                                throw new Error(`Token not received during ${type === "signin" ? "Signin" : "Signup"}`);
                            }

                            localStorage.setItem("token", token);
                            navigate("/blogs");
                        } catch (e) {
                            alert(`Error while ${type === "signin" ? "Signin" : "Signup"}: ${e.message || e}`);
                        } finally {
                            setLoading(false);  // Set loading to false after request completes
                        }
                    }}
                    className="bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800"
                    disabled={loading}  // Disable button when loading
                >
                    {loading ? "Loading..." : type === "signup" ? "Sign Up" : "Sign in"}
                </button>
            </div>
        </div>
    );
}

interface Inputtype {
    placeholder: string;
    title: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Inputbox({ placeholder, title, type, onChange }: Inputtype) {
    return (
        <div>
            <label className="block mb-2 text-sm font-bold text-gray-900">{title}</label>
            <input
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}
