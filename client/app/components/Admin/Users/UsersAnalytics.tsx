import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import Loader from '../../Loader';
import { styles } from '@/app/styles/style';
type Props = {
  isDashboard?: boolean;
};

// const analyticsData = [
//   { name: 'January 2023', count: 400 },
//   { name: 'February 2023', count: 8200 },
//   { name: 'March 2023', count: 4033 },
//   { name: 'April 2023', count: 2039 },
//   { name: 'June 2023', count: 939 },
//   { name: 'July 2023', count: 345 },
//   { name: 'August 2023', count: 5433 },
//   { name: 'September 2023', count: 1233 },
//   { name: 'October 2023', count: 1353 },
//   { name: 'November 2023', count: 2555 },
//   { name: 'December 2023', count: 3455 },
// ];


const UsersAnalytics = ({ isDashboard }: Props) => {
    const { data, isLoading } = useGetUsersAnalyticsQuery({});
    const analyticsData:any = [];
    data && data.users.last12Months.forEach((item:any) => {
        analyticsData.push({name: item.month, count:item.count})
    })

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? 'mt-[50px]'
              : 'mt-[50px] dark:-[#111c43] shadow-sm pb-5 rounded-sm'
          } `}
        >
          <div className={`${isDashboard ? '!mt-8 mb-5' : ''}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && '!text-[20px] px-5 !text-start'
              }`}
            >
              Users Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5 flex flex-col items-center justify-center`} >
                Last 12 months analytics data
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              isDashboard ? 'h-[30vh]' : 'h-screen'
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? '100%' : '90%'}
              height={!isDashboard ? '50%' : '100%'}
            >
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersAnalytics;
