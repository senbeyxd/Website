/************************************************************************************************\
*                               TITLE STUFF (thank you malte <3)                                 *
\************************************************************************************************/

// This function animates the websites title.

let loopIndex = 0;
let loopRevIndex = -1;

async function loop(oldTitle = "") {
  // Converting the video name.

  let title = video.name.toUpperCase().replaceAll(" ", "⠀").split("").join(" ");

  loopIndex++;

  // Resets loop if title has changed or animation is complete.

  if (title != oldTitle || loopIndex > title.length * 2 + 1) {
    loopIndex = 0;
    loopRevIndex = -1;
  }

  document.title = `${title.slice(
    0,
    loopIndex > title.length + 1 ? loopRevIndex-- : loopIndex
  )}|`;

  // Shorter waiting if title is getting "deleted".

  await wait(loopIndex > title.length + 1 ? 100 : 300);

  requestAnimationFrame(() => loop(title));
}

/************************************************************************************************\
*                                      NEW VIDEO FUNCTION                                        *
\************************************************************************************************/

// Well, this is very self explanatory.

function newVideoF() {
  return videos[Math.floor(Math.random() * videos.length)];
}

/************************************************************************************************\
*                                EVERYTHING CSS/ANIMATION RELATED                                *
\************************************************************************************************/

// It adds classes to elements depending on where you hover.

function animation(el) {
  if (!el) return;

  // If you hover left, it'll add the class "left". Same for right.

  el.addEventListener("mouseover", function (e) {
    el.classList.add(
      e.clientX - el.getBoundingClientRect().left >
        el.getBoundingClientRect().width / 2
        ? "right"
        : "left"
    );
  });
  el.addEventListener("mouseout", function () {
    el.classList.remove("right", "left");
  });
}

/************************************************************************************************\
*                                        VOlUME FUNCTIONS                                        *
\************************************************************************************************/

// Volume function for scrolling on the mute button in the top left corner.

function volume(e) {
  if (e.deltaY < 0) volumeHandler(true);
  else volumeHandler();
}

// It handles volume up/down in one function.

function volumeHandler(up = false) {
  const videoE = getEl("video");
  const volumeSpan = getEl("volumeSpan");
  const roundedVolume = Math.round(videoE.volume * 10) / 10;
  const newVolume = up
    ? Math.min(roundedVolume + 0.1, 1)
    : Math.max(roundedVolume - 0.1, 0.1);

  if (roundedVolume == newVolume)
    return popup(`⚠ | The volume is on m${up ? "aximum" : "inimum"}.`);

  videoE.volume = newVolume;

  vVolume = newVolume;

  muteTitle();

  if (volumeSpan) volumeSpan.innerHTML = progressBar("volume");
}

/************************************************************************************************\
*                                     REPEAT VIDEO FUNCTION                                      *
\************************************************************************************************/

function repeatVideo(makePopup = true) {
  const settingsContent = getEl("settingsContent");
  const repeatA = getEl("repeatA");

  settingsContent.innerHTML = settingsContent.innerHTML.replace(
    repeat ? "Unrepeat" : "Repeat",
    repeat ? "Repeat" : "Unrepeat"
  );

  if (makePopup)
    popup(`⟳ | The video is now ${repeat ? "unrepeated" : "repeated"}.`);

  if (repeatA) repeatA.className = repeat ? "red" : "green";

  repeat = !repeat;
}

/************************************************************************************************\
*                                     RESTART VIDEO FUNCTION                                     *
\************************************************************************************************/

// Who would have thought, this function will restart the video.

function restartVideo() {
  const videoE = getEl("video");
  const pauseA = getEl("pauseA");

  videoE.classList.remove("blurred");

  paused.classList.remove("visible");

  settingsContent.innerHTML = settingsContent.innerHTML.replace(
    "Unpause",
    "Pause"
  );

  if (pauseA) pauseA.innerHTML = "▶️";

  videoE.currentTime = 0;
  videoE.play();
}

