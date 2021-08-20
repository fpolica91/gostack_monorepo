import { format, parseISO } from "date-fns";
import Mail from "../../lib/Mail";

class CancellationMail {
  get key() {
    return "CancellationMail";
  }
  async handle({ data }) {
    const { appointment } = data;
    console.log("happening  now");

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: "Cancelled Appointment",
      template: "cancellation",
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(parseISO(appointment.date), "MMMM, dd , 'at' H:mm'h' ")
      }
    });
  }
}

export default new CancellationMail();
