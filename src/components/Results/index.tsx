import timeAsDate from '@/utils/timeAsDate';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ResultProps {
  results: {
    objectID: string;
    title: string;
    created_at: string;
    num_comments: string;
    author: string;
    points: string;
  }[];
}

export default function Results({ results }: ResultProps) {
  return (
    <ul className="divide-y divide-gray-200">
      {results.map((result) => (
        <li
          key={result.objectID}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 sm:py-4"
        >
          <div className="w-full sm:w-3/4">
            <h3 className="text-lg font-semibold text-gray-100 mb-1">
              <Link
                href={`/post/${result.objectID}`}
                className="hover:text-blue-400 hover:underline transition duration-500 ease-in-out cursor-pointer"
              >
                {result.title}
              </Link>
            </h3>
            <div className="flex items-center gap-x-2 text-sm text-gray-200 mt-1">
              <p className="text-blue-400">{result.author}</p>
              <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              <p className="text-green-400">{timeAsDate(result.created_at)}</p>
            </div>
          </div>
          <div className="flex items-center gap-x-2.5 mt-3 sm:mt-0">
            <ChatBubbleLeftIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <p className="text-sm text-gray-400">
              {result.num_comments} comments
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
