import { useState } from "react";
import { useEffect } from "react";

export function usePost(){
  const [post, setPost] = useState({});

  async function getPosts(){
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const json = await response.json();
    setPost(json);
  }

  useEffect(() => {
    getPosts();
  }, [])

  return {
    post: post
  }
}

export function useFetch(url){
    const[ finalData, setFinalData] = useState({});
    const[loading, setLoading] = useState(true);

    async function getData(){
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json()
        setFinalData(json)
        setLoading(false);
    }

    useEffect(() => {
        getData()
    }, [url])

    return {
        finalData,
        loading
    }
}