function authId(req, res, next) {
  // Authorize the user to only view their pets
  // Check logged in id from the okta JWT against the okta id in the params
  const oktaId = String(req.params.id);
  const authId = String(req.profile.id); // Received from the authRequired middleware
  if (authId !== oktaId) {
    return res.status(401).json({
      message: `Access Denied`,
      validation: [
        `Your auth id ${authId} and the route profile id ${oktaId} don't match`,
      ],
      data: {},
    });
  }
  next();
}

module.exports = { authId };
