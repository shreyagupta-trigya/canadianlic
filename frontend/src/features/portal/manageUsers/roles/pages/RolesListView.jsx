import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ListCard from '../components/ListCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRoles } from '@/redux/slices/userRoleSlice/userRoleSlice';
import { toast } from 'react-toastify';
import ListCardSkeleton from '../components/ListCardSkeleton';

const RolesListView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { data, loading, error, fetched } = useSelector((state) => state.userRoles.all);
    useEffect(() => {
        if (!fetched) dispatch(fetchUserRoles());
    }, [fetched, dispatch]);

    useEffect(()=>{
        console.log(fetched,'fetched ')
    })
    if (error) {
        toast.error(error)
    }
    
    return (
        <>
            <div className="mx-1 lg:mx-2 flex flex-col justify-start gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h5 className="font-semibold" >Roles</h5>
                    </div>
                    <div className="flex items-right gap-2">

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate("/portal/manage-users/roles/create")}
                        >
                            <IconPlus />
                            <span className="hidden lg:inline">Create Role</span>
                        </Button>
                    </div>
                </div>
                <div>
                    {loading
                        ? Array.from({ length: 3 }).map((_, idx) => <ListCardSkeleton key={idx} />)
                        : data?.map((item) => (
                            <ListCard key={item.id} item={item} />
                        ))}
                </div>
            </div>
        </>
    )
}

export default RolesListView