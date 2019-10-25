export const parseDataValue = value => ({
  pin1: value & 0xff,
  pin2: (value >> 8) & 0xff,
  pin3: (value >> 16) & 0xff,
  pin4: (value >> 24) & 0xff,
})
