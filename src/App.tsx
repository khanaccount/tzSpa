import React from "react";
import { Routes, Route } from "react-router";

import { Layout } from "components/layout";
import { Home } from "pages/HomePage";
import { PostDetail } from "components/PostDetail";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/posts/:id/comments" element={<PostDetail />} />
      </Route>
    </Routes>
  );
};

export default App;
