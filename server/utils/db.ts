import mongoose from 'mongoose';

const dbUrl: string = process.env.MONGODB_URI || '';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(dbUrl);

    console.log(`Database connected with ${connection.connection.host}`);
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
