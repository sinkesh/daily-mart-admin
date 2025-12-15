import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddFaq.css";
import { createFaq } from "../../../services/Faq/Faq.service";

const AddFaq: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      alert("Please fill both Question and Answer");
      return;
    }

    try {
      await createFaq({ question: question.trim(), answer: answer.trim() });
      navigate("/faq/list");
    } catch (error) {
      console.error("Error creating FAQ:", error);
      alert("Failed to create FAQ. Please try again.");
    }
  };


  return (
    <div className="add-faq-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddFaq;
