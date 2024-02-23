import React, { useState, useEffect } from 'react';
import ListingPage from '@/components/lisitng'; 
import axios from 'axios';
import { useRouter } from 'next/router';

const Index = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const router = useRouter();
  const query = router.query.query;

  const loadMoreData = async () => {
    if (loading || !hasMoreData) return;

    setLoading(true);

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}posts?search=${query}&per_page=10&page=${page + 1}&_embed`);
      const newData = response.data;

      if (newData.length > 0) {
        setData((prevData) => [...prevData, ...newData]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      console.error("Error while fetching more data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData(initialData);
    setPage(1);
    setLoading(false);
    setHasMoreData(true);
  }, [initialData]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !loading
      ) {
        if (hasMoreData) {
          loadMoreData();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, loading, hasMoreData]);

  useEffect(() => {
    // Fetch initial data when the query changes
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}posts?search=${query}&per_page=10&_embed`);
        const newData = response.data;

        if (newData.length > 0) {
          setData(newData);
          setPage(1);
          setLoading(false);
          setHasMoreData(true);
        } else {
          setHasMoreData(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function
    };
  }, [query]);

  return (
    <>
      {data && data.length ? (
        <ListingPage newdata={data} />
      ) : (
        <h2>No data found</h2>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const query = context.query.query || '';
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (query) {
      const response = await axios.get(`${apiUrl}posts?search=${query}&per_page=10&_embed`);
      const initialData = response.data;

      if (initialData.length > 0) {
        return { props: { initialData } };
      }
    }
  } catch (err) {
    console.error('Something went wrong while fetching the data', err);
  }

  return { props: { data: [] } };
}

export default Index;
