export default function LandingPageComp() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-white text-gray-800">
            <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
                <div className="flex items-center">
                    <img src="/logo.png" alt="SubWiz Logo" />
                    <h1 className="text-2xl font-bold text-indigo-600">SubWiz</h1>
                </div>
                <div className="space-x-8">
                    <a href="#why-subwiz" className="text-gray-600 hover:text-indigo-600">Why SubWiz</a>
                    <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600">How It Works</a>
                    <a href="/login" className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700">Login</a>
                </div>
            </nav>

            <section className="text-center py-20 px-4">
                <h2 className="text-5xl font-extrabold mb-4 text-indigo-700">Take Control of Your Subscriptions</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    SubWiz helps you manage, track, and optimize all your subscriptions in one place.
                </p>
                <a
                    href="/register"
                    className="mt-8 inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition"
                >
                    Get Started Free
                </a>
            </section>

            <section id="why-subwiz" className="py-16 bg-white px-6">
                <h3 className="text-3xl font-bold text-center mb-12">Why Choose SubWiz?</h3>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
                    <div className="p-4">
                        <div className="text-4xl mb-3 text-indigo-600">💸</div>
                        <h4 className="text-xl font-semibold mb-2">Save Money Instantly</h4>
                        <p className="text-gray-600">Identify unused subscriptions and cancel with one click. Your wallet will thank you.</p>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl mb-3 text-indigo-600">⏱️</div>
                        <h4 className="text-xl font-semibold mb-2">No More Surprises</h4>
                        <p className="text-gray-600">Get reminders before charges happen. Stay one step ahead, always.</p>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl mb-3 text-indigo-600">📊</div>
                        <h4 className="text-xl font-semibold mb-2">See the Big Picture</h4>
                        <p className="text-gray-600">Get visual reports of your recurring expenses. Clarity = control.</p>
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="py-16 bg-indigo-50 px-6">
                <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
                    <div>
                        <div className="text-4xl mb-2 text-indigo-600 font-bold">1</div>
                        <h4 className="text-xl font-semibold mb-2">Connect Accounts</h4>
                        <p className="text-gray-600">Easily link your subscriptions via email or manual entry.</p>
                    </div>
                    <div>
                        <div className="text-4xl mb-2 text-indigo-600 font-bold">2</div>
                        <h4 className="text-xl font-semibold mb-2">Track & Analyze</h4>
                        <p className="text-gray-600">Get a clear dashboard of your active subscriptions and expenses.</p>
                    </div>
                    <div>
                        <div className="text-4xl mb-2 text-indigo-600 font-bold">3</div>
                        <h4 className="text-xl font-semibold mb-2">Stay Notified</h4>
                        <p className="text-gray-600">Get notified before charges hit—cancel or renew on time.</p>
                    </div>
                </div>
            </section>

            <footer className="bg-white text-center py-6 text-gray-500 text-sm border-t">
                &copy; {new Date().getFullYear()} SubWiz. All rights reserved.
            </footer>
        </main>
    );
}
