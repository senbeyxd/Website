/************************************************************************************************\
*                                          DECLARATION                                           *
\************************************************************************************************/

// Declaration of the global variables.

const params = Array.from(new URLSearchParams(location.search));
let usedVideos = [];
let previousVideo;
let repeat = false;
let video = newVideoF();
let vVolume = 0.3;
let videoStarted = false;

// Removing the search query parameters from the URL.

history.pushState(null, null, location.href.split("?")[0]);

document.addEventListener("DOMContentLoaded", function () {
  // Declaration of every element I often need.

  const contextMenu = getEl("contextMenu");
  const videoE = getEl("video");
  const mute = getEl("mute");
  const settingsSVG = getEl("settingsSVG");
  const settings = getEl("settings");
  const h1 = getEl("h1");
  const a = Array.from(document.getElementsByTagName("a")).filter((i) =>
    i.classList.contains("animate")
  );

  /************************************************************************************************\
  *                                        404 PAGE STUFF                                          *
  \************************************************************************************************/

  // It adds the path you tried to visit to the 404 page.

  if (getEl("errorPath")) {
    getEl("errorPath").innerHTML =
      location.pathname == "/errors/404.html"
        ? ""
        : location.pathname.slice(0, 35) +
          `${location.pathname.length > 35 ? "..." : ""}`;
  }

  /************************************************************************************************\
  *                                       BUFFERING STUFF                                          *
  \************************************************************************************************/

  // Counts the times it already buffered.

  let bufferCount = 0;

  // That code gets executed when the video buffers. If it has buffered 3 times, it will pause for 10s and inform you.

  videoE.addEventListener("waiting", async function () {
    if (videoE.networkState == 2 && videoE.currentTime > 0.2) bufferCount++;

    if (bufferCount != 3) return;

    bufferCount = 0;

    if (!videoE.paused) return;

    pauseVideo();

    popup(
      "⚠ | The video was paused for 10s due to buffering.\nFYI: You can still unpause the video."
    );

    await wait(10000);

    if (videoE.paused) pauseVideo();
  });

  /************************************************************************************************\
  *                                CONTEXT MENU AND VOLUME STUFF                                   *
  \************************************************************************************************/

  // The stuff for the context (right click) menu.

  document.body.addEventListener("contextmenu", function (e) {
    contextMenu.style = `display: block; --mouse-x: ${
      e.clientX - 30
    }px; --mouse-y: ${e.clientY - 30}px;`;

    e.preventDefault();
  });

  // This is for the mobile users so the context menu closes.

  document.body.addEventListener("click", function (e) {
    if (
      e.target.id != "contextMenu" &&
      ["contextMenuA", "contextMenuB"].every(
        (i) => !e.target.classList.contains(i)
      )
    )
      contextMenu.style.display = "none";
  });

  /************************************************************************************************\
  *                                        URL CHECK STUFF                                         *
  \************************************************************************************************/

  // All possible search query parameters:
  // p = Path of the video
  // m = If the videos is muted or not
  // v = Volume of the video
  // c = Current time of the video
  // r = If the videos is on repeat or not
  // s = If the video is paused or not

  let pausedByURL = params.toString().includes("s,true");

  videoE.addEventListener("play", function () {
    if (pausedByURL) {
      pauseVideo();

      pausedByURL = false;
    }
  });

  params.forEach((i) => {
    if (!params.toString().includes("p,")) return;

    const paramValue = i[1];
    const param = i[0];
    const noSpecialURL =
      params.toString().replace(/[^,]+/g, "").length != 1 && // Check if the URL is not the link from the copy link button.¹
      !params.toString().includes("c,0"); // Check if the URL is not from the disclaimer page.¹
    const doesVideoExist = videos.find(({ path }) => path == paramValue); // A boolean for checking if the video from the URL exists.
    const paramHandler = {
      p: function () {
        if (cookieCheck() && noSpecialURL) return;

        videoStarted = true;

        playVideo(doesVideoExist ? paramValue : video, false, true);
      },
      m: function () {
        if (paramValue == "false") muter();
      },
      v: function () {
        if (paramValue >= 0.1 && paramValue <= 1) vVolume = paramValue; // To make sure the volume is not too high or too low.
      },
      c: function () {
        videoE.currentTime =
          cookieCheck() && paramValue != "0"
            ? Cookies.get("currentTime")
            : paramValue;
      },
      r: function () {
        if (paramValue == "true") repeatVideo(false);
      },
    };

    if (param != "s" && paramHandler[param]) paramHandler[param]();

    // ¹ It checks for "special" URLs because they have a higher priority than the cookie video.
  });

  /************************************************************************************************\
  *                                          COOKIE STUFF                                          *
  \************************************************************************************************/

  // The cookie popup when you first visit the site or don't have any cookies.

  if (typeof custom == "undefined") {
    if (!Cookies.get("cookiesAccepted")) {
      popup(
        "This website uses cookies to improve your experience. If you don't agree, click the cross. <br /> <a id='cookieYES'><b>✓ I agree</b></a> <a id='cookieNO'><b>✗ I don't agree</b></a>",
        0,
        "cookie"
      );

      const cookieYES = getEl("cookieYES");
      const cookieNO = getEl("cookieNO");

      [cookieYES, cookieNO].forEach((i) =>
        i.addEventListener(
          "click",
          function () {
            if (i.id == "cookieYES") cookieYesF();
            else cookieNoF();

            popupOut(true, false);
          },
          { once: true }
        )
      );
    }

    // Setting the current time of the video to the time saved in the cookies but only when there was no special URL and the cookies are accepted.

    if (cookieCheck() && !pausedByURL && !videoStarted) {
      playVideo(Cookies.get("path"), false, true);

      videoE.currentTime = Cookies.get("currentTime");

      videoStarted = true;

      pausedByURL = false;
    }

    // Setting the cookie everytime the video updates it's time.

    videoE.addEventListener("timeupdate", function () {
      if (Cookies.get("cookiesAccepted") != "true") return;

      Cookies.set("currentTime", videoE.currentTime, { expires: 365 });
      Cookies.set("path", video.path, { expires: 365 });
    });
  }

  // If it's not paused by the URL, the video starts.

  if (!pausedByURL && !videoStarted) playVideo(video, false, true);

  // The title of the mute button and the event.

  muteTitle();

  mute.addEventListener("wheel", function (e) {
    volume(e);
  });

  // Calling the loop function for the title.

  requestAnimationFrame(loop);

  /************************************************************************************************\
  *                                     ERROR AND END EVENT                                        *
  \************************************************************************************************/

  // It starts playing a new video, if the current video isn't available or if any error happens.

  videoE.addEventListener("error", function () {
    playVideo(video, true);
  });

  // Either repeats the video or plays a new one when the video ended.

  videoE.addEventListener("ended", function () {
    if (!repeat) playVideo(video);
    else restartVideo();
  });

  /************************************************************************************************\
  *                                EVERYTHING CSS/ANIMATION RELATED                                *
  \************************************************************************************************/

  // To apply the hover animation to the h1 and the a's.

  [h1, ...a].forEach((i) => animation(i));

  // Because the settings hover menu didn't work how I wanted, I just made classes for them and add them on hover.

  settingsSVG.addEventListener("mouseover", function () {
    settings.classList.add("hover");
    settingsSVG.classList.add("hover");
  });

  // It removes the classes when you stop hovering. It waits 50ms just in case you missed the settings by a few pixels.

  [settings, settingsSVG].forEach((el) =>
    el.addEventListener("mouseout", async function () {
      await wait(50);

      if (settings.matches(":hover") || settingsSVG.matches(":hover")) return;

      settings.classList.remove("hover");
      settingsSVG.classList.remove("hover");
    })
  );

  // I made that because sometimes you would see the paused picture on page load. I'm sure it's useless, but fök it.

  srcPause();
});

