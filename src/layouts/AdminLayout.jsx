import AdminSidebar from "../components/admin/AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">{children}</main>
    </div>
  );
}

export default AdminLayout;