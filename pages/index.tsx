"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux"
import axios from "axios";
import { setUser, setUserId } from "@/redux/reducers/TaskReducer";



export default function Index() {
  const dispatch = useDispatch();
  const user = useSelector((x: any) => x.TaskReducer.user);
  const router = useRouter();
  const userFromQuery = router.query.user?.toString() || "";
  // const userFromQuery = "fourg_dh";
  useEffect(() => {
    
    if (userFromQuery) {
      const func = async () => {
        const { data } = await axios.post(
          "https://ttpt-app-be.onrender.com/users",
          {
            user: userFromQuery,
          }
        );
        dispatch(setUser(data.user));
      };
      func();
    }
  }, [userFromQuery]);
  return (
    <>
    <div className=" pb-10">
      <div className="flex flex-col justify-center items-center p-4">
        <div className="py-12 px-10 flex flex-col items-center">
          <Image width={104} height={112} className="w-26 h-28" src="/imgs/logo.png" alt="logo.png" />
          <div className="font-semibold text-[32px] leading-[43px] text-center text-white bg-[#00204D] p-5 my-10 rounded-lg">
            Welcome to TRYTOPLAYTHAT
          </div>
        </div>
        <Link
          href={"point"}
          className="mt-20 p-3 font-semibold text-[17px] text-white flex justify-center items-center w-full py-5 bg-gradient-to-r from-[#7D4DC2] to-[#008AD8] shadow-md rounded-lg hover:curpointer active:shadow-none"
        >
          Continue
        </Link>
      </div>
    </div>
    </>
  );
};
