const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys:[],
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
    },


    init() {
        //create the new elements here
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        //setup keys 
        this.elements.main.classList.add("keyboard", "3keyboard-hidden");
        this.elements.keysContainer.classList.add("keyboard_keys");


        //adding the elements to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [];

    },

    triggerEvents(handlerName) {
        console.log("Event Triggered!" + handlerName);

    },

    toggleCapsLock() {
        console.log("Caps Lock Toggled!");
    },

    open(initialValue, oninput, onclose) {

    },

    close() {

    },
  
};


window.addEventListener("DOMContentLoaded", function() {
    Keyboard.init();
});