import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourseAnalytics:builder.query({
           query: () => ({
            url: "get-courses-analytics",
            method:"GET",
            credentials: "include" as const,
           })
        }),
        getUsersAnalytics:builder.query({
            query: () => ({
             url: "get-user-analytics",
             method:"GET",
             credentials: "include" as const,
            })
         }),
         getOdersAnalytics:builder.query({
            query: () => ({
             url: "get-orders-analytics",
             method:"GET",
             credentials: "include" as const,
            })
         })
    })
})

export const {useGetCourseAnalyticsQuery, useGetUsersAnalyticsQuery, useGetOdersAnalyticsQuery} = analyticsApi