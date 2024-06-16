import Head from "next/head";
import Layout from "../components/layout/layout";
import About from '../components/sections/index/about';
import Hero from '../components/sections/index/hero';
import FeaturedProjects from '../components/sections/projects/featured';
import admin from "../firebase/nodeApp";




//
export default function HomePage({ data }) {
	console.log({ data });
	return (
		<Layout defaultGigs={data.gigs} defaultSocial={data.social} defaultNavbar={data.navbar} defaultName={data.name}>
			<Head>
				<title>{data.name}</title>
			</Head>
			<Hero defaultContent={data.main} />
			<FeaturedProjects defaultContent={data.news} />
			<About defaultContent={data?.about} />

		</Layout>
	);
}

export async function getStaticProps() {
	const db = admin.database();
	const ref = db.ref();
	const getData = async () => {
		let data;
		await ref.once("value", function (snapshot) {
			data = snapshot.val();
		});
		return data
	}
	const data = await getData();

	return {
		props: {
			data
		},
		revalidate: 100
	}
}