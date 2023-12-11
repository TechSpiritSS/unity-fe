'use client';
import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface SearchResult {
  objectID: string;
  title: string;
}

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Hacker News Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        placeholder="Search for posts..."
      />
      <button onClick={search}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {results.map((result) => (
          <li key={result.objectID}>
            <Link href={`/post/${result.objectID}`}>{result.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
