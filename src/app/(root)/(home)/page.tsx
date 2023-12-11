'use client';
import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import axios from 'axios';
import PageHeader from '@/components/PageHeader';
import SearchBar from '@/components/Searchbar';
import Loader from '@/components/Loader';
import { Result } from 'postcss';
import Results from '@/components/Results';

interface SearchResult {
  objectID: string;
  title: string;
  created_at: string;
  num_comments: string;
  author: string;
  points: string;
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Hacker News Search" />

      <SearchBar input={query} setInput={setQuery} onClick={search} />

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
