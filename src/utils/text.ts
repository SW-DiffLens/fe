/**
 * 괄호 앞까지만 텍스트를 잘라내는 유틸리티 함수
 * @param text
 * @returns
 * @example
 */
export const truncateBeforeParenthesis = (text: string): string => {
  const indexOfParenthesis = text.indexOf("(");
  if (indexOfParenthesis === -1) {
    return text;
  }
  return text.substring(0, indexOfParenthesis).trim();
};
