import { useState } from "react";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleName(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.currentTarget.value);
    }

    function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.currentTarget.value);
    }

    function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.currentTarget.value);
    }


    async function registerUser() {
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            alert('Campo Vazio!');
            return;
        }

        try {
            const response = await fetch('https://fullstack-task-manager-x8w5.onrender.com/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            if (!response.ok) {
                throw new Error("Erro ao criar Usuário");
            } else {
                alert('Usuário registrado com sucesso!');
            }

            const data = await response.json();
            console.log(data);

            setName('');
            setEmail('');
            setPassword('');

        } catch (error) {
            console.log(error);
        }
    }

    return (
            <div className="min-h-screen bg-[#111927] flex items-center justify-center px-4">
                <div className="bg-[#181A21] p-6 rounded-2xl shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center text-[#fff]">
                        Criar uma Conta
                    </h1>

                    <div className="mb-5">
                        <h2 className="text-[#fff] mb-2">Nome</h2>
                        <input
                            type="text"
                            placeholder="Digite seu nome"
                            onChange={handleName}
                            value={name}
                            className="w-full px-4 py-3 rounded-xl bg-[#32353c] 
                            focus:bg-[#111927] border border-transparent 
                            focus:border-[#3b9eff] focus:ring-2 focus:ring-[#3b9eff]
                            outline-none transition-all duration-200
                            placeholder-white/50 text-[#fff]"
                        />
                    </div>

                    <div className="mb-5">
                        <h2 className="text-[#fff] mb-2">Email</h2>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            onChange={handleEmail}
                            value={email}
                            className="w-full px-4 py-3 rounded-xl bg-[#32353c] 
                            focus:bg-[#111927] border border-transparent 
                            focus:border-[#3b9eff] focus:ring-2 focus:ring-[#3b9eff]
                            outline-none transition-all duration-200
                            placeholder-white/50 text-[#fff]"
                        />
                    </div>

                    <div className="mb-5">
                        <h2 className="text-[#fff] mb-2">Senha</h2>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            onChange={handlePassword}
                            value={password}
                            className="w-full px-4 py-3 rounded-xl bg-[#32353c] 
                            focus:bg-[#111927] border border-transparent 
                            focus:border-[#3b9eff] focus:ring-2 focus:ring-[#3b9eff]
                            outline-none transition-all duration-200
                            placeholder-white/50 text-[#fff]"
                        />
                    </div>

                    <button
                        onClick={registerUser}
                        className="bg-[#3b9eff] hover:bg-[#111927] text-[#fff] px-4 py-2 rounded-full flex items-center justify-center w-full mt-5 transition-colors duration-200">
                        Cadastrar
                    </button>
                </div>
            </div>
    );
}

export default Register;
