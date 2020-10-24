const refs = {
  days: document.querySelector('[data-value = "days"]'),
  hours: document.querySelector('[data-value = "hours"]'),
  mins: document.querySelector('[data-value = "mins"]'),
  secs: document.querySelector('[data-value = "secs"]'),
  stop: document.querySelector('[data-action ="stop"]'),
  resume: document.querySelector('[data-action ="resume"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.timerId = selector;
    this.timerIntarvalId = null;
    this.timerStatus = null;
    this.targetTime = targetDate.getTime();
    this.start();
    refs.stop.addEventListener("click", this.stop.bind(this));
    refs.resume.addEventListener("click", this.start.bind(this));
  }
  start() {
    if (this.timerStatus) {
      return;
    }
    refs.resume.disabled = true;
    refs.stop.disabled = false;
    this.timerStatus = true;
    this.timerIntarvalId = setInterval(() => {
      this.UpdateUI(this.setCounterUIData());
    }, 1000);
    console.log("TIMER Started");
  }
  stop() {
    refs.resume.disabled = false;
    refs.stop.disabled = true;
    clearInterval(this.timerIntarvalId);
    this.timerStatus = false;
    console.log("TIMER Stopped");
  }
  setCounterUIData() {
    this.currentTime = Date.now();
    this.time = this.targetTime - this.currentTime;
    const days = pad(Math.floor(this.time / (1000 * 60 * 60 * 24)));
    const hours = pad(
      Math.floor((this.time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = pad(Math.floor((this.time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((this.time % (1000 * 60)) / 1000));
    function pad(value) {
      return String(value).padStart(2, "0");
    }
    return { days, hours, mins, secs };
  }
  UpdateUI({ days, hours, mins, secs }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = mins;
    refs.secs.textContent = secs;
    console.log(`${days}:${hours}:${mins}:${secs}`);
  }
}

new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Dec  31, 2022, 03:22:50"),
});