/************************************************************************************************\
*                                         VIDEO MAPPER                                           *
\************************************************************************************************/

// This function returns all the videos for the context menu or for the disclaimer page.

function map(contextMenu = false, page) {
  if (contextMenu)
    return (
      "<p class='contextMenuP'>Choose a video:</p><br />" +
      videos
        .filter((i) => i != video)
        .map(
          ({ path, name, artists }) =>
            `<a onclick="playVideo('${path}', false, false, true)" class="contextMenuA"><b class="contextMenuB">${name.replace(
              " ",
              "&nbsp;"
            )}</b> by ${artists[0].replace(" ", "&nbsp;")}</a>`
        )
        .join("<br />")
    );
  else
    document.write(
      `All ${videos.length} videos: ${videos
        .map(
          ({ path, name, artists }) =>
            `"<a onclick="redirect('../${
              typeof custom != "undefined" ? `../../custom/${page}` : ""
            }', '${path}', false, false, '0')" class="decorationA disclaimer">${name.replace(
              " ",
              "&nbsp;"
            )}</a>" by ${artists.join(", ").replace(" ", "&nbsp;")}`
        )
        .join("; ")}`
    );
}

/************************************************************************************************\
*                                      PAUSE VIDEO FUNCTION                                      *
\************************************************************************************************/

async function pauseVideo() {
  const videoE = getEl("video");
  const paused = getEl("paused");
  const settingsContent = getEl("settingsContent");
  const pauseA = getEl("pauseA");

  settingsContent.innerHTML = settingsContent.innerHTML.replace(
    videoE.paused ? "Unpause" : "Pause",
    videoE.paused ? "Pause" : "Unpause"
  );

  if (videoE.paused) {
    videoE.classList.remove("blurred");
    videoE.play();

    paused.classList.remove("visible");

    if (pauseA) pauseA.innerHTML = "▶️";
  } else {
    videoE.classList.add("blurred");
    videoE.pause();

    paused.classList.add("visible");

    if (pauseA) pauseA.innerHTML = "⏸️";
  }
}

/************************************************************************************************\
*                                         PROLLY USELESS                                         * 
\************************************************************************************************/

// The function I mentioned in ./js/main.js line 277.

async function srcPause() {
  const paused = getEl("paused");

  await wait(500);

  paused.src = `${pathGen("img")}/paused.svg`;
}

/************************************************************************************************\
*                                         MUTE FUNCTION                                          *
\************************************************************************************************/

// Mute toggle function.

function muter() {
  const videoE = getEl("video");
  const mute = getEl("mute");
  const muteA = getEl("muteA");

  videoE.muted = !videoE.muted;

  mute.src = `${pathGen("img")}/${videoE.muted ? "muted" : "unmuted"}.svg`;

  if (muteA) muteA.innerHTML = videoE.muted ? "🔇" : "🔊";
}

/************************************************************************************************\
*                                         WAIT FUNCTION                                          *
\************************************************************************************************/

// I don't even know why I'm writing this comment.

function wait(ms) {
  return new Promise((res) => setTimeout(() => res(true), ms));
}

/************************************************************************************************\
*                                        POPUP FUNCTION                                          *
\************************************************************************************************/

// The function for handling the popup stuff.

let popupQueue = [];
let lastPopup;
let popupVisible = false;
let popupTimer = 0;
let popupLastPercent;

async function popup(text, time = 2000, other = false) {
  const popupE = getEl("popup");
  const textE = getEl("text");

  const otherHandler = {
    copy: async function () {
      const toCopy = `${location.protocol}//${location.host}${
        typeof folder != "undefined" ? `/${folder}` : ""
      }?p=${video.path}`;

      text = `✓ | "${toCopy}" has been copied to your clipboard!`;

      try {
        await navigator.clipboard.writeText(toCopy);
      } catch (e) {
        text = `⚠ | The text could not be copied. Error: ${e}`;
      }
    },
    cookie: function () {
      popupE.innerHTML = text;

      popupVisible = "cookiePopup";

      if (popupE.classList.contains("muchText")) textE.classList.add("blurred");

      popupE.classList.add("visible");

      return;
    },
    info: function () {
      popupTimer = 0;

      popupVisible = "infoPopup";

      const interval = setInterval(async function () {
        const progressBarSpan = getEl("progressBarSpan");
        const artistsSpan = getEl("artistsSpan");
        const timeSpan = getEl("timeSpan");
        const percent = percentF();

        if (!progressBarSpan || !artistsSpan || !timeSpan)
          return clearInterval(interval);

        if (
          popupLastPercent != percent ||
          !artistsSpan?.innerHTML.split("b")[0] ==
            progressBar("artists").split("b")[0] ||
          !progressBarSpan?.innerHTML
        )
          progressBarSpan.innerHTML = progressBar();

        artistsSpan.innerHTML = progressBar("artists");

        timeSpan.innerHTML = progressBar("time");

        if (++popupTimer == 140) {
          await popupOut();

          clearInterval(interval);
        }
      }, 50);
    },
  };

  // This check checks if the called popup can be displayed. If not, it will either be returned or pushed in the queue.

  if (
    popupVisible == "cookiePopup" ||
    !popupE ||
    (popupVisible == "infoPopup" && other != "copy")
  )
    return;

  // If the copy link popup or the info popup gets called, the current popup fades out and the info/copy link popup displays.

  if (other == "copy" || (other == "info" && !popupE.innerHTML.includes("▰")))
    await popupOut(true, popupVisible ? true : false);
  else if (popupVisible) {
    // It checks if the called popup is the "Now playing:" popup. If it is, it will be displayed but all the queued ones are getting deleted.

    if (text.startsWith("▶ |"))
      popupQueue = popupQueue.filter(
        ({ text: ftext }) => !ftext.startsWith("▶ |")
      );

    // It will push everything in the queue except the copy link popup.

    if (
      ![lastPopup, ...popupQueue.map(({ text }) => text)].includes(
        other == "copy"
          ? `✓ | "${text}" has been copied to your clipboard!`
          : text
      )
    )
      popupQueue.push({ text, time, other });

    return;
  }

  // If the called popup needs extra stuff, it will be executed now.

  if (otherHandler[other]) otherHandler[other]();

  lastPopup = text;

  // Sets the variable to true if it's a normal popup.

  popupVisible = typeof popupVisible == "boolean" ? true : popupVisible;

  if (popupE.classList.contains("muchText")) textE.classList.add("blurred");

  // If the called popup is the info popup, the progressbar will be displayed.

  popupE.innerHTML = other == "info" ? progressBar("allText") : text;

  popupE.classList.add("visible");

  await wait(time);

  // If the info popup gets called or is displayed, it returns here because the queue will be ignored then.

  if (typeof popupVisible != "boolean") return;

  await popupOut(false);

  // This calls the function again with the next popup in the queue.

  if (popupQueue.length > 0) {
    const queuePopup = popupQueue.shift();

    popupVisible = false;

    popup(queuePopup.text, queuePopup.time, queuePopup.other);
  } else popupVisible = false;
}

// The fade out function for the popup.

async function popupOut(booChange = true, waitt = true) {
  const popupE = getEl("popup");
  const textE = getEl("text");

  popupE.classList.remove("visible");

  if (popupE.classList.contains("muchText")) textE.classList.remove("blurred");

  if (waitt) await wait(500);

  if (booChange) popupVisible = false;
}

// This is the progressbar function for the popup.

function progressBar(popupThing = false) {
  const videoE = getEl("video");
  const percent = percentF();
  popupLastPercent = percent;
  const mins = Math.floor(videoE.currentTime / 60) % 60 || 0;
  const secs = Math.floor(videoE.currentTime % 60) || 0;
  const fullMins = Math.floor(videoE.duration / 60) % 60 || 0;
  const fullSecs = Math.floor(videoE.duration % 60) || 0;

  const popupThingHandler = {
    allText: function () {
      return `<span id="artistsSpan">${progressBar(
        "artists"
      )}</span><span id="progressBarSpan" style="white-space: nowrap;">${progressBar()}<br style="display: ${
        mobileCheck() ? "block" : "none"
      };" /></span><span id="timeSpan">${progressBar(
        "time"
      )}</span><br /><span id="controlsSpan">${progressBar("controls")}</span>`;
    },
    time: function () {
      return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}&nbsp;/&nbsp;${fullMins
        .toString()
        .padStart(2, "0")}:${fullSecs.toString().padStart(2, "0")}`;
    },
    artists: function () {
      return `<b>${video.name.replace(" ", "&nbsp;")}</b> by ${video.artists
        .join(", ")
        .replace(" ", "&nbsp;")}<br />`;
    },
    controls: function () {
      return `<b><a title="Copy link" onclick="clickManager('copy')">🔗</a>&nbsp;|&nbsp;<a title="Repeat/Unrepeat" id="repeatA" onclick="clickManager('repeat')" class="${
        repeat ? "green" : "red"
      }">⟳</a>&nbsp;|&nbsp;<a title="Pause/Unpause" id="pauseA" onclick="clickManager('pause')">${
        videoE.paused ? "⏸️" : "▶️"
      }</a>&nbsp;|&nbsp;<a title="New video" onclick="clickManager('playVideo')">⏭</a>&nbsp;|&nbsp;<a title="Mute/Unmute" id="muteA" onclick="clickManager('muter')">${
        videoE.muted ? "🔇" : "🔊"
      }</a>&nbsp;<br style="display: ${
        mobileCheck() ? "block" : "none"
      };" /><a onclick="clickManager('volumeDown')">-</a>&nbsp;<span id="volumeSpan">${progressBar(
        "volume"
      )}</span>/10&nbsp;<a onclick="clickManager('volumeUp')">+</a></b>`;
    },
    volume: function () {
      return Math.round(vVolume * 100) / 10;
    },
  };

  if (popupThingHandler[popupThing]) return popupThingHandler[popupThing]();

  // Well, that is the real progressbar.

  let bar = new Array(10).fill("═");
  const char = "▰";
  const front = "╞";
  const end = "╡";

  bar.splice(percent, 0, char);
  bar = bar.map((item, i) => {
    if (item == char) return item;

    return `<a onclick='clickManager("skipTo", ${i})'>${item}</a>`;
  });

  return `${front}${bar.join("")}${end}`;
}

