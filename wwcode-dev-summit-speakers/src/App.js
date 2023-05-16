import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

//Template literal string of the GraphQL Query

function App() {
  const [speakers, setSpeakers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        {
          speakers {
            id
            name
            topics {
              name
            }
          }
        }
        `,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.data);
        // Set the state
        setSpeakers(data.data.speakers);
      })
      .catch((err) => console.error("ERROR: ", err));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Thank you Women Who Code Dev Summit 2023 Speakers!</h1>
      </header>
      <ul>
        {/* JavaScript value from the State to a JSON value */}
        {/* {JSON.stringify(speakers, null, 2)} */}
        {speakers.map((speakerElement) => (
          <li className="list" key={speakerElement.id}>
            <span className="list_name"> {speakerElement.name + ", "}</span>
            <span className="list_topic">
              spoke about:
              {speakerElement.topics.map((option, index) => (
                <span key={index}>{" " + option.name}</span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
