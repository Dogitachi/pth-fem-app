"use Client";

import YoutubeCard from "@/app/components/common/youtubecard";
import axios from "@/app/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setMount } from "@/redux/reducers/TaskReducer";

function Point() {
  const allTasks = useSelector((x: any) => x.TaskReducer.tasks)
  const extraTasks = allTasks?.filter((x: any) => x.extra === true)
  const user = useSelector((x: any) => x.TaskReducer.user);
  const mount = useSelector((x:any) => x.TaskReducer.mount);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let id = 0;
    const calc = async () => {
      let sum = 0;
      const {data} = await axios.get("https://ttpt-app-be.onrender.com/users");
      if(data.length) {
        for(let i = 0 ; i < data.length ; i ++) {
          sum += data[i].mount;
          console.log(data[i])
          if(user === data[i].tgid) {
            dispatch(setMount(data[i].mount))
          }
        }
        setTotal(sum);
      }
    }
    calc();
    // const func = async () => {
    //   const {data} = await axios.get(`https://ttpt-app-be.onrender.com/users/${id}`);
    //   if(data.length !== 0) dispatch(setMount(data[0].mount));
    // }
    // func();
  }, [])
  const handleImageLoad = () => {
  }

  return (
    <div className="flex-col">
      <div className=" text-white text-base p-3">Total Community Point : {total}</div>
      <div className="w-full flex flex-col space-y-4 items-center ">
        <div className="w-24 h-24 p-6 bg-[#002A65] border-2 border-[#000B6E] rounded-full flex flex-col justify-center items-center">
          <Image
            width={98}
            height={98}
            className="w-[98px] h-[98px]"
            src="/imgs/logo.png"  
            alt="logo.png"
          />
        </div>
        <div className="text-white text-2xl">TTPT</div>
        <div className="flex space-x-1 text-[#818181]">
          <IoWalletOutline className="w-[18px] h-[16px]" />
          <div className="text-sm">Balance</div>
        </div>
        <div className="relative">
          <div className=" w-full h-full rounded-[999px] bg-[#DA01AA] blur-3xl absolute top-0 left-0 z-[-1]"></div>
          <div className="font-bold text-[53px] text-white">
            <span>{mount}</span>
          </div>
        </div>
        <div className="font-semibold text-sm text-white">Points</div>
      </div>
      <div className="px-5 py-10">
      {extraTasks.map((x: any, i: number) =>
          <YoutubeCard
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
      {/* <Link
          href={"earn"}
          className="mt-20 p-3 font-semibold text-[17px] text-white flex justify-center items-center w-full py-5 bg-gradient-to-r from-[#7D4DC2] to-[#008AD8] shadow-md rounded-lg hover:curpointer active:shadow-none"
        >
          Watch To Earn
        </Link> */}
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

export default Point;
