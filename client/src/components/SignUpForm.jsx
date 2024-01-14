import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setToken,setUser } from "../redux/userSlice";
import lodash from 'lodash'
import { signUp } from "../api/apiConnections";
import {
    Input,
    Button,
    Typography
} from "@material-tailwind/react";


const SignUpForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [submitStatus, setSubmitStatus] = useState(false)

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
            rePassword: ''
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .max(20, 'Must be less than 20 characters')
                .min(8, 'Must be 8 characters or more')
                .required('Required'),
            password: Yup.string()
                .max(20, 'Must be less than 20 characters')
                .min(8, 'Must be 8 characters or more')
                .required('Required'),
            rePassword: Yup.string()
                .oneOf([Yup.ref('password'), ''], 'Password not match')
                .required('Required')
        }),
        onSubmit: async (values) => {
            setSubmitStatus(true)
            const data = lodash.omit(values, 'rePassword')
            const response = await signUp(data)
            if (response?.status) {
                dispatch(setToken(response?.token))
                dispatch(setUser(response?.data))
                toast.success(response?.message)
                navigate('/')
            } else {
                setSubmitStatus(false)
                toast.error(response?.message)
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className="w-80">
            <Typography variant="h3" color="blue-gray" className="text-center">
                Sign Up
            </Typography>

            <div className="mt-4">
                <div className="flex flex-col gap-2">
                    <div>
                        <Input type="text" id="userName" size="lg" label="User Name" maxLength={20}
                            {...formik.getFieldProps('userName')} />
                        <p className="h-4 ml-2 text-xs text-red-800">{formik.touched.userName && formik.errors.userName ?
                            formik.errors.userName : null}</p>
                    </div>

                    <div>
                        <Input type="password" id="password" size="lg" label="Password" maxLength={20}
                            {...formik.getFieldProps('password')} />
                        <p className="h-4 ml-2 text-xs text-red-800">{formik.touched.password && formik.errors.password ?
                            formik.errors.password : null}</p>
                    </div>

                    <div>
                        <Input type="password" id="rePassword" size="lg" label="Re-type Password" maxLength={20}
                            {...formik.getFieldProps('rePassword')} />
                        <p className="h-4 ml-2 text-xs text-red-800">{formik.touched.rePassword && formik.errors.rePassword ?
                            formik.errors.rePassword : null}</p>
                    </div>
                </div>


                <Button type="submit" disabled={submitStatus} className="mt-2" color="blue-gray" variant="gradient" fullWidth>
                    Submit
                </Button>

            </div>
        </form>
    )
}

export default SignUpForm