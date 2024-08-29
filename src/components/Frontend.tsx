"use client";
import React, { useState, useEffect } from "react";

const Frontend = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [progress, setProgress] = useState(100);

  const handleCopyLink = () => {
    const link = "https://question-me-alice.vercel.app/";
    navigator.clipboard.writeText(link).then(() => {
      setShowMessage(true);
      setProgress(100); // Reset progress

      let interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 30); // Update progress every 30ms

      setTimeout(() => {
        setShowMessage(false);
      }, 3000); // Hide the message after 3 seconds
    });
  };

  return (
    <div className="flex flex-col h-screen justify-start p-10 gap-5 ">
      <h1 className="text-4xl underline font-extrabold">NO NO NO!</h1>
      <p className="text-xl">This is not the place for you to be here!</p>
      <div>
        <h2 className="text-lg">
          Follow these steps for this project to start working:
        </h2>
        <ol className="list-decimal py-4 mx-5 my-2 text-2xl">
          <li>
            <p>Go to the article you want to scrape.</p>
          </li>
          <li>
            <p>
              Prefix that URL with this
              <button
                onClick={handleCopyLink}
                className="underline text-zinc-300 ml-1"
              >
                {" "}
                url
              </button>
              <span className="text-sm"> ( Click to copy)</span>
            </p>
          </li>
          <li>
            <p>
              And you are all set!{" "}
              <span className="font-semibold">
                {" "}
                Be nice with Alice! or <strong> She will</strong> spank your
                ass!
              </span>{" "}
            </p>
          </li>
        </ol>
      </div>

      {/* Pop-up message */}
      <div
        className={`fixed bottom-4 right-4 bg-zinc-800  text-white px-4 py-2 rounded shadow-gray-300 transition-all transform ${
          showMessage ? "translate-x-0" : "translate-x-full"
        } duration-500 ease-out ${
          showMessage ? "opacity-100" : "opacity-0"
        } delay-300`}
        style={{ transitionDelay: showMessage ? "0s" : "1s" }}
      >
        Link copied to clipboard!
        <div className="w-full bg-white h-1 mt-2 rounded">
          <div
            className="bg-blue-500 h-1 rounded"
            style={{ width: `${progress}%`, transition: "width 0.04s linear" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Frontend;
