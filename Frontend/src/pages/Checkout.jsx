import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import { CartContext } from '../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export default function Checkout() {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { cartItems, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const total = cartItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);

    const handleCheckout = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/orders'); // Controller gets userId from token
            if (response.data.success) {
                setSuccess(true);
                clearCart();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Sipariş oluşturulurken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-green-500 mb-6 bg-green-50 p-6 rounded-full animate-bounce">
                    <CheckCircle2 size={64} />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-800 mb-3 text-center tracking-tight">Siparişiniz Alındı!</h2>
                <p className="text-gray-500 mb-10 text-center max-w-sm">
                    Siparişiniz başarıyla oluşturuldu. Bizi tercih ettiğiniz için teşekkür ederiz.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-md transform hover:scale-105"
                >
                    Alışverişe Geri Dön
                </button>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return <div className="text-center p-10 font-medium">Sepetiniz boş.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-extrabold mb-8 text-gray-800 border-b pb-4 tracking-tight">Ödeme Seçenekleri</h2>
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">{error}</div>}

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8 space-y-3">
                {cartItems.map(item => (
                    <div key={item.productId} className="flex justify-between items-center text-gray-700 font-medium border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                        <span className="line-clamp-1 flex-1 pr-4">{item.quantity}x {item.productName}</span>
                        <span className="font-bold text-gray-900 shrink-0">{(item.unitPrice * item.quantity).toLocaleString('tr-TR')} ₺</span>
                    </div>
                ))}
                <div className="pt-4 mt-2 flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <span className="text-lg font-bold text-gray-800 tracking-tight">Ödenecek Tutar</span>
                    <span className="text-2xl font-extrabold text-blue-700">{total.toLocaleString('tr-TR')} ₺</span>
                </div>
            </div>

            <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-xl transform hover:-translate-y-1"
            >
                {loading ? 'İşleniyor...' : 'Siparişi Onayla ve Bitir'}
            </button>
        </div>
    );
}
