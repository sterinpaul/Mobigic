import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUploadedFiles } from "../redux/userSlice";
import { getUploadedAllFiles, removeFileFromDB, verifySecret } from "../api/apiConnections";
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

const UserDashBoard = () => {
    const { userName, uploadedFiles } = useSelector(store => store.user)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [option, setOption] = useState(true)
    const [secret, setSecret] = useState('')
    const [fileId, setFileId] = useState('')
    const [curUser, setCurUser] = useState('')
    const [fileName, setFileName] = useState('')
    const [secretKeyError, setSecretKeyError] = useState('')

    const handleOption = (option, id, fileName = '', user = '') => {
        handleOpen()
        setCurUser(user)
        setFileName(fileName)
        if (secret.length) setSecret('')
        setFileId(id)
        if (option === 'Remove') {
            setOption(false)
        } else {
            setOption(true)
        }
    }

    const dispatch = useDispatch()
    const getUploadedFiles = async () => {
        const response = await getUploadedAllFiles()
        if (response.status) {
            dispatch(setUploadedFiles(response.data))
        }
    }

    const downloadUserFile = async (file) => {
        try {
            await fetch(`http://localhost:3000/uploads/${file}`)
                .then((response) => response.blob())
                .then((blob) => {
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = file;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                });
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }
    const downLoadFile = () => {
        downloadUserFile(fileName)
        handleOpen()
    }

    const submitCode = async () => {
        if (secret.length === 6) {
            const response = await verifySecret(fileId, secret)
            if (response?.status) {
                downloadUserFile(response.fileName)
                // try {
                //     await fetch(`http://localhost:3000/uploads/${response.fileName}`)
                //         .then((response) => response.blob())
                //         .then((blob) => {
                //             const url = window.URL.createObjectURL(new Blob([blob]));
                //             const a = document.createElement('a');
                //             a.href = url;
                //             a.download = response.fileName;
                //             document.body.appendChild(a);
                //             a.click();
                //             document.body.removeChild(a);
                //         });
                // } catch (error) {
                //     console.error('Error downloading file:', error);
                // }
                handleOpen()
            } else {
                setSecretKeyError('Secret key is wrong')
                setTimeout(() => {
                    setSecretKeyError('')
                }, 2000)
            }
        }
    }

    const removeFile = async () => {
        const response = await removeFileFromDB(userName, fileId)
        if (response?.status) {
            const updatedFiles = uploadedFiles.filter(single => single._id !== response.id)
            dispatch(setUploadedFiles(updatedFiles))
            handleOpen()
        }
    }

    useEffect(() => {
        getUploadedFiles()
    }, [])

    return (
        <div className="w-screen flex justify-center mt-20">
            {/* <div className="flex items-center justify-center flex-wrap gap-4 p-2"> */}
            <div className="flex justify-center flex-wrap gap-4  m-2">
                {uploadedFiles && uploadedFiles.map((singleImg) => {
                    return (
                        <div key={singleImg._id} className="flex flex-col items-end shadow-2xl">
                            <Menu placement="bottom-end">
                                <MenuHandler><EllipsisVerticalIcon className="w-5 h-5 cursor-pointer mt-1" /></MenuHandler>
                                <MenuList>
                                    <MenuItem onClick={() => handleOption('Download', singleImg._id, singleImg.fileName, singleImg.userName)}>Download</MenuItem>
                                    {userName === singleImg.userName && <MenuItem onClick={() => handleOption('Remove', singleImg._id)}>Remove</MenuItem>}
                                </MenuList>
                            </Menu>
                            <div className="h-52 w-72  overflow-hidden p-2">
                                <img className="w-full h-full object-cover" src={`http://localhost:3000/uploads/${singleImg.fileName}`} alt={singleImg.fileName} />
                            </div>
                        </div>
                    )
                })}

                <Dialog size="xs" open={open} handler={handleOpen} className="flex flex-col items-center">

                    {option ? <><DialogHeader>Download File</DialogHeader>

                        {userName===curUser ? <p>Do you want to download the file ?</p> : <><p>Please enter the secret code to download the file</p>
                        <div className="text-center mt-2">
                            <input onChange={(event) => setSecret(event.target.value)} value={secret} maxLength={6} className="bg-brown-50 rounded h-8 pl-2 border-none text-black" placeholder="secret code" type="text" />
                        </div>
                        <p className="text-red-700 text-sm m-1">{secretKeyError}</p></>}
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
                        <Button variant="gradient" color="blue-gray" onClick={!option ? removeFile : userName === curUser ? downLoadFile : submitCode}>
                            Confirm
                        </Button>
                    </DialogFooter>

                </Dialog>
            </div>
        </div>
    )
}

export default UserDashBoard