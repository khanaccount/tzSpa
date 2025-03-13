import { Pagination, Spin, Alert, Modal, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { usePagination, useEntityActions, useFetchData } from "hooks/index";
import { updatePost, deletePost, fetchPosts } from "store/slices/postsSlice";
import { Link } from "react-router";
import { Post } from "interface/index";
import { selectPosts } from "store/selectors";

import s from "./index.module.scss";

export const Posts: React.FC = () => {
  const { data: posts, loading, error } = useFetchData<Post>(selectPosts, fetchPosts);
  const { currentPage, goToPage, paginatedItems, totalPages } = usePagination<Post>(posts.length);
  const {
    editingEntity: editingPost,
    setEditingEntity: setEditingPost,
    isModalVisible,
    setModalVisible,
    handleEditClick,
    handleEditEntity: handleEditPost,
    handleDeleteClick,
  } = useEntityActions(updatePost, deletePost);

  if (loading) {
    return (
      <div className={s.loadingContainer} data-testid="loading">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} type="error" className={s.errorAlert} />;
  }

  if (!posts.length) {
    return <Alert message="Нет доступных постов" type="info" className={s.infoAlert} />;
  }

  return (
    <div className={`container ${s.container}`}>
      <h1 className={s.title}>Список постов</h1>
      <ul className={s.postList}>
        {paginatedItems([...posts].reverse()).map((post) => (
          <div key={post.id} className={s.postItem}>
            <Link className={s.postLink} to={`/posts/${post.id}/comments`}>
              <h2 className={s.postTitle}>{post.title}</h2>
              <p className={s.postBody}>{post.body}</p>
            </Link>
            <div className={s.postActions}>
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEditClick(post)}
                className={s.editButton}
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteClick(post.id)}
                className={s.deleteButton}
              />
            </div>
          </div>
        ))}
      </ul>

      <Pagination
        current={currentPage}
        showSizeChanger={false}
        total={totalPages * 10}
        pageSize={10}
        onChange={goToPage}
        className={s.pagination}
      />

      {editingPost && (
        <Modal
          title="Редактировать пост"
          open={isModalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={handleEditPost}
        >
          <form className={s.modalForm}>
            <div className={s.modalGroup}>
              <label className={s.modalLabel}>Заголовок:</label>
              <input
                type="text"
                className={s.modalInput}
                value={editingPost.title}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
              />
            </div>
            <div className={s.modalGroup}>
              <label className={s.modalLabel}>Текст:</label>
              <textarea
                className={s.modalTextarea}
                value={editingPost.body}
                onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
