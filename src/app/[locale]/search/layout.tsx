export default function SearchLayout({
  children,
  detail,
}: {
  children: React.ReactNode;
  detail: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, borderRight: '1px solid #ccc' }}>{children}</div>
      <div style={{ flex: 1 }}>{detail}</div>
    </div>
  );
}
