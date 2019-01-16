import React, { Component } from 'react';
import API from '../../utils/API';
// import Nav from "../../components/Nav";
// import MainLogo from '../../components/MainLogo';
// import DeleteBtn from "../../components/DeleteBtn";

class Shopping extends React.Component {
	state = {
		stuff: [],
		users: [],
		items: [],
		price: '',
		user: this.props.state
	};

	componentDidMount() {
		this.getItems();
		this.getPerson();
	}

	getItems = () => {
		API.getItems()
			.then((res) => this.setState({ items: res.data, item: '', price: '' }))
			.catch((err) => console.log(err));
	};

	getPerson = () => {
		API.getUsers()
			.then((res) => this.setState({ users: res.data, firstName: '' }))
			.catch((err) => console.log(err));
	};

	deleteItem = (id) => {
		API.deleteItem(id).then((res) => this.getItems()).catch((err) => console.log(err));
	};

	render() {
		return (
			<div>
				<div className="container">
					<form className="white">
						<h5 className="grey-text text-darken-3">Shopping List</h5>
						<thead>
							<tr>
								<th>GREEDY BASTARD</th>
								<th>ITEM</th>
								<th>PRICE</th>
								<th>OCCASION</th>
								<th>COMMENTS</th>
							</tr>
						</thead>
						<tbody>
							{this.state.items.map((items) => (
								<tr key={items._id}>
									<td>{items.name} </td>
									<td>{items.item}</td>
									<td>{items.price}</td>
									<td>{items.occasion}</td>
									<td>{items.comments}</td>
									<td>
										<button onClick={() => this.deleteItem(items._id)}>Delete</button>
										<button onClick={() => this.deleteItem(items._id)}>Buy it!</button>
									</td>
								</tr>
							))}
							{this.state.users.map((user) => (
								<tr key={user._id}>
									<td>{user.firstName}</td>
								</tr>
							))}
						</tbody>
					</form>
				</div>
			</div>
		);
	}
}

export default Shopping;