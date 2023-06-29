import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

// in-place shuffle, stolen from https://stackoverflow.com/a/12646864 
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default function Home() {
  const [locationInput, setLocationInput] = useState(91406);
  const [result, setResult] = useState("");
  const [location, setLocation] = useState("My Area");
  const [submitValue, setSubmitValue] = useState("Perfect?")
  const [formDisabled, setFormDisabled] = useState("")
  const [stateMessages, setMessages] = useState([])
  const activities =["Picnic","Hiking","Cycling","Swimming","Fishing","Gardening","Barbecue","Sailing","Sightseeing","Relaxing"] // Was having trouble pulling as a singleton from process.env
  let messages = []

  const refresh = () => window.location.reload()

  const renderMessages = function(messages) {
    let out = ""
    for (const message of messages) {
      if (message.role == "assistant") out += ` ${message.content}  ` // TODO figure out how to get whitespace between results
    }
    return out;
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      
      if (result.length === 0) {
        const weatherResponse = await fetch("/api/weather", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loc: locationInput }),
        });

        const weatherData = await weatherResponse.json();
        if (weatherResponse.status !== 200) {
          throw weatherData.error || new Error(`Request failed with status ${weatherResponse.status}`);
        }

        setLocation(weatherData.result.location.name)
        setLocationInput("Checking perfection....");
        setSubmitValue("Please Wait")
        setFormDisabled("disabled")

      const GPTResponse = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ weather: JSON.stringify(weatherData.result.current), messages}),
      });
      
      const data = await GPTResponse.json();
      if (GPTResponse.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      
      messages = data.messages
      setMessages(stateMessages.concat(data.messages)) // https://react.dev/reference/react/useState#ive-updated-the-state-but-logging-gives-me-the-old-value
      setResult(renderMessages(messages))

      setLocationInput("Look good?"); // TODO hide the input?
      setSubmitValue("Get Me Outside!");
    } else { // We've passed the initial chat
        shuffleArray(activities)

        const GPTResponse = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ location, activity: activities[0], messages: stateMessages}),
        });

        const data = await GPTResponse.json();
        if (GPTResponse.status !== 200) {
          throw data.error || new Error(`Request failed with status ${response.status}`);
        }

        messages = [...stateMessages, ...data.messages]
        setMessages(messages)
        setResult(renderMessages(messages))

        setLocationInput("More Ideas?"); // TODO hide the input?
        setSubmitValue("Yeah!");
      } 
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Is It Perfect</title>
        <link rel="icon" href="/sun.png" />
      </Head>

      <main className={styles.main}>
        <button onClick={refresh}><img src="/sun.png" className={styles.icon} /> </button>
        <h3>Is {location} Perfect Today?</h3>
        <div className={styles.result}><p>{result}</p></div>
        <form onSubmit={onSubmit}>
          <input disabled = {formDisabled}
            type="text"
            name="location"
            placeholder="Enter a location"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
          <input type="submit" value={submitValue} />
        </form>
        
        {/* <div className={styles.result}><pre>{weatherResult}</pre></div> */}
      </main>
    </div>
  );
}
