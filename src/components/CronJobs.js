import { gql, useMutation } from '@apollo/client'
import moment from 'moment';
import React from 'react'

const DeleteEmails = gql`mutation deleteEmails($dateTime: timestamptz!) {
    delete_mails(where: {will_delete: {_lte: $dateTime}}) {
      affected_rows
    }
}`;

function CronJobs() {
    // Pass mutation to useMutation
    const [deleteEmail] = useMutation(DeleteEmails);

    const fn =()=>{
        var dateTime = moment().format()
        deleteEmail({variables:{dateTime}})
    }
    return (
        <>{fn()}</>
    )
}

export default CronJobs