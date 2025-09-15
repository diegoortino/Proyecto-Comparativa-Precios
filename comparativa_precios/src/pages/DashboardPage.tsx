// pages/DashboardPage.tsx
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import { useProducts } from '../hooks/useProducts';


export default function DashboardPage({token}:{token:string}){
const { items, add, addEntry, loading, error } = useProducts(token);
return (
<div className="max-w-3xl mx-auto p-4 space-y-6">
<section>
<h2 className="text-xl font-semibold mb-2">1) Agregar productos</h2>
<ProductForm onSubmit={add} />
</section>
<section>
<h2 className="text-xl font-semibold mb-2">2) Productos guardados</h2>
{loading && <p>Cargando…</p>}
{error && <p className="text-red-600">{error}</p>}
<ProductList items={items} onAddEntry={addEntry} />
</section>
</div>
);
}