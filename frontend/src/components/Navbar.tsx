import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <header className="fixed top-0 left-0 z-10 w-full bg-[#111927] border-b border-[#3b9eff]/20">
            <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
                <Link to="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3b9eff] text-lg font-bold text-[#fff]">
                        M
                    </div>

                    <h1 className="text-lg font-bold text-[#fff]">
                        Missões
                    </h1>
                </Link>

                <Link
                    to="/register"
                    className="rounded-full bg-[#3b9eff] px-5 py-2 font-medium text-[#fff] transition-colors duration-200 hover:bg-[#003362]">
                    Registrar
                </Link>

                <Link
                    to="/login"
                    className="rounded-full bg-[#3b9eff] px-5 py-2 font-medium text-[#fff] transition-colors duration-200 hover:bg-[#003362]">
                    Login
                </Link>

                <Link
                    to="/sistema"
                    className="rounded-full bg-[#3b9eff] px-5 py-2 font-medium text-[#fff] transition-colors duration-200 hover:bg-[#003362]">
                    Acesso
                </Link>
            </nav>
        </header>
    )
}

export default Navbar