import { addDoc, arrayUnion, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { database, firestoreDb } from "../firebase/firebase";
import docModel from "../models/docs";
import fileModel from "../models/files";
import {
  SET_LOADING,
  SET_ADMIN_FILES,
  SET_ADMIN_FOLDERS,
  SET_USER_FOLDERS,
  ADD_USER_FOLDER,
  SET_USER_FILES,
  ADD_USER_FILE,
  UPDATE_USER_FILE_DATA,
  DELETE_USER_FILE,
  DELETE_USER_FOLDER,
  SET_SHARED_FOLDERS,
  SET_SORTED_USER_FOLDERS,
  SET_SORTED_USER_FILES
} from "./ActionTypes";
import { auth } from "../firebase/firebase";
const lastUpdatedBy = auth.currentUser ?({
  displayName: auth.currentUser.displayName,
  email: auth.currentUser.email,
  photoURL: auth.currentUser.photoURL,
  uid: auth.currentUser.uid,
  phone: auth.currentUser.phoneNumber,
  timestamps: serverTimestamp()
}): (null)
const setLoading = (data) => ({
  type: SET_LOADING,
  payload: data,
});
const setAdminFiles = (data) => ({
  type: SET_ADMIN_FILES,
  payload: data,
});
const setAdminFolders = (data) => ({
  type: SET_ADMIN_FOLDERS,
  payload: data,
});

export const getAdminFolders = () => (dispatch) => {
  dispatch(setLoading(true));

  const q = query(database.docs, where("createdBy", "==", "admin"));

  getDocs(q)
    .then((folders) => {
      const allFolders = [];
      folders.docs.forEach((doc) => {
        allFolders.push({ data: doc.data(), docId: doc.id });
      });
      dispatch(setAdminFolders(allFolders));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      toast.error("Failed to fetch data!");
    });
};
export const getAdminFiles = () => (dispatch) => {
  const q = query(database.files, where("createdBy", "==", "admin"));
  getDocs(q)
    .then((files) => {
      const allFiles = [];
      files.docs.forEach((doc) => {
        allFiles.push({ data: doc.data(), docId: doc.id });
      });
      dispatch(setAdminFiles(allFiles));
    })
    .catch((err) => {
      toast.error("Failed to fetch data!");
    });
};

const setUserFolders = (data) => ({
  type: SET_USER_FOLDERS,
  payload: data,
});
const setSortedUserFolders = (data) => ({
  type: SET_SORTED_USER_FOLDERS,
  payload: data,
});

export const getUserFolders = (userId) => async (dispatch) => { 
  if (userId) {
    const q = query(database.docs, where("createdBy.uid", '==' , userId));
  getDocs(q)
      .then((folders) => {
        const allFolders = [];
        folders.docs.forEach((doc) => {
          allFolders.push({ data: doc.data(), docId: doc.id });
        });
        dispatch(setUserFolders(allFolders));
      })
      .catch((err) => {
        console.log("foldererr", err);
        toast.error("Failed to fetch data!");
      });
  }
};
export const getSortedUserFolders = (userId) => async (dispatch) => { 
  if (userId) {
    const q = query(database.docs, where("createdBy.uid", '==' , userId),orderBy("lastAccessedBy.lastAccessedAt", "desc"), limit(1));
  getDocs(q)
      .then((folders) => {
        const allFolders = [];
        folders.docs.forEach((doc) => {
          allFolders.push({ data: doc.data(), docId: doc.id });
        });
        dispatch(setSortedUserFolders(allFolders));
      })
      .catch((err) => {
        toast.error("Failed to fetch data!");
      });
  }
};
const setSharedFolders = (data) => ({
  type: SET_SHARED_FOLDERS,
  payload: data,
});
export const getSharedFolders = (userId) => async (dispatch) => {
  if (userId) {
    const q = query(database.docs, where("shared", 'array-contains', userId), where("isShared", "==", true));
  getDocs(q)
      .then((folders) => {
        const allFolders = [];
        folders.docs.forEach((doc) => {
          allFolders.push({ data: doc.data(), docId: doc.id });
        });
        dispatch(setSharedFolders(allFolders));
      })
      .catch((err) => {
        toast.error("Failed to fetch data!");
      });
  }
};
const addUserFolder = (data) => ({
  type: ADD_USER_FOLDER,
  payload: data,
});
const docRef = (id) => doc(firestoreDb, `docs/${id}`)
const fileRef = (id) => doc(firestoreDb, `files/${id}`)
export const addFolderUser = (name, parent, path,) => (dispatch) => {
  addDoc(database.docs,docModel(name, path, parent, false, auth.currentUser, auth.currentUser))
    .then(async (doc) => {
      const id = doc.id;
      getDoc(docRef(id))
        .then((data)=>{
          dispatch(addUserFolder({ data: data.data(), docId: data.id }));
          toast.success("Folder added Successfully!");
    
        })

          })
    .catch((err) => {
      console.log(err);
      toast.error("Something went wrong!");
    });
};
const setUserFiles = (data) => ({
  type: SET_USER_FILES,
  payload: data,
});
const setSortedUserFiles = (data) => ({
  type: SET_SORTED_USER_FILES,
  payload: data,
});

export const getUserFiles = (userId) => (dispatch) => {
  if (userId) {
    const q = query(database.files, where("createdBy.uid", "==", userId));
      getDocs(q)
      .then((files) => {
        const allFiles = [];
        files.docs.forEach((doc) => {
          allFiles.push({ data: doc.data(), docId: doc.id });
        });
        
        dispatch(setUserFiles(allFiles));
      })
      .catch((err) => {
        console.log("foldererr", err);
        toast.error("Failed to fetch data!");
      });
  }
};
export const getSortedUserFiles = (userId) => (dispatch) => {
  if (userId) {
    const q = query(
      database.files,
      where("createdBy.uid", "==", userId),
      where("lastAccessedBy", "array-contains", { uid: userId }),
      orderBy("lastAccessedBy.lastAccessedAt", "desc"),
      limit(5)
    );
      getDocs(q)
      .then((files) => {
        const allFiles = [];
        files.docs.forEach((doc) => {
          allFiles.push({ data: doc.data(), docId: doc.id });
        });
        
        dispatch(setSortedUserFiles(allFiles));
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Failed to fetch data!  
        , + ${err.message}
        `);
      });
  }
};
const addUserFile = (data) => ({
  type: ADD_USER_FILE,
  payload: data,
});

export const addFileUser =
  ({ parent, data, name, url, path }) =>
  (dispatch) => {

      addDoc(database.files, fileModel(parent, data,name, url, path, auth.currentUser, auth.currentUser, null) )
      .then(async (doc) => {
        const id = doc.id;
        getDoc(fileRef(id))
        .then((doc)=>{
          dispatch(addUserFile({ data: doc.data(), docId: doc.id }));
        if (doc.data().url === "") {
          toast.success(`File created Successfully! \n You can double click on the file to open the editor!`);
        } else {
          toast.success("File uploaded Successfully!");
        }
        })
        
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  };

const updateUserFileData = (data) => ({
  type: UPDATE_USER_FILE_DATA,
  payload: data,
});
export const userFileDataUpdate = (data, docId) => (dispatch) => {
  database.files
    .doc(docId)
    .update({
      updatedAt: new Date(),
      data: data,
      updatedBy: lastUpdatedBy,
    })
    .then(() => {
      dispatch(updateUserFileData({ data, docId }));
      toast.success("Saved Successfully!!");

      document.querySelector(".CodeMirror").focus();
    })
    .catch((err) => {
      console.log(err);
      toast.error("Something went wrong!");
    });
};
const deleteUserFile = (data) => ({
  type: DELETE_USER_FILE,
  payload: data,
});
export const deleteFileUser = (docs, userId) => 
(dispatch) => {
  docs?.map((doc)=>{
    console.log(doc);
    deleteDoc(fileRef(doc.id)).then(()=>{
      dispatch(deleteUserFile(doc.id))
      toast.success(`${doc.name} deleted successfully.`)
    })
    .catch(()=>{
      toast.error(`Failed to delete ${doc.name}.`)
    })
  })
  // dispatch(getUserFiles(userId))
}
const deleteUserFolder = (data) => ({
  type: DELETE_USER_FOLDER,
  payload: data,
});
export const deleteFolderUser = (docs, userId) => 
(dispatch) => {
  docs?.map((doc)=>{
    deleteDoc(docRef(doc.id)).then(()=>{
      toast.success(`${doc.name} deleted successfully.`);
      dispatch(deleteUserFolder(doc.id));
    })
    .catch(()=>{
      toast.error(`Failed to delete ${doc.name}.`)
    })
  })
  dispatch(getUserFiles(userId))
}
export const shareFiles = (files, users) => 
(dispatch) => {
  const userIds = users.map((user) => user.value);
  files?.map((file)=> {
updateDoc(fileRef(file.docId), {
      shared: arrayUnion(...userIds),
      isShared: true,
    })
    .then(()=>{
      toast.success(`${file?.data.name} shared successfully to ${users?.length} users.`);
    })
    .catch(()=>{
      toast.error(`Failed to share ${file?.data.name}. to ${users?.length} users.`)
    })
  })
    
}
export const shareFolderstoUsers = (folders, users) => 
(dispatch) => {
  const userIds = users.map((user) => user.value);

  folders?.map((folder)=> {
    updateDoc(docRef(folder.id), {
      shared: arrayUnion(...userIds), 
      isShared: true,
    })
    .then(()=>{
      toast.success(`${folder?.name} shared successfully to ${users?.length} users.`);

    })
    .catch(()=>{
      toast.error(`Failed to share ${folder?.name}. to ${users?.length} users.`)
    })
  })
    
}