import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { json, useNavigate } from "react-router-dom"

const LoginForm = ({ setError, setToken }) => {
    const [username, setUsername] = useState("appsidal");
    const [password, setPassword] = useState("secret");
    const navigator = useNavigate()
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message);
        },
    });
    console.log(result)
    useEffect(() => {
        if (result.data) {
            const user = result.data.login;
            console.log(result)
            setToken(user);
            localStorage.setItem("phonenumbers-user", JSON.stringify(user));
            navigator('/')
        }
    }, [result.data]); // eslint-disable-line

    const submit = async (event) => {
        event.preventDefault();

        login({ variables: { username, password } });
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username{" "}
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password{" "}
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

export default LoginForm;
