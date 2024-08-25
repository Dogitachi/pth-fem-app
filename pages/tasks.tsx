"use Client";

import Card from "@/app/components/common/card";
import { setDone } from "@/redux/reducers/TaskReducer";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "@/app/axios";

function Tasks() {
  const dispatch = useDispatch();
  const allTasks = useSelector((x: any) => x.TaskReducer.tasks)

  const mainTasks = allTasks?.filter((x: any) => x.extra === false)
  const [cnt, setCnt] = useState(mainTasks.length);
  const done = useSelector((x: any) => x.TaskReducer.done);
  const user = useSelector((x: any) => x.TaskReducer.user);
  useEffect(() => {
    const func = async () => {
      await axios.post("https://ttpt-app-be.onrender.com/getsocial", {user : user}).then((res) => {
        if(res.status === 200) console.log(res.data) 
      })
    }
  })
  // useEffect(() => {
  //   const func = async () => {
  //     await axios.get("https://ttpt-app-be.onrender.com/users")
  //   }
  // })

  const handleImageLoad = () => {
    // setImagesLoaded((prev) => {
    //     console.log(prev)
    //     const newCount = prev + 1;
    //     console.log(newCount)
    //     if (newCount === totalImages) {
    //         setLoading(false);
    //     }
    //     return newCount;
    // });
  };
  return (
    <div className="flex-col space-y-10 text-white">
        <div className="px-5">
          <div className="flex justify-between px-2">
            <div className="font-bold tracking-[8%] text-sm leading-[15px]">
              COMPLETE
              <br /> TASTS
              <br /> TOEARN MORE
              <br /> POINTS AND
              <br /> INVITATION
            </div>
            <Image
              width={138}
              height={93}
              className="w-[138px] h-[93px]"
              src="/imgs/gift.png"
              alt="gift.png"
            />
          </div>
          <div className="w-full border-2 border-[#7D4DC2] flex justify-between rounded-xl px-5">
            <div className="w-1/2 pt-2 pb-1 px-2">
              <div className="">Complete {done>0 ? done : 0}/{cnt}</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{width:done*100/cnt + "%"}} ></div>
              </div>
            </div>
            <div className="w-1/2 px-2 pt-2 pb-1 font-semibold text-[34px] leading-[43px] border-l-2 border-[#7D4DC2] rounded-xl flex items-center justify-center">
              {done >0 ? "+" + done : 0} <span className="text-[13px] leading-9 pl-2">Points</span>
            </div>
          </div>
        </div>
      <div className="h-[60vh]">
        <div className="py-7 px-5 text-white rounded-t-3xl h-full overflow-auto ">
          {mainTasks.map((x: any, i: number) =>
            <Card
              key={i}
              title={x.title}
              description={x.description}
              price={x.price}
              link={x.link}
              img={x.image}
              onLoad={handleImageLoad}
            />
          )}
          
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // Fetch or define your static props here
  return {
    props: {
      data: {}, // Example data
    },
  };
}

export default Tasks;
