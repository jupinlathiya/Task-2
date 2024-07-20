import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteUser, fetchAllUsers } from "../../actions/userActions";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Button } from "react-bootstrap";
import moment from "moment";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation();
  const { users, loading, error } = useSelector((state) => state.getUsers);
  
  console.log("location", location)
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch,location]);

  // Define columns for the table
  const columns = [
    {
      dataField: "_id",
      text: "ID",
      hidden: true, // Hides the ID column
    },
    {
      dataField: "firstname",
      text: "First Name",
    },
    {
      dataField: "lastname",
      text: "Last Name",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "age",
      text: "Age",
    },
    {
      dataField: "dateOfBirth",
      text: "Date of Birth",
      formatter : (cellContent)=>{
        return moment(cellContent).format('DD-MM-YYYY')
      }
    },
    {
      dataField: "occupation",
      text: "Occupation",
    },
    {
      dataField: "mobileNo",
      text: "Mobile No",
    },
    {
      dataField: 'edit',
      text: 'Edit',
      formatter: (cellContent, row) => (
        <Button
          variant="warning"
          onClick={() => handleEditUser(row._id)}
        >
          Edit
        </Button>
      ),
    },
    {
      dataField: 'delete',
      text: 'Delete',
      formatter: (cellContent, row) => (
        <Button
          variant="danger"
          onClick={() => handleDeleteUser(row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  // Define pagination options
  const options = {
    page: 1,
    sizePerPage: 10,
    lastPageText: "Last",
    firstPageText: "First",
    nextPageText: "Next",
    prePageText: "Previous",
    hideSizePerPage: true,
    totalSize: users.length
  };

  const handleAddUser = () => {
    navigate('/userForm');
  };

  const handleEditUser = (userId) => {
    navigate(`/userForm?userId=${userId}`);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <div className="container mt-4">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Button
        variant="primary"
        onClick={handleAddUser}
        className="mb-3"
      >
        Add User
      </Button>
      <BootstrapTable
        keyField="_id"
        data={users || {}}
        columns={columns}
        pagination={paginationFactory(options)}
        bootstrap4
        striped
        hover
        condensed
      />
    </div>
  );
};

export default Home;
