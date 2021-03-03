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
        this.elements.main.classList.add("keyboard", "keyboard-hidden");
        this.elements.keysContainer.classList.add("keyboard_keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard_key")


        //adding the elements to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        //automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });

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
            return `<i class="material-icons">${icon_name}</i>`;
        };


        //Looping through each string in key layer and creating button elements
        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;


            //adding attribbutes and classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard_key");

            //Do special things for special keys
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

                case "caps":
                    keyElement.classList.add("keyboard_key--wide", "keyboard_key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");
    
                        //adding capslock toggle
                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                    keyElement.classList.toggle("keyboard_key--active", this.properties.capsLock);
                    });
    
                    break;

                case "enter":
                    keyElement.classList.add("keyboard_key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");
        
                    //adding line break event listener
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });
        
                    break;

                case "space":
                    keyElement.classList.add("keyboard_key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");
            
                    //adding spacebar event listener
                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });
            
                    break;

                case "done":
                    keyElement.classList.add("keyboard_key--wide", "keyboard_key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");
                
                    //adding spacebar event listener
                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });
                
                    break;

                //default lowercase keyboard functionality
                default:
                    keyElement.textContent = key.toLowerCase();
                    
                    //adding spacebar event listener
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });
                    
                    break;            

            }

            //fragment is little container that holds key
            fragment.appendChild(keyElement);

            if(insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;

    },

    _triggerEvent(handlerName) {
        if(typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);

        }

    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for(const key of this.elements.keys) {
            //checking to see if key has an icon 
            if (key.childElementCount === 0) {
                //if non icon then set uppercase otherwise lowercase
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }

        console.log("Caps Lock Toggled!");
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");

    },

    close() {
        this.properties.value = ""
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");

    },
  
};


window.addEventListener("DOMContentLoaded", function() {
    Keyboard.init();
});