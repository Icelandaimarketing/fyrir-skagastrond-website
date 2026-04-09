export default function WaveDivider() {
  return (
    <div className="wave-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          d="M0 64C83 45 140 37 235 61C330 85 423 118 533 99C643 80 682 26 790 25C898 24 968 77 1068 84C1168 91 1232 54 1320 43C1379 36 1419 38 1440 42V120H0V64Z"
          fill="#D6EDFA"
        />
        <path
          d="M0 77C90 55 182 34 284 55C386 76 477 118 589 101C701 84 752 33 857 35C962 37 1023 92 1120 96C1217 100 1307 56 1396 47C1415 45 1430 45 1440 45V120H0V77Z"
          fill="#9DD0F0"
          opacity="0.75"
        />
        <path
          d="M0 82C89 78 155 59 243 69C331 79 408 117 519 109C630 101 691 55 805 53C919 51 1007 102 1098 103C1189 104 1267 68 1354 65C1389 64 1418 65 1440 66V120H0V82Z"
          fill="#2E7AB8"
        />
      </svg>
    </div>
  );
}
