window.addEventListener('load', function load(event) {
    addPressBehavior();
    addFunctionalityBehavior();
})

// custom button press
function addPressBehavior() {
    document.querySelectorAll('button').forEach(function(item) {
        item.addEventListener('mousedown', function(e) {
            e.target.classList.add('pressed');
        })
        item.addEventListener('mouseup', function(e) {
            e.target.classList.remove('pressed');
        })
    })
}

function addFunctionalityBehavior() {
    document.querySelector('.draggable-button').addEventListener('click', function(e) {
        var draggable = new Draggable();
    })
}



function Draggable() {
    this.node = document.createElement('div');
    this.applyDraggableClass();
    this.addNodeToDom();
    this.applyDraggableBehaviour();
}

Draggable.prototype.applyDraggableClass = function() {
    this.node.classList.add('draggable');
}
Draggable.prototype.addNodeToDom = function() {
    document.querySelector('.content-container').appendChild(this.node);
}
Draggable.prototype.applyDraggableBehaviour = function() {
    var node = this.node;

    var x_elem;
    var y_elem;

    var drag = function(e) {
        node.style.left = (e.pageX - 50) + 'px';
        node.style.top = (e.pageY - 75) + 'px';
    }

    node.addEventListener('mousedown', function(e) {
        node.addEventListener('mousemove', drag)
    })

    node.addEventListener('mouseup', function(e) {
        node.removeEventListener('mousemove', drag);
    })
    node.addEventListener('mouseleave', function(e) {
        node.removeEventListener('mousemove', drag);
    })

}