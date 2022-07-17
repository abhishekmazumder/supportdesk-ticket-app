import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;
	const { user, isLoading, isSuccess, isError, message } = useSelector(
		state => state.auth
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		// Redirect when logged-in
		if (isSuccess || user) {
			navigate('/');
		}
		// resetting the state values
		dispatch(reset);
	}, [user, isSuccess, isError, message, dispatch, navigate]);

	const handleChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = e => {
		e.preventDefault();
		const userData = { email, password };
		dispatch(login(userData));
	};

	if(isLoading){
		return <Spinner />
	}

	return (
		<div>
			<section className="heading">
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Please Login To Get Support</p>
			</section>
			<section className="form">
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							value={email}
							placeholder="Enter Your E-mail"
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							value={password}
							placeholder="Enter Your Password"
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-block">
							Submit
						</button>
					</div>
				</form>
			</section>
		</div>
	);
};

export default Login;
