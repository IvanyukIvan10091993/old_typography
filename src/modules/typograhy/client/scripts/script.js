// Declarations
function addClass(className, element) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ' ' + className;
  }
}
function addClasses(classNames, element) {
  for (var i = 0, len = classNames.length; i < len; i++) {
    addClass(classNames[i], element);
  }
}
function addClassesIfConditions(classNames, conditionFuncs, elements) {
  for (var i = 0, len = elements.length; i < len; i++) {
    var element = elements[i];
    removeClasses(classNames, element);
    if (checkConditions(conditionFuncs, element)) {
      addClasses(classNames, element);
    }
  }
}
function checkCondition(conditionFunc, object) {
  return (conditionFunc(object));
}
function checkConditions(conditionFuncs, object) {
  for (var i = 0, len = conditionFuncs.length; i < len; i++) {
    if(!conditionFuncs[i](object)) {
      return false;
    }
  }
  return true;
}
function findPos(element) {
  var curLeft = 0, curTop = 0;
  if (element.offsetParent) {
    do {
      curLeft += element.offsetLeft;
      curTop += element.offsetTop;
    } while (element = element.offsetParent);
    return { x: curLeft, y: curTop };
  }
}
function fitNavigationMenu() {
  addClassesIfConditions(['navigation-menu__menu_left'], [isOut], document.getElementsByClassName('navigation-menu__menu'));
}
function isOut(element) {
  var position = findPos(element);
  return (position) ? (position.x + element.clientWidth > window.innerWidth) : false;
}
function loadDynamicContent(elements, contentFile) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      for (var i = 0, len = elements.length; i < len; i++) {
        elements[i].innerHTML = xhttp.responseText;
      }
    }
  };
  xhttp.open('GET', contentFile, true);
  xhttp.send();
}
function removeClass(className, element) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}
function removeClasses(classNames, element) {
  for (var i = 0, len = classNames.length; i < len; i++) {
    removeClass(classNames[i], element);
  }
}
// End Declarations

// Event functions
function onResize() {
  fitNavigationMenu();
}
// End Event functions

// Listeners
window.addEventListener('resize', function() {
  onResize();
  setTimeout(onResize, 1000);
});
document.addEventListener('DOMContentLoaded', function(event) {
  fitNavigationMenu();
});
// End Listeners

loadDynamicContent(document.getElementsByClassName('ajax'), 'ajax.html');
