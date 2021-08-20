import Order from "../models/Order";
import Courier from "../models/Courier";
import {
  startOfDay,
  endOfDay,
  isAfter,
  parseISO,
  startOfHour,
  format,
  setSeconds,
  setMinutes,
  setHours
} from "date-fns";
import { Op } from "sequelize";
import times from "../utils/time.range";

// changes
class OrderByCourierActions {
  async index(req, res) {
    const { id } = req.params;
    const courier = await Courier.findByPk(id);
    if (!courier) return res.json({ error: "permission denied" });
    const courier_id = courier.id;
    const orders = await Order.findAll({
      where: { courier_id, cancelled_at: null },
      order: ["created_at"]
    });

    return res.json(orders);
  }
  async pickup(req, res) {
    const { id } = req.params;
    const { courierID } = req.query;

    const order = await Order.findByPk(id, {
      include: [
        {
          model: Courier,
          as: "courier",
          attributes: ["id", "name"]
        }
      ]
    });
    const courier = await Courier.findByPk(courierID);
    if (!courier) return res.json({ error: "Permission denied" });
    if (!order) return res.json({ error: "cannot find order" });
    if (!order.courier) return res.json({ error: "courier unassinged" });

    if ((await order.courier.id) !== courier.id) {
      return res.json({ error: "Permission denied" });
    }

    // MAP OVER ALL AVAIABLE PICK UP TIMES 8AM TO 7PM
    const isAvailableToPickup = times.map(time => {
      const [hour, minute] = time.split(":");
      const value = setSeconds(
        setMinutes(setHours(new Date(), hour), minute),
        0
      );
      return {
        // /RETURN COMPARABLE FORMAT
        pickupTimes: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx")
      };
    });

    const start_date = {
      value: format(startOfHour(new Date()), "yyyy-MM-dd'T'HH:mm:ssxxx")
    };

    const warehouseOpen = isAvailableToPickup.find(
      x => x.pickupTimes === start_date.value
    );

    // check if the pick is being made during business hours
    if (!warehouseOpen) {
      return res.json({
        error: "pick ups can only be made during business hours"
      });
    }
    // check if courier has exceeded pickup limit
    const pickedupOrders = await Order.findAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())]
        },
        courier_id: courierID,
        id: id,
        cancelled_at: null,
        end_date: null
      }
    });

    // check number of pickups
    if (pickedupOrders.length > 5) {
      return res.json({ error: "You can only make 5 pick ups daily" });
    }

    const enRoute = await Order.findOne({
      where: {
        courier_id: courierID,
        start_date: parseISO(start_date.value),
        cancelled_at: null,
        end_date: null
      }
    });

    if (enRoute) {
      return res.json({ error: "Order en route" });
    }

    const alreadyReceived = order.end_date;
    const signedFor = order.signature_id;

    if (await signedFor) {
      order.signature_id = signedFor;
      order.end_date = parseISO(start_date.value);
      await order.save();
      return res.json({ error: "order received and signed by  user" });
    }

    if (alreadyReceived) {
      return res.json({ error: "order already received" });
    }

    order.start_date = parseISO(start_date.value);
    await order.save();
    return res.json({
      message: `Order Succesfully picked up ${order.product}`
    });
  }
  async dropoff(req, res) {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    const end_date = {
      value: format(startOfHour(new Date()), "yyyy-MM-dd'T'HH:mm:ssxxx")
    };
    if (!order.start_date) {
      return res.json({ error: "order was never picked up" });
    }
    // check if recipient signed
    if (!order.signature_id) {
      return res.json({ error: "Recipient must sign for order" });
    }

    // check if order not already marked
    if (!order.end_date) {
      order.end_date = end_date.value;
      await order.save();
      return res.json({ success: "order succesfully delivered and received" });
    }
  }
}

export default new OrderByCourierActions();