// This function returns the current time of the video in percent.

function percentF() {
  const videoE = getEl("video");

  return Math.floor((videoE.currentTime / videoE.duration) * 10);
}

// This function skips to the point the function above calculated.

function skipTo(percent) {
  const videoE = getEl("video");

  videoE.currentTime = (percent / 10) * videoE.duration;
}

// This function calls all the function and adds time to the timer everytime you click on something.

function clickManager(func, skipToPoint) {
  popupTimer -= 60;

  if (popupTimer < 0) popupTimer = 0;

  const functionHandler = {
    copy: function () {
      popup("", 2000, "copy");
    },
    volumeUp: function () {
      volumeHandler(true);
    },
    skipTo: function () {
      skipTo(skipToPoint);
    },
    repeat: repeatVideo,
    pause: pauseVideo,
    playVideo: playVideo,
    muter: muter,
    volumeDown: volumeHandler,
  };

  if (functionHandler[func]) functionHandler[func]();
}

/************************************************************************************************\
*                                         PATH FUNCTION                                          *
\************************************************************************************************/

// This function generates the path to the given folder. (I guess?)

function pathGen(folder) {
  return document.getElementsByClassName("404")[0]
    ? `${location.protocol}//${location.host}/${folder}`
    : document.getElementById("main")
    ? typeof custom != "undefined"
      ? `../${folder}${folder == "media" ? "/custom" : ""}`
      : `./${folder}`
    : typeof custom != "undefined"
    ? `../../${folder}${folder == "media" ? "/custom" : ""}`
    : `../${folder}`;
}

