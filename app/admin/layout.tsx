import AdminSessionWrapper from "./components/AdminSessionWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminSessionWrapper>
      {children}
    </AdminSessionWrapper>
  );
}
