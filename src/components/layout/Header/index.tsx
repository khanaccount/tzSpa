import { Link } from "react-router";
import { Input, AutoComplete } from "antd";
import { useSearch } from "hooks/index";
import { AddPostModal } from "components/AddPostModal";

import s from "./index.module.scss";

export const Header: React.FC = () => {
  const { searchTerm, searchResults, handleSearchChange } = useSearch();

  const options = searchResults.map((result) => ({
    value: result.title,
    label: (
      <Link to={`/posts/${result.id}/comments`} key={result.id}>
        <div>{result.title}</div>
        <div style={{ color: "#888" }}>{result.body}</div>
      </Link>
    ),
  }));

  return (
    <div className={`${s.container} container`}>
      <Link to={"/"} className={s.logo}>
        SPA
      </Link>

      <AutoComplete options={options} className={s.autoCompete} onChange={handleSearchChange}>
        <Input placeholder="Поиск постов" value={searchTerm} />
      </AutoComplete>

      <AddPostModal />
      <Link to={"/"} className={s.logo}>
        SPA
      </Link>
    </div>
  );
};