/************************************************************************************************\
*                                       REDIRECT FUNCTION                                        *
\************************************************************************************************/

//! If a custom thing is false, put it in a string.

// The function that generates the URL that will be processed on page load and redirects you.

async function redirect(
  url,
  customPath = false,
  customMute = false,
  customVolume = false,
  customTime = false,
  customPause = false,
  customRepeat = false
) {
  const videoE = getEl("video");
  const textE = getEl("text");

  if (textE) textE.classList.add("fadeout");

  $("#video").animate(
    {
      volume: 0,
      opacity: 0,
    },
    300
  );

  await wait(300);

  location.href =
    url +
    `?p=${customPath || video.path}&m=${
      !!!window.chrome ? "true" : customMute || videoE.muted
    }&v=${customVolume || Math.round(vVolume * 100) / 100}&c=${
      customTime || videoE.currentTime
    }&s=${customPause || videoE.paused}&r=${customRepeat || repeat}`;
}

/************************************************************************************************\
*                                       5S SKIP FUNCTIONS                                        *
\************************************************************************************************/

function fiveSecBack() {
  const videoE = getEl("video");

  videoE.currentTime -= 5;

  // popup("⤌ | 5 seconds were rewound.");
}

function fiveSecForward() {
  const videoE = getEl("video");

  videoE.currentTime += 5;

  // popup("⤍ | 5 seconds were fast forwarded.");
}

