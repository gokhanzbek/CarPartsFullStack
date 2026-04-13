import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import { ChevronDown, Plus, ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/CartContext';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [showAllProducts, setShowAllProducts] = useState(false);
    const [loadingAllProducts, setLoadingAllProducts] = useState(false);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [filterMake, setFilterMake] = useState('');
    const [filterModel, setFilterModel] = useState('');
    const [filterEngine, setFilterEngine] = useState('');

    const [triggerSearch, setTriggerSearch] = useState(0);

    const vehicleData = {
        'Audi': {
            'A4': ['1.8 TFSI', '2.0 TDI'],
            'A6': ['2.0 TDI', '3.0 TDI']
        },
        'BMW': {
            '3 Serisi': ['1.6', '2.0'],
            '5 Serisi': ['2.0d', '3.0d']
        },
        'Mercedes': {
            'C Serisi': ['1.6', '2.0'],
            'E Serisi': ['2.0', '2.2d']
        },
        'Volkswagen': {
            'Golf': ['1.0 TSI', '1.4 TSI', '1.6 TDI'],
            'Passat': ['1.4 TSI', '1.6 TDI', '2.0 TDI']
        }
    };

    const handleMakeChange = (e) => {
        setFilterMake(e.target.value);
        setFilterModel('');
        setFilterEngine('');
    };

    const handleModelChange = (e) => {
        setFilterModel(e.target.value);
        setFilterEngine('');
    };

    const handleSearchClick = () => {
        if (filterMake && filterModel && filterEngine) {
            navigate(`/vehicle/${filterMake}/${filterModel}/${filterEngine}`);
        } else {
            setTriggerSearch(prev => prev + 1);
        }
    };

    const handleShowAllProducts = async () => {
        if (showAllProducts) return;

        setLoadingAllProducts(true);
        try {
            const response = await api.get('/products');
            if (response.data.success) {
                const featuredIds = new Set(products.map((product) => product.id));
                const remainingProducts = response.data.data.filter((product) => !featuredIds.has(product.id));
                setAllProducts(remainingProducts);
                setShowAllProducts(true);
            }
        } catch (error) {
            console.error("Error fetching all products", error);
        } finally {
            setLoadingAllProducts(false);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (filterMake) params.append('make', filterMake);
                if (filterModel) params.append('model', filterModel);
                if (filterEngine) params.append('engine', filterEngine);

                const endpoint = (filterMake || filterModel || filterEngine) ? '/products' : '/products/featured';
                const response = await api.get(`${endpoint}?${params.toString()}`);
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
    }, [triggerSearch]);

    if (loading) {
        return <div className="text-center p-10 text-xl font-medium animate-pulse text-gray-500">Ürünler Yükleniyor...</div>;
    }

    return (
        <div className="space-y-10">
            {/* Hero + Vehicle Filter */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 px-6 py-10 text-white shadow-md md:px-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.35),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.2),transparent_40%)]" />
                <div className="relative z-10 space-y-6">
                    <div className="max-w-3xl space-y-2">
                        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Aracınıza en uygun parçayı hızlıca bulun</h2>
                        <p className="text-sm text-slate-200 md:text-base">Marka, model ve motor bilgilerini seçerek doğru ürünleri saniyeler içinde listeleyin.</p>
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="relative flex-1">
                            <select
                                value={filterMake}
                                onChange={handleMakeChange}
                                className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-3 pr-10 font-medium text-slate-800 shadow-md outline-none transition focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="">Marka Seçin</option>
                                {Object.keys(vehicleData).map(make => (
                                    <option key={make} value={make}>{make}</option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        </div>

                        <div className="relative flex-1">
                            <select
                                value={filterModel}
                                onChange={handleModelChange}
                                disabled={!filterMake}
                                className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-3 pr-10 font-medium text-slate-800 shadow-md outline-none transition focus:ring-2 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <option value="">Model Seçin</option>
                                {filterMake && Object.keys(vehicleData[filterMake] || {}).map(model => (
                                    <option key={model} value={model}>{model}</option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        </div>

                        <div className="relative flex-1">
                            <select
                                value={filterEngine}
                                onChange={(e) => setFilterEngine(e.target.value)}
                                disabled={!filterModel}
                                className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-3 pr-10 font-medium text-slate-800 shadow-md outline-none transition focus:ring-2 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <option value="">Motor Seçin</option>
                                {filterMake && filterModel && (vehicleData[filterMake][filterModel] || []).map(engine => (
                                    <option key={engine} value={engine}>{engine}</option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        </div>

                        <button
                            onClick={handleSearchClick}
                            className="w-full rounded-lg bg-orange-500 px-8 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-orange-400 hover:shadow-orange-300/40 md:w-auto"
                        >
                            Ara
                        </button>
                    </div>
                </div>
            </section>

            <h2 className="border-b border-slate-200 pb-4 text-3xl font-bold text-slate-800">Öne Çıkan Ürünler</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {products.map(product => (
                    <div key={product.id} className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-white p-4">
                            {product.imageUrl ? (
                                <img
                                    src={`http://localhost:5112${product.imageUrl}`}
                                    alt={product.name}
                                    className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <span className="text-center text-sm font-medium text-gray-400 transition-transform group-hover:scale-105">{product.brand} Parçası</span>
                            )}
                            <div className="absolute left-3 top-3 rounded-full bg-slate-800 px-3 py-1 text-xs font-bold uppercase text-white">
                                {product.categoryName}
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                            <p className="mb-1 text-sm text-gray-500">{product.brand}</p>
                            <h3 className="mb-3 line-clamp-2 text-base font-semibold text-slate-800">{product.name}</h3>
                            <div className="mt-auto space-y-3">
                                <span className="block text-lg font-bold text-blue-800">{product.price.toLocaleString('tr-TR')} ₺</span>
                                <button
                                    onClick={() => addToCart(product.id)}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-orange-400 hover:shadow-md"
                                >
                                    <Plus size={16} />
                                    <ShoppingCart size={16} />
                                    Sepete Ekle
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {products.length === 0 && (
                    <div className="col-span-full text-center text-gray-500 py-10">Henüz ürün bulunmuyor.</div>
                )}
            </div>

            {!showAllProducts && products.length > 0 && (
                <div className="flex justify-center">
                    <button
                        onClick={handleShowAllProducts}
                        disabled={loadingAllProducts}
                        className="rounded-lg bg-slate-900 px-8 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loadingAllProducts ? 'Yukleniyor...' : 'Tum Urunleri Gor'}
                    </button>
                </div>
            )}

            {showAllProducts && (
                <>
                    <h2 className="border-b border-slate-200 pb-4 text-3xl font-bold text-slate-800">Tum Urunler</h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {allProducts.map(product => (
                            <div key={`all-${product.id}`} className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-white p-4">
                                    {product.imageUrl ? (
                                        <img
                                            src={`http://localhost:5112${product.imageUrl}`}
                                            alt={product.name}
                                            className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <span className="text-center text-sm font-medium text-gray-400 transition-transform group-hover:scale-105">{product.brand} Parçası</span>
                                    )}
                                    <div className="absolute left-3 top-3 rounded-full bg-slate-800 px-3 py-1 text-xs font-bold uppercase text-white">
                                        {product.categoryName}
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col p-4">
                                    <p className="mb-1 text-sm text-gray-500">{product.brand}</p>
                                    <h3 className="mb-3 line-clamp-2 text-base font-semibold text-slate-800">{product.name}</h3>
                                    <div className="mt-auto space-y-3">
                                        <span className="block text-lg font-bold text-blue-800">{product.price.toLocaleString('tr-TR')} ₺</span>
                                        <button
                                            onClick={() => addToCart(product.id)}
                                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-orange-400 hover:shadow-md"
                                        >
                                            <Plus size={16} />
                                            <ShoppingCart size={16} />
                                            Sepete Ekle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {allProducts.length === 0 && (
                            <div className="col-span-full py-6 text-center text-gray-500">Tum urunler zaten ustte listelendi.</div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
