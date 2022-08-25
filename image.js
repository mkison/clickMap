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

cmContainer.addEventListener("dragover", function (e) {
  e.preventDefault();
});

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

    // set Perc Pos
    this.setPercPos = function (e, parElem) {
      //calc rel position
      const bounds = parElem.getBoundingClientRect();
      const offsetX = bounds.left;
      const offsetY = bounds.top;
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      console.log(`
      e.clientX ${e.clientX}
      e.clientY ${e.clientY}`);

      // map rel pos to %  and set
      this.x = 100 / (parElem.clientWidth / x);
      this.y = 100 / (parElem.clientHeight / y);
      this.node.style.left = this.x + "%";
      this.node.style.top = this.y + "%";

      return { x: this.x, y: this.y };
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

    let xTmp;
    //listener to drag
    cmCircleIcon.addEventListener("drag", function (ev) {
      xTmp = newArea.setPercPos(ev, parElem).x;
      console.log(`xTmp ${xTmp}`);
    });

    // cmCircleIcon.addEventListener("dragstart", function (ev) {
    //   xTmp = newArea.setPercPos(ev, parElem).x;
    //   console.log(`UP xTmp ${xTmp}`);
    // });

    // //listener to dragend
    // cmCircleIcon.addEventListener("dragend", function (ev) {
    //   newArea.setPercPos(ev, parElem);
    // });
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
