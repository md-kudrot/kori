import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import CraftCategories from "./components/Craftcategories"
import ProductGrid from "./components/ProductsGrid"
import ArtisanCards from "./components/ArticansCart"
import TrustSection from "./components/TrustSection"
import JoinMakerBanner from "./components/JoinMaker"
import Footer from "./components/Footer"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Profile from "./components/Profile"

function HomePage() {
    return (
        <>
            <Hero />
            <CraftCategories />
            <ProductGrid />
            <ArtisanCards />
            <TrustSection />
            <JoinMakerBanner />
        </>
    )
}

export default function App() {
    return (
        <>
            <header className="sticky top-0 z-40">
                <Navbar />
            </header>
            <main className="bg-gradient-to-b from-[#16120e] to-[#14100c]">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </main>
            <Footer />
            <Toaster position="top-center" />
        </>
    )
}

