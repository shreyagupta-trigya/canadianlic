import { DeleteAlert } from '@/components/custom/DeleteAlert'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { deleteRoleFromList } from '@/redux/slices/userRoleSlice/userRoleSlice'
import { deleteUserRole } from '@/services/portal/userRoles/userRolesApi'
import { Edit2Icon, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ListCard = ({ item }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const handleDelete = () => {
        setLoading(true);
        deleteUserRole(item.id).then((res) => {
            if (res.data.success) {
                dispatch(deleteRoleFromList(item.id))
                toast.success("Role Deleted Successfully!")
            }
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || err.message)
        }).finally(() => {
            setLoading(false);
            setOpen(false)
        })

    }
    return (
        <>
            <div className='w-full flex justify-between hover:bg-accent hover:dark:bg-accent  border-b group' >
                <div className='flex items-center gap-3 px-3 py-3' >
                    <div className='h-10 w-10  flex justify-center items-center rounded-md bg-blue-300 dark:bg-blue-600' >
                        {item.roleName.charAt(0)?.toUpperCase()}
                    </div>
                    <div className='' >
                        <h3 className='text-lg' >{item.roleName}</h3>
                        <p className='text-sm text-muted-foreground' >{item.description}</p>
                    </div>
                </div>
                <div className='hidden group-hover:flex opacity-65 justify-center items-center gap-5 mx-3' >
                    <div title='Edit' >
                        <Edit2Icon onClick={()=>navigate('/portal/manage-users/roles/update', {state:item})} size={15} />
                    </div>
                    <div title='Delete' >
                        <Trash2 onClick={()=>setOpen(true)} size={'15'} />
                    </div>
                </div>
            </div>
            <DeleteAlert open={open} setOpen={setOpen} loading={loading} handleDelete={handleDelete} />
        </>
    )
}

export default ListCard