import React, { useEffect, useState } from "react";
import { useRef } from "react";
import EmailEditor from 'react-email-editor'
import { useDispatch, useSelector } from "react-redux";
import { Button, Loader } from "rsuite";
import { addTemplate,  editTemplate,  getTemplate,  templateFiles } from "../redux/ActionCreators";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { notify } from "reapop";
import { toast } from "react-toastify";
import {useMediaQuery } from 'utils-lazy-hook'
import { saveAs } from 'file-saver';
import { Modal } from "react-bootstrap";
import { useLocation } from "react-router";
import Timestamp from "react-timestamp";
import { excerpt } from "../components/Blogs/utility";
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const EditTemplate = () => {
    const templateRef = useRef();
  const authUser = useSelector(state => state.authState.user);
  const loading = useSelector(state => state.templates.loading);
  const template = useSelector(state => state.templates.template);

  const addSuccess = useSelector((state) => state.templates?.addSuccess);
const [show, setShow] = useState(false);
const [design, setDesign] = useState();
let query = useQuery();
let templateId = query.get("id");

  const dispatch = useDispatch();
  const isSupported = useMediaQuery("(max-width: 1200px)")
  useEffect(() =>{
      if(templateId){
        dispatch(getTemplate(templateId))
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId])
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
        template.design_json = JSON.stringify(design);
        template.html = html;
        dispatch(editTemplate(template))
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
        if(typeof(templateId) === 'string'){
            const templateJson = {};
                Object.assign(templateJson, JSON.parse(template?.design_json));
              setTimeout(()=>{
                templateRef.current.editor.loadDesign(templateJson);   
              },200)
            }
            else{
              setTimeout(()=>{
                templateRef.current.editor.loadTemplate(240090);   
              },200)
            }
      };
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
        {
            loading ? <Loader/> : <>
            <div className="d-flex justify-content-between m-3">
                <div className="justify-content-left align-items-left align-content-left justify-content-space-between">
                  <span className="heading-small text-muted">Title: </span><span className="heading-medium text-muted text-capitalize">{ excerpt(template.name , 50)}</span>
                  <div><span className="heading-small text-muted">Author : </span><span className="heading-medium text-muted text-capitalize">{template?.postedBy?.firstName + " " + template?.postedBy?.lastName}</span></div>
                  <div><span className="heading-small text-muted">Created At : </span><span className="heading-medium text-muted text-capitalize">
                  <Timestamp relative date={template?.timestamp?.toDate().toDateString()} autoUpdate /></span>
                  </div>
                </div>
                <div className="justify-content-right align-items-right align-content-right justify-content-space-between">
                <Button  className="m-2" appearance='ghost' color="violet"  onClick={exportHtml}>Export to HTML</Button>
        <Button className="m-2" appearance='ghost' color="violet" onClick={exportPlainText}>Export to Plain Text</Button>
        {/* <Button className="m-2" appearance='ghost' color="violet" onClick={exportImage}>Export to Image</Button> */}
        <Button  className="m-2" appearance="primary" color="cyan" onClick={saveTemplate}>Save Changes</Button>
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
      </>
        }
        </div>
        </>
    )
}
export default EditTemplate;