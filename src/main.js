import ErrorHandler from "./MessageHandler";
import "./scss/main.scss";

/**
 * Handles all the logic of the app
 */
class App {
    // input fields
    #amount;
    #interest;
    #repaymentYears;

    // output fields
    #output;
    #monthlyPayment;
    #totalPayment;
    #totalInterest;

    // calculateBtn
    #calculateBtn;
    
    constructor() {
        this.#amount = document.querySelector("#main .card .input input[placeholder='Loan Amount']");
        this.#interest = document.querySelector("#main .card .input input[placeholder='Annual Interest']");
        this.#repaymentYears = document.querySelector("#main .card .input input[placeholder='Repayment Years']");
        this.#monthlyPayment = document.querySelector("#main .output #m-p");
        this.#totalPayment = document.querySelector("#main .output #t-p");
        this.#totalInterest = document.querySelector("#main .output #t-i");
        this.#output = document.querySelector("#main .output");
        this.#calculateBtn = document.querySelector("#main .card .input button");
    }

    /**
     * Checks if the inputs are filled or not
     * 
     * @returns 0 if all the fields are filled, -1 otherwise;
     */
    #checkInputs() {
        if(!this.#amount.value || !this.#interest.value || !this.#repaymentYears.value) {
            this.#output.children[0].classList.remove("show");
            
            ErrorHandler.displayError("Please, fill out the fields.", this.#output);

            return -1;
        }
        return 0;
    }

    /**
     * Calculates the necessary monthly payments
     * for repaying the loan
     */
    #computeMP = () => {
        const principal = parseFloat(this.#amount.value);
        const calculatedInterest = parseFloat(this.#interest.value) / 100 / 12;
        const calculatedPayments = parseFloat(this.#repaymentYears.value) * 12;
    
        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (principal * x * calculatedInterest) / (x - 1);
        
        if(isFinite(monthly)) {

            this.#monthlyPayment.innerHTML = `<h3>&nbsp; ${monthly.toFixed(2)}</h3>`;
            this.#totalPayment.innerHTML = `<h3>&nbsp; ${(monthly * calculatedPayments).toFixed(2)}</h3>`;
            this.#totalInterest.innerHTML = `<h3>&nbsp; ${((monthly * calculatedPayments) - principal).toFixed(2)}</h3>`
            this.#output.children[0].classList.add("show");
    
        } else {
            this.#output.children[0].classList.remove("show");
            
            ErrorHandler("Please check your numbers.", this.#output);
        }

    }

    /**
     * Places together logic
     * 
     * @param {Object} event
     */
    #calculate = (e) => {
        e.preventDefault();
        if(!this.#checkInputs()) {
            this.#computeMP()
        }
    }

    /**
     * Adds the neccessary event listeners
     */
    loadEventListeners() {
        this.#calculateBtn.addEventListener("click", this.#calculate);
    }
}

const app = new App();
app.loadEventListeners();
