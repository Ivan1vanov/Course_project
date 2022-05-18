import React, { useEffect, useState } from 'react'
import styles from './admin.module.scss'
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersAction, blockUserAction, activeUserAction, adminRightsAction, userRightsAction, deleteUserAction } from '../../store/actions/userAction';
import UserTable from '../../Components/UserTable/UserTable';
import { useNavigate } from 'react-router-dom';
import {  } from "react-icons/ai";

const AdminPage = () => {
    const [categoryIds, setCategoryIds] = useState<any>([]);
    const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1)

    const navigate = useNavigate()
    const dispatch: any = useDispatch()
    const {users, numberOfPages} = useSelector((state: any) => state.user)

    useEffect(() => {
        dispatch(getUsersAction(page))
    }, [page])




    const handleUserIDs = (e: any) => {

		const currentCategoryChecked: string = e.target.value;
		const allCategoriesChecked = [...categoryIds];
		const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked);

		let updatedCategoryIds;
		if (indexFound === -1) {
			// add
			updatedCategoryIds = [...categoryIds, currentCategoryChecked];
			setCategoryIds(updatedCategoryIds);
		} else {
			// remove
			updatedCategoryIds = [...categoryIds];
			updatedCategoryIds.splice(indexFound, 1);
			setCategoryIds(updatedCategoryIds);
		}

       
	};

    const handleSelectAll = (e: React.MouseEvent<HTMLElement>) => {
        setIsCheckAll(!isCheckAll)
        if(!isCheckAll) {
            users?.map((user: any) => {
                console.log(user._id)
                setCategoryIds((prevVals: any) => [...prevVals, user._id])
            })
        } else {
            setCategoryIds([])
        }
      };

      const blockeSelectedUsers = (e: React.MouseEvent<HTMLElement>) => {
        console.log(categoryIds)
        categoryIds?.map((userId: string, index: number) => {
            dispatch(blockUserAction(userId, navigate))
        })
    }
    
    const activeSelectedUsers = (e: React.MouseEvent<HTMLElement>) => {
        categoryIds?.map((userId: string, index: number) => {
            dispatch(activeUserAction(userId, navigate))
        })
    }

    const adminRightsSelectedUsers = (e: React.MouseEvent<HTMLElement>) => {
        categoryIds?.map((userId: string, index: number) => {
            dispatch(adminRightsAction(userId))
        })
    }

    const userRightsSelectedUsers = (e: React.MouseEvent<HTMLElement>) => {
        categoryIds?.map((userId: string, index: number) => {
            dispatch(userRightsAction(userId))
        })
    }

    const deleteSelectedUsers = (e: React.MouseEvent<HTMLElement>) => {
        categoryIds?.map((userId: string, index: number) => {
            dispatch(deleteUserAction(userId))
        })
    }

    const {color} = useSelector((state: any) => state.settings)
    const isWhite: boolean = color === 'white'
    
  return (
    <div className={isWhite ? styles.whiteMode : styles.darkMode}>
         <div>
          <div className={styles.actionContainer}>
          <Button 
            variant="light"
            onClick={handleSelectAll}
            >
            SELECT ALL :
        </Button> 

            {categoryIds.length > 0 && (
                <>
                <div className={styles.actionButtonAll}>
                <Button 
                variant="success"
                onClick={activeSelectedUsers}
                >
                ACTIVE
                </Button> 
                </div>

            <div className={styles.actionButtonAll}>
                <Button 
                variant='danger'
                onClick={blockeSelectedUsers}
                >
                BLOCK 
            </Button> 
            </div>

            <div className={styles.actionButtonAll}>
                <Button 
                variant='warning'
                onClick={adminRightsSelectedUsers}
                >
                ADMIN RIGHTS
            </Button> 
            </div>

            <div className={styles.actionButtonAll}>
                <Button 
                variant='primary'
                onClick={userRightsSelectedUsers}
                >
                USER RIGHTS
            </Button> 
            </div>

            <div className={styles.actionButtonAll}>
      <Button variant='danger' 
      onClick={deleteSelectedUsers}
      >
          DELETE 
          </Button>
          
         </div>

            </>
            )}
       

        </div>
    <div>
      
        <div>
    <Table striped bordered hover size="sm">
  <thead className="thead-dark">
    <tr>
    <th scope="col">Lp.</th>
      <th scope="col">id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Last Login</th>
      <th scope="col">Status</th>
      <th scope="col">Rights</th>
    </tr>

  </thead>  
    {users?.map((user: any, index: number) => (
         <tbody  key={index}>
        <tr>
        <th scope="row">{index+1}
        <input
            type='checkbox'
            name='category'
            value={user._id}
            id='flexCheckChecked'
            checked={categoryIds.includes(user._id)}
            onChange={handleUserIDs}
            />
        </th> 
        <UserTable user={user}  lp={index + 1}/>
        </tr>
        </tbody>
    ))}
  
</Table>

    </div>
    </div>

<div className={styles.paginationContainer}>
        <div className={styles.paginationPanel}>
        <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>Back</Button>
        <div>
            1/{numberOfPages}
        </div>
        <Button disabled={page >= numberOfPages} onClick={() => setPage(page + 1)}>Next</Button>
        </div>
</div>

    </div>
    </div>
  )
}

export default AdminPage