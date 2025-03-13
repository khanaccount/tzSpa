import { useParams } from "react-router";
import { Button, Spin, Alert, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEntityActions, useFetchData } from "hooks/index";
import { updateComment, deleteComment, fetchCommentsByPostId } from "store/slices/commentSlice";
import { selectComments } from "store/selectors";
import { Comment } from "interface/index";

import s from "./index.module.scss";

export const PostDetail: React.FC = () => {
  const { id } = useParams();
  const postId = Number(id);

  const {
    data: comments,
    loading,
    error,
  } = useFetchData<Comment>(selectComments, () => fetchCommentsByPostId(postId));
  const {
    editingEntity: editingComment,
    setEditingEntity: setEditingComment,
    isModalVisible,
    setModalVisible,
    handleEditClick,
    handleEditEntity: handleEditComment,
    handleDeleteClick,
  } = useEntityActions(updateComment, deleteComment);

  if (loading) {
    return (
      <div className={s.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} type="error" className={s.errorAlert} />;
  }

  return (
    <div className={`${s.container} container`}>
      <h3 className={s.title}>Комментарии:</h3>
      {comments.length === 0 && (
        <Alert message="Нет комментариев для этого поста" type="info" className={s.errorAlert} />
      )}
      <ul className={s.commentsList}>
        {comments.map((comment) => (
          <li key={comment.id} className={s.commentItem}>
            <div>
              <div className={s.commentEmail}>{comment.email}</div>
              <div className={s.commentBody}>{comment.body}</div>
            </div>
            <div className={s.commentActions}>
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEditClick(comment)}
                className={s.editButton}
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteClick(comment.id)}
                className={s.deleteButton}
              />
            </div>
          </li>
        ))}
      </ul>

      {editingComment && (
        <Modal
          title="Редактировать комментарий"
          open={isModalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={handleEditComment}
        >
          <form className={s.modalForm}>
            <div className={s.modalGroup}>
              <label className={s.modalLabel}>Комментарий:</label>
              <Input.TextArea
                className={s.modalTextarea}
                value={editingComment.body}
                onChange={(e) => setEditingComment({ ...editingComment, body: e.target.value })}
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
