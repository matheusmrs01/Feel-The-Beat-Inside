function sToTime(s) {
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;

    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

export default sToTime;
