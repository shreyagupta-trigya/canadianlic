import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { contactRole, leadStatus, stages } from "@/features/utils/ListViewMenu"
import { addAccountToList, fetchAccounts } from "@/redux/slices/accounts/accountSlice"
import { addContactToList, fetchContacts } from "@/redux/slices/contacts/contactSlice"
import { addDealToList } from "@/redux/slices/deals/dealsSlice"
import { createAccount } from "@/services/crm/accountsApis"
import { createContact } from "@/services/crm/contactApi"
import { createDeal } from "@/services/crm/dealApi"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { pipeline } from "zod"

export function LeadsConvertForm({ details }) {
    const { data: contacts, error, fetchedContacts } = useSelector((state) => state.contacts.all);
    const { data: companies, fetched: fetchedCompanies } = useSelector((state) => state.accounts.all);


    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        amount: 0,
        dealName: details?.firstName + " " + details?.lastName,
        closingDate: "",
        stage: "qualification",
        pipeline: "standard",
        contactRole: "none"
    })

    useEffect(() => {
        if (!fetchedContacts) {
            dispatch(fetchContacts());
        }
    }, [fetchedContacts, dispatch]);

    useEffect(() => {
        if (!fetchedCompanies) {
            dispatch(fetchAccounts());
        }
    }, [fetchedCompanies, dispatch]);

    const getContactDetails = (ROWID) => {
        return contacts.find((item) => item.ROWID == ROWID)
    }
    const getCompanyDetails = (ROWID) => {
        return companies.find((item) => item.ROWID == ROWID)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let companyData = null; // store company response
        let contactData = null; // store contact response
        let dealPayload = null
        setLoading(true);
        createAccount({
            companyName: details.companyName,
            website: details.website,
            exchangeRate: details.exchangeRate,
            industry: details.industry,
            currency: details.currency,
        }).then((res) => {
            if (res.data.success) {
                companyData = res.data.company;
                dispatch(addAccountToList(companyData))
                return createContact({
                    firstName: details.firstName,
                    lastName: details.lastName,
                    company: res.data.company.ROWID,
                    email: details.email,
                    mobile: details.mobile,
                    phone: details.phone,
                    leadSource: details.leadSource,
                    // contactOwner: details.employees.ROWID,
                    street: details.street,
                    city: details.city,
                    state: details.state,
                    zipCode: details.zipCode,
                    country: details.country,
                })
            } else {
                toast.warning(res.data.message);
            }
        }).then((res) => {
            if (res.data.success) {
                contactData = res.data.contact;
                dispatch(addContactToList(contactData))
                dealPayload = {
                    dealName: formData.dealName,
                    amount: formData.amount,
                    stage: formData.stage,
                    pipeline: formData.pipeline,
                    exchangeRate: details.exchangeRate,
                    currency: details.currency,
                    leadSource: details.leadSource,
                    contactOwner: contactData.ROWID,
                    companyOwner: companyData.ROWID,
                    phone: details.phone,
                    email: details.email,
                    streetAddress1: details.street,
                    zipCode: details.zipCode,
                    cityDistrict: details.city,
                    state: details.state,
                    // dealOwner: details.employees.ROWID,
                    mobile: details.mobile,
                }
                return createDeal(dealPayload)
            } else {
                toast.warning(res.data.message)
            }
        }).then((res) => {
            if (res.data.success) {
                toast.success('Lead converted successfully')
                navigate('/crm/deals')
                dispatch(addDealToList({ ...dealPayload, contact: getContactDetails(contactData.ROWID), company: getCompanyDetails(companyData.ROWID), ...res.data.deals }))
            } else {
                toast.warning(res.data.message);
            }
        })
            .catch((err) => {
                toast.error(err?.response?.data?.message || err?.message || "Error Occured!")
            }).finally(() => {
                setLoading(false);
            })
    }
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className={'w-full'} variant="outline">Convert</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>Convert Lead</DialogTitle>
                        {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <p>Create a New Company : <span className="font-bold" >{details?.companyName || "NA"}</span></p>
                            <p>Create a New Contact : <span className="font-bold" >{details?.firstName + " " + details?.lastName || "NA"}</span></p>
                            <div className="flex items-center gap-3 mt-3">
                                <Checkbox onCheckedChange={() => setShowForm(!showForm)} id="terms" />
                                <Label htmlFor="terms">Create a New Opportunity for this Company</Label>
                            </div>


                        </div>
                        {showForm && <div className="flex flex-col gap-y-3" > <div className="grid gap-3">
                            <Label >Amount</Label>
                            <Input type={'number'} name="amount" placeholder='Amount' />
                        </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Opportunity Name</Label>
                                <Input value={formData.dealName} id="username-1" type='text' name="dealName" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Closing Date</Label>
                                <Input id="username-1" type='date' name="dealName" defaultValue={details?.leadName} />
                            </div>
                         
                        </div>}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button loading={loading} onClick={handleSubmit} type="submit">Convert</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
