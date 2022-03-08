/************************************************************************************************\
*                                          DECLARATION                                           *
\************************************************************************************************/

const videos = [
  { path: "beamer-boy", name: "beamer boy", artist: "Lil Peep, Nedarb" },
  { path: "lil-kennedy", name: "Lil Kennedy", artist: "Lil Peep, Nedarb" },
  { path: "keep-my-coo", name: "Keep My Coo", artist: "Lil Peep" },
  { path: "runaway", name: "Runaway", artist: "Lil Peep" },
  { path: "gym-class", name: "Gym Class", artist: "Lil Peep" },
  { path: "benz-truck", name: "Benz Truck", artist: "Lil Peep" },
  { path: "girls", name: "Girls", artist: "Lil Peep, Horsehead" },
  { path: "white-wine", name: "White Wine", artist: "Lil Peep, Lil Tracy" },
  { path: "white-tee", name: "White Tee", artist: "Lil Peep, Lil Tracy" },
  { path: "cobain", name: "Cobain", artist: "Lil Peep, Lil Tracy" },
  { path: "16-lines", name: "16 Lines", artist: "Lil Peep" },
  { path: "awful-things", name: "Awful Things", artist: "Lil Peep, Lil Tracy" },
  { path: "backseat", name: "Backseat", artist: "Lil Peep, Lil Tracy" },
  { path: "witchblades", name: "Witchblades", artist: "Lil Peep, Lil Tracy" },
  { path: "live-forever", name: "Live Forever", artist: "Lil Peep" },
  {
    path: "california-world",
    name: "california world",
    artist: "Lil Peep, Nedarb, Craig Xen",
  },
  {
    path: "hollywood-dreaming",
    name: "Hollywood Dreaming",
    artist: "Lil Peep, Gab3",
  },
  { path: "antarctica", name: "Antarctica", artist: "$uicideboy$" },
  { path: "2nd-hand", name: "2nd Hand", artist: "$uicideboy$" },
  { path: "o-pana", name: "O Pana!", artist: "$uicideboy$" },
  { path: "face-it", name: "Face It", artist: "$uicideboy$" },
  {
    path: "rag-round-my-skull",
    name: "Rag Round My Skull",
    artist: "$uicideboy$",
  },
  {
    path: "for-the-last-time",
    name: "For the Last Time",
    artist: "$uicideboy$",
  },
  { path: "oxycodon", name: "Oxycodon", artist: "T-Low" },
  { path: "curly-fries", name: "Curly Fries", artist: "T-Low" },
  { path: "crashen", name: "Crashen", artist: "T-Low" },
  { path: "luxus-leben", name: "Luxus Leben", artist: "T-Low" },
  {
    path: "vorsichtig",
    name: "Vorsichtig",
    artist: "T-Low, Sevi Rin, Heinie Nüchtern",
  },
  { path: "sehnsucht", name: "Sehnsucht", artist: "T-Low, Miksu / Macloud" },
  { path: "changed", name: "Changed", artist: "T-Low" },
  { path: "bankaccount", name: "BANKACCOUNT", artist: "T-Low" },
  { path: "grad-mal-ein-jahr", name: "Grad mal ein Jahr", artist: "makko" },
];
let repeat = false;
let video = newVideoF();
let usedVideos = [];
let url = window.location.search.substring(1).toLowerCase();
url = url.split("&");
let urlBoo = false;

