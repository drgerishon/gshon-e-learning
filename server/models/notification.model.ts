import mongoose, { Document, Model, Schema } from 'mongoose';

interface INotitification extends Document {
  title: string;
  message: string;
  status: string;
  userId: string;
}

const notificationSchema = new Schema<INotitification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'unread',
    },
  },
  { timestamps: true }
);

const NotificationModel:Model<INotitification> = mongoose.model("Notification", notificationSchema)
export default NotificationModel