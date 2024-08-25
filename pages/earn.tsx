"use Client";

import Card from "@/app/components/common/card";
import YoutubeCard from "@/app/components/common/youtubecard";
import { useSelector } from "react-redux";

function Earn() {
  const allTasks = useSelector((x: any) => x.TaskReducer.tasks)
  const extraTasks = allTasks?.filter((x: any) => x.extra === true)
  const user = useSelector((x: any) => x.TaskReducer.user);

  const handleImageLoad = () => {
  }

  return (
    <div className="flex-1 h-0">
      <div className="relative py-[30px] mb-[90px] px-5 text-white  h-full overflow-auto">
        <div className="absolute top-0 left-0 w-full h-full blur-xl">s</div>
        <div className="font-bold text-[42px] text-center text-white">Learn To Earn</div>
        <div className="pb-[26px] font-medium text-[14px] text-center text-[#6E6E6E]">Listen and learn</div>
        {/* <Card
            title="Telegram Channel"
            price="10000"
            link="https://t.me/MagicVipClub"
            img="/images/telegram.svg"
            onLoad={handleImageLoad}
          ></Card> */}
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

export default Earn;
