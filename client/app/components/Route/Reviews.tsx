import { styles } from '@/app/styles/style';
import Image from 'next/image';
import React from 'react';
import ReviewCard from '../Review/ReviewCard';

type Props = {};

const reviews = [
  {
    name: 'Mina Devkan',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    profession: 'Junior web developer',
    comment:
      'Join ghson elearning platform to learn all the programming languages fro web developemrnt.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, voluptates! Sunt itaque omnis ullam amet ratione fuga enim possimus corporis aliquam, ipsam reprehenderit harum optio repellat dolores maxime animi beatae',
  },
  {
    name: 'Mina lizz',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    profession: 'Junior web developer',
    comment:
      'Join ghson elearning platform to learn all the programming languages fro web developemrnt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, voluptates! Sunt itaque omnis ullam amet ratione fuga enim possimus corporis aliquam, ipsam reprehenderit harum optio repellat dolores maxime animi beatae',
  },
  {
    name: 'Mina Devkan',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    profession: 'Junior web developer',
    comment:
      'Join ghson elearning platform to learn all the programming languages fro web developemrnt.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, voluptates! Sunt itaque omnis ullam amet ratione fuga enim possimus corporis aliquam, ipsam reprehenderit harum optio repellat dolores maxime animi beatae',
  },
  {
    name: 'Mina lizz',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    profession: 'Junior web developer',
    comment:
      'Join ghson elearning platform to learn all the programming languages fro web developemrnt.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, voluptates! Sunt itaque omnis ullam amet ratione fuga enim possimus corporis aliquam, ipsam reprehenderit harum optio repellat dolores maxime animi beatae',
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require('../../../public/assets/business-img.PNG')}
            alt="buniness"
            width={500}
            height={500}
          />
        </div>
      
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are <span className="text-gradient">Our Strength</span>
            <br />
            See what they say about us
          </h3>
          <br />
          <p className={`${styles.label} ml-6`}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
            delectus molestias fuga eligendi nulla nam reprehenderit minima.
          </p>
        </div>
        <br />
        <br />
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:mt-[-60px] md:nth-child(6):mt-[-40px]">
        {reviews &&
          reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;
