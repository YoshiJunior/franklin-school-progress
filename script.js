const calendar = {
  start: "2026-08-24",
  end: "2027-05-28",
  closed: [
    "2026-09-07", "2026-09-21", "2026-10-23",
    "2026-11-25", "2026-11-26", "2026-11-27",
    "2026-12-23", "2026-12-24", "2026-12-25", "2026-12-28", "2026-12-29", "2026-12-30", "2026-12-31",
    "2027-01-01", "2027-01-18", "2027-01-25", "2027-02-19",
    "2027-03-22", "2027-03-23", "2027-03-24", "2027-03-25", "2027-03-26", "2027-04-23"
  ]
};

const closed = new Set(calendar.closed);
const atMidnight = value => {
  const date = new Date(`${value}T00:00:00`);
  date.setHours(0, 0, 0, 0);
  return date;
};
const key = date => date.toISOString().slice(0, 10);
const isSchoolDay = date => date.getDay() !== 0 && date.getDay() !== 6 && !closed.has(key(date));
const countDays = (from, through) => {
  let count = 0;
  for (const date = new Date(from); date <= through; date.setDate(date.getDate() + 1)) if (isSchoolDay(date)) count++;
  return count;
};

const start = atMidnight(calendar.start);
const end = atMidnight(calendar.end);
const today = new Date();
today.setHours(0, 0, 0, 0);
const total = countDays(start, end);
const completed = today < start ? 0 : today > end ? total : countDays(start, today);
const percent = Math.round((completed / total) * 100);

document.querySelector("#percentage").textContent = `${percent}%`;
document.querySelector("#days").textContent = `${completed} of ${total} school days`;
document.querySelector("#progressBar").style.width = `${percent}%`;
document.querySelector("#message").textContent = today < start ? "School starts August 24." : today > end ? "The school year is complete." : "of the 2026–27 school year.";
