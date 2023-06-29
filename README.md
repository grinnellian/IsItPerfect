# Is It Perfect?

## Project Background
Is the weather perfect where you are right now?
What is perfect weather?
What is it perfect _for_?

Inspired by the often perfect weather in Van Nuys, California, this project hopes to connect you with local
outdoor activities and local businesses to make the most of great weather!

### Goals
 1. Basic website opining weather Van Nuys is perfect
 1. Suggestions of things to do based on weather (e.g. coffee shops with outdoor seating)
 1. extensibility to an arbitrary zipcode

### Video Demo
https://www.loom.com/share/1f357c2ed7694035bf1376823f88265c

### Versions

#### V0.1
  - webpage, served
  - gets weather
      - https://www.weatherapi.com/my/
      - runs in the browser with script & styles embedded into index.html

#### V0.2
  - what is perfect weather?
    - chatgpt: submit entire "current" block
    - chatgpt now opines on current weather

#### V0.3
  - Rip off ChatGPT example repo to create base app & integrate with weather API
  - ChatGPT now opines on the raw weather data without bothering the user with the details

#### V0.4 (Current)
  - After the weather opinion, local weather-appropriate outdoor activities are suggested to the user


#### V0.Future
  - user submit perfect weather + some keywords?
    - chatgpt for moderation of this?
  - storage of weather definitions by location
  - bing search api for keywords for more real-time data such as business hours?
  - integrate/feature local business and special events

## Setup

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/) (Node.js version >= 14.6.0 required)

1. Clone this repository

1. Navigate into the project directory

   ```bash
   $ cd IsItPerfect
   ```

1. Install the requirements

   ```bash
   $ npm install
   ```

1. Make a copy of the example environment variables file

   On Linux systems: 
   ```bash
   $ cp .env.example .env
   ```
   On Windows:
   ```powershell
   $ copy .env.example .env
   ```
1. Add your API keys to the newly created `.env` file

1. Run the app

   ```bash
   $ npm run dev
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)!

## Prompt Engineering
A sample of the prompt attempts for the weather opinion feature:
  - "tell me if this weather is perfect"
  - "tell me briefly and casually if this weather is perfect"
  - "tell me briefly and casually if this weather is perfect, using only imperial units"
  - "tell me briefly and casually if this weather is perfect, using only imperial units and rounding to the nearest whole unit. For windspeed, generalize into categories -- for example, 'a gentle breeze' for wind below 5mph."
  - "tell me briefly and casually if this weather is perfect, using only imperial units and rounding to the nearest whole unit. For windspeed, generalize into categories -- for example, 'a gentle breeze' for wind below 5mph. For humidity, generalize to categories such as 'comfortable' or 'humid'."
  - "tell me briefly and casually if this weather is perfect, using only imperial units and rounding to the nearest whole unit. For windspeed, generalize into categories -- for example, 'a gentle breeze' for wind below 5mph. For humidity, generalize to categories such as 'comfortable' or 'humid'. Don't mention a specific UV index"
  - "tell me briefly and casually if this weather is perfect, using only imperial units and rounding to the nearest whole unit. For windspeed, generalize into categories -- for example, 'a gentle breeze' for wind below 5mph. For humidity, generalize to categories such as 'comfortable' or 'humid'. Don't mention a specific UV index but warn to use suncreen if warranted"
  - "tell me briefly and casually if this weather is perfect, using only imperial units and rounding to the nearest whole unit. For windspeed, generalize into categories -- for example, 'a gentle breeze' for wind below 5mph. For humidity, generalize to categories such as 'comfortable' or 'humid'. Don't mention a specific UV index but warn to use suncreen if uv index is above 3"
  - "tell me briefly and casually if this weather is perfect, using only imperial units and rounding to the nearest whole unit. For windspeed, generalize into categories -- for example, 'a gentle breeze' for wind below 5mph. For humidity, generalize to categories such as 'comfortable' or 'humid'. Don't mention a specific UV index. if "uv" in the provided data is >=3, remind me to wear sunscreen"
  - "tell me briefly and casually if this weather is perfect, using only imperial units and rounding to the nearest whole unit. For windspeed, generalize into categories -- for example, 'a gentle breeze' for wind below 5mph. For humidity, generalize to categories such as 'comfortable' or 'humid'. Only if "uv" in the provided data is >= 3 remind me to wear sunscreen. Don't mention UV index"
  - "tell me briefly and casually if this weather is perfect, using only imperial units and rounding to the nearest whole unit. For windspeed, generalize into categories -- for example, 'a gentle breeze' for wind below 5mph. For humidity, generalize to categories such as 'comfortable' or 'humid'. If and only if "uv" >= 3, say "Remember to wear sunscreen!" in the response."
  - "tell me briefly and casually if this weather is perfect, using only imperial units and rounding to the nearest whole unit. For windspeed, generalize into categories -- for example, 'a gentle breeze' for wind below 5mph. For humidity, generalize to categories such as 'comfortable' or 'humid'. If and only if "uv" >= 10, say "Remember to wear sunscreen!" in the response. Do not mention UV Index in the response."
  - "tell me briefly and casually if this weather is perfect, using only imperial units and rounding to the nearest whole unit. For windspeed, generalize into categories -- for example, 'a gentle breeze' for wind below 5mph. For humidity, generalize to categories such as 'comfortable' or 'humid'. If and only if "uv" >= 3, say "Remember to wear sunscreen!" in the response. If UV is less than that don't mention suncreen. Do not mention UV Index in the response."
  - "tell me briefly and casually if this weather is perfect, using only imperial units and rounding to the nearest whole unit. For windspeed, generalize into categories -- for example, 'a gentle breeze' for wind below 5mph. For humidity, generalize to categories such as 'comfortable' or 'humid'. If and only if "uv" >= 3, say "Remember to wear sunscreen!" in the response, else don't mention suncreen. Do not mention UV Index in the response."

## Discarded Ideas
A selection of notes from my infamous PostIts
  - Proof-of-engagement w/ streaming content. #WGAStrong (Streaming residuals and views are largely opaque to the film unions. What if users could volunteer to become part of Nielsen-but-by-the-unions to earn a token & provide better data on streaming habits). 
  - NoLieFi -- verifiable wifi speed/update tests for coworking spaces
  - Crypto Cloud PostIts: Store encrypted blobs on the cloud with an NFT being the key to shared notes to minimize blockchain data transfer and keep individual revokability. 
  - Clap to find my phone. The UX can't be beat! Any child of the 80s will love it.
