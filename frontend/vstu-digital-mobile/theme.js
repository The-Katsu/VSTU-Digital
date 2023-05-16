export const COLORS = {
    primary: '#10069F',
    secondary: '#B9C1E9',

    white: '#FFFFFF',
    black: '#000000'
}

export const SIZES = {
    // global
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    // dimensions
    width: 0,
    height: 0
}

export const FONTS = {
    montserratMedium: 'Montserrat-Medium',

    h1: { fontFamily: 'Montserrat', fontSize: SIZES.h1, lineHeight: 36},
    h2: { fontFamily: 'Montserrat', fontSize: SIZES.h2, lineHeight: 30},
    h3: { fontFamily: 'Montserrat', fontSize: SIZES.h3, lineHeight: 22},
    h4: { fontFamily: 'Montserrat', fontSize: SIZES.h4, lineHeight: 22},

    body1: { fontFamily: 'Montserrat', fontSize: SIZES.body1, lineHeight: 36},
    body2: { fontFamily: 'Montserrat', fontSize: SIZES.body2, lineHeight: 30},
    body3: { fontFamily: 'Montserrat', fontSize: SIZES.body3, lineHeight: 22},
    body4: { fontFamily: 'Montserrat', fontSize: SIZES.body4, lineHeight: 22}
}

const appTheme = {COLORS, SIZES, FONTS}

export default appTheme