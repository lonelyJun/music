const daoDataPackage = (err, data) => {
  let returnData = {
    code: 0,
    message: 'success',
    data: null
  }
  if (!err) {
    returnData.data = data
  } else {
    returnData.code = 1
    returnData.message = err
  }
  return returnData;
}

module.exports = {
  daoDataPackage
}