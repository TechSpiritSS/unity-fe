'use client';
import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import SearchBar from '@/components/Searchbar';
import Loader from '@/components/Loader';
import Results from '@/components/Results';
import debounce from '@/utils/debounce';
import Error from '@/components/Error';

interface SearchResult {
  objectID: string;
  title: string;
  created_at: string;
  num_comments: string;
  author: string;
  points: string;
}

const CACHE_KEY = 'searchResults';

export default function Home() {
  const [query, setQuery] = useState<string>(
    typeof window !== 'undefined' ? localStorage.getItem('search') || '' : ''
  );
  const [results, setResults] = useState<SearchResult[]>(
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem(CACHE_KEY) || '[]')
      : []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );

      const newResults = response.data.hits;

      setResults(newResults);
      if (typeof window !== 'undefined') {
        localStorage.setItem(CACHE_KEY, JSON.stringify(newResults));

        if (query.trim() !== '') {
          localStorage.setItem('search', query);
        } else {
          localStorage.removeItem('search');
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(search, 300);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    debouncedSearch();
  };

  return (
    <div>
      <SearchBar input={query} onChange={handleInputChange} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : results.length ? (
        <Results results={results} />
      ) : (
        <Error message="No results found" />
      )}
    </div>
  );
}
