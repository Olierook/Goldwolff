import FeaturedProject from '../../blocks/projects/featured';


// Section structure
import Container from '../../structure/container';
import Section from '../../structure/section';

import { useFirebaseValue } from '../../../hooks/useFirebaseValue';
import css from '../../../styles/sections/projects/featured.module.scss';

export default function FeaturedProjects({ defaultContent }) {
	const [content] = useFirebaseValue("news", defaultContent);


	return (
		<Section classProp={css.hasBg}>
			<Container spacing={'verticalXXXXLrg'}>
				{
					content?.map((data, index) => {
						return (
							<FeaturedProject content={data} index={index} key={index} />
						)
					})
				}
			</Container>
			<div className={css.bgContainer}>
				<span className={css.orbitalBg}>
					<span class={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroLeft} ${css.heroOrbital}`}></span></span>
					<span class={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroCenter}`}></span></span>
					<span class={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroRight} ${css.heroOrbital}`}></span></span>
				</span>
				<span className={css.afterGlowBg}></span>
			</div>
		</Section>
	)
}

{/* <SectionTitle
title="Featured Projects"
preTitle="UX and Full Stack"
subTitle="Focused on the experience, driven by the engineering."
/> 		 */}