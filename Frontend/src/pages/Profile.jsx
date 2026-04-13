import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import { User, Package, LogOut, Clock, CheckCircle } from 'lucide-react';

export default function Profile() {
    const { user, role, logout, token } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.success) {
                    setOrders(response.data.data);
                }
            } catch (error) {
                console.error("Siparişler yüklenirken hata oluştu", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={`mx-auto max-w-6xl ${role === 'Admin' ? 'flex min-h-screen items-center justify-center py-8' : 'py-8'}`}>
            <div className={`grid grid-cols-1 ${role === 'Admin' ? 'w-full max-w-md md:grid-cols-1' : 'md:grid-cols-3'} gap-8`}>
                {/* Kullanıcı Bilgileri Paneli */}
                <div className="md:col-span-1">
                    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-2xl" />
                        <div className="-mt-12 px-6 pb-6">
                            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white text-blue-600 shadow-md">
                                <User size={44} />
                            </div>
                            <h2 className="text-center text-xl font-bold text-gray-800 mb-1">{user}</h2>
                            <p className="mb-6 border-b border-gray-100 pb-6 text-center text-sm font-medium text-gray-500">
                                Rol: <span className="font-semibold text-blue-700">{role === 'Admin' ? 'Yönetici' : 'Müşteri'}</span>
                            </p>

                            <div className="space-y-3">
                                {role === 'Admin' && (
                                    <button
                                        onClick={() => navigate('/admin')}
                                        className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white transition-colors hover:bg-slate-800"
                                    >
                                        Admin Paneline Git
                                    </button>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500 py-3 font-bold text-red-600 transition-colors hover:bg-red-50"
                                >
                                    <LogOut size={18} />
                                    Çıkış Yap
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sipariş Geçmişi - Sadece Müşteriler İçin Gösterilir */}
                {role !== 'Admin' && (
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-50 pb-4 flex items-center gap-2">
                                <Package className="text-blue-600" size={24} />
                                Sipariş Geçmişim
                            </h2>

                            {loading ? (
                                <div className="text-center py-10 text-gray-500 animate-pulse">Siparişleriniz yükleniyor...</div>
                            ) : orders.length > 0 ? (
                                <div className="space-y-6">
                                    {orders.map(order => (
                                        <div key={order.id} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                            <div className="bg-gray-50 p-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                                                <div>
                                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Sipariş No</p>
                                                    <p className="font-semibold text-gray-800">#{order.id}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Tarih</p>
                                                    <p className="font-semibold text-gray-800 flex items-center gap-1">
                                                        <Clock size={16} className="text-gray-400" />
                                                        {new Date(order.createdDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Tutar</p>
                                                    <p className="font-bold text-blue-600 text-lg">{order.totalPrice.toLocaleString('tr-TR')} ₺</p>
                                                </div>
                                                <div>
                                                    <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1">
                                                        <CheckCircle size={16} /> Alındı
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-white">
                                                <ul className="space-y-3">
                                                    {order.items.map((item, idx) => (
                                                        <li key={idx} className="flex justify-between items-center text-sm">
                                                            <span className="text-gray-700 font-medium">
                                                                <span className="text-gray-400 mr-2">{item.quantity}x</span>
                                                                {item.productName || `Ürün ID: ${item.productId}`}
                                                            </span>
                                                            <span className="font-semibold text-gray-800">{(item.unitPrice * item.quantity).toLocaleString('tr-TR')} ₺</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    <Package className="mx-auto text-gray-300 mb-3" size={48} />
                                    <p className="text-gray-500 font-medium">Henüz hiç siparişiniz bulunmuyor.</p>
                                    <button onClick={() => navigate('/')} className="mt-4 text-blue-600 font-bold hover:underline">
                                        Alışverişe Başla
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
