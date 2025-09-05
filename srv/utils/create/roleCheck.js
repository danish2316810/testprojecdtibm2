// utils/create/roleCheck.js

function getRoles(req) {
  if (!req.user || req.user.id === "anonymous") {
    return { authorized: false, message: "Anonymous users are not allowed" };
  }

  if (req.user.is("User")) {
    return { authorized: true }; // User is allowed
  }

  if (req.user.is("Admin")) {
    return { authorized: false, message: "Admin is not authorized for this action" };
  }

  return { authorized: false, message: "No valid scope found" };
}

module.exports = { getRoles };
