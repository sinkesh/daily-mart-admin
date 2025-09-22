import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditFaq.css";
import { getByIdFaq, updateFaqApi } from "../../../services/Faq/Faq.service";

const EditFaq: React.FC = () => {
  const { faq_id } = useParams<{ faq_id: string }>(); // ✅ Correct type (string)
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("FAQ ID from params:", faq_id);

    const fetchCategory = async () => {
      if (!faq_id) return;
      try {
        const id = parseInt(faq_id); // ✅ parseInt after confirming faq_id exists
        const data = await getByIdFaq(id);

        console.log("Fetched FAQ Data:", data);

        setQuestion(data?.question ?? "");
        setAnswer(data?.answer ?? "");
      } catch (error) {
        console.error("Error fetching FAQ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [faq_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faq_id) return;

    try {
      const id = parseInt(faq_id);
      const payload = { question, answer };

      await updateFaqApi(id, payload);
      navigate("/faq/list");
    } catch (error) {
      console.error("Error updating FAQ:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="add-category-container">
      <h2>Edit Faq</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
        />
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Answer"
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditFaq;
