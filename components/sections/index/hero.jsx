import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

import Container from '../../structure/container';
import Section from '../../structure/section';

import space from '../../utils/spacing.util';


import HeroBg from '../../blocks/hero.bg/bg-color-1';

import button from '../../../styles/blocks/button.module.scss';
import hero from '../../../styles/sections/index/hero.module.scss';
import { useFirebaseValue } from "./../../../hooks/useFirebaseValue";



/**
 * TO DO LIST
 *
 * - Create a typog.modules.scss
 *   Load this module onto every component, and use predefined typography classes to keep typography consistent
 *
 * - space.modules.scss
 *   Load this module onto every component, and use predefined spacial classes to keep geometry consistent
 */

export default function Hero() {
	const [content] = useFirebaseValue("main", false);


	const [typingStatus, setTypingStatus] = useState('Initializing');
	const buttonFn = (leaveSite, url) => leaveSite ? () => window.open(url, "_blank") : () => window.open(url, "_self");
	// document.getElementById(url).scrollIntoView()

	return (
		content &&
		<Section classProp={`${hero.section}`}>
			<Container spacing={'VerticalXXXL'}>
				<TypeAnimation className={`${hero.preHeader}`}
					sequence={[
						content?.intro?.startDelay,
						() => { setTypingStatus('typing') },
						content?.intro?.start,
						() => { setTypingStatus('typed') },
						content?.intro?.deleteDelay,
						() => { setTypingStatus('deleting') },
						content?.intro?.end,
						() => { setTypingStatus('deleted') },
						content?.intro?.restartDelay,
					]}
					speed={content?.intro?.speed}
					deletionSpeed={content?.intro?.deletionSpeed}
					wrapper={content?.intro?.wrapper}
					repeat={Infinity}
				/>
				<section>
					<h1 className={hero.header}>
						{content?.header?.name}
					</h1>
					<h1 className={`${hero.header} ${hero.primaryDim}`}>
						{content?.header?.usp}
					</h1>
				</section>
				<section>
					<p className={`${hero.primaryBright} subtitle ${space(["verticalLrg"])}`}>
						{content?.paragraph}
					</p>
				</section>
				<section>
					<button className={`button ${button.primary}`}
						onClick={buttonFn(content?.buttons?.primary?.leaveSite, content?.buttons?.primary?.url)} >
						{content?.buttons?.primary?.title}
					</button>
					<button className={`button ${button.secondary} `}
						onClick={buttonFn(content?.buttons?.secondary?.leaveSite, content?.buttons?.secondary?.url)} >
						{content?.buttons?.secondary?.title}
					</button>
				</section>
			</Container>
			<HeroBg theme="bg-color-1" />
		</Section>
	)
}