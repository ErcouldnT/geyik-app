// https://www.npmjs.com/package/date-fns
import { format, formatDistance, formatRelative, parseISO, subDays } from 'date-fns';
import { tr } from 'date-fns/locale';

export default (date: string) => {
	return formatDistance(parseISO(date), new Date(), { locale: tr });
};
