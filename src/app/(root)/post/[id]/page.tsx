'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

interface Comment {
  id: string;
  text: string;
}

interface PostDetail {
  title: string;
  points: number;
  children: Comment[];
}

export default function PostDetailPage() {
  const router = useRouter();
  const id = useParams().id;

  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `http://hn.algolia.com/api/v1/items/${id}`
        );
        setPost(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>{post?.title}</h2>
      <p>Points: {post?.points}</p>

      <h3>Comments:</h3>
      <ul>
        {post?.children.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
}
