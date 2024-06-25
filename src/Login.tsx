import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase-config";
import logo from "./image/logo.png"; // 画像ファイルをインポート

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const userAgent = navigator.userAgent.toLowerCase();

    useEffect(() => {
        const checkLoginState = async () => {
            setLoading(true);
            try {
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        console.log("ログイン成功:", user);
                        localStorage.setItem("user", JSON.stringify(user)); // ローカルストレージに保存
                        navigate("/home");
                    } else {
                        console.log("ユーザーが見つかりません。");
                    }
                });
            } catch (error) {
                console.error("ログインエラー:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!userAgent.includes("line")) {
            console.log("Not in LINE browser, checking login state");
            checkLoginState();
        } else {
            console.log("In LINE browser, skip login state check");
        }
    }, [userAgent, navigate]);

    const signInWithGoogle = () => {
        console.log("Sign in with Google triggered");
        setLoading(true);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).catch((error) => {
            console.error("ポップアップ中のエラー:", error);
            alert("ログインに失敗しました。ポップアップブロッカーを確認してください。");
            setLoading(false);
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-pink-100 font-sans">
            <div className="flex flex-col items-center justify-center bg-white w-full sm:w-3/4 lg:w-1/2 h-screen rounded-lg shadow-lg text-center">
                {loading ? (
                    <div className="loader" style={{ color: "pink" }}>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                    </div>
                ) : (
                    <>
                        <img src={logo} alt="Logo" className="mx-auto mb-24 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96" />
                        <p className="text-lg pb-8 text-pink-400">～おかし好きのためのかわいい記録帳♡～</p>
                        <button
                            onClick={() => {
                                console.log("Login button clicked");
                                if (userAgent.includes("line")) {
                                    alert("LINE内ブラウザではGoogleログインがサポートされていません。外部ブラウザで開いてください。");
                                } else {
                                    signInWithGoogle();
                                }
                            }}
                            className="px-12 py-6 bg-pink-100 text-white text-xl rounded-lg hover:bg-pink-light"
                        >
                            ろぐいん！
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
