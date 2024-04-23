import {DateTime} from "luxon";

export const calculateTimeAgo = (created_at) => {
  const createdDataTime = DateTime.fromISO(created_at);
  const now = DateTime.now();
  const timeDiff = now.diff(createdDataTime);

  if (Math.abs(timeDiff.as('seconds')) < 60) {
    return timeDiff.toFormat(`s' ${timeDiff.as('seconds') < 2 ? 'second' +
      ' ago' : 'seconds ago'}`);
  } else if (Math.abs(timeDiff.as('minutes')) < 60) {
    return timeDiff.toFormat(`m' ${timeDiff.as('minutes') < 2 ? 'minute' +
      ' ago' : 'minutes ago'}`);
  } else if (Math.abs(timeDiff.as('hours')) < 24) {
    return timeDiff.toFormat(`h' ${timeDiff.as('hours') < 2 ? 'hour ago' : 'hours ago'}`);
  } else {
    return timeDiff.toFormat(`d' ${timeDiff.as('days') < 2 ? 'day ago' : 'days ago'}`);
  }
}