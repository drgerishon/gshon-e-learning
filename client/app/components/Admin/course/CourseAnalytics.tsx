import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  LabelList,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Loader from '../../Loader';
import { useGetCourseAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { styles } from '@/app/styles/style';
type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading, error } = useGetCourseAnalyticsQuery({});

//   const analyticsData = [
//     { name: 'jun 2023', uv: 3 },
//     { name: 'July 2023', uv: 3 },
//     { name: 'Aug 2023', uv: 3 },
//     { name: 'Sep 2023', uv: 3 },
//     { name: 'Oct 2023', uv: 3 },
//     { name: 'Nov 2023', uv: 3 },
//     { name: 'Dev 2023', uv: 3 },
//   ];

  const analyticsData:any = []

  data && data.courses.last12Months.forEach((item:any) => {
      analyticsData.push({name: item.month, uv:item.count})
  })

  const minValue = 0;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen mt-8 ">
          <div className="mt-[50px">
            <h1 className={`${styles.title}`}>Course Analytics</h1>
            <p className={`${styles.label} flex flex-col items-center justify-center`}>Last 12 months analytics data</p>
          </div>
          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, 'auto']} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};
export default CourseAnalytics;
