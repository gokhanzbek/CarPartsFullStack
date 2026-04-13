import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Car, Chrome, KeyRound, UserRound } from 'lucide-react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showHeroText, setShowHeroText] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setShowHeroText(true), 1350);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const success = await login(username, password);
        if (success) {
            navigate('/');
        } else {
            setError('Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.');
        }
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid lg:min-h-[78vh] lg:grid-cols-2">
            <div className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-end lg:bg-gradient-to-br lg:from-slate-900 lg:to-blue-900 lg:p-10">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_40%,rgba(59,130,246,0.35),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.2),transparent_40%)]" />

                <div className="relative z-10 mb-8 flex items-center justify-center">
                    <div className="car-arrival w-full max-w-md">
                        <svg viewBox="0 0 640 280" className="h-auto w-full drop-shadow-[0_18px_30px_rgba(15,23,42,0.5)]" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <rect x="95" y="135" width="450" height="72" rx="30" fill="#0B1220" />
                            <path d="M190 135H450L404 92C395 84 384 80 372 80H266C254 80 243 84 234 92L190 135Z" fill="#111827" />
                            <path d="M215 137H427L390 103C384 98 376 95 368 95H274C266 95 258 98 252 103L215 137Z" fill="#1E293B" />
                            <rect x="253" y="106" width="120" height="30" rx="12" fill="#334155" />
                            <rect x="382" y="106" width="52" height="30" rx="12" fill="#334155" />
                            <circle cx="206" cy="214" r="40" fill="#020617" />
                            <circle cx="206" cy="214" r="21" fill="#94A3B8" />
                            <circle cx="206" cy="214" r="9" fill="#E2E8F0" />
                            <circle cx="435" cy="214" r="40" fill="#020617" />
                            <circle cx="435" cy="214" r="21" fill="#94A3B8" />
                            <circle cx="435" cy="214" r="9" fill="#E2E8F0" />
                            <rect x="517" y="158" width="23" height="11" rx="5.5" fill="#FB923C" />
                            <rect x="102" y="158" width="23" height="11" rx="5.5" fill="#93C5FD" />
                            <ellipse cx="320" cy="238" rx="210" ry="12" fill="rgba(15,23,42,0.35)" />
                        </svg>
                    </div>
                </div>

                <div className={`relative z-10 transition-all duration-700 ${showHeroText ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
                    <div className="flex items-center gap-2 text-white">
                        <span className="rounded-lg bg-white/10 p-2">
                            <Car className="h-5 w-5 text-orange-400" />
                        </span>
                        <span className="text-xl font-bold tracking-tight">CarParts Store</span>
                    </div>
                    <h3 className="mt-5 text-4xl font-extrabold leading-tight text-white">Araciniz icin en dogru parca burada.</h3>
                    <p className="mt-3 max-w-sm text-sm text-blue-100">
                        Guvenilir urunler, hizli tedarik ve profesyonel satis deneyimi tek noktada sizi bekliyor.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center bg-white px-5 py-10 sm:px-8">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-slate-900">Giris Yap</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Hesabiniza giris yaparak alisverise kaldiginiz yerden devam edin.
                    </p>

                    {error && <div className="mt-5 rounded-lg border border-red-100 bg-red-50 p-3 text-sm font-medium text-red-600">{error}</div>}

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        <div className="relative">
                            <UserRound className="absolute left-3 top-3.5 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Kullanici Adi"
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 transition-all focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-3.5 text-slate-400" size={20} />
                            <input
                                type="password"
                                placeholder="Sifre"
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 transition-all focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="mt-2 text-right">
                                <a href="#" className="text-sm text-blue-600 transition-colors hover:text-blue-700 hover:underline">
                                    Sifremi Unuttum?
                                </a>
                            </div>
                        </div>
                        <button type="submit" className="w-full rounded-lg bg-slate-900 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg">
                            Giris Yap
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-slate-200" />
                        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">veya</span>
                        <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    <button type="button" className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                        <Chrome size={18} />
                        Google ile Giris Yap
                    </button>

                    <p className="mt-6 text-center text-sm text-slate-600">
                        Hesabin yok mu? <Link to="/register" className="font-semibold text-blue-600 hover:underline">Hemen kayit ol</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
