import { Button, Modal, Form, Input } from "antd";
import { useAddPost } from "hooks/useAddPost";

export const AddPostModal: React.FC = () => {
  const {
    isModalVisible,
    newPost,
    handleChange,
    handleAddPost,
    handleOpenModal,
    handleCloseModal,
  } = useAddPost();

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Добавить пост
      </Button>

      <Modal
        title="Добавить новый пост"
        open={isModalVisible}
        onCancel={handleCloseModal}
        onOk={handleAddPost}
      >
        <Form>
          <div>
            <label>Заголовок:</label>
            <Input
              name="title"
              value={newPost.title}
              onChange={handleChange}
              placeholder="Введите заголовок"
            />
          </div>
          <div>
            <label>Текст:</label>
            <Input.TextArea
              name="body"
              value={newPost.body}
              onChange={handleChange}
              placeholder="Введите текст поста"
            />
          </div>
        </Form>
      </Modal>
    </div>
  );
};
