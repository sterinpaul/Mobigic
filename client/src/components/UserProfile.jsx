import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUploadedFiles } from "../redux/userSlice";
import { getUploadedAll,removeFileFromDB,verifySecret } from "../api/apiConnections";
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Dialog,
    DialogHeader,
    DialogFooter
} from "@material-tailwind/react";
import { baseUrl } from "../api/constants";


const UserProfile = () => {
    const { userName, uploadedFiles } = useSelector(store => store.user)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [option,setOption] = useState(true)
    const [fileId,setFileId] = useState('')
    const [fileName,setFileName] = useState('')
    

    const handleOption = (option,id,fileName='')=>{
        handleOpen()
        setFileId(id)
        setFileName(fileName)
        if(option === 'Remove'){
            setOption(false)
        }else{
            setOption(true)
        }
    }

    const dispatch = useDispatch()
    const getUploadedFiles = async () => {
        const response = await getUploadedAll(userName)
        if (response.status) {
            dispatch(setUploadedFiles(response.data))
        }
    }

    const downloadFile = async()=>{
        try {
            await fetch(`${baseUrl}/uploads/${fileName}`)
                .then((response) => response.blob())
                .then((blob) => {
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                });
        } catch (error) {
            console.error('Error downloading file:', error);
        }
        handleOpen()
    }

    const removeFile = async()=>{
        const response = await removeFileFromDB(userName,fileId)
        if(response?.status){
            const updatedFiles = uploadedFiles.filter(single=>single._id !== response.id)
            dispatch(setUploadedFiles(updatedFiles))
            handleOpen()
        }
    }

    useEffect(() => {
        getUploadedFiles()
    }, [])

    return (
        <div className="w-screen flex justify-center mt-20">
            <div className="flex justify-center flex-wrap gap-4  m-2">
            {uploadedFiles && uploadedFiles.map((singleImg) => {
                return (
                    <div key={singleImg._id} className="flex flex-col items-end shadow-2xl">
                        <Menu placement="bottom-end">
                            <MenuHandler><EllipsisVerticalIcon className="w-5 h-5 cursor-pointer mt-1" /></MenuHandler>
                            <MenuList>
                                <MenuItem onClick={()=>handleOption('Download',singleImg._id,singleImg.fileName)}>Download</MenuItem>
                                {userName === singleImg.userName && <MenuItem onClick={()=>handleOption('Remove',singleImg._id)}>Remove</MenuItem>}
                            </MenuList>
                        </Menu>
                        <div className="h-52 w-72  overflow-hidden p-2">
                            <img className="w-full h-full object-cover" src={`${baseUrl}/uploads/${singleImg.fileName}`} alt={singleImg.fileName} />
                        </div>
                        <div className="self-center">
                            <p className="text-center p-1">Secret Key : {singleImg.secretKey}</p>
                        </div>
                    </div>
                )
            })}

            <Dialog size="xs" open={open} handler={handleOpen} className="flex flex-col items-center">

                {option ? <><DialogHeader>Download File</DialogHeader>
                        <p>Do you want to download the file ?</p>
                    </> : <>
                        <DialogHeader>Remove File</DialogHeader>
                            <p>Do you really want to remove the file ?</p>
                        </>}
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="blue-gray" onClick={option ? downloadFile : removeFile}>
                        Confirm
                    </Button>
                </DialogFooter>

            </Dialog>
            </div>
        </div>
    )
}

export default UserProfile