/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import * as ROLES from '../constants/roles';
import { withFirebase } from '../../firebase';
import { Modal, Button } from "react-bootstrap";

import { withAuthorization, withAuthentication } from '../../Session';
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa';
import { deleteBlog, getSentBlogsToReview } from "../../redux/ActionCreators";
import { Table, Pagination, Popover, Whisper } from 'rsuite';
import {
	Form,
	InputGroup,
} from "react-bootstrap";
import { useEffect } from 'react';

const { Column, HeaderCell, Cell } = Table;
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
      <img src={rowData.postedBy?.photoURL} width="40" alt={rowData?.postedBy?.firstName + " " + rowData?.postedBy?.lastName } />
    </div>
        <p>
          <b>Name:</b> {rowData?.postedBy?.firstName + " " + rowData?.postedBy?.lastName }
        </p>
        <p>
          <b>Email:</b> {rowData?.postedBy?.email}
        </p>
      </Popover>
    );return (
        <Cell {...props}>
          <Whisper placement="top" speaker={speaker}>
            <a>{rowData?.postedBy?.firstName + " " + rowData?.postedBy?.lastName }</a>
          </Whisper>
        </Cell>
      );
    };
const ReviewBlogs = () => {

  const loading = useSelector((state) => state.loading.loading);
  const blogsList = useSelector(state => state.blogs.totalreviewedBlogs?.list);
  const [showDeleteModal, setShowDeleteModal ] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loadingTable, setLoading] = useState(false);
  const [blogs, setBlogs] = useState(blogsList)
  const dispatch = useDispatch();
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = useState('');

  useEffect(() =>{
    dispatch(getSentBlogsToReview());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(() => {
    setLoading(true);
    setBlogs(blogsList);
    setLoading(false);
  }, [blogsList, limit]);  
  const handleDeleteBlog = (blog) => {
    setSelectedBlog(blog)
    setShowDeleteModal(true);
  }
  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };
  const getData = () => {
    if (sortColumn && sortType) {
      return blogs?.sort((a, b) => {
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
        return blogs?.filter((v, i) => {
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
         setBlogs(blogsList?.filter((blog)=>
         blog?.title?.toLowerCase().includes(e.target.value?.toLowerCase()) ||
         blog?.postedBy?.firstName?.toLowerCase().includes(e.target.value?.toLowerCase()) ||
         blog?.postedBy?.lastName?.toLowerCase().includes(e.target.value?.toLowerCase())
      ));
        setTimeout(() => {
            setLoading(false)
        }, 500);
      }
      else{
        setBlogs(blogsList)
          
      }
    setSearch(e.target.value);
  }
  const handleSearch = (e) => {
    e.preventDefault();
    if(search?.length >0){
        setLoading(true);
        setBlogs(blogsList?.filter((blog)=>
            blog?.title?.toLowerCase().includes(e.target.value?.toLowerCase()) ||
            blog?.postedBy?.displayName?.toLowerCase().includes(e.target.value?.toLowerCase()) 
            // || blog?.tags?
         ));
                 setTimeout(() => {
            setLoading(false)
        }, 500);
    }
    else{
        setBlogs(blogsList)
    }
  }
  
    return (
      <div className='container mt-3'>
        <RemoveBlog dispatch={dispatch} blogId={selectedBlog?.id} showDeleteModal={showDeleteModal} hideDeleteModal={() => setShowDeleteModal(false)}/>
        <h2 className='mt-5 text-center mb-3'>Reviw Blogs List</h2>
        {loading && <div>Loading ...</div>}
        <div className='container-fluid row'>
						<div className='col-lg-6 m-auto'>
							<div className='form-group focused'>
                            <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search blog with title or author"
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
            <Table height={420} data={getData() } 
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            bordered
            cellBordered
            loadAnimation
            spellCheck           
            loading={loadingTable}>
                <Column width={50} align="center" fixed>
    <HeaderCell>#</HeaderCell>
    <Cell>
      {(rowData, rowIndex) => {
        return <div>{rowIndex + 1}</div>;
      }}
    </Cell>
  </Column>

        <Column fixed minWidth={100} sortable flexGrow>
          <HeaderCell>Title</HeaderCell>
          <Cell dataKey="title" />
        </Column>

        <Column flexGrow sortable >
          <HeaderCell>Trending</HeaderCell>
          <Cell dataKey="trending" />
        </Column>

        <Column flexGrow sortable >
          <HeaderCell>Category</HeaderCell>
          <Cell dataKey="category" />
        </Column>
        <Column flexGrow >
          <HeaderCell>Posted By</HeaderCell>
          <NameCell dataKey="postedBy">
          </NameCell>
        </Column>
        <Column flexGrow >
          <HeaderCell>Blog link</HeaderCell>
          <Cell>
            {
                rowData => (
                    <Link
                    
                    to={`/blog/view/review/${rowData?.id}`}
                    style={{ cursor: "pointer" }}>
                    {rowData.id}
                  </Link>
                )
            }
          </Cell>
        </Column>
        <Column width={150}>
          <HeaderCell>Actions</HeaderCell>
          <Cell>
            {
                rowData => (<>
                <Link to={`/blogs/edit/${rowData.id}`}>
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
                onClick={() => handleDeleteBlog(rowData)}
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
          total={blogs?.length}
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
const RemoveBlog = ({dispatch,blogId, showDeleteModal, hideDeleteModal}) => {
    const handleDelete = () =>{
        dispatch(deleteBlog(blogId))
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
            body
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
)(ReviewBlogs);
