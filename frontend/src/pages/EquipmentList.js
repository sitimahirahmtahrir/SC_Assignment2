import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Pagination } from "react-bootstrap";
import ListingEquipment from "../components/ListingEquipment";
import { connect } from "react-redux";
import { getAllEquipment, deleteEquipment } from "../actions/equipment";

const EquipmentList = ({ equipments, getAllEquipment, deleteEquipment }) => {
  const [deleteId, setDeleteId] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    getAllEquipment();
    console.log(equipments);
  }, [getAllEquipment]);

  const onDelete = (equipmentId) => {
    setDeleteId(equipmentId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    await deleteEquipment(deleteId);

    cancelDelete();
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeleteId("");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(equipments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = equipments.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="main-content">
      <div className="header-img">
        <h1>List of Equipments</h1>
      </div>
      <div className="listing-container d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between mb-3 w-100">
            <Link to="/add-equipment">
              <Button variant="dark">Add Equipment</Button>
            </Link>
          </div>
          <ListingEquipment items={currentItems} onDelete={onDelete} />
        </div>
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
        <Modal show={showDeleteConfirmation} onHide={cancelDelete}>
          <Modal.Header>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="outline-danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  equipments: state.equipment,
});

export default connect(mapStateToProps, { getAllEquipment, deleteEquipment })(
  EquipmentList
);
