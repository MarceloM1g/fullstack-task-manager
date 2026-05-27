import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, User } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-950 text-white">

            {/* SIDEBAR DESKTOP */}
            <aside className="hidden md:flex w-56 fixed left-0 top-16 bottom-0 bg-gray-900 border-r border-white/5 p-4">
                <nav className="flex flex-col gap-3 w-full">

                    <ASideLink
                        to='/sistema'
                        label='Sistema'
                        icon={LayoutDashboard}
                        current={location.pathname}>
                    </ASideLink>

                    <ASideLink
                        to='/profile'
                        label='Perfil'
                        icon={User}
                        current={location.pathname}>
                    </ASideLink>

                </nav>
            </aside>

            {/* CONTEÚDO */}
            <main className="md:ml-56 pt-24 px-4 pb-10 flex justify-center">
                <div className="w-full max-w-2xl">
                    {children}
                </div>
            </main>

        </div>
    );
}

type IconType = React.ElementType

function ASideLink({ to, label, icon: Icon, current }: { to: string; label: string; icon: IconType; current: string }) {
    const isActive = current === to
    return (
        <Link
            to={to}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-blue-950 transition-all duration-300 ${isActive
                ? 'bg-blue-950 text-[#fff] font-bold '
                : 'text-[#8ea3b8] hover:text-white hover:bg-white/5'
                }`}
        >
            <Icon size={18} />
            {label}
        </Link>
    )
}