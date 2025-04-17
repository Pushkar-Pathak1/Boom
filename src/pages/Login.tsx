import {
    EuiButton,
    EuiFlexGroup,
    EuiFlexItem,
    EuiImage,
    EuiPanel,
    EuiProvider,
    EuiSpacer,
    EuiText,
    EuiTextColor,
} from "@elastic/eui";
import React from "react";
import animation from "../assets/animation.gif";
import logo from "../assets/boom.png";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth";
import { firebaseAuth, userRef } from "../utils/FirebaseConfig";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
import "./Login.css"; // Add custom styles here

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
            navigate("/");
        }
    });

    const login = async () => {
        const provider = new GoogleAuthProvider();
        const {
            user: { displayName, email, uid },
        } = await signInWithPopup(firebaseAuth, provider);

        if (email) {
            const firestoreQuery = query(userRef, where("uid", "==", uid));
            const fetchedUsers = await getDocs(firestoreQuery);
            if (fetchedUsers.docs.length === 0) {
                await addDoc(userRef, {
                    uid,
                    name: displayName,
                    email,
                });
            }
        }
        dispatch(setUser({ uid, name: displayName, email }));
        navigate("/");
    };

    return (
        <EuiProvider colorMode="dark">
            <div className="login-background">
                <EuiFlexGroup
                    alignItems="center"
                    justifyContent="center"
                    style={{ width: "100vw", height: "100vh" }}
                >
                    <EuiFlexItem grow={false} className="login-card" style={{ width: "850px", height: "550px" }}>
                        <EuiPanel
                            paddingSize="l"
                            style={{
                                height: "100%",
                                borderRadius: "20px",
                                boxShadow: "0 0 25px rgba(255, 165, 0, 0.15)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <EuiFlexGroup justifyContent="center" alignItems="center" gutterSize="xl">
                                <EuiFlexItem grow={false}>
                                    <EuiImage src={animation} alt="animation" size="400px" />
                                </EuiFlexItem>
                                <EuiFlexItem grow={false} style={{ minWidth: "250px" }}>
                                    <EuiImage src={logo} alt="logo" size="230px" />
                                    <EuiSpacer size="s" />
                                    <EuiText textAlign="center" grow={false}>
                                        <h3>
                                            <EuiTextColor>One platform to{" "}</EuiTextColor>
                                            <EuiTextColor color="accent">connect</EuiTextColor>
                                        </h3>
                                    </EuiText>
                                    <EuiSpacer size="l" />
                                    <EuiButton fill color="warning" onClick={login} className="login-btn">
                                        Login with Google
                                    </EuiButton>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                        </EuiPanel>
                    </EuiFlexItem>

                </EuiFlexGroup>
            </div>
        </EuiProvider>
    );
};

export default Login;
