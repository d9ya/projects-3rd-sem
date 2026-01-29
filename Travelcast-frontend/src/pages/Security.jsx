import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveSecurityAnswersApi } from "../services/api.js";

function Security() {

  const [answers, setAnswers] = useState({

    q1: "",

    q2: "",

    q3: "",
    q4: "",
  });

  const handleChange = (e) => {

    setAnswers({

      ...answers,

      [e.target.name]: e.target.value,

    });

  };

  const handleSave = async () => {
    const userId = localStorage.getItem("newUserId");

    if (!userId) {
      alert("User ID not found! Please come from registration page.");
      return;
    }

    if (!answers.q1 || !answers.q2 || !answers.q3 || !answers.q4) {
      alert("Please fill all fields!");
      return;
    }

  try {
    const res = await axios.post(
      "http://localhost:3000/api/security/setup",
      {
        email,
        question1: "What is your favourite food?",
        answer1: answers.q1,
        question2: "What is your favourite place to visit?",
        answer2: answers.q2,
        question3: "What is your favourite weather?",
        answer3: answers.q3,
        question4: "What is your birthplace?",
        answer4: answers.q4,
      });

      alert(res.data.message || "Security answers saved successfully!");

      localStorage.removeItem("newUserId");
      navigate("/login");
    } catch (error) {
      console.error("Security save error:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong while saving security answers"
      );
    }
  };

 
  return (
    <div
      className="min-h-screen p-10 flex flex-col items-end justify-start font-sans relative bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('background.jpeg')" }}
    >
      {/* Logo */}
      <img
        src="logo.png"
        alt="Logo"
        className="absolute top-5 left-5 w-32 opacity-90"
      />

      {/* Box */}
      <div className="w-[450px] bg-white/40 backdrop-blur-md p-8 rounded-xl flex flex-col text-black">
        <h1 className="text-3xl font-bold text-center mb-5">
          Security Questions
        </h1>

        <label className="mt-3 text-sm font-medium">
          Q1: What is your favourite food?
        </label>
        <input
          type="text"

          name="q1"

          value={answers.q1}

          onChange={handleChange}

          placeholder="Enter answer"
          className="mt-1 p-2.5 rounded-md border-2 border-white bg-transparent text-black outline-none text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40 transition"
        />

        <label className="mt-3 text-sm font-medium">
          Q2: What is your favourite place to visit?
        </label>
        <input
          type="text"

          name="q2"

          value={answers.q2}

          onChange={handleChange}

          placeholder="Enter answer"
          className="mt-1 p-2.5 rounded-md border-2 border-white bg-transparent text-black outline-none text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40 transition"
        />

        <label className="mt-3 text-sm font-medium">
          Q3: What is your favourite weather?
        </label>
        <input
          type="text"

          name="q3"

          value={answers.q3}

          onChange={handleChange}

          placeholder="Enter answer"
          className="mt-1 p-2.5 rounded-md border-2 border-white bg-transparent text-black outline-none text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40 transition"
        />

        <label className="mt-3 text-sm font-medium">
          Q4: What is your birthplace?
        </label>
        <input
          type="text"

          name="q4"

          value={answers.q4}

          onChange={handleChange}

          placeholder="Enter answer"
          className="mt-1 p-2.5 rounded-md border-2 border-white bg-transparent text-black outline-none text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40 transition"
        />

        <button
          onClick={handleSave}
          className="mt-5 py-3 bg-sky-400 hover:bg-sky-600 text-black text-base rounded-full transition"
        >
          Save Answers
        </button>
      </div>
    </div>
  );

}

export default Security;
 
