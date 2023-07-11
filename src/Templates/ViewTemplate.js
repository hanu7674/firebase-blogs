import React, { useEffect, useState } from "react";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { useLocation } from "react-router-dom";
import { getDoc } from "firebase/firestore";
import { deleteTemplate, getTemplate, templateDocRef } from "../redux/ActionCreators";
import { Button, Loader, Modal } from "rsuite";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { excerpt } from "../components/Blogs/utility";
import Timestamp from "react-timestamp";
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function ViewTemplate () {
  let query = useQuery();
  const template = useSelector(state => state.templates.template);
  const loading = useSelector(state => state.templates.loading);
  const [deleteTemplateId, setDeleteTemplateId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  let templateId = query.get("id");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemplate(templateId))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[templateId])
  const handleEditTemplate = (templateId) => {
    // Redirect to a new tab or window to edit the template
    window.open(`/templates/edit?id=${templateId}`, "_blank");
  };

  const handleDeleteTemplate = (templateId) => {
    setDeleteTemplateId(templateId);
    setShowDeleteConfirmation(true);
  };

  // Confirm delete template
  const confirmDeleteTemplate = () => {
    // Dispatch delete action or perform API call to delete the template
    dispatch(deleteTemplate(deleteTemplateId));
    setShowDeleteConfirmation(false);
  };

  // Cancel delete template
  const cancelDeleteTemplate = () => {
    setDeleteTemplateId(null);
    setShowDeleteConfirmation(false);
  };
  return (
    <>
    {
        loading ? <Loader/> : <div className="mt-5 container " >
              {template && template.html ? 
              <div 
              style={{ minHeight: "100vh"}}
              >
                <Modal className="mt-5 pt-5" open={showDeleteConfirmation} onClose={cancelDeleteTemplate}>
        <Modal.Header>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this template?
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={confirmDeleteTemplate}
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
                <div className="d-flex justify-content-between m-3">
                <div className="justify-content-left align-items-left align-content-left justify-content-space-between">
                  <span className="heading-small text-muted">Title: </span><span className="heading-medium text-muted text-capitalize">{ excerpt(template.name , 50)}</span>
                  <div><span className="heading-small text-muted">Author : </span><span className="heading-medium text-muted text-capitalize">{template?.postedBy?.firstName + " " + template?.postedBy?.lastName}</span></div>
                  <div><span className="heading-small text-muted">Created At : </span><span className="heading-medium text-muted text-capitalize">
                  <Timestamp relative date={template?.timestamp?.toDate().toString()} autoUpdate /></span>
                  </div>
                </div>
                <div className="justify-content-right align-items-right align-content-right justify-content-space-between">
                <Button className="m-2" appearance='ghost' color="violet" onClick={() => handleEditTemplate(template.id)}>Edit</Button>
        <Button className="m-2" appearance='ghost' color="violet" onClick={() => handleDeleteTemplate(template.id)}>Delete</Button>

                </div>
                </div>
        <iframe
                        loading="eager"
                        id="template-iframe"
                        srcDoc={template.html}
                        title={template?.name}
                        sandbox="allow-scripts"
                        className="iframe-template"
                      />
                      
        <span>Print</span></div>
       : (
        <>Not found </>
      )}</div>
    }

    </>
  );
}

const condition = (authUser) => authUser;

export default compose(
  withAuthorization(condition),
)(ViewTemplate);
