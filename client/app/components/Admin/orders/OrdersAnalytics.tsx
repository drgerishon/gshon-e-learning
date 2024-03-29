import { useGetOdersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React from 'react';
import Loader from '../../Loader';
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
  LineChart,
  CartesianGrid,
  Line,
} from 'recharts';
import { styles } from '@/app/styles/style';

// const analyticsData = [
//   { name: 'page A', count: 3000 },
//   { name: 'page B', count: 4000 },
//   { name: 'page C', count: 1000 },
//   { name: 'page D', count: 800 },
//   { name: 'page E', count: 4000 },
//   { name: 'page F', count: 5000 },
//   { name: 'page G', count: 200 },
// ];
type Props = {
  isDashboard: boolean;
};

const OrdersAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading, error } = useGetOdersAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.orders.last12Months.forEach((item: any) => {
      analyticsData.push({ month: item.month, count: item.count });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={isDashboard ? 'h-[30vh]' : 'h-screen'}>
          <div
            className={isDashboard ? 'mt-[0px] pl-[40px] mb-2' : 'mt-[50px]'}
          >
            <h1
              className={`${
                styles.title
              } flex flex-col items-center justify-center ${
                isDashboard && '!text-[20px]'
              } px-5 !text-start`}
            >
              Order Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5 flex flex-col items-center justify-center`}>
                Last 12 months analytics data
              </p>
            )}
          </div>

          <div
            className={`w-full ${
              !isDashboard ? 'h-[90%]' : 'h-full'
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? '100%' : '90%'}
              height={isDashboard ? '100%' : '50%'}
            >
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type="monotone" dataKey="count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersAnalytics;
