import { useGetSingleCourseQuery } from '@/redux/features/courses/courseApis';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Footer/Footer';
import CourseDetails from './CourseDetails';
import {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
  useGetStripePublishablekeyQuery,
} from '@/redux/features/orders/ordersApi';
import { loadStripe } from '@stripe/stripe-js';

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState('Login');
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetSingleCourseQuery(id);
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishableKey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.course.name + ' - ELearning'}
            description={
              'Elearning is a programming community which is developed by Gerishon fro helping programmers with excellent coding resourses and lessons'
            }
            keywords={data?.course?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {stripePromise && (
            <CourseDetails
              data={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
