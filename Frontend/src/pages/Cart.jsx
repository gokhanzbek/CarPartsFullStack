import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    const total = cartItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-gray-400 mb-6 bg-gray-50 p-6 rounded-full">
                    <Trash2 size={48} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Sepetiniz Boş</h2>
                <p className="text-gray-500 mb-8">Henüz sepetinize parça eklemediniz.</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-sm"
                >
                    Alışverişe Başla
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
                <h2 className="text-3xl font-extrabold mb-6 text-gray-800 border-b pb-4">Sepetim</h2>
                {cartItems.map((item) => (
                    <div key={item.productId} className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex-1 w-full flex flex-col sm:flex-row items-center gap-6">
                            <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                                <span className="text-xs text-gray-400 uppercase font-bold tracking-widest text-center px-2 leading-tight">Görsel<br />Yok</span>
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{item.productName}</h3>
                                <p className="text-blue-600 font-extrabold mt-2 text-xl">{item.unitPrice.toLocaleString('tr-TR')} ₺</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mt-6 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                                <button
                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                    className="p-2 text-gray-500 hover:text-black hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="w-12 text-center font-bold text-gray-800">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                    className="p-2 text-gray-500 hover:text-black hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.productId)}
                                className="text-red-500 hover:text-red-700 bg-red-50 p-3 rounded-xl hover:bg-red-100 transition-colors"
                                title="Sepetten Çıkar"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-7 rounded-2xl shadow-lg border border-gray-100 h-fit sticky top-24">
                <h3 className="text-xl font-extrabold mb-6 text-gray-800 border-b pb-4">Sipariş Özeti</h3>
                <div className="flex justify-between items-center mb-4 text-gray-600 font-medium">
                    <span>Ara Toplam</span>
                    <span>{total.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex justify-between items-center mb-6 text-gray-600 font-medium">
                    <span>Kargo</span>
                    <span className="text-green-600 font-bold">Ücretsiz</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t mb-8">
                    <span className="text-lg font-bold text-gray-800">Genel Toplam</span>
                    <span className="text-3xl font-extrabold text-blue-600">{total.toLocaleString('tr-TR')} ₺</span>
                </div>
                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-xl transform hover:-translate-y-1"
                    onClick={() => navigate('/checkout')}
                >
                    Sepeti Onayla <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
}
