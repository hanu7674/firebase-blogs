import React, { useEffect, useState } from "react";
import { useRef } from "react";
import EmailEditor from 'react-email-editor'
import { useDispatch, useSelector } from "react-redux";
import { Button } from "rsuite";
import { addTemplate,  templateFiles } from "../redux/ActionCreators";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { notify } from "reapop";
import { toast } from "react-toastify";
import {useMediaQuery } from 'utils-lazy-hook'
import { saveAs } from 'file-saver';
import { Modal } from "react-bootstrap";
const NewTemplate = () => {
    const templateRef = useRef();
  const authUser = useSelector(state => state.authState.user);
//   const fileUrl = useSelector((state) => state.userState.fileUrl);
  const addSuccess = useSelector((state) => state.templates?.addSuccess);
const [show, setShow] = useState(false);
const [design, setDesign] = useState();
  
  const dispatch = useDispatch();
  const isSupported = useMediaQuery("(max-width: 1200px)")
    const options = {
        // apiKey : 'K5TDIeqvqAozjiN7j3WPbOxV1JN1RQW2lWJmS0Ge44spVA5AMZ0CXBn3rYFJ6Fis',
        mergeTagsConfig: {
            autocompleteTriggerChar: "@"
          },
        mergeTags: {
          first_name: {
            name: "First Name",
            value: "{{first_name}}",
            sample: "John",
          },
          last_name: {
            name: "Last Name",
            value: "{{last_name}}",
            sample: "Doe",
          },
        },
        displayMode: "web",
        user: {
          id: authUser?.id,

          name: authUser?.displayName,
          email: authUser?.email,
        },
        features: {
  preview: true,
  smartMergeTags: true,
            audit: true,
            ai: {
                smartButtons: true,
                smartHeadings: true,
                magicImage: true,
                smartText: true,
            },
          userUploads: true,
          imageEditor: true,
          undoRedo: true,
          stockImages: true,
          textEditor: {
            spellChecker: true,
            tables: true,
            cleanPaste: true,
            emojis: true,
          },
        },
        customJS: [
          "https://examples.unlayer.com/examples/react-custom-tool/custom.js",
        ],
      };
      const tools = {
                  enabled: true,
                  social: {
                    enabled: true
                  },
                  form: {
                    properties: {
                      fields: {
                        editor: {
                          data: {
                            allowAddNewField: true
                          }
                        }
                      }
                    }
                  },
                  timer: {
                    enabled: true
                  },
                  video: {
                    enabled: true
                  }

      };
      const appearance = {
        theme: "dark",
      };
    const exportHtml = () => {
        templateRef.current.editor.exportHtml((data) => {
          const {  html } = data;
          const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
          saveAs(blob, 'exported.html');
        });
      };
      const exportPlainText = () => {
        templateRef.current.editor.exportPlainText((data) => {
          const {  text } = data;
          const blob = new Blob([text], { type: 'text/html;charset=utf-8' });
          saveAs(blob, 'exported.txt');
        });
      };
      function saveTemplate()  {
        templateRef.current?.editor?.exportHtml(function(data) {
        const { design, html } = data;
        const design_json = JSON.stringify(design);
          setDesign({design_json,html}); 
          setShow(true);
        });
      }      
      useEffect(()=>{
        if(addSuccess){
          setShow(false)
        }
      },[addSuccess])
      templateRef.current?.editor?.registerCallback('image',function(file, done) {
          const reader = new FileReader();
          const fileData = file?.attachments[0]
      reader.readAsDataURL(fileData);
      var imageFullPath = templateFiles( authUser?.id, fileData?.name);
      const uploadprogress = uploadBytesResumable(imageFullPath, fileData);
  
      uploadprogress.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          done({ progress: progress, url: null }) 
        },
        (error) => {
          dispatch(notify({ status: "error", message: error.message }));
        },
        () => {
          getDownloadURL(uploadprogress.snapshot.ref)
            .then((url) => {
              done({ progress: 100, url: url })
              toast.success(`${fileData?.name} was uploaded.`)
            })
            .catch((error) => {
              dispatch(notify({ status: "error", message: error.message }));
            });
        }
      );
  });
      const onReady = () => {
        console.log('onReady');
      };

    const ShowSaveTemplateModal = ({show, onHide, design, design_name}) => {
      const [name, setName] = useState(design_name ? design_name : '');
      const dispatch = useDispatch();

      const onConfirm = () =>{
          const designDetails = {
            ...design,
            name: name
          };
          if(name?.length >= 3){
            dispatch(addTemplate(designDetails));
          }
          else{
            dispatch(notify({ status: "error", message: "Template name should be atleast 3 characters." }));
          }
      }
      return (
        <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
        className="mt-5"
      >
        <Modal.Header closeButton>
          <Modal.Title>Save template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
          <div className="col-12 py-3">
              <label
            className="form-control-label"
            htmlFor="title"
          >Template Name :
          </label>
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="template name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
          </>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" disabled={name?.length <=3 } onClick={onConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
      )
    }
    return(
        <>
        <div className="mt-5 container">
        
        {
        isSupported ? 
        <>
        <div  style={{height: "90vh"}}>
        
          <div className="d-flex justify-content-center text-center fs-3">
            This page was supported only on Desktops with screen minimum width 1200px.
          </div>
        </div>
        </> : <>
        <div>
        <ShowSaveTemplateModal show= {show} onHide={() => setShow(false)} design ={design} />
        </div>
            <div className="d-flex align-items-end justify-content-end">
        <div className="mb-2">
        <Button  className="m-2" appearance='ghost' color="violet"  onClick={exportHtml}>Export to HTML</Button>
        <Button className="m-2" appearance='ghost' color="violet" onClick={exportPlainText}>Export to Plain Text</Button>
        {/* <Button className="m-2" appearance='ghost' color="violet" onClick={exportImage}>Export to Image</Button> */}
        <Button  className="m-2" appearance="primary" color="cyan" onClick={saveTemplate}>Save Template</Button>
     
      </div>
      </div>
      <EmailEditor 
      ref={templateRef} 
      onReady={onReady} 
      options={options}
      appearance={appearance}
      tools={tools}
      projectId={107439}
      />
      </>
        }
        </div>

        </>
    )
}
export default NewTemplate;