/************************************************************************************************\
*                                         MOBILE CHECK                                           *
\************************************************************************************************/

// Stole that function from Stackoverflow, lmao. Like where should I get that RegEx xd.

function mobileCheck() {
  let check = false;

  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
}

/************************************************************************************************\
*                                      GET ELEMENT FUNCTION                                      *
\************************************************************************************************/

function getEl(el) {
  return document.getElementById(el);
}

/************************************************************************************************\
*                                        COOKIE FUNCTIONS                                        *
\************************************************************************************************/

function cookieYesF() {
  Cookies.set("cookiesAccepted", true, { expires: 365 });
}

function cookieNoF() {
  Cookies.set("cookiesAccepted", false, { expires: 365 });
  Cookies.remove("currentTime");
  Cookies.remove("path");
}

function cookieCheck() {
  return Cookies.get("cookiesAccepted") == "true" &&
    Cookies.get("currentTime") &&
    Cookies.get("path") &&
    typeof custom == "undefined"
    ? true
    : false;
}

function removeAllCookies() {
  Cookies.remove("cookiesAccepted");
  Cookies.remove("currentTime");
  Cookies.remove("path");

  popup("✓ | All cookies have been deleted.");
}

/************************************************************************************************\
*                                    VIDEO MANAGER FUNCTIONS                                     *
\************************************************************************************************/

function playPreviousVideo() {
  if (previousVideo) playVideo(previousVideo, false, false, true);
  else popup("⚠ | There is no previous video.");
}

