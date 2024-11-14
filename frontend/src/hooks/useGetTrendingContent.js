import { useEffect, useState } from "react"
import { useContentStore } from "../../store/content";
import axios from "axios";


const useGetTrendingContent = () => {
  const [trendingContent ,setTrendingContent] = useState(null);
  const {contentType} = useContentStore();

  useEffect(()=>{
    const fetchTrendingContent = async () => {
        try {
          const response = await axios.get(`/api/v1/${contentType}/trending`);
          setTrendingContent(response.data.content);
        } catch (error) {
          console.error('Error fetching trending content: ' ,error);
        }
    } 
    fetchTrendingContent();
  }, [contentType]);

  return {trendingContent}
};

export default useGetTrendingContent;