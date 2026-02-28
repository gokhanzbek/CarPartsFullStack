import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get('/products'); // Our API currently returns all products, finding locally for simplicity
                if (response.data.success) {
                    const found = response.data.data.find(p => p.id === parseInt(id));
                    setProduct(found);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="p-10 text-center animate-pulse">Yükleniyor...</div>;
    if (!product) return <div className="p-10 text-center text-red-500 font-bold">Ürün bulunamadı!</div>;

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mt-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:text-blue-800 font-bold mb-6 transition-colors">
                <ArrowLeft size={20} className="mr-2" /> Geri Dön
            </button>

            <div className="flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-1/2 bg-gray-50 rounded-2xl flex items-center justify-center min-h-[300px] border border-gray-100">
                    <span className="text-gray-400 font-bold text-2xl tracking-widest uppercase">{product.brand} Parçası</span>
                </div>

                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="mb-2 bg-blue-100 text-blue-800 w-max px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {product.categoryName}
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">{product.name}</h1>
                    <p className="text-xl text-gray-500 font-medium mb-6">{product.brand}</p>

                    <div className="text-4xl font-extrabold text-blue-600 mb-8">
                        {product.price.toLocaleString('tr-TR')} ₺
                    </div>

                    <div className="mb-8">
                        <span className={`px-4 py-2 rounded-lg font-bold text-sm ${product.stock > 10 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                            Stok Durumu: {product.stock > 0 ? `${product.stock} Adet` : 'Tükendi'}
                        </span>
                    </div>

                    <button
                        onClick={() => addToCart(product.id)}
                        disabled={product.stock <= 0}
                        className="mt-auto w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-md hover:shadow-lg"
                    >
                        <ShoppingCart size={24} />
                        Sepete Ekle
                    </button>
                </div>
            </div>
        </div>
    );
}
