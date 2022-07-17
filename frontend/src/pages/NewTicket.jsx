import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const NewTicket = () => {
	const { user } = useSelector(state => state.auth);
	const [name] = useState(user.name);
	const [email] = useState(user.email);
	const [product, setProduct] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
	};

	return (
		<>
			<section className="heading">
				<h1>Create New Ticket</h1>
				<p>Please fill out the form below</p>
			</section>
			<section className="form" style={{ paddingBottom: '50px' }}>
				<div className="form-group">
					<label htmlFor="name">Customer Name</label>
					<input type="text" className="form-control" value={name} disabled />
				</div>
				<div className="form-group">
					<label htmlFor="email">Customer Name</label>
					<input type="email" className="form-control" value={email} disabled />
				</div>

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="product">Product</label>
						<select
							name="product"
							id="product"
							value={product}
							onChange={e => setProduct(e.target.value)}
						>
							<option value="iPhone">iPhone</option>
							<option value="iMac">iMac</option>
							<option value="Macbook Pro">Macbook Pro</option>
							<option value="iPad">iPad</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="description">Description</label>
						<textarea
							name="description"
							id="description"
							placeholder="Description"
							value={description}
							onChange={e => setDescription(e.target.value)}
						></textarea>
					</div>
					<div className="form-group">
						<button className="btn btn-block" type="submit">
							Submit
						</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default NewTicket;
