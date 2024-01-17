import { Modal } from "@mui/material";
import React from "react";
import AddBoard from "./AddBoard";
import Delete from "./Delete";
import TileDetails from "./TileDetails";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import EditBoard from "./EditBoard";
import { useStoreVars } from "@/context/states";

const ModalContainer = () => {
  const {
    isAddBoardOpen,
    setIsAddBoardOpen,
    isEditBoardOpen,
    setIsEditBoardOpen,
    isDeleteBoardOpen,
    setIsDeleteBoardOpen,
    isDeleteTaskOpen,
    setIsDeleteTaskOpen,
    isAddTaskOpen,
    setIsAddTaskOpen,
    isEditTaskOpen,
    setIsEditTaskOpen,
    isTileDetailsOpen,
    setIsTileDetailsOpen,
  } = useStoreVars();

  return (
    <>
      <Modal
        open={isAddBoardOpen}
        onClose={() => setIsAddBoardOpen(false)}
        aria-labelledby="add-board"
        aria-describedby="modal-add-board"
      >
        <AddBoard />
      </Modal>

      <Modal
        open={isEditBoardOpen}
        onClose={() => setIsEditBoardOpen(false)}
        aria-labelledby="edit-board"
        aria-describedby="modal-edit-board"
      >
        <EditBoard />
      </Modal>

      <Modal
        open={isDeleteBoardOpen}
        onClose={() => setIsDeleteBoardOpen(false)}
        aria-labelledby="delete-board"
        aria-describedby="modal-delete-board"
      >
        <Delete type="Board" />
      </Modal>

      <Modal
        open={isDeleteTaskOpen}
        onClose={() => setIsDeleteTaskOpen(false)}
        aria-labelledby="delete-task"
        aria-describedby="modal-delete-task"
      >
        <Delete type="Task" />
      </Modal>

      <Modal
        open={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        aria-labelledby="add-task"
        aria-describedby="modal-add-task"
      >
        <AddTask />
      </Modal>

      <Modal
        open={isEditTaskOpen}
        onClose={() => setIsEditTaskOpen(false)}
        aria-labelledby="edit-task"
        aria-describedby="modal-edit-task"
      >
        <EditTask />
      </Modal>

      <Modal
        open={isTileDetailsOpen}
        onClose={() => setIsTileDetailsOpen(false)}
        aria-labelledby="tile-details"
        aria-describedby="modal-tile-details"
      >
        <TileDetails />
      </Modal>
    </>
  );
};

export default ModalContainer;
