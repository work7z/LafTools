const colors = require('tailwindcss/colors')


/** @type {import('tailwindcss').Config} */


const toRgba = (hexCode, opacity = 50) => {
  let hex = hexCode.replace('#', '');
  
  if (hex.length === 3) {
      hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }    
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};

const flattenColorPalette = (obj, sep='-') => Object.assign(
{}, 
...function _flatten(o, p='') { 
  return [].concat(...Object.keys(o)
    .map(k => 
      typeof o[k] === 'object' ?
        _flatten(o[k],k+sep) : 
        ({[p+k]: o[k]})
    )
  );
}(obj)
);


const patterns = [
  {
    name: "lines",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage: `linear-gradient(0deg, var(--pattern-bg-color, transparent) 50%, var(--pattern-color) 50%)`,
      backgroundSize: `var(--pattern-size, 40px) var(--pattern-size, 40px)`,
    },
  },
  {
    name: "vertical-lines",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage: `linear-gradient(to right, var(--pattern-color), var(--pattern-color) var(--pattern-size-half, 20px), var(--pattern-bg-color, transparent) var(--pattern-size-half, 20px), var(--pattern-bg-color, transparent))`,
      backgroundSize: `var(--pattern-size, 40px) var(--pattern-size, 40px)`,
    },
  },
  {
    name: "dots",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage: `radial-gradient(var(--pattern-color) calc(var(--pattern-size, 40px) * 0.1), var(--pattern-bg-color) calc(var(--pattern-size, 40px) * 0.1))`,
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "rhombus",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage: `linear-gradient(135deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(225deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(45deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(315deg, var(--pattern-color) 25%, var(--pattern-bg-color) 25%)`,
      backgroundPosition:
        "var(--pattern-size, 40px) 0, var(--pattern-size, 40px) 0, 0 0, 0 0",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
      backgroundRepeat: "repeat",
    },
  },
  {
    name: "cross",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      background: `radial-gradient(circle, transparent 20%, var(--pattern-bg-color) 20%, var(--pattern-bg-color) 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, var(--pattern-bg-color) 20%, var(--pattern-bg-color) 80%, transparent 80%, transparent) var(--pattern-size-half, 20px) var(--pattern-size-half, 20px), linear-gradient(var(--pattern-color) calc(var(--pattern-size, 40px) * 0.04), transparent calc(var(--pattern-size, 40px) * 0.04)) 0 calc(var(--pattern-size, 40px) * -0.02), linear-gradient(90deg, var(--pattern-color) calc(var(--pattern-size, 40px) * 0.04), var(--pattern-bg-color) calc(var(--pattern-size, 100px) * 0.04)) calc(var(--pattern-size, 40px) * -0.02) 0`,
      backgroundSize: `var(--pattern-size, 40px) var(--pattern-size, 20px), var(--pattern-size, 40px) var(--pattern-size, 20px), var(--pattern-size-half, 20px) var(--pattern-size-half, 20px), var(--pattern-size-half, 20px) var(--pattern-size-half, 20px)`,
    },
  },
  {
    name: "wavy",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "repeating-radial-gradient( circle at 0 0, transparent 0, var(--pattern-bg-color, transparent) var(--pattern-size, 40px) ), repeating-linear-gradient( var(--pattern-color-55), var(--pattern-color) )",
    },
  },
  {
    name: "zigzag",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "linear-gradient(135deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(225deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(45deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(315deg, var(--pattern-color) 25%, var(--pattern-bg-color, transparent) 25%)",
      backgroundPosition:
        "var(--pattern-size-half, 20px) 0, var(--pattern-size-half, 20px) 0, 0 0, 0 0",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
      backgroundRepeat: "repeat",
    },
  },
  {
    name: "zigzag-3d",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      background:
        "linear-gradient(135deg, var(--pattern-color-55) 25%, transparent 25%) calc(var(--pattern-size, 40px) * -0.5) 0/ var(--pattern-size, 40px) var(--pattern-size, 40px), linear-gradient(225deg, var(--pattern-color) 25%, transparent 25%) calc(var(--pattern-size, 40px) * -0.5) 0/ var(--pattern-size, 40px) var(--pattern-size, 40px), linear-gradient(315deg, var(--pattern-color-55) 25%, transparent 25%) 0px 0/ var(--pattern-size, 40px) var(--pattern-size, 40px), linear-gradient(45deg, var(--pattern-color) 25%, var(--pattern-bg-color) 25%) 0px 0/ var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "isometric",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "linear-gradient(30deg, var(--pattern-color) 12%, transparent 12.5%, transparent 87%, var(--pattern-color) 87.5%, var(--pattern-color)), linear-gradient(150deg, var(--pattern-color) 12%, transparent 12.5%, transparent 87%, var(--pattern-color) 87.5%, var(--pattern-color)), linear-gradient(30deg, var(--pattern-color) 12%, transparent 12.5%, transparent 87%, var(--pattern-color) 87.5%, var(--pattern-color)), linear-gradient(150deg, var(--pattern-color) 12%, transparent 12.5%, transparent 87%, var(--pattern-color) 87.5%, var(--pattern-color)), linear-gradient(60deg, var(--pattern-color-77) 25%, transparent 25.5%, transparent 75%, var(--pattern-color-77) 75%, var(--pattern-color-77)), linear-gradient(60deg, var(--pattern-color-77) 25%, transparent 25.5%, transparent 75%, var(--pattern-color-77) 75%, var(--pattern-color-77))",
      backgroundSize:
        "var(--pattern-size, 40px) calc(var(--pattern-size, 40px) * 1.75)",
      backgroundPosition:
        "0 0, 0 0, var(--pattern-size-half, 20px) calc(var(--pattern-size, 40px) * 0.875), var(--pattern-size-half, 20px) calc(var(--pattern-size, 40px) * 0.875), 0 0, var(--pattern-size-half, 20px) calc(var(--pattern-size, 40px) * 0.875)",
    },
  },
  {
    name: "boxes",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "linear-gradient(var(--pattern-color) calc(var(--pattern-size, 40px) * 0.1), transparent calc(var(--pattern-size, 40px) * 0.1)), linear-gradient(to right, var(--pattern-color) calc(var(--pattern-size, 40px) * 0.1), var(--pattern-bg-color, transparent) calc(var(--pattern-size, 40px) * 0.1))",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "rectangles",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "repeating-linear-gradient(45deg, var(--pattern-color) 25%, transparent 25%, transparent 75%, var(--pattern-color) 75%, var(--pattern-color)), repeating-linear-gradient(45deg, var(--pattern-color) 25%, var(--pattern-bg-color, transparent) 25%, var(--pattern-bg-color, transparent) 75%, var(--pattern-color) 75%, var(--pattern-color))",
      backgroundPosition:
        "0 0, var(--pattern-size-half, 20px) var(--pattern-size-half, 20px)",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "diagonal-lines",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      background:
        "repeating-linear-gradient( 45deg, var(--pattern-color), var(--pattern-color) calc(var(--pattern-size, 40px) * 0.2), var(--pattern-bg-color, transparent) calc(var(--pattern-size, 40px) * 0.2), var(--pattern-bg-color) var(--pattern-size, 40px) )",
    },
  },
  {
    name: "triangles",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage: "linear-gradient(45deg, var(--pattern-color) 50%, var(--pattern-bg-color, transparent) 50%)",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "moon",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage: "radial-gradient( ellipse farthest-corner at var(--pattern-size, 40px) var(--pattern-size, 40px), var(--pattern-color), var(--pattern-color) 50%, var(--pattern-bg-color, transparent) 50%)",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "paper",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage: "linear-gradient(var(--pattern-color) calc(var(--pattern-size, 40px) * 0.04), transparent calc(var(--pattern-size, 40px) * 0.04)), linear-gradient(90deg, var(--pattern-color) calc(var(--pattern-size, 40px) * 0.04), transparent calc(var(--pattern-size, 40px) * 0.04)), linear-gradient(var(--pattern-color) calc(var(--pattern-size, 40px) * 0.02), transparent calc(var(--pattern-size, 40px) * 0.02)), linear-gradient(90deg, var(--pattern-color) 2px, var(--pattern-bg-color, transparent) calc(var(--pattern-size, 40px) * 0.02))",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px), var(--pattern-size, 40px) var(--pattern-size, 40px), calc(var(--pattern-size, 40px) * 0.2) calc(var(--pattern-size, 40px) * 0.2), calc(var(--pattern-size, 40px) * 0.2) calc(var(--pattern-size, 40px) * 0.2)",
      backgroundPosition: "calc(var(--pattern-size, 40px) * -0.04) calc(var(--pattern-size, 40px) * -0.04), calc(var(--pattern-size, 40px) * -0.04) calc(var(--pattern-size, 40px) * -0.04), calc(var(--pattern-size, 40px) * -0.02) calc(var(--pattern-size, 40px) * -0.02), calc(var(--pattern-size, 40px) * -0.02) calc(var(--pattern-size, 40px) * -0.02)",
    },
  },
];

