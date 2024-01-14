import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter
} from "@material-tailwind/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import {uploadFile} from '../api/apiConnections'
import { useDispatch,useSelector } from "react-redux";
import { setUploadedFiles } from "../redux/userSlice";
import { setSignOut } from "../redux/userSlice";

export function NavBar() {
    const [openNav, setOpenNav] = useState(false);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const uploadRef = useRef()
    const navigate = useNavigate()
    const [chooseFile,setChooseFile] = useState(null)
    const {userName,uploadedFiles} = useSelector(store=>store.user)

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const submitFile = async()=>{
        if(chooseFile){
            const response = await uploadFile(userName,chooseFile)
            if(response?.status){
                dispatch(setUploadedFiles([response.data,...uploadedFiles]))
                setChooseFile(null)
                handleOpen()
            }
        }
    }

    const userLogOut = ()=>{
        dispatch(setSignOut())
        navigate('/')
    }

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-normal"
            >
                <Link to="/" className="flex items-center hover:text-blue-800">
                    Home
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-normal"
            >
                <Link to="/profile" className="flex items-center hover:text-blue-800">
                    My Uploads
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-normal cursor-pointer hover:text-blue-800"
                onClick={handleOpen}
            >
                Upload
            </Typography>

        </ul>
    );

    return (
        <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-blue-gray-600 border-none">
            <div className="flex items-center justify-between text-white">
                <Typography
                    as="a"
                    href="#"
                    className="mr-4 cursor-pointer py-1.5 font-bold text-lg"
                >
                    Mobigic
                </Typography>
                <div className="flex items-center gap-4">
                    <div className="mr-4 hidden lg:block">{navList}</div>
                    <Button
                        variant="outlined"
                        size="sm"
                        color="white"
                        className="hidden lg:inline-block"
                        onClick={userLogOut}
                    >
                        <span>Sign out</span>
                    </Button>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
            </div>



            <Dialog size="xs" open={open} handler={handleOpen} className="flex flex-col items-center">
                
                <DialogHeader>Upload File</DialogHeader>
                <DialogBody>
                    {chooseFile ? <div onClick={()=>setChooseFile(false)} className="group max-w-64 relative rounded-lg overflow-hidden"><img className="w-full h-full object-cover" src={URL.createObjectURL(chooseFile)} alt="Image"/><div className="group-hover:flex hidden items-center justify-center cursor-pointer opacity-50 absolute top-0 w-full h-full bg-blue-gray-400"><XCircleIcon className=" text-white h-20 w-20"/></div></div> : (
                        <>
                            <Button className="text-xs" variant="outlined" onClick={()=>uploadRef.current.click()} >Choose file
                            </Button>
                            <input ref={uploadRef} onChange={(event)=>setChooseFile(event.target.files[0])} accept=".jpg,.jpeg,.png,.webp" type="file" className="hidden"/>
                        </>
                        )}
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="blue-gray" onClick={submitFile}>
                        Confirm
                    </Button>
                </DialogFooter>
                
            </Dialog>



            <Collapse open={openNav}>
                {navList}
                <Button variant="outlined" fullWidth onClick={userLogOut} size="sm" color="white">
                    <span>Sign out</span>
                </Button>
            </Collapse>
        </Navbar>
    );
}