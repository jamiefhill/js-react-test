import React, { useState, useEffect } from "react";
import Form from "../../components/Form";
import LabelledInput, {
  LabelledInputTextType,
  LabelledInputSubmitType
} from "../../components/LabelledInput";
import "./App.css";

function App() {
  const [data, setData] = useState({
    message: "Fetching from API...",
    fetched: false
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:8080/").then(res =>
        res.json()
      );
      setData({
        message: data.data.message,
        fetched: true
      });
    };

    if (!data.fetched) {
      fetchData();
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Contact Us</h1>
        <p>{data.message}</p>

        <Form>
          <LabelledInput label={"Name:"} type={LabelledInputTextType} />
          <LabelledInput type={LabelledInputSubmitType} />
        </Form>
      </header>
    </div>
  );
}

export default App;
