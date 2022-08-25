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

  //// constructor interaction areas
  function NewArea(node, e, parElem) {
    this.node = node;

    // create a headline
    this.setHeadline = function (headline) {
      this.headline = headline;
      this.node.querySelector(".cm-infobox-headline").innerHTML = this.headline;
    };
    this.setHeadline("Headline");

    // create a text
    this.setText = function (text) {
      this.text = text;
      this.node.querySelector(".cm-infobox-text").innerHTML = this.text;
    };
    this.setText(
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor..."
    );

    this.setPercPos = function (e, parElem) {
      //calc rel position
      let bounds = parElem.getBoundingClientRect();
      let offsetX = bounds.left;
      let offsetY = bounds.top;
      let x = e.clientX - offsetX;
      const y = e.clientY - offsetY;

      // map rel pos to %  and set
      this.x = 100 / (parElem.clientWidth / x);
      this.y = 100 / (parElem.clientHeight / y);
      this.node.style.left = this.x + "%";
      this.node.style.top = this.y + "%";

      return this.x;
    };
    this.setPercPos(e, parElem);

    //listener to open infobox
    const cmCircleIcon = this.node.querySelector(".cm-circle-icon");
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

    //listener to drag
    cmCircleIcon.addEventListener(
      "drag",
      function (ev) {
        // e.stopPropagation();
        e.preventDefault();
        // console.log(`xPercPos ${this.setPercPos(ev, cmContainer)}`);
        console.log(`xPercPos ${ev.clientX}`);

        //x = newArea.node.style.left = getPercPos(e, cmContainer)["xPerc"] + "%";
        //newArea.node.style.top = getPercPos(e, cmContainer)["yPerc"] + "%";

        // percPos = getPercPos(e, cmContainer);
        // x = percPos.xPerc;
        // y = percPos.yPerc;
      },
      true
    );
  }

  // create a new interaction area
  let newArea = new NewArea(newAreaNode, e, cmContainer);

  // add to the list of areas and into the DOM
  cmInteractAreas.push(newArea);
  cmContainer.appendChild(newArea.node);

  // add event listener to drag
  let deltaX;
  let startX;

  // cmCircleIcon.addEventListener(
  //   "dragstart",
  //   function (e) {
  //     e.preventDefault();
  //     startX = e.clientX;
  //     console.log("dragstart X: ", startX);
  //   },
  //   true
  // );

  // cmCircleIcon.addEventListener(
  //   "drag",
  //   function (e) {
  //     // e.stopPropagation();
  //     e.preventDefault();
  //     console.log(`xPercPos ${getPercPos(e, cmContainer)["xPerc"]}`);
  //     //x = newArea.node.style.left = getPercPos(e, cmContainer)["xPerc"] + "%";
  //     //newArea.node.style.top = getPercPos(e, cmContainer)["yPerc"] + "%";

  //     percPos = getPercPos(e, cmContainer);
  //     x = percPos.xPerc;
  //     y = percPos.yPerc;
  //   },
  //   true
  // );

  // cmCircleIcon.addEventListener(
  //   "dragend",
  //   function (e) {
  //     e.preventDefault();
  //     console.log(`xPercPos dragend ${getPercPos(e, cmContainer)["xPerc"]}`);
  //     newArea.node.style.left = getPercPos(e, cmContainer)["xPerc"] + "%";
  //   },
  //   true
  // );
}

function hideInfoBoxes() {
  for (const area of cmInteractAreas) {
    area.node.querySelector(".cm-info-box").classList.add("hidden");
  }
}

// get Click position relativ to parent div
// function getPercPos(e, elem) {
//   let bounds = elem.getBoundingClientRect();
//   let offsetX = bounds.left;
//   let offsetY = bounds.top;
//   let x = e.clientX - offsetX;
//   const y = e.clientY - offsetY;

//   // map to % position
//   let xPerc = 100 / (cmContainer.clientWidth / x);
//   let yPerc = 100 / (cmContainer.clientHeight / y);
//   return { xPerc, yPerc };
// }
