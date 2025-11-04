import { ToastContainer } from "react-toastify";
import AppRoutes from "./router/Router";
export default function App() {
    return <>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
    </>
}
