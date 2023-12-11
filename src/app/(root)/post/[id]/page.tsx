'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PageHeader from '@/components/PageHeader';
import Comment from '@/components/Comment';
import { comment } from 'postcss';
import Loader from '@/components/Loader';

interface CommentProp {
  comment: Comment;
}

interface Comment {
  id: string;
  text: string;
  author: string;
  created_at: string;
}

interface Post {
  title: string;
  points: number;
  children: CommentProp['comment'][];
}

const Comment2 = ({ comment }: CommentProp) => (
  <div className="border p-4 rounded-md my-4 bg-gray-100">
    <p className="text-gray-700">{comment.text}</p>
    <p className="text-sm text-gray-500 mt-2">
      by {comment.author} on {new Date(comment.created_at).toLocaleString()}
    </p>
  </div>
);

const PostDetailPage = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          'http://hn.algolia.com/api/v1/items/29564265' // Replace with dynamic ID
        );
        setPost(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  return (
    <div className="mx-auto shadow-md rounded-md">
      <PageHeader title={post?.title ?? ''} />
      <span className="my-2 inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-md font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20">
        {post?.points} Points
      </span>

      <h3 className="text-xl font-bold text-gray-200 my-4">Comments:</h3>
      <Comment comments={post?.children} />
    </div>
  );
};

export default PostDetailPage;
