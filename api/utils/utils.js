module.exports = { errDetail };

function errDetail(res, err) {
  console.log(err);
  return res.status(500).json({
    message: 'There was a problem completing the required operation',
    validation: [],
    data: {},
  });
}
