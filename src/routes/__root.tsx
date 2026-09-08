import { createRootRoute, Outlet, Link } from "@tanstack/react-router"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import CraftCategories from "../components/Craftcategories"
import ArtisanCards from "../components/ArticansCart"
import ProductGrid from "../components/ProductsGrid"
import TrustSection from "../components/TrustSection"
import JoinMakerBanner from "../components/JoinMaker"
import Footer from "../components/Footer"
export const Route = createRootRoute({
    component: () => (
        <>
            <header className="sticky top-0 z-40">
                <Navbar></Navbar>
            </header>
            <main className=" bg-gradient-to-b from-[#16120e] to-[#14100c] ">
                <Hero></Hero>
                <CraftCategories></CraftCategories>
                <ProductGrid></ProductGrid>
                <ArtisanCards></ArtisanCards>
                <TrustSection></TrustSection>
                <JoinMakerBanner></JoinMakerBanner>
                <Footer></Footer>
                <Outlet />
            </main>
        </>
    )
})

