import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import { useNavigate, useParams } from "react-router-dom";
import { deleteObject, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { toast } from "react-toastify";
import { Button, ProgressBar, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Editor from "../Editor/Editor";
import { addBlog, blogDoc, editBlog, getBlogDetails, headerImageRef, sentBlogToReview, userDataUploadPath } from "../../redux/ActionCreators";
import { BsCloudUpload } from "react-icons/bs";
import { updateDoc } from "firebase/firestore";
const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  content: "",
  comments: [],
  likes: []
};

const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
];

const AddEditBlog = () => {
  const blog = useSelector((state) => state.blogs?.blogDetails);
  const loading = useSelector((state) => state.blogs?.loading);
  const user = useSelector((state) => state.authState?.user);
  const [form, setForm] = useState(initialState);
  const [content, setContent ] = useState('')
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, category, trending } = form;
  const [tags, setTags] = useState([])
  const redirect = useSelector(state => state.redirect.redirectTo);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [ state, setState] = useState();
  const maxSize = 5000000;
  const [message, setMessage] = useState(null);
  const [Errormessage, setErrorMessage] = useState(null);
  const fileTypes = ["image/jpeg", "image/png", "image/jpg"];
  const [isBlogAuthor, setIsBlogAuthor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPublisher, setIsPublisher] = useState(false);
  useEffect(() => {
    if(id){ 
      dispatch(getBlogDetails(id));
    setTimeout(()=>{
      if(blog?.postedBy?.uid === user?.uid || user?.roles["ADMIN"]){
        setForm(blog);
        setContent(blog?.content);
        setFileUrl(blog?.imgUrl);
        setTags(blog?.tags);
        setIsBlogAuthor(true);
      }
      if(user && user?.roles["ADMIN"]){
        setIsAdmin(true)
      }
      if(user && user?.roles["PUBLISHER"]){
        setIsPublisher(true)
      }
    }, 1000)
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(()=>{
    if(user && user?.roles["ADMIN"]){
      setIsAdmin(true)
    }
    if(user && user?.roles["PUBLISHER"]){
      setIsPublisher(true)
    }
    if(redirect){
      navigate(redirect?.location,{state: redirect?.state })
      setForm(initialState);
      setContent('');
      setFileUrl('');
      setTags([]);
    }  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect])
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setTags(tags);
    setForm({...form, tags :tags})

  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category && tags && title && content && trending) {
      if (id) {
        dispatch(editBlog(id, form))
      } else {
        if(isAdmin){
        dispatch(addBlog(form))
        }
        else if(user){
        dispatch(sentBlogToReview(form))
        }
        else{
      return toast.error("You dont have access to post a blog here!.");
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }
  };
  const handleContent = (e) =>{
    setContent(e)
    setForm({...form, content :e})
  }
  const handleFileChange =  (e) => {
    const reader = new FileReader();
    const File = e.target.files[0];
    reader.readAsDataURL(File);
    if (File && fileTypes.includes(File.type) && File.size <= maxSize) {
      setFile(File);
      setState(null)
      setErrorMessage(null);
    } else {
      setFile(null);
      const extension = File.type.split("/")[1];

      if (File && !fileTypes.includes(File.type)) {
        const allowedFileTypes = fileTypes.map(fileType => fileType.split("/")[1]).join(", ");
        setErrorMessage(`Invalid file type. Only ${allowedFileTypes} are allowed. (Attempted: ${extension})`);
      } else if (File && File.size > maxSize) {
        setErrorMessage("File size exceeds the limit of 5 MB.");
      }
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      setState({error : "No file selected for upload."})
      return;
    }
    setUploading(true);
    const uploadprogress = uploadBytesResumable(
      userDataUploadPath(user?.id, file.name),
      file
    );
    uploadprogress.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadprogress.snapshot.ref).then((downloadURL) => {
          setFileUrl(downloadURL);
          setUploading(false);
          setForm({ ...form, imgUrl: downloadURL });

        });
      }
    );
  };
  const handleRemove =  (e) =>{
    e.preventDefault();
    const fileName = headerImageRef(fileUrl);
    deleteObject(userDataUploadPath(user?.uid, fileName?.name))
    .then(()=>{
        updateDoc(blogDoc(id), {
          imgUrl: null
        })
        .then(()=>{
          setMessage("File deleted successfully");
          setFileUrl(null);
          setFile(null);
          document.querySelector("input[type='file']").value = "";
          setTimeout(()=>{
            setMessage(null);
          }, 5000)
        })
    })
    .catch((error)=>{
      setMessage(null)
      state.touched = true;
      state.error = error;
    })
  }
  return (
    <div className="container-fluid mb-4" >
      <div className="container">
        <div className="col-12 mt-5">
          <div className="text-center heading py-2" >
            {id ? "Update Blog" : "Create Blog"}
          </div>
        </div>
        {
          loading ? 
          <div style={{margin: 'auto', width: 'max-content '}}><Spinner/></div> : 
        
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row blog-form" onSubmit={handleSubmit}>
              <div className="col-12 py-3">
              <label
            className="form-control-label"
            htmlFor="title"
          >Blog Title :
          </label>
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-3">
              <label
            className="form-control-label"
            htmlFor="tags"
          >Tags for this Blog :
          </label>
                <ReactTagInput
                  tags={tags ? tags : []}
                  placeholder="Tags"
                  onChange={handleTags}
                />
              </div>
              <div className="col-12 py-3">
              <label
            className="form-control-label"
            htmlFor="trending"
          >Is it trending blog ? :
          </label>
                <div className="form-check-inline mx-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="yes"
                    name="radioOption"
                    checked={trending === "yes"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    Yes&nbsp;
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    value="no"
                    name="radioOption"
                    checked={trending === "no"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    No
                  </label>
                </div>
              </div>
              <div className="col-12 py-3">
              <label
            className="form-control-label"
            htmlFor="category"
          >Blog category :
          </label>
                <select
                  value={category}
                  onChange={onCategoryChange}
                  className="catg-dropdown"
                >
                  <option>Please select category</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 py-3">
              <label
            className="form-control-label"
            htmlFor="content"
          >Blog content :
          </label>
          <Editor 
          setData={handleContent}
          readonly={false}
          className="form-control description-box"
          placeholder="Blog content"
          data={content}
          name= 'content'
          
          />
              </div>
              <div className="col-12 py-3">

              <>
      <div className="col">
        <div className="form-group focused">
          <label
            className="form-control-label"
            htmlFor='headerImage'
          >
            Header image
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="form-control form-control-alternative react-tag-input-file"
            accept="image/jpeg, image/png"
            />{uploading && 
          <div className='mb-1 mt-2'>
          <ProgressBar
            now={progress}
            label={`${progress}%`}
          />
        </div>
        }
        {state && state.error ? (
            <div className="error">{state.error}</div>
          ) : null}
          {message ? (
            <div className="text-success">{message}</div>
          ) : null}
          {Errormessage ? (
            <div className="text-danger">{Errormessage}</div>
          ) : null}
          <div className='mb-1 mt-2'>
          <Button onClick={handleUpload} disabled={!file || fileUrl}>
            <BsCloudUpload/> Upload
          </Button>
          {
            fileUrl && <>
                      <Button onClick={handleRemove} disabled={file && !fileUrl}>
                      Remove
                    </Button>
            </>
          } </div>    
          {fileUrl && (
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              View file
            </a>
          )}
        </div>
      </div>
    </>
              </div>
              <div className="col-12 py-3 text-center">
                <button
                  className="btn btn-add"
                  type="submit"
                  disabled={loading}
                >
                  {id && isBlogAuthor ? "Update" : 
                  
                  <>
                  {
                   isAdmin || isPublisher ? "Post it" : "Sent it to Review"
                  } 
                  </>}
                </button>
              </div>
            </form>
          </div>
        </div>
}
      </div>
    </div>
  );
};

export default AddEditBlog;