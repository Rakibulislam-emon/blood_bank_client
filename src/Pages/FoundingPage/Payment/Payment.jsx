import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from "../CheckOutForm/CheckOutForm";
import { useState } from "react";

const Payment = () => {
    const [amount, setAmount] = useState("");
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_URL);

    const handleSetValue = (e) => {
        e.preventDefault();
        const form = e.target;
        const value = form.amount.value;
        setAmount(value);
    };

    const resetFormInput = () => {
        setAmount("");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full">
                <form onSubmit={handleSetValue} className="text-center mb-8">
                    <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="text-center p-2 border border-black w-full rounded mb-4"
                        type="number"
                        name="amount"
                        placeholder="Type your amount here in USD$"
                    />
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200">
                        Done
                    </button>
                </form>
                <Elements stripe={stripePromise}>
                    <CheckOutForm resetFormInput={resetFormInput} amount={amount} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
