import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { UserRound, Mail, KeyRound } from 'lucide-react';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await api.post('/auth/register', { username, email, password });
            if (response.data.success) {
                setSuccess('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Kayıt sırasında bir hata oluştu.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8 tracking-tight">Kayıt Ol</h2>
                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium border border-red-100">{error}</div>}
                {success && <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-sm font-medium border border-green-100">{success}</div>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <UserRound className="absolute left-3 top-3.5 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Kullanıcı Adı"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                        <input
                            type="email"
                            placeholder="E-Posta Adresi"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-3.5 text-gray-400" size={20} />
                        <input
                            type="password"
                            placeholder="Şifre"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition duration-200 transform hover:scale-[1.02] shadow-md">
                        Üye Ol
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600 text-sm">
                    Zaten hesabın var mı? <Link to="/login" className="text-blue-600 hover:underline font-semibold">Giriş yap</Link>
                </p>
            </div>
        </div>
    );
}
