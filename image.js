"use strict";

const cmInteractAreaTemplate = document.querySelector(
  ".cm-interact-area-template"
);
const cmInteractAreas = [];

// const cmContainer = document.getElementsByClassName("cm-container");
const cmContainer = document.querySelector(".cm-container");
cmContainer.addEventListener(
  "click",
  function (e) {
    console.log("cmContainer click", e);
    createBtnObject(e);
  }
  // { once: true }
);

function createBtnObject(e) {
  console.log("createBtnObject");
  // close all info boxes
  hideInfoBoxes();

  // create a copy of the button template
  let newAreaNode = cmInteractAreaTemplate.cloneNode(true);
  newAreaNode.classList.remove("cm-interact-area-template");
  newAreaNode.classList.add("cm-interact-area");

  //get the click pos in percent relativ to parent offset
  let percPos = getPercPos(e, cmContainer);

  //Build the object
  let newArea = {
    node: newAreaNode,
    x: percPos.xPerc,
    y: percPos.yPerc,
    headline: "Headline",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor...",
  };

  //add the content
  newArea.node.querySelector(".cm-infobox-headline").innerHTML =
    newArea.headline;
  newArea.node.querySelector(".cm-infobox-text").innerHTML = newArea.text;

  //set position for the new area
  newArea.node.style.left = newArea.x + "%";
  newArea.node.style.top = newArea.y + "%";

  // add to the list of areas and into the DOM
  cmInteractAreas.push(newArea);
  cmContainer.appendChild(newArea.node);

  //add listener to open infobox
  const cmCircleIcon = newArea.node.querySelector(".cm-circle-icon");
  cmCircleIcon.addEventListener(
    "click",
    function (e) {
      e.stopPropagation(); // prevent to bubble to the container
      // only show this infobox
      hideInfoBoxes();
      newArea.node.querySelector(".cm-info-box").classList.remove("hidden");
    },
    true // useCapture to fire this one before being dispatched to any EventTarget beneath it
  );

  // add event listener to drag
  let deltaX;
  let startX;

  cmCircleIcon.addEventListener(
    "dragstart",
    function (e) {
      e.preventDefault();
      startX = e.clientX;
      console.log("startX: ", startX);
    },
    true
  );

  cmCircleIcon.addEventListener(
    "drag",
    function (e) {
      // e.stopPropagation();
      e.preventDefault();
      //console.log("DRAG e: ", e);
      console.log("initial x: ", x);
      console.log("e.clientX", e.clientX);
      deltaX = e.clientX - offsetX;
      console.log("deltaX", deltaX);
      // x = e.clientX;
      xPerc = 100 / (cmContainer.clientWidth / x);
      console.log("newArea.node ", newArea.node);
      newArea.node.style.left = xPerc + "%";
    },
    true
  );
}

function hideInfoBoxes() {
  for (const area of cmInteractAreas) {
    area.node.querySelector(".cm-info-box").classList.add("hidden");
  }
}

// get Click position relativ to parent div
function getPercPos(e, elem) {
  let bounds = elem.getBoundingClientRect();
  let offsetX = bounds.left;
  let offsetY = bounds.top;
  let x = e.clientX - offsetX;
  const y = e.clientY - offsetY;

  // map to % position
  let xPerc = 100 / (cmContainer.clientWidth / x);
  let yPerc = 100 / (cmContainer.clientHeight / y);
  return { xPerc, yPerc };
}

// test 2
