import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { PackagePlus, Settings2, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', brand: '', price: 0, stock: 0, categoryId: 1 });
    const [message, setMessage] = useState('');

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            if (response.data.success) {
                setProducts(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await api.post('/products', form);
            setMessage('Ürün başarıyla eklendi.');
            setForm({ name: '', brand: '', price: 0, stock: 0, categoryId: 1 });
            fetchProducts();
        } catch (error) {
            setMessage('Hata: Ürün eklenemedi.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
                    <div className="flex items-center gap-3 mb-6 border-b pb-4">
                        <PackagePlus className="text-blue-600" size={28} />
                        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Yeni Ürün Ekle</h2>
                    </div>

                    {message && <div className="mb-6 p-3 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-100">{message}</div>}

                    <form onSubmit={handleAddProduct} className="space-y-4 text-sm font-medium">
                        <div>
                            <label className="block text-gray-700 mb-1.5">Ürün Adı</label>
                            <input type="text" className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1.5">Marka</label>
                            <input type="text" className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-1.5">Fiyat (₺)</label>
                                <input type="number" step="0.01" className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })} required />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1.5">Stok</label>
                                <input type="number" className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" value={form.stock} onChange={e => setForm({ ...form, stock: parseInt(e.target.value) })} required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1.5">Kategori ID</label>
                            <input type="number" className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" value={form.categoryId} onChange={e => setForm({ ...form, categoryId: parseInt(e.target.value) })} required />
                        </div>
                        <button className="w-full bg-gray-900 hover:bg-blue-600 text-white font-bold py-3.5 mt-2 rounded-xl transition-all shadow-md mt-4">Ürünü Kaydet</button>
                    </form>
                </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden text-sm">
                <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                    <Settings2 className="text-gray-600" size={24} />
                    <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Ürün Yönetimi</h2>
                </div>
                <div className="overflow-x-auto p-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 font-bold uppercase tracking-wider text-xs">
                                <th className="p-4 rounded-l-xl">ID</th>
                                <th className="p-4">Ad</th>
                                <th className="p-4">Marka</th>
                                <th className="p-4">Fiyat</th>
                                <th className="p-4">Stok</th>
                                <th className="p-4 text-center rounded-r-xl">İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p, index) => (
                                <tr key={p.id} className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors ${index % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                                    <td className="p-4 font-medium text-gray-500">#{p.id}</td>
                                    <td className="p-4 font-bold text-gray-800">{p.name}</td>
                                    <td className="p-4 text-gray-600">{p.brand}</td>
                                    <td className="p-4 font-bold text-blue-600">{p.price.toLocaleString('tr-TR')} ₺</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-md font-bold text-xs ${p.stock > 10 ? 'bg-green-100 text-green-700' : p.stock > 0 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                                            {p.stock} Adet
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2.5 rounded-lg hover:bg-red-100 transition-colors" title="Ürünü Sil">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500 font-medium">Kayıtlı ürün bulunamadı.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
