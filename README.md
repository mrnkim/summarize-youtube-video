<a id="readme-top"></a>

# Summarize a Youtube Video

## 👋 Introduction

This app's got your back when you need a speedy text summary of any video in your sights. Whether you're a content creator gearing up to make your own video, or simply looking to dissect a benchmark video, this app helps you swiftly capture the essence, structure, and key highlights. It's your shortcut to finding those standout elements to make your content shine!

<div style="border: 1px solid black;">
  <img src="public/Get%20Inspiration_v3_Result.JPG" alt="app screenshot" />
</div>

### Built With

- [Twelve Labs API](https://docs.twelvelabs.io/docs)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [React](https://react.dev/)
- [React Player](https://www.npmjs.com/package/react-player)
- [ytdl-core](https://www.npmjs.com/package/ytdl-core)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔑 Getting Started

### Step 1. Clone the repo and move to the right folder

1. Clone the current repository
   ```sh
   git clone git@github.com:mrnkim/Summarize-a-Youtube-Video.git
   ```
2. cd into the summarize-video folder
   ```sh
      cd summarize-video/
   ```

### Step 2. Generate API Key and create an Index

1. Visit [Twelve Labs Playground](https://playground.twelvelabs.io/) to generate your API Key
   - Once you sign up, you'll receive complimentary credits allowing you to index up to 10 hours of video content!
2. Check the current API Base URL at [Twelve Labs API Reference](https://docs.twelvelabs.io/reference/api-reference) and update the version as needed
3. Create an index and save the index id (Visit [Twelve Labs Docs](https://docs.twelvelabs.io/docs/create-indexes) for details)
4. Create `.env` file at the root level and store/update the values of API_URL, API_KEY, and INDEX_ID.

   ```

   .env

    REACT_APP_API_URL=https://api.twelvelabs.io/v1.2
    REACT_APP_API_KEY=YOUR_API_KEY
    REACT_APP_INDEX_ID=YOUR_INDEX_ID

   ```

### Step 3. Start the server and the client

1. Start the server

   ```sh
   nodemon server.js
   ```

1. Install and start the client

   ```sh
   npm install
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🎯 What's Next?

- Add (or automate) test
- Improve error handling and add data validations

<p align="right">(<a href="#readme-top">back to top</a>)</p>
