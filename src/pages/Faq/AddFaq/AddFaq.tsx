import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFaq } from "../../../services/Faq/Faq.service";
import { FaChevronLeft } from "@react-icons/all-files/fa/FaChevronLeft";
import { FaSave } from "@react-icons/all-files/fa/FaSave";
import { FaQuestionCircle } from "@react-icons/all-files/fa/FaQuestionCircle";

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
    <div className="faq-container">
      <div className="header-bar">
        <button className="collapse-btn !w-auto px-4 gap-2" onClick={() => navigate("/faq/list")}>
          <FaChevronLeft /> Back to List
        </button>
      </div>

      <form className="add-faq-container !max-w-2xl" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <h2 className="!mb-0 flex items-center gap-3">
            <FaQuestionCircle className="text-cyan-400" />
            Add New FAQ
          </h2>
          <button
            className="btn !py-2"
            type="submit"
            disabled={!question.trim() || !answer.trim()}
          >
            <FaSave className="mr-2" /> Save FAQ
          </button>
        </div>

        <div className="space-y-6">
          <div className="form-group">
            <label className="form-label">Question *</label>
            <input
              type="text"
              placeholder="e.g. How do I track my order?"
              className="input-field"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Answer *</label>
            <textarea
              placeholder="Provide a detailed answer here..."
              className="input-field min-h-[150px]"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex justify-end gap-4">
          <button 
            type="button" 
            className="btn !bg-slate-800 !from-slate-800 !to-slate-900"
            onClick={() => navigate("/faq/list")}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn px-8"
            disabled={!question.trim() || !answer.trim()}
          >
            Create FAQ
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFaq;
