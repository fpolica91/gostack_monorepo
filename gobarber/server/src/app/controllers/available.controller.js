import {
  startOfDay,
  isAfter,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format
} from "date-fns";
import Appointment from "../models/Appointment";
import { Op } from "sequelize";

class AvailableController {
  async index(req, res) {
    const { date } = req.query;
    // if date is invalid
    if (!date) return res.status(400).json({ err: "Invalid Date" });
    // turn date to number
    const searchDate = Number(date);
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.id,
        cancelled_at: null,
        // filter by date that is between startOfDate and end of the provided date
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)]
        }
      }
    });

    // here yoou list available hours
    const schedule = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00"
    ];

    // map over available times, split them and convert to 2020-02-09T13:00:00.387Z
    const available = schedule.map(time => {
      // split data by hour and minute ["08", "00"]
      //we need format below
      // 2020-02-09T13:00:00.387Z
      const [hour, minute] = time.split(":");
      const value = setSeconds(
        // this converts to 15:00 to  2020-02-09T13:00:00.387Z
        setMinutes(setHours(searchDate, hour), minute),
        // zero for miliseconds
        0
      );
      return {
        time,
        // 19:00
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        // 2020-02-09T13:00:00.387Z
        available:
          // true or false
          isAfter(value, new Date()) &&
          !appointments.find(
            app =>
              // formatting to hour and minute "21:00"
              format(app.date, "HH:mm") === time
          )
      };
    });

    return res.json(available);
  }
}
// done

export default new AvailableController();
