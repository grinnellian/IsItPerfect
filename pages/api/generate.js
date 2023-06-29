import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  let messages = []
  if (JSON.parse(req.body.messages.length) === 0) {
    // first prompt

    const weather = req.body.weather || '';
    if (weather.trim().length === 0) {
      res.status(400).json({
        error: {
          message: "Weather unavailable for your location",
        }
      });
      return;
    }
    messages.push(generateWeatherMessage(weather))
    } else {

      messages.push(generateActivityMessage(req.body.location, req.body.activity))
    }

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.6,
      });
      messages.push(completion.data.choices[0].message)
      res.status(200).json({ messages} );
    } catch(error) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        res.status(500).json({
          error: {
            message: 'An error occurred during your request.',
          }
        });
      }
    }
  }


function generateWeatherMessage(weather) {
  return {
    role: "user",
    content: 
    `Tell me briefly and casually if this weather is perfect, using only imperial units and rounding to the nearest whole unit. 
    For windspeed, generalize into categories -- for example, 'a gentle breeze' for wind below 5mph. 
    For humidity, generalize to categories such as 'comfortable' or 'humid'; do not mention specific humidity percentage.
    If and only if "uv" >= 3, say "Remember to wear sunscreen!" in the response, else don't mention suncreen. Do not mention UV Index in the response
    ${weather}`
  };
}

function generateActivityMessage(location, activity) {
  return {
    role: "user",
    content:
      `Tell me briefly and casually where I can do ${activity} in ${location}. Limit responses to about 60 words`
  }
}