document.addEventListener("DOMContentLoaded", function () {
  history.pushState(null, null, location.href.split("?")[0]);

  const contextMenu = document.getElementById("contextMenu");
  const videoE = document.getElementById("video");
  const mute = document.getElementById("mute");
  const h1 = document.getElementById("h1");
  const settingsContent = document.getElementById("settingsContent");

  /************************************************************************************************\
  *                                CONTEXT MENU AND VOLUME STUFF                                   *
  \************************************************************************************************/

  document.body.oncontextmenu = function (event) {
    contextMenu.style = `display: block; --mouse-x: ${
      event.clientX - 30
    }px; --mouse-y: ${event.clientY - 30}px;`;

    return false;
  };

  document.body.onclick = function (event) {
    if (
      !["contextMenuA", "contextMenu"].some((i) => event.target.id.includes(i))
    )
      contextMenu.style.display = "none";
  };

  videoE.volume = 0.3;

  mute.title = `Current volume: ${Math.round(videoE.volume * 100) / 10}/10`;
  mute.addEventListener("wheel", function (e) {
    volume(e);
  });

  /************************************************************************************************\
  *                                     OTHER IMPORTANT STUFF                                      *
  \************************************************************************************************/

  videoE.addEventListener("play", function () {
    if (urlBoo == "paused") {
      pauseVideo();

      urlBoo = false;
    }
  });

  url.forEach(async (i) => {
    i = i.split("=");

    switch (i[0]) {
      default:
        break;

      case "p":
        if (url.some((i) => i == "s=true")) urlBoo = "paused";

        videoE.setAttribute("src", `${pathGen()}/media/${i[1]}.mp4`);

        settingsContent.innerHTML = settingsContent.innerHTML.replace(
          "Repeat",
          "Unrepeat"
        );

        usedVideos.push(url);

        video = videos.find((v) => v.path == i[1]);
        break;

      case "m":
        if (i[1] == "false") muter();
        break;

      case "v":
        videoE.volume = i[1];

        mute.title = `Current volume: ${
          Math.round(videoE.volume * 100) / 10
        }/10`;
        break;

      case "c":
        videoE.currentTime = i[1];
        break;

      case "r":
        if (i[1] == "true") repeat = true;

      case "r":
        if (i[1] == "true") urlBoo = "";
    }
  });

  // p = path, m = muted, v = volume, c = currentTime, s = paused, r = repeat, u = urlBoo

  /************************************************************************************************\
  *                                        VIDEO MANAGER                                           *
  \************************************************************************************************/

  videoE.onerror = function () {
    playVideo(true, video);
  };

  if (!urlBoo) playVideo(false, video, true);

  requestAnimationFrame(loop);

  document.getElementById("video").onended = function () {
    const videoE = document.getElementById("video");

    if (!repeat) playVideo(false, video);
    else {
      videoE.currentTime = 0;
      videoE.play();
    }
  };

  /************************************************************************************************\
  *                               TITLE STUFF (thank you malte <3)                                 *
  \************************************************************************************************/

  let index = 0;
  let revIndex = 0;

  async function loop(oldTitle = "") {
    if (h1)
      h1.setAttribute(
        "title",
        `Current video: "${video.name}" by ${video.artist}`
      );

    let title = video.name
      .toUpperCase()
      .replaceAll(" ", "⠀")
      .split("")
      .join(" ");

    index++;

    if (title != oldTitle || index > title.length * 2 + 1) {
      index = 0;
      revIndex = 0;
    }

    document.title = `${title.slice(
      0,
      index > title.length + 1 ? revIndex-- : index
    )}|`;

    await wait(index > title.length + 1 ? 100 : 300);

    requestAnimationFrame(() => loop(title));
  }
});

/************************************************************************************************\
*                                    VIDEO MANAGER FUNCTIONS                                     *
\************************************************************************************************/

function playVideo(err = false, vid, pageLoad = false) {
  const videoE = document.getElementById("video");
  const paused = document.getElementById("paused");
  const settingsContent = document.getElementById("settingsContent");

  if ((usedVideos.includes(vid) && usedVideos.length != videos.length) || err) {
    video = newVideoF();

    playVideo(false, video);
  } else {
    if (usedVideos.length >= videos.length) usedVideos = [];

    videoE.setAttribute("src", `${pathGen()}/media/${vid.path}.mp4`);
    videoE.play();

    if (!pageLoad) popup(`Now playing: "${vid.name}" by ${vid.artist}`);

    videoE.className = "";

    paused.className = "";

    settingsContent.innerHTML = settingsContent.innerHTML.replace(
      "Unpause",
      "Pause"
    );

    settingsContent.innerHTML = settingsContent.innerHTML.replace(
      "Unrepeat",
      "Repeat"
    );

    usedVideos.push(vid);
  }
}

