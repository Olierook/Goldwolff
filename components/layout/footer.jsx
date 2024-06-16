
import moment from 'moment';
import Container from '../structure/container';
import Icon from '../utils/icon.util';

import { useEffect, useState } from 'react';
import { useFirebaseValue } from '../../hooks/useFirebaseValue';
import css from '../../styles/structure/footer.module.scss';


export default function Footer({ defaultGigs, defaultSocial }) {
	const [gigs] = useFirebaseValue("gigs", defaultGigs);
	const [socials] = useFirebaseValue("social", defaultSocial);
	const [playedGigs, setPlayedGigs] = useState([])
	const [gigsToGo, setGigsToGo] = useState([])

	const isGigArray = Array.isArray(gigs)

	moment.locale("en-gb")

	const dateSortFunction = (asc) => (a, b) => {
		return moment(a.date, "DD-MM-YYYY").isBefore(moment(b.date, "DD-MM-YYYY")) ? asc : -1 * asc;
	};



	useEffect(() => {
		const playedGigsTemp = [];
		const gigsToGoTemp = [];
		if (isGigArray) {
			for (const gig of gigs) {
				gig.hide || (moment(gig.date, "DD-MM-YYYY").isBefore(moment()) ? playedGigsTemp.push(gig) : gigsToGoTemp.push(gig));
			}
		}
		setPlayedGigs(playedGigsTemp);
		setGigsToGo(gigsToGoTemp);
	}, [isGigArray])







	return (
		<footer id="gigs" className={css.container}>
			<Container spacing={['verticalXXLrg', 'bottomLrg']}>
				<section className={css.sections}>
					<ul className={css.thanks} id="gigs">
						{gigsToGo[0] && <li><h4>Upcoming Gigs</h4></li>}
						{
							gigsToGo[0] && gigsToGo.sort(dateSortFunction(-1)).map(({ date, event, venue, city }, index) => {

								return (
									<li key={index}>
										<p>{venue} {venue && event ? "|" : ""} {event}</p>
										<h3>{date}</h3>
										<p>{city}</p>
									</li>
								)
							})
						}
						<><li><br /><h4>Past Gigs</h4></li></>

						{
							playedGigs.sort(dateSortFunction(1)).map(({ date, event, venue, city }, index) => {

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

					{socials && <ul className={css.social}>
						<li><h4>Social</h4></li>
						<li className={css.socialList}>
							{
								socials.map(({ url, icon }, index) => {
									return (
										<a key={index} href={url} rel="noreferrer" target="_blank"><Icon icon={[icon === "at" ? 'fas' : 'fab', icon]} /></a>
									)
								})
							}
						</li>
					</ul>}
				</section>

			</Container>
			<canvas id="gradient-canvas" className={''} data-transition-in ></canvas>
		</footer>
	)
}
