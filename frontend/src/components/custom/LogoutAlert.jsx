import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { DropdownMenuItem } from "../ui/dropdown-menu"

export function LogoutAlert({ handleLogOut }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger  asChild>
                <div
                     // stops dropdown from closing
                    className="cursor-pointer px-2 py-1.5 flex items-center text-sm hover:bg-muted rounded-md"
                >
                    <LogOut className="mr-2 opacity-50" size={'16'} />
                    Log out
                </div>

            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You’ll be signed out from your account and redirected to the login page. Do you want to continue?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleLogOut()} >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
