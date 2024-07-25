import { HikingInformation } from "@/types/Hiking.type";
import React from "react";

const Information = ({ hiking }: { hiking: HikingInformation }) => {
  return (
    <>
      {hiking.content && (
        <div>
          <h6 className="ml-4 text-green-dark border-b-2 border-b-green-dark w-fit font-bold pb-2">
            Description
          </h6>
          <p className="text-sm pt-3 border-t border-gray-300">
            {hiking.content.split("\n").map((line, index) =>
              index + 1 === hiking.content.split("\n").length ? (
                <React.Fragment key={index}>{line}</React.Fragment>
              ) : (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ),
            )}
          </p>
        </div>
      )}
      {hiking.indication && (
        <div>
          <h6 className="ml-4 text-green-dark border-b-2 border-b-green-dark w-fit font-bold pb-2">
            Indication
          </h6>
          <p className="text-sm pt-3 border-t border-gray-300">
            {hiking.content.split("\n").map((line, index) =>
              index + 1 === hiking.content.split("\n").length ? (
                <React.Fragment key={index}>{line}</React.Fragment>
              ) : (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ),
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Information;
