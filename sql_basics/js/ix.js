Array.prototype.next = function() {
    return this[++this.current];
};

Array.prototype.previous = function() {
    return this[--this.current];
};

Array.prototype.current = 0;