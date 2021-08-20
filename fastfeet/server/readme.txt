    // GET CURRENT TIME TO  COMPARE AGAINST THE AVAIABLE PICKUP TIMES
    const start_date = {
      value: format(startOfHour(new Date()), "yyyy-MM-dd'T'HH:mm:ssxxx")
    };

    // SEE IF ANY OF THE TIMES IS EQUAL TO PICKUP TIME
    // WE USE STARTOFHOUR TO COMPARE WHOLE TIMES 4:55 = 5:00
    // THIS IS DONE TO BE ABLE TO HAVE A VALID COMPARISON AGAINST THE RANGE
    const pickUpTimes = isAvailableToPickup.find(
      a => a.pickupTimes === start_date.value
    );
    // IF THE CURRENT TIME IS BEFORE OR AFTER INDICATE PICKUP IS NOT AVAILABLE
    if (!pickUpTimes) {
      return res.status(401).json({
        error: "You can only pick up orders between 8:00am and 6:00pm"
      });
    }

    // FIND ALL DELIVERIES BETWEEN START AND ENDOFDAY, THAT ARE NOT CANCELLED
    // AND ASSIGNED TO THE CURRENT DELIVERY MAN
    const deliveries = await Order.findAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())]
        },
        courier_id: courierID,
        cancelled_at: null
      }
    });

    // IF MORE THAN 5 DELIVERS HAVE BEEN DONE, DONE ALLOW ANOTHER DELIVERY
    if (deliveries.length > 5) {
      return res.json({ err: "can only make 5 daily pickups" });
    }

    const enRoute = await Order.findOne({
      where: {
        id: id,
        courier_id: courierID,
        // check if pickup time stamp exists
        start_date: parseISO(start_date.value),
        cancelled_at: null
      }
    });
    if (enRoute) {
      return res.json({ error: "delivery left warehouse" });
    }

    order.start_date = await parseISO(start_date.value);
    await order.save();

    return res.json(order);