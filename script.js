"use strict";

document.documentElement.classList.add("js-ready");

const scheduleData = {
  fri: [
    {
      time: "18:00",
      title: "Doors open & first plates",
      type: "MARKET",
      note: "Find a seat, meet a maker, start with something warm."
    },
    {
      time: "19:30",
      title: "Supper club: the neighborhood table",
      type: "FOOD",
      note: "A shared menu from the kitchens down the street."
    },
    {
      time: "21:00",
      title: "Nightswim Radio",
      type: "LIVE SET",
      note: "A local selector eases us into the evening."
    },
    {
      time: "23:00",
      title: "One more song",
      type: "DANCE",
      note: "The courtyard stays open. Your bedtime can wait."
    }
  ],
  sat: [
    {
      time: "18:00",
      title: "Market lights on",
      type: "MARKET",
      note: "The whole courtyard wakes up at golden hour."
    },
    {
      time: "20:00",
      title: "Small plates, big table",
      type: "FOOD",
      note: "A rotating feast from independent local kitchens."
    },
    {
      time: "21:30",
      title: "The Balcony Club",
      type: "LIVE BAND",
      note: "A live set for the people who came to dance."
    },
    {
      time: "23:30",
      title: "After hours radio",
      type: "DANCE",
      note: "Guest selectors take it all the way to close."
    }
  ],
  sun: [
    {
      time: "18:00",
      title: "Last light, first bite",
      type: "MARKET",
      note: "Take the scenic route through the stalls."
    },
    {
      time: "19:30",
      title: "Sunday family table",
      type: "FOOD",
      note: "A slow shared dinner made for passing plates."
    },
    {
      time: "21:00",
      title: "Soft Focus",
      type: "LIVE SET",
      note: "A gentler set to stretch out the last evening."
    },
    {
      time: "22:30",
      title: "One last toast",
      type: "TOGETHER",
      note: "We’ll save you a little room at the table."
    }
  ]
};

const schedulePanel = document.getElementById("panel");

function renderSchedule(day) {
  const rows = scheduleData[day].map((event) => {
    return (
      '<div class="row">' +
        '<div class="time">' + event.time + "</div>" +
        "<div>" +
          '<div class="event-title">' + event.title + "</div>" +
          '<div class="event-note">' + event.note + "</div>" +
        "</div>" +
        '<span class="tag">' + event.type + "</span>" +
      "</div>"
    );
  });

  schedulePanel.innerHTML = rows.join("");
}

renderSchedule("fri");

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => {
      item.setAttribute("aria-selected", "false");
    });

    tab.setAttribute("aria-selected", "true");
    renderSchedule(tab.dataset.day);
  });
});

const menuButton = document.getElementById("menu");
const navigationLinks = document.getElementById("links");

menuButton.addEventListener("click", () => {
  const isOpen = navigationLinks.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "Close −" : "Menu +";
});

navigationLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigationLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu +";
  });
});

function showRevealElements() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

showRevealElements();

