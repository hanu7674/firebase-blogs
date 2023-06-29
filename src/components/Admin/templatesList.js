/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import * as ROLES from '../constants/roles';
import { withFirebase } from '../../firebase';
import { withAuthorization, withAuthentication } from '../../Session';
import { Table, Pagination, Popover, Whisper, Button,Modal } from 'rsuite';
import {
	Form,
	InputGroup,
} from "react-bootstrap";
import { useState } from 'react';
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa';
import { useEffect } from 'react';
import { deleteTemplate, getTemplates, getUserData } from '../../redux/ActionCreators';
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
const TemplatesList = () => {
  const [showDeleteModal, setShowDeleteModal ] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loadingTable, setLoading] = useState(false);
  const templates = useSelector((state) => state.templates.templates);
  const [templatesData, setTemplatesData] = useState(templates)
  const dispatch = useDispatch();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = useState('');

  useEffect(() =>{
    dispatch(getTemplates());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const handleDeleteTemplate = (template) => {
    setSelectedTemplateId(template?.id)
    setShowDeleteModal(true);
  }
  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };
  const getData = () => {
    if (sortColumn && sortType) {
      return templatesData?.sort((a, b) => {
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
        return templatesData?.filter((v, i) => {
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
         setTemplatesData(templates?.filter((template)=>
         template?.id?.toLowerCase().includes(e.target.value?.toLowerCase()) ||
         template?.postedBy?.firstName?.toLowerCase().includes(e.target.value?.toLowerCase()) ||
         template?.postedBy?.lastName?.toLowerCase().includes(e.target.value?.toLowerCase()) ||
         template?.postedBy?.email?.toLowerCase().includes(e.target.value?.toLowerCase()) 
      ));
        setTimeout(() => {
            setLoading(false)
        }, 500);
      }
      else{
        setTemplatesData(templates)
          
      }
    setSearch(e.target.value);
  }
  const handleSearch = (e) => {
    e.preventDefault();
    if(search?.length >0){
        setLoading(true);
        setTemplatesData(templates?.filter((template)=>
        template?.id?.toLowerCase().includes(e.target.value?.toLowerCase()) ||
        template?.postedBy?.firstName?.toLowerCase().includes(e.target.value?.toLowerCase()) ||
        template?.postedBy?.lastName?.toLowerCase().includes(e.target.value?.toLowerCase()) ||
        template?.postedBy?.email?.toLowerCase().includes(e.target.value?.toLowerCase()) 
     ));
                 setTimeout(() => {
            setLoading(false)
        }, 500);
    }
    else{
      setTemplatesData(templates)
    }
  }
    return (
      <div className='container mt-3'>
        <RemoveTemplate dispatch={dispatch} templateId={selectedTemplateId} showDeleteModal={showDeleteModal} hideDeleteModal={() => setShowDeleteModal(false)}/>
        <h2 className='mt-5 text-center mb-3'>Templates List</h2>
        <div className='container-fluid row'>
						<div className='col-lg-6 m-auto'>
							<div className='form-group focused'>
                            <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search user with template name or userId"
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
  <Column  fixed flexGrow sortable>
          <HeaderCell>Name</HeaderCell>
          <Cell  dataKey="name"/>
        </Column>
        <ColumnGroup header="Posted By" align="center">
        <Column flexGrow colSpan={2}>
          <HeaderCell>First Name</HeaderCell>
          <Cell >
            {
                rowData => rowData?.postedBy?.firstName
            }
            </Cell>
        </Column>
        <Column flexGrow>
          <HeaderCell>Last Name</HeaderCell>
          <Cell >
            {
                rowData => rowData?.postedBy?.lastName
            }
            </Cell>        
            </Column>
      </ColumnGroup>
        <Column flexGrow>
          <HeaderCell>Template link</HeaderCell>
          <Cell>
            {
                rowData => (
                    <Link
                    to={`/templates/view?id=${rowData?.id}`}
                    style={{ cursor: "pointer" }}>
                    {rowData.id}
                  </Link>
                )
            }
          </Cell>
        </Column>
        <Column width={100}>
          <HeaderCell>Actions</HeaderCell>
          <Cell>
            {
                rowData => (<>
                <Link to={`/templates/edit?id=${rowData.id}`}>
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
                onClick={() => handleDeleteTemplate(rowData)}
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
          total={templates?.length}
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
const RemoveTemplate = ({dispatch,templateId, showDeleteModal, hideDeleteModal}) => {
  const handleDelete = () =>{
      dispatch(deleteTemplate(templateId))
      hideDeleteModal()
  }
  const cancelDeleteTemplate = () => {
    hideDeleteModal();
  };
   return (
      <>
      <Modal open={showDeleteModal} onClose={hideDeleteModal} className='mt-5 pt-5' backdrop="static" role="alertdialog"            >
        <Modal.Header>
          Confirm Delete
        </Modal.Header>
        <Modal.Body>
          Are you sure want to delete this template ?
        </Modal.Body>
        <Modal.Footer>
        <Button
            onClick={handleDelete}
            appearance="primary"
            color="red"
          >
            Delete
          </Button>
          <Button onClick={cancelDeleteTemplate} appearance="subtle">
            Cancel
          </Button>
          </Modal.Footer>
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
)(TemplatesList);
