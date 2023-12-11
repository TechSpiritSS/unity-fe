import PageHeader from '@/components/PageHeader';
import React from 'react';
import PostDetailPage from './post';
import axios from 'axios';

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  let post = {
      title: '',
      points: 0,
      children: [],
    },
    error = null;

  const fetchPost = async () => {
    try {
      const res = await axios.get('http://hn.algolia.com/api/v1/items/' + id);

      post = res.data;
    } catch (error: any) {
      error = error.message;
    }
  };

  await fetchPost();

  return (
    <PostDetailPage
      title={post?.title ?? ''}
      points={post?.points ?? 0}
      postChildren={post?.children ?? []}
      error={error ?? ''}
    />
  );
};

export default page;
