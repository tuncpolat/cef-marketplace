import { useState } from "react";
import {
  QuestionMarkCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";

export default function QuestionMarkLabel({ label, info }) {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };
  return (
    <label
      htmlFor="first-name"
      className="flex text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
    >
      <div>{label}</div>

      <div className="relative flex-grow">
        <QuestionMarkCircleIcon
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          className="h-5 w-5 text-gray-400 ml-2"
          aria-hidden="true"
        />
        {hover ? (
          <div
            className="absolute top-2 left-5 rounded-md bg-blue-50 p-4 w-500"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
          >
            <p className="text-sm text-blue-700">{info}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </label>
  );
}
