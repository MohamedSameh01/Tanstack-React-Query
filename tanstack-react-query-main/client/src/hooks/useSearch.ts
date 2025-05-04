import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IPost } from "../Types";



const getPostsBySearch = async (searchQuery: string): Promise<IPost[]> => {
    const result = await axios.get<IPost[]>(`http://localhost:3300/posts?q=${searchQuery}`);
    return result.data;
}


const useSearch = (searchQuery: string): UseQueryResult<IPost[]> => {
    const query = useQuery({
        queryKey: ["posts", { searchQuery }],
        queryFn: () => getPostsBySearch(searchQuery),
        staleTime: 1000 * 60*5,
        enabled: searchQuery.length>0,
         // Only run the query if searchQuery is not empty
    });

    return query;
}

export default useSearch;