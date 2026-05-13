import { useState } from "react";
import "../App.css";

function Login() {
    const [isRegister, setIsRegister] = useState(false);

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (correo === "" || password === "" || (isRegister && nombre === "")) {
        alert("Completa todos los campos");
        return;
    }

    try {
        const endpoint = isRegister
        ? "http://localhost:3001/api/register"
        : "http://localhost:3001/api/login";

        const body = isRegister
        ? { nombre, email: correo, password }
        : { email: correo, password };

        const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
        alert(data.message || "Ocurrió un error");
        return;
        }

        alert(data.message);

        setNombre("");
        setCorreo("");
        setPassword("");

        if (isRegister) {
        setIsRegister(false);
        }
    } catch (error) {
        console.log(error);
        alert("No se pudo conectar con el backend");
    }
    };

    return (
    <div className="login-page">
        <div className="login-card">
        <div className="login-info">
            <h1>Vibes Ecuador</h1>

            <p>
            Plataforma web para una persona freelance que vende programas de
            viajes nacionales e internacionales.
            </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
            <h2>{isRegister ? "Crear cuenta" : "Iniciar sesión"}</h2>

            {isRegister && (
            <>
                <label>Nombre completo</label>

                <input
                type="text"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                />
            </>
            )}

            <label>Correo electrónico</label>

            <input
            type="email"
            placeholder="ejemplo@correo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            />

            <label>Contraseña</label>

            <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
            {isRegister ? "Registrarse" : "Ingresar"}
            </button>

            <p className="register-text">
            {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}

            <span onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? " Inicia sesión" : " Regístrate"}
            </span>
            </p>
        </form>
        </div>
    </div>
    );
}

export default Login;