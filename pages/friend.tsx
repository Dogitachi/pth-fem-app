import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "../app/axios";
import { useDispatch, useSelector } from "react-redux";
import { setMount } from "@/redux/reducers/TaskReducer";

interface Item {
  tgid: string;
  mount: number;
}
declare const window: any;

function Friend() {

  const user = "fourg_dh";
  // const user = useSelector((x: any) => x.TaskReducer.user);
  const [items, setItems] = useState<Item[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { data } = window.navigator;
  // const mount = useSelector((x: any) => x.TaskReducer.mount);
  const mount = 0;
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const res = await axios.post(
          "http://localhost:3003/friends",
          {
            user,
          }
        );
        if (res.data.items == undefined) setItems([]);
        else {
          setItems(res.data.items);
          
        }
      }
    };
    fetchData();
  }, [user]);

  const inviteLink = `https://t.me/Trytoplaythat_Arcade_bot?start=${user}\nLet's mine $TTPT together!`;
  const shareLink = `https://t.me/share/url?url=${encodeURIComponent(
    inviteLink
  )}`;
  function copyToClipboard() {  
    const copyContent = async () => {
      try {
        await window.navigator.clipboard.writeText(shareLink);
        // enqueueSnackbar("Invite link copied to clipboard!", { variant: "success" });
        
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
    copyContent();
  }
  const dispatch = useDispatch();
  const inviteBonus = () => {
    if(items.length === 0) {
      enqueueSnackbar("No point to claim.", { variant: "success" });

    }

    const func = async () => {
      const tmp = mount + items.length;
      await axios.put("http://localhost:3003/inviteclaim",
        {user, tmp}
      ).then((res: any) => {
          if(res.status === 200) 
          {
            console.log(res.data.rows[0])
            enqueueSnackbar(`${res.data.mount}`, { variant: "success" });
            dispatch(setMount(res.data[0].mount))
            enqueueSnackbar("Successfully claimed!", { variant: "success" });
          }
          else enqueueSnackbar("Claim Failed! Pleae try again.", { variant: "error" });
        })
        
    }

    func();
    const set = async () => {
      await axios.put("http://localhost:3003/invitebonus",
          {user}
        ).then(( res) => {
          if(res.status === 200) alert("success")
        })
    }
    set();
  }

  const handleInviteClick = async () => {
    // Generate the invite link
    copyToClipboard();
    // Show the invite link in a snackbar or modal

    // Copy the link to the clipboard

    // Open the share link in a new window
    window.open(shareLink, "_blank");
  };
  
  console.log(items)
  return (
    <>
      <div className="flex flex-col px-5 pt-[23px] rounded-t-3xl flex-1 h-0 overflow-auto">
        <div className="font-bold text-xl leading-7 text-white">
          Invite friends to earn more Points
          <br /> Already invited {items.length} friend
          <div className="w-full flex justify-between border-2 border-[#7D4DC2] p-5 my-6 rounded-lg text-white">
            <div className="flex justify-start items-center">
              <div className="font-bold text-2xl leading-7">{items.length}</div>
              <div className="font-semibold text-xs leading-5 pl-4">Points</div>
            </div>
            <div className="flex justify-end items-center px-5 py-1 bg-[#7D4DC2] rounded-lg text-xs leading-6" onClick={inviteBonus}>
              Claim
            </div>
          </div>
        </div>
        
        
        <div className="my-5 font-bold text-lg leading-7 text-white">{data}</div>
        
        {items.length === 0 ? (
          <>
            <div className="font-medium text-[14px]  mt-3 mb-[25px] text-gray-400">
              You haven&apos;t invited anyone yet
            </div>
            <img className="w-[186px] mx-auto" src="/imgs/no.png" /> 
          </>
        ) : (
          <div className="mb-[150px]">
            <div className="text-white font-bold text-2xl">Friends You Invited</div>
            {items.map((item, index) => ( 
              
              <div key={index}>
                <div className="flex justify-between items-center mt-2 border border-[#7D4DC2] p-2 px-4 mx-4 rounded-lg">
                  <div className="text-white text-lg">{index + 1}</div>
                  <div className="ml-4 text-white text-baw">{item.tgid}</div>
                  <div className="flex items-center space-x-1"><img
                    src="/images/dollar-icon.svg"
                    alt="dollar"
                    className="w-4 h-4 ml-6"
                  ></img><span>x</span>
                  <div className="ml-2 text-white">{item.mount}</div></div>
                </div>
              </div>
            ))}
          </div>
          
        )}
        <div className="flex justify-center space-x-2 mt-8 mb-20">
          <button
            className="mt-5 text-center text-lg leading-6 font-semibold text-white w-full bg-gradient-to-r from-[#7D4DC2] from-40% to-[#008BD8] to-90% p-5 rounded-lg  shadow-md"
            onClick={handleInviteClick}
          >
            Invite a friend
          </button>
          <button className="mt-5 p-5 bg-gradient-to-r from-[#008BD8] from-40% to-[#7D4DC2] to-90% rounded-[12px] disabled:cursor-not-allowed" onClick={copyToClipboard}>
            <img  src="/images/copy.svg" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Friend;
