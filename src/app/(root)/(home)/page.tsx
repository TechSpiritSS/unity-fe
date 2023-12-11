'use client';
import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import PageHeader from '@/components/PageHeader';
import SearchBar from '@/components/Searchbar';
import Loader from '@/components/Loader';
import Results from '@/components/Results';

interface SearchResult {
  objectID: string;
  title: string;
  created_at: string;
  num_comments: string;
  author: string;
  points: string;
}

const debounce = (func: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: any) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const CACHE_KEY = 'searchResults';

export default function Home() {
  const [query, setQuery] = useState<string>(
    localStorage.getItem('search') || ''
  );
  const [results, setResults] = useState<SearchResult[]>(
    JSON.parse(localStorage.getItem(CACHE_KEY) || '[]')
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
      localStorage.setItem(CACHE_KEY, JSON.stringify(newResults));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      if (query.trim() !== '') {
        localStorage.setItem('search', query);
      } else {
        localStorage.removeItem('search');
      }
    }
  };

  const debouncedSearch = debounce(search, 300);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    debouncedSearch();
  };

  return (
    <div>
      <PageHeader title="Hacker News Search" />

      <SearchBar input={query} onChange={handleInputChange} />

      {loading ? (
        <Loader />
      ) : error ? (
        <p>Error: {error}</p>
      ) : results.length ? (
        <Results results={results} />
      ) : (
        <p>No results</p>
      )}
    </div>
  );
}
