import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function QuestionIndivButtons({
  questionId,
  quizId,
  courseId,
  deleteQuestion, // Add courseId as a prop
}: {
    questionId: string;
    quizId: string; // Define courseId prop type
    courseId: string;
    deleteQuestion: (quizId: string, questionId: string) => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="float-end">
      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={() => deleteQuestion(quizId, questionId)}
      />
      <GreenCheckmark />
      <IoEllipsisVertical
        className="fs-4"
        onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/Detail/Editor/${quizId}`)} // Use courseId prop
      />
    </div>
  );
}
