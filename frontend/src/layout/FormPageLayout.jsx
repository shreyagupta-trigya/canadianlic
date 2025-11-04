import { FormHeading } from '@/components/custom/CustomFormComponents'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const FormPageLayout = ({ title, onCancel, onSubmit, children, loading }) => {
    const navigate = useNavigate()
    return (
        <div className='min-h-screen relative' >
            <div className="sticky w-full top-0 z-30 bg-background py-4 border-b border-muted">
                {/* <Button onClick={() => navigate('/crm/deals')} className="opacity-35 hover:opacity-55" variant={'ghost'} size={'sm'}>
                    <ChevronLeft /> <span className='font-light' >Back</span>
                </Button> */}
                <div className='flex justify-between mx-6' >
                    <div className='w-1/2' >
                        <FormHeading className=" " >{title}</FormHeading>
                    </div>
                    <div className='w-1/2 flex justify-end gap-5' >
                        <Button onClick={onCancel || (() => navigate(-1))} variant='secondary' >Cancel</Button>
                        <Button loading={loading} loadingText={"Submitting.."} onClick={onSubmit} className="cursor-pointer" variant={'primary'} >Submit</Button>
                    </div>
                </div>
            </div>
            <div className='mx-6 mt-1' >
                {children}
            </div>
        </div>
    )
}

export default FormPageLayout