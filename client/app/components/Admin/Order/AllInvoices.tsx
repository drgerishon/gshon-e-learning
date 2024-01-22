import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Toolbar } from '@mui/material';
import { useTheme } from 'next-themes';
import Loader from '../../Loader';
import { format } from 'timeago.js';
import { useGetAllOrdersQuery } from '@/redux/features/orders/ordersApi';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';
import { useGetALLCoursesQuery } from '@/redux/features/courses/courseApis';
import { AiOutlineMail } from 'react-icons/ai';
import { Dashboard, DataThresholdingSharp } from '@mui/icons-material';

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const [orderData, setOrderData] = useState<any>([]);
  const { data, isLoading, error } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllUsersQuery({});
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (data && data.orders) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user._id === item.userId
        );
  
        const course = coursesData?.courses.find(
          (course: any) => course._id === item.courseId
        );
  
        return {
          ...item,
          username: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: 'ksh' + course?.price,
        };
      });
      console.log("temp",temp);
      setOrderData(temp);
    }
  }, [coursesData, data, usersData]);
  
  const columns: any = [
    { field: 'id', headerName: 'ID', flex: 0.3 },
    { field: 'userName', headerName: 'Name', flex: isDashboard ? .6 : .5 },
    ...(isDashboard
      ? [
       
      ]
      : [
        { field: 'userEmail', headerName: 'Email', flex: 1 },
        { field: 'title', headerName: 'Course Tile', flex: 1 },
        ]),
    { field: 'price', headerName: 'Price', flex: 0.5 },
    ...(isDashboard
      ? [{ field: 'createdAt', headerName: 'Created At', flex: 0.5 }]
      : [
          {
            field: ' ',
            headerName: 'Email',
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.userEmail}`}>
                  <AiOutlineMail
                    className="dark:text-white text-black"
                    size={10}
                  />
                </a>
              );
            },
          },
        ]),
  ];

  //   rows

  const rows: any = [
    {
      id: 1,
      userName: 'Gerishon Kungu',
      userEmail: 'gerishonk@gmail.com',
      title: 'Node js and next js development',
      price: 'ksh 8800',
      createdAt: '2 days ago',
    },
    {
      id: 2,
      userName: 'Naomi Kungu',
      userEmail: 'naoimi@gmail.com',
      title: 'Node js and next js development',
      price: 'ksh 4900',
      createdAt: '2 days ago',
    },
    {
      id: 3,
      userName: 'Alice Kungu',
      userEmail: 'lizz@gmail.com',
      title: 'Node js and next js development',
      price: 'ksh 400',
      createdAt: '2 days ago',
    },
    {
        id: 4,
        userName: 'Harrison Kungu',
        userEmail: 'gerishonk@gmail.com',
        title: 'Node js and next js development',
        price: 'ksh 5000',
        createdAt: '2 days ago',
      },
  ];

  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        createdAt: format(item.createdAt),
      });
    });

  return (
    <div className={!isDashboard ? 'mt-[120px] ml-14' : 'mt-[0px]'}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? '0' : '40px'}>
          <Box
            m={isDashboard ? '0' : '48px 0 0 0 '}
            height={isDashboard ? '35vh' : '90vh'}
            overflow={'hidden'}
            sx={{
              '& MuiDataGrid-root': {
                border: 'none',
                outline: 'none',
              },
              '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-sortIcon': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-row': {
                color: theme === 'dark' ? '#fff' : '#000',
                borderBottom:
                  theme === 'dark'
                    ? '1px solid #ffffff30!important'
                    : '1px solid #ccc!important',
              },
              '& .MuiTablePagination-root': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none!important',
              },
              '& .name-column--cell': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: theme === 'dark' ? '#1F2A40' : '#F2F0F0',
              },
              '& .MuiDataGrid-footerContainer': {
                color: theme === 'dark' ? '#fff' : '#000',
                borderTop: 'none',
                backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
              },
              '& .MuiCheckbox-root': {
                color:
                  theme === 'dark' ? `#b7ebde" !important` : `#000 !important`,
              },
              '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                color: `#000 !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
              components={isDashboard ? {} : { Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;