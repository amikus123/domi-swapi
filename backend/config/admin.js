module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '550a131a10bbd60a5174a21295cd1526'),
  },
});
