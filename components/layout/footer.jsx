import { useState, useEffect } from 'react'

import Container from '../structure/container'
import Icon from '../utils/icon.util'
import moment from 'moment'

import css from '../../styles/structure/footer.module.scss'

import content from '../../content/footer.json'
import settings from '../../content/_settings.json'
import colors from '../../content/projects/_colors.json'

export default function Footer() {
	moment.locale("en-gb")

	const dateSortFunction = (asc) => (a, b) => {
		return moment(a.date, "DD-MM-YYYY").isBefore(moment(b.date, "DD-MM-YYYY")) ? asc : -1 * asc;
	};
	const playedGigs = [];
	const gigsToGo = [];


	for (const gig of content.gigs) {
		gig.hide || (moment(gig.date, "DD-MM-YYYY").isBefore(moment()) ? playedGigs.push(gig) : gigsToGo.push(gig));
	}
	
	
	
	return (
		<footer id="gigs" className={css.container}>
			<Container spacing={['verticalXXLrg', 'bottomLrg']}>
				<section className={css.sections}>
					<ul className={css.thanks} id="gigs">
					{gigsToGo[0] && <li><h4>Upcoming Gigs</h4></li>}
						{
							gigsToGo[0] && gigsToGo.sort(dateSortFunction(-1)).map( ({ date, event, venue, city }, index) => {

								return (
									<li key={index}>
										<p>{venue} {venue && event ? "|" : ""} {event}</p>
										<h3>{date}</h3>
										<p>{city}</p>
									</li>
								)
							})
							}
						<><li><br/><h4>Past Gigs</h4></li></>
					
						{
						playedGigs.sort(dateSortFunction(1)).map( ({ date, event, venue, city }, index) => {

							return (
								<li key={index}>
									<p>{venue} {venue && event ? "|" : ""} {event}</p>
									<h3>{date}</h3>
									<p>{city}</p>
								</li>
							)
						})
						}
					</ul>

					<ul className={css.social}>
						<li><h4>Social</h4></li>
						<li className={css.socialList}>
							{
							content.social.map( ({ url, icon }, index) => {
								return (
									<a  key={index} href={url} rel="noreferrer" target="_blank"><Icon icon={[ icon === "at" ? 'fas' : 'fab', icon ]} /></a>
								)
							})
							}
						</li>
					</ul>
				</section>
				
			</Container>
			<canvas id="gradient-canvas" className={''} data-transition-in ></canvas>
		</footer>
	)
}
