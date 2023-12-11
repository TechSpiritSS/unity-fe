import PageHeader from '@/components/PageHeader';
import Comment from '@/components/Comment';

interface CommentProp {
  comment: Comment;
}

interface Comment {
  id: string;
  text: string;
  author: string;
  created_at: string;
}

interface PostDetailPageProps {
  title: string;
  points: number;
  postChildren: CommentProp['comment'][];
  error: string;
}

const PostDetailPage = ({
  title,
  points,
  postChildren,
  error,
}: PostDetailPageProps) => {
  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  return (
    <div className="mx-auto shadow-md rounded-md">
      <PageHeader title={title ?? ''} />
      <span className="my-2 inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-md font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20">
        {points} Points
      </span>

      <h3 className="text-xl font-bold text-gray-200 my-4">Comments:</h3>
      <Comment comments={postChildren} />
    </div>
  );
};

export default PostDetailPage;