/************************************************************************************************\
*                                           KEY EVENT                                            *
\************************************************************************************************/

// Pretty self explanatory.

document.addEventListener("keydown", function (e) {
  if (!["KeyR", "F5"].some((i) => i === e.code)) e.preventDefault();

  const keyHandler = {
    KeyI: function () {
      popup("", 5000, "info");
    },
    ArrowUp: function () {
      volumeHandler(true);
    },
    ArrowDown: function () {
      volumeHandler();
    },
    KeyN: playVideo,
    KeyR: repeatVideo,
    KeyS: restartVideo,
    KeyM: muter,
    KeyP: playPreviousVideo,
    Space: pauseVideo,
    ArrowLeft: fiveSecBack,
    ArrowRight: fiveSecForward,
  };

  if (keyHandler[e.code]) keyHandler[e.code]();
});

/************************************************************************************************\
*                                       iOS CHECK STUFF                                          *
\************************************************************************************************/

// It gives a warning popup if you're using an iOS device.

if (
  [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
  ].includes(navigator.platform) ||
  (navigator.userAgent.includes("Mac") && "ontouchend" in document)
)
  popup(
    "⚠ | It seems that you are using an iOS device. Because of Apple's policies, the video has been paused.<br>Unpause it over the gear-symbol.",
    5000
  );

//  $$$$$$\  $$$$$$$$\ $$\   $$\ $$$$$$$\  $$$$$$$$\ $$\     $$\
// $$  __$$\ $$  _____|$$$\  $$ |$$  __$$\ $$  _____|\$$\   $$  |
// $$ /  \__|$$ |      $$$$\ $$ |$$ |  $$ |$$ |       \$$\ $$  /
// \$$$$$$\  $$$$$\    $$ $$\$$ |$$$$$$$\ |$$$$$\      \$$$$  /
//  \____$$\ $$  __|   $$ \$$$$ |$$  __$$\ $$  __|      \$$  /
// $$\   $$ |$$ |      $$ |\$$$ |$$ |  $$ |$$ |          $$ |
// \$$$$$$  |$$$$$$$$\ $$ | \$$ |$$$$$$$  |$$$$$$$$\     $$ |
//  \______/ \________|\__|  \__|\_______/ \________|    \__|
