window.addEventListener('load', function load(event) {
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

function Draggable() {
  this.nodes = []
}

Draggable.prototype.createAndAppendNode = function() {
  var node = document.createElement('div');
  this.nodes.push(node);
  //classList.add(class1, class2) don't work in IE
  node.classList.add('draggable');
  node.classList.add('item');
  document.querySelector('.content-container').appendChild(node);

  this.applyDraggableBehaviour(node);

  var closeButton = this.createButton('close-button', node);
  this.closeButtonBehavior(node, closeButton);
};

Draggable.prototype.closeButtonBehavior = function(node, button) {
  //polyfill for remove in IE
  if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
  button.addEventListener('click', function() {
    node.remove();
  });
};

Draggable.prototype.createButton = function(customClass, parent) {
  var button = document.createElement('button');
  button.classList.add('control-button');
  button.classList.add(customClass);
  parent.appendChild(button);
  return button;
};

Draggable.prototype.applyDraggableBehaviour = function(node) {
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

function inherit(child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

inherit(DraggableExtended, Draggable);

function DraggableExtended() {
  this.nodes = [];

  this.applyExtendedBehavior = function() {
    var node = this.nodes[this.nodes.length - 1];
    node.classList.add('draggable-extended');

    var extendButton = this.createButton('extend-button', node);
    this.extendButtonBehavior(node, extendButton);
  };

  this.extendButtonBehavior = function(node, button) {
    var extended = false;

    var extend = function() {
      node.style.width = !extended ? (window.innerWidth  + 'px') : '';
      node.style.height = !extended ? (window.innerHeight  + 'px') : '';
      !extended ? node.classList.add('extended') : node.classList.remove('extended');
      extended = !extended;
    };

    button.addEventListener('click', extend);
  };
}
