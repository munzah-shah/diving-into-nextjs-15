import { getCollection } from "../lib/db";
import PostCard from "../components/PostCard";

export default async function Home() {
  const postsCollection = await getCollection("posts");
  const posts = await postsCollection?.find().sort({ $natural: -1 }).toArray();

  if (posts) {
    return (
      <div className="grid grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post._id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    );
  } else {
    return <p>Failed to fetch data from the database.</p>;
  }
}
