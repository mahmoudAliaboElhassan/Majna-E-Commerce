import { useSearchParams } from "react-router-dom";

function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const amount = searchParams.get("amount"); // Get the 'amount' query parameter

    return (
        <main>
            <h1>Thank you!</h1>
            <h2>You successfully sent:</h2>
            <div>${amount}</div>
        </main>
    );
}

export default PaymentSuccess;
