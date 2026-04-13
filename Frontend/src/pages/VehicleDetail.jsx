import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { ShoppingCart, Car, ChevronRight, RotateCcw, ImageOff } from 'lucide-react';
import { CartContext } from '../context/CartContext';

export default function VehicleDetail() {
    const { make, model, engine } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('Hepsi');
    const { addToCart } = useContext(CartContext);

    const categories = [
        "Hepsi",
        "Motor Yağları",
        "Fren Parçaları",
        "Kayış & Kasnak",
        "Vites & Şanzıman",
        "Aydınlatma & Ayna",
        "Motor Parçaları",
        "Süspansiyon",
        "Diğer"
    ];

    useEffect(() => {
        const fetchVehicleProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (make) params.append('make', make);
                if (model) params.append('model', model);
                if (engine) params.append('engine', engine);

                const response = await api.get(`/products?${params.toString()}`);
                if (response.data.success) {
                    setProducts(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching vehicle products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicleProducts();
    }, [make, model, engine]);

    const filteredProducts = selectedCategory === 'Hepsi' 
        ? products 
        : products.filter(p => p.categoryName === selectedCategory || (selectedCategory === 'Diğer' && !categories.includes(p.categoryName)));

    if (loading) {
        return <div className="text-center p-10 text-xl font-medium animate-pulse text-gray-500">Araç Bilgileri Yükleniyor...</div>;
    }

    return (
        <div className="py-4 max-w-[1400px] mx-auto">
            {/* Breadcrumb */}
            <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
                <Link to="/" className="transition-colors hover:text-orange-500">Ana Sayfa</Link>
                <ChevronRight size={13} />
                <span className="font-medium text-slate-700">{make} {model}</span>
                {selectedCategory !== 'Hepsi' && (
                    <>
                        <ChevronRight size={13} />
                        <span className="font-medium text-slate-700">{selectedCategory}</span>
                    </>
                )}
            </div>

            {/* Vehicle Header */}
            <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-100 p-4 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-white p-2.5 shadow-sm">
                        <Car size={30} className="text-slate-700" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-800 uppercase">
                            {make} {model} {engine} ({new Date().getFullYear()-4}-{new Date().getFullYear()})
                        </h1>
                    </div>
                </div>
                <Link to="/" className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200">
                    <RotateCcw size={16} /> ARACI DEĞIŞTIR
                </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Categories */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <h2 className="border-b border-slate-200 pb-4 text-xl font-bold text-slate-800">Ana Kategoriler</h2>
                    <div className="mt-3 rounded-xl border border-slate-100 bg-white p-2 shadow-sm">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                    selectedCategory === cat 
                                    ? 'bg-slate-900 text-white font-semibold' 
                                    : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                {cat}
                                {selectedCategory === cat && <ChevronRight size={14} />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Section */}
                <div className="flex-1">
                    <h2 className="mb-4 border-b border-slate-200 pb-4 text-xl font-bold text-slate-800">Ürünler</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                                <div className="flex h-48 items-center justify-center bg-white p-4">
                                    {product.imageUrl ? (
                                        <img
                                            src={`http://localhost:5112${product.imageUrl}`}
                                            alt={product.name}
                                            className="max-h-full max-w-full object-contain mix-blend-multiply"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                                            <ImageOff size={40} />
                                            <span className="mt-2 text-xs">Görsel Yok</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col border-t border-slate-100 p-4 text-center">
                                    <h3 className="mb-2 h-10 line-clamp-2 text-sm font-semibold text-slate-800">{product.name}</h3>
                                    
                                    <div className="mt-auto w-full">
                                        <div className="mb-2">
                                            <span className="block text-xs font-medium uppercase tracking-wider text-slate-500">{product.brand}</span>
                                            <span className="text-xs text-slate-400">KOD: {product.id + 50000}</span>
                                        </div>
                                        <div className="mb-3 text-lg font-bold text-slate-900">
                                            {product.price.toLocaleString('tr-TR')} TL
                                        </div>
                                        <button
                                            onClick={() => addToCart(product.id)}
                                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-2.5 text-xs font-bold uppercase text-white transition-colors hover:bg-orange-500"
                                        >
                                            <ShoppingCart size={15} />
                                            Sepete Ekle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredProducts.length === 0 && (
                            <div className="col-span-full text-center py-20 bg-white border border-dashed border-gray-300 rounded-lg">
                                <p className="text-gray-500 font-medium">Bu kategoride henüz ürün bulunmuyor.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
