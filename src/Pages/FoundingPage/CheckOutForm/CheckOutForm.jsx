/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import './CheckOutForm.css';
import useAuth from "../../../Hooks/useAuth";

const CheckOutForm = ({ amount, resetFormInput }) => {
    const { user } = useAuth();
    const [clientSecret, setClientSecret] = useState('');
    const totalPrice = parseInt(amount);
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            toast.error(error.message);
        } else {
            toast.success('Payment Created',paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        });

        if (confirmError) {
            console.log(confirmError);
        } else {
            if (paymentIntent.status === 'succeeded') {
                toast.success(`Transaction ID: ${paymentIntent.id}`);
                const amount = paymentIntent.amount;
                const convertedAmount = (amount / 100).toFixed(2);
                const paymentInfo = {
                    givenAmount: `${convertedAmount} $`,
                    paymentIntentId: paymentIntent.id,
                    donatorName: user?.displayName,
                    donatorEmail: user?.email,
                    donatorImage: user?.photoURL,
                };
                await axiosSecure.post('donations', paymentInfo);
                resetFormInput();
                resetForm();
            }
        }
    };

    const resetForm = () => {
        setClientSecret('');
        elements.getElement(CardElement).clear();
    };

    return (
        <div className="flex justify-center items-center  bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '18px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <div className="mt-6">
                        <button
                            disabled={!stripe || !clientSecret}
                            type="submit"
                            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                            Pay
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckOutForm;
