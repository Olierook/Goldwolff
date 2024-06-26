import Image from 'next/image'

import { m, useAnimation } from "framer-motion"
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'



import button from '../../../styles/blocks/button.module.scss'
import css from '../../../styles/sections/projects/featured.module.scss'

export default function FeaturedProject({ content }, index) {

	const { project, url, descriptionTitle, description, description2, description3, cta, images } = content;

	const controls = useAnimation();
	const { ref, inView } = useInView({
		"threshold": 0.25,
		"triggerOnce": false
	})

	useEffect(() => {
		if (inView) { controls.start("visible") }
		if (!inView) { controls.start("hidden") }
	}, [controls, inView])

	return (
		<m.section
			key={index}
			className={css.project}
			//framer-motion
			ref={ref}
			variants={container}
			initial={["rest", "hidden"]}
			whileHover="hover"
			animate={controls} >

			<div className={css.details}>
				<div className={css.projectHeader}>
					<div className={css.header}>
						<h3 className="highlight">{project}</h3><span className={css.privateOr}></span>
					</div>
					<div className={css.description}>
						<p><strong>{descriptionTitle}</strong> {description}</p>
						<br />
						<p> {description2} <strong>{description3}</strong></p>
					</div>
					<button style={{ zIndex: 100, width: "fit-content" }} className={`button ${button.primary}`}
						onClick={() => window.open(url, "_blank")} >
						{cta}
					</button>
				</div>
			</div>

			<div className={css.imageContainer}>
				<span className={`${css.imageAnimationContainer}`}>
					{images.map(({ key, url, hover, h, w }, index) => {
						hover = (hover === 'left') ? hoverLeft : hoverRight
						return (
							<m.div key={`${index}-${key}`} variants={item}>
								<m.div variants={hover}>
									<Image src={url} alt="x" height={h} width={w} />
								</m.div>
							</m.div>
						)
					}
					)}
				</span>
			</div>
		</m.section>
	)
}

const container = {
	hidden: {
		transition: {
			delayChildren: 0.125,
			staggerChildren: 0.0625
		}
	},
	visible: {
		transition: {
			delayChildren: 0.125,
			staggerChildren: 0.25,
		}
	},
	rest: {
		transition: {
			delayChildren: 0,
			staggerChildren: 0,
		}
	},
	hover: {
		transition: {
			delayChildren: 0,
			staggerChildren: 0,
		}
	}
}

const item = {
	hidden: {
		y: 75,
		opacity: 0,
		transition: {
			type: "tween",
			ease: "easeIn",
			duration: .35,
		}
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "tween",
			ease: "easeOut",
			duration: .5,
		}
	},
}

const hoverLeft = {
	rest: {
		x: 0
	},
	hover: {
		x: -20
	}
}

const hoverRight = {
	rest: {
		x: 0
	},
	hover: {
		x: 20
	}
}

