export default async function Home() {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  if (!response.ok) return <h2>"error"</h2>;
  const albums: [] = await response.json();
  return (
    <main>
      <div>
        {albums.map((album: { id: number; title: string }) => (
          <div key={album.id}>
            <h2 className="h2-bold">{album.title}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
