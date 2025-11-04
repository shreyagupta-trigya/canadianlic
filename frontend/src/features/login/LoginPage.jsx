import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import loginImg from "@assets/logo.webp"
import { useEffect, useState } from "react"
import { isEmail, minLength, required } from "@/utils/validation/rules"
import { validateForm } from "@/utils/validation"
import { userAuth } from "@/services/auth/authApi"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { savePermissions } from "@/utils/indexDb/permissionStore"
export default function LoginPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: "",
    })
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setErrors({});
    }, [formData])

    const handleSubmit = (e) => {
        e.preventDefault();

        const rules = {
            email: [required(), isEmail()],
            password: [required()],
        };

        const validationErrors = validateForm(formData, rules);

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            console.log(validationErrors)
            return;
        }

        // Proceed to login
        setLoading(true)
        userAuth(formData).then(async (res) => {
            if (res.data.success) {
                toast.success('Login Success!');
                localStorage.setItem("authToken", res.data.authToken);
                const checkPermissionSave = await savePermissions(res.data.userRes[0]);
                console.log(checkPermissionSave,'checkPermissons');
                
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
            console.log(res.data, 'res')
        }).catch((err) => {
            toast.error(err?.response?.data?.msg || "Login failed!");
            console.log(err, "err")
        }).finally(() => {
            setLoading(false)
        })
    };
    return (
        <div className="grid min-h-screen lg:grid-cols-2 border">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        Seven Oceans
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm loading={loading} handleSubmit={handleSubmit} setFormData={setFormData} errors={errors} />
                    </div>
                </div>
            </div>
            <div className="hidden lg:flex justify-center items-center" >
                <div className="" >
                    <img
                        src={loginImg}
                        alt="Image"
                        className="w-72 object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
        </div>
    )
}
