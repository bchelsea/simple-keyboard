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
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",

            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",

            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",

            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",

            "space"
        ];

        //create icon html

        const createIconHTML = (icon_name) => {
            return '<i class="material-icons"><$icon_name</i>'
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backpspace", "p", "enter", "?"].indexOf(key) !== -1;


            //adding attribbutes and classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard_key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard_key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    //backspace delete event listener
                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;
            }

        });

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