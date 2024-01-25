const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
    async registration(email, password, name) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

        const user = await UserModel.create({email, password: hashPassword, activationLink, name})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user); // id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }


  async updateUserPeriodLength(userId, periodLength) {
    const user = await UserModel.findByIdAndUpdate(userId, {
      $set: { periodLength },
    }, { new: true });

    if (!user) {
      throw ApiError.UnauthorizedError("Error updating periodLength");
    }
    const userDto = new UserDto(user);

    return userDto;
  }
  async updateUserCycleLength(userId, cycleLength) {
    const user = await UserModel.findByIdAndUpdate(userId, {
      $set: { cycleLength },
    }, { new: true }); // Ensure that the updated document is returned
  
    if (!user) {
      throw ApiError.UnauthorizedError("Error updating cycleLength");
    }
  
    const userDto = new UserDto(user);
    return userDto;
  }

  async updateUserPeriodDates(userId, periodDatesToAdd) {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { periodDates: periodDatesToAdd }
      },
      { new: true }
    );
  
    if (!user) {
      throw ApiError.UnauthorizedError("Error updating periodDates");
    }
  
    const userDto = new UserDto(user);
  
    return userDto;
  }

  async setNewPeriodDates(userId, newPeriodDates) {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: { periodDates: newPeriodDates }
      },
      { new: true }
    );
  
    if (!user) {
      throw ApiError.UnauthorizedError("Error updating periodDates");
    }
  
    const userDto = new UserDto(user);
  
    return userDto;
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Not a valid activation link.");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("User with this email is not registered.");
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      throw ApiError.BadRequest("Wrong password");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    //deleting the token from db
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
