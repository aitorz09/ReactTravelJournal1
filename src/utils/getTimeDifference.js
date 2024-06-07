import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInYears } from "date-fns"

export const getTimeDifference = (date) => {

    const minutes = differenceInMinutes(new Date(), date)
    const hours = differenceInHours(new Date(), date)
    const days = differenceInDays(new Date(), date)
    const months = differenceInMonths(new Date(), date)
    const years = differenceInYears(new Date(), date)
    
    switch (true) {
        case minutes < 1:
            return `Hace menos de un minuto`;
        case hours < 1:
            return `Hace ${minutes} minuto${minutes > 1 ? 's' : ""}`;
        case days < 1 :
            return `Hace ${hours} hora${hours > 1 ? 's' : ""}`;
        case months < 1 :
            return `Hace ${days} día${days > 1 ? 's' : ""}`;
        case years < 1 :
            return `Hace ${months} mes${months > 1 ? 'es' : ""}`;
        default:
            return `Hace más de un año`;
    }
}