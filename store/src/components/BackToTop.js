import React from "react";

export default function BackToTop() {
  let mybutton = document.getElementById("btn-back-to-top");

  function scrollFunction() {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  window.onscroll = function () {
    scrollFunction();
  };

  const BackTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div id="btn-back-to-top" className="fixed bottom-12 right-6 ">
      <button onClick={BackTop} className="bg-teal-500 opacity-80 rounded-full p-2">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          class="w-4 h-4"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
          ></path>
        </svg>
      </button>
    </div>
  );
}
