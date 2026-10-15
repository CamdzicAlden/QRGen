function Loading({ height = "clamp(0.1rem, 2.5vh, 5rem)" }) {
  return (
    //Svg container
    <svg
      viewBox="0 0 100 100"
      className="w-auto z-999"
      style={{ height: `${height}` }}
    >
      <circle
        cx={50}
        cy={50}
        r={45}
        fill="none"
        strokeWidth={7}
        stroke="#959595"
      />
      <circle
        cx={50}
        cy={50}
        r={45}
        fill="none"
        strokeWidth={7}
        stroke="#555555"
        strokeDasharray={283}
        strokeDashoffset={220}
        strokeLinecap="round"
        className="animate-spin origin-center"
      />
    </svg>
  );
}

export default Loading;
