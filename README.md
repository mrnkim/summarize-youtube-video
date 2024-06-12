<a id="readme-top"></a>

# Summarize a YouTube Video

## 👋 Introduction

This app's got your back when you need a speedy text summary of any video in your sights. Whether you're a content creator gearing up to make your own video, or simply looking to dissect a benchmark video, this app helps you swiftly capture the essence, structure, and key highlights. It's your shortcut to finding those standout elements to make your content shine!

📌 Check out the [Demo](https://summarize-youtube-video-vercel-client.vercel.app/)! (_Note: This simplified version of the app does not include the video upload form_)

<div align="center">
  <a href="https://summarize-youtube-video-vercel-client.vercel.app/">
    <img src="public/Screenshot.JPG" alt="search result screenshot" style="border: 1px solid black;" />
  </a>
</div>

### Built With

- [Twelve Labs API](https://docs.twelvelabs.io/docs)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [React](https://react.dev/)
- [React Player](https://www.npmjs.com/package/react-player)
- [ytdl-core](https://www.npmjs.com/package/ytdl-core)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔑 Getting Started

### Step 1. Generate Twelve Labs API Key

Visit [Twelve Labs Playground](https://playground.twelvelabs.io/) to generate your API Key

- Upon signing up, you'll receive free credits to index up to 10 hours of video content!

### Step 2 (Option 1). Start the App on Replit

1. Click the button below and fork the repl

   [![Run on Replit](https://replit.com/badge/github/mrnkim/summarize-youtube-video)](https://replit.com/@twelvelabs/summarize-youtube-video)

2. Update Secrets (equivalent to .env)

   ```
   REACT_APP_API_KEY=<YOUR API KEY>
   REACT_APP_INDEX_ID=<YOUR INDEX ID>
   ```

3. Stop and Run the Repl again

### Step 2 (Option 2). Start the App Locally

1. Clone the current repo

   ```sh
   git clone git@github.com:mrnkim/summarize-youtube-video.git
   ```

2. Create `.env` file in the root directory and provide the values for each key

   ```
    REACT_APP_API_KEY=<YOUR_API_KEY>
    REACT_APP_INDEX_ID=<YOUR_INDEX_ID>
    REACT_APP_SERVER_URL=<YOUR_SERVER_URL> //e.g., http://localhost
    REACT_APP_PORT_NUMBER=<YOUR_PORT_NUMBER> //e.g., 4001
   ```

3. Start the server

   ```sh
   node server.js
   ```

4. Install and start the client

   ```sh
   npm install
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🎯 What's Next?

- Add more tests
- Improve error handling and add data validations

<p align="right">(<a href="#readme-top">back to top</a>)</p>
