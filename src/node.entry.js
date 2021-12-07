import VueCalendar from './entry';

export default function(context) {
  return VueCalendar(context.events);//Instead of passing an empty array pass context.events
}