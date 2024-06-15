import Head from "next/head"
import About from '../components/sections/index/about'
import Hero from '../components/sections/index/hero'
import FeaturedProjects from '../components/sections/projects/featured'




//
export default function HomePage() {

	return (
		<>
			<Head>
				<title>Goldwölff</title>
			</Head>
			{/* <Color colors={colors} /> */}
			<Hero />
			<FeaturedProjects />
			<About />

		</>
	);
}