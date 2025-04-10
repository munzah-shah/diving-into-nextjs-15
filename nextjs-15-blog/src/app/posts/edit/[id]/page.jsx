import { ObjectId } from "mongodb";
import BlogForm from "../../../../components/BlogForm";
import { getCollection } from "../../../../lib/db";
import { updatePost } from "../../../../actions/posts";
import getAuthUser from "../../../../lib/getAuthUser";
import { redirect } from "next/navigation";

export default async function Edit({ params }) {
  // Get id parameter from page params
  const { id } = await params;

  // Get the auth user from cookies
  const user = await getAuthUser();

  const postsCollection = await getCollection("posts");

  let post;
  if (id.length === 24 && postsCollection) {
    post = await postsCollection.findOne({
      _id: ObjectId.createFromHexString(id),
    });
    post = JSON.parse(JSON.stringify(post));
    if (user.userId !== post.userId.toString()) {
      return redirect("/");
    }
  } else {
    post = null;
  }

  return (
    <div className="container w-1/2">
      <h1 className="title">Edit your post</h1>
      {post ? (
        <BlogForm handler={updatePost} post={post} />
      ) : (
        <p className="flex justify-center mx-auto">
          Failed to fetch the blog post data
        </p>
      )}
    </div>
  );
}
