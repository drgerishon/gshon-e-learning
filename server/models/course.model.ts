import mongoose , {Document, Model, Schema} from "mongoose";

export interface IComment extends Document {
    user:Object;
    comment:string;
}

export interface IReview extends Document {
    user:Object;
    rating:number;
    comment:string;
    commentReplies: IComment[];
}
interface ILink extends Document{
    title:string;
    url:string;
}
interface ICourseData extends Document{
    title:string;
    description:string;
    videoUrl:string;
    videoThumbnail:object;
    videoSection:string;
    videoLength:number;
    videoPlayer:string;
    links:ILink[];
    suggestion:string;
    question:IComment[];
}

interface ICourse extends Document{
    name:string;
    description?:string;
    price:number;
    estimatedPrice?:number;
    thumbnail:object;
    tags:string;
    level:string;
    demoUrl:string;
    benefits:{title:string}[];
    prerequisites:{title:string}[];
    reviews:IReview[];
    courseData:ICourseData[];
    ratings?:number;
    purchased?:number;
}

const reviewSchema = new Schema({
    
})