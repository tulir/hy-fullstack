import React from "react"

const UserList = ({users}) => (
	<div className="userlist">
		<h2>Users</h2>
		<table><tbody>
			{users.map(user => (
				<tr key={user.id} className="user">
					<th className="name"><a href="#">{user.name}</a></th>
					<th className="blogs">{user.blogs.length}</th>
				</tr>
			))}
		</tbody></table>
	</div>
)

export default UserList
