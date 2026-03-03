import { useParams } from "react-router-dom";

const users = [
  { id: "1", name: "Priyanshu", email: "priyanshu@mail.com", bio: "Frontend Dev" },
  { id: "2", name: "Rahul", email: "rahul@mail.com", bio: "Backend Dev" }
];

const posts = [
  { id: 1, userId: "1", text: "Hello world post" },
  { id: 2, userId: "2", text: "My first post" },
  { id: 3, userId: "1", text: "Learning React 🔥" }
];

export default function Profile() {
  const { id } = useParams();

  const user = users.find(u => u.id === id);
  const userPosts = posts.filter(p => p.userId === id);

  if (!user) return <h2>User not found</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.bio}</p>

      <hr />

      <h2>My Posts</h2>
      {userPosts.map(post => (
        <div key={post.id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          {post.text}
        </div>
      ))}
    </div>
  );
}