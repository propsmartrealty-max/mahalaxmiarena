export const runtime = 'nodejs';

export async function GET() {
  return new Response('83f2e1a90c4b4d6e812a65cb21f8a709', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
