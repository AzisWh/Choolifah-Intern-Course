const jwt = require("jsonwebtoken");
const UserRepository = require("../repository/userRepository");
const bcrypt = require("bcrypt");

const userRepo = new UserRepository();

//register
exports.save = async (data) => {
  return await userRepo.save(data);
};

exports.login = async ({ gmail, password }) => {
  try {
    const user = await userRepo.login(gmail);

    if (!user) return null;

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return null;

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.gmail, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN, {
    //   expiresIn: "7d", // Adjust expiration time for refresh token
    // });

    return {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        username: user.username,
        role: user.role,
        nim: user.nim,
        nidn: user.nidn,
        profile_picture: user.profile_picture,
      },
      token,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Login failed");
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await userRepo.getUser(id);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("error finding user by id: ", error);
    throw new Error("error finding user");
  }
};

// get
exports.findAll = async () => {
  return await userRepo.findAll();
};

// delete
exports.deleteById = async (id) => {
  return await userRepo.deleteById(id);
};

// update
exports.update = async (id, data) => {
  try {
    // Cari user berdasarkan id
    const user = await userRepo.getUser(id);
    if (!user) return null;

    // Jika password ada di dalam data, hash password
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    // Update user dengan data baru
    const updatedUser = await userRepo.update(id, data);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Update failed");
  }
};

exports.searchUsers = async (searchTerm) => {
  return await userRepo.searchUsers(searchTerm);
};