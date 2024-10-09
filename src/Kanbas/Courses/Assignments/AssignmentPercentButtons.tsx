import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";


export default function AssignmentPercentButtons() {
  return (
    <div className="float-end d-flex align-items-center">
      <label className="wd-rounded-corners-all-around wd-border-superthin wd-border-solid ">40% of Total</label>
      <FaPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}