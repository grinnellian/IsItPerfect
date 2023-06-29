
export default async function (req, res) {
  if (process.env.WEATHERAPI_API_KEY === undefined) {
    res.status(500).json({
      error: {
        message: "WeatherAPI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const weatherEndpoint = "http://api.weatherapi.com/v1/current.json"
  const loc = req.body.loc || 91406;

  const URI = `${weatherEndpoint}?key=${process.env.WEATHERAPI_API_KEY}&q=${loc}`
  try {
    const weatherResponse = await fetch(URI)
    const weatherJSON = await weatherResponse.json()
    // console.log(weatherJSON);
    res.status(200).json({ result: weatherJSON });
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


