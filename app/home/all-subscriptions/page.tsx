"use client"

import Modal from "@/app/components/Modal";
import SubForm from "@/app/components/SubForm";
import { useState } from "react";


const predefinedSubscriptions = [
    {
        id: 1,
        user_id: 1,
        platform: "Netflix",
        start_date: "2023-01-01",
        billing_date: "2023-02-01",
        billing_frequency: "monthly",
        price: "9.99",
        currency: "USD",
    },
    {
        id: 2,
        user_id: 1,
        platform: "Spotify",
        start_date: "2023-01-15",
        billing_date: "2023-02-15",
        billing_frequency: "monthly",
        price: "4.99",
        currency: "USD",
    },
    {
        id: 3,
        user_id: 1,
        platform: "YouTube Premium",
        start_date: "2023-01-20",
        billing_date: "2023-02-20",
        billing_frequency: "monthly",
        price: "11.99",
        currency: "USD",
    },
];


export default function AllSubscriptions() {

    const [subscriptions, setSubscriptions] = useState(predefinedSubscriptions);
    const [isOpen, setIsOpen] = useState(false);
    const [currentSub, setCurrentSub] = useState<number | null>(null);


    function handleDelete(id: number) {
        const confirmed = window.confirm("Are you sure you want to delete this subscription?");
        if (!confirmed) return;

        const updated = subscriptions.filter((sub) => sub.id !== id);
        setSubscriptions(updated);
    }

    return (
        <div className="min-h-screen text-gray-800 p-6">
            <div className="items-center mb-4 justify-center flex flex-col">
                <h1 className="text-3xl font-bold mb-4 justify-center">All Subscriptions</h1>
                <p className="mb-4">
                    Here you can view and manage all your subscriptions. Click on the
                    subscription name to edit or delete it.
                </p>
            </div>
            {subscriptions.map((subscription) => (
                <div key={subscription.id} className="p-2 mb-3 backdrop-blur-md bg-white/30 border border-white/40 shadow-lg rounded-2xl p-4 text-gray-900">
                    <h2 className="text-lg font-semibold">{subscription.platform}</h2>
                    <p>
                        Start Date: {subscription.start_date} <br />
                        Billing Date: {subscription.billing_date} <br />
                        Frequency: {subscription.billing_frequency} <br />
                        Price: {subscription.price} {subscription.currency}
                    </p>
                    <button
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => {
                            setCurrentSub(subscription.id);
                            setIsOpen(true);
                        }}
                    >
                        Edit
                    </button>

                    <button
                        className="mt-2 ml-2 bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => handleDelete(subscription.id)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}