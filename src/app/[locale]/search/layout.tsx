export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, borderRight: '1px solid #ccc' }}>{children}</div>
    </div>
  );
}
