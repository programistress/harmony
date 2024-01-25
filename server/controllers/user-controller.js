const ApiError = require("../exceptions/api-error");
const userService = require("../service/user-service");
const UserService = require("../service/user-service");
const { validationResult } = require("express-validator"); //for validation of request body

class UserController {
  async registration(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
        }
        const {email, password, name} = req.body;
        const userData = await userService.registration(email, password, name);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData);
    } catch (e) {
        next(e);
    }
}

  async updateUserPeriodLength(req, res, next) {
    try {
      const { userId } = req.params;
      const { average, times } = req.body.periodLength;

      const updatedUser = await UserService.updateUserPeriodLength(userId, { average, times });

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async updateUserCycleLength(req, res, next) {
    try {
      const { userId } = req.params;
      const { average, times } = req.body.cycleLength;
  
      const updatedUser = await UserService.updateUserCycleLength(userId, { average, times });
  
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async updateUserPeriodDates(req, res, next) {
    try {
      const { userId } = req.params;
      const { periodDates } = req.body;

      const updatedUser = await UserService.updateUserPeriodDates(
        userId,
        periodDates
      );

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async setNewPeriodDates(req, res, next) {
    try {
      const { userId } = req.params;
      const { periodDates } = req.body;

      const updatedUser = await UserService.setNewPeriodDates(
        userId,
        periodDates
      );

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
