import { format, setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';
setDefaultOptions({ locale: es });

export function getDateFormat(date, strFormat){
    return format(date, strFormat)
}