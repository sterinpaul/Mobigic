import {useState} from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';
import { signIn } from "../api/apiConnections";
import {
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button
} from "@material-tailwind/react";


const SignInForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [submitStatus,setSubmitStatus] = useState(false)

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: ''
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .max(20, 'Must be less than 20 characters')
                .min(8, 'Must be 8 characters or more')
                .required('Required'),
            password: Yup.string()
                .max(20, 'Must be less than 20 characters')
                .min(8, 'Must be 8 characters or more')
                .required('Required')
        }),
        onSubmit: async (values) => {
            setSubmitStatus(true)
            const response = await signIn(values)
            if (response?.status) {
                dispatch(setToken(response.token))
                dispatch(setUser(response.data))
                navigate('/')
                toast.success(response.message)
            } else {
                setSubmitStatus(false)
                toast.error(response.message)
            }
        }
    })


    return (
        <>
            <form onSubmit={formik.handleSubmit}>

                <CardHeader
                    variant="gradient"
                    color="blue-gray"
                    className="mb-4 grid h-28 place-items-center"
                >

                    <Typography variant="h1" color="white" className="font-kaushan">
                        Login
                    </Typography>

                </CardHeader>
                <CardBody className="flex flex-col gap-2">

                    <div>
                        <Input type="text" id="userName" size="lg" label="User Name" maxLength={20}
                            {...formik.getFieldProps('userName')} />
                        <p className="h-4 ml-2 text-xs text-red-800">{formik.touched.userName && formik.errors.userName ?
                            formik.errors.userName : null}</p>
                    </div>

                    <Input type="password" label="Password" size="lg" id="password" value={formik.values.mobile} maxLength={20}
                        {...formik.getFieldProps('password')} />
                    <p className="h-4 ml-2 text-xs text-red-800">{formik.touched.password && formik.errors.password ?
                        formik.errors.password : null}</p>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button type="submit" color="blue-gray" disabled={submitStatus} variant="gradient" fullWidth>
                        Submit
                    </Button>

                </CardFooter>
            </form>

        </>
    )
}

export default SignInForm
