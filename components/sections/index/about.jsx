// Core packages

// Section structure
import Container from '../../structure/container';
import Section from '../../structure/section';

// Section general blocks

// Section specific blocks
import BadgesBlock from '../../blocks/about.badges.block';
import CopyBlock from '../../blocks/about.copy.block';

// Section scss
import about from '../../../styles/sections/index/about.module.scss';
import { useFirebaseValue } from "./../../../hooks/useFirebaseValue";

/**
 * Section: About
 * An overview of yourself.
 * Highlight your top level attributes and disciplines.
 * 
 * @returns {jsx} <About />
 */
export default function About({ defaultContent }) {
	const [content] = useFirebaseValue("about", defaultContent);

	return (
		content &&
		<Section classProp={about.section}>
			<Container spacing={['verticalXXXLrg']}>

				<section className={about.content}>
					<div className={about.image}>
						<img src="/img/Bandphoto2024.png" alt="Band picture" />
						{/* <Image src="/img/family-photo.jpg" width={600} height={800}/> */}
					</div>
					<div className={about.copy} >
						<CopyBlock
							title="About"
							containerClass={about.container}
							iconClass={about.icon}
							icon={['fas', 'music']}
							copy={content?.bio}
						/>
						<BadgesBlock
							title="Contact"
							containerClass={about.container}
							list={methods}
							fullContainer="fullContainer"
							block="methods"
							iconClass={about.icon}
							icon="address-card"
							copy={content?.contact}
							headerIcon={`${about.icon}`}
						/>
					</div>
				</section>
			</Container>
		</Section>
	)
}

// <SectionTitle
// 	title="EP Release"
// 	preTitle="Synopsis"
// 	subTitle="With a diverse skill set that includes UX design, UI design, full stack development, operational architecture, systems design, photography, and branding, I am a well-rounded digital professional."
// />

const methods = [
	{ key: 'planet-moon', name: 'User Research', type: 'fad' },
	{ key: 'qrcode', name: 'Digital Strategy', type: 'fad' },
	{ key: 'window', name: 'Design Systems', type: 'fad' },
	{ key: 'cubes', name: 'Product Strategy', type: 'far' },
	{ key: 'layer-plus', name: 'Brand Strategy', type: 'fad' },
	{ key: 'solar-system', name: 'Operations', type: 'fad' },
]