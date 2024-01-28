import { useEffect, useRef, useState } from "react";

type recommendation = {
  title: string;
  link: string;
  thumbnail: string;
  duration?: string;
  index: number;
};

async function fetchData() {
  const response = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCaHOVxh101BTwseGfVuGduw",
  );
  const result = await response.json();
  return result.items;
}

export default function NewsYouTube() {
  const mainVideoRef = useRef<HTMLIFrameElement>(null);
  const [mainVideoSrcIndex, setMainVideoSrcIndex] = useState(0);
  const [recommendation, setRecommendation] = useState<recommendation[]>([]);
  const [result, setResult] = useState<recommendation[]>([]);

  useEffect(() => {
    const asyncFetchDataMainVideo = async () => {
      try {
        const fetchedData = await fetchData();
        setResult(() => fetchedData);
        const iframe = mainVideoRef.current;
        const link = fetchedData[mainVideoSrcIndex].link;
        const id = link.substring(link.indexOf("=") + 1);

        if (iframe)
          iframe.setAttribute("src", `https://youtube.com/embed/${id}`);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    asyncFetchDataMainVideo();
  }, [mainVideoSrcIndex]);

  useEffect(() => {
    const asyncFetchDataRecommendation = async () => {
      try {
        // const result = await fetchData();
        const recommendationArray = result
          .slice(1, 5)
          .map((item: recommendation, index: number) => {
            return {
              title: item.title,
              link: item.link,
              thumbnail: item.thumbnail,
              index: index + 1,
              // duration: item.duration
            };
          });

        setRecommendation(recommendationArray);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    asyncFetchDataRecommendation();
  }, [result]);

  function handleRecommendationClick(index: number): void {
    setMainVideoSrcIndex(() => index);
  }

  // const iframe = mainVideoRef.current;
  // const link = result[mainVideoSrcIndex].link;
  // const id = link.substring(link.indexOf("=") + 1);
  // setMainVideoSrc(() => `https://youtube.com/embed/${id}`);
  // if (iframe) iframe.setAttribute("src", mainVideoSrc);

  return (
    <div className="my-8 rounded-md bg-slate-50 px-8 py-4 shadow-md transition-shadow hover:shadow-lg lg:grid lg:grid-cols-3 lg:px-12 lg:py-6">
      <div className="relative lg:col-span-2 lg:gap-6">
        <p className="px-2 text-center text-2xl font-semibold tracking-tight text-sky-700 lg:text-left">
          News
        </p>
        <iframe
          title="YouTube video player"
          allowFullScreen
          id="mainVideo"
          className="mx-auto my-6 aspect-video h-max w-full rounded-lg shadow-md shadow-slate-300 hover:shadow-lg"
          ref={mainVideoRef}
        ></iframe>
      </div>
      <div className="col-span-1 lg:ml-10 lg:py-4">
        <p className="pb-2 text-center text-xl font-medium tracking-tight text-sky-700">
          Recommendation
        </p>

        {recommendation.map(({ title, link, thumbnail, duration, index }) => (
          <div
            onClick={() => handleRecommendationClick(index)}
            className="recommendations my-4 flex cursor-pointer rounded-md bg-slate-50 p-4 text-slate-800 shadow-md hover:shadow-xl"
            key={link}
          >
            <img className="h-12 w-16 rounded-md" src={thumbnail} />
            <div className="ml-4 px-2 ">
              <h1 className="text-xs">{title}</h1>
              <p className="text-xs">{duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function asyncFetchData() {
  throw new Error("Function not implemented.");
}
