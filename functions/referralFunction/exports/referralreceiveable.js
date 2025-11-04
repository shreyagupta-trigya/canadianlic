//Referral informations
module.exports = [
    {
        id: "firstName",
        title: "First Name"
    },
    {
        id: "referredBy",//not in db 
        title: "eferred By"
    },
    {
        id: "email",
        title: "Email"
    },
    {
        id: "phone",//not in db 
        title: "Cell"
    },
    {
        id: "referralOwner",
        title: "Referral Owner"
    },
    {
        id: "currency",
        title: "Currency"
    },
    {
        id: "exchangeRate",
        title: "Exchange Rate"
    },
    {
        id: "EmailOptOut",
        title: "Email Opt Out"
    }
]

//Referral Scoreboard--------------------------------

//subform 
module.exports = [
    {
        id: "numberOfReferralScoreGridData",
        title: "Referral Scoreboard"                                 //Referral Level,	Referrals till Date - Life,	Referrals till Date - Living Benefits,	Referrals till Date - Travel,	Referrals till Date - Health & Dental,	Referral Payout till Date - Life,	Referral Payout till Date - Living Benefits,	Referral Payout till Date - Travel,	Referral Payout till Date - Health & Dental,
    },
]


//Address Information-------------------------------------
module.exports[
    {
        id: "street",//not matched with frontend ---> in db as streetName
        title: "Street Name"
    },
    {
        id: "postalCode",
        title: "Postal Code"
    },
    {
        id: "houseNumber",//not in db 
        title: "House or Apt Number"
    },
    {
        id: "province",
        title: "Province"
    },
    {
        id: "city",
        title: "City"
    },
    {
        id: "Country",//not matched with frontend ------>in db as country
        title: "Country"
    }
]