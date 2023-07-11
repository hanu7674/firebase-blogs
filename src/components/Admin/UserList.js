/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import * as ROLES from '../constants/roles';
import { withFirebase } from '../../firebase';
import { withAuthorization, withAuthentication } from '../../Session';
import { Button, Modal } from 'react-bootstrap';
import { Table, Pagination, Popover, Whisper } from 'rsuite';
import {
	Form,
	InputGroup,
} from "react-bootstrap";
import { useState } from 'react';
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa';
import { useEffect } from 'react';
import { getUserData } from '../../redux/ActionCreators';
const { Column, HeaderCell, Cell, ColumnGroup } = Table;

const NameCell = ({ rowData, dataKey, ...props }) => {
  const speaker = (
    <Popover title="Description">
      <div
    style={{
      width: 40,
      height: 40,
      background: '#f5f5f5',
      borderRadius: 6,
      marginTop: 2,
      overflow: 'hidden',
      display: 'inline-block'
    }}
  >
    <img src={rowData?.photoURL} width="40" alt={rowData?.displayName} />
  </div>
      <p>
        <b>Name:</b> {rowData?.firstName + ' ' + rowData?.lastName}
      </p>
      <p>
        <b>Email:</b> {rowData?.email}
      </p>
    </Popover>
  );return (
      <Cell {...props}>
        <Whisper placement="top" speaker={speaker}>
          <a>{rowData?.email}</a>
        </Whisper>
      </Cell>
    );
  };
const UserList = () => {
  const authUser = useSelector(state => state.authState?.user);

  const [showDeleteModal, setShowDeleteModal ] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loadingTable, setLoading] = useState(false);
  const users = useSelector((state) => state.userState.users);
  const [usersData, setUsersData] = useState(users)
  const dispatch = useDispatch();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if(authUser?.id){
            dispatch(getUserData())
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  const handleDeleteUser = (user) => {
    setSelectedUser(user)
    setShowDeleteModal(true);
  }
  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };
  const getData = () => {
    if (sortColumn && sortType) {
      return usersData?.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    else{
        return usersData?.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    })}
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };
  const handleChange = (e) =>{
    e.preventDefault();
    if(e.target.value){
         setLoading(true);
         setUsersData(users?.filter((user)=>
         user?.id?.toLowerCase().includes(e.target.value?.toLowerCase()) ||
         user?.firstName?.toLowerCase().includes(e.target.value?.toLowerCase()) ||
         user?.lastName?.toLowerCase().includes(e.target.value?.toLowerCase()) ||
         user?.email?.toLowerCase().includes(e.target.value?.toLowerCase()) 
      ));
        setTimeout(() => {
            setLoading(false)
        }, 500);
      }
      else{
        setUsersData(users)
          
      }
    setSearch(e.target.value);
  }
  const handleSearch = (e) => {
    e.preventDefault();
    if(search?.length >0){
        setLoading(true);
        setUsersData(users?.filter((user)=>
         user?.id?.toLowerCase().includes(e.target.value?.toLowerCase()) ||
         user?.firstName?.toLowerCase().includes(e.target.value?.toLowerCase()) ||
         user?.lasttName?.toLowerCase().includes(e.target.value?.toLowerCase()) ||
         user?.email?.toLowerCase().includes(e.target.value?.toLowerCase()) 
      ));
                 setTimeout(() => {
            setLoading(false)
        }, 500);
    }
    else{
      setUsersData(users)
    }
  }
    return (
      <div className='container mt-3'>
        <RemoveUser dispatch={dispatch} user={selectedUser} showDeleteModal={showDeleteModal} hideDeleteModal={() => setShowDeleteModal(false)}/>
        <h2 className='mt-5 text-center mb-3'>Users List</h2>
        <div className='container-fluid row'>
						<div className='col-lg-6 m-auto'>
							<div className='form-group focused'>
                            <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search user with Name, Email and UserId"
          value={search}
          onChange={handleChange}
          className="form-control search-input"
          aria-label="Search blog"
          aria-describedby="basic-addon2"
        />
        <Button className="btn btn-secondary search-btn" id="button-addon2" 
        onClick={handleSearch}
        >
        <FaSearch/>

        </Button>
      </InputGroup>
							</div>
						</div>
						
				</div>
            <Table height={420} headerHeight={80} data={getData() } 
            sortColumn={sortColumn}
            bordered cellBordered
            sortType={sortType}
            onSortColumn={handleSortColumn}
            loading={loadingTable}>
              <Column width={50} align="center" fixed>
    <HeaderCell>#</HeaderCell>
    <Cell>
      {(rowData, rowIndex) => {
        return <div>{rowIndex + 1}</div>;
      }}
    </Cell>
  </Column>
  <Column  fixed  flexGrow={1}  sortable>
          <HeaderCell>Email</HeaderCell>
          <NameCell  dataKey="email">
            {rowData => 
                rowData?.email
            }   
          </NameCell>
        </Column>
        <ColumnGroup header="Name"  align="center">
        <Column flexGrow={2}  colSpan={2}>
          <HeaderCell>First Name</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>
        <Column flexGrow={2}>
          <HeaderCell>Last Name</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>
      </ColumnGroup>
        <Column  flexGrow={3} align="center">
          <HeaderCell>Profile link</HeaderCell>
          <Cell>
            {
                rowData => (
                    <Link
                    to={`/user/profile/${rowData?.id}`}
                    style={{ cursor: "pointer" }}>
                    {rowData.id}
                  </Link>
                )
            }
          </Cell>
        </Column>
    <Column flexGrow={1}>
          <HeaderCell>Actions</HeaderCell>
          <Cell>
            {
                rowData => (<>
                <Link to={`/user/profile/${rowData.id}`}>
                <FaEdit
                className="fa-edit"
                name="edit"
                size={15}
                style={{ margin: "10px", cursor: "pointer" }}
                />
              </Link>
          <FaTrash
                name="trash"
                className="fa-trash"
                style={{ margin: "10px", cursor: "pointer" }}
                onClick={() => handleDeleteUser(rowData)}
              />
              
              </>
              )
            }
          </Cell>
        </Column>
      </Table>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={['total', '-', 'limit', '|', 'pager', 'skip']}
          total={usersData?.length}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
      </div>
    );

}
const RemoveUser = ({dispatch,user, showDeleteModal, hideDeleteModal}) => {
  const handleDelete = () =>{
      // dispatch(delete(blogId))
      hideDeleteModal()
  }
   return (
      <>
      <Modal show={showDeleteModal} backdrop="static" keyboard="false" animation autoFocus ={true}
            data-aos="fade-up" centered
            >
        <Modal.Header closeButton onHide={hideDeleteModal}>
          Are you sure want to delete this blog
        </Modal.Header>
        <Modal.Body>
          Are you sure want to delete this user linked with : {user? user?.email : null}
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button kind="secondary" className="mr-2" onClick={hideDeleteModal}>Cancel</Button>
            <Button kind="secondary" onClick={handleDelete}>Confirm</Button>
        </div></Modal.Footer>
      </Modal>
      </>
   )
}
const mapStateToProps = state => ({
  users: state.userState.users
});

const condition = (authUser) =>
  authUser && !!authUser.roles[ROLES.ADMIN];


export default compose(
  withFirebase,
  withAuthentication,
  withAuthorization(condition),
  connect(
    mapStateToProps,
  ),
)(UserList);
