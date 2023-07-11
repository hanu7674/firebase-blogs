import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTemplate, getTemplates, getTemplatesforAdmin } from "../redux/ActionCreators";
import { withFirebase } from "../firebase";
import { withAuthentication, withAuthorization } from "../Session";
import { compose } from "recompose";
import { excerpt } from "../components/Blogs/utility";
import { Button, Modal } from "rsuite";
import { useNavigate } from "react-router";
import {NEW_TEMPLATE } from "../Routers/routes";
import Loading from "../components/Loading/loading";
// import { Modal } from "react-bootstrap";
const Templates = () => {
  const templates = useSelector((state) => state.templates?.templates);
  const authUser = useSelector((state) => state.authState?.user);
  const [loading, setLoading] = useState(true);
  const [deleteTemplateId, setDeleteTemplateId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if(authUser?.roles?.["ADMIN"])
    {
        dispatch(getTemplatesforAdmin())
    setLoading(false)
    }
    else{
        dispatch(getTemplates());
       setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);
  const handleViewTemplate = (templateId) => {
    // Redirect to a new tab or window to view the template
    window.open(`/templates/view?id=${templateId}`, "_blank");
  };

  // Edit a template
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

  const createTemplate = () => {
    // Redirect to a new tab or window to view the template
    navigate(NEW_TEMPLATE)
  };
  return (

    <>
      <div className="mt-5">
        <div className="container">
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
      
      <div className="d-flex justify-content-between m-3 border-bottom">
                <div className="justify-content-left align-items-left align-content-left justify-content-space-between">
                  <span className="heading-small fs-2 text-muted">Templates </span>
                  </div>
                <div className="justify-content-right align-items-right align-content-right justify-content-space-between">
                <Button  className="m-2" appearance='ghost' color="violet"  onClick={createTemplate}>Create Template</Button>   
                </div>
                </div>
                {
    loading ? <div style={{height: '100vh'}}><Loading/></div> : 
          <div className="row me-auto align-items-center justify-content-center align-content-center">
            {templates &&
              templates?.map((template) => (
                <div className="col" key={template.id}>
                  <div
                    className="card mt-5"
                    style={{ maxWidth: "400px", maxHeight: "500px" }}
                  >
                    <div>
                      <iframe
                        loading="lazy"
                        srcDoc={template.html}
                        title="iframe"
                        sandbox="noninteractive"
                        style={{ width: "400px", height: "400px" }}
                      />
                      <div>
                        <h4 className="text-center text-capitalize">
                            
                            { excerpt(template?.name, 30)}

                            </h4>
                        <div>
                        <div className="d-flex align-items-center justify-content-center">
        <div className="mb-2">
        <Button  className="m-2" appearance='ghost' color="violet" onClick={() => handleViewTemplate(template.id)}>View</Button>

        <Button className="m-2" appearance='ghost' color="violet" onClick={() => handleEditTemplate(template.id)}>Edit</Button>
        <Button className="m-2" appearance='ghost' color="violet" onClick={() => handleDeleteTemplate(template.id)}>Delete</Button>
             </div>  
             </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            <div></div>
          </div>
}
        </div>
      </div>
    </>
  );
};
const condition = (authUser) => authUser;

export default compose(
  withFirebase,
  withAuthentication,
  withAuthorization(condition)
)(Templates);