const defaultOpacities = {
  100: "1",
  80: ".80",
  60: ".60",
  40: ".40",
  20: ".20",
  10: ".10",
  5: ".05",
};

const defaultSizes = {
  1: "0.25rem",
  2: "0.5rem",
  4: "1rem",
  6: "1.5rem",
  8: "2rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
};



module.exports = {
  darkMode: "class",
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'light-blue': colors.sky,
        cyan: colors.cyan,
      },

    },
  },
  plugins: [
    function ({ addComponents, addUtilities, theme }) {
      const colors = theme("colors", {});
      const allColors = Object.keys(colors).map((key) => ({
        name: key,
        values: colors[key],
      }));
      const opacities = theme("patterns.opacity", defaultOpacities);
      const sizes = theme("patterns.size", defaultSizes);
    
      let utilities = {};
      let components = {};
    
      allColors.forEach(({ name, values }) => {
        if (typeof values === "object") {
          Object.keys(values).forEach((value) => {
            utilities[`.pattern-${name}-${value}`] = {
              "--pattern-color": values[value],
              "--pattern-color-55": values[value] + "55",
              "--pattern-color-77": values[value] + "77",
            };
            utilities[`.pattern-bg-${name}-${value}`] = {
              "--pattern-bg-color": values[value],
            };
          });
        } else {
          utilities[`.pattern-${name}`] = {
            "--pattern-color": values,
          };
          utilities[`.pattern-bg-${name}`] = {
            "--pattern-bg-color": values,
          };
        }
      });
    
      Object.keys(opacities).forEach((opacity) => {
        utilities[`.pattern-opacity-${opacity}`] = {
          "--pattern-opacity": opacities[opacity],
        };
      });
    
      Object.keys(sizes).forEach((size) => {
        utilities[`.pattern-size-${size}`] = {
          "--pattern-size": sizes[size],
          "--pattern-size-half": `calc(${sizes[size]} / 2)`,
        };
      });
    
      patterns.forEach(({ name: patternName, styles }) => {
        components[`.pattern-${patternName}`] = styles;
      });
    
      addUtilities(utilities);
      addComponents(components);
    },
    function ({ addUtilities, theme }) {
      const utilities = {
        '.bg-stripes': {
          backgroundImage:
            'linear-gradient(45deg, var(--stripes-color) 12.50%, transparent 12.50%, transparent 50%, var(--stripes-color) 50%, var(--stripes-color) 62.50%, transparent 62.50%, transparent 100%)',
          backgroundSize: '5.66px 5.66px',
        },
      }

      const addColor = (name, color) =>
        (utilities[`.bg-stripes-${name}`] = { '--stripes-color': color })

      const colors = flattenColorPalette(theme('backgroundColor'))
      for (let name in colors) {
        try {
          const [r, g, b, a] = toRgba(colors[name])
          if (a !== undefined) {
            addColor(name, colors[name])
          } else {
            addColor(name, `rgba(${r}, ${g}, ${b}, 0.4)`)
          }
        } catch (_) {
          addColor(name, colors[name])
        }
      }

      addUtilities(utilities)
    },
  ],
}