async function playVideo(
  vid = video,
  err = false,
  pageLoad = false,
  ignoreIfUsed = false
) {
  const videoE = getEl("video");
  const paused = getEl("paused");
  const settingsContent = getEl("settingsContent");
  const contextMenu = getEl("contextMenu");
  const pauseA = getEl("pauseA");
  const repeatA = getEl("repeatA");
  const apple = navigator.vendor == "Apple Computer, Inc.";

  if (typeof vid == "string") vid = videos.find(({ path }) => path == vid);

  video = vid;

  // Because Safari is trash, I have to put autoplay on false.

  if (pageLoad && apple) videoE.autoplay = false;

  if (
    // This check makes sure that a new video gets played, when the given video is already used and the video isn't allowed to be used twice (it's mostly not allowed to be played twice, only if the video is from the context menu).

    (usedVideos.includes(vid) &&
      usedVideos.length != videos.length &&
      !ignoreIfUsed) ||
    err
  ) {
    video = newVideoF();

    return playVideo();
  }

  // Sets the videos volume and opacity to 0 on page load, so the upcoming animations won't look weird.

  if (pageLoad) {
    videoE.volume = 0;
    videoE.style.opacity = 0;
  }

  // Refresh the context menu.

  contextMenu.innerHTML = map(true);

  // Reset the buffer count.

  bufferCount = 0;

  // When all videos are used, the used videos array gets "refreshed".

  if (usedVideos.length >= videos.length) usedVideos = [];

  // Sets the previous video.

  if (!pageLoad) previousVideo = videoE.src.split("/")[4].split(".")[0];

  // This fades the current video out.

  if (!pageLoad) {
    $("#video").animate(
      {
        volume: 0,
        opacity: 0,
      },
      300
    );

    await wait(300);
  }

  // Sets the new video.

  videoE.src = `${pathGen("media")}/${vid.path}.mp4`;

  // Well well well, I hate Safari. This pauses the video on page load in Safari.

  if (!(pageLoad && apple)) videoE.play();
  else {
    videoE.classList.add("blurred");

    paused.classList.add("visible");

    settingsContent.innerHTML = settingsContent.innerHTML.replace(
      "Pause",
      "Unpause"
    );
  }

  // Fades the new video in.

  $("#video").animate(
    {
      volume: vVolume,
      opacity: 1,
    },
    300
  );

  // Displays a popup. But not, if the function got called on page load.

  if (!pageLoad) {
    popup(
      `▶ | Now playing: <b>${vid.name.replace(
        " ",
        "&nbsp;"
      )}</b> by ${vid.artists.join(", ").replace(" ", "&nbsp;")}`
    );

    // If the video was repeated, now it is not.

    repeat = false;

    videoE.classList.remove("blurred");

    paused.classList.remove("visible");

    // Unpauses the video in case it was paused.

    settingsContent.innerHTML = settingsContent.innerHTML.replace(
      "Unpause",
      "Pause"
    );

    settingsContent.innerHTML = settingsContent.innerHTML.replace(
      "Unrepeat",
      "Repeat"
    );

    if (pauseA) pauseA.innerHTML = "▶️";

    if (repeatA) repeatA.className = "red";
  }

  // Push the new video in the used videos array.

  if (!usedVideos.includes(video)) usedVideos.push(video);
}

// This function creates the title for the mute button.

function muteTitle() {
  getEl("mute").title = `Current volume: ${vVolume * 10}/10`;
}

//  $$$$$$\  $$$$$$$$\ $$\   $$\ $$$$$$$\  $$$$$$$$\ $$\     $$\
// $$  __$$\ $$  _____|$$$\  $$ |$$  __$$\ $$  _____|\$$\   $$  |
// $$ /  \__|$$ |      $$$$\ $$ |$$ |  $$ |$$ |       \$$\ $$  /
// \$$$$$$\  $$$$$\    $$ $$\$$ |$$$$$$$\ |$$$$$\      \$$$$  /
//  \____$$\ $$  __|   $$ \$$$$ |$$  __$$\ $$  __|      \$$  /
// $$\   $$ |$$ |      $$ |\$$$ |$$ |  $$ |$$ |          $$ |
// \$$$$$$  |$$$$$$$$\ $$ | \$$ |$$$$$$$  |$$$$$$$$\     $$ |
//  \______/ \________|\__|  \__|\_______/ \________|    \__|
