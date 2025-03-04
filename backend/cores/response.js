exports.success = (res, message, data) => {
  res.status(200).json({
    error: false,
    message,
    data,
  });
};

exports.raw = (res, data) => {
  res.status(200).json(data);
};

exports.created = (res, message, data) => {
  res.status(201).json({
    error: false,
    message,
    data,
  });
};

exports.badRequest = (res, message) => {
  res.status(400).json({
    error: true,
    message,
  });
};

exports.unauthorized = (res, message) => {
  res.status(401).json({
    error: true,
    message,
  });
};

exports.forbidden = (res, message) => {
  res.status(403).json({
    error: true,
    message,
  });
};

exports.notFound = (res, message) => {
  res.status(404).json({
    error: true,
    message,
  });
};

exports.error = (res, msg) => {
  res.status(500).json({
    error: true,
    message: msg,
  });
};
