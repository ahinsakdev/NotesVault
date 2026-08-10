export type ReaderFontFamily = "serif" | "sans";

export type ReaderFontSize = "small" | "default" | "large";

export type ReaderLineHeight = "compact" | "normal" | "relaxed";

export type ReaderWidth = "compact" | "comfortable" | "wide";

export type ReaderPreferences = {
  fontFamily: ReaderFontFamily;
  fontSize: ReaderFontSize;
  lineHeight: ReaderLineHeight;
  width: ReaderWidth;
};
