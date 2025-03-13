import { useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { addPost } from "store/slices/postsSlice";
import { Post } from "interface/index";
import toast from "react-hot-toast";

export const useAddPost = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newPost, setNewPost] = useState<Post>({ id: 0, title: "", body: "", userId: 1 });
  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => state.posts.posts);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPost = () => {
    if (!newPost.title || !newPost.body) {
      toast.error("Пожалуйста, заполните все поля!");
      return;
    }

    const maxId = posts.length > 0 ? Math.max(...posts.map((post) => post.id)) : 0;
    const newPostWithId = { ...newPost, id: maxId + 1 };

    dispatch(addPost(newPostWithId));

    toast.success("Пост успешно добавлен!");

    setIsModalVisible(false);
    setNewPost({ id: 0, title: "", body: "", userId: 1 });
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setNewPost({ id: 0, title: "", body: "", userId: 1 });
  };

  return {
    isModalVisible,
    newPost,
    handleChange,
    handleAddPost,
    handleOpenModal,
    handleCloseModal,
  };
};
