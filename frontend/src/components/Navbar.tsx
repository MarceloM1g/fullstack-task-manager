import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    function handleAccess() {
        if (!token) {
            navigate('/login');
            return;
        }

        navigate('/sistema');
    }

    return (
        <header className="fixed top-0 left-0 z-10 w-full bg-[#0d1520]/80 backdrop-blur-md border-b border-[#3b9eff]/10">
            <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <span className="text-base font-semibold text-white tracking-tight">
                        Task <span className="text-[#3b9eff]">Manager</span>
                    </span>
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-5 px-2 py-1.5">
                    <NavLink to="/register" label="Registrar" current={location.pathname} />
                    <NavLink to="/login" label="Login" current={location.pathname} />
                    <button
                        onClick={handleAccess}
                        className="ml-1 rounded-full bg-[#3b9eff] px-4 py-1.5 text-sm font-semibold text-white  transition-all duration-200 hover:bg-[#5aadff] hover:shadow-[0_0_18px_rgba(59,158,255,0.5)] active:scale-95"
                    >
                        Acesso
                    </button>
                </div>

            </nav>
        </header>
    )
}

function NavLink({ to, label, current }: { to: string; label: string; current: string }) {
    const isActive = current === to
    return (
        <Link
            to={to}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${isActive
                ? 'bg-[#3b9eff]/15 text-[#3b9eff]'
                : 'text-[#8ea3b8] hover:text-white hover:bg-white/5'
                }`}
        >
            {label}
        </Link>
    )
}

export default Navbar