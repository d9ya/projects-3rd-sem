import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { saveSecurityAnswersApi } from "../services/api.js"; 

const Container = styled.div`
  min-height: 100vh;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  color: black;
  font-family: Arial, sans-serif;
  background-image: url("background.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
`;
 
const Box = styled.div`
  background: rgba(255, 255, 255, 0.39);
  backdrop-filter: blur(5px);
  padding: 30px;
  border-radius: 12px;
  width: 450px;
  display: flex;
  flex-direction: column;
  color: black;
`;
 
const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`;
 
const Label = styled.label`
  margin-top: 12px;
  font-size: 15px;
  text-align: left;
  color: black;
`;
 
const Input = styled.input`
  margin-top: 5px;
  padding: 10px;
  border-radius: 6px;
  border: 2px solid white;
  outline: none;
  font-size: 14px;
  background-color: transparent;
  color: black;
  transition: border-color 0.3s, box-shadow 0.3s;
  &:focus {
    border-color: #00aaff;
    box-shadow: 0 0 0 3px rgba(0, 170, 255, 0.3);
  }
`;
 
const Button = styled.button`
  margin-top: 20px;
  padding: 12px;
  background-color: #00aaff;
  color: black;
  font-size: 16px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #0088cc;
  }
`;
 
function Security() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: ""
  });
 
  const styles = {
    logo: {
      position: "absolute",
      top: "20px",
      left: "20px",
      width: "130px",
      opacity: 0.9,
    }
  };
 
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
      const res = await saveSecurityAnswersApi({
        userId,
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
    <Container>
      <img src="logo.png" alt="Logo" style={styles.logo} />
      <Box>
        <Title>Security Questions</Title>
 
        <Label>Q1: What is your favourite food?</Label>
        <Input
          type="text"
          name="q1"
          value={answers.q1}
          onChange={handleChange}
          placeholder="Enter answer"
        />
 
        <Label>Q2: What is your favourite place to visit?</Label>
        <Input
          type="text"
          name="q2"
          value={answers.q2}
          onChange={handleChange}
          placeholder="Enter answer"
        />
 
        <Label>Q3: What is your favourite weather?</Label>
        <Input
          type="text"
          name="q3"
          value={answers.q3}
          onChange={handleChange}
          placeholder="Enter answer"
        />
 
        <Label>Q4: What is your birthplace?</Label>
        <Input
          type="text"
          name="q4"
          value={answers.q4}
          onChange={handleChange}
          placeholder="Enter answer"
        />
 
        <Button onClick={handleSave}>Save Answers</Button>
      </Box>
    </Container>
  );
}
 
export default Security;
