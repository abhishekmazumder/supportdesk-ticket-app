const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

// New User Registration @route /api/users
//access public
const registerUser = asyncHandler(async (req, res) => {
	console.log(req.body);
	const { name, password, email } = req.body;

	// validation
	if (!name || !email || !password) {
		return res.status(400).json({ message: 'Please enter all fields!' });
		// throw new Error('Please enter all fields!');
	}

	//Find whether User already exist
	const userExist = await User.findOne({ email });
	if (userExist) {
		return res
			.status(400)
			.json({ message: 'User with email-id Already Exist!' });
	}

	//Hashing the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	//Creating New User
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400).json({ message: 'Invalid User Data!' });
	}
});



// User Login @route /api/users/login
//access public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	//Find whether user and password match
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(401).json({ message: 'Invalid email or password. Try again.' });
	}
});

// Get current user @route /api/users/me
//access private
const getMe = asyncHandler(async (req, res) => {
	const user = {
		id: req.user._id,
		email: req.user.email,
		name: req.user.name,
	};
	res.status(200).json(user);
});

//jwt
const generateToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

module.exports = {
	registerUser,
	loginUser,
	getMe,
};
