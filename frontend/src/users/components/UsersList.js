import React from "react";

import UserItem from "./UserItem";

const UsersList = ({ users }) => {
  if (users.length === 0) {
    return <div>No users found!</div>;
  }
  return (
    <ul>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
};

export default UsersList;
