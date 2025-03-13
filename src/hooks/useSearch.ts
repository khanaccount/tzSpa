import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const posts = useSelector((state: RootState) => state.posts.posts);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const searchResults = posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toString().includes(searchTerm)
    )
    .reverse();

  return {
    searchTerm,
    searchResults,
    handleSearchChange,
  };
};
