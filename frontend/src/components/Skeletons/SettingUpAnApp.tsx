import { useEffect, useState } from "react";

function SettingUpAnApp(props: any) {
  const [noOfEllipsis, setNoOfEllipsis] = useState("...");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNoOfEllipsis((prev) => {
        let newString = "";
        if (prev === ".") newString = "..";
        if (prev === "..") newString = "...";
        if (prev === "...") newString = ".";
        return newString;
      });
    }, 750);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="font-semibold text-xl flex items-center min-w-[100px]:">
        <h1>Initializing</h1>
        <h1>{noOfEllipsis}</h1>
      </div>
    </div>
  );
}

export default SettingUpAnApp;
