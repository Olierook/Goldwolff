import Footer from './footer'
import Navbar from './navbar'

export default function Layout({ defaultGigs, defaultSocial, defaultNavbar, defaultName, children }) {
	return (
		<>
			<Navbar defaultNavbar={defaultNavbar} defaultName={defaultName} />
			<main>{children}</main>
			<Footer defaultGigs={defaultGigs} defaultSocial={defaultSocial} />
		</>
	)
}