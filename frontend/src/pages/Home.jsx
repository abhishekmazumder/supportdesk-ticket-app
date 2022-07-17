import React from 'react'
import {Link} from "react-router-dom"
import {FaQuestionCircle, FaTicketAlt} from "react-icons/fa"

const Home = () => {
  return (
		<>
			<section className="heading">
				<h1>What Do Tou Need Help With?</h1>
				<p>Choose from the options below</p>
			</section>
			<Link to="/new-ticket" className="btn btn-reverse btn-block">
				<FaQuestionCircle /> Create New Ticket
			</Link>
			<Link to="/new-ticket" className="btn btn-block">
				<FaTicketAlt /> View My Ticket
			</Link>
		</>
	);
}

export default Home
