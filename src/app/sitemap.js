export const revalidate = 1;

export default async function sitemap() {
  let posts = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/getPosts`
    );
    const data = await res.json();
    posts = data.posts.map((post) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${post.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    }));
  } catch {
    console.log("failed to get posts");
  }

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contribute`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/signup`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...posts,
  ];
}
