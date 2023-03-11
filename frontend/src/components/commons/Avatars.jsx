import React from "react";
import ReactTooltip from "react-tooltip";

const Avatars = ({ itinerary }) => {
  return (
    <>
      <div className="px-6 flex items-center flex-no-wrap  ">
        {itinerary?.map((item) => (
          <div
            key={item.creator?.name}
            className="w-12 h-12 bg-cover bg-center rounded-md "
          >
            <ReactTooltip
              id="registerTip"
              place="top"
              type="dark"
              arrowColor="#096fea"
              getContent={(dataTip) =>
                `<div style="color:#0072fb" align="center"> <FONT SIZE=3> <b/>  ${dataTip} </font></div>  `
              }
              html={true}
            ></ReactTooltip>

            <img
              data-tip={item?.itinerary}
              data-tips={item.creator.name}
              data-for="registerTip"
              src={item.creator?.image}
              alt={item.creator?.name}
              className="h-full w-full overflow-hidden object-cover rounded-full border-2 border-white dark:border-gray-700 shadow"
            />
          </div>
        ))}
      </div>
    </>
  );
};
export default Avatars;
