import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { PackagePlus, Settings2, Trash2, Edit2, Upload, ImageOff } from 'lucide-react';

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ name: '', brand: '', price: '', stock: '', categoryId: 1, image: null, isFeatured: false, carMake: 'Hepsi', carModel: 'Hepsi', carEngine: 'Hepsi' });
    const [message, setMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const vehicleData = {
        'Audi': { 'A4': ['1.8 TFSI', '2.0 TDI'], 'A6': ['2.0 TDI', '3.0 TDI'] },
        'BMW': { '3 Serisi': ['1.6', '2.0'], '5 Serisi': ['2.0d', '3.0d'] },
        'Mercedes': { 'C Serisi': ['1.6', '2.0'], 'E Serisi': ['2.0', '2.2d'] },
        'Volkswagen': { 'Golf': ['1.0 TSI', '1.4 TSI', '1.6 TDI'], 'Passat': ['1.4 TSI', '1.6 TDI', '2.0 TDI'] }
    };

    const getAuthConfig = (extraHeaders = {}) => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...extraHeaders
            }
        };
    };

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            if (response.data.success) {
                setCategories(response.data.data);
            }
        } catch (error) {
            console.error("Kategoriler yüklenemedi:", error);
        }
    };

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
        fetchCategories();
    }, []);

    const handleEditClick = (p) => {
        setIsEditing(true);
        setEditId(p.id);
        setForm({
            name: p.name,
            brand: p.brand,
            price: p.price,
            stock: p.stock,
            categoryId: p.categoryId,
            image: null,
            isFeatured: p.isFeatured || false,
            carMake: p.carMake || 'Hepsi',
            carModel: p.carModel || 'Hepsi',
            carEngine: p.carEngine || 'Hepsi'
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('brand', form.brand);
            formData.append('price', parseFloat(form.price) || 0);
            formData.append('stock', parseInt(form.stock) || 0);
            formData.append('categoryId', form.categoryId);
            formData.append('isFeatured', form.isFeatured);
            formData.append('carMake', form.carMake);
            formData.append('carModel', form.carModel);
            formData.append('carEngine', form.carEngine);

            if (form.image) {
                formData.append('image', form.image);
            }

            if (isEditing) {
                formData.append('id', editId);
                await api.put(`/products/${editId}`, formData, {
                    ...getAuthConfig({ 'Content-Type': 'multipart/form-data' })
                });
                setMessage('Ürün başarıyla güncellendi.');
            } else {
                await api.post('/products', formData, {
                    ...getAuthConfig({ 'Content-Type': 'multipart/form-data' })
                });
                setMessage('Ürün başarıyla eklendi.');
            }

            setErrorMsg('');
            setForm({ name: '', brand: '', price: '', stock: '', categoryId: 1, image: null, isFeatured: false, carMake: 'Hepsi', carModel: 'Hepsi', carEngine: 'Hepsi' });
            setIsEditing(false);
            setEditId(null);
            // Reset the file input manually since React state doesn't clear the file browser text
            document.getElementById('imageInput').value = '';
            fetchProducts();
        } catch (error) {
            setMessage('');
            if (error?.response?.status === 401) {
                setErrorMsg('Oturumunuzun süresi dolmuş olabilir. Lütfen tekrar giriş yapın.');
            } else {
                setErrorMsg('Hata: Ürün eklenemedi. Lütfen tüm alanları kontrol edin.');
            }
            console.error("Add product error:", error.response?.data || error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
            try {
                await api.delete(`/products/${id}`, getAuthConfig());
                setMessage('Ürün başarıyla silindi.');
                setErrorMsg('');
                fetchProducts();
            } catch (error) {
                if (error?.response?.status === 401) {
                    setErrorMsg('Silme işlemi için oturum yetkisi bulunamadı. Lütfen tekrar giriş yapın.');
                } else {
                    setErrorMsg('Ürün silinirken bir hata oluştu. Lütfen tekrar deneyin.');
                }
                console.error(error);
            }
        }
    };

    return (
        <div className="grid grid-cols-1 gap-8 bg-slate-50 p-2 lg:grid-cols-3">
            <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 border-b pb-4">
                        <PackagePlus className="text-blue-600" size={28} />
                        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">{isEditing ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h2>
                    </div>

                    {message && <div className="mb-6 p-3 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-100">{message}</div>}
                    {errorMsg && <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-100">{errorMsg}</div>}

                    <form onSubmit={handleAddProduct} className="space-y-4 text-sm font-medium">
                        <div>
                            <label className="mb-1.5 block text-gray-700">Ürün Adı</label>
                            <input type="text" className="h-11 w-full rounded-lg border border-slate-200 px-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-gray-700">Ürün Fotoğrafı</label>
                            <input id="imageInput" type="file" accept="image/*" className="hidden" onChange={e => setForm({ ...form, image: e.target.files[0] })} />
                            <label htmlFor="imageInput" className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition-colors hover:border-blue-400 hover:bg-blue-50/40">
                                <Upload className="h-6 w-6 text-slate-500" />
                                <p className="text-sm font-medium text-slate-700">Dosya seçmek için tıklayın veya sürükleyin</p>
                                <p className="text-xs text-slate-500">İsteğe bağlı: .jpg, .png</p>
                                {form.image && <span className="mt-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">{form.image.name}</span>}
                            </label>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-gray-700">Marka</label>
                            <input type="text" className="h-11 w-full rounded-lg border border-slate-200 px-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1.5 block text-gray-700">Fiyat (₺)</label>
                                <input type="number" step="0.01" className="h-11 w-full rounded-lg border border-slate-200 px-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })} required />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-gray-700">Stok</label>
                                <input type="number" className="h-11 w-full rounded-lg border border-slate-200 px-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" value={form.stock} onChange={e => setForm({ ...form, stock: parseInt(e.target.value) })} required />
                            </div>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-gray-700">Kategori</label>
                            <select 
                                className="h-11 w-full rounded-lg border border-slate-200 px-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                                value={form.categoryId} 
                                onChange={e => setForm({ ...form, categoryId: parseInt(e.target.value) })} 
                                required
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center mt-2 mb-4">
                            <input type="checkbox" id="isFeatured" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} />
                            <label htmlFor="isFeatured" className="ml-2 text-sm font-medium text-gray-700">Ana Sayfada Öne Çıkar (Featured)</label>
                        </div>

                        <div className="border-t border-slate-100 pt-4 mt-4">
                            <h3 className="text-gray-800 font-bold mb-3">Araç Uyumluluğu</h3>
                            <div className="space-y-3">
                                <select value={form.carMake} onChange={e => setForm({ ...form, carMake: e.target.value, carModel: 'Hepsi', carEngine: 'Hepsi' })} className="h-11 w-full rounded-lg border border-slate-200 px-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                                    <option value="Hepsi">Marka: Hepsi (Evrensel)</option>
                                    {Object.keys(vehicleData).map(make => <option key={make} value={make}>{make}</option>)}
                                </select>

                                <select value={form.carModel} onChange={e => setForm({ ...form, carModel: e.target.value, carEngine: 'Hepsi' })} disabled={form.carMake === 'Hepsi'} className="h-11 w-full rounded-lg border border-slate-200 px-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50">
                                    <option value="Hepsi">Model: Hepsi</option>
                                    {form.carMake !== 'Hepsi' && Object.keys(vehicleData[form.carMake] || {}).map(model => <option key={model} value={model}>{model}</option>)}
                                </select>

                                <select value={form.carEngine} onChange={e => setForm({ ...form, carEngine: e.target.value })} disabled={form.carModel === 'Hepsi'} className="h-11 w-full rounded-lg border border-slate-200 px-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50">
                                    <option value="Hepsi">Motor: Hepsi</option>
                                    {form.carMake !== 'Hepsi' && form.carModel !== 'Hepsi' && (vehicleData[form.carMake][form.carModel] || []).map(engine => <option key={engine} value={engine}>{engine}</option>)}
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="mt-4 w-full rounded-xl bg-slate-900 py-3.5 font-bold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md">
                            {isEditing ? 'Ürünü Güncelle' : 'Ürünü Kaydet'}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={() => {
                                setIsEditing(false);
                                setEditId(null);
                                setForm({ name: '', brand: '', price: '', stock: '', categoryId: 1, image: null, isFeatured: false, carMake: 'Hepsi', carModel: 'Hepsi', carEngine: 'Hepsi' });
                            }} className="mt-3 w-full rounded-xl bg-gray-200 py-3.5 font-bold text-gray-800 transition-all hover:bg-gray-300">
                                İptal Et
                            </button>
                        )}
                    </form>
                </div>
            </div>

            <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-slate-100 bg-white text-sm shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 p-6">
                    <Settings2 className="text-gray-600" size={24} />
                    <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Ürün Yönetimi</h2>
                </div>
                <div className="max-h-[70vh] overflow-auto p-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                <th className="sticky top-0 z-10 bg-slate-50 p-4">ID</th>
                                <th className="sticky top-0 z-10 bg-slate-50 p-4">Ad</th>
                                <th className="sticky top-0 z-10 bg-slate-50 p-4">Fotograf</th>
                                <th className="sticky top-0 z-10 bg-slate-50 p-4">Kategori</th>
                                <th className="sticky top-0 z-10 bg-slate-50 p-4">Marka</th>
                                <th className="sticky top-0 z-10 bg-slate-50 p-4">Fiyat</th>
                                <th className="sticky top-0 z-10 bg-slate-50 p-4">Stok</th>
                                <th className="sticky top-0 z-10 bg-slate-50 p-4 text-center">İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50">
                                    <td className="p-4 font-medium text-gray-500">#{p.id}</td>
                                    <td className="p-4 font-bold text-gray-800">{p.name}</td>
                                    <td className="p-4">
                                        {p.imageUrl ? (
                                            <div className="h-12 w-12 overflow-hidden rounded-lg border border-slate-200 bg-white">
                                                <img
                                                    src={`http://localhost:5112${p.imageUrl}`}
                                                    alt={p.name}
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                                                <ImageOff size={14} />
                                                Fotograf yok
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                            {p.categoryName || 'Belirtilmemiş'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-600">{p.brand}</td>
                                    <td className="p-4 font-bold text-blue-600">{p.price.toLocaleString('tr-TR')} ₺</td>
                                    <td className="p-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${p.stock > 20 ? 'bg-green-100 text-green-700' : p.stock > 5 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                                            {p.stock} Adet
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => handleEditClick(p)} className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600" title="Düzenle">
                                                <Edit2 size={20} />
                                            </button>
                                            <button onClick={() => handleDelete(p.id)} className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-red-600" title="Ürünü Sil">
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="p-8 text-center text-gray-500 font-medium">Kayıtlı ürün bulunamadı.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
