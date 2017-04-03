window.addEventListener('load', function load(event) {
  addButtonPressBehavior();
  addButtonFunctionalityBehavior();
});

function addButtonFunctionalityBehavior() {
  var draggable = new Draggable();
  var draggableExtended = new DraggableExtended();

  document.querySelector('.draggable-button').addEventListener('click', function(e) {
    draggable.createAndAppendNode();
  });

  document.querySelector('.draggable-extended-button').addEventListener('click', function(e) {
    draggableExtended.createAndAppendNode();
    draggableExtended.applyExtendedBehavior();
  });

}




function Draggable() {}

inherit(DraggableExtended, Draggable);

function DraggableExtended(){

  this.applyExtendedBehavior = function(){
    this.node.classList.add('draggable-extended');
    this.extendButton = this.createButton('extend-button', this.closeButton);
    this.extendButtonBehavior();
  };

  this.extendButtonBehavior = function(){
    var button = this.extendButton;
    var node = this.node;
    var extended = false;
    var nodeLastPositon;

    var extend = function(){
      if(!extended){
        nodeLastPositon = {
         top: node.style.top,
         left: node.style.left
       };
      }

      node.style.width = !extended ? (window.innerWidth - 2 + 'px') : '';
      node.style.height = !extended ? (window.innerHeight - 2 + 'px') : '';
      node.style.borderRadius = !extended ? (0 + 'px') : '';
      node.style.zIndex = !extended ? 2 : '';
      node.style.top  = !extended ? (0 + 'px') : nodeLastPositon.top;
      node.style.left  = !extended ? (0 + 'px') : nodeLastPositon.left;
      extended = !extended;
    };

    button.addEventListener('click', extend);
  };
}


Draggable.prototype.createAndAppendNode = function(){
  this.node = document.createElement('div');
  this.node.classList.add('draggable', 'circle');
  document.querySelector('.content-container').appendChild(this.node);
  this.applyDraggableBehaviour();
  this.closeButton = this.createButton('close-button', this.node);
  this.closeButtonBehavior();
};

Draggable.prototype.closeButtonBehavior = function(){
  var node = this.node;
  this.closeButton.addEventListener('click', function(){
    node.remove();
  });
}

Draggable.prototype.createButton = function(customClass, parent){
  var button = document.createElement('button');
  button.classList.add('circle', customClass);
  addPressBehaviorToButton(button);
  parent.appendChild(button);
  return button;
};

Draggable.prototype.applyDraggableBehaviour = function() {
  var node = this.node;
  var mouseCoordinates;
  var delta;

  var drag = function(e) {

    delta = {
      x: e.pageX - mouseCoordinates.x,
      y: e.pageY - mouseCoordinates.y
    };

    node.style.left = (node.offsetLeft + delta.x) + 'px';
    node.style.top = (node.offsetTop + delta.y) + 'px';

    mouseCoordinates.x = e.pageX;
    mouseCoordinates.y = e.pageY;
  };

  node.addEventListener('mousedown', function(e) {
    e.preventDefault();
    mouseCoordinates = {
      x: e.pageX,
      y: e.pageY
    };

    document.addEventListener('mousemove', drag);

    document.addEventListener('mouseup', function(e) {
      document.removeEventListener('mousemove', drag);
    });
  });
};

function inherit(child, parent){
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

// custom button press
function addButtonPressBehavior() {
  document.querySelectorAll('button').forEach(function(button) {
    addPressBehaviorToButton(button);
  });
}

function addPressBehaviorToButton(button) {
    button.addEventListener('mousedown', function(e) {
      e.target.classList.add('pressed');
    });
    button.addEventListener('mouseup', function(e) {
      e.target.classList.remove('pressed');
    });
}
