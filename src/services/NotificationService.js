const Notification = require("../models/Notification");

class NotificationService {
  static async notify(user_id, message, type) {
    return await Notification.create(user_id, message, type);
  }

  static async missedPunch(user_id) {
    return await this.notify(
      user_id,
      "You forgot to clock out",
      "missed_punch",
    );
  }

  static async timesheetApproved(user_id) {
    return await this.notify(
      user_id,
      "Your timesheet was approved",
      "approval",
    );
  }
}

module.exports = NotificationService;
