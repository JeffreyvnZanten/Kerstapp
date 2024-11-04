const Snowfall = () => {
  // Create multiple snowflakes with random properties
  const generateSnowflakes = (count : number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      radius: Math.random() * 3 + 1,
      initialX: Math.random() * 100, // percentage across screen
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 0.2
    }));
  };

  const snowflakes = generateSnowflakes(50); // Adjust count as needed

  return (
    <svg 
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1000
      }}
    >
      <defs>
        {/* Define the falling animation path */}
        <path
          id="snowfall-path"
          d={`M 0 -10 
              C ${Math.random() * 100} ${Math.random() * 100},
                ${Math.random() * 100} ${Math.random() * 100},
                ${Math.random() * 100} 100`}
        />
      </defs>

      {snowflakes.map((flake) => (
        <circle
          key={flake.id}
          cx={`${flake.initialX}%`}
          cy="0"
          r={flake.radius}
          fill="white"
          opacity="0.8"
        >
          <animateMotion
            dur={`${flake.duration}s`}
            repeatCount="indefinite"
            begin={`${flake.delay}s`}
          >
            <mpath href="#snowfall-path" />
          </animateMotion>
        </circle>
      ))}
    </svg>
  );
};

// CSS to add (in your stylesheet)
const styles = `
  body {
    margin: 0;
    overflow: hidden;
  }
`;

export default Snowfall;