function newVideoF() {
  return videos[Math.floor(Math.random() * videos.length)];
}

/************************************************************************************************\
*                                        VOlUME FUNCTIONS                                        *
\************************************************************************************************/

function volume(e) {
  if (e.deltaY < 0) volumeUp();
  else volumeDown();
}

function volumeUp() {
  const videoE = document.getElementById("video");
  const mute = document.getElementById("mute");

  if (Math.round(videoE.volume * 100) / 100 < 1) {
    videoE.volume = videoE.volume + 0.1;

    mute.title = `Current volume: ${Math.round(videoE.volume * 100) / 10}/10`;
  } else popup("The volume is on maximum.");
}

function volumeDown() {
  const videoE = document.getElementById("video");
  const mute = document.getElementById("mute");

  if (Math.round(videoE.volume * 100) / 100 > 0.1) {
    videoE.volume = videoE.volume - 0.1;

    mute.title = `Current volume: ${Math.round(videoE.volume * 100) / 10}/10`;
  } else popup("The volume is on minimum.");
}

/************************************************************************************************\
*                                     REPEAT VIDEO FUNCTION                                      *
\************************************************************************************************/

function repeatVideo() {
  const settingsContent = document.getElementById("settingsContent");

  if (repeat) {
    settingsContent.innerHTML = settingsContent.innerHTML.replace(
      "Unrepeat",
      "Repeat"
    );

    repeat = false;

    popup("The video is now unrepeated.");
  } else {
    settingsContent.innerHTML = settingsContent.innerHTML.replace(
      "Repeat",
      "Unrepeat"
    );

    repeat = true;

    popup("The video is now repeated.");
  }
}

/************************************************************************************************\
*                                     RESTART VIDEO FUNCTION                                     *
\************************************************************************************************/

function restartVideo() {
  const videoE = document.getElementById("video");

  videoE.currentTime = 0;
  videoE.play();
}

/************************************************************************************************\
*                                         VIDEO MAPPER                                           *
\************************************************************************************************/

