import { Routes, Route } from "react-router-dom"
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
                </Routes>
            </main>
            <Footer />
        </>
    )
}

