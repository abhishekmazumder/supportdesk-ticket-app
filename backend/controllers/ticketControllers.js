const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// Get current User Tickets  GET @route /api/tickets
//access private
const getTickets = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		return res.status(401).json({ message: 'User not found!' });
	}
	const tickets = await Ticket.find({ user: req.user.id });
	return res.status(200).json(tickets);
});

// Create User's New Ticket POST @route /api/tickets
//access private
const createTicket = asyncHandler(async (req, res) => {
	const { product, description } = req.body;
	if (!product || !description) {
		res.status(400).json({ message: 'Please enter product and description!' });
	}
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401).json({ message: 'User not found!' });
	}
	const ticket = await Ticket.create({
		product,
		description,
		status: 'new',
		user: req.user.id,
	});
	res.status(201).json(ticket);
});

// Get current User Single Tickets  GET @route /api/tickets/:id
//access private
const getTicket = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		return req.status(401).json({ message: 'User not found!' });
	}
	const ticket = await Ticket.findById(req.params.id);

	if (!ticket) {
		res.status(404).json({ message: 'No ticket found' });
	}
	if (ticket.user.toString() !== req.user.id) {
		res.status(401).json({ message: 'Not Authorized' });
	}
	return res.status(200).json({ ticket });
});

// Delete Ticket  DELETE @route /api/tickets/:id
//access private
const deleteTicket = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		return req.status(401).json({ message: 'User not found!' });
	}

	const ticket = await Ticket.findById(req.params.id);
	if (!ticket) {
		res.status(404).json({ message: 'No ticket found' });
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401).json({ message: 'Not Authorized' });
	}

	await ticket.remove();

	return res.status(200).json({ success: true });
});

// Update Tickets  PUT @route /api/tickets/:id
//access private
const updateTicket = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		return req.status(401).json({ message: 'User not found!' });
	}
	const ticket = await Ticket.findById(req.params.id);

	if (!ticket) {
		res.status(404).json({ message: 'No ticket found' });
	}
	if (ticket.user.toString() !== req.user.id) {
		res.status(401).json({ message: 'Not Authorized' });
	}

	const updatedTicket = await Ticket.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	);
	return res.status(200).json({ updatedTicket });
});

module.exports = {
	getTickets,
	createTicket,
	getTicket,
	deleteTicket,
	updateTicket,
};
