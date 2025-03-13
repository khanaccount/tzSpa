import { useState } from "react";
import { useAppDispatch } from "hooks/redux";

interface Entity {
  id: number;
}

export const useEntityActions = <T extends Entity>(
  updateEntity: (entity: T) => any,
  deleteEntity: (id: number) => any
) => {
  const dispatch = useAppDispatch();
  const [editingEntity, setEditingEntity] = useState<T | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleEditClick = (entity: T) => {
    setEditingEntity(entity);
    setModalVisible(true);
  };

  const handleEditEntity = () => {
    if (editingEntity) {
      dispatch(updateEntity(editingEntity));
      setModalVisible(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    dispatch(deleteEntity(id));
  };

  return {
    editingEntity,
    setEditingEntity,
    isModalVisible,
    setModalVisible,
    handleEditClick,
    handleEditEntity,
    handleDeleteClick,
  };
};
