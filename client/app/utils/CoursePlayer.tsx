import React , {FC, useEffect, useState} from 'react'
import axios from 'axios'

type Props = {
    videoUrl:string;
    title:string;
}

const CoursePlayer:FC<Props> = ({videoUrl, title}) => {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: "",
    })
    const fetchVideo = async () => {
        try {
          const response = await axios.post("http://localhost:8000/api/v1/getVdoCipherOtp", {
            videoId: videoUrl,
          });
          setVideoData(response.data);

        } catch (error) {
          console.error("Error fetching video:", error);
        }
      };
      
      
      console.log("videoData",videoData.otp)
      
    useEffect(() => {
        fetchVideo();
    },[videoUrl])


  return (
    <div style={{position:"relative",paddingTop:"56.25%", overflow:"hidden"}}>
        {videoData.otp && videoData.playbackInfo !== "" && (
           <iframe src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=S3Pa6VaO4dxECQHc`}
           style={{
            position: "absolute",
            top:0,
            left:0,
            border: 0,
            width:"100%",
            height: "100%",
           
           }}
           allowFullScreen={true}
           allow='encrypted-media'
           >
           </iframe>
        )}
    </div>
  )
}

export default CoursePlayer