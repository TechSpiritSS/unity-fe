import timeAsDate from '@/utils/timeAsDate';
import avatar from '@/utils/avatar';

interface CommentProp {
  comments:
    | {
        id: string;
        text: string;
        author: string;
        created_at: string;
      }[]
    | undefined;
}

export default function Comment({ comments }: CommentProp) {
  if (!comments) {
    return null;
  }

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {comments.map((comment, i) => (
          <li key={comment.id}>
            <div className="relative pb-8">
              <div className="relative flex items-start space-x-3">
                <div className="relative">{avatar(comment.author)}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">
                      {comment.author}
                    </div>
                    <p className="text-sm text-gray-400">
                      {timeAsDate(comment.created_at)}
                    </p>
                  </div>
                  <div className="mt-2 text-sm text-gray-200">
                    {comment.text}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
