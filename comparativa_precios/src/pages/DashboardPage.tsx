import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/hooks/useProducts";

export default function DashboardPage() {
  const { session, logout } = useAuth();
  const { items, add, addEntry, loading, error } = useProducts(session?.token);

  if (!session) return null;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <button className="border px-3 py-2" onClick={logout}>Logout</button>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-2">1) Agregar productos</h2>
        <ProductForm onSubmit={add} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">2) Productos guardados</h2>
        {loading && <p>Cargando…</p>}
        {error && <p className="text-red-600">{error}</p>}
        <ProductList items={items} onAddEntry={addEntry} />
      </section>
    </div>
  );
}
