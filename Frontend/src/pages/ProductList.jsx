import { useState, useEffect, useContext } from 'react';
import api from '../api/axiosInstance';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/CartContext';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                if (response.data.success) {
                    setProducts(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center p-10 text-xl font-medium animate-pulse text-gray-500">Ürünler Yükleniyor...</div>;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Tüm Ürünler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col">
                        <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                            {/* Placeholder for image */}
                            <span className="text-gray-400 font-medium text-lg drop-shadow-sm group-hover:scale-110 transition-transform">{product.brand} Parçası</span>
                            <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full uppercase">
                                {product.categoryName}
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
                            <p className="text-sm text-gray-500 font-medium mb-4">{product.brand}</p>

                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-2xl font-extrabold text-blue-600">{product.price.toLocaleString('tr-TR')} ₺</span>
                                <button
                                    onClick={() => addToCart(product.id)}
                                    className="bg-gray-900 hover:bg-blue-600 text-white p-2.5 rounded-xl transition-colors shadow-sm cursor-pointer"
                                    title="Sepete Ekle"
                                >
                                    <ShoppingCart size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {products.length === 0 && (
                    <div className="col-span-full text-center text-gray-500 py-10">Henüz ürün bulunmuyor.</div>
                )}
            </div>
        </div>
    );
}
