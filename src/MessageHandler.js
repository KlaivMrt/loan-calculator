class ErrorHandler {

    /**
     * Removes the error div
     */
    static #clearError() {
        document.querySelector("#main .output .alert").remove();
    }
    
    /**
     * Handles the error element.
     * 
     * @param {String} message 
     * @param {Element} parentEl 
     */
    static displayError(message, parentEl) {
        let errorDiv = document.querySelector(".alert");
        if(!errorDiv) {
            errorDiv = document.createElement("div");
            errorDiv.className = "alert";
            errorDiv.textContent = message;
            parentEl.insertBefore(errorDiv, parentEl.children[0]);
            setTimeout(this.#clearError, 3000);
        }
    }
}

export default ErrorHandler;