function map(playWS = false) {
  if (playWS)
    document.write(
      videos
        .map(
          (video) =>
            `<a id="contextMenuA" onclick="playWS(\`${video.path}\`)">"${
              video.name
            }" by ${
              video.artist.length > 10
                ? video.artist.split(",")[0]
                : video.artist
            }</a>`
        )
        .join("<br />")
    );
  else
    document.write(
      `All ${videos.length} videos: ${videos
        .map(
          (video) =>
            `"<a href="https://${location.host}?p=${video.path}" id="decorationA">${video.name}</a>" by ${video.artist}`
        )
        .join("; ")}`
    );
}

/************************************************************************************************\
*                                      PAUSE VIDEO FUNCTION                                      *
\************************************************************************************************/

async function pauseVideo() {
  const videoE = document.getElementById("video");
  const paused = document.getElementById("paused");
  const settingsContent = document.getElementById("settingsContent");

  if (videoE.paused) {
    videoE.className = "";
    await videoE.play();

    paused.className = "";

    settingsContent.innerHTML = settingsContent.innerHTML.replace(
      "Unpause",
      "Pause"
    );
  } else {
    videoE.className = "blurred";
    await videoE.pause();

    paused.className = "visible";

    settingsContent.innerHTML = settingsContent.innerHTML.replace(
      "Pause",
      "Unpause"
    );
  }
}

/************************************************************************************************\
*                                         MUTE FUNCTION                                          *
\************************************************************************************************/

function muter() {
  const videoE = document.getElementById("video");
  const mute = document.getElementById("mute");

  if (videoE.muted) {
    videoE.muted = false;
    mute.setAttribute("src", `${pathGen()}/img/unmuted.svg`);
  } else {
    videoE.muted = true;
    mute.setAttribute("src", `${pathGen()}/img/muted.svg`);
  }
}

/************************************************************************************************\
*                                         WAIT FUNCTION                                          *
\************************************************************************************************/

function wait(ms) {
  return new Promise((res) => setTimeout(() => res(true), ms));
}

/************************************************************************************************\
*                                        POPUP FUNCTION                                          *
\************************************************************************************************/

let popupQueue = [];
let lastPopup;

async function popup(text, copy = false) {
  const popupE = document.getElementById("popup");

  if (!popupE) return;

  if (
    popupE.className == " visible" ||
    popupE.className == "main visible" ||
    (popupE.className == "" && popupE.innerHTML != "") ||
    (popupE.className == "main" && popupE.innerHTML != "")
  )
    if (
      lastPopup != text &&
      lastPopup != `"${text}" has been copied to your clipboard!`
    )
      return popupQueue.push({ text, copy });
    else return;

  if (copy) {
    try {
      await navigator.clipboard.writeText(text);

      text = `"${text}" has been copied to your clipboard!`;
    } catch (e) {
      text = "The text could not be copied, the page was not focused.";
    }
  }

  lastPopup = text;

  popupE.innerHTML = text;
  popupE.className += " visible";

  await wait(2000);

  popupE.className = popupE.className.replace(" visible", "");

  await wait(500);

  popupE.innerHTML = "";

  if (popupQueue.length > 0) {
    popupE.innerHTML = "any text, so no other popup can be triggered";

    let queuePopup = popupQueue.shift();

    while (
      (popupQueue.length > 0 &&
        popupQueue[0].text.startsWith("Now playing: ")) ||
      (popupQueue.length > 0 && popupQueue[0].text == queuePopup.text)
    )
      queuePopup = popupQueue.shift();

    await wait(500);

    popupE.innerHTML = "";

    return popup(queuePopup.text, queuePopup.copy);
  }
}

/************************************************************************************************\
*                                         PATH FUNCTION                                          *
\************************************************************************************************/

function pathGen() {
  return document.getElementById("main") ? "." : "..";
}

/************************************************************************************************\
*                              PLAY FUNCTION FOR THE CONTEXT MENU                                *
\************************************************************************************************/

function playWS(vid) {
  const videoE = document.getElementById("video");
  const paused = document.getElementById("paused");
  const settingsContent = document.getElementById("settingsContent");

  videoE.setAttribute("src", `${pathGen()}/media/${vid}.mp4`);

  video = videos.find((i) => i.path == vid);

  popup(`Now playing: "${video.name}" by ${video.artist}`);

  videoE.className = "";

  paused.className = "";

  settingsContent.innerHTML = settingsContent.innerHTML.replace(
    "Unpause",
    "Pause"
  );

  settingsContent.innerHTML = settingsContent.innerHTML.replace(
    "Unrepeat",
    "Repeat"
  );

  if (!usedVideos.includes(video)) usedVideos.push(video);
}

/************************************************************************************************\
*                                           KEY EVENT                                            *
\************************************************************************************************/

document.onkeydown = function (e) {
  switch (e.keyCode) {
    default:
      break;

    case 78:
      playVideo(false, video);
      break;

    case 82:
      repeatVideo();
      break;

    case 83:
      restartVideo();
      break;

    case 32:
      pauseVideo();
      break;

    case 77:
      muter();
      break;

    case 38:
      volumeUp();
      break;

    case 40:
      volumeDown();
      break;

    case 123:
    case 73:
    case 85:
    case 70:
    case 114:
      return false;
  }
};

function redirect(url) {
  const videoE = document.getElementById("video");

  window.location.href =
    url +
    `?p=${video.path}&m=${videoE.muted}&v=${
      Math.round(videoE.volume * 100) / 100
    }&c=${videoE.currentTime}&s=${videoE.paused}&r=${repeat}&u=true`;
}
