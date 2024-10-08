import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";


export default function AssignmentPercentButtons() {
  return (
    <div className="float-end d-flex align-items-center">
        <p className="wd-rounded-corners-all-around wd-border-thin wd-border-solid ">40% of Total</p>
      <FaPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}