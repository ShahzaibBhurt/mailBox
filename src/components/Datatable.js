import DataTable from 'react-data-table-component';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { useEffect, useState } from 'react';
import { gql, useSubscription } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
const sortIcon = <ArrowDownward />;

const emails = gql`subscription EmailList($email:String!, $page:String!) {
    mails(where: {_and:{receiver:{_eq: $email}, folder:{_eq: $page}}}) {
        receiverData {
            first_name
            last_name
        }
        msg
        id
        subject
    }
  }`;
const sentEmails = gql`subscription EmailList($email:String!) {
    compose_emails(where: {sender:{_eq: $email}}) {
        receiverData {
            first_name
            last_name
        }
        msg
        id
        subject
    }
  }`;
/*
const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<div className='input-group w-25 w-auto'>
		<input
			id="search"
			type="text"
			placeholder="Filter By Name"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
            className='form-control'
		/>
		<button className='btn btn-primary' type="button" onClick={onClear}>
			X
		</button>
	</div>
);*/

function Datatable({columns, page, response}) {
    const navigate = useNavigate()
    const [pending, setPending] = useState(true);
    const [data, setData] = useState([])
    const email = localStorage.getItem("email")
    
    // geting emails
    useSubscription((page === 'sent')?sentEmails:emails ,{
        variables:(page === 'sent')?{email}:{email, page},
        onSubscriptionData: (data)=>{
            if(page === 'sent'){
                setData(data.subscriptionData.data.compose_emails)
            }else{
                setData(data.subscriptionData.data.mails)
            }
        }
    });

    useEffect(()=>{
        if(data.length)
        setPending(false);
    },[data])// eslint-disable-line react-hooks/exhaustive-deps

   // const [filterText, setFilterText] = useState('');
	//const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	//const filteredItems = data.filter(item => (item.name && item.name.toLowerCase().includes(filterText.toLowerCase())))
    //|| (item.email && item.email.toLowerCase().includes(filterText.toLowerCase())));
/*
	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);*/

    const handleRowClick= event => {
        navigate('/read', {state:event})
    };
    const handleChange = (state) => {
        response(state.selectedRows);
      };
    return (
        <>
            <DataTable
            columns={columns}
            data={/*filteredItems*/ data}
            selectableRows//={selectable} 
            onSelectedRowsChange={handleChange}  
            pagination
            selectableRowsComponent={Checkbox}
            sortIcon={sortIcon}
            highlightOnHover
            onRowDoubleClicked={handleRowClick}
            //subHeader
			//subHeaderComponent={subHeaderComponentMemo}
            //progressPending
            progressPending={pending}
            responsive
            striped
        />
        </>
    );
};
export default Datatable