"use strict";
import { isFilled, isValid, printObsTable } from "./validator.js";

window.ValidateCode = ValidateCode;
window.refreshWorkingArea = refreshWorkingArea;

function enableDragSort(listClass) {
  const sortableLists = document.getElementsByClassName(listClass);
  Array.prototype.map.call(sortableLists, (list) => {
    enableDragList(list);
  });

  // Shuffle boxes randomly
  Array.prototype.map.call(sortableLists, (list) => {
    const boxes = Array.from(list.children);
    shuffleArray(boxes);
    boxes.forEach((box) => list.appendChild(box));
  });
}

export function refreshWorkingArea() {
  enableDragSort("drag-sort-enable");
  refreshObservations();
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function enableDragList(list) {
  Array.prototype.map.call(list.children, (item) => {
    enableDragItem(item);
  });
}

export function enableDragItem(item) {
  item.setAttribute("draggable", true);
  item.ondrag = handleDrag;
  item.ondragend = handleDrop;
}

export function handleDrag(event) {
  const selectedItem = event.target,
    list = selectedItem.parentNode,
    x = event.clientX,
    y = event.clientY;

  selectedItem.classList.add("drag-sort-active");
  let swapItem =
    document.elementFromPoint(x, y) === null
      ? selectedItem
      : document.elementFromPoint(x, y);

  if (list === swapItem.parentNode) {
    swapItem =
      swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
    list.insertBefore(selectedItem, swapItem);
  }
}

export function handleDrop(item) {
  item.target.classList.remove("drag-sort-active");
  const boxOrder1 = getBoxOrder("module");
  const boxOrder2 = getBoxOrder("tb");
  //console.log('List 1 order:', boxOrder1);
  //console.log('List 2 order:', boxOrder2);
}

export function getBoxOrder(listId) {
  const list = document.getElementById(listId);
  const boxOrder = Array.from(list.children).map((item) => item.id);
  return boxOrder;
}

export function refreshObservations() {
  document.getElementById("table-head").innerHTML = "";
  document.getElementById("table-body").innerHTML = "";
  document.getElementById("result").innerHTML = "";
}

export function ValidateCode() {
  refreshObservations();
  if (isFilled()) {
    refreshObservations();
    if (isValid()) {
      refreshObservations();
      // print success/failure message and truth table
      let head = `<tr><th>Time</th><th>A</th><th>B</th><th>Y Expected</th><th>Y Observed</th>`;
      document.getElementById("table-head").innerHTML = head;
      printObsTable(selectedTab);
      return;
    }
  }
}

(() => {
  refreshWorkingArea();
})();
